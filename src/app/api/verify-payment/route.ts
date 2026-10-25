import { NextRequest, NextResponse } from 'next/server';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { getServiceSupabase, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      receipt,
      order_id,
    } = body;

    const actualOrderId = razorpay_order_id || order_id;

    if (!actualOrderId || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing required payment verification parameters' },
        { status: 400 }
      );
    }

    const isValid = verifyRazorpaySignature(
      actualOrderId,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      console.error('Razorpay signature mismatch:', {
        actualOrderId,
        razorpay_payment_id,
      });
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature. Verification failed.' },
        { status: 400 }
      );
    }

    // Payment is valid! Update Supabase database
    const internalOrderId = receipt || actualOrderId;
    const supabase = getServiceSupabase();

    if (supabase && isSupabaseConfigured) {
      try {
        await supabase
          .from('orders')
          .update({
            payment_status: 'paid',
            order_status: 'completed',
            updated_at: new Date().toISOString(),
          })
          .eq('id', internalOrderId);

        // Add audit timeline event
        await supabase.from('order_audits').insert({
          order_id: internalOrderId,
          event_type: 'PAYMENT_VERIFIED',
          description: `Razorpay payment ${razorpay_payment_id} successfully verified.`,
          created_by: 'system_razorpay',
        });
      } catch (dbErr) {
        console.error('Supabase update error (non-fatal):', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id,
      orderId: internalOrderId,
    });
  } catch (error: any) {
    console.error('Razorpay Verify Payment Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Server error while verifying payment' },
      { status: 500 }
    );
  }
}
