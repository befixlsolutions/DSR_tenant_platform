'use client';

import { useAuth } from '@/lib/providers/AuthProvider';
import { ReactNode } from 'react';

interface RoleDashboardSelectorProps {
  employeeDashboard: ReactNode;
  managerDashboard: ReactNode;
  deptAdminDashboard: ReactNode;
  orgAdminDashboard: ReactNode;
  orgOwnerDashboard: ReactNode;
  hrDashboard: ReactNode;
  auditorDashboard: ReactNode;
}

export const RoleDashboardSelector = ({
  employeeDashboard,
  managerDashboard,
  deptAdminDashboard,
  orgAdminDashboard,
  orgOwnerDashboard,
  hrDashboard,
  auditorDashboard,
}: RoleDashboardSelectorProps) => {
  const { user } = useAuth();

  if (!user) return null;

  // Show appropriate dashboard based on role
  switch (user.role) {
    case 'EMPLOYEE':
      return <>{employeeDashboard}</>;
    
    case 'MANAGER':
      return <>{managerDashboard}</>;
    
    case 'DEPT_ADMIN':
      return <>{deptAdminDashboard}</>;
    
    case 'ORG_ADMIN':
      return <>{orgAdminDashboard}</>;
    
    case 'ORG_OWNER':
      return <>{orgOwnerDashboard}</>;
    
    case 'HR':
      return <>{hrDashboard}</>;
    
    case 'AUDITOR':
      return <>{auditorDashboard}</>;
    
    default:
      return <>{employeeDashboard}</>;
  }
};
