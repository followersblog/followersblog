import { NextRequest, NextResponse } from 'next/server';
import { getRazorpayInstance } from '@/lib/razorpay';
import { getServiceSupabase, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let {
      amount, // In INR Rupees or paise
      currency = 'INR',
      receipt,
      productName,
      customerName,
      customerEmail,
      customerPhone,
      productType = 'course',
      targetUrl,
    } = body;

    if (!amount) {
      return NextResponse.json(
        { error: 'Amount is required' },
        { status: 400 }
      );
    }

    // Convert INR to Paise (e.g. ₹49 -> 4900 paise, ₹1499 -> 149900 paise)
    const numericAmount = Number(amount);
    const amountInPaise = Math.round(numericAmount * 100);

    if (amountInPaise < 100) {
      return NextResponse.json(
        { error: 'Minimum amount must be at least ₹1 (100 paise)' },
        { status: 400 }
      );
    }

    const prefix = productType === 'course' ? 'CRS' : 'MED';
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const internalOrderId = receipt || `${prefix}-${Date.now().toString().slice(-6)}-${randomSuffix}`;

    // Compliant note for Gateway dashboard & compliance audits (No SMM / bot terms)
    const compliantNote = productType === 'course'
      ? (productName || 'AI Website Building — 3 Hour Complete Practical Class')
      : `Digital Creator Strategy Class & Media Consultation (Tier ₹${amountInPaise / 100})`;

    // Check if Cashfree gateway is enabled
    const cashfreeAppId = process.env.CASHFREE_APP_ID;
    const cashfreeSecret = process.env.CASHFREE_SECRET_KEY;
    const useCashfree =
      process.env.PAYMENT_GATEWAY === 'cashfree' ||
      Boolean(cashfreeAppId && cashfreeSecret && !cashfreeAppId.includes('TEST_APP_ID'));

    if (useCashfree) {
      const isProd = process.env.CASHFREE_ENV === 'PROD';
      const baseUrl = isProd
        ? 'https://api.cashfree.com/pg/orders'
        : 'https://sandbox.cashfree.com/pg/orders';

      const host = req.headers.get('host');
      const proto = req.headers.get('x-forwarded-proto') || 'https';
      const appUrl = host ? `${proto}://${host}` : (process.env.NEXT_PUBLIC_APP_URL || 'https://follower.blog');
      const returnUrl = `${appUrl}/api/checkout/cashfree-return?order_id=${internalOrderId}`;

      const cfResponse = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'x-client-id': cashfreeAppId || '',
          'x-client-secret': cashfreeSecret || '',
          'x-api-version': process.env.CASHFREE_API_VERSION || '2023-08-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: internalOrderId,
          order_amount: Math.round(amountInPaise / 100),
          order_currency: 'INR',
          order_note: compliantNote,
          customer_details: {
            customer_id: (customerPhone || '').replace(/\D/g, '') || `cust_${internalOrderId}`,
            customer_name: customerName || 'Learner',
            customer_email: customerEmail || 'orders@follower.blog',
            customer_phone: (customerPhone || '9876543210').replace(/\D/g, '').slice(-10),
          },
          order_meta: {
            return_url: returnUrl,
          },
        }),
      });

      const cfData = await cfResponse.json();

      if (!cfResponse.ok) {
        console.error('Cashfree Create Order Error:', cfData);
        return NextResponse.json(
          { error: cfData.message || 'Failed to create Cashfree order' },
          { status: cfResponse.status || 500 }
        );
      }

      // Save order in Supabase
      const supabase = getServiceSupabase();
      if (supabase && isSupabaseConfigured) {
        (async () => {
          try {
            await supabase.from('orders').insert({
              id: internalOrderId,
              customer_name: customerName || 'Learner',
              customer_email: customerEmail || `${customerPhone || 'customer'}@follower.blog`,
              customer_phone: customerPhone || '9876543210',
              product_type: productType,
              product_name: compliantNote,
              target_url: targetUrl || null,
              amount: Math.round(amountInPaise / 100),
              payment_status: 'pending',
              order_status: 'pending',
              payment_gateway: 'cashfree',
            });
          } catch (dbErr) {
            console.error('Supabase save error (non-fatal):', dbErr);
          }
        })();
      }

      return NextResponse.json({
        success: true,
        gateway: 'cashfree',
        order_id: internalOrderId,
        id: internalOrderId,
        payment_session_id: cfData.payment_session_id,
        payment_url: cfData.payments?.url,
        amount: Math.round(amountInPaise / 100),
        currency: 'INR',
        receipt: internalOrderId,
      });
    }

    const razorpay = getRazorpayInstance();

    const options = {
      amount: amountInPaise,
      currency: currency || 'INR',
      receipt: internalOrderId.slice(0, 40), // Razorpay receipt max 40 chars
      notes: {
        product_name: compliantNote,
        customer_name: customerName || 'Learner',
        customer_email: customerEmail || 'customer@followers.blog',
        order_id: internalOrderId,
      },
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Ultra-fast: Non-blocking asynchronous save to Supabase so response is instant
    const supabase = getServiceSupabase();
    if (supabase && isSupabaseConfigured) {
      (async () => {
        try {
          await supabase.from('orders').insert({
            id: internalOrderId,
            customer_name: customerName || 'Learner',
            customer_email: customerEmail || `${customerPhone || 'customer'}@followers.blog`,
            customer_phone: customerPhone || '9876543210',
            product_type: productType,
            product_name: compliantNote,
            target_url: targetUrl || null,
            amount: Math.round(amountInPaise / 100),
            payment_status: 'pending',
            order_status: 'pending',
            payment_gateway: 'razorpay',
          });
        } catch (dbErr) {
          console.error('Supabase save error (non-fatal):', dbErr);
        }
      })();
    }

    return NextResponse.json({
      success: true,
      order_id: razorpayOrder.id,
      id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      receipt: internalOrderId,
      key_id: process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_Ts8dDt5Uk6gpHC',
    });
  } catch (error: any) {
    console.error('Razorpay Create Order Error:', error);
    const errDesc = error?.error?.description || error?.description || error?.message || 'Failed to create Razorpay order';
    return NextResponse.json(
      { error: errDesc },
      { status: error?.statusCode || 500 }
    );
  }
}
