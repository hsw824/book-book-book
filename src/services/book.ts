import { type BookSummary } from '@/models/bookTypes';
import { http } from '@/utils/http';

export const fetchBooks = (search: string, signal: AbortSignal) => {
  return http.get<BookSummary[]>('/api/books/search', {
    signal,
    params: {
      query: search,
    },
  });
};
