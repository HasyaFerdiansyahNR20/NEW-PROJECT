-- =======================================================
-- LENTERA AKSARA - SEED DATA (GENRE & BUKU / KOMIK)
-- =======================================================

-- 1. SEED GENRES
INSERT INTO public.genres (id, name, slug) VALUES
('genre-novel-fiksi', 'Novel Fiksi', 'novel-fiksi'),
('genre-komik-manga', 'Komik & Manga', 'komik-manga'),
('genre-fantasi', 'Fantasi & Sci-Fi', 'fantasi-scifi'),
('genre-romansa', 'Romansa', 'romansa'),
('genre-misteri', 'Misteri & Thriller', 'misteri-thriller'),
('genre-pengembangan-diri', 'Pengembangan Diri', 'pengembangan-diri')
ON CONFLICT (slug) DO NOTHING;

-- 2. SEED BOOKS & COMICS
INSERT INTO public.books (id, genre_id, title, author, price, rating, stock, description, cover_url) VALUES
(
    'book-001',
    'genre-novel-fiksi',
    'Kala Langit Bersua Samudra',
    'Raka Pradana',
    89000,
    4.9,
    45,
    'Sebuah novel puitis tentang pertemuan takdir dua insan di pesisir Nusantara yang dipisahkan oleh rahasia masa lalu.',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
),
(
    'book-002',
    'genre-komik-manga',
    'Pendekar Bayangan: Reinkarnasi',
    'Arya Kusuma',
    55000,
    4.8,
    60,
    'Komik aksi epik petualangan ksatria kuno yang terbangun di era metropolis futuristik Jakarta 2099.',
    'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=600&q=80'
),
(
    'book-003',
    'genre-fantasi',
    'Kronik Lembah Abadi',
    'Damian Vance',
    105000,
    4.7,
    30,
    'Kisah petualangan seorang pemuda pemahat batu yang menemukan gerbang menuju peradaban magis yang terlupakan.',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
),
(
    'book-004',
    'genre-romansa',
    'Surat Musim Hujan di Kyoto',
    'Hanako Dewi',
    78000,
    4.9,
    25,
    'Koleksi korespondensi intim dua pelajar pertukaran budaya yang menemukan ketenangan di tengah rintik hujan.',
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80'
),
(
    'book-005',
    'genre-misteri',
    'Labirin Kertas Terbakar',
    'Bramantyo Wicaksono',
    95000,
    4.6,
    50,
    'Detektif swasta mengusut kematian seorang kurator arsip rahasia perpustakaan kuno di pedalaman Jawa Barat.',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80'
),
(
    'book-006',
    'genre-pengembangan-diri',
    'Arsitektur Fokus Batin',
    'Dr. Aris Sudiro',
    115000,
    5.0,
    80,
    'Panduan praktis mengembalikan kendali konsentrasi, kedamaian berpikir, dan ketajaman kerja di era distraksi digital.',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80'
),
(
    'book-007',
    'genre-komik-manga',
    'Chrono Blade: Volume 1',
    'Kenji & Satria',
    62000,
    4.7,
    70,
    'Manga pertarungan waktu di mana setiap detakan jantung menentukan kemenangan atau kekalahan di medan gladiator dimensi.',
    'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80'
),
(
    'book-008',
    'genre-novel-fiksi',
    'Mata Air Para Pujangga',
    'Laksmi Wardhani',
    82000,
    4.8,
    35,
    'Kisah perjalanan menelusuri jejak sastrawan hilang yang meninggalkan naskah rahasia di pelosok perbukitan Menoreh.',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80'
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    author = EXCLUDED.author,
    price = EXCLUDED.price,
    rating = EXCLUDED.rating,
    description = EXCLUDED.description,
    cover_url = EXCLUDED.cover_url;
