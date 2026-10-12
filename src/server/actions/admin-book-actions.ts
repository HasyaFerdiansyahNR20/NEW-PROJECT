'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const BookFormSchema = z.object({
  title: z.string().min(2, 'Judul buku minimal 2 karakter').max(150),
  author: z.string().min(2, 'Nama penulis minimal 2 karakter').max(100),
  genreId: z.string().min(1, 'Kategori genre wajib dipilih'),
  price: z.number().int().min(1000, 'Harga minimal Rp 1.000'),
  stock: z.number().int().min(1, 'Stok minimal 1 lisensi'),
  description: z.string().max(1000).optional(),
  coverUrl: z.string().optional(),
});

export async function createAdminBookAction(formData: {
  title: string;
  author: string;
  genreId: string;
  price: number;
  stock: number;
  description?: string;
  coverUrl?: string;
}) {
  const parseResult = BookFormSchema.safeParse(formData);
  if (!parseResult.success) {
    return { error: parseResult.error.errors[0].message };
  }

  const { title, author, genreId, price, stock, description, coverUrl } = parseResult.data;

  try {
    const admin = createAdminClient();
    const id = `book-adm-${Date.now().toString().slice(-6)}`;

    // Default to an existing safe local cover if empty
    const finalCover = coverUrl?.trim() || '/covers/book-nf-01.jpg';

    const { data, error } = await admin.from('books').insert({
      id,
      genre_id: genreId,
      title,
      author,
      price,
      stock,
      rating: 5.0,
      description: description || 'Buku baru ditambahkan oleh administrator toko Lentera Aksara.',
      cover_url: finalCover,
    }).select().single();

    if (error) {
      return { error: error.message };
    }

    revalidatePath('/admin');
    revalidatePath('/');
    return { success: true, book: data };
  } catch (err: any) {
    return { error: err.message || 'Gagal menambahkan buku baru.' };
  }
}

export async function updateAdminBookAction(id: string, formData: {
  title: string;
  author: string;
  genreId: string;
  price: number;
  stock: number;
  description?: string;
  coverUrl?: string;
}) {
  const parseResult = BookFormSchema.safeParse(formData);
  if (!parseResult.success) {
    return { error: parseResult.error.errors[0].message };
  }

  const { title, author, genreId, price, stock, description, coverUrl } = parseResult.data;

  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from('books')
      .update({
        genre_id: genreId,
        title,
        author,
        price,
        stock,
        description,
        ...(coverUrl ? { cover_url: coverUrl } : {}),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return { error: error.message };
    }

    revalidatePath('/admin');
    revalidatePath('/');
    return { success: true, book: data };
  } catch (err: any) {
    return { error: err.message || 'Gagal memperbarui buku.' };
  }
}

export async function deleteAdminBookAction(id: string) {
  try {
    const admin = createAdminClient();
    const { error } = await admin.from('books').delete().eq('id', id);

    if (error) {
      return { error: error.message };
    }

    revalidatePath('/admin');
    revalidatePath('/');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Gagal menghapus buku.' };
  }
}
