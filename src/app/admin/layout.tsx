import * as React from 'react';
import Link from 'next/link';
import {
  Books,
  ShieldCheck,
  ShoppingBag,
  SignOut,
  SlidersHorizontal,
  WhatsappLogo,
  ArrowSquareOut,
} from '@phosphor-icons/react/dist/ssr';
import { getCurrentUser, signOutAction } from '@/server/actions/auth-actions';
import { redirect } from 'next/navigation';
import { isAdminUser } from '@/lib/auth-utils';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || !isAdminUser(user)) {
    redirect('/login?redirectedFrom=/admin');
  }

  const email = user.email || 'admin@lenteraaksara.id';

  return (
    <div className="min-h-[85dvh] bg-paper-alt">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Admin Sidebar */}
          <aside className="w-full md:w-64 bg-white rounded-2xl border border-stone-200/90 p-5 shadow-sm space-y-6 flex-shrink-0">
            {/* Merchant Identity Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <ShieldCheck size={22} weight="fill" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold text-ink truncate">
                  Administrator Toko
                </span>
                <span className="text-[11px] text-stone-500 truncate">{email}</span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-3 text-xs space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 block">
                Hak Akses Merchant
              </span>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                Akses penuh: Tambah, edit, dan hapus katalog buku serta harga secara real-time.
              </p>
            </div>

            {/* Admin Navigation */}
            <nav className="space-y-1.5 text-sm font-medium">
              <Link
                href="/admin"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-brand-50 text-brand-700 font-semibold transition-colors"
              >
                <SlidersHorizontal size={18} weight="duotone" />
                <span>CRUD Inventaris Buku</span>
              </Link>

              <Link
                href="/#katalog"
                className="flex items-center justify-between px-3 py-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={18} weight="duotone" />
                  <span>Etalase Publik</span>
                </div>
                <ArrowSquareOut size={14} className="text-stone-400" />
              </Link>
            </nav>

            {/* WhatsApp Integration Status */}
            <div className="pt-3 border-t border-stone-100 text-xs">
              <div className="flex items-center gap-2 text-stone-600 font-medium">
                <WhatsappLogo size={16} weight="fill" className="text-emerald-600" />
                <span>WA: 083890324481</span>
              </div>
              <span className="text-[10px] text-emerald-600 block pl-6">Gateway Aktif</span>
            </div>

            {/* Sign Out Action */}
            <div className="pt-2 border-t border-stone-100">
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <SignOut size={16} weight="bold" />
                  <span>Keluar Akun Admin</span>
                </button>
              </form>
            </div>
          </aside>

          {/* Admin Content Area */}
          <main className="flex-1 w-full overflow-hidden">{children}</main>
        </div>
      </div>
    </div>
  );
}
