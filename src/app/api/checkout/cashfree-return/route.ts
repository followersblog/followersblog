import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('order_id');

  if (!orderId) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const supabase = getServiceSupabase();
  const isCourse = orderId.startsWith('CRS');

  // Verify with Cashfree if credentials exist
  const cashfreeAppId = process.env.CASHFREE_APP_ID;
  const cashfreeSecret = process.env.CASHFREE_SECRET_KEY;

  if (cashfreeAppId && cashfreeSecret && !cashfreeAppId.includes('TEST_APP_ID')) {
    const isProd = process.env.CASHFREE_ENV === 'PROD';
    const baseUrl = isProd
      ? `https://api.cashfree.com/pg/orders/${orderId}`
      : `https://sandbox.cashfree.com/pg/orders/${orderId}`;

    let orderData: any = null;
    try {
      const response = await fetch(baseUrl, {
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
              order_status: isCourse ? 'completed' : 'processing',
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

    if (orderData && orderData.order_status === 'PAID') {
      const cust = orderData.customer_details || {};
      const redirectPath = isCourse
        ? `/course/success?order_id=${encodeURIComponent(orderId)}`
        : `/receipt?order_id=${encodeURIComponent(orderId)}&payment_id=${encodeURIComponent(orderData.cf_order_id || '')}&name=${encodeURIComponent(cust.customer_name || 'Valued Customer')}&email=${encodeURIComponent(cust.customer_email || '')}&phone=${encodeURIComponent(cust.customer_phone || '')}&amount=${encodeURIComponent(String(orderData.order_amount || ''))}`;
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }
  }

  // Fallback redirect
  const redirectPath = isCourse
    ? `/course/success?order_id=${orderId}`
    : `/followers/success?order_id=${orderId}`;

  return NextResponse.redirect(new URL(redirectPath, req.url));
}
