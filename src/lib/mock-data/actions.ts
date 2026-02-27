// Mock Actions Data

export type ActionStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';
export type ActionPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ActionRelatedType = 'report' | 'goal' | 'blocker' | 'review' | 'manual';

export interface Action {
  id: string;
  title: string;
  description: string;
  owner_id: string;
  owner_name: string;
  created_by_id: string;
  created_by_name: string;
  assigned_by_id?: string;
  assigned_by_name?: string;
  due_date: string;
  status: ActionStatus;
  priority: ActionPriority;
  related_to_type?: ActionRelatedType;
  related_to_id?: string;
  related_to_title?: string;
  completion_notes?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

// Mock Actions
export const mockActions: Action[] = [
  {
    id: 'action-1',
    title: 'Update API documentation',
    description: 'Complete the API documentation for the authentication module as discussed in the review.',
    owner_id: 'user-1',
    owner_name: 'John Employee',
    created_by_id: 'user-2',
    created_by_name: 'Sarah Manager',
    assigned_by_id: 'user-2',
    assigned_by_name: 'Sarah Manager',
    due_date: '2026-02-28',
    status: 'in_progress',
    priority: 'high',
    related_to_type: 'review',
    related_to_id: 'review-4',
    related_to_title: 'DSR Review - Feb 22',
    created_at: '2026-02-23T10:00:00Z',
    updated_at: '2026-02-23T14:00:00Z',
  },
  {
    id: 'action-2',
    title: 'Code review for new feature branch',
    description: 'Review the payment gateway integration PR and provide feedback.',
    owner_id: 'user-1',
    owner_name: 'John Employee',
    created_by_id: 'user-1',
    created_by_name: 'John Employee',
    due_date: '2026-02-25',
    status: 'open',
    priority: 'medium',
    related_to_type: 'goal',
    related_to_id: 'goal-1',
    related_to_title: 'Complete payment gateway integration',
    created_at: '2026-02-22T09:00:00Z',
    updated_at: '2026-02-22T09:00:00Z',
  },
  {
    id: 'action-3',
    title: 'Resolve API integration blocker',
    description: 'Work with backend team to resolve the API endpoint issue blocking integration testing.',
    owner_id: 'user-1',
    owner_name: 'John Employee',
    created_by_id: 'user-1',
    created_by_name: 'John Employee',
    due_date: '2026-02-26',
    status: 'open',
    priority: 'urgent',
    related_to_type: 'blocker',
    related_to_id: 'blocker-1',
    related_to_title: 'API documentation incomplete',
    created_at: '2026-02-21T15:00:00Z',
    updated_at: '2026-02-21T15:00:00Z',
  },
  {
    id: 'action-4',
    title: 'Prepare Q1 performance review',
    description: 'Gather evidence and prepare self-review for Q1 appraisal cycle.',
    owner_id: 'user-1',
    owner_name: 'John Employee',
    created_by_id: 'user-1',
    created_by_name: 'John Employee',
    due_date: '2026-03-15',
    status: 'open',
    priority: 'medium',
    related_to_type: 'manual',
    created_at: '2026-02-20T00:00:00Z',
    updated_at: '2026-02-20T00:00:00Z',
  },
  {
    id: 'action-5',
    title: 'Improve code coverage',
    description: 'Increase unit test coverage to 90% for authentication module.',
    owner_id: 'user-1',
    owner_name: 'John Employee',
    created_by_id: 'user-2',
    created_by_name: 'Sarah Manager',
    assigned_by_id: 'user-2',
    assigned_by_name: 'Sarah Manager',
    due_date: '2026-03-01',
    status: 'completed',
    priority: 'medium',
    related_to_type: 'goal',
    related_to_id: 'goal-2',
    related_to_title: 'Improve code quality metrics',
    completion_notes: 'Achieved 92% code coverage. All critical paths covered.',
    completed_at: '2026-02-22T16:00:00Z',
    created_at: '2026-02-15T00:00:00Z',
    updated_at: '2026-02-22T16:00:00Z',
  },
  // Team member actions
  {
    id: 'action-6',
    title: 'Fix responsive design issues',
    description: 'Address mobile layout issues on user profile page.',
    owner_id: 'user-8',
    owner_name: 'Jane Developer',
    created_by_id: 'user-2',
    created_by_name: 'Sarah Manager',
    assigned_by_id: 'user-2',
    assigned_by_name: 'Sarah Manager',
    due_date: '2026-02-27',
    status: 'in_progress',
    priority: 'high',
    related_to_type: 'report',
    related_to_id: 'dsr-5',
    related_to_title: 'DSR - Feb 21',
    created_at: '2026-02-21T11:00:00Z',
    updated_at: '2026-02-23T09:00:00Z',
  },
  {
    id: 'action-7',
    title: 'Update project documentation',
    description: 'Document the new feature implementation and deployment process.',
    owner_id: 'user-9',
    owner_name: 'Bob Engineer',
    created_by_id: 'user-2',
    created_by_name: 'Sarah Manager',
    assigned_by_id: 'user-2',
    assigned_by_name: 'Sarah Manager',
    due_date: '2026-02-24',
    status: 'open',
    priority: 'medium',
    related_to_type: 'manual',
    created_at: '2026-02-20T14:00:00Z',
    updated_at: '2026-02-20T14:00:00Z',
  },
];

// Helper functions
export const getActionsByOwner = (ownerId: string): Action[] => {
  return mockActions.filter(a => a.owner_id === ownerId);
};

export const getActionsByStatus = (ownerId: string, status: ActionStatus): Action[] => {
  return mockActions.filter(a => a.owner_id === ownerId && a.status === status);
};

export const getOverdueActions = (ownerId: string): Action[] => {
  const today = new Date().toISOString().split('T')[0];
  return mockActions.filter(
    a => a.owner_id === ownerId && 
    a.status !== 'completed' && 
    a.status !== 'cancelled' && 
    a.due_date < today
  );
};

export const getTeamActions = (managerTeamIds: string[]): Action[] => {
  return mockActions.filter(a => managerTeamIds.includes(a.owner_id));
};

export const getActionsByPriority = (ownerId: string, priority: ActionPriority): Action[] => {
  return mockActions.filter(a => a.owner_id === ownerId && a.priority === priority);
};

export const getActionById = (actionId: string): Action | undefined => {
  return mockActions.find(a => a.id === actionId);
};
