import Link from 'next/link';
import { Books, ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[70dvh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
        <Books size={32} weight="duotone" />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
        Galat 404
      </span>
      <h1 className="text-3xl font-serif font-bold text-ink mt-1 mb-2">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-xs text-stone-500 max-w-sm mb-6 leading-relaxed">
        Halaman atau naskah buku digital yang Anda cari tidak tersedia atau telah dipindahkan.
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
