import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { GENRE_LABEL_TO_ENUM } from '@/lib/genre';
import { TEMP_USER_ID } from '@/lib/constants';

const requestSchema = z.object({
  bookInfo: z.object({
    isbn: z.string().min(1),
    title: z.string().min(1),
    authors: z.string(),
    publisher: z.string(),
    datetime: z.string(),
    thumbnail: z.string().optional(),
  }),
  finishedAt: z.string(),
  review: z.string(),
  quotes: z.array(
    z.object({
      page: z.number(),
      text: z.string(),
    })
  ),
  genre: z.string(),
  rating: z.number().min(1).max(5),
  isEbook: z.boolean(),
});

export async function GET() {
  const records = await prisma.record.findMany({
    where: { userId: TEMP_USER_ID },
    orderBy: { finishedAt: 'desc' },
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
          author: true,
          coverUrl: true,
        },
      },
    },
  });

  return NextResponse.json(records);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: '잘못된 요청입니다.', details: parsed.error.flatten() }, { status: 400 });
  }

  const { bookInfo, finishedAt, review, quotes, genre, rating, isEbook } = parsed.data;

  const genreEnum = GENRE_LABEL_TO_ENUM[genre];
  if (!genreEnum) {
    return NextResponse.json({ error: `알 수 없는 장르입니다: ${genre}` }, { status: 400 });
  }

  const validQuotes = quotes.filter(q => q.text.trim().length > 0);
  const publishedYear = new Date(bookInfo.datetime).getFullYear();

  try {
    const record = await prisma.$transaction(async tx => {
      let book = await tx.book.findFirst({
        where: { isbn: bookInfo.isbn },
      });

      if (!book) {
        book = await tx.book.create({
          data: {
            isbn: bookInfo.isbn,
            title: bookInfo.title,
            author: bookInfo.authors,
            publisher: bookInfo.publisher,
            publishedYear,
            coverUrl: bookInfo.thumbnail,
          },
        });
      }

      return tx.record.create({
        data: {
          userId: TEMP_USER_ID,
          bookId: book.id,
          category: genreEnum,
          rating,
          review,
          isEbook,
          finishedAt: new Date(finishedAt),
          quotes: {
            create: validQuotes.map(q => ({
              page: q.page,
              text: q.text,
            })),
          },
        },
        include: { quotes: true, book: true },
      });
    });

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error('Failed to create record:', error);
    return NextResponse.json({ error: '기록 저장에 실패했습니다.' }, { status: 500 });
  }
}
