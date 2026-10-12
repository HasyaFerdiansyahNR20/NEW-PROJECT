'use client';

import * as React from 'react';
import Image from 'next/image';
import { Star, ShoppingBag, Check, BookOpen } from '@phosphor-icons/react';
import { Book } from '@/types';
import { formatRupiah } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import { Badge } from '@/components/ui/badge';

interface BookCardProps {
  book: Book;
  onSelect?: (book: Book) => void;
}

export function BookCard({ book, onSelect }: BookCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = React.useState(false);
  const [imgSrc, setImgSrc] = React.useState(book.cover_url || `/covers/${book.id}.jpg`);
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    setImgSrc(book.cover_url || `/covers/${book.id}.jpg`);
    setImgError(false);
  }, [book.cover_url, book.id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(book, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div
      onClick={() => onSelect?.(book)}
      className="group relative flex flex-col rounded-card bg-white border border-stone-200/90 shadow-sm hover:shadow-book transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1"
    >
      {/* Cover Asset Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
        {imgSrc && !imgError ? (
          <Image
            src={imgSrc}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => {
              if (imgSrc !== `/covers/${book.id}.jpg`) {
                setImgSrc(`/covers/${book.id}.jpg`);
              } else {
                setImgError(true);
              }
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 p-4 text-center">
            <BookOpen size={36} className="text-stone-400 mb-2" />
            <span className="text-xs font-serif font-bold text-stone-700 line-clamp-2">{book.title}</span>
            <span className="text-[10px] text-stone-500 mt-1">{book.author}</span>
          </div>
        )}

        {/* Rating Floating Tag */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <Badge variant="rating" className="shadow-sm backdrop-blur-md bg-white/90">
            <Star size={12} weight="fill" className="text-amber-500" />
            <span>{book.rating.toFixed(1)}</span>
          </Badge>
        </div>

        {/* Genre Pill */}
        {book.genre?.name && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <Badge variant="genre" className="shadow-sm backdrop-blur-md bg-white/95">
              {book.genre.name}
            </Badge>
          </div>
        )}
      </div>

      {/* Meta Content */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          <p className="text-xs text-stone-500 font-medium truncate">
            {book.author}
          </p>
          <h3 className="font-semibold text-base text-ink leading-snug line-clamp-2 mt-1 group-hover:text-brand-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-xs text-stone-500 line-clamp-2 mt-2 leading-relaxed">
            {book.description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-stone-400 block font-medium">Harga Digital</span>
            <span className="font-bold text-base text-brand-600">
              {formatRupiah(book.price)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all active:scale-[0.96] ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-brand-500 text-white hover:bg-brand-600'
            }`}
          >
            {isAdded ? (
              <>
                <Check size={14} weight="bold" />
                <span>Masuk</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} weight="bold" />
                <span>Beli</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
