import Link from 'next/link';
import { Books } from '@phosphor-icons/react/dist/ssr';
import { RegisterForm } from '@/components/forms/register-form';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'Daftar Akun Baru — Lentera Aksara',
  description: 'Daftar akun baru di toko buku digital Lentera Aksara.',
};

export default function RegisterPage() {
  return (
    <div className="min-h-[80dvh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white">
              <Books size={22} weight="fill" />
            </div>
            <span className="font-serif font-bold text-xl text-ink">
              Lentera Aksara
            </span>
          </Link>
          <h1 className="text-2xl font-serif font-bold text-ink">
            Mulai Petualangan Literasi
          </h1>
          <p className="text-xs text-stone-500">
            Daftarkan akun untuk menikmati kemudahan membaca dan notifikasi WhatsApp instan.
          </p>
        </div>

        <Card className="p-6 sm:p-8 bg-white border-stone-200">
          <RegisterForm />
        </Card>
      </div>
    </div>
  );
}
