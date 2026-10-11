import { Database } from './database.types';

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

export type Genre = Tables<'genres'>;
export type Book = Tables<'books'> & {
  genre?: Genre | null;
};
export type Profile = Tables<'profiles'>;
export type Cart = Tables<'carts'>;
export type CartItem = Tables<'cart_items'> & {
  book?: Book | null;
};
export type Order = Tables<'orders'> & {
  order_items?: (Tables<'order_items'> & { book?: Book | null })[];
  transaction?: Tables<'transactions'> | null;
};
export type OrderItem = Tables<'order_items'>;
export type Transaction = Tables<'transactions'>;
export type NotificationLog = Tables<'notification_logs'>;

export interface FilterState {
  genreId: string | null;
  minRating: number | null;
  search: string;
  sortBy: 'popular' | 'price_low' | 'price_high' | 'rating' | 'newest';
}
