// Mock Analytics Data

export interface EfficiencyScore {
  user_id: string;
  period: string; // YYYY-MM format
  total_score: number; // 0-100
  discipline_score: number; // 0-100 (20% weight)
  goals_score: number; // 0-100 (25% weight)
  delivery_score: number; // 0-100 (25% weight)
  blockers_score: number; // 0-100 (15% weight)
  communication_score: number; // 0-100 (15% weight)
  breakdown: {
    dsr_on_time_percent: number;
    wsr_on_time_percent: number;
    msr_on_time_percent: number;
    goal_achievement_rate: number;
    goal_on_track_percent: number;
    blocker_early_raising_percent: number;
    blocker_resolution_rate: number;
    review_response_time_avg: number; // hours
    evidence_quality_score: number;
  };
  trend: 'up' | 'down' | 'stable';
  previous_score?: number;
}

export interface TeamAnalytics {
  team_id: string;
  period: string;
  compliance_rate: number;
  review_sla_compliance: number;
  goal_reliability_score: number;
  blocker_ttr_avg: number; // Time to resolve in days
  delivery_signals: {
    on_time_delivery: number;
    quality_score: number;
    velocity_trend: 'up' | 'down' | 'stable';
  };
  members: {
    user_id: string;
    name: string;
    efficiency_score: number;
    compliance_rate: number;
    at_risk: boolean;
  }[];
}

export interface HRAnalytics {
  period: string;
  org_compliance: number;
  manager_accountability: {
    manager_id: string;
    name: string;
    review_sla_percent: number;
    actionable_comments_percent: number;
    team_compliance: number;
    support_gap_score: 'low' | 'medium' | 'high';
  }[];
  appraisal_readiness: {
    department: string;
    coverage_percent: number;
    evidence_completeness: number;
    pending_manager_reviews: number;
    pending_employee_reflections: number;
  }[];
  calibration_data: {
    score_distribution: { range: string; count: number }[];
    outliers: number;
    volatility_alerts: number;
  };
  fairness_metrics: {
    cohort_size_compliant: boolean; // min 5
    score_variance: number;
    overcommitment_index: 'low' | 'medium' | 'high';
  };
}

// Mock data for current user (John Employee)
export const mockEmployeeEfficiency: EfficiencyScore[] = [
  {
    user_id: 'user-1',
    period: '2026-02',
    total_score: 87,
    discipline_score: 92,
    goals_score: 85,
    delivery_score: 88,
    blockers_score: 82,
    communication_score: 90,
    breakdown: {
      dsr_on_time_percent: 95,
      wsr_on_time_percent: 100,
      msr_on_time_percent: 100,
      goal_achievement_rate: 80,
      goal_on_track_percent: 75,
      blocker_early_raising_percent: 85,
      blocker_resolution_rate: 80,
      review_response_time_avg: 4.5,
      evidence_quality_score: 88,
    },
    trend: 'up',
    previous_score: 84,
  },
  {
    user_id: 'user-1',
    period: '2026-01',
    total_score: 84,
    discipline_score: 88,
    goals_score: 82,
    delivery_score: 85,
    blockers_score: 80,
    communication_score: 88,
    breakdown: {
      dsr_on_time_percent: 92,
      wsr_on_time_percent: 100,
      msr_on_time_percent: 100,
      goal_achievement_rate: 75,
      goal_on_track_percent: 70,
      blocker_early_raising_percent: 80,
      blocker_resolution_rate: 75,
      review_response_time_avg: 5.2,
      evidence_quality_score: 85,
    },
    trend: 'up',
    previous_score: 81,
  },
  {
    user_id: 'user-1',
    period: '2025-12',
    total_score: 81,
    discipline_score: 85,
    goals_score: 78,
    delivery_score: 82,
    blockers_score: 78,
    communication_score: 85,
    breakdown: {
      dsr_on_time_percent: 88,
      wsr_on_time_percent: 95,
      msr_on_time_percent: 100,
      goal_achievement_rate: 70,
      goal_on_track_percent: 65,
      blocker_early_raising_percent: 75,
      blocker_resolution_rate: 70,
      review_response_time_avg: 6.0,
      evidence_quality_score: 82,
    },
    trend: 'stable',
    previous_score: 80,
  },
];

// Mock team analytics
export const mockTeamAnalytics: TeamAnalytics = {
  team_id: 'team-1',
  period: '2026-02',
  compliance_rate: 88,
  review_sla_compliance: 92,
  goal_reliability_score: 85,
  blocker_ttr_avg: 4.5,
  delivery_signals: {
    on_time_delivery: 90,
    quality_score: 88,
    velocity_trend: 'up',
  },
  members: [
    {
      user_id: 'user-1',
      name: 'John Employee',
      efficiency_score: 87,
      compliance_rate: 95,
      at_risk: false,
    },
    {
      user_id: 'user-8',
      name: 'Jane Developer',
      efficiency_score: 82,
      compliance_rate: 88,
      at_risk: false,
    },
    {
      user_id: 'user-9',
      name: 'Bob Engineer',
      efficiency_score: 68,
      compliance_rate: 72,
      at_risk: true,
    },
    {
      user_id: 'user-10',
      name: 'Alice Designer',
      efficiency_score: 91,
      compliance_rate: 98,
      at_risk: false,
    },
  ],
};

// Mock HR analytics
export const mockHRAnalytics: HRAnalytics = {
  period: '2026-02',
  org_compliance: 92,
  manager_accountability: [
    {
      manager_id: 'user-2',
      name: 'Sarah Manager',
      review_sla_percent: 95,
      actionable_comments_percent: 88,
      team_compliance: 92,
      support_gap_score: 'low',
    },
    {
      manager_id: 'user-3',
      name: 'Mike Dept Admin',
      review_sla_percent: 78,
      actionable_comments_percent: 72,
      team_compliance: 85,
      support_gap_score: 'medium',
    },
    {
      manager_id: 'user-4',
      name: 'Lisa Org Admin',
      review_sla_percent: 92,
      actionable_comments_percent: 90,
      team_compliance: 94,
      support_gap_score: 'low',
    },
  ],
  appraisal_readiness: [
    {
      department: 'Engineering',
      coverage_percent: 92,
      evidence_completeness: 88,
      pending_manager_reviews: 3,
      pending_employee_reflections: 5,
    },
    {
      department: 'Product',
      coverage_percent: 95,
      evidence_completeness: 91,
      pending_manager_reviews: 1,
      pending_employee_reflections: 2,
    },
    {
      department: 'Sales',
      coverage_percent: 88,
      evidence_completeness: 85,
      pending_manager_reviews: 5,
      pending_employee_reflections: 8,
    },
  ],
  calibration_data: {
    score_distribution: [
      { range: '0-20', count: 2 },
      { range: '21-40', count: 8 },
      { range: '41-60', count: 45 },
      { range: '61-80', count: 120 },
      { range: '81-100', count: 73 },
    ],
    outliers: 5,
    volatility_alerts: 3,
  },
  fairness_metrics: {
    cohort_size_compliant: true,
    score_variance: 12.5,
    overcommitment_index: 'medium',
  },
};

// Helper functions
export const getEmployeeEfficiency = (userId: string, period?: string): EfficiencyScore | undefined => {
  if (period) {
    return mockEmployeeEfficiency.find(e => e.user_id === userId && e.period === period);
  }
  return mockEmployeeEfficiency.find(e => e.user_id === userId);
};

export const getEmployeeEfficiencyHistory = (userId: string): EfficiencyScore[] => {
  return mockEmployeeEfficiency.filter(e => e.user_id === userId).sort((a, b) => 
    b.period.localeCompare(a.period)
  );
};

export const calculateWeightedScore = (scores: {
  discipline: number;
  goals: number;
  delivery: number;
  blockers: number;
  communication: number;
}): number => {
  return Math.round(
    scores.discipline * 0.20 +
    scores.goals * 0.25 +
    scores.delivery * 0.25 +
    scores.blockers * 0.15 +
    scores.communication * 0.15
  );
};
