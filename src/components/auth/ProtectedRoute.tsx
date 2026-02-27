'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/lib/providers/AuthProvider';
import { AlertTriangle } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermissions?: string[];
  requireAll?: boolean; // If true, user must have ALL permissions. If false, ANY permission is enough.
  fallback?: ReactNode;
}

export const ProtectedRoute = ({
  children,
  requiredPermissions = [],
  requireAll = false,
  fallback,
}: ProtectedRouteProps) => {
  const { isAuthenticated, hasAllPermissions, hasAnyPermission } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Not Authenticated</h1>
          <p className="text-neutral-600">Please log in to continue.</p>
        </div>
      </div>
    );
  }

  if (requiredPermissions.length > 0) {
    const hasAccess = requireAll
      ? hasAllPermissions(requiredPermissions)
      : hasAnyPermission(requiredPermissions);

    if (!hasAccess) {
      if (fallback) {
        return <>{fallback}</>;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-card p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Access Denied</h1>
            <p className="text-neutral-600 mb-4">
              You don't have permission to access this page.
            </p>
            <div className="bg-neutral-50 rounded-lg p-4 text-left">
              <p className="text-sm font-medium text-neutral-700 mb-2">Required Permissions:</p>
              <ul className="text-xs text-neutral-600 space-y-1">
                {requiredPermissions.map((perm) => (
                  <li key={perm} className="font-mono">
                    • {perm}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};
