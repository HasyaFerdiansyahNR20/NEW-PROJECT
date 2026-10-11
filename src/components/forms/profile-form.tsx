'use client';

import * as React from 'react';
import { Check, FloppyDisk } from '@phosphor-icons/react';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ProfileFormProps {
  initialFullName?: string;
  initialPhoneNumber?: string;
  email?: string;
  userId: string;
}

export function ProfileForm({
  initialFullName = '',
  initialPhoneNumber = '',
  email = '',
  userId,
}: ProfileFormProps) {
  const [fullName, setFullName] = React.useState(initialFullName);
  const [phoneNumber, setPhoneNumber] = React.useState(initialPhoneNumber);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.from('profiles').upsert({
        user_id: userId,
        full_name: fullName,
        phone_number: phoneNumber,
        updated_at: new Date().toISOString(),
      });

      if (updateError) {
        setError(updateError.message);
      } else {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err: any) {
      setError(err?.message || 'Gagal menyimpan profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-4 max-w-lg">
      {success && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 border border-emerald-200">
          <Check size={16} weight="bold" />
          <span>Profil berhasil diperbarui.</span>
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-xs font-medium text-red-700 border border-red-200">
          {error}
        </div>
      )}

      <Input
        label="Email Terdaftar"
        type="email"
        value={email}
        disabled
        helperText="Email akun tidak dapat diubah"
      />

      <Input
        label="Nama Lengkap"
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />

      <Input
        label="Nomor WhatsApp"
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        helperText="Nomor aktif untuk pengiriman notifikasi pesanan digital"
        required
      />

      <Button type="submit" variant="primary" isLoading={loading} className="mt-2">
        <FloppyDisk size={18} weight="bold" />
        <span>Simpan Perubahan</span>
      </Button>
    </form>
  );
}
