import { AppErrorBoundary } from '@/components/error/AppErrorBoundary';
import { RecordDetailContent } from '@/components/RecordDetailContent';
import { RecordDetailSkeleton } from '@/components/skeleton/RecordDetailSkeleton';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <AppErrorBoundary>
      <Suspense fallback={<RecordDetailSkeleton />}>
        <RecordDetailContent id={id} />
      </Suspense>
    </AppErrorBoundary>
  );
}
