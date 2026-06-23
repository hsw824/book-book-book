import { Book } from "@/models/bookTypes";
import { http } from "@/utils/axios";

export const fetchBooks = (search: string) => {
  return http.get<Book[]>(`/api/books/search?query=${search}`);
};
