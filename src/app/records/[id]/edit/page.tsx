import { EditRecordForm } from '@/components/form/EditRecordForm';
import { ErrorSection } from '@/components/error/ErrorSection';
import { EditRecordFormSkeleton } from '@/components/skeleton/EditRecordFormSkeleton';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export const dynamic = 'force-dynamic';

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

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
      <Suspense fallback={<EditRecordFormSkeleton />}>
        <EditRecordForm id={id} />
      </Suspense>
    </ErrorBoundary>
  );
}
