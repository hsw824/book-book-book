'use client';

import { Dashboard } from '@/components/Dashboard';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={<div>대기하셈</div>}>
      <Dashboard />
    </Suspense>
  );
}
