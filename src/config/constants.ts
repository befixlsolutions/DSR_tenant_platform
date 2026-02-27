// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Route Paths - Based on Tenant Platform Documentation
export const ROUTES = {
  HOME: '/home',
  
  // Reporting
  REPORTING_INBOX: '/reporting/inbox',
  REPORTING_MY: '/reporting',
  REPORTING_TEAM: '/reporting?scope=team',
  REPORTING_DEPARTMENT: '/reporting?scope=department',
  REPORTING_APPROVALS: '/reporting/approvals',
  REPORTING_EXPORTS: '/reporting/exports',
  DSR_NEW: '/reporting/dsr/new',
  DSR_DETAIL: '/reporting/dsr',
  WSR_NEW: '/reporting/wsr/new',
  MSR_DETAIL: '/reporting/msr',
  
  // Goals
  GOALS_MY: '/goals/my',
  GOALS_TEAM: '/goals/team',
  GOALS_DEPARTMENT: '/goals/department',
  GOALS_ORG: '/goals/org',
  GOALS_FOCUS: '/goals/focus',
  GOALS_CONFIG: '/goals/config',
  
  // Blockers
  BLOCKERS_MY: '/blockers/my',
  BLOCKERS_TEAM: '/blockers/team',
  BLOCKERS_DEPARTMENT: '/blockers/department',
  
  // Dependencies
  DEPENDENCIES: '/dependencies',
  
  // Actions
  ACTIONS_MY: '/actions/my',
  ACTIONS_TEAM: '/actions/team',
  
  // People
  PEOPLE_DIRECTORY: '/people/directory',
  PEOPLE_ORG_CHART: '/people/org-chart',
  
  // Analytics
  ANALYTICS_MY: '/analytics/my',
  ANALYTICS_TEAM: '/analytics/team',
  ANALYTICS_DEPARTMENT: '/analytics/department',
  ANALYTICS_ORG: '/analytics/org',
  ANALYTICS_HR: '/analytics/hr',
  
  // Reviews & Appraisals
  REVIEWS_WEEKLY: '/reviews/weekly',
  APPRAISALS_CYCLES: '/reviews/appraisals/cycles',
  
  // Support
  SUPPORT_TICKETS: '/support/tickets',
  SUPPORT_KB: '/support/kb',
  
  // Admin
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_ROLES: '/admin/roles',
  ADMIN_ORG_STRUCTURE: '/admin/org-structure',
  ADMIN_TEMPLATES: '/admin/templates',
  ADMIN_POLICIES: '/admin/policies',
  ADMIN_AUTOMATIONS: '/admin/automations',
  ADMIN_NOTIFICATIONS: '/admin/notifications',
  ADMIN_AI: '/admin/ai-settings',
  ADMIN_BILLING: '/admin/billing',
  
  // Audit
  AUDIT_LOGS: '/audit/logs',
  AUDIT_EXPORTS: '/audit/exports',
  AUDIT_SECURITY: '/audit/security',
  
  // Integrations
  INTEGRATIONS: '/integrations',
  
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
} as const;

// Navigation Registry - Based on Documentation
export const NAVIGATION_SECTIONS = [
  {
    id: 'home',
    label: 'Home',
    icon: 'Home',
    items: [
      { id: 'home.dashboard', label: 'Dashboard', href: '/home', permissions: ['nav.home'], icon: 'LayoutDashboard' }
    ]
  },
  {
    id: 'reporting',
    label: 'Reporting',
    icon: 'ClipboardList',
    items: [
      { id: 'reporting.inbox', label: 'Inbox', href: '/reporting/inbox', permissions: ['nav.reporting', 'reports.view.inbox'], badge: 'required_today', icon: 'Inbox' },
      { id: 'reporting.my', label: 'My Reports', href: '/reporting', permissions: ['nav.reporting', 'reports.list.self'], icon: 'FileText' },
      { id: 'reporting.team', label: 'Team Reports', href: '/reporting?scope=team', permissions: ['nav.reporting', 'reports.list.team'], icon: 'Users' },
      { id: 'reporting.department', label: 'Department Reports', href: '/reporting?scope=department', permissions: ['nav.reporting', 'reports.list.department'], icon: 'Building' },
      { id: 'reporting.approvals', label: 'Approvals', href: '/reporting/approvals', permissions: ['nav.reporting', 'reports.review.queue'], featureFlag: 'REPORT_APPROVALS', icon: 'CheckCircle' },
      { id: 'reporting.exports', label: 'Exports', href: '/reporting/exports', permissions: ['nav.reporting', 'reports.export.allowed'], featureFlag: 'EXPORTS', icon: 'Download' },
      { id: 'reporting.templates', label: 'Templates', href: '/admin/templates', permissions: ['nav.admin', 'admin.templates.manage'], featureFlag: 'TEMPLATE_BUILDER', icon: 'Layout' }
    ]
  },
  {
    id: 'goals',
    label: 'Goals',
    icon: 'Target',
    items: [
      { id: 'goals.my', label: 'My Goals', href: '/goals/my', permissions: ['nav.goals', 'goals.list.self'], featureFlag: 'GOALS', icon: 'Target' },
      { id: 'goals.team', label: 'Team Goals', href: '/goals/team', permissions: ['nav.goals', 'goals.list.team'], featureFlag: 'GOALS', icon: 'Users' },
      { id: 'goals.department', label: 'Department Goals', href: '/goals/department', permissions: ['nav.goals', 'goals.list.department'], featureFlag: 'GOALS', icon: 'Building' },
      { id: 'goals.org', label: 'Org Goals', href: '/goals/org', permissions: ['nav.goals', 'goals.list.org'], featureFlag: 'GOALS', icon: 'Globe' },
      { id: 'goals.focus', label: 'Focus (GLS)', href: '/goals/focus', permissions: ['nav.goals', 'goals.view.focus'], featureFlag: 'GLS_FOCUS', icon: 'Zap' },
      { id: 'goals.config', label: 'Config', href: '/goals/config', permissions: ['nav.admin', 'admin.goals.config'], featureFlag: 'GOALS', icon: 'Settings' }
    ]
  },
  {
    id: 'blockers',
    label: 'Blockers',
    icon: 'AlertTriangle',
    items: [
      { id: 'blockers.my', label: 'My Blockers', href: '/blockers/my', permissions: ['nav.blockers', 'blockers.list.self'], featureFlag: 'BLOCKERS', icon: 'AlertTriangle' },
      { id: 'blockers.team', label: 'Team Blockers', href: '/blockers/team', permissions: ['nav.blockers', 'blockers.list.team'], featureFlag: 'BLOCKERS', icon: 'Users' },
      { id: 'blockers.department', label: 'Department Blockers', href: '/blockers/department', permissions: ['nav.blockers', 'blockers.list.department'], featureFlag: 'BLOCKERS', icon: 'Building' }
    ]
  },
  {
    id: 'dependencies',
    label: 'Dependencies',
    icon: 'Link2',
    items: [
      { id: 'dependencies.all', label: 'All Dependencies', href: '/dependencies', permissions: ['nav.dependencies', 'dependencies.list.allowed'], featureFlag: 'DEPENDENCIES', icon: 'Link' }
    ]
  },
  {
    id: 'actions',
    label: 'Actions',
    icon: 'CheckSquare',
    items: [
      { id: 'actions.my', label: 'My Actions', href: '/actions/my', permissions: ['nav.actions', 'actions.list.self'], featureFlag: 'ACTIONS', icon: 'CheckSquare' },
      { id: 'actions.team', label: 'Team Actions', href: '/actions/team', permissions: ['nav.actions', 'actions.list.team'], featureFlag: 'ACTIONS', icon: 'Users' }
    ]
  },
  {
    id: 'people',
    label: 'People',
    icon: 'Users',
    items: [
      { id: 'people.directory', label: 'Directory', href: '/people/directory', permissions: ['nav.people', 'people.directory.view'], featureFlag: 'PEOPLE', icon: 'Users' },
      { id: 'people.orgchart', label: 'Org Chart', href: '/people/org-chart', permissions: ['nav.people', 'people.orgchart.view'], featureFlag: 'PEOPLE', icon: 'Network' }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'BarChart3',
    items: [
      { id: 'analytics.my', label: 'My Analytics', href: '/analytics/my', permissions: ['nav.analytics', 'analytics.view.self'], featureFlag: 'ANALYTICS', icon: 'BarChart' },
      { id: 'analytics.team', label: 'Team Analytics', href: '/analytics/team', permissions: ['nav.analytics', 'analytics.view.team'], featureFlag: 'ANALYTICS', icon: 'Users' },
      { id: 'analytics.department', label: 'Department Analytics', href: '/analytics/department', permissions: ['nav.analytics', 'analytics.view.department'], featureFlag: 'ANALYTICS', icon: 'Building' },
      { id: 'analytics.org', label: 'Org Analytics', href: '/analytics/org', permissions: ['nav.analytics', 'analytics.view.org'], featureFlag: 'ANALYTICS', icon: 'Globe' },
      { id: 'analytics.hr', label: 'HR Analytics', href: '/analytics/hr', permissions: ['nav.analytics', 'analytics.view.hr'], featureFlag: 'HR_ANALYTICS', icon: 'TrendingUp' }
    ]
  },
  {
    id: 'reviews',
    label: 'Reviews & Appraisals',
    icon: 'BadgeCheck',
    items: [
      { id: 'reviews.weekly', label: 'Weekly Reviews', href: '/reviews/weekly', permissions: ['nav.reviews', 'reviews.weekly.manage'], featureFlag: 'REVIEWS', icon: 'Calendar' },
      { id: 'appraisals.cycles', label: 'Appraisal Cycles', href: '/reviews/appraisals/cycles', permissions: ['nav.reviews', 'reviews.appraisals.view'], featureFlag: 'APPRAISALS', icon: 'Award' }
    ]
  },
  {
    id: 'support',
    label: 'Support',
    icon: 'LifeBuoy',
    items: [
      { id: 'support.tickets', label: 'Tickets', href: '/support/tickets', permissions: ['nav.support', 'support.tickets.view'], featureFlag: 'SUPPORT', icon: 'Ticket' },
      { id: 'support.kb', label: 'Knowledge Base', href: '/support/kb', permissions: ['nav.support', 'support.kb.view'], featureFlag: 'SUPPORT', icon: 'BookOpen' }
    ]
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: 'Plug',
    items: [
      { id: 'integrations.marketplace', label: 'Marketplace', href: '/integrations', permissions: ['nav.integrations', 'integrations.view'], featureFlag: 'INTEGRATIONS', icon: 'Store' }
    ]
  },
  {
    id: 'ai',
    label: 'AI Features',
    icon: 'Brain',
    items: [
      { id: 'ai.insights', label: 'AI Insights', href: '/ai/insights', permissions: ['nav.ai', 'ai.insights.view'], featureFlag: 'AI', icon: 'Sparkles' },
      { id: 'ai.settings', label: 'AI Settings', href: '/ai/settings', permissions: ['nav.ai', 'ai.settings.manage'], featureFlag: 'AI', icon: 'Settings' }
    ]
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: 'Settings',
    items: [
      { id: 'admin.overview', label: 'Overview', href: '/admin', permissions: ['nav.admin', 'admin.view'], icon: 'LayoutDashboard' },
      { id: 'admin.users', label: 'Users', href: '/admin/users', permissions: ['nav.admin', 'admin.users.manage'], icon: 'Users' },
      { id: 'admin.roles', label: 'Roles & Permissions', href: '/admin/roles', permissions: ['nav.admin', 'admin.roles.manage'], icon: 'Shield' },
      { id: 'admin.org', label: 'Org Structure', href: '/admin/org-structure', permissions: ['nav.admin', 'admin.org.manage'], featureFlag: 'ORG_STRUCTURE', icon: 'Sitemap' },
      { id: 'admin.policies', label: 'Policies & Rules', href: '/admin/policies', permissions: ['nav.admin', 'admin.policies.manage'], featureFlag: 'POLICIES', icon: 'FileText' },
      { id: 'admin.automations', label: 'Automations', href: '/admin/automations', permissions: ['nav.admin', 'admin.automations.manage'], featureFlag: 'AUTOMATIONS', icon: 'Zap' },
      { id: 'admin.notifications', label: 'Notifications', href: '/admin/notifications', permissions: ['nav.admin', 'admin.notifications.manage'], featureFlag: 'NOTIFICATIONS', icon: 'Bell' },
      { id: 'admin.ai', label: 'AI Settings', href: '/admin/ai-settings', permissions: ['nav.admin', 'admin.ai.manage'], featureFlag: 'AI', icon: 'Sparkles' },
      { id: 'admin.performance', label: 'Performance', href: '/admin/performance', permissions: ['nav.admin', 'admin.performance.view'], icon: 'Activity' },
      { id: 'admin.accessibility', label: 'Accessibility', href: '/admin/accessibility', permissions: ['nav.admin', 'admin.accessibility.view'], icon: 'Eye' },
      { id: 'admin.billing', label: 'Billing', href: '/admin/billing', permissions: ['nav.admin', 'billing.manage'], featureFlag: 'BILLING', icon: 'CreditCard' }
    ]
  },
  {
    id: 'audit',
    label: 'Audit & Security',
    icon: 'Shield',
    items: [
      { id: 'audit.logs', label: 'Audit Logs', href: '/audit/logs', permissions: ['nav.audit', 'audit.logs.view'], featureFlag: 'AUDIT_LOGS', icon: 'FileText' },
      { id: 'audit.security', label: 'Security Posture', href: '/audit/security', permissions: ['nav.audit', 'security.view'], featureFlag: 'AUDIT_LOGS', icon: 'Lock' }
    ]
  }
] as const;

// Priority Colors
export const PRIORITY_COLORS = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-orange-100 text-orange-800',
  high: 'bg-red-100 text-red-800',
} as const;

// Status Colors
export const STATUS_COLORS = {
  todo: 'bg-gray-100 text-gray-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  blocked: 'bg-red-100 text-red-800',
} as const;

// Chart Colors
export const CHART_COLORS = {
  primary: '#7c3aed',
  secondary: '#60a5fa',
  accent: '#fb923c',
  success: '#4ade80',
  warning: '#fbbf24',
  danger: '#f87171',
} as const;

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'MMM dd',
  MEDIUM: 'MMM dd, yyyy',
  LONG: 'MMMM dd, yyyy',
  TIME: 'HH:mm',
  DATETIME: 'MMM dd, yyyy HH:mm',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

// Animation Durations
export const ANIMATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
} as const;
