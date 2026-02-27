// Mock data for Support & Ticketing module

export type TicketType = 'incident' | 'bug' | 'service_request' | 'feature_request' | 'question' | 'task';
export type TicketStatus = 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed';
export type TicketPriority = 's0' | 's1' | 's2' | 's3';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  type: TicketType;
  status: TicketStatus;
  priority: TicketPriority;
  createdBy: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  slaDeadline: Date;
  tags: string[];
  attachments: number;
  comments: number;
}

export interface TicketComment {
  id: string;
  ticketId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
  isInternal: boolean;
}

export interface KBArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  views: number;
  helpful: number;
  notHelpful: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
}

export const ticketTypeLabels: Record<TicketType, string> = {
  incident: 'Incident',
  bug: 'Bug',
  service_request: 'Service Request',
  feature_request: 'Feature Request',
  question: 'Question',
  task: 'Task',
};

export const ticketStatusLabels: Record<TicketStatus, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  waiting: 'Waiting',
  resolved: 'Resolved',
  closed: 'Closed',
};

export const ticketPriorityLabels: Record<TicketPriority, string> = {
  s0: 'S0 - Critical',
  s1: 'S1 - High',
  s2: 'S2 - Medium',
  s3: 'S3 - Low',
};

export const mockTickets: Ticket[] = [
  {
    id: 'TKT-001',
    title: 'Unable to submit DSR - System Error',
    description: 'Getting a 500 error when trying to submit my daily status report. This is blocking my work.',
    type: 'incident',
    status: 'in_progress',
    priority: 's0',
    createdBy: 'John Smith',
    assignedTo: 'Support Team',
    createdAt: new Date('2026-02-24T08:30:00'),
    updatedAt: new Date('2026-02-24T09:15:00'),
    slaDeadline: new Date('2026-02-24T12:30:00'),
    tags: ['dsr', 'submission', 'critical'],
    attachments: 2,
    comments: 5,
  },
  {
    id: 'TKT-002',
    title: 'Goal progress not updating correctly',
    description: 'My goal progress shows 45% but should be 60% based on completed tasks.',
    type: 'bug',
    status: 'open',
    priority: 's2',
    createdBy: 'Sarah Johnson',
    assignedTo: 'Dev Team',
    createdAt: new Date('2026-02-24T10:00:00'),
    updatedAt: new Date('2026-02-24T10:00:00'),
    slaDeadline: new Date('2026-02-26T10:00:00'),
    tags: ['goals', 'progress', 'calculation'],
    attachments: 1,
    comments: 2,
  },
  {
    id: 'TKT-003',
    title: 'Request access to Analytics module',
    description: 'I need access to the Analytics module to view team performance metrics.',
    type: 'service_request',
    status: 'waiting',
    priority: 's3',
    createdBy: 'Mike Chen',
    assignedTo: 'Admin Team',
    createdAt: new Date('2026-02-23T14:20:00'),
    updatedAt: new Date('2026-02-24T08:00:00'),
    slaDeadline: new Date('2026-02-27T14:20:00'),
    tags: ['access', 'permissions', 'analytics'],
    attachments: 0,
    comments: 3,
  },
  {
    id: 'TKT-004',
    title: 'Add bulk export feature for reports',
    description: 'Would be great to export multiple reports at once instead of one by one.',
    type: 'feature_request',
    status: 'open',
    priority: 's3',
    createdBy: 'Emily Davis',
    createdAt: new Date('2026-02-22T16:45:00'),
    updatedAt: new Date('2026-02-22T16:45:00'),
    slaDeadline: new Date('2026-03-01T16:45:00'),
    tags: ['export', 'reports', 'enhancement'],
    attachments: 0,
    comments: 1,
  },
  {
    id: 'TKT-005',
    title: 'How to set up automated reminders?',
    description: 'I want to set up automated reminders for my team to submit their DSRs. How do I do this?',
    type: 'question',
    status: 'resolved',
    priority: 's3',
    createdBy: 'David Wilson',
    assignedTo: 'Support Team',
    createdAt: new Date('2026-02-21T11:30:00'),
    updatedAt: new Date('2026-02-21T14:20:00'),
    resolvedAt: new Date('2026-02-21T14:20:00'),
    slaDeadline: new Date('2026-02-24T11:30:00'),
    tags: ['automation', 'reminders', 'how-to'],
    attachments: 0,
    comments: 4,
  },
  {
    id: 'TKT-006',
    title: 'Update user profile information',
    description: 'Need to update my department and team information in the system.',
    type: 'task',
    status: 'closed',
    priority: 's3',
    createdBy: 'Lisa Anderson',
    assignedTo: 'Admin Team',
    createdAt: new Date('2026-02-20T09:00:00'),
    updatedAt: new Date('2026-02-20T15:30:00'),
    resolvedAt: new Date('2026-02-20T15:30:00'),
    slaDeadline: new Date('2026-02-23T09:00:00'),
    tags: ['profile', 'user-management'],
    attachments: 0,
    comments: 2,
  },
  {
    id: 'TKT-007',
    title: 'Blocker escalation not triggering',
    description: 'Set up a blocker with S1 priority 3 days ago but no escalation email was sent.',
    type: 'bug',
    status: 'in_progress',
    priority: 's1',
    createdBy: 'Robert Taylor',
    assignedTo: 'Dev Team',
    createdAt: new Date('2026-02-23T13:15:00'),
    updatedAt: new Date('2026-02-24T09:00:00'),
    slaDeadline: new Date('2026-02-24T13:15:00'),
    tags: ['blockers', 'escalation', 'notifications'],
    attachments: 3,
    comments: 6,
  },
  {
    id: 'TKT-008',
    title: 'Dashboard loading very slowly',
    description: 'The home dashboard takes 10-15 seconds to load. Other pages load fine.',
    type: 'incident',
    status: 'open',
    priority: 's2',
    createdBy: 'Jennifer Martinez',
    assignedTo: 'Dev Team',
    createdAt: new Date('2026-02-24T07:45:00'),
    updatedAt: new Date('2026-02-24T07:45:00'),
    slaDeadline: new Date('2026-02-25T07:45:00'),
    tags: ['performance', 'dashboard', 'loading'],
    attachments: 1,
    comments: 1,
  },
];

export const mockKBArticles: KBArticle[] = [
  {
    id: 'KB-001',
    title: 'Getting Started with DSR Submission',
    content: 'Learn how to submit your Daily Status Reports effectively...',
    category: 'Getting Started',
    tags: ['dsr', 'reporting', 'basics'],
    views: 1245,
    helpful: 98,
    notHelpful: 5,
    createdBy: 'Support Team',
    createdAt: new Date('2026-01-15T10:00:00'),
    updatedAt: new Date('2026-02-10T14:30:00'),
    published: true,
  },
  {
    id: 'KB-002',
    title: 'Understanding Goal Lifecycle System (GLS)',
    content: 'Complete guide to setting up and tracking goals in the platform...',
    category: 'Goals',
    tags: ['goals', 'gls', 'tracking'],
    views: 892,
    helpful: 76,
    notHelpful: 3,
    createdBy: 'Product Team',
    createdAt: new Date('2026-01-20T09:00:00'),
    updatedAt: new Date('2026-02-15T11:00:00'),
    published: true,
  },
  {
    id: 'KB-003',
    title: 'How to Manage Blockers Effectively',
    content: 'Best practices for identifying, documenting, and resolving blockers...',
    category: 'Blockers',
    tags: ['blockers', 'best-practices', 'resolution'],
    views: 654,
    helpful: 52,
    notHelpful: 2,
    createdBy: 'Support Team',
    createdAt: new Date('2026-01-25T14:00:00'),
    updatedAt: new Date('2026-02-18T16:00:00'),
    published: true,
  },
  {
    id: 'KB-004',
    title: 'Setting Up Automations',
    content: 'Step-by-step guide to creating and managing automations...',
    category: 'Admin',
    tags: ['automations', 'admin', 'setup'],
    views: 432,
    helpful: 38,
    notHelpful: 1,
    createdBy: 'Admin Team',
    createdAt: new Date('2026-02-01T10:00:00'),
    updatedAt: new Date('2026-02-20T12:00:00'),
    published: true,
  },
  {
    id: 'KB-005',
    title: 'Understanding Analytics Metrics',
    content: 'Detailed explanation of all analytics metrics and how they are calculated...',
    category: 'Analytics',
    tags: ['analytics', 'metrics', 'reporting'],
    views: 567,
    helpful: 45,
    notHelpful: 4,
    createdBy: 'Product Team',
    createdAt: new Date('2026-02-05T11:00:00'),
    updatedAt: new Date('2026-02-22T15:00:00'),
    published: true,
  },
  {
    id: 'KB-006',
    title: 'Troubleshooting Common Issues',
    content: 'Solutions to frequently encountered problems and error messages...',
    category: 'Troubleshooting',
    tags: ['troubleshooting', 'errors', 'solutions'],
    views: 1089,
    helpful: 87,
    notHelpful: 6,
    createdBy: 'Support Team',
    createdAt: new Date('2026-01-10T09:00:00'),
    updatedAt: new Date('2026-02-23T10:00:00'),
    published: true,
  },
  {
    id: 'KB-007',
    title: 'Role-Based Access Control (RBAC) Guide',
    content: 'Understanding permissions and roles in the platform...',
    category: 'Admin',
    tags: ['rbac', 'permissions', 'roles'],
    views: 345,
    helpful: 29,
    notHelpful: 2,
    createdBy: 'Admin Team',
    createdAt: new Date('2026-02-08T13:00:00'),
    updatedAt: new Date('2026-02-21T14:00:00'),
    published: true,
  },
  {
    id: 'KB-008',
    title: 'Weekly and Monthly Report Best Practices',
    content: 'Tips for creating comprehensive WSR and MSR reports...',
    category: 'Reporting',
    tags: ['wsr', 'msr', 'best-practices'],
    views: 723,
    helpful: 61,
    notHelpful: 3,
    createdBy: 'Product Team',
    createdAt: new Date('2026-02-12T10:00:00'),
    updatedAt: new Date('2026-02-24T09:00:00'),
    published: true,
  },
];

export const kbCategories = [
  'Getting Started',
  'Reporting',
  'Goals',
  'Blockers',
  'Analytics',
  'Admin',
  'Troubleshooting',
  'Best Practices',
];
