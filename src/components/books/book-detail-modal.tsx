'use client';

import * as React from 'react';
import Image from 'next/image';
import { Star, ShoppingBag, Check, Books, BookmarkSimple } from '@phosphor-icons/react';
import { Book } from '@/types';
import { formatRupiah } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface BookDetailModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BookDetailModal({ book, isOpen, onClose }: BookDetailModalProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = React.useState(false);

  if (!book) return null;

  const handleAddToCart = () => {
    addItem(book, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-2">
        {/* Cover Preview */}
        <div className="sm:col-span-5 flex flex-col items-center">
          <div className="relative aspect-[3/4] w-full max-w-[220px] rounded-xl overflow-hidden border border-stone-200 shadow-book bg-stone-100">
            {book.cover_url ? (
              <Image
                src={book.cover_url}
                alt={book.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-stone-200 text-stone-500">
                Sampul
              </div>
            )}
          </div>
          <div className="mt-3 text-center">
            <span className="text-xs text-stone-500 block">Stok Digital</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
              Tersedia ({book.stock} lisensi)
            </span>
          </div>
        </div>

        {/* Book Details */}
        <div className="sm:col-span-7 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex flex-wrap gap-2 items-center mb-2">
              {book.genre?.name && (
                <Badge variant="genre">{book.genre.name}</Badge>
              )}
              <Badge variant="rating">
                <Star size={13} weight="fill" className="text-amber-500" />
                <span>{book.rating.toFixed(1)} / 5.0</span>
              </Badge>
            </div>

            <h2 className="text-2xl font-serif font-bold text-ink leading-tight">
              {book.title}
            </h2>
            <p className="text-sm font-medium text-stone-600 mt-1">
              Penulis: <span className="text-ink font-semibold">{book.author}</span>
            </p>

            <div className="mt-4 pt-3 border-t border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1.5">
                <BookmarkSimple size={14} weight="bold" />
                <span>Sinopsis Singkat</span>
              </h4>
              <p className="text-xs leading-relaxed text-stone-600 whitespace-pre-line">
                {book.description || 'Tidak ada deskripsi tersedia untuk buku ini.'}
              </p>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs text-stone-400 block">Harga Buku</span>
              <span className="text-xl font-bold text-brand-600">
                {formatRupiah(book.price)}
              </span>
            </div>

            <Button
              variant="primary"
              onClick={handleAddToCart}
              className="px-5"
            >
              {isAdded ? (
                <>
                  <Check size={18} weight="bold" />
                  <span>Dimasukkan</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} weight="bold" />
                  <span>Tambah ke Keranjang</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
