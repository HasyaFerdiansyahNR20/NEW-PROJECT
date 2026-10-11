'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  WhatsappLogo,
  ShieldCheck,
  CheckCircle,
  CreditCard,
  QrCode,
  ArrowLeft,
  ArrowRight,
} from '@phosphor-icons/react';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/useAuth';
import { formatRupiah } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart();
  const { user } = useAuth();

  const [customerName, setCustomerName] = React.useState('');
  const [customerPhone, setCustomerPhone] = React.useState('');
  const [customerEmail, setCustomerEmail] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState<'qris' | 'va'>('qris');
  const [loading, setLoading] = React.useState(false);
  const [orderSuccess, setOrderSuccess] = React.useState<any | null>(null);

  React.useEffect(() => {
    if (user) {
      setCustomerEmail(user.email || '');
      setCustomerName(user.user_metadata?.full_name || '');
      setCustomerPhone(user.user_metadata?.phone_number || '');
    }
  }, [user]);

  const handleProcessCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    try {
      const totalAmount = getTotalPrice();
      const orderId = `ORD-${Date.now().toString().slice(-6)}`;

      // Simulate WhatsApp Notification dispatch
      const waMessage = `Halo ${customerName}! Terima kasih telah berbelanja di Lentera Aksara. Pesanan #${orderId} sejumlah ${formatRupiah(totalAmount)} telah kami terima. Akses novel & komik digital Anda telah aktif di rak baca.`;

      // Simulating server action or calling API route
      await fetch('/api/webhooks/midtrans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: orderId,
          gross_amount: totalAmount,
          transaction_status: 'settlement',
          customer_phone: customerPhone,
          customer_name: customerName,
        }),
      }).catch(() => null);

      setOrderSuccess({
        orderId,
        totalAmount,
        customerName,
        customerPhone,
        itemsCount: getTotalItems(),
      });

      clearCart();
    } catch {
      alert('Terjadi kesalahan saat memproses pesanan.');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-[80dvh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg bg-white rounded-2xl border border-stone-200 p-8 shadow-book text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle size={36} weight="fill" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Transaksi Berhasil
            </span>
            <h1 className="text-2xl font-serif font-bold text-ink">
              Terima Kasih, {orderSuccess.customerName}!
            </h1>
            <p className="text-xs text-stone-500">
              Pesanan nomor <strong className="text-ink">#{orderSuccess.orderId}</strong> telah berhasil diproses.
            </p>
          </div>

          <div className="rounded-xl bg-paper p-4 text-left border border-stone-200 space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Total Pembayaran:</span>
              <strong className="text-ink font-bold">{formatRupiah(orderSuccess.totalAmount)}</strong>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Nomor WhatsApp:</span>
              <span className="text-ink font-semibold">{orderSuccess.customerPhone}</span>
            </div>
            <div className="flex items-center gap-1.5 pt-2 border-t border-stone-200 text-emerald-700 font-medium">
              <WhatsappLogo size={16} weight="fill" />
              <span>Notifikasi status pesanan telah dikirimkan ke WhatsApp Anda.</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link href="/" className="flex-1">
              <Button variant="secondary" className="w-full">
                Kembali ke Katalog
              </Button>
            </Link>
            <Link href="/dashboard" className="flex-1">
              <Button variant="primary" className="w-full">
                Buka Rak Buku Saya
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70dvh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 rounded-full bg-paper-warm flex items-center justify-center text-stone-400 mb-3">
          <ShoppingBag size={32} />
        </div>
        <h2 className="text-xl font-serif font-bold text-ink">Keranjang Anda Kosong</h2>
        <p className="text-xs text-stone-500 max-w-sm mt-1 mb-6">
          Silakan pilih novel atau komik favorit terlebih dahulu sebelum melakukan checkout.
        </p>
        <Link href="/">
          <Button variant="primary">
            <ArrowLeft size={16} weight="bold" />
            <span>Kembali ke Beranda</span>
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-ink"
        >
          <ArrowLeft size={14} weight="bold" />
          <span>Kembali ke Katalog</span>
        </Link>
        <h1 className="text-3xl font-serif font-bold text-ink mt-2">
          Penyelesaian Pesanan (Checkout)
        </h1>
      </div>

      <form onSubmit={handleProcessCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Data Pembeli & Metode Pembayaran */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 bg-white border-stone-200">
            <h3 className="font-semibold text-base text-ink mb-4 pb-2 border-b border-stone-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>Data Pembeli &amp; WhatsApp Gateway</span>
            </h3>

            <div className="space-y-4">
              <Input
                label="Nama Lengkap"
                placeholder="Contoh: Rian Anggara"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />

              <Input
                label="Nomor WhatsApp"
                type="tel"
                placeholder="Contoh: 081234567890"
                helperText="Status pesanan & tautan baca akan dikirim langsung via WhatsApp Gateway"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required
              />

              <Input
                label="Alamat Email"
                type="email"
                placeholder="nama@email.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
              />
            </div>
          </Card>

          <Card className="p-6 bg-white border-stone-200">
            <h3 className="font-semibold text-base text-ink mb-4 pb-2 border-b border-stone-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>Metode Pembayaran (Midtrans API)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setPaymentMethod('qris')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'qris'
                    ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-sm text-ink">
                  <QrCode size={20} className="text-brand-600" />
                  <span>QRIS Instan</span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  BCA, GoPay, OVO, Dana, ShopeePay
                </p>
              </div>

              <div
                onClick={() => setPaymentMethod('va')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'va'
                    ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-sm text-ink">
                  <CreditCard size={20} className="text-brand-600" />
                  <span>Virtual Account</span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  BCA, Mandiri, BNI, BRI VA
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Summary: Ringkasan Keranjang */}
        <div className="lg:col-span-5">
          <Card className="p-6 bg-paper border-stone-200 sticky top-20">
            <h3 className="font-semibold text-base text-ink mb-4 pb-2 border-b border-stone-200">
              Ringkasan Pesanan ({getTotalItems()} item)
            </h3>

            <div className="divide-y divide-stone-200 max-h-72 overflow-y-auto mb-4 pr-1">
              {items.map(({ book, quantity }) => (
                <div key={book.id} className="py-3 flex gap-3">
                  <div className="relative w-12 h-16 rounded overflow-hidden flex-shrink-0 bg-stone-200">
                    {book.cover_url && (
                      <Image
                        src={book.cover_url}
                        alt={book.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 text-xs">
                    <h4 className="font-semibold text-ink line-clamp-1">{book.title}</h4>
                    <p className="text-stone-500">{book.author}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-stone-500">{quantity}x</span>
                      <span className="font-bold text-ink">{formatRupiah(book.price * quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal Buku:</span>
                <span>{formatRupiah(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Biaya Admin &amp; Layanan:</span>
                <span className="text-emerald-700 font-semibold">Rp 0 (Gratis)</span>
              </div>
              <div className="border-t border-stone-200 pt-2 flex justify-between text-base font-bold text-ink">
                <span>Total Bayar:</span>
                <span className="text-brand-600">{formatRupiah(getTotalPrice())}</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-6 shadow-sm"
              isLoading={loading}
            >
              <span>Bayar &amp; Kirim Akses Sekarang</span>
              <ArrowRight size={18} weight="bold" />
            </Button>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>Transaksi dienkripsi SSL 256-bit</span>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
}
