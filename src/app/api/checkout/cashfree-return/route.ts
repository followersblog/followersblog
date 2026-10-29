import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('order_id');
  const source = searchParams.get('source') || '';

  const host = req.headers.get('host') || 'follower.blog';
  const proto = req.headers.get('x-forwarded-proto') || 'https';
  const baseUrl = `${proto}://${host}`;

  if (!orderId) {
    return NextResponse.redirect(new URL('/', baseUrl));
  }

  const supabase = getServiceSupabase();
  const isCourse = orderId.startsWith('CRS') || source === 'course';
  const isHome = orderId.startsWith('EDT') || source === 'home';
  const isFollowers = orderId.startsWith('MED') || source === 'followers';

  // Verify with Cashfree if credentials exist
  const cashfreeAppId = process.env.CASHFREE_APP_ID;
  const cashfreeSecret = process.env.CASHFREE_SECRET_KEY;

  let orderData: any = null;

  if (cashfreeAppId && cashfreeSecret && !cashfreeAppId.includes('TEST_APP_ID')) {
    const isProd = (process.env.CASHFREE_ENV || 'PROD') === 'PROD';
    const cfBaseUrl = isProd
      ? `https://api.cashfree.com/pg/orders/${orderId}`
      : `https://sandbox.cashfree.com/pg/orders/${orderId}`;

    try {
      const response = await fetch(cfBaseUrl, {
        headers: {
          'x-client-id': cashfreeAppId,
          'x-client-secret': cashfreeSecret,
          'x-api-version': process.env.CASHFREE_API_VERSION || '2023-08-01',
        },
      });

      orderData = await response.json();

      if (orderData && orderData.order_status === 'PAID') {
        if (supabase && isSupabaseConfigured) {
          await supabase
            .from('orders')
            .update({
              payment_status: 'success',
              order_status: 'completed',
              payment_reference: orderData.cf_order_id || 'CF_VERIFIED',
              updated_at: new Date().toISOString(),
            })
            .eq('id', orderId);

          if (isCourse) {
            await supabase.from('course_access').upsert({
              order_id: orderId,
              customer_email: orderData.customer_details?.customer_email || 'student@follower.blog',
              customer_name: orderData.customer_details?.customer_name || 'Student',
              course_name: 'AI Website Building — 3 Hour Complete Practical Class',
              status: 'active',
            });
          }
        }
      }
    } catch (err) {
      console.error('Cashfree order verification error:', err);
    }
  }

  // Handle successful payments
  if (orderData && orderData.order_status === 'PAID') {
    const cust = orderData.customer_details || {};
    if (isCourse) {
      return NextResponse.redirect(new URL(`/course/success?order_id=${encodeURIComponent(orderId)}`, baseUrl));
    }
    if (isFollowers) {
      return NextResponse.redirect(new URL(`/followers/success?order_id=${encodeURIComponent(orderId)}&from=/followers`, baseUrl));
    }
    // Home or Default: Official Tax Invoice receipt
    const receiptUrl = `/receipt?order_id=${encodeURIComponent(orderId)}&payment_id=${encodeURIComponent(orderData.cf_order_id || '')}&name=${encodeURIComponent(cust.customer_name || 'Valued Customer')}&email=${encodeURIComponent(cust.customer_email || '')}&phone=${encodeURIComponent(cust.customer_phone || '')}&amount=${encodeURIComponent(String(orderData.order_amount || ''))}`;
    return NextResponse.redirect(new URL(receiptUrl, baseUrl));
  }

  // Handle failed or cancelled checkout safely
  if (isHome) {
    return NextResponse.redirect(new URL('/#editing-courses?status=cancelled', baseUrl));
  }
  if (isCourse) {
    return NextResponse.redirect(new URL('/course/checkout?payment_status=cancelled', baseUrl));
  }
  if (isFollowers) {
    return NextResponse.redirect(new URL('/followers?payment_status=cancelled', baseUrl));
  }

  return NextResponse.redirect(new URL('/#editing-courses?status=cancelled', baseUrl));
}
