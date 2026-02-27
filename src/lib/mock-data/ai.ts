// AI Features Mock Data

export interface AIInsight {
  id: string;
  type: 'pattern' | 'risk' | 'suggestion' | 'trend' | 'duplicate';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  affectedItems: string[];
  recommendation: string;
  confidence: number; // 0-100
  createdAt: string;
  status: 'new' | 'acknowledged' | 'resolved' | 'dismissed';
}

export interface AIReportSummary {
  id: string;
  reportId: string;
  reportType: 'DSR' | 'WSR' | 'MSR';
  summary: string;
  keyHighlights: string[];
  suggestedImprovements: string[];
  qualityScore: number; // 0-100
  generatedAt: string;
}

export interface AIBlockerPattern {
  id: string;
  pattern: string;
  occurrences: number;
  affectedUsers: string[];
  firstSeen: string;
  lastSeen: string;
  suggestedSolution: string;
  severity: 'low' | 'medium' | 'high';
}

export interface AIProductivityTrend {
  userId: string;
  userName: string;
  trend: 'improving' | 'stable' | 'declining';
  score: number;
  change: number; // percentage
  insights: string[];
  period: string;
}

export interface AISettings {
  enabled: boolean;
  features: {
    autoSummaries: boolean;
    blockerPatterns: boolean;
    duplicateDetection: boolean;
    writingAssistance: boolean;
    productivityInsights: boolean;
    riskScoring: boolean;
    sameAsDayDetection: boolean;
  };
  thresholds: {
    duplicateConfidence: number;
    lowQualityScore: number;
    riskThreshold: number;
  };
}

// Mock AI Insights
export const mockAIInsights: AIInsight[] = [
  {
    id: 'ai-1',
    type: 'pattern',
    title: 'Recurring Blocker Pattern Detected',
    description: 'API timeout issues have been reported 8 times in the last 2 weeks across 3 team members',
    severity: 'high',
    category: 'Blockers',
    affectedItems: ['blocker-1', 'blocker-5', 'blocker-8'],
    recommendation: 'Consider infrastructure upgrade or implementing retry logic',
    confidence: 92,
    createdAt: '2026-02-24T09:00:00Z',
    status: 'new',
  },
  {
    id: 'ai-2',
    type: 'duplicate',
    title: 'Duplicate Goal Detected',
    description: 'Two similar goals found: "Improve API performance" and "Optimize API response time"',
    severity: 'medium',
    category: 'Goals',
    affectedItems: ['goal-12', 'goal-18'],
    recommendation: 'Consider merging these goals to avoid duplication of effort',
    confidence: 87,
    createdAt: '2026-02-23T14:30:00Z',
    status: 'acknowledged',
  },
  {
    id: 'ai-3',
    type: 'risk',
    title: 'Goal at Risk',
    description: 'Goal "Launch mobile app" has 0% progress with only 2 weeks remaining',
    severity: 'critical',
    category: 'Goals',
    affectedItems: ['goal-5'],
    recommendation: 'Immediate action required: reassess timeline or allocate more resources',
    confidence: 95,
    createdAt: '2026-02-24T10:15:00Z',
    status: 'new',
  },
  {
    id: 'ai-4',
    type: 'suggestion',
    title: 'Low Report Quality Detected',
    description: 'Recent DSRs contain minimal detail (avg 15 words per entry)',
    severity: 'medium',
    category: 'Reports',
    affectedItems: ['dsr-45', 'dsr-46', 'dsr-47'],
    recommendation: 'Provide more context and specific outcomes in daily reports',
    confidence: 78,
    createdAt: '2026-02-23T16:00:00Z',
    status: 'dismissed',
  },
  {
    id: 'ai-5',
    type: 'trend',
    title: 'Productivity Decline Detected',
    description: 'Team productivity score decreased by 15% over the last month',
    severity: 'high',
    category: 'Analytics',
    affectedItems: ['team-eng'],
    recommendation: 'Review team workload and identify potential burnout risks',
    confidence: 89,
    createdAt: '2026-02-22T11:00:00Z',
    status: 'acknowledged',
  },
  {
    id: 'ai-6',
    type: 'pattern',
    title: 'Same as Yesterday Pattern',
    description: 'User has submitted identical DSR content for 3 consecutive days',
    severity: 'low',
    category: 'Reports',
    affectedItems: ['dsr-48', 'dsr-49', 'dsr-50'],
    recommendation: 'Encourage more detailed daily updates to track progress',
    confidence: 100,
    createdAt: '2026-02-24T08:00:00Z',
    status: 'new',
  },
];

// Mock AI Report Summaries
export const mockAIReportSummaries: AIReportSummary[] = [
  {
    id: 'sum-1',
    reportId: 'wsr-1',
    reportType: 'WSR',
    summary: 'Strong week with 3 major features completed. API performance improved by 40%. One blocker resolved, team collaboration excellent.',
    keyHighlights: [
      'Completed user authentication module',
      'Improved API response time by 40%',
      'Resolved database connection blocker',
    ],
    suggestedImprovements: [
      'Add more specific metrics to achievements',
      'Include evidence links for completed features',
    ],
    qualityScore: 85,
    generatedAt: '2026-02-24T09:00:00Z',
  },
  {
    id: 'sum-2',
    reportId: 'msr-1',
    reportType: 'MSR',
    summary: 'Productive month with 12 goals achieved. Delivered 3 major features on schedule. Team efficiency improved by 18%. Two critical blockers resolved.',
    keyHighlights: [
      'Launched payment integration',
      'Completed mobile app MVP',
      'Improved team efficiency score to 87',
    ],
    suggestedImprovements: [
      'Provide more detail on blocker resolution strategies',
      'Include lessons learned section',
    ],
    qualityScore: 92,
    generatedAt: '2026-02-01T10:00:00Z',
  },
];

// Mock Blocker Patterns
export const mockBlockerPatterns: AIBlockerPattern[] = [
  {
    id: 'pattern-1',
    pattern: 'API Timeout Issues',
    occurrences: 8,
    affectedUsers: ['John Doe', 'Jane Smith', 'Mike Johnson'],
    firstSeen: '2026-02-10T00:00:00Z',
    lastSeen: '2026-02-24T00:00:00Z',
    suggestedSolution: 'Implement connection pooling and retry logic. Consider upgrading infrastructure.',
    severity: 'high',
  },
  {
    id: 'pattern-2',
    pattern: 'Dependency Delays',
    occurrences: 5,
    affectedUsers: ['Sarah Wilson', 'Tom Brown'],
    firstSeen: '2026-02-15T00:00:00Z',
    lastSeen: '2026-02-23T00:00:00Z',
    suggestedSolution: 'Establish clearer SLAs with dependent teams. Set up weekly sync meetings.',
    severity: 'medium',
  },
  {
    id: 'pattern-3',
    pattern: 'Environment Configuration',
    occurrences: 12,
    affectedUsers: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'],
    firstSeen: '2026-02-05T00:00:00Z',
    lastSeen: '2026-02-22T00:00:00Z',
    suggestedSolution: 'Create standardized environment setup scripts. Document configuration process.',
    severity: 'medium',
  },
];

// Mock Productivity Trends
export const mockProductivityTrends: AIProductivityTrend[] = [
  {
    userId: 'user-1',
    userName: 'John Doe',
    trend: 'improving',
    score: 87,
    change: 12,
    insights: [
      'Consistent report submissions',
      'Goal completion rate increased',
      'Blocker resolution time improved',
    ],
    period: 'Last 30 days',
  },
  {
    userId: 'user-2',
    userName: 'Jane Smith',
    trend: 'stable',
    score: 92,
    change: 2,
    insights: [
      'Maintaining high performance',
      'Excellent report quality',
      'Strong goal achievement rate',
    ],
    period: 'Last 30 days',
  },
  {
    userId: 'user-3',
    userName: 'Mike Johnson',
    trend: 'declining',
    score: 68,
    change: -15,
    insights: [
      'Missed 3 report submissions',
      'Increased blocker count',
      'Goal progress slowing',
    ],
    period: 'Last 30 days',
  },
];

// Mock AI Settings
export const mockAISettings: AISettings = {
  enabled: true,
  features: {
    autoSummaries: true,
    blockerPatterns: true,
    duplicateDetection: true,
    writingAssistance: true,
    productivityInsights: true,
    riskScoring: true,
    sameAsDayDetection: true,
  },
  thresholds: {
    duplicateConfidence: 80,
    lowQualityScore: 60,
    riskThreshold: 70,
  },
};
