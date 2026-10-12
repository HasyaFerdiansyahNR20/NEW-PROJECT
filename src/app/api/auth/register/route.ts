import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { email, password, fullName, phoneNumber } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan kata sandi wajib diisi.' },
        { status: 400 }
      );
    }

    const admin = createAdminClient();

    // 1. Create user with email_confirm: true so no manual confirmation link is needed
    const { data, error: createError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        phone_number: phoneNumber,
      },
    });

    if (createError) {
      // If user already exists, check if unconfirmed and confirm them
      if (createError.message.includes('already registered')) {
        const { data: usersData } = await admin.auth.admin.listUsers();
        const existing = usersData?.users?.find((u) => u.email === email);
        if (existing) {
          await admin.auth.admin.updateUserById(existing.id, {
            email_confirm: true,
            password: password,
          });
          return NextResponse.json({ success: true, user: existing });
        }
      }
      return NextResponse.json({ error: createError.message }, { status: 400 });
    }

    // 2. Insert into profiles table
    if (data.user) {
      await admin.from('profiles').upsert({
        user_id: data.user.id,
        full_name: fullName || null,
        phone_number: phoneNumber || null,
        updated_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true, user: data.user });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Terjadi kesalahan sistem pendaftaran.' },
      { status: 500 }
    );
  }
}
