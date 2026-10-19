import { type Genre } from '@/generated/prisma';
import { type RecordRow, type Quote } from '@/models/recordTypes';

export interface Book {
  id: string;
  isbn: string;
  publishedYear: number | null;
}

export interface RecordDetail extends RecordRow {
  book: Book;
  quotes: Quote[];
}

export interface UpdateData {
  finishedAt: Date;
  review: string;
  quotes: {
    page: number;
    text: string;
  }[];
  rating: number;
  isEbook: boolean;
  category: Genre;
}

export interface PostData {
  bookInfo: {
    isbn: string;
    title: string;
    authors: string;
    publisher: string;
    publishedYear: number;
    coverUrl?: string | undefined;
  };
  finishedAt: string;
  review: string;
  quotes: {
    page: number;
    text: string;
  }[];
  genre: string;
  rating: number;
  isEbook: boolean;
}

export interface RecordList {
  id: string;
  category: Genre;
  rating: number;
  isEbook: boolean;
  finishedAt: Date;
  book: {
    id: string;
    title: string;
    authors: string;
    publisher: string;
    coverUrl: string | null;
  };
}

export interface PostResponse {
  quotes: {
    page: number;
    text: string;
    id: string;
    order: number;
    recordId: string;
  }[];
  book: {
    isbn: string;
    title: string;
    authors: string;
    publisher: string;
    publishedYear: number | null;
    coverUrl: string | null;
    id: string;
  };
  finishedAt: Date;
  review: string;
  rating: number;
  isEbook: boolean;
  id: string;
  createdAt: Date;
  userId: string;
  bookId: string;
  category: Genre;
  updatedAt: Date;
}
