import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import z from 'zod';
import { GENRE_LABEL_TO_ENUM } from '@/lib/genre';
import { getAuthenticatedUserId } from '@/lib/getAuthenticatedUerId';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  const record = await prisma.record.findUnique({
    where: { id },
    include: {
      book: true,
      quotes: { orderBy: { order: 'asc' } },
    },
  });

  if (!record) {
    return NextResponse.json({ error: '존재하지 않는 기록입니다.' }, { status: 404 });
  }

  if (record.userId !== userId) {
    return NextResponse.json({ error: '조회 권한이 없습니다.' }, { status: 403 });
  }

  return NextResponse.json(record);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  const record = await prisma.record.findUnique({
    where: { id },
  });

  if (!record) {
    return NextResponse.json({ error: '존재하지 않는 기록입니다.' }, { status: 404 });
  }

  if (record.userId !== userId) {
    return NextResponse.json({ error: '삭제 권한이 없습니다.' }, { status: 403 });
  }

  await prisma.record.delete({ where: { id } });

  return NextResponse.json({ success: true }, { status: 200 });
}

const updateSchema = z.object({
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

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: '잘못된 요청입니다.', details: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await prisma.record.findUnique({ where: { id } });

  if (!existing) {
    return NextResponse.json({ error: '존재하지 않는 기록입니다.' }, { status: 404 });
  }

  if (existing.userId !== userId) {
    return NextResponse.json({ error: '수정 권한이 없습니다.' }, { status: 403 });
  }

  const { finishedAt, review, quotes, genre, rating, isEbook } = parsed.data;

  const genreEnum = GENRE_LABEL_TO_ENUM[genre];
  if (!genreEnum) {
    return NextResponse.json({ error: `알 수 없는 장르입니다: ${genre}` }, { status: 400 });
  }

  const validQuotes = quotes.filter(q => q.text.trim().length > 0);

  const record = await prisma.$transaction(async tx => {
    await tx.quote.deleteMany({ where: { recordId: id } });

    return tx.record.update({
      where: { id },
      data: {
        category: genreEnum,
        rating,
        review,
        isEbook,
        finishedAt: new Date(finishedAt),
        quotes: {
          create: validQuotes.map((q, index) => ({ page: q.page, text: q.text, order: index })),
        },
      },
      include: { quotes: true, book: true },
    });
  });

  return NextResponse.json(record);
}
