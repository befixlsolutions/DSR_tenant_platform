// Mock Templates Data

export type TemplateType = 'DSR' | 'WSR' | 'MSR' | 'QSR' | 'YSR';
export type FieldType = 
  | 'text' 
  | 'rich_text' 
  | 'structured_bullets' 
  | 'dropdown' 
  | 'multiselect'
  | 'number'
  | 'currency'
  | 'percentage'
  | 'metric'
  | 'date'
  | 'week'
  | 'project_selector'
  | 'link'
  | 'status'
  | 'attachment'
  | 'blocker_object'
  | 'dependency_object'
  | 'risk_object';

export interface TemplateField {
  id: string;
  label: string;
  field_type: FieldType;
  required: boolean;
  placeholder?: string;
  help_text?: string;
  validation_rules?: {
    min_length?: number;
    max_length?: number;
    min_value?: number;
    max_value?: number;
    pattern?: string;
    custom_rule?: string;
  };
  options?: string[]; // For dropdown/multiselect
  conditional_logic?: {
    show_if_field: string;
    show_if_value: any;
  };
  default_value?: any;
}

export interface TemplateSection {
  id: string;
  title: string;
  description?: string;
  order: number;
  fields: TemplateField[];
  collapsible: boolean;
  collapsed_by_default: boolean;
}

export interface Template {
  id: string;
  tenant_id: string;
  name: string;
  template_type: TemplateType;
  version: number;
  status: 'draft' | 'active' | 'archived';
  description: string;
  sections: TemplateSection[];
  workflow_config?: {
    requires_manager_approval: boolean;
    auto_lock_after_hours: number;
    allow_late_submission: boolean;
    reminder_schedule: string[];
  };
  assigned_to?: {
    departments?: string[];
    teams?: string[];
    roles?: string[];
    users?: string[];
  };
  created_by: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export const mockTemplates: Template[] = [
  {
    id: 'template-1',
    tenant_id: 'tenant-1',
    name: 'Standard DSR Template',
    template_type: 'DSR',
    version: 2,
    status: 'active',
    description: 'Default daily status report template for all employees',
    sections: [
      {
        id: 'section-1',
        title: 'What I Did Today',
        description: 'List your key accomplishments and tasks completed',
        order: 1,
        collapsible: false,
        collapsed_by_default: false,
        fields: [
          {
            id: 'field-1',
            label: 'Accomplishments',
            field_type: 'structured_bullets',
            required: true,
            placeholder: 'Add your accomplishments...',
            help_text: 'List at least 3 key tasks you completed today',
            validation_rules: {
              min_length: 3,
            },
          },
        ],
      },
      {
        id: 'section-2',
        title: 'Blockers',
        description: 'Report any blockers or impediments',
        order: 2,
        collapsible: true,
        collapsed_by_default: false,
        fields: [
          {
            id: 'field-2',
            label: 'Blockers',
            field_type: 'blocker_object',
            required: false,
            help_text: 'Add any blockers you encountered today',
          },
        ],
      },
      {
        id: 'section-3',
        title: 'Tomorrow\'s Plan',
        description: 'What you plan to work on tomorrow',
        order: 3,
        collapsible: false,
        collapsed_by_default: false,
        fields: [
          {
            id: 'field-3',
            label: 'Tomorrow\'s Tasks',
            field_type: 'structured_bullets',
            required: true,
            placeholder: 'Add your planned tasks...',
            help_text: 'List what you plan to work on tomorrow',
          },
        ],
      },
      {
        id: 'section-4',
        title: 'Evidence Links',
        description: 'Links to PRs, tickets, documents',
        order: 4,
        collapsible: true,
        collapsed_by_default: true,
        fields: [
          {
            id: 'field-4',
            label: 'Evidence Links',
            field_type: 'link',
            required: false,
            help_text: 'Add links to your work (PRs, tickets, docs)',
          },
        ],
      },
    ],
    workflow_config: {
      requires_manager_approval: false,
      auto_lock_after_hours: 24,
      allow_late_submission: true,
      reminder_schedule: ['09:00', '16:00'],
    },
    assigned_to: {
      departments: ['Engineering', 'Product', 'Design'],
      teams: [],
      roles: [],
      users: [],
    },
    created_by: 'admin-1',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-02-15T00:00:00Z',
    published_at: '2026-01-05T00:00:00Z',
  },
  {
    id: 'template-2',
    tenant_id: 'tenant-1',
    name: 'Engineering WSR Template',
    template_type: 'WSR',
    version: 1,
    status: 'active',
    description: 'Weekly status report template for engineering teams',
    sections: [
      {
        id: 'section-1',
        title: 'Week Summary',
        order: 1,
        collapsible: false,
        collapsed_by_default: false,
        fields: [
          {
            id: 'field-1',
            label: 'Week Summary',
            field_type: 'rich_text',
            required: true,
            placeholder: 'Summarize your week...',
            help_text: 'High-level overview of your week\'s work',
          },
        ],
      },
      {
        id: 'section-2',
        title: 'Key Achievements',
        order: 2,
        collapsible: false,
        collapsed_by_default: false,
        fields: [
          {
            id: 'field-2',
            label: 'Achievements',
            field_type: 'structured_bullets',
            required: true,
            help_text: 'List your major accomplishments this week',
          },
        ],
      },
      {
        id: 'section-3',
        title: 'Next Week Goals',
        order: 3,
        collapsible: false,
        collapsed_by_default: false,
        fields: [
          {
            id: 'field-3',
            label: 'Goals',
            field_type: 'structured_bullets',
            required: true,
            help_text: 'Set 2-5 goals for next week',
          },
        ],
      },
    ],
    workflow_config: {
      requires_manager_approval: true,
      auto_lock_after_hours: 72,
      allow_late_submission: false,
      reminder_schedule: ['Friday 14:00'],
    },
    assigned_to: {
      departments: ['Engineering'],
      teams: [],
      roles: [],
      users: [],
    },
    created_by: 'admin-1',
    created_at: '2026-01-10T00:00:00Z',
    updated_at: '2026-01-10T00:00:00Z',
    published_at: '2026-01-15T00:00:00Z',
  },
  {
    id: 'template-3',
    tenant_id: 'tenant-1',
    name: 'Sales DSR Template',
    template_type: 'DSR',
    version: 1,
    status: 'active',
    description: 'Daily status report template for sales team',
    sections: [
      {
        id: 'section-1',
        title: 'Sales Activities',
        order: 1,
        collapsible: false,
        collapsed_by_default: false,
        fields: [
          {
            id: 'field-1',
            label: 'Calls Made',
            field_type: 'number',
            required: true,
            help_text: 'Number of calls made today',
            validation_rules: {
              min_value: 0,
            },
          },
          {
            id: 'field-2',
            label: 'Meetings Held',
            field_type: 'number',
            required: true,
            help_text: 'Number of meetings held today',
          },
          {
            id: 'field-3',
            label: 'Deals Closed',
            field_type: 'currency',
            required: false,
            help_text: 'Total value of deals closed today',
          },
        ],
      },
      {
        id: 'section-2',
        title: 'Key Activities',
        order: 2,
        collapsible: false,
        collapsed_by_default: false,
        fields: [
          {
            id: 'field-4',
            label: 'Activities',
            field_type: 'structured_bullets',
            required: true,
            help_text: 'Describe your key sales activities',
          },
        ],
      },
    ],
    workflow_config: {
      requires_manager_approval: false,
      auto_lock_after_hours: 24,
      allow_late_submission: true,
      reminder_schedule: ['17:00'],
    },
    assigned_to: {
      departments: ['Sales'],
      teams: [],
      roles: [],
      users: [],
    },
    created_by: 'admin-1',
    created_at: '2026-01-20T00:00:00Z',
    updated_at: '2026-01-20T00:00:00Z',
    published_at: '2026-01-25T00:00:00Z',
  },
  {
    id: 'template-4',
    tenant_id: 'tenant-1',
    name: 'MSR Template v2',
    template_type: 'MSR',
    version: 2,
    status: 'draft',
    description: 'Updated monthly status report template (in development)',
    sections: [
      {
        id: 'section-1',
        title: 'Executive Summary',
        order: 1,
        collapsible: false,
        collapsed_by_default: false,
        fields: [
          {
            id: 'field-1',
            label: 'Summary',
            field_type: 'rich_text',
            required: true,
            help_text: 'High-level overview of the month',
          },
        ],
      },
    ],
    workflow_config: {
      requires_manager_approval: true,
      auto_lock_after_hours: 168,
      allow_late_submission: false,
      reminder_schedule: ['First Monday 09:00'],
    },
    created_by: 'admin-1',
    created_at: '2026-02-20T00:00:00Z',
    updated_at: '2026-02-23T00:00:00Z',
  },
];

// Helper functions
export const getTemplatesByType = (type: TemplateType): Template[] => {
  return mockTemplates.filter(t => t.template_type === type);
};

export const getActiveTemplates = (): Template[] => {
  return mockTemplates.filter(t => t.status === 'active');
};

export const getTemplateById = (id: string): Template | undefined => {
  return mockTemplates.find(t => t.id === id);
};

export const getTemplatesByDepartment = (department: string): Template[] => {
  return mockTemplates.filter(t => 
    t.assigned_to?.departments?.includes(department)
  );
};

export const fieldTypeLabels: Record<FieldType, string> = {
  text: 'Text',
  rich_text: 'Rich Text',
  structured_bullets: 'Structured Bullets',
  dropdown: 'Dropdown',
  multiselect: 'Multi-Select',
  number: 'Number',
  currency: 'Currency',
  percentage: 'Percentage',
  metric: 'Metric',
  date: 'Date',
  week: 'Week',
  project_selector: 'Project Selector',
  link: 'Link',
  status: 'Status',
  attachment: 'Attachment',
  blocker_object: 'Blocker Object',
  dependency_object: 'Dependency Object',
  risk_object: 'Risk Object',
};
