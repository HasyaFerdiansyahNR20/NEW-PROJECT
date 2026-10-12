import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: 'Email wajib diisi' }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data: usersData, error: listError } = await admin.auth.admin.listUsers();

    if (listError) {
      return NextResponse.json({ error: listError.message }, { status: 400 });
    }

    const user = usersData?.users?.find((u) => u.email === email);
    if (!user) {
      return NextResponse.json({ error: 'Pengguna tidak ditemukan' }, { status: 404 });
    }

    const { error: updateError } = await admin.auth.admin.updateUserById(user.id, {
      email_confirm: true,
    });

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, email });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
