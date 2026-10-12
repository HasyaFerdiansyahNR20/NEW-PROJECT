-- =======================================================
-- LENTERA AKSARA - SCHEMA DATABASE POSTGRESQL (SUPABASE)
-- =======================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. GENRES
CREATE TABLE IF NOT EXISTS public.genres (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROFILES (Extended User Data)
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    user_id TEXT NOT NULL UNIQUE,
    full_name TEXT,
    phone_number TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BOOKS (Katalog Novel & Komik Digital)
CREATE TABLE IF NOT EXISTS public.books (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    genre_id TEXT REFERENCES public.genres(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    price NUMERIC(12, 2) NOT NULL DEFAULT 0,
    rating NUMERIC(2, 1) NOT NULL DEFAULT 5.0,
    stock INTEGER NOT NULL DEFAULT 100,
    description TEXT,
    cover_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CARTS (Keranjang Belanja Pengguna)
CREATE TABLE IF NOT EXISTS public.carts (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    user_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CART ITEMS (Item dalam Keranjang)
CREATE TABLE IF NOT EXISTS public.cart_items (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    cart_id TEXT NOT NULL REFERENCES public.carts(id) ON DELETE CASCADE,
    book_id TEXT NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ORDERS (Catatan Transaksi Pesanan)
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    user_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, processing, completed, cancelled
    total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ORDER ITEMS (Rincian Item dalam Pesanan)
CREATE TABLE IF NOT EXISTS public.order_items (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    order_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    book_id TEXT NOT NULL REFERENCES public.books(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    price NUMERIC(12, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TRANSACTIONS (Pencatatan Status Pembayaran & Gateway)
CREATE TABLE IF NOT EXISTS public.transactions (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    order_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    payment_status TEXT NOT NULL DEFAULT 'unpaid', -- unpaid, settlement, expired, failed
    payment_gateway TEXT NOT NULL DEFAULT 'midtrans',
    amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. NOTIFICATION LOGS (Audit Log WhatsApp Gateway & Notifikasi)
CREATE TABLE IF NOT EXISTS public.notification_logs (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    user_id TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'sent', -- sent, queued, failed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- INDEXES UNTUK PERFORMA QUERY CEPAT
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_books_genre_id ON public.books(genre_id);
CREATE INDEX IF NOT EXISTS idx_books_rating ON public.books(rating DESC);
CREATE INDEX IF NOT EXISTS idx_books_price ON public.books(price ASC);
CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON public.cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================
ALTER TABLE public.genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_logs ENABLE ROW LEVEL SECURITY;

-- =======================================================
-- ROW LEVEL SECURITY (RLS) - OWASP LEAST PRIVILEGE HARDENED
-- =======================================================

-- 1. Genres & Books: Public Read Access (Katalog Publik)
CREATE POLICY "Public read genres" ON public.genres FOR SELECT USING (true);
CREATE POLICY "Public read books" ON public.books FOR SELECT USING (true);

-- 2. Profiles: Isolasi Data Pengguna Berdasarkan Auth UID (Mencegah IDOR)
CREATE POLICY "Users can only read own profile" 
    ON public.profiles FOR SELECT 
    USING (auth.uid()::TEXT = user_id);

CREATE POLICY "Users can only insert own profile" 
    ON public.profiles FOR INSERT 
    WITH CHECK (auth.uid()::TEXT = user_id);

CREATE POLICY "Users can only update own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid()::TEXT = user_id)
    WITH CHECK (auth.uid()::TEXT = user_id);

-- 3. Carts & Cart Items: Terisolasi untuk Pengguna Pemilik
CREATE POLICY "Users can manage own cart" 
    ON public.carts FOR ALL 
    USING (auth.uid()::TEXT = user_id)
    WITH CHECK (auth.uid()::TEXT = user_id);

CREATE POLICY "Users can manage own cart items" 
    ON public.cart_items FOR ALL 
    USING (EXISTS (
        SELECT 1 FROM public.carts 
        WHERE carts.id = cart_items.cart_id 
        AND carts.user_id = auth.uid()::TEXT
    ))
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.carts 
        WHERE carts.id = cart_items.cart_id 
        AND carts.user_id = auth.uid()::TEXT
    ));

-- 4. Orders: Pengguna Hanya Bisa Membaca Pesanan Miliknya Sendiri (Mencegah IDOR)
CREATE POLICY "Users can read own orders" 
    ON public.orders FOR SELECT 
    USING (auth.uid()::TEXT = user_id);

CREATE POLICY "Users can insert own orders" 
    ON public.orders FOR INSERT 
    WITH CHECK (auth.uid()::TEXT = user_id);

-- Pembaruan status pesanan (misal: 'paid') HANYA boleh melalui Service Role Server, BUKAN oleh user langsung!

-- 5. Order Items: Hanya Dapat Dibaca oleh Pemilik Pesanan
CREATE POLICY "Users can read own order items" 
    ON public.order_items FOR SELECT 
    USING (EXISTS (
        SELECT 1 FROM public.orders 
        WHERE orders.id = order_items.order_id 
        AND orders.user_id = auth.uid()::TEXT
    ));

-- 6. Transactions & Notification Logs: Terproteksi Penuh (Server Service Role Only)
-- Tidak ada policy publik anonim untuk tabel transaksi finansial dan audit log.

