// Mock Policies Data

export type PolicyDomain = 
  | 'identity_access'
  | 'reporting'
  | 'quality_validation'
  | 'automation'
  | 'scoring'
  | 'reviews_appraisals'
  | 'data_governance'
  | 'safety_culture';

export type PolicyStatus = 'active' | 'draft' | 'disabled' | 'archived';

export type TriggerType = 
  | 'report_submitted'
  | 'report_late'
  | 'goal_created'
  | 'goal_at_risk'
  | 'blocker_created'
  | 'blocker_unresolved'
  | 'user_login'
  | 'user_inactive'
  | 'score_below_threshold'
  | 'compliance_violation'
  | 'review_overdue'
  | 'time_based';

export type ActionType =
  | 'send_notification'
  | 'send_email'
  | 'escalate_to_manager'
  | 'mark_as_late'
  | 'lock_report'
  | 'assign_action'
  | 'update_score'
  | 'flag_for_review'
  | 'disable_access'
  | 'log_event'
  | 'run_automation';

export interface PolicyCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'not_contains' | 'is_empty' | 'is_not_empty';
  value: any;
  logic?: 'AND' | 'OR';
}

export interface PolicyTrigger {
  type: TriggerType;
  conditions: PolicyCondition[];
  schedule?: string; // For time-based triggers
}

export interface PolicyAction {
  type: ActionType;
  config: {
    recipient?: string;
    message?: string;
    template?: string;
    delay_minutes?: number;
    priority?: 'low' | 'medium' | 'high';
    [key: string]: any;
  };
}

export interface Policy {
  id: string;
  tenant_id: string;
  name: string;
  description: string;
  domain: PolicyDomain;
  status: PolicyStatus;
  version: number;
  trigger: PolicyTrigger;
  actions: PolicyAction[];
  scope: {
    departments?: string[];
    teams?: string[];
    roles?: string[];
    users?: string[];
  };
  priority: number; // Execution order
  enabled: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
  last_executed_at?: string;
  execution_count?: number;
}

export const mockPolicies: Policy[] = [
  {
    id: 'policy-1',
    tenant_id: 'tenant-1',
    name: 'Late DSR Auto-Mark',
    description: 'Automatically mark DSRs as late if not submitted by 6 PM',
    domain: 'reporting',
    status: 'active',
    version: 1,
    trigger: {
      type: 'time_based',
      conditions: [
        {
          field: 'report_type',
          operator: 'equals',
          value: 'DSR',
        },
        {
          field: 'status',
          operator: 'equals',
          value: 'draft',
          logic: 'AND',
        },
      ],
      schedule: '0 18 * * *', // Daily at 6 PM
    },
    actions: [
      {
        type: 'mark_as_late',
        config: {
          priority: 'medium',
        },
      },
      {
        type: 'send_notification',
        config: {
          recipient: 'user',
          message: 'Your DSR is now marked as late. Please submit as soon as possible.',
          priority: 'high',
        },
      },
    ],
    scope: {
      departments: ['Engineering', 'Product', 'Design'],
    },
    priority: 1,
    enabled: true,
    created_by: 'admin-1',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    last_executed_at: '2026-02-23T18:00:00Z',
    execution_count: 45,
  },
  {
    id: 'policy-2',
    tenant_id: 'tenant-1',
    name: 'Low Efficiency Score Alert',
    description: 'Alert manager when employee efficiency score drops below 60',
    domain: 'scoring',
    status: 'active',
    version: 2,
    trigger: {
      type: 'score_below_threshold',
      conditions: [
        {
          field: 'efficiency_score',
          operator: 'less_than',
          value: 60,
        },
      ],
    },
    actions: [
      {
        type: 'escalate_to_manager',
        config: {
          message: 'Employee {{employee_name}} efficiency score has dropped to {{score}}. Please review and provide support.',
          priority: 'high',
        },
      },
      {
        type: 'flag_for_review',
        config: {
          priority: 'high',
        },
      },
    ],
    scope: {},
    priority: 2,
    enabled: true,
    created_by: 'admin-1',
    created_at: '2026-01-10T00:00:00Z',
    updated_at: '2026-02-01T00:00:00Z',
    last_executed_at: '2026-02-20T10:30:00Z',
    execution_count: 12,
  },
  {
    id: 'policy-3',
    tenant_id: 'tenant-1',
    name: 'Blocker Escalation',
    description: 'Escalate blockers that remain unresolved for more than 3 days',
    domain: 'quality_validation',
    status: 'active',
    version: 1,
    trigger: {
      type: 'blocker_unresolved',
      conditions: [
        {
          field: 'days_open',
          operator: 'greater_than',
          value: 3,
        },
        {
          field: 'severity',
          operator: 'equals',
          value: 'S1',
          logic: 'OR',
        },
      ],
    },
    actions: [
      {
        type: 'escalate_to_manager',
        config: {
          message: 'Blocker "{{blocker_title}}" has been open for {{days_open}} days. Please review.',
          priority: 'high',
        },
      },
      {
        type: 'assign_action',
        config: {
          recipient: 'manager',
          priority: 'high',
        },
      },
    ],
    scope: {
      departments: ['Engineering'],
    },
    priority: 1,
    enabled: true,
    created_by: 'admin-1',
    created_at: '2026-01-15T00:00:00Z',
    updated_at: '2026-01-15T00:00:00Z',
    last_executed_at: '2026-02-22T09:00:00Z',
    execution_count: 8,
  },
  {
    id: 'policy-4',
    tenant_id: 'tenant-1',
    name: 'Review SLA Reminder',
    description: 'Remind managers to complete reviews within 48 hours',
    domain: 'reviews_appraisals',
    status: 'active',
    version: 1,
    trigger: {
      type: 'review_overdue',
      conditions: [
        {
          field: 'hours_pending',
          operator: 'greater_than',
          value: 36,
        },
      ],
    },
    actions: [
      {
        type: 'send_notification',
        config: {
          recipient: 'manager',
          message: 'You have pending reviews that are approaching the 48-hour SLA.',
          priority: 'medium',
        },
      },
    ],
    scope: {
      roles: ['MANAGER', 'DEPT_ADMIN'],
    },
    priority: 3,
    enabled: true,
    created_by: 'admin-1',
    created_at: '2026-01-20T00:00:00Z',
    updated_at: '2026-01-20T00:00:00Z',
    last_executed_at: '2026-02-23T14:00:00Z',
    execution_count: 23,
  },
  {
    id: 'policy-5',
    tenant_id: 'tenant-1',
    name: 'Inactive User Notification',
    description: 'Notify users who haven\'t logged in for 7 days',
    domain: 'identity_access',
    status: 'draft',
    version: 1,
    trigger: {
      type: 'user_inactive',
      conditions: [
        {
          field: 'days_since_login',
          operator: 'greater_than',
          value: 7,
        },
      ],
    },
    actions: [
      {
        type: 'send_email',
        config: {
          recipient: 'user',
          template: 'inactive_user_reminder',
          priority: 'low',
        },
      },
    ],
    scope: {},
    priority: 5,
    enabled: false,
    created_by: 'admin-1',
    created_at: '2026-02-20T00:00:00Z',
    updated_at: '2026-02-23T00:00:00Z',
  },
  {
    id: 'policy-6',
    tenant_id: 'tenant-1',
    name: 'Goal At-Risk Alert',
    description: 'Alert when goal progress falls behind expected progress by 20%',
    domain: 'automation',
    status: 'disabled',
    version: 1,
    trigger: {
      type: 'goal_at_risk',
      conditions: [
        {
          field: 'progress_gap',
          operator: 'greater_than',
          value: 20,
        },
      ],
    },
    actions: [
      {
        type: 'send_notification',
        config: {
          recipient: 'user',
          message: 'Your goal "{{goal_title}}" is at risk. Current progress: {{actual_progress}}%, Expected: {{expected_progress}}%',
          priority: 'medium',
        },
      },
    ],
    scope: {},
    priority: 4,
    enabled: false,
    created_by: 'admin-1',
    created_at: '2026-02-15T00:00:00Z',
    updated_at: '2026-02-18T00:00:00Z',
  },
];

// Helper functions
export const getPoliciesByDomain = (domain: PolicyDomain): Policy[] => {
  return mockPolicies.filter(p => p.domain === domain);
};

export const getActivePolicies = (): Policy[] => {
  return mockPolicies.filter(p => p.status === 'active' && p.enabled);
};

export const getPolicyById = (id: string): Policy | undefined => {
  return mockPolicies.find(p => p.id === id);
};

export const getPoliciesByStatus = (status: PolicyStatus): Policy[] => {
  return mockPolicies.filter(p => p.status === status);
};

export const policyDomainLabels: Record<PolicyDomain, string> = {
  identity_access: 'Identity & Access',
  reporting: 'Reporting',
  quality_validation: 'Quality & Validation',
  automation: 'Automation',
  scoring: 'Scoring',
  reviews_appraisals: 'Reviews & Appraisals',
  data_governance: 'Data Governance',
  safety_culture: 'Safety & Culture',
};

export const triggerTypeLabels: Record<TriggerType, string> = {
  report_submitted: 'Report Submitted',
  report_late: 'Report Late',
  goal_created: 'Goal Created',
  goal_at_risk: 'Goal At Risk',
  blocker_created: 'Blocker Created',
  blocker_unresolved: 'Blocker Unresolved',
  user_login: 'User Login',
  user_inactive: 'User Inactive',
  score_below_threshold: 'Score Below Threshold',
  compliance_violation: 'Compliance Violation',
  review_overdue: 'Review Overdue',
  time_based: 'Time-Based',
};

export const actionTypeLabels: Record<ActionType, string> = {
  send_notification: 'Send Notification',
  send_email: 'Send Email',
  escalate_to_manager: 'Escalate to Manager',
  mark_as_late: 'Mark as Late',
  lock_report: 'Lock Report',
  assign_action: 'Assign Action',
  update_score: 'Update Score',
  flag_for_review: 'Flag for Review',
  disable_access: 'Disable Access',
  log_event: 'Log Event',
  run_automation: 'Run Automation',
};
