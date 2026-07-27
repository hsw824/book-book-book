interface ShortedBookType {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  publisher: string;
}

export interface DetailBookType extends ShortedBookType {
  isbn: string;
  publishedYear: string;
}

export interface SimpleRecordType {
  id: string;
  rating: number;
  category: string;
  isEbook: boolean;
  finishedAt: string;
  book: ShortedBookType;
}

export interface QuoteType {
  id: string;
  recordId: string;
  page: number;
  text: string;
  order: number;
}

export interface RecordType {
  id: string;
  userId: string;
  bookId: string;
  category: string;
  rating: number;
  review: string;
  isEbook: boolean;
  finishedAt: string;
  createdAt: string;
  updatedAt: string;
  book: DetailBookType;
  quotes: QuoteType[];
}
