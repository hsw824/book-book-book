import { EditRecordForm } from '@/components/EditRecordForm';
import { Suspense } from 'react';

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Suspense fallback={<div>기다리셈</div>}>
      <EditRecordForm id={id} />
    </Suspense>
  );
}
