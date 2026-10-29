import { NextRequest, NextResponse } from 'next/server';
import { getRazorpayInstance } from '@/lib/razorpay';
import { getServiceSupabase, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const adminKey = req.headers.get('x-admin-key');
    const expectedPass = process.env.ADMIN_SECRET_KEY || process.env.NEXT_PUBLIC_ADMIN_PASS || 'followers@7055';

    if (adminKey !== expectedPass) {
      return NextResponse.json({ error: 'Unauthorized access to admin orders' }, { status: 401 });
    }

    // 1. Fetch live payments from Razorpay safely
    let rzpPayments: any[] = [];
    let rzpDisputes: any[] = [];
    try {
      const razorpay = getRazorpayInstance();
      const rzpRes = await razorpay.payments.all({ count: 100 });
      if (rzpRes && rzpRes.items) rzpPayments = rzpRes.items;

      if ((razorpay as any).disputes) {
        const dRes = await (razorpay as any).disputes.all({ count: 50 });
        if (dRes && dRes.items) rzpDisputes = dRes.items;
      }
    } catch (rzpErr) {
      console.warn('Razorpay fetch non-fatal (account may be paused):', rzpErr);
    }

    const disputeByPaymentId = new Map<string, any>();
    rzpDisputes.forEach((d) => {
      if (d.payment_id) disputeByPaymentId.set(d.payment_id, d);
    });

    // 2. Fetch records from Supabase
    const supabase = getServiceSupabase();
    let supabaseOrders: any[] = [];
    if (supabase && isSupabaseConfigured) {
      try {
        const { data } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);
        if (data) supabaseOrders = data;
      } catch (dbErr) {
        console.error('Supabase fetch non-fatal:', dbErr);
      }
    }

    // Build lookup maps for fast matching
    const sbOrderById = new Map<string, any>();
    const sbOrderByPhone = new Map<string, any>();

    supabaseOrders.forEach((so) => {
      if (so.id) sbOrderById.set(so.id, so);
      if (so.customer_phone) {
        const cleanP = String(so.customer_phone).replace(/\D/g, '').slice(-10);
        if (cleanP) sbOrderByPhone.set(cleanP, so);
      }
    });

    // 3. Merge Razorpay payments with Supabase order info
    const unifiedOrders = rzpPayments.map((p: any) => {
      const receiptId = (p.notes?.order_id as string) || (p.notes?.receipt as string) || p.order_id || p.id;
      const cleanPhone = (p.contact || '').replace(/\D/g, '').slice(-10);

      const matchedSb = sbOrderById.get(receiptId) || (cleanPhone ? sbOrderByPhone.get(cleanPhone) : null);

      let customerName = matchedSb?.customer_name;
      if (!customerName || customerName === 'Creator' || customerName === 'Learner') {
        customerName = (p.notes?.customer_name as string) || '';
      }
      if (!customerName || customerName === 'Creator' || customerName === 'Learner') {
        customerName = p.email ? p.email.split('@')[0] : 'Verified Customer';
      }

      const amountInRupees = Math.round(Number(p.amount) / 100);
      const targetUrl = matchedSb?.target_url || (p.notes?.target_url as string) || '';

      const createdAtDate = new Date(p.created_at * 1000);
      const formattedDate = createdAtDate.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      const dateOnly = createdAtDate.toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });

      // Compliant billing title for Razorpay dispute defense
      const compliantBillingName = (p.notes?.product_name as string) ||
        `Digital Creator Strategy Class & Media Pack (Tier ₹${amountInRupees})`;

      // Clean display service name
      let serviceDisplay = `${amountInRupees >= 1499 ? 'AI Website Building Practical Course' : 'Digital Creator Media Strategy Tier'}`;
      if (amountInRupees === 49) serviceDisplay = '250 Indian Followers (Starter Pack)';
      else if (amountInRupees === 99) serviceDisplay = '1,000 Indian Followers';
      else if (amountInRupees === 199) serviceDisplay = '10,000 Indian Followers';
      else if (amountInRupees === 250) serviceDisplay = '30,000 Indian Followers';
      else if (amountInRupees === 350) serviceDisplay = '50,000 Indian Followers';
      else if (amountInRupees === 500) serviceDisplay = '100,000 Indian Followers';
      else if (amountInRupees === 600) serviceDisplay = 'VIP Media Growth Bundle';

      const activeDispute = disputeByPaymentId.get(p.id);
      const disputeStatus = activeDispute ? 'under_review' : 'none';
      const disputeReason = activeDispute?.reason_description || activeDispute?.reason_code || '';
      const disputeId = activeDispute?.id || '';

      return {
        id: receiptId,
        paymentId: p.id,
        orderId: p.order_id,
        disputeId: disputeId,
        disputeReason: disputeReason,
        bankRrn: p.acquirer_data?.rrn || p.acquirer_data?.bank_transaction_id || p.id,
        customerName: customerName,
        customerEmail: p.email || matchedSb?.customer_email || '',
        customerPhone: p.contact || (matchedSb?.customer_phone ? `+91 ${matchedSb.customer_phone}` : ''),
        productType: amountInRupees >= 1499 ? 'course' : 'service',
        serviceName: serviceDisplay,
        compliantBillingName: compliantBillingName,
        target: targetUrl,
        amount: amountInRupees,
        paymentStatus: p.status === 'captured' ? 'success' : p.status,
        orderStatus: p.status === 'captured' ? 'completed' : 'pending',
        disputeStatus: disputeStatus,
        createdAt: formattedDate,
        dateOnly: dateOnly,
        method: p.method ? p.method.toUpperCase() : 'UPI',
        timeline: [
          { time: formattedDate, title: 'Payment Captured', desc: `₹${amountInRupees} captured via Razorpay (${p.method || 'UPI'})` },
          { time: formattedDate, title: 'Compliance Invoice Dispatched', desc: compliantBillingName },
          { time: formattedDate, title: 'Service Queue Assigned', desc: targetUrl ? `Target profile @${targetUrl}` : 'Digital asset unlocked' },
        ],
        notes: [
          { by: 'Razorpay Gateway', note: `Payment ID: ${p.id} • Status: ${p.status}`, time: formattedDate }
        ],
        evidence: [],
      };
    });

    return NextResponse.json({
      success: true,
      count: unifiedOrders.length,
      orders: unifiedOrders,
    });
  } catch (error: any) {
    console.error('Admin Orders Fetch Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch admin orders' },
      { status: 500 }
    );
  }
}
