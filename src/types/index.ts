// User & Auth Types
export interface User {
  id: string;
  tenantId: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  teamId?: string;
  managerId?: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'employee' | 'manager' | 'hr' | 'admin';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Task Types
export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'completed' | 'blocked';
  assignedTo: string;
  dueDate: string;
  estimatedHours?: number;
  actualHours?: number;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

// Performance Types
export interface PerformanceScore {
  userId: string;
  date: string;
  totalPoints: number;
  bonuses: number;
  penalties: number;
  breakdown: {
    tasks: number;
    jira: number;
    github: number;
    quality: number;
  };
  anomalyFlag?: boolean;
}

export interface DailyPerformance extends PerformanceScore {
  type: 'daily';
}

export interface WeeklyPerformance {
  userId: string;
  weekStart: string;
  weekEnd: string;
  averagePoints: number;
  trend: 'up' | 'down' | 'stable';
  riskFlags: string[];
}

// Report Types
export type ReportType = 'DSR' | 'WSR' | 'MSR' | 'QSR' | 'YSR';

export interface Report {
  id: string;
  userId: string;
  tenantId: string;
  reportType: ReportType;
  periodStart: string;
  periodEnd: string;
  periodLabel: string;
  status: 'draft' | 'submitted' | 'locked' | 'approved';
  scoreSnapshot: PerformanceScore;
  content: ReportContent;
  createdAt: string;
  finalizedAt?: string;
}

export interface ReportContent {
  rawAiOutput: string;
  structuredSummary: {
    executiveSummary: string;
    keyAchievements: string[];
    qualityAssessment: string;
    improvementAreas: string[];
    recommendedFocus: string[];
  };
  highlights: string[];
  risks: string[];
  recommendations: string[];
  references: {
    jira: string[];
    github: string[];
    tasks: string[];
  };
}

// Integration Types
export type IntegrationType = 'jira' | 'github' | 'keka';

export interface Integration {
  id: string;
  tenantId: string;
  provider: IntegrationType;
  status: 'connected' | 'disconnected' | 'error';
  connectedBy: string;
  connectedAt: string;
  lastSyncAt?: string;
}

// Analytics Types
export interface AnalyticsData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color: string;
  }[];
}

// Team Types
export interface Team {
  id: string;
  name: string;
  managerId: string;
  departmentId?: string;
  members: string[];
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
