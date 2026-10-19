import { NextResponse } from 'next/server';

type RecordAction = '조회' | '삭제' | '수정';

type OwnershipResult<T> = { success: true; record: T } | { success: false; response: NextResponse };

/**
 * 기록이 존재하고 요청한 사용자의 것인지 확인한다.
 * 없으면 404, 다른 사용자의 기록이면 403 응답을 담아 반환한다.
 */
export function checkRecordOwnership<T extends { userId: string }>(
  record: T | null,
  userId: string,
  action: RecordAction,
): OwnershipResult<T> {
  if (!record) {
    return {
      success: false,
      response: NextResponse.json({ error: '존재하지 않는 기록입니다.' }, { status: 404 }),
    };
  }

  if (record.userId !== userId) {
    return {
      success: false,
      response: NextResponse.json({ error: `${action} 권한이 없습니다.` }, { status: 403 }),
    };
  }

  return { success: true, record };
}
