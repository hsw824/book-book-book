import { Suspense } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from 'react-error-boundary';
import { fetchRecords } from '@/services/record';

vi.mock('@/services/record', () => ({
  fetchRecords: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('next-auth/react', () => ({
  signOut: vi.fn(),
}));

vi.mock('@/hooks/useIntersectionObserver', () => ({
  useIntersectionObserver: vi.fn(),
}));

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

function renderDashboard() {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={testQueryClient}>
      <ErrorBoundary fallback={<p>에러</p>}>
        <Suspense fallback={<p>로딩 중</p>}>
          <Dashboard />
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

describe('Dashboard 컴포넌트 ui 테스트', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('데이터가 있으면 책 목록 화면을 보여준다.', async () => {
    vi.mocked(fetchRecords).mockResolvedValue({
      records: [
        {
          id: 'c3a74750-713c-4cbd-94c1-f35796ad6773',
          rating: 5,
          category: 'NOVEL',
          isEbook: false,
          finishedAt: '2026-08-17T00:00:00.000Z',
          book: {
            id: 'hp1234',
            title: '해리포터와 마법사의 돌',
            authors: '롤링',
            coverUrl:
              'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6844299%3Ftimestamp%3D20260618122139',
            publisher: '문학수첩',
          },
        },
      ],
      nextCursor: null,
    });

    renderDashboard();

    await screen.findByText('해리포터와 마법사의 돌');
  });

  test('데이터가 없으면 초기화면을 보여준다.', async () => {
    vi.mocked(fetchRecords).mockResolvedValue({
      records: [],
      nextCursor: null,
    });

    renderDashboard();

    await screen.findByText('아직 기록한 책이 없어요.');
  });
});
