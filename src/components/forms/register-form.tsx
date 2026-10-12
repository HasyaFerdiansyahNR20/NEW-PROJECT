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
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          fullName,
          phoneNumber,
        }),
      });

      const result = await res.json();
      if (!res.ok || result.error) {
        setError(result.error || 'Gagal mendaftarkan akun.');
        setLoading(false);
        return;
      }

      // Immediately sign in so user gets an active session
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // If login still requires manual confirmation or has warning, redirect to login
        router.push('/login');
      } else {
        router.push('/dashboard');
      }
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
        placeholder="Contoh: 083890324481"
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
