'use server';

import { createOrder, sendWhatsAppNotification } from '@/server/services/order-service';
import { createAdminClient } from '@/lib/supabase/server';
import { formatRupiah } from '@/lib/utils';
import { z } from 'zod';

const CheckoutSchema = z.object({
  customerName: z.string().min(1, 'Nama wajib diisi').max(100),
  customerPhone: z.string().min(8, 'Nomor telepon minimal 8 digit').max(20),
  items: z.array(
    z.object({
      bookId: z.string(),
      quantity: z.number().int().positive(),
    })
  ).min(1, 'Keranjang belanja tidak boleh kosong'),
});

export async function processCheckoutAction(formData: {
  customerName: string;
  customerPhone: string;
  items: { bookId: string; quantity: number }[];
}) {
  const parseResult = CheckoutSchema.safeParse(formData);
  if (!parseResult.success) {
    return { error: parseResult.error.errors[0].message };
  }

  const { customerName, customerPhone, items } = parseResult.data;

  // 1. Buat pesanan dengan verifikasi harga di server
  const { order, error: orderErr } = await createOrder({
    items,
    customerName,
    customerPhone,
  });

  if (orderErr || !order) {
    return { error: orderErr || 'Gagal memproses pesanan.' };
  }

  // 2. Dalam mode demonstrasi/simulasi, tandai pesanan lunas secara aman di server
  // (BUKAN dipanggil bebas oleh frontend melalui webhook publik)
  try {
    const adminSupabase = createAdminClient();
    await adminSupabase
      .from('orders')
      .update({ status: 'paid', updated_at: new Date().toISOString() })
      .eq('id', order.id);

    await adminSupabase
      .from('transactions')
      .update({ payment_status: 'settlement', updated_at: new Date().toISOString() })
      .eq('order_id', order.id);

    // 3. Kirim notifikasi WhatsApp
    const waMessage = `Halo ${customerName}! Pembayaran untuk pesanan ${order.id} sebesar ${formatRupiah(order.total_amount)} telah terkonfirmasi. Buku digital Anda telah aktif di rak baca Lentera Aksara.`;
    await sendWhatsAppNotification(order.id, customerPhone, waMessage);
  } catch (err: any) {
    console.warn('Peringatan penyelesaian pesanan demonstrasi:', err.message);
  }

  return {
    success: true,
    orderId: order.id,
    totalAmount: order.total_amount,
    customerName,
    customerPhone,
  };
}
