import { EditRecordForm } from '@/components/form/EditRecordForm';
import { EditRecordFormSkeleton } from '@/components/skeleton/EditRecordFormSkeleton';
import { Suspense } from 'react';
import { AppErrorBoundary } from '@/components/error/AppErrorBoundary';

export const dynamic = 'force-dynamic';

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <AppErrorBoundary>
      <Suspense fallback={<EditRecordFormSkeleton />}>
        <EditRecordForm id={id} />
      </Suspense>
    </AppErrorBoundary>
  );
}
