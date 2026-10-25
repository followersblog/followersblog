import { NextRequest, NextResponse } from 'next/server';
import { verifyRazorpaySignature, getRazorpayInstance } from '@/lib/razorpay';
import { getServiceSupabase, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    let razorpay_payment_id = '';
    let razorpay_order_id = '';
    let razorpay_signature = '';

    const contentType = req.headers.get('content-type') || '';
    if (
      contentType.includes('application/x-www-form-urlencoded') ||
      contentType.includes('multipart/form-data')
    ) {
      const formData = await req.formData();
      razorpay_payment_id = (formData.get('razorpay_payment_id') as string) || '';
      razorpay_order_id = (formData.get('razorpay_order_id') as string) || '';
      razorpay_signature = (formData.get('razorpay_signature') as string) || '';
    } else {
      const json = await req.json().catch(() => ({}));
      razorpay_payment_id = json.razorpay_payment_id || '';
      razorpay_order_id = json.razorpay_order_id || '';
      razorpay_signature = json.razorpay_signature || '';
    }

    const host = req.headers.get('host') || 'followers.blog';
    const protocol = req.headers.get('x-forwarded-proto') || 'https';
    const baseUrl = `${protocol}://${host}`;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      console.error('Razorpay callback missing required parameters:', {
        razorpay_payment_id,
        razorpay_order_id,
      });
      return NextResponse.redirect(`${baseUrl}/followers?payment_status=pending`, 303);
    }

    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      console.error('Razorpay callback invalid signature:', {
        razorpay_order_id,
        razorpay_payment_id,
      });
      return NextResponse.redirect(`${baseUrl}/followers?payment_status=invalid_signature`, 303);
    }

    // Try to get receipt / internal order id from Razorpay order
    let receipt = razorpay_order_id;
    try {
      const razorpay = getRazorpayInstance();
      const rzpOrder = await razorpay.orders.fetch(razorpay_order_id);
      if (rzpOrder && rzpOrder.receipt) {
        receipt = rzpOrder.receipt;
      }
    } catch (fetchErr) {
      console.warn('Could not fetch razorpay order details:', fetchErr);
    }

    // Update Supabase if configured
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
          .eq('id', receipt);

        await supabase.from('order_audits').insert({
          order_id: receipt,
          event_type: 'PAYMENT_VERIFIED_CALLBACK',
          description: `Razorpay payment ${razorpay_payment_id} verified via mobile redirect callback.`,
          created_by: 'system_razorpay_callback',
        });
      } catch (dbErr) {
        console.error('Supabase update non-fatal:', dbErr);
      }
    }

    // REDIRECT DIRECTLY TO THE SMM SUCCESS PAGE!
    return NextResponse.redirect(
      `${baseUrl}/followers/success?order_id=${encodeURIComponent(receipt)}&payment_id=${encodeURIComponent(razorpay_payment_id)}`,
      303
    );
  } catch (err: any) {
    console.error('Razorpay callback error:', err);
    return NextResponse.redirect('https://followers.blog/followers', 303);
  }
}

export async function GET(req: NextRequest) {
  const host = req.headers.get('host') || 'followers.blog';
  const protocol = req.headers.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;
  const searchParams = req.nextUrl.searchParams;
  const paymentId = searchParams.get('razorpay_payment_id') || '';
  const orderId = searchParams.get('razorpay_order_id') || '';

  if (paymentId) {
    return NextResponse.redirect(
      `${baseUrl}/followers/success?order_id=${encodeURIComponent(orderId || 'SMM-ACTIVE')}&payment_id=${encodeURIComponent(paymentId)}`,
      303
    );
  }

  return NextResponse.redirect(`${baseUrl}/followers`, 303);
}
