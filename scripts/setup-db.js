/**
 * Lentera Aksara - Database Setup Helper
 * Petunjuk:
 * 1. Buka dashboard Supabase Anda di https://supabase.com/dashboard/project/cvihwknmtrxteaglvvlf
 * 2. Masuk ke menu "SQL Editor"
 * 3. Buka file "supabase/schema.sql" dan "supabase/seed.sql", salin isinya lalu klik "Run"
 * 4. Seluruh tabel, RLS, dan katalog buku novel/komik akan otomatis aktif!
 */

console.log('=====================================================');
console.log('LENTERA AKSARA - DATABASE SETUP HELPER');
console.log('=====================================================');
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cvihwknmtrxteaglvvlf.supabase.co');
console.log('\nLangkah Setup Database Supabase:');
console.log('1. Buka SQL Editor di Dashboard Supabase:');
console.log('   https://supabase.com/dashboard/project/cvihwknmtrxteaglvvlf/sql/new');
console.log('2. Copy & paste isi berkas:');
console.log('   - supabase/schema.sql (Membuat 9 tabel & RLS)');
console.log('   - supabase/seed.sql (Mengisi data genre & novel/komik terkurasi)');
console.log('3. Klik tombol "RUN" pada SQL Editor.');
console.log('=====================================================\n');
