'use client';

import { Dashboard } from '@/components/Dashboard';
import { HomeSkeleton } from '@/components/skeleton/HomeSkeleton';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <Dashboard />
    </Suspense>
  );
}
