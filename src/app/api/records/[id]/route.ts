import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { TEMP_USER_ID } from '@/lib/constants';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

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

  if (record.userId !== TEMP_USER_ID) {
    return NextResponse.json({ error: '조회 권한이 없습니다.' }, { status: 403 });
  }

  return NextResponse.json(record);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const record = await prisma.record.findUnique({
    where: { id },
  });

  if (!record) {
    return NextResponse.json({ error: '존재하지 않는 기록입니다.' }, { status: 404 });
  }

  if (record.userId !== TEMP_USER_ID) {
    return NextResponse.json({ error: '삭제 권한이 없습니다.' }, { status: 403 });
  }

  await prisma.record.delete({ where: { id } });

  return NextResponse.json({ success: true }, { status: 200 });
}
