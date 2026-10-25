import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      productType, // 'course' | 'service'
      productId,
      productName,
      customerName,
      customerEmail,
      customerPhone,
      amount,
      packageDetails,
      targetUrl,
      addons = [],
    } = body;

    if (!customerName || !customerPhone || !amount) {
      return NextResponse.json(
        { error: 'Missing required customer or order details.' },
        { status: 400 }
      );
    }

    // Generate unique order ID
    const prefix = productType === 'course' ? 'CRS' : 'SMM';
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const orderId = `${prefix}-${Date.now().toString().slice(-6)}-${randomSuffix}`;

    // Database client
    const supabase = getServiceSupabase();

    // Insert order into Supabase if configured
    if (supabase && isSupabaseConfigured) {
      try {
        const { error: orderError } = await supabase.from('orders').insert({
          id: orderId,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          product_type: productType,
          product_name: productName,
          package_details: packageDetails || null,
          target_url: targetUrl || null,
          amount: Number(amount),
          payment_status: 'pending',
          order_status: 'pending',
          payment_gateway: 'cashfree',
        });

        if (orderError) {
          console.error('Supabase order insert error:', orderError);
        }

        // Insert order items / add-ons
        if (addons && addons.length > 0) {
          const itemsToInsert = addons.map((addon: any) => ({
            order_id: orderId,
            item_name: addon.name,
            price: addon.price,
            quantity: 1,
          }));
          await supabase.from('order_items').insert(itemsToInsert);
        }

        // If service order, insert into service_orders table
        if (productType === 'service') {
          await supabase.from('service_orders').insert({
            order_id: orderId,
            customer_name: customerName,
            customer_email: customerEmail,
            customer_phone: customerPhone,
            service_name: productName,
            category: body.category || 'General',
            target: targetUrl || 'N/A',
            quantity: body.quantity || 'Standard',
            status: 'pending',
          });
        }
      } catch (dbErr) {
        console.error('Database write error (continuing checkout):', dbErr);
      }
    }

    // Check if Cashfree credentials are provided
    const cashfreeAppId = process.env.CASHFREE_APP_ID;
    const cashfreeSecret = process.env.CASHFREE_SECRET_KEY;
    const isLiveCashfree =
      Boolean(cashfreeAppId && cashfreeSecret && !cashfreeAppId.includes('TEST_APP_ID'));

    if (isLiveCashfree) {
      const isProd = process.env.CASHFREE_ENV === 'PROD';
      const baseUrl = isProd
        ? 'https://api.cashfree.com/pg/orders'
        : 'https://sandbox.cashfree.com/pg/orders';

      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const returnUrl = `${appUrl}/api/checkout/cashfree-return?order_id=${orderId}`;

      const cfResponse = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'x-client-id': cashfreeAppId!,
          'x-client-secret': cashfreeSecret!,
          'x-api-version': process.env.CASHFREE_API_VERSION || '2023-08-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: orderId,
          order_amount: amount,
          order_currency: 'INR',
          customer_details: {
            customer_id: customerPhone.replace(/\D/g, '') || `cust_${orderId}`,
            customer_name: customerName,
            customer_email: customerEmail || 'orders@followers.blog',
            customer_phone: customerPhone.replace(/\D/g, '').slice(-10),
          },
          order_meta: {
            return_url: returnUrl,
          },
        }),
      });

      const cfData = await cfResponse.json();

      if (!cfResponse.ok) {
        console.error('Cashfree API error:', cfData);
        // Fall back gracefully to test simulation
        return NextResponse.json({
          success: true,
          orderId,
          isCashfreeLive: false,
          message: 'Test checkout mode enabled.',
        });
      }

      return NextResponse.json({
        success: true,
        orderId,
        isCashfreeLive: true,
        paymentSessionId: cfData.payment_session_id,
        paymentUrl: cfData.payments?.url,
      });
    }

    // Default simulation / test mode
    return NextResponse.json({
      success: true,
      orderId,
      isCashfreeLive: false,
      message: 'Order created in test mode.',
    });
  } catch (error: any) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { error: error.message || 'Server error processing checkout.' },
      { status: 500 }
    );
  }
}
