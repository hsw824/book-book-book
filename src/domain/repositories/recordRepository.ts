import { GENRE_LABEL_TO_ENUM } from '@/lib/genre';
import { prisma } from '@/lib/prisma';
import { type RecordRow } from '@/models/recordTypes';
import { type RecordRepository } from '../models/recordRepositoryInterface';
import type { PostData, PostResponse, RecordDetail, RecordList, UpdateData } from '../models/recordTypes';

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
