'use client';

import { useAuth } from '../providers/AuthProvider';

export function usePermissions() {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = useAuth();

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    
    // Convenience methods for common checks
    canViewReporting: () => hasPermission('nav.reporting'),
    canViewGoals: () => hasPermission('nav.goals'),
    canViewBlockers: () => hasPermission('nav.blockers'),
    canViewAnalytics: () => hasPermission('nav.analytics'),
    canViewAdmin: () => hasPermission('nav.admin'),
    canViewPeople: () => hasPermission('nav.people'),
    canViewReviews: () => hasPermission('nav.reviews'),
    
    // Report permissions
    canCreateDSR: () => hasPermission('reports.create.dsr'),
    canViewTeamReports: () => hasPermission('reports.list.team'),
    canApproveReports: () => hasPermission('reports.review.approve'),
    canExportReports: () => hasPermission('reports.export.allowed'),
    
    // Goal permissions
    canCreateGoals: () => hasPermission('goals.create'),
    canViewTeamGoals: () => hasPermission('goals.list.team'),
    canApproveGoalProgress: () => hasPermission('goals.approve.large_jump'),
    
    // Admin permissions
    canManageUsers: () => hasPermission('admin.users.manage'),
    canManageRoles: () => hasPermission('admin.roles.manage'),
    canManageTemplates: () => hasPermission('admin.templates.manage'),
    canManagePolicies: () => hasPermission('admin.policies.manage'),
    canManageBilling: () => hasPermission('billing.manage'),
    
    // Analytics permissions
    canViewTeamAnalytics: () => hasPermission('analytics.view.team'),
    canViewOrgAnalytics: () => hasPermission('analytics.view.org'),
    canViewHRAnalytics: () => hasPermission('analytics.view.hr'),
    canExportAnalytics: () => hasPermission('analytics.export.allowed'),
  };
}
