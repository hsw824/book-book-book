import { type Genre } from '@/generated/prisma';
import { GENRE_LABEL_TO_ENUM } from '@/lib/genre';
import { prisma } from '@/lib/prisma';
import { type RecordRow, type Quote } from '@/models/recordTypes';

interface Book {
  id: string;
  isbn: string;
  publishedYear: number | null;
}

interface RecordDetail extends RecordRow {
  book: Book;
  quotes: Quote[];
}

interface UpdateData {
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

interface PostData {
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

interface RecordList {
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

interface PostResponse {
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

export interface RecordRepository {
  findListById(id: string, cursor: string | null, take: number): Promise<RecordList[]>;
  findById(id: string): Promise<RecordRow | null>;
  findDetailById(id: string): Promise<RecordDetail | null>;
  post(id: string, postData: PostData): Promise<PostResponse>;
  deleteById(id: string): Promise<RecordRow>;
  update(id: string, updateData: UpdateData): Promise<RecordDetail>;
}

class PrismaRecordRepository implements RecordRepository {
  async findListById(id: string, cursor: string | null, take: number): Promise<RecordList[]> {
    return prisma.record.findMany({
      where: { userId: id },
      orderBy: { createdAt: 'desc' },
      take,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
      select: {
        id: true,
        rating: true,
        category: true,
        isEbook: true,
        finishedAt: true,
        book: {
          select: {
            id: true,
            title: true,
            authors: true,
            coverUrl: true,
            publisher: true,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<RecordRow | null> {
    return prisma.record.findUnique({
      where: { id },
    });
  }

  async findDetailById(id: string): Promise<RecordDetail | null> {
    return prisma.record.findUnique({
      where: { id },
      include: {
        book: true,
        quotes: { orderBy: { order: 'asc' } },
      },
    });
  }

  async post(id: string, postData: PostData): Promise<PostResponse> {
    const { bookInfo, finishedAt, review, quotes, rating, isEbook, genre } = postData;

    const genreEnum = GENRE_LABEL_TO_ENUM[genre];

    const validQuotes = quotes.filter((q) => q.text.trim().length > 0);

    return prisma.$transaction(async (tx) => {
      let book = await tx.book.findFirst({
        where: { isbn: bookInfo.isbn },
      });

      if (!book) {
        book = await tx.book.create({
          data: {
            isbn: bookInfo.isbn,
            title: bookInfo.title,
            authors: bookInfo.authors,
            publisher: bookInfo.publisher,
            publishedYear: bookInfo.publishedYear,
            coverUrl: bookInfo.coverUrl,
          },
        });
      }

      return tx.record.create({
        data: {
          userId: id,
          bookId: book.id,
          category: genreEnum,
          rating,
          review,
          isEbook,
          finishedAt: new Date(finishedAt),
          quotes: {
            create: validQuotes.map((q, index) => ({
              page: q.page,
              text: q.text,
              order: index,
            })),
          },
        },
        include: { quotes: true, book: true },
      });
    });
  }

  async deleteById(id: string) {
    return prisma.record.delete({
      where: { id },
    });
  }

  async update(id: string, updateData: UpdateData): Promise<RecordDetail> {
    const { quotes, ...fields } = updateData;

    return prisma.$transaction(async (tx) => {
      await tx.quote.deleteMany({ where: { recordId: id } });

      return tx.record.update({
        where: { id },
        data: {
          ...fields,
          quotes: {
            create: quotes.map((q, index) => ({ page: q.page, text: q.text, order: index })),
          },
        },
        include: {
          book: true,
          quotes: { orderBy: { order: 'asc' } },
        },
      });
    });
  }
}

export const recordRepository = new PrismaRecordRepository();
