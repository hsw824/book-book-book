import { NextResponse } from 'next/server';
import z from 'zod';
import { GENRE_LABEL_TO_ENUM } from '@/lib/genre';
import { withAuth } from '@/lib/withAuth';
import { parseRequestBody } from '@/lib/parseRequestBody';
import { checkRecordOwnership } from '@/lib/checkRecordOwnership';
import { recordRepository } from '@/domain/repositories/recordRepository';

type Params = { id: string };

export const GET = withAuth<Params>(async (req, { params, userId }) => {
  const { id } = await params;

  const ownership = checkRecordOwnership(await recordRepository.findDetailById(id), userId, '조회');
  if (!ownership.success) {
    return ownership.response;
  }

  return NextResponse.json(ownership.record);
});

export const DELETE = withAuth<Params>(async (req, { params, userId }) => {
  const { id } = await params;

  const ownership = checkRecordOwnership(await recordRepository.findById(id), userId, '삭제');
  if (!ownership.success) {
    return ownership.response;
  }

  await recordRepository.deleteById(id);

  return NextResponse.json({ success: true }, { status: 200 });
});

const updateSchema = z.object({
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

export const PUT = withAuth<Params>(async (req, { params, userId }) => {
  const { id } = await params;

  const parsed = await parseRequestBody(req, updateSchema);
  if (!parsed.success) {
    return parsed.response;
  }

  const ownership = checkRecordOwnership(await recordRepository.findById(id), userId, '수정');
  if (!ownership.success) {
    return ownership.response;
  }

  const { finishedAt, review, quotes, genre, rating, isEbook } = parsed.data;

  const genreEnum = GENRE_LABEL_TO_ENUM[genre];
  if (!genreEnum) {
    return NextResponse.json({ error: `알 수 없는 장르입니다: ${genre}` }, { status: 400 });
  }

  const validQuotes = quotes.filter((q) => q.text.trim().length > 0);

  const record = await recordRepository.update(id, {
    category: genreEnum,
    rating,
    review,
    isEbook,
    finishedAt: new Date(finishedAt),
    quotes: validQuotes,
  });

  return NextResponse.json(record);
});
