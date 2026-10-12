import { createClient } from '@/lib/supabase/server';
import { Book, Genre, FilterState } from '@/types';

// Curated Fallback Data jika database Supabase belum di-seed
export const FALLBACK_GENRES: Genre[] = [
  { id: 'genre-novel-fiksi', name: 'Novel Fiksi', slug: 'novel-fiksi', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'genre-komik-manga', name: 'Komik & Manga', slug: 'komik-manga', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'genre-fantasi', name: 'Fantasi & Sci-Fi', slug: 'fantasi-scifi', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'genre-romansa', name: 'Romansa', slug: 'romansa', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'genre-misteri', name: 'Misteri & Thriller', slug: 'misteri-thriller', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'genre-pengembangan-diri', name: 'Pengembangan Diri', slug: 'pengembangan-diri', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

export const FALLBACK_BOOKS: Book[] = [
  {
    id: 'book-001',
    genre_id: 'genre-novel-fiksi',
    title: 'Kala Langit Bersua Samudra',
    author: 'Raka Pradana',
    price: 89000,
    rating: 4.9,
    stock: 45,
    description: 'Sebuah novel puitis tentang pertemuan takdir dua insan di pesisir Nusantara yang dipisahkan oleh rahasia masa lalu dan ikatan keluarga.',
    cover_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    genre: { id: 'genre-novel-fiksi', name: 'Novel Fiksi', slug: 'novel-fiksi', created_at: '', updated_at: '' },
  },
  {
    id: 'book-002',
    genre_id: 'genre-komik-manga',
    title: 'Pendekar Bayangan: Reinkarnasi',
    author: 'Arya Kusuma',
    price: 55000,
    rating: 4.8,
    stock: 60,
    description: 'Komik aksi epik petualangan ksatria kuno berkekuatan bayangan yang terbangun di era metropolis futuristik Jakarta 2099.',
    cover_url: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=600&q=80',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    genre: { id: 'genre-komik-manga', name: 'Komik & Manga', slug: 'komik-manga', created_at: '', updated_at: '' },
  },
  {
    id: 'book-003',
    genre_id: 'genre-fantasi',
    title: 'Kronik Lembah Abadi',
    author: 'Damian Vance',
    price: 105000,
    rating: 4.7,
    stock: 30,
    description: 'Kisah petualangan seorang pemuda pemahat batu yang menemukan gerbang purba menuju peradaban magis yang terlupakan ribuan tahun.',
    cover_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    genre: { id: 'genre-fantasi', name: 'Fantasi & Sci-Fi', slug: 'fantasi-scifi', created_at: '', updated_at: '' },
  },
  {
    id: 'book-004',
    genre_id: 'genre-romansa',
    title: 'Surat Musim Hujan di Kyoto',
    author: 'Hanako Dewi',
    price: 78000,
    rating: 4.9,
    stock: 25,
    description: 'Koleksi korespondensi intim dua pelajar pertukaran budaya yang menemukan ketenangan dan kedewasaan di tengah rintik hujan kuil bersejarah.',
    cover_url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    genre: { id: 'genre-romansa', name: 'Romansa', slug: 'romansa', created_at: '', updated_at: '' },
  },
  {
    id: 'book-005',
    genre_id: 'genre-misteri',
    title: 'Labirin Kertas Terbakar',
    author: 'Bramantyo Wicaksono',
    price: 95000,
    rating: 4.6,
    stock: 50,
    description: 'Detektif swasta mengusut kematian seorang kurator arsip rahasia perpustakaan kuno yang menyimpan petunjuk konspirasi dinasti pedagang rempah.',
    cover_url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    genre: { id: 'genre-misteri', name: 'Misteri & Thriller', slug: 'misteri-thriller', created_at: '', updated_at: '' },
  },
  {
    id: 'book-006',
    genre_id: 'genre-pengembangan-diri',
    title: 'Arsitektur Fokus Batin',
    author: 'Dr. Aris Sudiro',
    price: 115000,
    rating: 5.0,
    stock: 80,
    description: 'Panduan praktis mengembalikan kendali konsentrasi, kedamaian berpikir mendalam, dan ketajaman kerja di era hiruk-pikuk distraksi digital.',
    cover_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    genre: { id: 'genre-pengembangan-diri', name: 'Pengembangan Diri', slug: 'pengembangan-diri', created_at: '', updated_at: '' },
  },
  {
    id: 'book-007',
    genre_id: 'genre-komik-manga',
    title: 'Chrono Blade: Volume 1',
    author: 'Kenji & Satria',
    price: 62000,
    rating: 4.7,
    stock: 70,
    description: 'Manga pertarungan waktu di mana setiap detakan jantung menentukan kemenangan atau kepunahan di arena gladiator antar galaksi.',
    cover_url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    genre: { id: 'genre-komik-manga', name: 'Komik & Manga', slug: 'komik-manga', created_at: '', updated_at: '' },
  },
  {
    id: 'book-008',
    genre_id: 'genre-novel-fiksi',
    title: 'Mata Air Para Pujangga',
    author: 'Laksmi Wardhani',
    price: 82000,
    rating: 4.8,
    stock: 35,
    description: 'Kisah perjalanan sastra menelusuri jejak maestro legendaris yang mengasingkan diri ke lereng bukit berkabut demi menyelesaikan karya pamungkas.',
    cover_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    genre: { id: 'genre-novel-fiksi', name: 'Novel Fiksi', slug: 'novel-fiksi', created_at: '', updated_at: '' },
  },
];

export async function getGenres(): Promise<Genre[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('genres').select('*').order('name');
    if (error || !data || data.length === 0) {
      return FALLBACK_GENRES;
    }
    return data;
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
      query = query.or(`title.ilike.%${filters.search}%,author.ilike.%${filters.search}%`);
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
