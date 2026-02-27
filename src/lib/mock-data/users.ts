// Mock data for User & Role Management

export type UserRole = 'EMPLOYEE' | 'MANAGER' | 'DEPT_ADMIN' | 'ORG_ADMIN' | 'ORG_OWNER' | 'HR' | 'AUDITOR';

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'reporting' | 'goals' | 'blockers' | 'actions' | 'reviews' | 'analytics' | 'admin' | 'people';
}

export interface Role {
  id: string;
  name: string;
  description: string;
  type: 'system' | 'custom';
  permissions: string[]; // permission IDs
  userCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'suspended';
  role: UserRole; // primary role
  roles: string[]; // role IDs
  department: string;
  team: string;
  manager?: string;
  joinDate: Date;
  lastLogin?: Date;
  mfaEnabled: boolean;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  headId: string;
  parentId?: string;
  teamCount: number;
  memberCount: number;
  createdAt: Date;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  departmentId: string;
  leadId: string;
  memberCount: number;
  createdAt: Date;
}

// Permissions
export const mockPermissions: Permission[] = [
  // Reporting
  { id: 'perm-1', name: 'view_own_reports', description: 'View own DSR/WSR/MSR', category: 'reporting' },
  { id: 'perm-2', name: 'create_reports', description: 'Create DSR/WSR/MSR', category: 'reporting' },
  { id: 'perm-3', name: 'view_team_reports', description: 'View team reports', category: 'reporting' },
  { id: 'perm-4', name: 'approve_reports', description: 'Approve/reject reports', category: 'reporting' },
  { id: 'perm-5', name: 'view_all_reports', description: 'View all reports', category: 'reporting' },
  
  // Goals
  { id: 'perm-6', name: 'view_own_goals', description: 'View own goals', category: 'goals' },
  { id: 'perm-7', name: 'create_goals', description: 'Create goals', category: 'goals' },
  { id: 'perm-8', name: 'view_team_goals', description: 'View team goals', category: 'goals' },
  { id: 'perm-9', name: 'manage_team_goals', description: 'Manage team goals', category: 'goals' },
  { id: 'perm-10', name: 'view_org_goals', description: 'View org goals', category: 'goals' },
  
  // Blockers
  { id: 'perm-11', name: 'view_own_blockers', description: 'View own blockers', category: 'blockers' },
  { id: 'perm-12', name: 'create_blockers', description: 'Create blockers', category: 'blockers' },
  { id: 'perm-13', name: 'view_team_blockers', description: 'View team blockers', category: 'blockers' },
  { id: 'perm-14', name: 'resolve_blockers', description: 'Resolve blockers', category: 'blockers' },
  
  // Actions
  { id: 'perm-15', name: 'view_own_actions', description: 'View own actions', category: 'actions' },
  { id: 'perm-16', name: 'create_actions', description: 'Create actions', category: 'actions' },
  { id: 'perm-17', name: 'view_team_actions', description: 'View team actions', category: 'actions' },
  { id: 'perm-18', name: 'assign_actions', description: 'Assign actions to others', category: 'actions' },
  
  // Reviews
  { id: 'perm-19', name: 'view_own_reviews', description: 'View own reviews', category: 'reviews' },
  { id: 'perm-20', name: 'conduct_reviews', description: 'Conduct team reviews', category: 'reviews' },
  { id: 'perm-21', name: 'view_all_reviews', description: 'View all reviews', category: 'reviews' },
  { id: 'perm-22', name: 'manage_appraisals', description: 'Manage appraisal cycles', category: 'reviews' },
  
  // Analytics
  { id: 'perm-23', name: 'view_own_analytics', description: 'View own analytics', category: 'analytics' },
  { id: 'perm-24', name: 'view_team_analytics', description: 'View team analytics', category: 'analytics' },
  { id: 'perm-25', name: 'view_dept_analytics', description: 'View department analytics', category: 'analytics' },
  { id: 'perm-26', name: 'view_org_analytics', description: 'View org analytics', category: 'analytics' },
  
  // People
  { id: 'perm-27', name: 'view_directory', description: 'View people directory', category: 'people' },
  { id: 'perm-28', name: 'view_org_chart', description: 'View org chart', category: 'people' },
  { id: 'perm-29', name: 'view_user_timeline', description: 'View user timelines', category: 'people' },
  
  // Admin
  { id: 'perm-30', name: 'manage_users', description: 'Manage users', category: 'admin' },
  { id: 'perm-31', name: 'manage_roles', description: 'Manage roles', category: 'admin' },
  { id: 'perm-32', name: 'manage_templates', description: 'Manage templates', category: 'admin' },
  { id: 'perm-33', name: 'manage_policies', description: 'Manage policies', category: 'admin' },
  { id: 'perm-34', name: 'manage_automations', description: 'Manage automations', category: 'admin' },
  { id: 'perm-35', name: 'view_audit_logs', description: 'View audit logs', category: 'admin' },
  { id: 'perm-36', name: 'manage_org_structure', description: 'Manage org structure', category: 'admin' },
];

// Roles
export const mockRoles: Role[] = [
  {
    id: 'role-1',
    name: 'Employee',
    description: 'Standard employee with basic access',
    type: 'system',
    permissions: ['perm-1', 'perm-2', 'perm-6', 'perm-7', 'perm-11', 'perm-12', 'perm-15', 'perm-16', 'perm-19', 'perm-23', 'perm-27'],
    userCount: 245,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'role-2',
    name: 'Manager',
    description: 'Team manager with team oversight',
    type: 'system',
    permissions: ['perm-1', 'perm-2', 'perm-3', 'perm-4', 'perm-6', 'perm-7', 'perm-8', 'perm-9', 'perm-11', 'perm-12', 'perm-13', 'perm-14', 'perm-15', 'perm-16', 'perm-17', 'perm-18', 'perm-19', 'perm-20', 'perm-23', 'perm-24', 'perm-27', 'perm-28', 'perm-29'],
    userCount: 42,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'role-3',
    name: 'Department Admin',
    description: 'Department administrator',
    type: 'system',
    permissions: ['perm-1', 'perm-2', 'perm-3', 'perm-4', 'perm-5', 'perm-6', 'perm-7', 'perm-8', 'perm-9', 'perm-10', 'perm-11', 'perm-12', 'perm-13', 'perm-14', 'perm-15', 'perm-16', 'perm-17', 'perm-18', 'perm-19', 'perm-20', 'perm-21', 'perm-23', 'perm-24', 'perm-25', 'perm-27', 'perm-28', 'perm-29'],
    userCount: 12,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'role-4',
    name: 'HR Admin',
    description: 'HR administrator with review access',
    type: 'system',
    permissions: ['perm-5', 'perm-10', 'perm-21', 'perm-22', 'perm-26', 'perm-27', 'perm-28', 'perm-29', 'perm-35'],
    userCount: 8,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'role-5',
    name: 'Org Owner',
    description: 'Organization owner with full access',
    type: 'system',
    permissions: mockPermissions.map(p => p.id),
    userCount: 3,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'role-6',
    name: 'Auditor',
    description: 'Read-only auditor access',
    type: 'custom',
    permissions: ['perm-5', 'perm-10', 'perm-21', 'perm-26', 'perm-27', 'perm-28', 'perm-29', 'perm-35'],
    userCount: 5,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
];

// Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    status: 'active',
    role: 'ORG_OWNER',
    roles: ['role-5'],
    department: 'dept-1',
    team: 'team-1',
    joinDate: new Date('2023-01-15'),
    lastLogin: new Date('2026-02-24T09:30:00'),
    mfaEnabled: true,
  },
  {
    id: 'user-2',
    name: 'Michael Rodriguez',
    email: 'michael.rodriguez@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    status: 'active',
    role: 'MANAGER',
    roles: ['role-2'],
    department: 'dept-1',
    team: 'team-1',
    manager: 'user-1',
    joinDate: new Date('2023-03-20'),
    lastLogin: new Date('2026-02-24T08:15:00'),
    mfaEnabled: true,
  },
  {
    id: 'user-3',
    name: 'Emily Watson',
    email: 'emily.watson@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    status: 'active',
    role: 'EMPLOYEE',
    roles: ['role-1'],
    department: 'dept-1',
    team: 'team-1',
    manager: 'user-2',
    joinDate: new Date('2023-06-10'),
    lastLogin: new Date('2026-02-24T07:45:00'),
    mfaEnabled: false,
  },
  {
    id: 'user-4',
    name: 'David Kim',
    email: 'david.kim@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    status: 'active',
    role: 'EMPLOYEE',
    roles: ['role-1'],
    department: 'dept-1',
    team: 'team-2',
    manager: 'user-2',
    joinDate: new Date('2023-08-01'),
    lastLogin: new Date('2026-02-23T16:20:00'),
    mfaEnabled: true,
  },
  {
    id: 'user-5',
    name: 'Jessica Martinez',
    email: 'jessica.martinez@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
    status: 'inactive',
    role: 'EMPLOYEE',
    roles: ['role-1'],
    department: 'dept-2',
    team: 'team-3',
    manager: 'user-6',
    joinDate: new Date('2023-04-15'),
    lastLogin: new Date('2026-02-10T14:30:00'),
    mfaEnabled: false,
  },
  {
    id: 'user-6',
    name: 'Robert Taylor',
    email: 'robert.taylor@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    status: 'active',
    role: 'DEPT_ADMIN',
    roles: ['role-3'],
    department: 'dept-2',
    team: 'team-3',
    joinDate: new Date('2023-02-01'),
    lastLogin: new Date('2026-02-24T09:00:00'),
    mfaEnabled: true,
  },
  {
    id: 'user-7',
    name: 'Amanda Johnson',
    email: 'amanda.johnson@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda',
    status: 'active',
    role: 'ORG_ADMIN',
    roles: ['role-4'],
    department: 'dept-3',
    team: 'team-4',
    joinDate: new Date('2023-01-20'),
    lastLogin: new Date('2026-02-24T08:30:00'),
    mfaEnabled: true,
  },
  {
    id: 'user-8',
    name: 'Christopher Lee',
    email: 'christopher.lee@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Christopher',
    status: 'suspended',
    role: 'EMPLOYEE',
    roles: ['role-1'],
    department: 'dept-2',
    team: 'team-3',
    manager: 'user-6',
    joinDate: new Date('2023-09-15'),
    lastLogin: new Date('2026-01-15T11:20:00'),
    mfaEnabled: false,
  },
];

// Departments
export const mockDepartments: Department[] = [
  {
    id: 'dept-1',
    name: 'Engineering',
    description: 'Product development and engineering',
    headId: 'user-1',
    teamCount: 8,
    memberCount: 85,
    createdAt: new Date('2023-01-01'),
  },
  {
    id: 'dept-2',
    name: 'Product',
    description: 'Product management and design',
    headId: 'user-6',
    teamCount: 4,
    memberCount: 32,
    createdAt: new Date('2023-01-01'),
  },
  {
    id: 'dept-3',
    name: 'Human Resources',
    description: 'HR and people operations',
    headId: 'user-7',
    teamCount: 2,
    memberCount: 12,
    createdAt: new Date('2023-01-01'),
  },
  {
    id: 'dept-4',
    name: 'Sales',
    description: 'Sales and business development',
    headId: 'user-1',
    teamCount: 5,
    memberCount: 48,
    createdAt: new Date('2023-01-01'),
  },
  {
    id: 'dept-5',
    name: 'Marketing',
    description: 'Marketing and communications',
    headId: 'user-1',
    teamCount: 3,
    memberCount: 28,
    createdAt: new Date('2023-01-01'),
  },
];

// Teams
export const mockTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Backend Engineering',
    description: 'API and backend services',
    departmentId: 'dept-1',
    leadId: 'user-2',
    memberCount: 12,
    createdAt: new Date('2023-01-01'),
  },
  {
    id: 'team-2',
    name: 'Frontend Engineering',
    description: 'Web and mobile applications',
    departmentId: 'dept-1',
    leadId: 'user-2',
    memberCount: 15,
    createdAt: new Date('2023-01-01'),
  },
  {
    id: 'team-3',
    name: 'Product Design',
    description: 'UX/UI design team',
    departmentId: 'dept-2',
    leadId: 'user-6',
    memberCount: 8,
    createdAt: new Date('2023-01-01'),
  },
  {
    id: 'team-4',
    name: 'Talent Acquisition',
    description: 'Recruiting and hiring',
    departmentId: 'dept-3',
    leadId: 'user-7',
    memberCount: 6,
    createdAt: new Date('2023-01-01'),
  },
  {
    id: 'team-5',
    name: 'Enterprise Sales',
    description: 'B2B sales team',
    departmentId: 'dept-4',
    leadId: 'user-1',
    memberCount: 18,
    createdAt: new Date('2023-01-01'),
  },
];
