import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { GENRE_MAP } from '@/constants/genre';
import { getAuthenticatedUserId } from '@/lib/getAuthenticatedUerId';

export async function GET() {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  const records = await prisma.record.findMany({
    where: { userId },
    distinct: ['category'],
    select: { category: true },
  });

  const categories = records.map(({ category }) => GENRE_MAP[category]);

  return NextResponse.json({ categories });
}
