'use client';

import { ReactNode, Suspense } from 'react';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { SkeletonCard } from '../ui/Skeleton';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] relative overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-20 h-72 w-72 rounded-full bg-primary-200/25 blur-3xl" />
        <div className="absolute top-56 right-10 h-80 w-80 rounded-full bg-cyan-200/20 blur-3xl" />
      </div>

      <TopNav />
      <div className="relative flex">
        <Sidebar />
        <main className="flex-1 p-[var(--spacing-page)] ml-64 mt-16">
          <Suspense fallback={<SkeletonCard />}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
};
