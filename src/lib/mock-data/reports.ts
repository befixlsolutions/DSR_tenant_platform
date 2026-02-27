// Mock Reports Data - Based on Documentation Field Names

export type ReportType = 'DSR' | 'WSR' | 'MSR' | 'QSR' | 'YSR';
export type ReportStatus = 'draft' | 'submitted' | 'locked' | 'approved' | 'rework_requested';

export interface ReportBlocker {
  id: string;
  title: string;
  severity: 'S0' | 'S1' | 'S2' | 'S3';
  owner?: string;
  eta?: string;
  status: 'open' | 'in_progress' | 'resolved';
  impact: string;
}

export interface DSRReport {
  id: string;
  tenant_id: string;
  user_id: string;
  report_type: 'DSR';
  report_date: string;
  status: ReportStatus;
  what_i_did_today: string[];
  blockers: ReportBlocker[];
  tomorrow_plan: string[];
  evidence_links: string[];
  submitted_at?: string;
  submitted_by?: string;
  reviewed_at?: string;
  reviewed_by?: string;
  review_comments?: string;
  created_at: string;
  updated_at: string;
}

export interface WSRReport {
  id: string;
  tenant_id: string;
  user_id: string;
  report_type: 'WSR';
  week_start: string;
  week_end: string;
  status: ReportStatus;
  week_summary: string;
  key_achievements: string[];
  next_week_goals: {
    title: string;
    success_criteria: string[];
    priority: 'low' | 'medium' | 'high';
  }[];
  blockers_summary: string;
  ai_generated: boolean;
  submitted_at?: string;
  reviewed_at?: string;
  reviewed_by?: string;
  created_at: string;
  updated_at: string;
}

export interface MSRReport {
  id: string;
  tenant_id: string;
  user_id: string;
  report_type: 'MSR';
  month: string;
  status: ReportStatus;
  executive_summary: string;
  goals_outcomes: string;
  delivery_summary: string;
  blocker_analysis: string;
  efficiency_trend_snapshot: {
    total_score: number;
    discipline: number;
    goals: number;
    delivery: number;
    blockers: number;
    communication: number;
  };
  communication_signals: string;
  manager_review: string;
  employee_reflection: string;
  next_month_focus: string[];
  created_at: string;
  updated_at: string;
}

export const mockDSRReports: DSRReport[] = [
  {
    id: 'dsr-1',
    tenant_id: 'tenant-1',
    user_id: 'user-1',
    report_type: 'DSR',
    report_date: '2026-02-23',
    status: 'submitted',
    what_i_did_today: [
      'Completed user authentication module',
      'Fixed 3 critical bugs in payment gateway',
      'Reviewed 2 pull requests from team members',
      'Attended sprint planning meeting',
    ],
    blockers: [
      {
        id: 'blocker-1',
        title: 'API documentation incomplete',
        severity: 'S2',
        owner: 'user-2',
        eta: '2026-02-25',
        status: 'in_progress',
        impact: 'Cannot proceed with integration testing',
      },
    ],
    tomorrow_plan: [
      'Start integration testing for auth module',
      'Update API documentation',
      'Code review for new feature branch',
    ],
    evidence_links: [
      'https://github.com/company/repo/pull/123',
      'https://jira.company.com/browse/PROJ-456',
    ],
    submitted_at: '2026-02-23T17:30:00Z',
    submitted_by: 'user-1',
    reviewed_at: '2026-02-23T18:00:00Z',
    reviewed_by: 'user-2',
    review_comments: 'Great progress! Keep up the good work.',
    created_at: '2026-02-23T09:00:00Z',
    updated_at: '2026-02-23T17:30:00Z',
  },
  {
    id: 'dsr-2',
    tenant_id: 'tenant-1',
    user_id: 'user-1',
    report_date: '2026-02-22',
    report_type: 'DSR',
    status: 'approved',
    what_i_did_today: [
      'Implemented password reset functionality',
      'Updated user profile page UI',
      'Fixed responsive design issues on mobile',
    ],
    blockers: [],
    tomorrow_plan: [
      'Complete authentication module',
      'Start payment gateway integration',
    ],
    evidence_links: [
      'https://github.com/company/repo/pull/120',
    ],
    submitted_at: '2026-02-22T17:00:00Z',
    submitted_by: 'user-1',
    reviewed_at: '2026-02-22T18:30:00Z',
    reviewed_by: 'user-2',
    review_comments: 'Excellent work on the UI improvements!',
    created_at: '2026-02-22T09:00:00Z',
    updated_at: '2026-02-22T17:00:00Z',
  },
  {
    id: 'dsr-3',
    tenant_id: 'tenant-1',
    user_id: 'user-1',
    report_date: '2026-02-21',
    report_type: 'DSR',
    status: 'draft',
    what_i_did_today: [
      'Research on OAuth 2.0 implementation',
      'Setup development environment for new feature',
    ],
    blockers: [],
    tomorrow_plan: [
      'Start implementing OAuth flow',
    ],
    evidence_links: [],
    created_at: '2026-02-21T09:00:00Z',
    updated_at: '2026-02-21T16:00:00Z',
  },
];

export const mockWSRReports: WSRReport[] = [
  {
    id: 'wsr-1',
    tenant_id: 'tenant-1',
    user_id: 'user-1',
    report_type: 'WSR',
    week_start: '2026-02-17',
    week_end: '2026-02-21',
    status: 'submitted',
    week_summary: 'Completed authentication module and started payment gateway integration. Made significant progress on user profile features.',
    key_achievements: [
      'Completed user authentication module (100%)',
      'Fixed 8 critical bugs',
      'Reviewed 10 pull requests',
      'Improved code coverage to 85%',
    ],
    next_week_goals: [
      {
        title: 'Complete payment gateway integration',
        success_criteria: [
          'All payment methods working',
          'Error handling implemented',
          'Unit tests written',
        ],
        priority: 'high',
      },
      {
        title: 'Implement user notifications',
        success_criteria: [
          'Email notifications working',
          'In-app notifications working',
        ],
        priority: 'medium',
      },
    ],
    blockers_summary: 'API documentation was incomplete but resolved by end of week.',
    ai_generated: true,
    submitted_at: '2026-02-21T17:00:00Z',
    reviewed_at: '2026-02-22T10:00:00Z',
    reviewed_by: 'user-2',
    created_at: '2026-02-21T16:00:00Z',
    updated_at: '2026-02-21T17:00:00Z',
  },
];

export const mockMSRReports: MSRReport[] = [
  {
    id: 'msr-1',
    tenant_id: 'tenant-1',
    user_id: 'user-1',
    report_type: 'MSR',
    month: '2026-01',
    status: 'approved',
    executive_summary: 'Strong month with all major milestones achieved. Completed 3 major features and maintained high code quality.',
    goals_outcomes: 'Achieved 4 out of 5 monthly goals. One goal deferred to next month due to dependency on external API.',
    delivery_summary: 'Delivered authentication system, user profile management, and notification system. All features tested and deployed to production.',
    blocker_analysis: 'Encountered 2 major blockers related to third-party API integration. Both resolved within SLA.',
    efficiency_trend_snapshot: {
      total_score: 87,
      discipline: 92,
      goals: 85,
      delivery: 88,
      blockers: 82,
      communication: 90,
    },
    communication_signals: 'Excellent communication with team. Proactive in raising blockers and providing updates.',
    manager_review: 'Outstanding performance this month. John has shown great initiative and technical skills.',
    employee_reflection: 'Proud of the progress made. Looking forward to tackling more challenging features next month.',
    next_month_focus: [
      'Payment gateway integration',
      'Advanced analytics dashboard',
      'Performance optimization',
    ],
    created_at: '2026-02-01T00:00:00Z',
    updated_at: '2026-02-05T00:00:00Z',
  },
];

// Helper functions
export const getReportsByUser = (userId: string): (DSRReport | WSRReport | MSRReport)[] => {
  return [
    ...mockDSRReports.filter(r => r.user_id === userId),
    ...mockWSRReports.filter(r => r.user_id === userId),
    ...mockMSRReports.filter(r => r.user_id === userId),
  ];
};

export const getReportsByType = (type: ReportType): (DSRReport | WSRReport | MSRReport)[] => {
  switch (type) {
    case 'DSR':
      return mockDSRReports;
    case 'WSR':
      return mockWSRReports;
    case 'MSR':
      return mockMSRReports;
    default:
      return [];
  }
};

export const getReportsByStatus = (status: ReportStatus): (DSRReport | WSRReport | MSRReport)[] => {
  return [
    ...mockDSRReports.filter(r => r.status === status),
    ...mockWSRReports.filter(r => r.status === status),
    ...mockMSRReports.filter(r => r.status === status),
  ];
};

export const getRequiredToday = (userId: string): DSRReport | null => {
  const today = new Date().toISOString().split('T')[0];
  return mockDSRReports.find(r => r.user_id === userId && r.report_date === today) || null;
};
