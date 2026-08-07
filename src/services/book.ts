import { SummaryBook } from '@/models/bookTypes';
import { http } from '@/utils/http';

export const fetchBooks = (search: string, signal: AbortSignal) => {
  return http.get<SummaryBook[]>(`/api/books/search?query=${search}`, { signal });
};
