import { RecordDetail } from '@/components/RecordDetail';
import { Suspense } from 'react';

export default async function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Suspense fallback={<div>기다리셈</div>}>
      <RecordDetail id={id} />
    </Suspense>
  );
}
