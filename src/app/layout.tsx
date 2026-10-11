import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CartDrawer } from '@/components/layout/cart-drawer';

export const metadata: Metadata = {
  title: 'Lentera Aksara — Toko Buku Digital & Novel Nusantara',
  description:
    'E-commerce toko buku digital fiktif terkurasi untuk novel, komik, dan karya sastra dengan sistem filter genre responsif dan notifikasi WhatsApp instan.',
  icons: {
    icon: '/icons/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-[100dvh] flex flex-col font-sans bg-paper text-ink antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <CartDrawer />
        <Footer />
      </body>
    </html>
  );
}
