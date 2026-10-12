'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, EnvelopeSimple, ArrowLeft, Key, UserCircle } from '@phosphor-icons/react';
import { createClient } from '@/lib/supabase/client';
import { isAdminUser } from '@/lib/auth-utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AdminLoginFormProps {
  currentEmail?: string | null;
}

export function AdminLoginForm({ currentEmail }: AdminLoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = React.useState('admin@lenteraaksara.id');
  const [password, setPassword] = React.useState('AdminLentera2026!');
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      let { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // Handle unconfirmed email automatically if needed
      if (signInError && signInError.message.toLowerCase().includes('not confirmed')) {
        try {
          const confirmRes = await fetch('/api/auth/auto-confirm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });

          if (confirmRes.ok) {
            const retry = await supabase.auth.signInWithPassword({
              email,
              password,
            });
            signInData = retry.data;
            signInError = retry.error;
          }
        } catch {
          // ignore
        }
      }

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      const user = signInData?.user;
      if (!isAdminUser(user)) {
        setError('Akses ditolak: Akun ini tidak memiliki hak akses Administrator Toko.');
        setLoading(false);
        return;
      }

      // Hard redirect to reload full admin layout
      window.location.href = '/admin';
    } catch (err: any) {
      setError(err?.message || 'Terjadi kesalahan saat masuk.');
      setLoading(false);
    }
  };

  const handleUseOfficialAdmin = () => {
    setEmail('admin@lenteraaksara.id');
    setPassword('AdminLentera2026!');
    setError(null);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-xs">
          <ShieldCheck size={28} weight="fill" />
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">
            Portal Administrator
          </span>
          <h1 className="text-2xl font-serif font-bold text-ink mt-0.5">
            Masuk Khusus Admin
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Area terbatas untuk pengelolaan inventaris, stok lisensi, dan harga buku toko Lentera Aksara.
          </p>
        </div>
      </div>

      {/* Notice if logged in as customer */}
      {currentEmail && (
        <div className="rounded-xl bg-stone-50 border border-stone-200 p-3.5 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-stone-700">
            <UserCircle size={16} weight="bold" className="text-brand-600" />
            <span>Akun Saat Ini: {currentEmail}</span>
          </div>
          <p className="text-[11px] text-stone-500 leading-relaxed">
            Akun Anda terdaftar sebagai Akun Pembaca. Silakan masuk menggunakan kredensial Administrator Toko di bawah ini.
          </p>
        </div>
      )}

      {/* Quick fill preset */}
      <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-3 flex items-center justify-between text-xs">
        <div>
          <span className="font-semibold text-amber-900 block text-[11px]">Akun Admin Resmi</span>
          <span className="text-stone-600 font-mono text-[11px]">admin@lenteraaksara.id</span>
        </div>
        <button
          type="button"
          onClick={handleUseOfficialAdmin}
          className="text-[11px] font-bold text-amber-900 bg-amber-200/80 hover:bg-amber-300 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
        >
          <Key size={12} weight="bold" />
          <span>Isi Cepat</span>
        </button>
      </div>

      {/* Error alert */}
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-xs font-medium text-red-700 border border-red-200">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Administrator"
          type="email"
          placeholder="admin@lenteraaksara.id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Kata Sandi Admin"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold"
          disabled={loading}
        >
          {loading ? 'Memverifikasi Akses Admin...' : 'Masuk ke Dashboard Admin'}
        </Button>
      </form>

      {/* Footer Navigation */}
      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft size={14} weight="bold" />
          <span>Kembali ke Toko</span>
        </Link>

        <Link
          href="/dashboard"
          className="hover:text-brand-600 transition-colors"
        >
          Ke Ruang Baca Pembaca &rarr;
        </Link>
      </div>
    </div>
  );
}
