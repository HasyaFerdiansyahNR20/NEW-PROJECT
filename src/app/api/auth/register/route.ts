import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { z } from 'zod';

const RegisterSchema = z.object({
  email: z.string().email('Format email tidak valid').max(255),
  password: z.string().min(6, 'Kata sandi minimal 6 karakter').max(100),
  fullName: z.string().max(100).optional(),
  phoneNumber: z.string().max(25).optional(),
});

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const parseResult = RegisterSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, password, fullName, phoneNumber } = parseResult.data;
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
      // OWASP Remediation: Never overwrite existing user passwords on duplicate register!
      if (createError.message.includes('already registered')) {
        return NextResponse.json(
          { error: 'Email ini sudah terdaftar. Silakan gunakan menu masuk.' },
          { status: 409 }
        );
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
