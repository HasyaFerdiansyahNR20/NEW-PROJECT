'use client';

import * as React from 'react';
import { Book, Genre, FilterState } from '@/types';
import { BookFilter } from './book-filter';
import { BookCard } from './book-card';
import { BookDetailModal } from './book-detail-modal';
import { Books, Sparkle } from '@phosphor-icons/react';

interface CatalogViewProps {
  initialBooks: Book[];
  genres: Genre[];
}

export function CatalogView({ initialBooks, genres }: CatalogViewProps) {
  const [filters, setFilters] = React.useState<FilterState>({
    genreId: null,
    minRating: null,
    search: '',
    sortBy: 'newest',
  });
  const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);

  // Filter logic on client for instant real-time feedback
  const filteredBooks = React.useMemo(() => {
    let result = [...initialBooks];

    // Filter by genre
    if (filters.genreId && filters.genreId !== 'all') {
      result = result.filter((b) => b.genre_id === filters.genreId);
    }

    // Filter by rating
    if (filters.minRating !== null) {
      result = result.filter((b) => b.rating >= filters.minRating!);
    }

    // Filter by search query
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          (b.description && b.description.toLowerCase().includes(q))
      );
    }

    // Sort
    if (filters.sortBy === 'price_low') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price_high') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    return result;
  }, [initialBooks, filters]);

  return (
    <div id="katalog" className="space-y-8 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-brand-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkle size={14} weight="fill" />
            <span>Koleksi Terkurasi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink">
            Jelajahi Katalog Buku &amp; Komik
          </h2>
        </div>
        <p className="text-xs text-stone-500 max-w-sm">
          Gunakan filter di bawah untuk menemukan bacaan yang paling pas dengan selera Anda.
        </p>
      </div>

      {/* Filter Component */}
      <BookFilter
        genres={genres}
        filters={filters}
        onChange={setFilters}
        totalResults={filteredBooks.length}
      />

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onSelect={(selected) => setSelectedBook(selected)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-300 p-12 text-center bg-paper-alt">
          <div className="w-14 h-14 rounded-full bg-stone-200 flex items-center justify-center mx-auto text-stone-500 mb-3">
            <Books size={28} />
          </div>
          <h3 className="font-semibold text-ink text-base">
            Tidak ada buku yang cocok
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
            Coba ubah kata kunci pencarian atau reset filter genre dan rating di atas.
          </p>
          <button
            onClick={() =>
              setFilters({
                genreId: null,
                minRating: null,
                search: '',
                sortBy: 'newest',
              })
            }
            className="mt-4 text-xs font-bold text-brand-600 hover:underline"
          >
            Reset Semua Filter
          </button>
        </div>
      )}

      {/* Detail Modal */}
      <BookDetailModal
        book={selectedBook}
        isOpen={Boolean(selectedBook)}
        onClose={() => setSelectedBook(null)}
      />
    </div>
  );
}
