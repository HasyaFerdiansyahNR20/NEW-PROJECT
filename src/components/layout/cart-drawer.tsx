'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash, Plus, Minus, ShoppingBag, ArrowRight } from '@phosphor-icons/react';
import { useCart } from '@/hooks/use-cart';
import { formatRupiah } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, getTotalPrice, getTotalItems } =
    useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-stone-200">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-paper">
          <div className="flex items-center gap-2">
            <ShoppingBag size={22} weight="duotone" className="text-brand-500" />
            <h2 className="font-bold text-lg text-ink">Keranjang Belanja</h2>
            <span className="bg-brand-100 text-brand-700 text-xs px-2 py-0.5 rounded-full font-semibold">
              {getTotalItems()}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-200/60 transition-colors"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-paper-warm flex items-center justify-center text-stone-400">
                <ShoppingBag size={32} weight="light" />
              </div>
              <h3 className="font-semibold text-stone-800">Keranjang Masih Kosong</h3>
              <p className="text-xs text-stone-500 max-w-xs">
                Pilih novel atau komik favorit Anda dari katalog untuk mulai membaca.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => setIsOpen(false)}
              >
                Jelajahi Katalog
              </Button>
            </div>
          ) : (
            items.map(({ book, quantity }) => (
              <div key={book.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                <div className="relative w-16 h-22 flex-shrink-0 rounded-lg overflow-hidden border border-stone-200 bg-stone-100">
                  {book.cover_url ? (
                    <Image
                      src={book.cover_url}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-stone-200 text-xs text-stone-500">
                      Buku
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-sm text-ink line-clamp-1 leading-snug">
                      {book.title}
                    </h4>
                    <p className="text-xs text-stone-500 mt-0.5">{book.author}</p>
                    <p className="text-xs font-bold text-brand-600 mt-1">
                      {formatRupiah(book.price)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-50">
                    <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                      <button
                        onClick={() => updateQuantity(book.id, quantity - 1)}
                        className="p-1 hover:bg-stone-200 text-stone-600 transition-colors rounded-l-lg"
                      >
                        <Minus size={14} weight="bold" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold text-ink">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(book.id, quantity + 1)}
                        className="p-1 hover:bg-stone-200 text-stone-600 transition-colors rounded-r-lg"
                      >
                        <Plus size={14} weight="bold" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(book.id)}
                      className="text-stone-400 hover:text-red-500 p-1 transition-colors"
                      title="Hapus dari keranjang"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-paper space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal ({getTotalItems()} item)</span>
                <span className="font-medium">{formatRupiah(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Biaya Layanan Digital</span>
                <span className="text-emerald-600 font-medium">Gratis</span>
              </div>
              <div className="border-t border-stone-200 pt-2 flex justify-between font-bold text-base text-ink">
                <span>Total Biaya</span>
                <span className="text-brand-600">{formatRupiah(getTotalPrice())}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex items-center justify-center font-semibold bg-brand-500 text-white hover:bg-brand-600 h-11 px-4 rounded-xl gap-2 transition-all active:scale-[0.98] shadow-sm"
            >
              <span>Lanjut ke Pembayaran</span>
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
