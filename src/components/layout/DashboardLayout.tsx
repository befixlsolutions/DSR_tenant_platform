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
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <TopNav />
      <div className="flex">
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
