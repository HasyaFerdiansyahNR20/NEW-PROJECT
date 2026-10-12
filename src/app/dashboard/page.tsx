import { getCurrentUser } from '@/server/actions/auth-actions';
import { getUserOrders } from '@/server/services/order-service';
import { FALLBACK_BOOKS } from '@/server/services/book-service';
import { ProfileForm } from '@/components/forms/profile-form';
import { Card } from '@/components/ui/card';
import { Books, ShoppingBag } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  // If user is not yet logged in or demo mode, provide sample data
  const userId = user?.id || 'demo-user-id';
  const email = user?.email || 'demo@lenteraaksara.id';
  const fullName = user?.profile?.full_name || user?.user_metadata?.full_name || 'Pembaca Setia';
  const phoneNumber = user?.profile?.phone_number || user?.user_metadata?.phone_number || '083890324481';

  const orders = await getUserOrders(userId);

  // Digital shelf (purchased collection mock or order items)
  const purchasedBooks = FALLBACK_BOOKS.slice(0, 2);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-white p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
            Ruang Baca Digital
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink mt-1">
            Selamat Datang, {fullName}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Akses seluruh buku digital yang telah Anda miliki di sini.
          </p>
        </div>

        <Link
          href="/#katalog"
          className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-[0.98]"
        >
          <ShoppingBag size={16} weight="bold" />
          <span>Tambah Koleksi Buku</span>
        </Link>
      </div>

      {/* Digital Bookshelf */}
      <Card className="p-6 bg-white border-stone-200">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <Books size={22} className="text-brand-600" weight="duotone" />
            <h2 className="text-lg font-bold text-ink">Koleksi Buku Aktif Saya</h2>
          </div>
          <span className="text-xs text-stone-500">
            {purchasedBooks.length} Buku Siap Baca
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          {purchasedBooks.map((book) => (
            <div
              key={book.id}
              className="flex gap-4 p-4 rounded-xl border border-stone-200/80 bg-paper hover:border-brand-300 transition-all"
            >
              <div className="relative w-20 h-28 rounded-lg overflow-hidden flex-shrink-0 bg-stone-200 shadow-sm">
                {book.cover_url && (
                  <Image
                    src={book.cover_url}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full inline-block">
                    Lisensi Resmi Aktif
                  </span>
                  <h3 className="font-semibold text-sm text-ink leading-snug mt-1.5">
                    {book.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">{book.author}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-200/60 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400">Format: EPUB/PDF</span>
                  <button className="text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline">
                    Baca Sekarang &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Profile Settings */}
      <Card className="p-6 sm:p-8 bg-white border-stone-200 max-w-2xl">
        <h2 className="text-lg font-bold text-ink mb-1">Pengaturan Profil</h2>
        <p className="text-xs text-stone-500 mb-6 pb-3 border-b border-stone-100">
          Kelola identitas akun dan nomor WhatsApp Anda untuk kebutuhan transaksi.
        </p>

        <ProfileForm
          userId={userId}
          email={email}
          initialFullName={fullName}
          initialPhoneNumber={phoneNumber}
        />
      </Card>
    </div>
  );
}
