import { Book } from "@/models/bookTypes";
import { http } from "@/utils/axios";

export const fetchBooks = (search: string, signal: AbortSignal) => {
  return http.get<Book[]>(`/api/books/search?query=${search}`, { signal });
};
