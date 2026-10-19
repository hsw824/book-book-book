import { NextResponse } from 'next/server';
import { z } from 'zod';

type ParseResult<T> = { success: true; data: T } | { success: false; response: NextResponse };

/**
 * 요청 본문을 스키마로 검증한다.
 * 검증에 실패하면 400 응답을 담아 반환하므로 핸들러는 그대로 return하면 된다.
 */
export async function parseRequestBody<TSchema extends z.ZodType>(
  req: Request,
  schema: TSchema,
): Promise<ParseResult<z.output<TSchema>>> {
  const parsed = schema.safeParse(await req.json());

  if (!parsed.success) {
    return {
      success: false,
      response: NextResponse.json(
        { error: '잘못된 요청입니다.', details: z.flattenError(parsed.error) },
        { status: 400 },
      ),
    };
  }

  return { success: true, data: parsed.data };
}
