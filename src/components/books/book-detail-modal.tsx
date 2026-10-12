'use client';

import * as React from 'react';
import Image from 'next/image';
import { Star, ShoppingBag, Check, Books, BookmarkSimple, ShieldCheck, DeviceMobile, Lightning } from '@phosphor-icons/react';
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
  const [imgSrc, setImgSrc] = React.useState(book?.cover_url || (book ? `/covers/${book.id}.jpg` : ''));
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    if (book) {
      setImgSrc(book.cover_url || `/covers/${book.id}.jpg`);
      setImgError(false);
    }
  }, [book?.cover_url, book?.id]);

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
            {imgSrc && !imgError ? (
              <Image
                src={imgSrc}
                alt={book.title}
                fill
                className="object-cover"
                onError={() => {
                  if (imgSrc !== `/covers/${book.id}.jpg`) {
                    setImgSrc(`/covers/${book.id}.jpg`);
                  } else {
                    setImgError(true);
                  }
                }}
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
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                <ShieldCheck size={13} weight="fill" />
                <span>Open Library Verified</span>
              </span>
            </div>

            <h2 className="text-2xl font-serif font-bold text-ink leading-tight">
              {book.title}
            </h2>
            <p className="text-sm font-medium text-stone-600 mt-1">
              Penulis: <span className="text-ink font-semibold">{book.author}</span>
            </p>

            <div className="mt-3.5 pt-3 border-t border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1.5">
                <BookmarkSimple size={14} weight="bold" />
                <span>Sinopsis Resmi</span>
              </h4>
              <p className="text-xs leading-relaxed text-stone-600 whitespace-pre-line max-h-36 overflow-y-auto pr-1">
                {book.description || 'Tidak ada deskripsi tersedia untuk buku ini.'}
              </p>
            </div>

            {/* Digital License Metadata */}
            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-200/60">
              <div className="flex items-center gap-1.5">
                <DeviceMobile size={14} className="text-brand-600 flex-shrink-0" />
                <span>Format: EPUB &amp; PDF</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lightning size={14} className="text-amber-600 flex-shrink-0" />
                <span>Akses Baca Seketika</span>
              </div>
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
