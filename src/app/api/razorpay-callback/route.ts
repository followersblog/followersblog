import { NextRequest, NextResponse } from 'next/server';
import { verifyRazorpaySignature, getRazorpayInstance } from '@/lib/razorpay';
import { getServiceSupabase, isSupabaseConfigured } from '@/lib/supabase';

function getTargetRedirectUrls(source: string, orderIdOrReceipt: string, baseUrl: string) {
  const isHome = source === 'home' || orderIdOrReceipt.startsWith('EDT-');
  const isCourse = source === 'course' || orderIdOrReceipt.startsWith('CRS-');
  const isFollowers = source === 'followers' || source === 'media' || orderIdOrReceipt.startsWith('MED-');

  if (isHome) {
    return {
      type: 'home',
      failureUrl: `${baseUrl}/#editing-courses?status=cancelled`,
      successUrl: (params: string) => `${baseUrl}/receipt?${params}`,
    };
  }

  if (isCourse) {
    return {
      type: 'course',
      failureUrl: `${baseUrl}/course/checkout?payment_status=cancelled`,
      successUrl: (params: string) => `${baseUrl}/course/success?${params}`,
    };
  }

  if (isFollowers) {
    return {
      type: 'media',
      failureUrl: `${baseUrl}/#editing-courses?status=cancelled`,
      successUrl: (params: string) => `${baseUrl}/followers/success?${params}&from=/followers`,
    };
  }

  // Universal safe fallback: Homepage, NEVER followers!
  return {
    type: 'home',
    failureUrl: `${baseUrl}/?status=cancelled`,
    successUrl: (params: string) => `${baseUrl}/receipt?${params}`,
  };
}

export async function POST(req: NextRequest) {
  const host = req.headers.get('host') || 'follower.blog';
  const protocol = req.headers.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;

  const searchParams = req.nextUrl.searchParams;
  const querySource = searchParams.get('source') || '';

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

    const targetUrls = getTargetRedirectUrls(querySource, razorpay_order_id, baseUrl);

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      console.warn('Razorpay callback missing parameters (payment cancelled or failed):', {
        razorpay_payment_id,
        razorpay_order_id,
      });
      return NextResponse.redirect(targetUrls.failureUrl, 303);
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
      return NextResponse.redirect(targetUrls.failureUrl, 303);
    }

    // Try to get receipt / internal order id & details from Razorpay order
    let receipt = razorpay_order_id;
    let orderAmount = '';
    let customerName = '';
    let customerEmail = '';
    let customerPhone = '';
    let orderSource = querySource;

    try {
      const razorpay = getRazorpayInstance();
      const rzpOrder = await razorpay.orders.fetch(razorpay_order_id);
      if (rzpOrder) {
        if (rzpOrder.receipt) receipt = rzpOrder.receipt;
        if (rzpOrder.amount) orderAmount = String(Math.round(Number(rzpOrder.amount) / 100));
        if (rzpOrder.notes) {
          customerName = (rzpOrder.notes.customer_name as string) || '';
          customerEmail = (rzpOrder.notes.customer_email as string) || '';
          customerPhone = (rzpOrder.notes.customer_phone as string) || '';
          if (rzpOrder.notes.source) orderSource = rzpOrder.notes.source as string;
        }
      }
    } catch (fetchErr) {
      console.warn('Could not fetch razorpay order details:', fetchErr);
    }

    // Re-evaluate target URLs with receipt
    const resolvedUrls = getTargetRedirectUrls(orderSource, receipt, baseUrl);

    // Update Supabase if configured & enrich customer details if needed
    const supabase = getServiceSupabase();
    if (supabase && isSupabaseConfigured) {
      try {
        const { data: existingOrder } = await supabase
          .from('orders')
          .select('customer_name, customer_email, customer_phone, amount, target_url, product_type')
          .eq('id', receipt)
          .single();

        if (existingOrder) {
          if (!customerName && existingOrder.customer_name && existingOrder.customer_name !== 'Creator' && existingOrder.customer_name !== 'Learner') {
            customerName = existingOrder.customer_name;
          }
          if (!customerEmail && existingOrder.customer_email && !existingOrder.customer_email.includes('@follower.blog')) {
            customerEmail = existingOrder.customer_email;
          }
          if (!customerPhone && existingOrder.customer_phone && existingOrder.customer_phone !== '9876543210') {
            customerPhone = existingOrder.customer_phone;
          }
          if (!orderAmount && existingOrder.amount) {
            orderAmount = String(existingOrder.amount);
          }
        }

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

    // Format parameters
    const redirectParams = new URLSearchParams();
    redirectParams.set('order_id', receipt);
    redirectParams.set('payment_id', razorpay_payment_id);
    if (orderAmount) redirectParams.set('amount', orderAmount);
    if (customerName) redirectParams.set('name', customerName);
    if (customerEmail) redirectParams.set('email', customerEmail);
    if (customerPhone) redirectParams.set('phone', customerPhone);

    return NextResponse.redirect(
      resolvedUrls.successUrl(redirectParams.toString()),
      303
    );
  } catch (err: any) {
    console.error('Razorpay callback error:', err);
    const fallbackUrls = getTargetRedirectUrls(querySource, '', baseUrl);
    return NextResponse.redirect(fallbackUrls.failureUrl, 303);
  }
}

export async function GET(req: NextRequest) {
  const host = req.headers.get('host') || 'follower.blog';
  const protocol = req.headers.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;

  const searchParams = req.nextUrl.searchParams;
  const paymentId = searchParams.get('razorpay_payment_id') || '';
  const orderId = searchParams.get('razorpay_order_id') || '';
  const source = searchParams.get('source') || '';

  const targetUrls = getTargetRedirectUrls(source, orderId, baseUrl);

  if (paymentId) {
    const redirectParams = new URLSearchParams();
    redirectParams.set('order_id', orderId || 'ACTIVE-ORDER');
    redirectParams.set('payment_id', paymentId);
    return NextResponse.redirect(
      targetUrls.successUrl(redirectParams.toString()),
      303
    );
  }

  return NextResponse.redirect(targetUrls.failureUrl, 303);
}
