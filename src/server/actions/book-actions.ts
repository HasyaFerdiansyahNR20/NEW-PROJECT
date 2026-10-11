'use server';

import { getBooks, getBookById, getGenres } from '@/server/services/book-service';
import { FilterState } from '@/types';

export async function fetchBooksAction(filters?: Partial<FilterState>) {
  return await getBooks(filters);
}

export async function fetchBookByIdAction(id: string) {
  return await getBookById(id);
}

export async function fetchGenresAction() {
  return await getGenres();
}
