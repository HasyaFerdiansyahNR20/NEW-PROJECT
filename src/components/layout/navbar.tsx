'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Books,
  ShoppingBag,
  User,
  List,
  X,
  MagnifyingGlass,
  SignIn,
  ShieldCheck,
} from '@phosphor-icons/react';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const pathname = usePathname();
  const { getTotalItems, toggleCart } = useCart();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const totalItems = getTotalItems();

  const navLinks = [
    { label: 'Katalog', href: '/#katalog' },
    { label: 'Novel Fiksi', href: '/#novel-fiksi' },
    { label: 'Komik & Manga', href: '/#komik-manga' },
    { label: 'Tentang Kami', href: '/#tentang' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-paper/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Books size={22} weight="fill" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg leading-tight tracking-tight text-ink group-hover:text-brand-600 transition-colors">
              Lentera Aksara
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-stone-500">
              Toko Buku Digital
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Single Line Discipline) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-brand-600 transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions: Search, Cart, User */}
        <div className="flex items-center gap-2.5">
          {/* Cart Trigger */}
          <button
            onClick={toggleCart}
            className="relative p-2 rounded-xl text-stone-700 hover:bg-stone-200/60 hover:text-ink transition-colors flex items-center justify-center"
            aria-label="Keranjang Belanja"
          >
            <ShoppingBag size={22} weight="duotone" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-[11px] font-bold text-white shadow-sm">
                {totalItems}
              </span>
            )}
          </button>

          {/* User Auth or Dashboard */}
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/admin">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs font-semibold text-stone-600 hover:text-brand-600 gap-1.5 border border-stone-200/80 rounded-xl"
                >
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>Admin</span>
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="secondary" size="sm">
                  <User size={16} weight="bold" />
                  <span>Dashboard</span>
                </Button>
              </Link>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  <SignIn size={16} />
                  <span>Masuk</span>
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">
                  Daftar
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-stone-700 hover:bg-stone-200/60 md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-stone-200 bg-paper p-4 md:hidden space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-brand-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center gap-2"
              >
                <ShieldCheck size={16} className="text-emerald-600" />
                <span>Panel Admin Toko</span>
              </Link>
            )}
          </nav>
          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            {user ? (
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" size="sm" className="w-full">
                  <User size={16} weight="bold" />
                  <span>Dashboard Akun</span>
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Masuk ke Akun
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full">
                    Daftar Akun Baru
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
