// Mock Reviews & Appraisals Data

export type ReviewStatus = 'pending' | 'in_progress' | 'approved' | 'rework_requested';
export type AppraisalStatus = 'draft' | 'employee_review' | 'manager_review' | 'hr_calibration' | 'finalized';

export interface WeeklyReview {
  id: string;
  report_id: string;
  report_type: 'DSR' | 'WSR';
  employee_id: string;
  employee_name: string;
  manager_id: string;
  submitted_at: string;
  due_at: string;
  status: ReviewStatus;
  sla_status: 'on_time' | 'warning' | 'breached';
  hours_remaining: number;
  coaching_notes?: string;
  action_items?: string[];
  reviewed_at?: string;
  review_comments?: string;
}

export interface AppraisalCycle {
  id: string;
  name: string;
  period: string;
  start_date: string;
  end_date: string;
  status: 'active' | 'closed' | 'upcoming';
  total_employees: number;
  completed_appraisals: number;
  pending_employee_review: number;
  pending_manager_review: number;
  pending_hr_calibration: number;
  created_at: string;
}

export interface Appraisal {
  id: string;
  cycle_id: string;
  employee_id: string;
  employee_name: string;
  manager_id: string;
  manager_name: string;
  status: AppraisalStatus;
  employee_self_review?: string;
  employee_achievements?: string[];
  employee_challenges?: string[];
  employee_goals_next_period?: string[];
  manager_review?: string;
  manager_rating?: number; // 1-5
  manager_strengths?: string[];
  manager_improvements?: string[];
  hr_calibration_notes?: string;
  hr_final_rating?: number; // 1-5
  evidence_pack: {
    msr_ids: string[];
    goal_ids: string[];
    blocker_ids: string[];
    efficiency_scores: number[];
  };
  created_at: string;
  updated_at: string;
  finalized_at?: string;
}

export interface CalibrationCase {
  id: string;
  appraisal_id: string;
  employee_name: string;
  manager_name: string;
  manager_rating: number;
  suggested_rating: number;
  variance: number;
  reason: 'outlier' | 'volatility' | 'cohort_mismatch' | 'manual_review';
  status: 'pending' | 'reviewed' | 'adjusted';
  notes?: string;
}

// Mock Weekly Reviews
export const mockWeeklyReviews: WeeklyReview[] = [
  {
    id: 'review-1',
    report_id: 'dsr-1',
    report_type: 'DSR',
    employee_id: 'user-1',
    employee_name: 'John Employee',
    manager_id: 'user-2',
    submitted_at: '2026-02-23T17:30:00Z',
    due_at: '2026-02-24T17:30:00Z',
    status: 'pending',
    sla_status: 'on_time',
    hours_remaining: 18,
  },
  {
    id: 'review-2',
    report_id: 'dsr-2',
    report_type: 'DSR',
    employee_id: 'user-8',
    employee_name: 'Jane Developer',
    manager_id: 'user-2',
    submitted_at: '2026-02-23T16:00:00Z',
    due_at: '2026-02-24T16:00:00Z',
    status: 'pending',
    sla_status: 'warning',
    hours_remaining: 4,
  },
  {
    id: 'review-3',
    report_id: 'wsr-1',
    report_type: 'WSR',
    employee_id: 'user-9',
    employee_name: 'Bob Engineer',
    manager_id: 'user-2',
    submitted_at: '2026-02-21T17:00:00Z',
    due_at: '2026-02-23T17:00:00Z',
    status: 'pending',
    sla_status: 'breached',
    hours_remaining: -24,
  },
  {
    id: 'review-4',
    report_id: 'dsr-3',
    report_type: 'DSR',
    employee_id: 'user-10',
    employee_name: 'Alice Designer',
    manager_id: 'user-2',
    submitted_at: '2026-02-22T17:00:00Z',
    due_at: '2026-02-23T17:00:00Z',
    status: 'approved',
    sla_status: 'on_time',
    hours_remaining: 0,
    coaching_notes: 'Great work on the UI improvements. Keep up the attention to detail.',
    action_items: ['Continue with responsive design work', 'Review accessibility guidelines'],
    reviewed_at: '2026-02-23T10:00:00Z',
    review_comments: 'Excellent progress this week!',
  },
];

// Mock Appraisal Cycles
export const mockAppraisalCycles: AppraisalCycle[] = [
  {
    id: 'cycle-1',
    name: 'Q1 2026 Performance Review',
    period: 'Q1 2026',
    start_date: '2026-01-01',
    end_date: '2026-03-31',
    status: 'active',
    total_employees: 50,
    completed_appraisals: 35,
    pending_employee_review: 5,
    pending_manager_review: 7,
    pending_hr_calibration: 3,
    created_at: '2025-12-15T00:00:00Z',
  },
  {
    id: 'cycle-2',
    name: 'Q4 2025 Performance Review',
    period: 'Q4 2025',
    start_date: '2025-10-01',
    end_date: '2025-12-31',
    status: 'closed',
    total_employees: 48,
    completed_appraisals: 48,
    pending_employee_review: 0,
    pending_manager_review: 0,
    pending_hr_calibration: 0,
    created_at: '2025-09-15T00:00:00Z',
  },
];

// Mock Appraisals
export const mockAppraisals: Appraisal[] = [
  {
    id: 'appraisal-1',
    cycle_id: 'cycle-1',
    employee_id: 'user-1',
    employee_name: 'John Employee',
    manager_id: 'user-2',
    manager_name: 'Sarah Manager',
    status: 'manager_review',
    employee_self_review: 'This quarter I focused on completing the authentication module and improving code quality. I achieved 4 out of 5 goals and maintained high compliance.',
    employee_achievements: [
      'Completed authentication module ahead of schedule',
      'Improved code coverage to 85%',
      'Mentored 2 junior developers',
      'Resolved 15 critical bugs',
    ],
    employee_challenges: [
      'API documentation delays affected integration testing',
      'Balancing feature work with code reviews',
    ],
    employee_goals_next_period: [
      'Complete payment gateway integration',
      'Lead architecture design for new feature',
      'Achieve 90% code coverage',
    ],
    manager_review: 'John has shown exceptional technical skills and leadership this quarter. His work on the authentication module was outstanding.',
    manager_rating: 4,
    manager_strengths: [
      'Strong technical execution',
      'Proactive communication',
      'Team collaboration',
    ],
    manager_improvements: [
      'Could improve time estimation',
      'More focus on documentation',
    ],
    evidence_pack: {
      msr_ids: ['msr-1'],
      goal_ids: ['goal-1', 'goal-2'],
      blocker_ids: ['blocker-1'],
      efficiency_scores: [87, 84, 81],
    },
    created_at: '2026-02-01T00:00:00Z',
    updated_at: '2026-02-20T00:00:00Z',
  },
  {
    id: 'appraisal-2',
    cycle_id: 'cycle-1',
    employee_id: 'user-8',
    employee_name: 'Jane Developer',
    manager_id: 'user-2',
    manager_name: 'Sarah Manager',
    status: 'employee_review',
    evidence_pack: {
      msr_ids: [],
      goal_ids: ['goal-3'],
      blocker_ids: [],
      efficiency_scores: [82, 80, 78],
    },
    created_at: '2026-02-01T00:00:00Z',
    updated_at: '2026-02-15T00:00:00Z',
  },
];

// Mock Calibration Cases
export const mockCalibrationCases: CalibrationCase[] = [
  {
    id: 'cal-1',
    appraisal_id: 'appraisal-1',
    employee_name: 'John Employee',
    manager_name: 'Sarah Manager',
    manager_rating: 4,
    suggested_rating: 5,
    variance: 1,
    reason: 'outlier',
    status: 'pending',
    notes: 'Performance metrics suggest higher rating. Efficiency score consistently above 85.',
  },
  {
    id: 'cal-2',
    appraisal_id: 'appraisal-3',
    employee_name: 'Bob Engineer',
    manager_name: 'Sarah Manager',
    manager_rating: 3,
    suggested_rating: 2,
    variance: -1,
    reason: 'volatility',
    status: 'pending',
    notes: 'Significant performance drop in Q1. Multiple SLA breaches.',
  },
];

// Helper functions
export const getReviewsByManager = (managerId: string): WeeklyReview[] => {
  return mockWeeklyReviews.filter(r => r.manager_id === managerId);
};

export const getPendingReviews = (managerId: string): WeeklyReview[] => {
  return mockWeeklyReviews.filter(r => r.manager_id === managerId && r.status === 'pending');
};

export const getReviewsBySLA = (managerId: string, slaStatus: 'on_time' | 'warning' | 'breached'): WeeklyReview[] => {
  return mockWeeklyReviews.filter(r => r.manager_id === managerId && r.sla_status === slaStatus);
};

export const getActiveCycles = (): AppraisalCycle[] => {
  return mockAppraisalCycles.filter(c => c.status === 'active');
};

export const getAppraisalsByCycle = (cycleId: string): Appraisal[] => {
  return mockAppraisals.filter(a => a.cycle_id === cycleId);
};

export const getAppraisalsByStatus = (status: AppraisalStatus): Appraisal[] => {
  return mockAppraisals.filter(a => a.status === status);
};

export const getPendingCalibration = (): CalibrationCase[] => {
  return mockCalibrationCases.filter(c => c.status === 'pending');
};
