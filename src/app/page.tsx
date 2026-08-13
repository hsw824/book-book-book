import { Dashboard } from '@/components/Dashboard';
import { ErrorSection } from '@/components/error/ErrorSection';
import { HomeSkeleton } from '@/components/skeleton/HomeSkeleton';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <ErrorBoundary
      fallback={
        <ErrorSection
          title="서버에 문제가 있어요."
          description="잠시 후 다시 시도해주세요."
          buttonText="불러오기"
          onClick={() => {
            location.reload();
          }}
        />
      }
    >
      <Suspense fallback={<HomeSkeleton showTitle />}>
        <Dashboard />
      </Suspense>
    </ErrorBoundary>
  );
}
