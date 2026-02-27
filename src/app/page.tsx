'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/providers/AuthProvider';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Wait a bit for auth to initialize
    const timer = setTimeout(() => {
      if (user) {
        router.push('/home');
      } else {
        router.push('/login');
      }
      setIsChecking(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [user, router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return null;
}
