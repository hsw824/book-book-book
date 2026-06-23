import { fetchBooks } from "@/services/book";
import { queryOptions } from "@tanstack/react-query";

export const bookQueryOption = {
  books: (search: string) =>
    queryOptions({
      queryKey: ["book", search],
      queryFn: () => fetchBooks(search),
      enabled: !!search.trim(),
    }),
};
