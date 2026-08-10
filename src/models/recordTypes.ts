import { Genre } from '@/constants/genre';
import { Rating } from '@/constants/rate';
import { BookSummary, RecordBook, BookListItem } from '@/models/bookTypes';

// /api/records
export interface RecordListItem {
  id: string;
  rating: number;
  category: string;
  isEbook: boolean;
  finishedAt: string;
  book: BookListItem;
}

// /api/records POST, /api/records/[id] PUT
export type BookRecordForm = {
  bookInfo: BookSummary | null;
  finishedAt: string;
  review: string;
  quotes: QuoteForm[];
  genre: Genre;
  rating: Rating | null;
  isEbook: boolean;
};

export interface QuoteForm {
  page: number;
  text: string;
}

export interface Quote extends QuoteForm {
  id: string;
  recordId: string;
  order: number;
}

// /api/records/[id]
export interface RecordDetail {
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
  book: RecordBook;
  quotes: Quote[];
}
