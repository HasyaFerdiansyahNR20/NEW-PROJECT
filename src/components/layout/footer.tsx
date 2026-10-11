import Link from 'next/link';
import { Books, WhatsappLogo, ShieldCheck, Lightning } from '@phosphor-icons/react/dist/ssr';

export function Footer() {
  return (
    <footer className="border-t border-stone-200/80 bg-paper-alt text-stone-700">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white">
                <Books size={18} weight="fill" />
              </div>
              <span className="font-serif font-bold text-lg text-ink">
                Lentera Aksara
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Platform toko buku digital terkurasi untuk novel, komik, dan karya sastra Nusantara. Baca instan kapan saja.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink">
              Koleksi Utama
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#katalog" className="hover:text-brand-600 transition-colors">
                  Semua Katalog Buku
                </Link>
              </li>
              <li>
                <Link href="/#novel-fiksi" className="hover:text-brand-600 transition-colors">
                  Novel &amp; Cerita Pendek
                </Link>
              </li>
              <li>
                <Link href="/#komik-manga" className="hover:text-brand-600 transition-colors">
                  Komik &amp; Manga Digital
                </Link>
              </li>
              <li>
                <Link href="/#fantasi-scifi" className="hover:text-brand-600 transition-colors">
                  Fantasi &amp; Fiksi Ilmiah
                </Link>
              </li>
            </ul>
          </div>

          {/* Layanan & Transaksi */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink">
              Jaminan Layanan
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li className="flex items-center gap-2">
                <Lightning size={16} className="text-brand-500" />
                <span>Pengiriman Akses Baca Instan</span>
              </li>
              <li className="flex items-center gap-2">
                <WhatsappLogo size={16} className="text-emerald-600" />
                <span>Notifikasi WhatsApp Real-time</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-brand-500" />
                <span>Pembayaran Aman &amp; Terverifikasi</span>
              </li>
            </ul>
          </div>

          {/* Kontak & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink">
              Bantuan &amp; Kontak
            </h4>
            <p className="text-xs text-stone-600">
              Butuh bantuan pemesanan atau lisensi baca? Hubungi tim kurator kami.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-200/60 text-xs font-medium text-stone-800">
              <WhatsappLogo size={16} weight="fill" className="text-emerald-600" />
              <span>+62 812-3456-7890</span>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-stone-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-3">
          <p>&copy; {new Date().getFullYear()} Lentera Aksara. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">Syarat &amp; Ketentuan</span>
            <span className="hover:underline cursor-pointer">Kebijakan Privasi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
