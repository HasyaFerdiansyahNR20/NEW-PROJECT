'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { isAdminUser } from '@/lib/auth-utils';

const AuthSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  fullName: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validation = AuthSchema.pick({ email: true, password: true }).safeParse({ email, password });
  if (!validation.success) {
    return { error: validation.error.errors[0].message };
  }

  const supabase = await createClient();
  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (isAdminUser(authData?.user)) {
    redirect('/admin');
  }

  redirect('/dashboard');
}

export async function registerAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;
  const phoneNumber = formData.get('phoneNumber') as string;

  const validation = AuthSchema.safeParse({ email, password, fullName, phoneNumber });
  if (!validation.success) {
    return { error: validation.error.errors[0].message };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone_number: phoneNumber,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Create or update profile record
  if (data.user) {
    await supabase.from('profiles').upsert({
      user_id: data.user.id,
      full_name: fullName || null,
      phone_number: phoneNumber || null,
    });
  }

  redirect('/dashboard');
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}

import { Profile } from '@/types';

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  return {
    ...user,
    profile: profile ? (profile as Profile) : null,
  };
}

export async function updateProfileAction(data: { fullName: string; phoneNumber: string }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Anda harus masuk terlebih dahulu.' };
  }

  const { error } = await supabase.from('profiles').upsert({
    user_id: user.id,
    full_name: data.fullName?.slice(0, 100) || null,
    phone_number: data.phoneNumber?.slice(0, 25) || null,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
