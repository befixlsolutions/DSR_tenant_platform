// Mock data for Audit & Security module

export type AuditAction = 'create' | 'update' | 'delete' | 'view' | 'export' | 'login' | 'logout' | 'approve' | 'reject';
export type AuditEntity = 'user' | 'role' | 'report' | 'goal' | 'blocker' | 'action' | 'integration' | 'policy' | 'automation';
export type SecurityEventType = 'failed_login' | 'suspicious_activity' | 'unauthorized_access' | 'password_change' | 'mfa_enabled' | 'mfa_disabled' | 'session_expired' | 'ip_blocked';
export type ExportStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface AuditLog {
  id: string;
  timestamp: Date;
  userId: string;
  userName: string;
  userEmail: string;
  action: AuditAction;
  entity: AuditEntity;
  entityId: string;
  entityName: string;
  ipAddress: string;
  userAgent: string;
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  metadata?: Record<string, any>;
}

export interface SecurityEvent {
  id: string;
  timestamp: Date;
  type: SecurityEventType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  userId?: string;
  userName?: string;
  ipAddress: string;
  location?: string;
  description: string;
  resolved: boolean;
  resolvedAt?: Date;
  resolvedBy?: string;
}

export interface ExportLog {
  id: string;
  requestedBy: string;
  requestedAt: Date;
  entityType: string;
  dateRange: {
    start: Date;
    end: Date;
  };
  status: ExportStatus;
  fileSize?: number;
  recordCount?: number;
  downloadUrl?: string;
  expiresAt?: Date;
  watermark: boolean;
  approvalRequired: boolean;
  approvedBy?: string;
  approvedAt?: Date;
}

export interface IPRestriction {
  id: string;
  ipAddress: string;
  type: 'allow' | 'block';
  reason: string;
  createdBy: string;
  createdAt: Date;
  expiresAt?: Date;
  active: boolean;
}

export interface ActiveSession {
  id: string;
  userId: string;
  userName: string;
  ipAddress: string;
  location: string;
  device: string;
  browser: string;
  startedAt: Date;
  lastActivity: Date;
  expiresAt: Date;
}

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'audit-001',
    timestamp: new Date('2026-02-24T10:30:00'),
    userId: 'user-001',
    userName: 'John Smith',
    userEmail: 'john.smith@example.com',
    action: 'create',
    entity: 'report',
    entityId: 'dsr-12345',
    entityName: 'Daily Status Report - Feb 24',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
  },
  {
    id: 'audit-002',
    timestamp: new Date('2026-02-24T10:15:00'),
    userId: 'user-002',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.j@example.com',
    action: 'update',
    entity: 'goal',
    entityId: 'goal-456',
    entityName: 'Q1 Revenue Target',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15',
    changes: [
      { field: 'progress', oldValue: 45, newValue: 60 },
      { field: 'status', oldValue: 'in_progress', newValue: 'on_track' },
    ],
  },
  {
    id: 'audit-003',
    timestamp: new Date('2026-02-24T09:45:00'),
    userId: 'user-003',
    userName: 'Mike Chen',
    userEmail: 'mike.chen@example.com',
    action: 'delete',
    entity: 'blocker',
    entityId: 'blocker-789',
    entityName: 'API Integration Issue',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/120.0.0.0',
  },
  {
    id: 'audit-004',
    timestamp: new Date('2026-02-24T09:30:00'),
    userId: 'user-004',
    userName: 'Emily Davis',
    userEmail: 'emily.d@example.com',
    action: 'export',
    entity: 'report',
    entityId: 'export-001',
    entityName: 'Monthly Reports Export',
    ipAddress: '192.168.1.103',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Firefox/121.0',
    metadata: { format: 'CSV', recordCount: 150 },
  },
  {
    id: 'audit-005',
    timestamp: new Date('2026-02-24T09:00:00'),
    userId: 'user-005',
    userName: 'David Wilson',
    userEmail: 'david.w@example.com',
    action: 'approve',
    entity: 'report',
    entityId: 'dsr-12340',
    entityName: 'Daily Status Report - Feb 23',
    ipAddress: '192.168.1.104',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/120.0.0.0',
  },
  {
    id: 'audit-006',
    timestamp: new Date('2026-02-24T08:45:00'),
    userId: 'user-001',
    userName: 'John Smith',
    userEmail: 'john.smith@example.com',
    action: 'login',
    entity: 'user',
    entityId: 'user-001',
    entityName: 'John Smith',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
  },
  {
    id: 'audit-007',
    timestamp: new Date('2026-02-24T08:30:00'),
    userId: 'admin-001',
    userName: 'Admin User',
    userEmail: 'admin@example.com',
    action: 'update',
    entity: 'role',
    entityId: 'role-manager',
    entityName: 'Manager Role',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
    changes: [
      { field: 'permissions', oldValue: ['view', 'edit'], newValue: ['view', 'edit', 'approve'] },
    ],
  },
  {
    id: 'audit-008',
    timestamp: new Date('2026-02-24T08:00:00'),
    userId: 'user-006',
    userName: 'Lisa Anderson',
    userEmail: 'lisa.a@example.com',
    action: 'create',
    entity: 'action',
    entityId: 'action-999',
    entityName: 'Follow up with client',
    ipAddress: '192.168.1.105',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Safari/604.1',
  },
];

export const mockSecurityEvents: SecurityEvent[] = [
  {
    id: 'sec-001',
    timestamp: new Date('2026-02-24T10:45:00'),
    type: 'failed_login',
    severity: 'medium',
    userId: 'user-007',
    userName: 'Robert Taylor',
    ipAddress: '203.0.113.45',
    location: 'Unknown Location',
    description: '3 failed login attempts in 5 minutes',
    resolved: false,
  },
  {
    id: 'sec-002',
    timestamp: new Date('2026-02-24T09:30:00'),
    type: 'suspicious_activity',
    severity: 'high',
    userId: 'user-008',
    userName: 'Jennifer Martinez',
    ipAddress: '198.51.100.23',
    location: 'New York, US',
    description: 'Unusual data export pattern detected',
    resolved: true,
    resolvedAt: new Date('2026-02-24T10:00:00'),
    resolvedBy: 'Security Team',
  },
  {
    id: 'sec-003',
    timestamp: new Date('2026-02-24T08:15:00'),
    type: 'unauthorized_access',
    severity: 'critical',
    ipAddress: '192.0.2.100',
    location: 'Unknown',
    description: 'Attempted access to admin panel from unauthorized IP',
    resolved: true,
    resolvedAt: new Date('2026-02-24T08:30:00'),
    resolvedBy: 'Admin User',
  },
  {
    id: 'sec-004',
    timestamp: new Date('2026-02-23T16:00:00'),
    type: 'password_change',
    severity: 'low',
    userId: 'user-009',
    userName: 'Michael Brown',
    ipAddress: '192.168.1.110',
    location: 'San Francisco, US',
    description: 'Password changed successfully',
    resolved: true,
    resolvedAt: new Date('2026-02-23T16:00:00'),
  },
  {
    id: 'sec-005',
    timestamp: new Date('2026-02-23T14:30:00'),
    type: 'mfa_enabled',
    severity: 'low',
    userId: 'user-010',
    userName: 'Jessica White',
    ipAddress: '192.168.1.111',
    location: 'Los Angeles, US',
    description: 'Multi-factor authentication enabled',
    resolved: true,
    resolvedAt: new Date('2026-02-23T14:30:00'),
  },
  {
    id: 'sec-006',
    timestamp: new Date('2026-02-23T12:00:00'),
    type: 'ip_blocked',
    severity: 'high',
    ipAddress: '203.0.113.99',
    location: 'Unknown',
    description: 'IP address blocked due to multiple failed login attempts',
    resolved: false,
  },
];

export const mockExportLogs: ExportLog[] = [
  {
    id: 'export-001',
    requestedBy: 'Emily Davis',
    requestedAt: new Date('2026-02-24T09:30:00'),
    entityType: 'Monthly Reports',
    dateRange: {
      start: new Date('2026-01-01'),
      end: new Date('2026-01-31'),
    },
    status: 'completed',
    fileSize: 2457600, // 2.4 MB
    recordCount: 150,
    downloadUrl: '/exports/monthly-reports-jan-2026.csv',
    expiresAt: new Date('2026-02-27T09:30:00'),
    watermark: true,
    approvalRequired: true,
    approvedBy: 'Admin User',
    approvedAt: new Date('2026-02-24T09:35:00'),
  },
  {
    id: 'export-002',
    requestedBy: 'David Wilson',
    requestedAt: new Date('2026-02-24T08:00:00'),
    entityType: 'User Data',
    dateRange: {
      start: new Date('2026-02-01'),
      end: new Date('2026-02-24'),
    },
    status: 'processing',
    watermark: true,
    approvalRequired: true,
    approvedBy: 'Admin User',
    approvedAt: new Date('2026-02-24T08:05:00'),
  },
  {
    id: 'export-003',
    requestedBy: 'Sarah Johnson',
    requestedAt: new Date('2026-02-23T15:00:00'),
    entityType: 'Audit Logs',
    dateRange: {
      start: new Date('2026-02-01'),
      end: new Date('2026-02-23'),
    },
    status: 'completed',
    fileSize: 1048576, // 1 MB
    recordCount: 500,
    downloadUrl: '/exports/audit-logs-feb-2026.csv',
    expiresAt: new Date('2026-02-26T15:00:00'),
    watermark: true,
    approvalRequired: false,
  },
  {
    id: 'export-004',
    requestedBy: 'Mike Chen',
    requestedAt: new Date('2026-02-23T10:00:00'),
    entityType: 'Goals Data',
    dateRange: {
      start: new Date('2026-01-01'),
      end: new Date('2026-02-23'),
    },
    status: 'failed',
    watermark: true,
    approvalRequired: true,
  },
  {
    id: 'export-005',
    requestedBy: 'Lisa Anderson',
    requestedAt: new Date('2026-02-22T14:00:00'),
    entityType: 'Performance Reports',
    dateRange: {
      start: new Date('2025-12-01'),
      end: new Date('2026-02-22'),
    },
    status: 'pending',
    watermark: true,
    approvalRequired: true,
  },
];

export const mockIPRestrictions: IPRestriction[] = [
  {
    id: 'ip-001',
    ipAddress: '192.168.1.0/24',
    type: 'allow',
    reason: 'Office network',
    createdBy: 'Admin User',
    createdAt: new Date('2026-01-01T00:00:00'),
    active: true,
  },
  {
    id: 'ip-002',
    ipAddress: '203.0.113.99',
    type: 'block',
    reason: 'Multiple failed login attempts',
    createdBy: 'Security System',
    createdAt: new Date('2026-02-23T12:00:00'),
    expiresAt: new Date('2026-02-25T12:00:00'),
    active: true,
  },
  {
    id: 'ip-003',
    ipAddress: '198.51.100.0/24',
    type: 'allow',
    reason: 'Remote office',
    createdBy: 'Admin User',
    createdAt: new Date('2026-01-15T00:00:00'),
    active: true,
  },
  {
    id: 'ip-004',
    ipAddress: '192.0.2.100',
    type: 'block',
    reason: 'Unauthorized access attempt',
    createdBy: 'Admin User',
    createdAt: new Date('2026-02-24T08:30:00'),
    active: true,
  },
];

export const mockActiveSessions: ActiveSession[] = [
  {
    id: 'session-001',
    userId: 'user-001',
    userName: 'John Smith',
    ipAddress: '192.168.1.100',
    location: 'San Francisco, US',
    device: 'Windows Desktop',
    browser: 'Chrome 120',
    startedAt: new Date('2026-02-24T08:45:00'),
    lastActivity: new Date('2026-02-24T10:30:00'),
    expiresAt: new Date('2026-02-24T16:45:00'),
  },
  {
    id: 'session-002',
    userId: 'user-002',
    userName: 'Sarah Johnson',
    ipAddress: '192.168.1.101',
    location: 'New York, US',
    device: 'MacBook Pro',
    browser: 'Safari 17',
    startedAt: new Date('2026-02-24T09:00:00'),
    lastActivity: new Date('2026-02-24T10:15:00'),
    expiresAt: new Date('2026-02-24T17:00:00'),
  },
  {
    id: 'session-003',
    userId: 'user-003',
    userName: 'Mike Chen',
    ipAddress: '192.168.1.102',
    location: 'Los Angeles, US',
    device: 'Windows Desktop',
    browser: 'Edge 120',
    startedAt: new Date('2026-02-24T08:30:00'),
    lastActivity: new Date('2026-02-24T09:45:00'),
    expiresAt: new Date('2026-02-24T16:30:00'),
  },
  {
    id: 'session-004',
    userId: 'user-004',
    userName: 'Emily Davis',
    ipAddress: '192.168.1.103',
    location: 'Chicago, US',
    device: 'Windows Desktop',
    browser: 'Firefox 121',
    startedAt: new Date('2026-02-24T09:15:00'),
    lastActivity: new Date('2026-02-24T09:30:00'),
    expiresAt: new Date('2026-02-24T17:15:00'),
  },
  {
    id: 'session-005',
    userId: 'user-005',
    userName: 'David Wilson',
    ipAddress: '192.168.1.104',
    location: 'Seattle, US',
    device: 'MacBook Air',
    browser: 'Chrome 120',
    startedAt: new Date('2026-02-24T08:00:00'),
    lastActivity: new Date('2026-02-24T09:00:00'),
    expiresAt: new Date('2026-02-24T16:00:00'),
  },
];
