import { EditRecordForm } from '@/components/EditRecordForm';
import { EditRecordFormSkeleton } from '@/components/skeleton/EditRecordFormSkeleton';
import { Suspense } from 'react';

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Suspense fallback={<EditRecordFormSkeleton />}>
      <EditRecordForm id={id} />
    </Suspense>
  );
}
