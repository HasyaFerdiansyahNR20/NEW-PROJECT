'use client';

import * as React from 'react';
import { MagnifyingGlass, Funnel, Star, X } from '@phosphor-icons/react';
import { Genre, FilterState } from '@/types';

interface BookFilterProps {
  genres: Genre[];
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  totalResults: number;
}

export function BookFilter({
  genres,
  filters,
  onChange,
  totalResults,
}: BookFilterProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, search: e.target.value });
  };

  const handleGenreClick = (genreId: string | null) => {
    onChange({ ...filters, genreId });
  };

  const handleRatingClick = (minRating: number | null) => {
    onChange({ ...filters, minRating });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...filters,
      sortBy: e.target.value as FilterState['sortBy'],
    });
  };

  const clearAllFilters = () => {
    onChange({
      genreId: null,
      minRating: null,
      search: '',
      sortBy: 'newest',
    });
  };

  const hasActiveFilters =
    filters.genreId !== null ||
    filters.minRating !== null ||
    filters.search.trim() !== '' ||
    filters.sortBy !== 'newest';

  return (
    <div className="space-y-4 rounded-2xl bg-white p-5 border border-stone-200/90 shadow-sm">
      {/* Top Bar: Search Input & Sort Selector */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <MagnifyingGlass
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="text"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Cari judul novel, komik, atau nama penulis..."
            className="w-full rounded-xl border border-stone-300 bg-paper pl-10 pr-9 py-2.5 text-sm text-ink placeholder:text-stone-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500 transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => onChange({ ...filters, search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-stone-500 whitespace-nowrap">
            Urutkan:
          </label>
          <select
            value={filters.sortBy}
            onChange={handleSortChange}
            className="rounded-xl border border-stone-300 bg-paper px-3 py-2 text-xs font-medium text-ink focus:border-brand-500 focus:outline-none"
          >
            <option value="newest">Paling Baru</option>
            <option value="rating">Rating Tertinggi</option>
            <option value="price_low">Harga Terendah</option>
            <option value="price_high">Harga Tertinggi</option>
          </select>
        </div>
      </div>

      {/* Middle Bar: Genre Pills */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
            Kategori Genre
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-brand-600 hover:text-brand-700 font-semibold inline-flex items-center gap-1"
            >
              <span>Reset Filter</span>
              <X size={12} weight="bold" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleGenreClick(null)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              filters.genreId === null
                ? 'bg-ink text-white shadow-sm'
                : 'bg-paper hover:bg-stone-200/70 text-stone-700 border border-stone-200'
            }`}
          >
            Semua Genre
          </button>
          {genres.map((g) => (
            <button
              key={g.id}
              onClick={() => handleGenreClick(g.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                filters.genreId === g.id
                  ? 'bg-brand-500 text-white shadow-sm font-semibold'
                  : 'bg-paper hover:bg-stone-200/70 text-stone-700 border border-stone-200'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Bar: Rating Filter & Status Count */}
      <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-stone-600">
            Minimum Rating:
          </span>
          <div className="flex gap-1.5">
            {[null, 4.5, 4.8, 5.0].map((rate) => (
              <button
                key={rate === null ? 'all' : rate}
                onClick={() => handleRatingClick(rate)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  filters.minRating === rate
                    ? 'bg-amber-500 text-white font-bold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {rate === null ? (
                  'Semua'
                ) : (
                  <>
                    <Star size={12} weight="fill" />
                    <span>{rate}+</span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-stone-500">
          Menampilkan <strong className="text-ink">{totalResults}</strong> buku digital
        </div>
      </div>
    </div>
  );
}
