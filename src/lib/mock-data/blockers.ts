// Mock Blockers Data - Based on Documentation Field Names

export type BlockerSeverity = 'S0' | 'S1' | 'S2' | 'S3';
export type BlockerStatus = 'open' | 'in_progress' | 'resolved' | 'escalated';

export interface EscalationEvent {
  escalated_at: string;
  escalated_by: string;
  escalated_to: string;
  reason: string;
}

export interface Blocker {
  id: string;
  tenant_id: string;
  title: string;
  description: string;
  severity: BlockerSeverity;
  owner?: string;
  eta?: string;
  status: BlockerStatus;
  impact: string;
  escalation_history: EscalationEvent[];
  resolution_notes?: string;
  related_to_type?: 'report' | 'goal';
  related_to_id?: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  created_by: string;
}

export const mockBlockers: Blocker[] = [
  {
    id: 'blocker-1',
    tenant_id: 'tenant-1',
    title: 'API Documentation Incomplete',
    description: 'The payment gateway API documentation is missing critical endpoints and authentication details.',
    severity: 'S2',
    owner: 'user-2',
    eta: '2026-02-25',
    status: 'in_progress',
    impact: 'Cannot proceed with integration testing. Blocking payment gateway implementation.',
    escalation_history: [],
    related_to_type: 'goal',
    related_to_id: 'goal-1',
    created_at: '2026-02-20T10:00:00Z',
    updated_at: '2026-02-23T09:00:00Z',
    created_by: 'user-1',
  },
  {
    id: 'blocker-2',
    tenant_id: 'tenant-1',
    title: 'Infrastructure Team Capacity',
    description: 'Infrastructure team is fully allocated to cloud migration project.',
    severity: 'S1',
    owner: 'user-3',
    eta: '2026-03-15',
    status: 'escalated',
    impact: 'Cannot start microservices migration without infrastructure support.',
    escalation_history: [
      {
        escalated_at: '2026-02-18T14:00:00Z',
        escalated_by: 'user-1',
        escalated_to: 'user-3',
        reason: 'Critical dependency for Q1 roadmap',
      },
    ],
    related_to_type: 'goal',
    related_to_id: 'goal-5',
    created_at: '2026-02-15T00:00:00Z',
    updated_at: '2026-02-18T14:00:00Z',
    created_by: 'user-1',
  },
  {
    id: 'blocker-3',
    tenant_id: 'tenant-1',
    title: 'Third-Party API Rate Limiting',
    description: 'External analytics API has strict rate limits that are blocking data sync.',
    severity: 'S3',
    owner: 'user-1',
    eta: '2026-02-24',
    status: 'open',
    impact: 'Real-time analytics dashboard updates are delayed by 5-10 minutes.',
    escalation_history: [],
    related_to_type: 'goal',
    related_to_id: 'goal-2',
    created_at: '2026-02-22T11:00:00Z',
    updated_at: '2026-02-22T11:00:00Z',
    created_by: 'user-1',
  },
  {
    id: 'blocker-4',
    tenant_id: 'tenant-1',
    title: 'Database Performance Issues',
    description: 'Slow query performance on user analytics table affecting API response times.',
    severity: 'S2',
    owner: 'user-1',
    status: 'resolved',
    impact: 'API response times were 2-3x slower than target.',
    escalation_history: [],
    resolution_notes: 'Added database indexes and implemented query caching. Response times now within target.',
    related_to_type: 'goal',
    related_to_id: 'goal-3',
    created_at: '2026-02-10T00:00:00Z',
    updated_at: '2026-02-21T00:00:00Z',
    resolved_at: '2026-02-21T16:00:00Z',
    created_by: 'user-1',
  },
];

// Severity descriptions
export const severityDescriptions = {
  S0: 'Critical - System down or major functionality broken',
  S1: 'High - Significant impact on delivery or quality',
  S2: 'Medium - Moderate impact, workaround available',
  S3: 'Low - Minor impact, can be worked around',
};

// Helper functions
export const getBlockersByUser = (userId: string): Blocker[] => {
  return mockBlockers.filter(b => b.created_by === userId || b.owner === userId);
};

export const getBlockersByStatus = (status: BlockerStatus): Blocker[] => {
  return mockBlockers.filter(b => b.status === status);
};

export const getBlockersBySeverity = (severity: BlockerSeverity): Blocker[] => {
  return mockBlockers.filter(b => b.severity === severity);
};

export const getOpenBlockers = (userId: string): Blocker[] => {
  return mockBlockers.filter(b => 
    (b.created_by === userId || b.owner === userId) && 
    (b.status === 'open' || b.status === 'in_progress' || b.status === 'escalated')
  );
};

export const getBlockersByGoal = (goalId: string): Blocker[] => {
  return mockBlockers.filter(b => b.related_to_type === 'goal' && b.related_to_id === goalId);
};

export const getBlockerTimeToResolve = (blocker: Blocker): number | null => {
  if (!blocker.resolved_at) return null;
  const created = new Date(blocker.created_at).getTime();
  const resolved = new Date(blocker.resolved_at).getTime();
  return Math.floor((resolved - created) / (1000 * 60 * 60 * 24)); // Days
};
