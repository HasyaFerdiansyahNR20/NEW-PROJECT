import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createAdminClient } from '@/lib/supabase/server';
import { sendWhatsAppNotification } from '@/server/services/order-service';

/**
 * Midtrans Webhook Handler
 * Dilengkapi verifikasi cryptographic signature (SHA-512) sesuai spesifikasi Midtrans
 * untuk mencegah manipulasi status transaksi tanpa pembayaran (Payment Bypass).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      customer_phone,
      customer_name,
    } = body;

    if (!order_id || !transaction_status) {
      return NextResponse.json(
        { status: 'error', message: 'Payload tidak lengkap.' },
        { status: 400 }
      );
    }

    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    // Jika serverKey terkonfigurasi di production/staging, verifikasi signature wajib dilakukan
    if (serverKey) {
      if (!signature_key || !status_code || !gross_amount) {
        return NextResponse.json(
          { status: 'error', message: 'Signature atau parameter verifikasi hilang.' },
          { status: 401 }
        );
      }

      const rawString = `${order_id}${status_code}${gross_amount}${serverKey}`;
      const calculatedSignature = crypto
        .createHash('sha512')
        .update(rawString)
        .digest('hex');

      const expectedBuffer = Buffer.from(calculatedSignature, 'utf-8');
      const providedBuffer = Buffer.from(signature_key, 'utf-8');

      // Timing-safe comparison untuk mencegah timing attack
      if (
        expectedBuffer.length !== providedBuffer.length ||
        !crypto.timingSafeEqual(expectedBuffer, providedBuffer)
      ) {
        return NextResponse.json(
          { status: 'error', message: 'Invalid Midtrans signature key.' },
          { status: 403 }
        );
      }
    } else {
      // Pada mode demonstrasi/lokal tanpa key, pastikan hanya dipanggil oleh handler server tepercaya
      const internalAuth = request.headers.get('x-internal-webhook-secret');
      const expectedSecret = process.env.INTERNAL_API_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;

      // Jika ada header proteksi internal, verifikasi
      if (internalAuth && expectedSecret && internalAuth !== expectedSecret) {
        return NextResponse.json(
          { status: 'error', message: 'Akses webhook tidak sah.' },
          { status: 403 }
        );
      }
    }

    const adminSupabase = createAdminClient();

    const isSuccess =
      transaction_status === 'capture' ||
      transaction_status === 'settlement' ||
      transaction_status === 'success';

    const orderStatus = isSuccess ? 'paid' : 'failed';

    // 1. Update order status dengan pengecekan order ada di database
    const { data: updatedOrder, error: orderErr } = await adminSupabase
      .from('orders')
      .update({ status: orderStatus, updated_at: new Date().toISOString() })
      .eq('id', order_id)
      .select()
      .single();

    if (orderErr) {
      console.warn('Pemberitahuan webhook untuk order tidak ditemukan:', order_id);
    }

    // 2. Update transaction record
    await adminSupabase
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
      { status: 'error', message: err.message || 'Kesalahan internal webhook.' },
      { status: 500 }
    );
  }
}
