'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Plus,
  MagnifyingGlass,
  PencilSimple,
  Trash,
  BookOpen,
  Check,
  X,
  Funnel,
} from '@phosphor-icons/react';
import { Book, Genre } from '@/types';
import { formatRupiah } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import {
  createAdminBookAction,
  updateAdminBookAction,
  deleteAdminBookAction,
} from '@/server/actions/admin-book-actions';

interface AdminInventoryTableProps {
  initialBooks: Book[];
  genres: Genre[];
}

export function AdminInventoryTable({
  initialBooks,
  genres,
}: AdminInventoryTableProps) {
  const [books, setBooks] = React.useState<Book[]>(initialBooks);
  const [search, setSearch] = React.useState('');
  const [selectedGenre, setSelectedGenre] = React.useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingBook, setEditingBook] = React.useState<Book | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = React.useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [genreId, setGenreId] = React.useState('');
  const [price, setPrice] = React.useState<number>(65000);
  const [stock, setStock] = React.useState<number>(50);
  const [description, setDescription] = React.useState('');
  const [coverUrl, setCoverUrl] = React.useState('/covers/book-nf-01.jpg');

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [notification, setNotification] = React.useState<string | null>(null);

  React.useEffect(() => {
    setBooks(initialBooks);
  }, [initialBooks]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenAddModal = () => {
    setEditingBook(null);
    setTitle('');
    setAuthor('');
    setGenreId(genres[0]?.id || 'genre-novel-fiksi');
    setPrice(65000);
    setStock(50);
    setDescription('');
    setCoverUrl('/covers/book-nf-01.jpg');
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (b: Book) => {
    setEditingBook(b);
    setTitle(b.title);
    setAuthor(b.author);
    setGenreId(b.genre_id || genres[0]?.id || 'genre-novel-fiksi');
    setPrice(b.price);
    setStock(b.stock);
    setDescription(b.description || '');
    setCoverUrl(b.cover_url || '/covers/book-nf-01.jpg');
    setError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (editingBook) {
        // Edit existing book
        const res = await updateAdminBookAction(editingBook.id, {
          title,
          author,
          genreId,
          price: Number(price),
          stock: Number(stock),
          description,
          coverUrl,
        });

        if (res.error) {
          setError(res.error);
        } else {
          setBooks((prev) =>
            prev.map((b) =>
              b.id === editingBook.id
                ? {
                    ...b,
                    title,
                    author,
                    genre_id: genreId,
                    price: Number(price),
                    stock: Number(stock),
                    description,
                    cover_url: coverUrl,
                    genre: genres.find((g) => g.id === genreId) || b.genre,
                  }
                : b
            )
          );
          setIsModalOpen(false);
          showToast(`Buku "${title}" berhasil diperbarui.`);
        }
      } else {
        // Add new book
        const res = await createAdminBookAction({
          title,
          author,
          genreId,
          price: Number(price),
          stock: Number(stock),
          description,
          coverUrl,
        });

        if (res.error) {
          setError(res.error);
        } else if (res.book) {
          const newBook: Book = {
            ...res.book,
            genre: genres.find((g) => g.id === genreId) || null,
          };
          setBooks((prev) => [newBook, ...prev]);
          setIsModalOpen(false);
          showToast(`Buku baru "${title}" berhasil ditambahkan.`);
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Terjadi kesalahan operasi.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const res = await deleteAdminBookAction(id);
      if (res.error) {
        showToast(`Gagal menghapus: ${res.error}`);
      } else {
        setBooks((prev) => prev.filter((b) => b.id !== id));
        showToast('Buku berhasil dihapus dari katalog.');
        setDeleteConfirmId(null);
      }
    } catch (err: any) {
      showToast(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Filtered books
  const filteredBooks = books.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());
    const matchGenre = selectedGenre === 'all' || b.genre_id === selectedGenre;
    return matchSearch && matchGenre;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-ink text-white px-4 py-3 text-xs font-semibold shadow-xl animate-fade-in border border-stone-700">
          <Check size={16} weight="bold" className="text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Control Strip */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm">
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <MagnifyingGlass
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              type="text"
              placeholder="Cari judul buku atau penulis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-paper border border-stone-200 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>

          {/* Genre Dropdown Filter */}
          <div className="relative min-w-[180px]">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-paper border border-stone-200 text-stone-700 focus:outline-none focus:border-brand-500 font-medium"
            >
              <option value="all">Semua Kategori ({books.length})</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Book CTA */}
        <Button
          variant="primary"
          onClick={handleOpenAddModal}
          className="flex-shrink-0 gap-2"
        >
          <Plus size={16} weight="bold" />
          <span>Tambah Buku Baru</span>
        </Button>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-paper/60 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Buku &amp; Penulis</th>
                <th className="py-3.5 px-4">Kategori Genre</th>
                <th className="py-3.5 px-4">Harga Lisensi</th>
                <th className="py-3.5 px-4">Stok Lisensi</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs">
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">
                    <BookOpen size={36} className="mx-auto mb-2 text-stone-300" />
                    <span>Tidak ada buku yang sesuai dengan pencarian.</span>
                  </td>
                </tr>
              ) : (
                filteredBooks.map((book) => (
                  <tr
                    key={book.id}
                    className="hover:bg-stone-50/60 transition-colors group"
                  >
                    {/* Title & Cover */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-14 rounded overflow-hidden flex-shrink-0 bg-stone-100 border border-stone-200 shadow-sm">
                          {book.cover_url ? (
                            <Image
                              src={book.cover_url}
                              alt={book.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[9px] text-stone-400">
                              Cover
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-ink leading-tight line-clamp-1 group-hover:text-brand-600 transition-colors">
                            {book.title}
                          </h4>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            oleh {book.author}
                          </p>
                          <span className="text-[9px] text-stone-400 font-mono">
                            ID: {book.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Genre */}
                    <td className="py-3 px-4">
                      <Badge variant="genre" className="text-[10px]">
                        {book.genre?.name || 'Novel Fiksi'}
                      </Badge>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-bold text-brand-600">
                      {formatRupiah(book.price)}
                    </td>

                    {/* Stock */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        {book.stock} lisensi
                      </span>
                    </td>

                    {/* Rating */}
                    <td className="py-3 px-4">
                      <Badge variant="rating" className="text-[10px]">
                        ⭐ {book.rating.toFixed(1)}
                      </Badge>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(book)}
                          className="p-1.5 rounded-lg text-stone-600 hover:text-brand-600 hover:bg-stone-100 transition-colors"
                          title="Edit Buku"
                        >
                          <PencilSimple size={16} weight="bold" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(book.id)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Hapus Buku"
                        >
                          <Trash size={16} weight="bold" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="py-3 px-4 bg-paper/40 border-t border-stone-200 text-xs text-stone-500 flex justify-between items-center">
          <span>Menampilkan {filteredBooks.length} dari total {books.length} buku terdaftar</span>
          <span className="text-[11px] text-stone-400">Pembaruan katalog real-time</span>
        </div>
      </div>

      {/* MODAL: Form Tambah / Edit Buku */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBook ? 'Edit Data Buku' : 'Tambah Buku Baru ke Katalog'}
        className="max-w-xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Judul Buku"
              placeholder="Contoh: Filosofi Kopi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Input
              label="Nama Penulis"
              placeholder="Contoh: Dee Lestari"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Kategori Genre
              </label>
              <select
                value={genreId}
                onChange={(e) => setGenreId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-paper border border-stone-200 focus:outline-none focus:border-brand-500 font-medium"
                required
              >
                {genres.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Harga Lisensi (Rp)"
              type="number"
              min={1000}
              step={1000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />

            <Input
              label="Stok Lisensi"
              type="number"
              min={1}
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              URL / Jalur Sampul Buku
            </label>
            <input
              type="text"
              placeholder="/covers/book-nf-01.jpg atau https://..."
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-paper border border-stone-200 focus:outline-none focus:border-brand-500"
            />
            <span className="text-[10px] text-stone-400 mt-1 block">
              Gunakan jalur lokal seperti <code>/covers/book-nf-01.jpg</code> atau URL gambar HTTPS.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Sinopsis / Deskripsi Singkat
            </label>
            <textarea
              rows={3}
              placeholder="Tuliskan ringkasan cerita atau sinopsis buku..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 text-xs rounded-xl bg-paper border border-stone-200 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="pt-3 border-t border-stone-200 flex justify-end gap-2.5">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" isLoading={loading}>
              <Check size={16} weight="bold" />
              <span>{editingBook ? 'Simpan Perubahan' : 'Terbitkan Buku'}</span>
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL: Konfirmasi Hapus Buku */}
      <Modal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        title="Konfirmasi Hapus Buku"
        className="max-w-md"
      >
        <div className="py-2 space-y-4">
          <p className="text-xs text-stone-600 leading-relaxed">
            Apakah Anda yakin ingin menghapus buku ini dari etalase toko digital? Tindakan ini akan menghapus buku dari katalog publik.
          </p>

          <div className="flex justify-end gap-2.5 pt-2 border-t border-stone-200">
            <Button
              variant="secondary"
              onClick={() => setDeleteConfirmId(null)}
              disabled={loading}
            >
              Batal
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              isLoading={loading}
            >
              <Trash size={16} weight="bold" />
              <span>Ya, Hapus Buku</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
