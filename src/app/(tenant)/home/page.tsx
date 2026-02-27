import { EmployeeDashboard } from '@/components/home/EmployeeDashboard';
import { ManagerDashboard } from '@/components/home/ManagerDashboard';
import { DeptAdminDashboard } from '@/components/home/DeptAdminDashboard';
import { AdminDashboard } from '@/components/home/AdminDashboard';
import { OrgOwnerDashboard } from '@/components/home/OrgOwnerDashboard';
import { HRDashboard } from '@/components/home/HRDashboard';
import { AuditorDashboard } from '@/components/home/AuditorDashboard';
import { RoleDashboardSelector } from '@/components/home/RoleDashboardSelector';

export default function HomePage() {
  return (
    <RoleDashboardSelector
      employeeDashboard={<EmployeeDashboard />}
      managerDashboard={<ManagerDashboard />}
      deptAdminDashboard={<DeptAdminDashboard />}
      orgAdminDashboard={<AdminDashboard />}
      orgOwnerDashboard={<OrgOwnerDashboard />}
      hrDashboard={<HRDashboard />}
      auditorDashboard={<AuditorDashboard />}
    />
  );
}
