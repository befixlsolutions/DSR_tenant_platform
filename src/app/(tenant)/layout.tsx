'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopNav } from '@/components/layout/TopNav';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { useAuth } from '@/lib/providers/AuthProvider';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Give auth provider time to check localStorage
    const timer = setTimeout(() => {
      if (!isAuthenticated || !user) {
        router.push('/login');
      }
      setIsChecking(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, router]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [children]);

  if (isChecking || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fafbfc' }}>
      <CommandPalette />
      <TopNav onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      {/* Sidebar - Always visible */}
      <Sidebar />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 mt-14 md:hidden"
            />
          </>
        )}
      </AnimatePresence>

      <main className="ml-56 mt-14 p-6 min-h-screen">
        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
