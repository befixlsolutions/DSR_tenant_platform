// Mock Automations Data

export type AutomationType = 
  | 'reporting_reminder'
  | 'late_marking'
  | 'escalation'
  | 'review_assignment'
  | 'sla_reminder'
  | 'goal_auto_close'
  | 'blocker_escalation'
  | 'scoring_compute'
  | 'ticket_routing';

export type AutomationStatus = 'active' | 'disabled' | 'paused';

export type TriggerSchedule = 'daily' | 'weekly' | 'monthly' | 'hourly' | 'custom';

export interface AutomationTrigger {
  schedule_type: TriggerSchedule;
  cron_expression?: string; // For custom schedules
  time?: string; // e.g., "09:00"
  day_of_week?: string; // For weekly: "Monday", "Tuesday", etc.
  day_of_month?: number; // For monthly: 1-31
}

export interface AutomationAction {
  type: string;
  config: Record<string, any>;
}

export interface RateLimiting {
  enabled: boolean;
  max_executions_per_hour?: number;
  max_executions_per_day?: number;
  cooldown_minutes?: number;
}

export interface QuietHours {
  enabled: boolean;
  start_time?: string; // e.g., "22:00"
  end_time?: string; // e.g., "08:00"
  timezone?: string;
}

export interface ExecutionLog {
  id: string;
  automation_id: string;
  executed_at: string;
  status: 'success' | 'failed' | 'skipped';
  duration_ms: number;
  affected_count: number;
  error_message?: string;
}

export interface Automation {
  id: string;
  tenant_id: string;
  name: string;
  description: string;
  type: AutomationType;
  status: AutomationStatus;
  trigger: AutomationTrigger;
  actions: AutomationAction[];
  rate_limiting: RateLimiting;
  quiet_hours: QuietHours;
  enabled: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
  last_executed_at?: string;
  next_execution_at?: string;
  execution_count: number;
  success_count: number;
  failure_count: number;
}

export const mockAutomations: Automation[] = [
  {
    id: 'auto-1',
    tenant_id: 'tenant-1',
    name: 'Daily DSR Reminder',
    description: 'Send reminder to submit DSR at 4 PM daily',
    type: 'reporting_reminder',
    status: 'active',
    trigger: {
      schedule_type: 'daily',
      time: '16:00',
    },
    actions: [
      {
        type: 'send_notification',
        config: {
          recipient: 'users_without_dsr',
          message: 'Reminder: Please submit your DSR before end of day',
          priority: 'medium',
        },
      },
    ],
    rate_limiting: {
      enabled: true,
      max_executions_per_day: 1,
    },
    quiet_hours: {
      enabled: true,
      start_time: '22:00',
      end_time: '08:00',
      timezone: 'PST',
    },
    enabled: true,
    created_by: 'admin-1',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    last_executed_at: '2026-02-23T16:00:00Z',
    next_execution_at: '2026-02-24T16:00:00Z',
    execution_count: 54,
    success_count: 52,
    failure_count: 2,
  },
  {
    id: 'auto-2',
    tenant_id: 'tenant-1',
    name: 'Weekly Review Assignment',
    description: 'Assign weekly reviews to managers every Monday',
    type: 'review_assignment',
    status: 'active',
    trigger: {
      schedule_type: 'weekly',
      day_of_week: 'Monday',
      time: '09:00',
    },
    actions: [
      {
        type: 'assign_reviews',
        config: {
          target: 'managers',
          review_type: 'weekly',
        },
      },
      {
        type: 'send_notification',
        config: {
          recipient: 'managers',
          message: 'You have new weekly reviews assigned',
          priority: 'high',
        },
      },
    ],
    rate_limiting: {
      enabled: false,
    },
    quiet_hours: {
      enabled: false,
    },
    enabled: true,
    created_by: 'admin-1',
    created_at: '2026-01-05T00:00:00Z',
    updated_at: '2026-01-05T00:00:00Z',
    last_executed_at: '2026-02-17T09:00:00Z',
    next_execution_at: '2026-02-24T09:00:00Z',
    execution_count: 8,
    success_count: 8,
    failure_count: 0,
  },
  {
    id: 'auto-3',
    tenant_id: 'tenant-1',
    name: 'Monthly Scoring Compute',
    description: 'Calculate efficiency scores on the 1st of each month',
    type: 'scoring_compute',
    status: 'active',
    trigger: {
      schedule_type: 'monthly',
      day_of_month: 1,
      time: '00:00',
    },
    actions: [
      {
        type: 'compute_scores',
        config: {
          score_type: 'efficiency',
          target: 'all_users',
        },
      },
      {
        type: 'generate_reports',
        config: {
          report_type: 'monthly_scores',
        },
      },
    ],
    rate_limiting: {
      enabled: true,
      max_executions_per_day: 1,
    },
    quiet_hours: {
      enabled: false,
    },
    enabled: true,
    created_by: 'admin-1',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    last_executed_at: '2026-02-01T00:00:00Z',
    next_execution_at: '2026-03-01T00:00:00Z',
    execution_count: 2,
    success_count: 2,
    failure_count: 0,
  },
  {
    id: 'auto-4',
    tenant_id: 'tenant-1',
    name: 'Blocker Escalation Check',
    description: 'Check for unresolved blockers every 6 hours',
    type: 'blocker_escalation',
    status: 'active',
    trigger: {
      schedule_type: 'custom',
      cron_expression: '0 */6 * * *', // Every 6 hours
    },
    actions: [
      {
        type: 'check_blockers',
        config: {
          threshold_days: 3,
          severity: ['S0', 'S1'],
        },
      },
      {
        type: 'escalate_to_manager',
        config: {
          message: 'Critical blocker requires attention',
        },
      },
    ],
    rate_limiting: {
      enabled: true,
      max_executions_per_day: 4,
      cooldown_minutes: 360,
    },
    quiet_hours: {
      enabled: true,
      start_time: '22:00',
      end_time: '06:00',
      timezone: 'PST',
    },
    enabled: true,
    created_by: 'admin-1',
    created_at: '2026-01-10T00:00:00Z',
    updated_at: '2026-01-10T00:00:00Z',
    last_executed_at: '2026-02-23T18:00:00Z',
    next_execution_at: '2026-02-24T00:00:00Z',
    execution_count: 176,
    success_count: 174,
    failure_count: 2,
  },
  {
    id: 'auto-5',
    tenant_id: 'tenant-1',
    name: 'Goal Auto-Close',
    description: 'Automatically close completed goals after 7 days',
    type: 'goal_auto_close',
    status: 'disabled',
    trigger: {
      schedule_type: 'daily',
      time: '02:00',
    },
    actions: [
      {
        type: 'close_goals',
        config: {
          status: 'achieved',
          days_since_completion: 7,
        },
      },
    ],
    rate_limiting: {
      enabled: false,
    },
    quiet_hours: {
      enabled: false,
    },
    enabled: false,
    created_by: 'admin-1',
    created_at: '2026-02-01T00:00:00Z',
    updated_at: '2026-02-15T00:00:00Z',
    execution_count: 0,
    success_count: 0,
    failure_count: 0,
  },
  {
    id: 'auto-6',
    tenant_id: 'tenant-1',
    name: 'Late Report Marking',
    description: 'Mark reports as late if not submitted by deadline',
    type: 'late_marking',
    status: 'paused',
    trigger: {
      schedule_type: 'daily',
      time: '18:00',
    },
    actions: [
      {
        type: 'mark_late_reports',
        config: {
          report_types: ['DSR', 'WSR'],
        },
      },
      {
        type: 'send_notification',
        config: {
          recipient: 'late_users',
          message: 'Your report has been marked as late',
          priority: 'high',
        },
      },
    ],
    rate_limiting: {
      enabled: true,
      max_executions_per_day: 1,
    },
    quiet_hours: {
      enabled: false,
    },
    enabled: false,
    created_by: 'admin-1',
    created_at: '2026-01-15T00:00:00Z',
    updated_at: '2026-02-20T00:00:00Z',
    last_executed_at: '2026-02-19T18:00:00Z',
    next_execution_at: '2026-02-24T18:00:00Z',
    execution_count: 35,
    success_count: 35,
    failure_count: 0,
  },
];

export const mockExecutionLogs: ExecutionLog[] = [
  {
    id: 'log-1',
    automation_id: 'auto-1',
    executed_at: '2026-02-23T16:00:00Z',
    status: 'success',
    duration_ms: 1250,
    affected_count: 12,
  },
  {
    id: 'log-2',
    automation_id: 'auto-1',
    executed_at: '2026-02-22T16:00:00Z',
    status: 'success',
    duration_ms: 980,
    affected_count: 8,
  },
  {
    id: 'log-3',
    automation_id: 'auto-2',
    executed_at: '2026-02-17T09:00:00Z',
    status: 'success',
    duration_ms: 2340,
    affected_count: 15,
  },
  {
    id: 'log-4',
    automation_id: 'auto-4',
    executed_at: '2026-02-23T18:00:00Z',
    status: 'success',
    duration_ms: 450,
    affected_count: 3,
  },
  {
    id: 'log-5',
    automation_id: 'auto-1',
    executed_at: '2026-02-20T16:00:00Z',
    status: 'failed',
    duration_ms: 5000,
    affected_count: 0,
    error_message: 'Connection timeout to notification service',
  },
];

// Helper functions
export const getAutomationsByType = (type: AutomationType): Automation[] => {
  return mockAutomations.filter(a => a.type === type);
};

export const getActiveAutomations = (): Automation[] => {
  return mockAutomations.filter(a => a.status === 'active' && a.enabled);
};

export const getAutomationById = (id: string): Automation | undefined => {
  return mockAutomations.find(a => a.id === id);
};

export const getExecutionLogs = (automationId: string): ExecutionLog[] => {
  return mockExecutionLogs.filter(log => log.automation_id === automationId);
};

export const automationTypeLabels: Record<AutomationType, string> = {
  reporting_reminder: 'Reporting Reminder',
  late_marking: 'Late Marking',
  escalation: 'Escalation',
  review_assignment: 'Review Assignment',
  sla_reminder: 'SLA Reminder',
  goal_auto_close: 'Goal Auto-Close',
  blocker_escalation: 'Blocker Escalation',
  scoring_compute: 'Scoring Compute',
  ticket_routing: 'Ticket Routing',
};
