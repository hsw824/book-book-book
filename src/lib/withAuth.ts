import { type NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUserId } from '@/lib/getAuthenticatedUerId';

type RouteContext<TParams> = { params: Promise<TParams> };

type AuthenticatedRouteContext<TParams> = RouteContext<TParams> & { userId: string };

type AuthenticatedRouteHandler<TParams> = (
  req: NextRequest,
  context: AuthenticatedRouteContext<TParams>,
) => Promise<Response>;

/**
 * 로그인한 사용자만 접근할 수 있는 Route Handler를 만든다.
 * 세션이 없으면 401을 반환하고, 있으면 핸들러에 userId를 넘긴다.
 *
 * 인증 여부만 확인하며, 리소스 소유권 검사(403)는 각 핸들러의 책임이다.
 * auth() 또는 핸들러에서 발생한 예외는 401로 바꾸지 않고 그대로 전파한다.
 */
export function withAuth<TParams = Record<string, never>>(handler: AuthenticatedRouteHandler<TParams>) {
  return async (req: NextRequest, context: RouteContext<TParams>) => {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    return handler(req, { ...context, userId });
  };
}
