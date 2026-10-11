'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, User, Phone, EnvelopeSimple, Lock } from '@phosphor-icons/react';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function RegisterForm() {
  const router = useRouter();
  const [fullName, setFullName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone_number: phoneNumber,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      // Upsert to profiles table if possible
      if (data.user) {
        await supabase.from('profiles').upsert({
          user_id: data.user.id,
          full_name: fullName,
          phone_number: phoneNumber,
        });
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err?.message || 'Gagal mendaftarkan akun.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-xs font-medium text-red-700 border border-red-200">
          {error}
        </div>
      )}

      <Input
        label="Nama Lengkap"
        type="text"
        placeholder="Contoh: Rian Anggara"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />

      <Input
        label="Nomor WhatsApp"
        type="tel"
        placeholder="Contoh: 081234567890"
        helperText="Untuk pengiriman notifikasi pembelian dan akses buku digital"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />

      <Input
        label="Alamat Email"
        type="email"
        placeholder="nama@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="Kata Sandi"
        type="password"
        placeholder="Minimal 6 karakter"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button
        type="submit"
        variant="primary"
        className="w-full mt-2"
        isLoading={loading}
      >
        <UserPlus size={18} weight="bold" />
        <span>Buat Akun Sekarang</span>
      </Button>

      <p className="text-center text-xs text-stone-500 pt-3">
        Sudah memiliki akun?{' '}
        <Link href="/login" className="font-bold text-brand-600 hover:underline">
          Masuk di sini
        </Link>
      </p>
    </form>
  );
}
