const fs = require('fs');
const path = require('path');

// Read books from sync-openlibrary.js
const syncScript = fs.readFileSync(path.join(__dirname, 'sync-openlibrary.js'), 'utf-8');

// Extract GENRES and BOOKS
const genresMatch = syncScript.match(/const GENRES = (\[[\s\S]*?\]);/);
const booksMatch = syncScript.match(/const BOOKS = (\[[\s\S]*?\]);/);

if (!genresMatch || !booksMatch) {
  console.error('Could not parse GENRES or BOOKS');
  process.exit(1);
}

const GENRES = eval(genresMatch[1]);
const BOOKS = eval(booksMatch[1]);

// 1. Generate supabase/seed.sql
let seedSql = `-- =======================================================
-- LENTERA AKSARA - SEED DATA (OPEN LIBRARY VERIFIED)
-- Tepat 10 Buku per Kategori Genre (Total 60 Buku)
-- =======================================================

-- 1. SEED GENRES
INSERT INTO public.genres (id, name, slug) VALUES
`;

seedSql += GENRES.map(g => `('${g.id}', '${g.name.replace(/'/g, "''")}', '${g.slug}')`).join(',\n');
seedSql += `\nON CONFLICT (slug) DO NOTHING;\n\n`;

seedSql += `-- 2. SEED BOOKS (OPEN LIBRARY OFFICIAL COVERS & REAL METADATA)
INSERT INTO public.books (id, genre_id, title, author, price, rating, stock, description, cover_url) VALUES
`;

seedSql += BOOKS.map(b => {
  const desc = b.description.replace(/'/g, "''");
  const title = b.title.replace(/'/g, "''");
  const author = b.author.replace(/'/g, "''");
  return `(
    '${b.id}',
    '${b.genre_id}',
    '${title}',
    '${author}',
    ${b.price},
    ${b.rating.toFixed(1)},
    ${b.stock},
    '${desc}',
    '${b.cover_url}'
)`;
}).join(',\n');

seedSql += `\nON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    author = EXCLUDED.author,
    price = EXCLUDED.price,
    rating = EXCLUDED.rating,
    stock = EXCLUDED.stock,
    description = EXCLUDED.description,
    cover_url = EXCLUDED.cover_url;
`;

fs.writeFileSync(path.join(__dirname, '../supabase/seed.sql'), seedSql, 'utf-8');
console.log('Successfully generated supabase/seed.sql');

// 2. Generate src/server/services/book-service.ts
const genreMap = {};
GENRES.forEach(g => {
  genreMap[g.id] = g;
});

const fallbackBooks = BOOKS.map(b => {
  const g = genreMap[b.genre_id];
  return `  {
    id: ${JSON.stringify(b.id)},
    genre_id: ${JSON.stringify(b.genre_id)},
    title: ${JSON.stringify(b.title)},
    author: ${JSON.stringify(b.author)},
    price: ${b.price},
    rating: ${b.rating},
    stock: ${b.stock},
    description: ${JSON.stringify(b.description)},
    cover_url: ${JSON.stringify(b.cover_url)},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    genre: { id: ${JSON.stringify(g.id)}, name: ${JSON.stringify(g.name)}, slug: ${JSON.stringify(g.slug)}, created_at: '', updated_at: '' },
  }`;
}).join(',\n');

const fallbackGenres = GENRES.map(g => {
  return `  { id: ${JSON.stringify(g.id)}, name: ${JSON.stringify(g.name)}, slug: ${JSON.stringify(g.slug)}, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },`;
}).join('\n');

const bookServiceContent = `import { createClient } from '@/lib/supabase/server';
import { Book, Genre, FilterState } from '@/types';

// Curated Fallback Data Open Library (10 buku per genre, total 60 buku)
export const FALLBACK_GENRES: Genre[] = [
${fallbackGenres}
];

export const FALLBACK_BOOKS: Book[] = [
${fallbackBooks}
];

export async function getGenres(): Promise<Genre[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('genres').select('*').order('name');
    if (error || !data || data.length === 0) {
      return FALLBACK_GENRES;
    }
    return data as Genre[];
  } catch {
    return FALLBACK_GENRES;
  }
}

export async function getBooks(filters?: Partial<FilterState>): Promise<Book[]> {
  try {
    const supabase = await createClient();
    let query = supabase.from('books').select('*, genre:genres(*)');

    if (filters?.genreId && filters.genreId !== 'all') {
      query = query.eq('genre_id', filters.genreId);
    }

    if (filters?.minRating) {
      query = query.gte('rating', filters.minRating);
    }

    if (filters?.search) {
      query = query.or(\`title.ilike.%\${filters.search}%,author.ilike.%\${filters.search}%\`);
    }

    if (filters?.sortBy === 'price_low') {
      query = query.order('price', { ascending: true });
    } else if (filters?.sortBy === 'price_high') {
      query = query.order('price', { ascending: false });
    } else if (filters?.sortBy === 'rating') {
      query = query.order('rating', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return filterFallbackBooks(filters);
    }

    return data as Book[];
  } catch {
    return filterFallbackBooks(filters);
  }
}

export async function getBookById(id: string): Promise<Book | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('books').select('*, genre:genres(*)').eq('id', id).single();
    if (error || !data) {
      return FALLBACK_BOOKS.find((b) => b.id === id) || null;
    }
    return data as Book;
  } catch {
    return FALLBACK_BOOKS.find((b) => b.id === id) || null;
  }
}

function filterFallbackBooks(filters?: Partial<FilterState>): Book[] {
  let list = [...FALLBACK_BOOKS];

  if (filters?.genreId && filters.genreId !== 'all') {
    list = list.filter((b) => b.genre_id === filters.genreId);
  }

  if (filters?.minRating) {
    list = list.filter((b) => b.rating >= filters.minRating!);
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
  }

  if (filters?.sortBy === 'price_low') {
    list.sort((a, b) => a.price - b.price);
  } else if (filters?.sortBy === 'price_high') {
    list.sort((a, b) => b.price - a.price);
  } else if (filters?.sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  }

  return list;
}
`;

fs.writeFileSync(path.join(__dirname, '../src/server/services/book-service.ts'), bookServiceContent, 'utf-8');
console.log('Successfully generated src/server/services/book-service.ts');
