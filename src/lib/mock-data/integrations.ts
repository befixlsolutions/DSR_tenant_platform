// Mock data for Integrations module

export type IntegrationCategory = 'communication' | 'project_management' | 'version_control' | 'calendar' | 'hrms' | 'webhooks';
export type IntegrationStatus = 'connected' | 'disconnected' | 'error' | 'pending';

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: IntegrationCategory;
  provider: string;
  icon: string;
  status: IntegrationStatus;
  isPopular: boolean;
  connectedAt?: Date;
  lastSyncAt?: Date;
  syncFrequency?: string;
  features: string[];
  setupGuideUrl?: string;
}

export interface IntegrationConfig {
  id: string;
  integrationId: string;
  settings: Record<string, any>;
  webhookUrl?: string;
  apiKey?: string;
  oauthConnected: boolean;
  syncEnabled: boolean;
  syncSchedule: string;
  lastSync?: Date;
  nextSync?: Date;
  syncStatus: 'success' | 'failed' | 'pending';
  errorMessage?: string;
}

export interface SyncLog {
  id: string;
  integrationId: string;
  timestamp: Date;
  status: 'success' | 'failed' | 'partial';
  recordsProcessed: number;
  recordsFailed: number;
  duration: number;
  errorMessage?: string;
}

export const integrationCategories: Record<IntegrationCategory, string> = {
  communication: 'Communication',
  project_management: 'Project Management',
  version_control: 'Version Control',
  calendar: 'Calendar',
  hrms: 'HRMS',
  webhooks: 'Webhooks',
};

export const mockIntegrations: Integration[] = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send notifications and updates to Slack channels',
    category: 'communication',
    provider: 'Slack Technologies',
    icon: '💬',
    status: 'connected',
    isPopular: true,
    connectedAt: new Date('2026-01-15T10:00:00'),
    lastSyncAt: new Date('2026-02-24T09:30:00'),
    syncFrequency: 'Real-time',
    features: [
      'DSR/WSR/MSR notifications',
      'Blocker alerts',
      'Goal updates',
      'Review reminders',
      'Custom webhooks',
    ],
    setupGuideUrl: '/docs/integrations/slack',
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Integrate with Microsoft Teams for notifications',
    category: 'communication',
    provider: 'Microsoft',
    icon: '👥',
    status: 'disconnected',
    isPopular: true,
    features: [
      'Channel notifications',
      'Direct messages',
      'Meeting integration',
      'Status updates',
    ],
    setupGuideUrl: '/docs/integrations/teams',
  },
  {
    id: 'jira',
    name: 'Jira',
    description: 'Sync blockers and actions with Jira issues',
    category: 'project_management',
    provider: 'Atlassian',
    icon: '📋',
    status: 'connected',
    isPopular: true,
    connectedAt: new Date('2026-01-20T14:00:00'),
    lastSyncAt: new Date('2026-02-24T08:00:00'),
    syncFrequency: 'Every 15 minutes',
    features: [
      'Two-way blocker sync',
      'Action item sync',
      'Status updates',
      'Comment sync',
      'Attachment sync',
    ],
    setupGuideUrl: '/docs/integrations/jira',
  },
  {
    id: 'asana',
    name: 'Asana',
    description: 'Connect tasks and projects with Asana',
    category: 'project_management',
    provider: 'Asana',
    icon: '✓',
    status: 'disconnected',
    isPopular: false,
    features: [
      'Task sync',
      'Project tracking',
      'Due date sync',
      'Assignee mapping',
    ],
    setupGuideUrl: '/docs/integrations/asana',
  },
  {
    id: 'clickup',
    name: 'ClickUp',
    description: 'Sync work items with ClickUp',
    category: 'project_management',
    provider: 'ClickUp',
    icon: '🎯',
    status: 'disconnected',
    isPopular: false,
    features: [
      'Task synchronization',
      'Time tracking',
      'Custom fields',
      'Automation',
    ],
    setupGuideUrl: '/docs/integrations/clickup',
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Link commits and PRs to reports',
    category: 'version_control',
    provider: 'GitHub',
    icon: '🐙',
    status: 'connected',
    isPopular: true,
    connectedAt: new Date('2026-02-01T09:00:00'),
    lastSyncAt: new Date('2026-02-24T10:15:00'),
    syncFrequency: 'Every 30 minutes',
    features: [
      'Commit linking',
      'PR tracking',
      'Branch activity',
      'Code review metrics',
      'Deployment tracking',
    ],
    setupGuideUrl: '/docs/integrations/github',
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    description: 'Connect GitLab repositories and merge requests',
    category: 'version_control',
    provider: 'GitLab',
    icon: '🦊',
    status: 'disconnected',
    isPopular: false,
    features: [
      'Repository sync',
      'Merge request tracking',
      'Pipeline status',
      'Issue linking',
    ],
    setupGuideUrl: '/docs/integrations/gitlab',
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Sync meetings and events with Google Calendar',
    category: 'calendar',
    provider: 'Google',
    icon: '📅',
    status: 'error',
    isPopular: true,
    connectedAt: new Date('2026-02-10T11:00:00'),
    lastSyncAt: new Date('2026-02-23T16:00:00'),
    syncFrequency: 'Every hour',
    features: [
      'Meeting sync',
      'Event creation',
      'Availability tracking',
      'Reminder integration',
    ],
    setupGuideUrl: '/docs/integrations/google-calendar',
  },
  {
    id: 'outlook-calendar',
    name: 'Outlook Calendar',
    description: 'Integrate with Outlook Calendar',
    category: 'calendar',
    provider: 'Microsoft',
    icon: '📆',
    status: 'disconnected',
    isPopular: true,
    features: [
      'Calendar sync',
      'Meeting scheduling',
      'Out of office detection',
      'Time zone support',
    ],
    setupGuideUrl: '/docs/integrations/outlook',
  },
  {
    id: 'bamboohr',
    name: 'BambooHR',
    description: 'Sync employee data and leave information',
    category: 'hrms',
    provider: 'BambooHR',
    icon: '🎋',
    status: 'pending',
    isPopular: false,
    features: [
      'Employee sync',
      'Leave tracking',
      'Org structure sync',
      'Department mapping',
    ],
    setupGuideUrl: '/docs/integrations/bamboohr',
  },
  {
    id: 'webhooks',
    name: 'Custom Webhooks',
    description: 'Configure custom webhook endpoints',
    category: 'webhooks',
    provider: 'Custom',
    icon: '🔗',
    status: 'connected',
    isPopular: false,
    connectedAt: new Date('2026-02-15T13:00:00'),
    features: [
      'Custom endpoints',
      'Event filtering',
      'Payload customization',
      'Retry logic',
      'Authentication',
    ],
    setupGuideUrl: '/docs/integrations/webhooks',
  },
];

export const mockSyncLogs: SyncLog[] = [
  {
    id: 'log-001',
    integrationId: 'slack',
    timestamp: new Date('2026-02-24T09:30:00'),
    status: 'success',
    recordsProcessed: 45,
    recordsFailed: 0,
    duration: 1250,
  },
  {
    id: 'log-002',
    integrationId: 'jira',
    timestamp: new Date('2026-02-24T08:00:00'),
    status: 'success',
    recordsProcessed: 23,
    recordsFailed: 0,
    duration: 3420,
  },
  {
    id: 'log-003',
    integrationId: 'github',
    timestamp: new Date('2026-02-24T10:15:00'),
    status: 'success',
    recordsProcessed: 67,
    recordsFailed: 0,
    duration: 2100,
  },
  {
    id: 'log-004',
    integrationId: 'google-calendar',
    timestamp: new Date('2026-02-23T16:00:00'),
    status: 'failed',
    recordsProcessed: 0,
    recordsFailed: 12,
    duration: 500,
    errorMessage: 'OAuth token expired. Please reconnect.',
  },
  {
    id: 'log-005',
    integrationId: 'jira',
    timestamp: new Date('2026-02-24T07:45:00'),
    status: 'partial',
    recordsProcessed: 18,
    recordsFailed: 3,
    duration: 4200,
    errorMessage: '3 records failed due to missing required fields',
  },
  {
    id: 'log-006',
    integrationId: 'slack',
    timestamp: new Date('2026-02-24T09:15:00'),
    status: 'success',
    recordsProcessed: 32,
    recordsFailed: 0,
    duration: 980,
  },
  {
    id: 'log-007',
    integrationId: 'github',
    timestamp: new Date('2026-02-24T09:45:00'),
    status: 'success',
    recordsProcessed: 54,
    recordsFailed: 0,
    duration: 1850,
  },
  {
    id: 'log-008',
    integrationId: 'jira',
    timestamp: new Date('2026-02-24T07:30:00'),
    status: 'success',
    recordsProcessed: 19,
    recordsFailed: 0,
    duration: 3100,
  },
];

export const mockIntegrationConfigs: IntegrationConfig[] = [
  {
    id: 'config-slack',
    integrationId: 'slack',
    settings: {
      workspace: 'acme-corp',
      defaultChannel: '#general',
      notifyOnDSR: true,
      notifyOnBlocker: true,
      notifyOnGoal: false,
    },
    webhookUrl: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX',
    oauthConnected: true,
    syncEnabled: true,
    syncSchedule: 'realtime',
    lastSync: new Date('2026-02-24T09:30:00'),
    syncStatus: 'success',
  },
  {
    id: 'config-jira',
    integrationId: 'jira',
    settings: {
      instance: 'acme.atlassian.net',
      project: 'PROJ',
      issueType: 'Bug',
      syncBlockers: true,
      syncActions: true,
    },
    apiKey: 'jira_api_key_xxxxxxxxxxxxx',
    oauthConnected: true,
    syncEnabled: true,
    syncSchedule: '*/15 * * * *',
    lastSync: new Date('2026-02-24T08:00:00'),
    nextSync: new Date('2026-02-24T08:15:00'),
    syncStatus: 'success',
  },
  {
    id: 'config-github',
    integrationId: 'github',
    settings: {
      organization: 'acme-corp',
      repositories: ['backend', 'frontend', 'mobile'],
      linkCommits: true,
      linkPRs: true,
    },
    oauthConnected: true,
    syncEnabled: true,
    syncSchedule: '*/30 * * * *',
    lastSync: new Date('2026-02-24T10:15:00'),
    nextSync: new Date('2026-02-24T10:45:00'),
    syncStatus: 'success',
  },
  {
    id: 'config-google-calendar',
    integrationId: 'google-calendar',
    settings: {
      syncMeetings: true,
      syncEvents: true,
      calendarId: 'primary',
    },
    oauthConnected: false,
    syncEnabled: false,
    syncSchedule: '0 * * * *',
    lastSync: new Date('2026-02-23T16:00:00'),
    syncStatus: 'failed',
    errorMessage: 'OAuth token expired. Please reconnect.',
  },
];
