'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, mockUsers, UserRole } from '../mock-data/users';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock permissions based on role (from documentation)
const rolePermissions: Record<UserRole, string[]> = {
  EMPLOYEE: [
    'nav.home', 'nav.reporting', 'nav.goals', 'nav.blockers', 'nav.dependencies', 
    'nav.actions', 'nav.analytics', 'nav.support',
    'reports.create.dsr', 'reports.create.wsr', 'reports.create.msr',
    'reports.edit.self', 'reports.submit.self', 'reports.view.self', 'reports.list.self',
    'reports.view.inbox', 'reports.reopen.request',
    'goals.create', 'goals.edit.self', 'goals.view.self', 'goals.list.self', 'goals.view.focus',
    'blockers.create', 'blockers.edit', 'blockers.view.self', 'blockers.list.self',
    'dependencies.create', 'dependencies.view.allowed', 'dependencies.list.allowed',
    'actions.create', 'actions.edit', 'actions.view.self', 'actions.list.self',
    'analytics.view.self',
    'support.tickets.view', 'support.tickets.create', 'support.kb.view',
  ],
  MANAGER: [
    // Inherits all EMPLOYEE permissions
    'nav.home', 'nav.reporting', 'nav.goals', 'nav.blockers', 'nav.dependencies', 
    'nav.actions', 'nav.analytics', 'nav.support', 'nav.people', 'nav.reviews',
    'reports.create.dsr', 'reports.create.wsr', 'reports.create.msr',
    'reports.edit.self', 'reports.submit.self', 'reports.view.self', 'reports.list.self',
    'reports.view.inbox', 'reports.reopen.request',
    'reports.list.team', 'reports.review.queue', 'reports.review.approve', 'reports.review.rework',
    'goals.create', 'goals.edit.self', 'goals.view.self', 'goals.list.self', 'goals.view.focus',
    'goals.view.team', 'goals.list.team', 'goals.approve.large_jump',
    'blockers.create', 'blockers.edit', 'blockers.view.self', 'blockers.list.self',
    'blockers.view.team', 'blockers.list.team', 'blockers.escalate',
    'dependencies.create', 'dependencies.view.allowed', 'dependencies.list.allowed', 'dependencies.escalate',
    'actions.create', 'actions.edit', 'actions.view.self', 'actions.list.self',
    'actions.view.team', 'actions.list.team', 'actions.reassign',
    'people.directory.view', 'people.orgchart.view',
    'analytics.view.self', 'analytics.view.team', 'analytics.drilldown.allowed',
    'reviews.weekly.manage', 'reviews.appraisals.view',
    'support.tickets.view', 'support.tickets.create', 'support.kb.view',
  ],
  DEPT_ADMIN: [
    // Inherits all MANAGER permissions plus department-level
    'nav.home', 'nav.reporting', 'nav.goals', 'nav.blockers', 'nav.dependencies', 
    'nav.actions', 'nav.analytics', 'nav.support', 'nav.people', 'nav.reviews', 'nav.admin',
    'reports.list.self', 'reports.list.team', 'reports.list.department',
    'reports.review.queue', 'reports.review.approve', 'reports.review.rework',
    'goals.list.self', 'goals.list.team', 'goals.list.department',
    'blockers.list.self', 'blockers.list.team', 'blockers.list.department',
    'analytics.view.self', 'analytics.view.team', 'analytics.view.department',
    'admin.view', 'admin.org.manage',
    'people.directory.view', 'people.orgchart.view',
    'reviews.weekly.manage', 'reviews.appraisals.view',
  ],
  ORG_ADMIN: [
    // Inherits all DEPT_ADMIN permissions plus org-level
    'nav.home', 'nav.reporting', 'nav.goals', 'nav.blockers', 'nav.dependencies', 
    'nav.actions', 'nav.analytics', 'nav.support', 'nav.people', 'nav.reviews', 'nav.admin',
    'reports.list.self', 'reports.list.team', 'reports.list.department', 'reports.list.org',
    'reports.export.allowed',
    'goals.list.self', 'goals.list.team', 'goals.list.department', 'goals.list.org',
    'analytics.view.self', 'analytics.view.team', 'analytics.view.department', 'analytics.view.org',
    'analytics.export.allowed',
    'admin.view', 'admin.users.manage', 'admin.roles.manage', 'admin.templates.manage',
    'admin.policies.manage', 'admin.automations.manage', 'admin.notifications.manage',
    'admin.ai.manage', 'admin.analytics.manage', 'admin.goals.config', 'admin.org.manage',
    'security.audit.view', 'security.exports.view',
    'people.directory.view', 'people.orgchart.view',
    'reviews.weekly.manage', 'reviews.appraisals.view',
  ],
  ORG_OWNER: [
    // All ORG_ADMIN permissions plus billing
    'nav.home', 'nav.reporting', 'nav.goals', 'nav.blockers', 'nav.dependencies', 
    'nav.actions', 'nav.analytics', 'nav.support', 'nav.people', 'nav.reviews', 'nav.admin',
    'reports.list.org', 'reports.export.allowed',
    'goals.list.org',
    'analytics.view.org', 'analytics.export.allowed',
    'admin.view', 'admin.users.manage', 'admin.roles.manage', 'admin.templates.manage',
    'admin.policies.manage', 'admin.automations.manage', 'admin.notifications.manage',
    'admin.ai.manage', 'admin.analytics.manage', 'admin.goals.config', 'admin.org.manage',
    'billing.manage',
    'security.audit.view', 'security.exports.view', 'security.sensitive_access.view',
    'people.directory.view', 'people.orgchart.view',
    'reviews.weekly.manage', 'reviews.appraisals.view',
  ],
  HR: [
    'nav.home', 'nav.people', 'nav.analytics', 'nav.reviews',
    'people.directory.view',
    'analytics.view.hr', 'analytics.export.allowed',
    'reviews.appraisals.view', 'reviews.appraisals.manage', 'reviews.calibration.manage',
  ],
  AUDITOR: [
    'nav.home', 'nav.reporting', 'nav.analytics',
    'security.audit.view', 'security.exports.view',
    'reports.list.org',
    'analytics.view.org',
  ],
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user on mount
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUserId = localStorage.getItem('currentUserId');
        if (storedUserId) {
          const foundUser = mockUsers.find(u => u.id === storedUserId);
          if (foundUser) {
            setUser(foundUser);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('currentUserId', userData.id);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUserId');
  };

  const switchRole = (role: UserRole) => {
    const userWithRole = mockUsers.find(u => u.role === role);
    if (userWithRole) {
      login(userWithRole);
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    const permissions = rolePermissions[user.role] || [];
    return permissions.includes(permission);
  };

  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some(p => hasPermission(p));
  };

  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.every(p => hasPermission(p));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        switchRole,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
