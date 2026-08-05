import { Genre } from '@/constants/genre';
import { Rating } from '@/constants/rate';
import { Book } from '@/models/bookTypes';

interface ShortedBookType {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  publisher: string;
}

export interface RecordType {
  id: string;
  rating: number;
  category: string;
  isEbook: boolean;
  finishedAt: string;
  book: ShortedBookType;
}

interface Quote {
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
