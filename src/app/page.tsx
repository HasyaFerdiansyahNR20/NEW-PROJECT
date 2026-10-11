import Image from 'next/image';
import Link from 'next/link';
import {
  Books,
  BookmarkSimple,
  ArrowRight,
  ShieldCheck,
  WhatsappLogo,
  Lightning,
  Star,
} from '@phosphor-icons/react/dist/ssr';
import { getBooks, getGenres } from '@/server/services/book-service';
import { CatalogView } from '@/components/books/catalog-view';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [books, genres] = await Promise.all([getBooks(), getGenres()]);

  return (
    <div className="space-y-16 pb-20">
      {/* Editorial Split Hero Section (Complies with Design-Taste Anti-Center Bias) */}
      <section className="relative overflow-hidden border-b border-stone-200/80 bg-paper pt-12 pb-16 sm:pt-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content (max 4 elements: eyebrow, headline max 2 lines, subtext max 20 words, CTAs) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
                <BookmarkSimple size={14} weight="fill" />
                <span>Koleksi Digital Eksklusif</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-ink tracking-tight leading-[1.1]">
                Kisah Terbaik Nusantara, Dibaca Kapan Saja.
              </h1>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-[50ch]">
                Koleksi novel, komik, dan naskah fiksi terkurasi dengan akses instan ke perangkat digital Anda.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="#katalog">
                  <Button variant="primary" size="lg">
                    <span>Jelajahi Katalog Buku</span>
                    <ArrowRight size={18} weight="bold" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="secondary" size="lg">
                    Buat Akun Pembaca
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Asset / Featured Spotlight (Tactile Book Display) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm rounded-2xl bg-paper-alt p-6 border border-stone-200/90 shadow-book">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200/70 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  <span>Pilihan Kurator Minggu Ini</span>
                  <span className="flex items-center gap-1 text-amber-600">
                    <Star size={13} weight="fill" />
                    <span>4.9 / 5.0</span>
                  </span>
                </div>

                <div className="mt-4 flex gap-4 items-center">
                  <div className="relative w-24 h-32 rounded-lg overflow-hidden flex-shrink-0 shadow-md bg-stone-100">
                    <Image
                      src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80"
                      alt="Kala Langit Bersua Samudra"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <span className="text-[10px] uppercase font-bold text-brand-600 tracking-wider">
                      Novel Fiksi
                    </span>
                    <h3 className="font-serif font-bold text-base text-ink leading-snug mt-0.5">
                      Kala Langit Bersua Samudra
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">oleh Raka Pradana</p>
                    <p className="text-xs text-brand-600 font-bold mt-2">
                      Rp 89.000
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-200/70 flex items-center justify-between text-xs text-stone-500">
                  <span>Format: EPUB &amp; PDF</span>
                  <Link
                    href="#katalog"
                    className="font-bold text-brand-600 hover:text-brand-700"
                  >
                    Beli Sekarang &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Micro-Strip (Placed under hero per layout discipline) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl bg-white p-6 border border-stone-200/80 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 flex-shrink-0">
              <Lightning size={22} weight="fill" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-ink">Akses Baca Instan</h4>
              <p className="text-xs text-stone-500">Langsung tersedia setelah transaksi selesai</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 sm:border-l sm:border-stone-200 sm:pl-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <WhatsappLogo size={22} weight="fill" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-ink">Notifikasi WhatsApp</h4>
              <p className="text-xs text-stone-500">Konfirmasi status pesanan otomatis ke nomor Anda</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog View Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CatalogView initialBooks={books} genres={genres} />
      </section>
    </div>
  );
}
