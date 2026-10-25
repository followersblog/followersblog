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

    // Convert to paise if passed in standard INR (e.g. 1499 -> 149900)
    let amountInPaise = Math.round(Number(amount));
    if (amountInPaise < 100) {
      // If amount was passed in rupees, convert to paise
      amountInPaise = Math.round(Number(amount) * 100);
    }

    if (amountInPaise < 100) {
      return NextResponse.json(
        { error: 'Minimum amount must be at least 100 paise (₹1)' },
        { status: 400 }
      );
    }

    const prefix = productType === 'course' ? 'CRS' : 'MED';
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const internalOrderId = receipt || `${prefix}-${Date.now().toString().slice(-6)}-${randomSuffix}`;

    // Compliant note for Razorpay dashboard & compliance audits (No SMM / bot terms)
    const compliantNote = productType === 'course'
      ? (productName || 'AI Website Building — 3 Hour Complete Practical Class')
      : `Digital Creator Strategy Class & Media Consultation (Tier ₹${amountInPaise / 100})`;

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

    // Save order record to Supabase if configured
    const supabase = getServiceSupabase();
    if (supabase && isSupabaseConfigured) {
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
    }

    return NextResponse.json({
      success: true,
      order_id: razorpayOrder.id,
      id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      receipt: internalOrderId,
      key_id: process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error('Razorpay Create Order Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create Razorpay order' },
      { status: error?.statusCode || 500 }
    );
  }
}
