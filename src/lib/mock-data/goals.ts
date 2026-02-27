// Mock Goals Data - Based on Documentation Field Names (GLS - Goal Lifecycle System)

export type GoalStatus = 'not_started' | 'in_progress' | 'achieved' | 'missed' | 'deferred';
export type GoalPriority = 'low' | 'medium' | 'high';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface Goal {
  id: string;
  tenant_id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  related_project?: string;
  success_criteria: string[]; // Required field
  priority: GoalPriority;
  owner: string;
  risk_level: RiskLevel;
  dependencies: string[]; // Array of dependency IDs
  due_week: string; // Week number or date
  status: GoalStatus;
  expected_progress: number; // 0-100
  actual_progress: number; // 0-100
  evidence_links: string[];
  blockers: string[]; // Array of blocker IDs
  created_at: string;
  updated_at: string;
  achieved_at?: string;
  deferred_reason?: string;
}

export const mockGoals: Goal[] = [
  {
    id: 'goal-1',
    tenant_id: 'tenant-1',
    user_id: 'user-1',
    title: 'Complete Payment Gateway Integration',
    description: 'Integrate Stripe payment gateway with full support for credit cards, debit cards, and digital wallets.',
    category: 'Development',
    related_project: 'E-commerce Platform',
    success_criteria: [
      'All payment methods (credit card, debit card, PayPal, Apple Pay) working',
      'Error handling and retry logic implemented',
      'Unit tests with 90%+ coverage',
      'Security audit passed',
      'Documentation completed',
    ],
    priority: 'high',
    owner: 'user-1',
    risk_level: 'medium',
    dependencies: ['dep-1', 'dep-2'],
    due_week: '2026-W09', // Week 9 of 2026
    status: 'in_progress',
    expected_progress: 60,
    actual_progress: 45,
    evidence_links: [
      'https://github.com/company/repo/pull/150',
      'https://jira.company.com/browse/PAY-100',
    ],
    blockers: ['blocker-1'],
    created_at: '2026-02-01T00:00:00Z',
    updated_at: '2026-02-23T10:00:00Z',
  },
  {
    id: 'goal-2',
    tenant_id: 'tenant-1',
    user_id: 'user-1',
    title: 'Implement Advanced Analytics Dashboard',
    description: 'Create a comprehensive analytics dashboard with real-time data visualization and export capabilities.',
    category: 'Development',
    related_project: 'Analytics Platform',
    success_criteria: [
      'Real-time data updates working',
      'All chart types implemented (line, bar, pie, heatmap)',
      'Export to PDF and Excel working',
      'Performance optimized (< 2s load time)',
      'Mobile responsive',
    ],
    priority: 'high',
    owner: 'user-1',
    risk_level: 'high',
    dependencies: ['dep-3'],
    due_week: '2026-W10',
    status: 'not_started',
    expected_progress: 0,
    actual_progress: 0,
    evidence_links: [],
    blockers: [],
    created_at: '2026-02-15T00:00:00Z',
    updated_at: '2026-02-15T00:00:00Z',
  },
  {
    id: 'goal-3',
    tenant_id: 'tenant-1',
    user_id: 'user-1',
    title: 'Improve API Response Time',
    description: 'Optimize API endpoints to reduce average response time by 50%.',
    category: 'Performance',
    related_project: 'Backend Optimization',
    success_criteria: [
      'Average response time < 200ms',
      'P95 response time < 500ms',
      'Database queries optimized',
      'Caching implemented',
      'Load testing passed',
    ],
    priority: 'medium',
    owner: 'user-1',
    risk_level: 'low',
    dependencies: [],
    due_week: '2026-W11',
    status: 'in_progress',
    expected_progress: 30,
    actual_progress: 35,
    evidence_links: [
      'https://github.com/company/repo/pull/145',
    ],
    blockers: [],
    created_at: '2026-02-10T00:00:00Z',
    updated_at: '2026-02-22T00:00:00Z',
  },
  {
    id: 'goal-4',
    tenant_id: 'tenant-1',
    user_id: 'user-1',
    title: 'Complete User Authentication Module',
    description: 'Implement secure user authentication with OAuth 2.0 and JWT.',
    category: 'Development',
    related_project: 'User Management',
    success_criteria: [
      'OAuth 2.0 flow implemented',
      'JWT token management working',
      'Password reset functionality',
      'Two-factor authentication',
      'Security audit passed',
    ],
    priority: 'high',
    owner: 'user-1',
    risk_level: 'low',
    dependencies: [],
    due_week: '2026-W08',
    status: 'achieved',
    expected_progress: 100,
    actual_progress: 100,
    evidence_links: [
      'https://github.com/company/repo/pull/140',
      'https://jira.company.com/browse/AUTH-50',
    ],
    blockers: [],
    created_at: '2026-01-15T00:00:00Z',
    updated_at: '2026-02-20T00:00:00Z',
    achieved_at: '2026-02-20T15:00:00Z',
  },
  {
    id: 'goal-5',
    tenant_id: 'tenant-1',
    user_id: 'user-1',
    title: 'Migrate to Microservices Architecture',
    description: 'Break down monolithic application into microservices.',
    category: 'Architecture',
    related_project: 'Platform Modernization',
    success_criteria: [
      'Service boundaries defined',
      'API gateway implemented',
      'Service discovery working',
      'Inter-service communication established',
      'Migration plan executed',
    ],
    priority: 'low',
    owner: 'user-1',
    risk_level: 'high',
    dependencies: ['dep-4', 'dep-5'],
    due_week: '2026-W16',
    status: 'deferred',
    expected_progress: 10,
    actual_progress: 5,
    evidence_links: [],
    blockers: ['blocker-2'],
    created_at: '2026-01-20T00:00:00Z',
    updated_at: '2026-02-18T00:00:00Z',
    deferred_reason: 'Waiting for infrastructure team to complete cloud migration',
  },
];

// Helper functions
export const getGoalsByUser = (userId: string): Goal[] => {
  return mockGoals.filter(g => g.user_id === userId);
};

export const getGoalsByStatus = (status: GoalStatus): Goal[] => {
  return mockGoals.filter(g => g.status === status);
};

export const getGoalsByPriority = (priority: GoalPriority): Goal[] => {
  return mockGoals.filter(g => g.priority === priority);
};

export const getAtRiskGoals = (): Goal[] => {
  return mockGoals.filter(g => {
    // At risk if: in progress, high priority, and actual progress < expected progress
    return g.status === 'in_progress' && 
           g.priority === 'high' && 
           g.actual_progress < g.expected_progress;
  });
};

export const getFocusGoals = (userId: string): Goal[] => {
  // Top 3-5 goals based on priority and status
  return mockGoals
    .filter(g => g.user_id === userId && (g.status === 'in_progress' || g.status === 'not_started'))
    .sort((a, b) => {
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    })
    .slice(0, 5);
};

export const getGoalAchievementRate = (userId: string): number => {
  const userGoals = getGoalsByUser(userId);
  const achievedGoals = userGoals.filter(g => g.status === 'achieved').length;
  return userGoals.length > 0 ? (achievedGoals / userGoals.length) * 100 : 0;
};
