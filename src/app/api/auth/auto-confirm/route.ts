import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

/**
 * Endpoint internal khusus pemeliharaan sistem (Maintenance / Cron).
 * Dilindungi token autentikasi internal untuk mencegah eksploitasi bypass konfirmasi email.
 */
export async function POST(request: Request) {
  try {
    const internalSecret = request.headers.get('x-internal-secret');
    const expectedSecret = process.env.INTERNAL_API_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!internalSecret || internalSecret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Akses ditolak: Diperlukan otorisasi internal sistem.' },
        { status: 403 }
      );
    }

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
