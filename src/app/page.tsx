import { Dashboard } from '@/components/Dashboard';
import { HomeSkeleton } from '@/components/skeleton/HomeSkeleton';
import { Suspense } from 'react';
import { AppErrorBoundary } from '@/components/error/AppErrorBoundary';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <AppErrorBoundary>
      <Suspense fallback={<HomeSkeleton showTitle />}>
        <Dashboard />
      </Suspense>
    </AppErrorBoundary>
  );
}
