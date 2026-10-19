'use client';

import * as Sentry from '@sentry/nextjs';
import { type ReactElement } from 'react';
import { ErrorSection } from './ErrorSection';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

interface AppErrorBoundaryProps {
  children: ReactElement;
}

export function AppErrorBoundary({ children }: AppErrorBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Sentry.ErrorBoundary
      onReset={reset}
      fallback={({ resetError }) => (
        <ErrorSection
          title="일시적인 오류가 발생했어요."
          description="다시 시도해 주세요."
          buttonText="다시 시도하기"
          onClick={resetError}
        />
      )}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}
