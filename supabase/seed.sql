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
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80'
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
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80'
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
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80'
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
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80'
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
    'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80'
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
    'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80'
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
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80'
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
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80'
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    author = EXCLUDED.author,
    price = EXCLUDED.price,
    rating = EXCLUDED.rating,
    description = EXCLUDED.description,
    cover_url = EXCLUDED.cover_url;
