import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { sendWhatsAppNotification } from '@/server/services/order-service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { order_id, transaction_status, gross_amount, customer_phone, customer_name } = body;

    let supabase;
    try {
      supabase = createAdminClient();
    } catch {
      // Fallback if admin key is not available in local dev
      return NextResponse.json({
        status: 'success',
        message: 'Mock callback processed (demo mode)',
      });
    }

    const isSuccess =
      transaction_status === 'capture' ||
      transaction_status === 'settlement' ||
      transaction_status === 'success';

    const orderStatus = isSuccess ? 'paid' : 'failed';

    // 1. Update order status
    await supabase
      .from('orders')
      .update({ status: orderStatus, updated_at: new Date().toISOString() })
      .eq('id', order_id);

    // 2. Update transaction
    await supabase
      .from('transactions')
      .update({
        payment_status: transaction_status,
        updated_at: new Date().toISOString(),
      })
      .eq('order_id', order_id);

    // 3. Trigger WhatsApp Gateway Notification
    if (isSuccess && customer_phone) {
      const message = `Halo ${customer_name || 'Pelanggan'}! Pembayaran untuk pesanan ${order_id} sebesar Rp ${gross_amount} telah sukses. Buku digital Anda sudah dapat diakses di dashboard Lentera Aksara.`;
      await sendWhatsAppNotification(order_id, customer_phone, message);
    }

    return NextResponse.json({
      status: 'success',
      order_id,
      payment_status: transaction_status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}
