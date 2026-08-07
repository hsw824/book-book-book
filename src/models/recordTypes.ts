import { Genre } from '@/constants/genre';
import { Rating } from '@/constants/rate';
import { Book } from '@/models/bookTypes';

interface SummaryBook {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  publisher: string;
}

export interface DetailBookType extends SummaryBook {
  isbn: string;
  publishedYear: number;
}

export interface RecordListItem {
  id: string;
  rating: number;
  category: string;
  isEbook: boolean;
  finishedAt: string;
  book: SummaryBook;
}

export interface Quote {
  page: number;
  text: string;
}

export type BookRecordForm = {
  bookInfo: Book | null;
  finishedAt: string;
  review: string;
  quotes: Quote[];
  genre: Genre;
  rating: Rating | null;
  isEbook: boolean;
};

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
