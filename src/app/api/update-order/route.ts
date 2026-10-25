import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { receipt, customerName, customerEmail, customerPhone, targetUrl } = await req.json();

    if (!receipt) {
      return NextResponse.json({ error: 'Receipt ID is required' }, { status: 400 });
    }

    const supabase = getServiceSupabase();
    if (supabase && isSupabaseConfigured) {
      const updateData: Record<string, any> = {
        updated_at: new Date().toISOString(),
      };
      if (customerName) updateData.customer_name = customerName;
      if (customerEmail) updateData.customer_email = customerEmail;
      if (customerPhone) updateData.customer_phone = customerPhone;
      if (targetUrl) updateData.target_url = targetUrl;

      await supabase
        .from('orders')
        .update(updateData)
        .eq('id', receipt);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Update Order Error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to update order' },
      { status: 500 }
    );
  }
}
