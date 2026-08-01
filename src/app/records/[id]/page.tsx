import { RecordDetail } from '@/components/RecordDetail';
import { RecordDetailSkeleton } from '@/components/skeleton/RecordDetailSkeleton';
import { Suspense } from 'react';

export default async function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Suspense fallback={<RecordDetailSkeleton />}>
      <RecordDetail id={id} />
    </Suspense>
  );
}
