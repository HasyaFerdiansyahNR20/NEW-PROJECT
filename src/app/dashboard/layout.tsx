import * as React from 'react';
import Link from 'next/link';
import { Books, User, ShoppingBag, SignOut, ShieldCheck, Wrench } from '@phosphor-icons/react/dist/ssr';
import { getCurrentUser, signOutAction } from '@/server/actions/auth-actions';
import { isAdminUser } from '@/lib/auth-utils';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const isAdmin = isAdminUser(user);

  return (
    <div className="min-h-[85dvh] bg-paper-alt">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Dashboard Sidebar */}
          <aside className="w-full md:w-64 bg-white rounded-2xl border border-stone-200/90 p-5 shadow-sm space-y-6 flex-shrink-0">
            <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  isAdmin ? 'bg-amber-100 text-amber-800' : 'bg-brand-100 text-brand-700'
                }`}
              >
                {isAdmin ? <ShieldCheck size={20} weight="fill" /> : <User size={20} weight="bold" />}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold text-ink truncate">
                  {isAdmin ? 'Administrator Toko' : 'Akun Pembaca'}
                </span>
                <span className="text-[11px] text-stone-500">
                  {isAdmin ? 'Merchant Lentera Aksara' : 'Lentera Aksara'}
                </span>
              </div>
            </div>

            <nav className="space-y-1 text-sm font-medium">
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold transition-colors shadow-sm mb-3"
                >
                  <Wrench size={18} weight="bold" />
                  <span>Menu CRUD Admin</span>
                </Link>
              )}

              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-brand-50 text-brand-700 font-semibold transition-colors"
              >
                <Books size={18} weight="duotone" />
                <span>Rak Buku Saya</span>
              </Link>

              <Link
                href="/#katalog"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors"
              >
                <ShoppingBag size={18} weight="duotone" />
                <span>{isAdmin ? 'Lihat Etalase Toko' : 'Beli Buku Baru'}</span>
              </Link>
            </nav>

            <div className="pt-4 border-t border-stone-100">
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <SignOut size={16} weight="bold" />
                  <span>Keluar Akun</span>
                </button>
              </form>
            </div>
          </aside>

          {/* Dashboard Content */}
          <main className="flex-1 w-full">{children}</main>
        </div>
      </div>
    </div>
  );
}
