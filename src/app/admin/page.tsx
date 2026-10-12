import { getBooks, getGenres } from '@/server/services/book-service';
import { AdminInventoryTable } from '@/components/admin/admin-inventory-table';
import { formatRupiah } from '@/lib/utils';
import {
  Books,
  Tag,
  CurrencyCircleDollar,
  WhatsappLogo,
  ArrowSquareOut,
  ShieldCheck,
} from '@phosphor-icons/react/dist/ssr';
import { getCurrentUser } from '@/server/actions/auth-actions';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import { isAdminUser } from '@/lib/auth-utils';
import { AdminLoginForm } from '@/components/forms/admin-login-form';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user || !isAdminUser(user)) {
    return <AdminLoginForm currentEmail={user?.email} />;
  }

  const [books, genres] = await Promise.all([getBooks(), getGenres()]);

  // Compute business metrics
  const totalBooks = books.length;
  const totalGenres = genres.length;
  const totalInventoryValue = books.reduce(
    (sum, b) => sum + b.price * b.stock,
    0
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Admin Header Banner */}
      <div className="rounded-2xl bg-white p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Merchant Management Panel
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
              <ShieldCheck size={12} weight="fill" />
              <span>Verified Merchant</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink mt-1">
            Manajemen Katalog &amp; Inventaris Toko
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Kelola ketersediaan produk, hak lisensi digital, serta harga jual buku Lentera Aksara.
          </p>
        </div>

        <Link
          href="/#katalog"
          className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-[0.98]"
        >
          <span>Lihat Etalase Publik</span>
          <ArrowSquareOut size={16} weight="bold" />
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 flex-shrink-0">
            <Books size={24} weight="duotone" />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-medium block">
              Total Buku Aktif
            </span>
            <span className="text-2xl font-serif font-bold text-ink">
              {totalBooks} Judul
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
            <Tag size={24} weight="duotone" />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-medium block">
              Kategori Genre
            </span>
            <span className="text-2xl font-serif font-bold text-ink">
              {totalGenres} Kategori
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
            <CurrencyCircleDollar size={24} weight="duotone" />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-medium block">
              Valuasi Stok Lisensi
            </span>
            <span className="text-xl font-serif font-bold text-ink">
              {formatRupiah(totalInventoryValue)}
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
            <WhatsappLogo size={24} weight="fill" />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-medium block">
              WhatsApp Gateway
            </span>
            <span className="text-sm font-semibold text-emerald-700 block font-mono">
              083890324481
            </span>
            <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Siap Kirim Notifikasi
            </span>
          </div>
        </div>
      </div>

      {/* Main Inventory CRUD Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink font-serif">
            Inventaris Buku Digital
          </h2>
          <span className="text-xs text-stone-500">
            CRUD &amp; Manajemen Harga Real-time
          </span>
        </div>

        <AdminInventoryTable initialBooks={books} genres={genres} />
      </div>
    </div>
  );
}
