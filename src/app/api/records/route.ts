import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { GENRE_LABEL_TO_ENUM } from '@/lib/genre';
import { getAuthenticatedUserId } from '@/lib/getAuthenticatedUerId';
import { PrismaRecordRepository } from '@/domain/repositories/recordRepository';

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

const recordRepository = new PrismaRecordRepository();

export async function GET(req: NextRequest) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get('cursor');
  const take = 10;

  const records = await recordRepository.findListById(userId, cursor, take);
  const nextCursor = records.length === take ? records[records.length - 1].id : null;

  return NextResponse.json({ records, nextCursor });
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

  const { genre } = parsed.data;

  const genreEnum = GENRE_LABEL_TO_ENUM[genre];
  if (!genreEnum) {
    return NextResponse.json({ error: `알 수 없는 장르입니다: ${genre}` }, { status: 400 });
  }

  try {
    const record = await recordRepository.post(userId, parsed.data);

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error('Failed to create record:', error);
    return NextResponse.json({ error: '기록 저장에 실패했습니다.' }, { status: 500 });
  }
}
