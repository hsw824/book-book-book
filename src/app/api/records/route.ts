import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { GENRE_LABEL_TO_ENUM } from '@/lib/genre';
import { type Genre } from '@/generated/prisma';
import { getAuthenticatedUserId } from '@/lib/getAuthenticatedUerId';

const requestSchema = z.object({
  bookInfo: z.object({
    isbn: z.string().min(1),
    title: z.string().min(1),
    authors: z.string(),
    publisher: z.string(),
    publishedYear: z.number(),
    coverUrl: z.string().optional(),
  }),
  finishedAt: z.string(),
  review: z.string(),
  quotes: z.array(
    z.object({
      page: z.number(),
      text: z.string(),
    }),
  ),
  genre: z.string(),
  rating: z.number().min(1).max(5),
  isEbook: z.boolean(),
});

function getCategories(searchParams: URLSearchParams): Genre[] {
  const categories = searchParams.get('categories');
  if (!categories) {
    return [];
  }

  return categories
    .split(',')
    .map((label) => GENRE_LABEL_TO_ENUM[label])
    .filter(Boolean);
}

export async function GET(req: NextRequest) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get('cursor');
  const categories = getCategories(searchParams);
  const take = 10;

  const records = await prisma.record.findMany({
    where: { userId, ...(categories.length > 0 && { category: { in: categories } }) },
    orderBy: { createdAt: 'desc' },
    // 다음 페이지 존재 여부를 확인하기 위해 1개 더 조회
    take: take + 1,
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

  const hasNextPage = records.length > take;
  const pageRecords = records.slice(0, take);
  const nextCursor = hasNextPage ? pageRecords[pageRecords.length - 1].id : null;

  return NextResponse.json({ records: pageRecords, nextCursor });
}

export async function POST(req: NextRequest) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

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

  const validQuotes = quotes.filter((q) => q.text.trim().length > 0);

  try {
    const record = await prisma.$transaction(async (tx) => {
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
          userId,
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

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error('Failed to create record:', error);
    return NextResponse.json({ error: '기록 저장에 실패했습니다.' }, { status: 500 });
  }
}
