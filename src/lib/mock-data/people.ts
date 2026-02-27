// Mock People Data

export interface Person {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  team: string;
  manager_id?: string;
  manager_name?: string;
  direct_reports: string[];
  phone?: string;
  location: string;
  timezone: string;
  start_date: string;
  avatar_url?: string;
  status: 'active' | 'inactive' | 'on_leave';
  efficiency_score?: number;
  compliance_rate?: number;
}

export interface Activity {
  id: string;
  user_id: string;
  type: 'report_submission' | 'goal_achievement' | 'review_received' | 'blocker_resolved' | 'action_completed';
  title: string;
  description: string;
  date: string;
  metadata?: Record<string, any>;
}

export const mockPeople: Person[] = [
  {
    id: 'user-1',
    name: 'John Employee',
    email: 'john.employee@company.com',
    role: 'Senior Software Engineer',
    department: 'Engineering',
    team: 'Backend Team',
    manager_id: 'user-2',
    manager_name: 'Sarah Manager',
    direct_reports: [],
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    timezone: 'PST',
    start_date: '2023-01-15',
    status: 'active',
    efficiency_score: 86,
    compliance_rate: 96,
  },
  {
    id: 'user-2',
    name: 'Sarah Manager',
    email: 'sarah.manager@company.com',
    role: 'Engineering Manager',
    department: 'Engineering',
    team: 'Backend Team',
    manager_id: 'user-3',
    manager_name: 'Mike Director',
    direct_reports: ['user-1', 'user-8', 'user-9'],
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    timezone: 'PST',
    start_date: '2021-06-01',
    status: 'active',
    efficiency_score: 88,
    compliance_rate: 98,
  },
  {
    id: 'user-3',
    name: 'Mike Director',
    email: 'mike.director@company.com',
    role: 'Director of Engineering',
    department: 'Engineering',
    team: 'Leadership',
    manager_id: 'user-4',
    manager_name: 'Lisa VP',
    direct_reports: ['user-2', 'user-10', 'user-11'],
    phone: '+1 (555) 345-6789',
    location: 'San Francisco, CA',
    timezone: 'PST',
    start_date: '2020-03-15',
    status: 'active',
    efficiency_score: 90,
    compliance_rate: 99,
  },
  {
    id: 'user-4',
    name: 'Lisa VP',
    email: 'lisa.vp@company.com',
    role: 'VP of Engineering',
    department: 'Engineering',
    team: 'Executive',
    direct_reports: ['user-3', 'user-12'],
    phone: '+1 (555) 456-7890',
    location: 'San Francisco, CA',
    timezone: 'PST',
    start_date: '2019-01-10',
    status: 'active',
    efficiency_score: 92,
    compliance_rate: 100,
  },
  {
    id: 'user-8',
    name: 'Jane Developer',
    email: 'jane.developer@company.com',
    role: 'Software Engineer',
    department: 'Engineering',
    team: 'Backend Team',
    manager_id: 'user-2',
    manager_name: 'Sarah Manager',
    direct_reports: [],
    phone: '+1 (555) 567-8901',
    location: 'Austin, TX',
    timezone: 'CST',
    start_date: '2023-08-01',
    status: 'active',
    efficiency_score: 84,
    compliance_rate: 94,
  },
  {
    id: 'user-9',
    name: 'Bob Engineer',
    email: 'bob.engineer@company.com',
    role: 'Software Engineer',
    department: 'Engineering',
    team: 'Backend Team',
    manager_id: 'user-2',
    manager_name: 'Sarah Manager',
    direct_reports: [],
    phone: '+1 (555) 678-9012',
    location: 'New York, NY',
    timezone: 'EST',
    start_date: '2024-01-15',
    status: 'active',
    efficiency_score: 82,
    compliance_rate: 92,
  },
  {
    id: 'user-10',
    name: 'Alice Frontend Lead',
    email: 'alice.lead@company.com',
    role: 'Frontend Team Lead',
    department: 'Engineering',
    team: 'Frontend Team',
    manager_id: 'user-3',
    manager_name: 'Mike Director',
    direct_reports: ['user-13', 'user-14'],
    phone: '+1 (555) 789-0123',
    location: 'Seattle, WA',
    timezone: 'PST',
    start_date: '2022-04-01',
    status: 'active',
    efficiency_score: 87,
    compliance_rate: 97,
  },
  {
    id: 'user-11',
    name: 'Tom DevOps Lead',
    email: 'tom.devops@company.com',
    role: 'DevOps Team Lead',
    department: 'Engineering',
    team: 'DevOps Team',
    manager_id: 'user-3',
    manager_name: 'Mike Director',
    direct_reports: ['user-15', 'user-16'],
    phone: '+1 (555) 890-1234',
    location: 'San Francisco, CA',
    timezone: 'PST',
    start_date: '2021-11-01',
    status: 'active',
    efficiency_score: 89,
    compliance_rate: 98,
  },
];

export const mockActivities: Activity[] = [
  {
    id: 'activity-1',
    user_id: 'user-1',
    type: 'report_submission',
    title: 'DSR Submitted',
    description: 'Daily Status Report for February 23, 2026',
    date: '2026-02-23T17:30:00Z',
    metadata: { report_id: 'dsr-1', report_type: 'DSR' },
  },
  {
    id: 'activity-2',
    user_id: 'user-1',
    type: 'goal_achievement',
    title: 'Goal Achieved',
    description: 'Completed Payment Gateway Integration',
    date: '2026-02-20T00:00:00Z',
    metadata: { goal_id: 'goal-1', goal_title: 'Complete Payment Gateway Integration' },
  },
  {
    id: 'activity-3',
    user_id: 'user-1',
    type: 'review_received',
    title: 'Review Received',
    description: 'Weekly review from Sarah Manager',
    date: '2026-02-22T18:00:00Z',
    metadata: { review_id: 'review-1', reviewer: 'Sarah Manager', rating: 'approved' },
  },
  {
    id: 'activity-4',
    user_id: 'user-1',
    type: 'blocker_resolved',
    title: 'Blocker Resolved',
    description: 'API documentation incomplete',
    date: '2026-02-21T15:00:00Z',
    metadata: { blocker_id: 'blocker-1', severity: 'S2', resolution_time: '5 days' },
  },
  {
    id: 'activity-5',
    user_id: 'user-1',
    type: 'action_completed',
    title: 'Action Completed',
    description: 'Improve code coverage to 90%',
    date: '2026-02-22T16:00:00Z',
    metadata: { action_id: 'action-5', completion_notes: 'Achieved 92% code coverage' },
  },
  {
    id: 'activity-6',
    user_id: 'user-1',
    type: 'report_submission',
    title: 'WSR Submitted',
    description: 'Weekly Status Report for Week 8, 2026',
    date: '2026-02-21T17:00:00Z',
    metadata: { report_id: 'wsr-1', report_type: 'WSR' },
  },
];

// Helper functions
export const getPersonById = (id: string): Person | undefined => {
  return mockPeople.find(p => p.id === id);
};

export const getPeopleByDepartment = (department: string): Person[] => {
  return mockPeople.filter(p => p.department === department);
};

export const getPeopleByTeam = (team: string): Person[] => {
  return mockPeople.filter(p => p.team === team);
};

export const getDirectReports = (managerId: string): Person[] => {
  return mockPeople.filter(p => p.manager_id === managerId);
};

export const getActivitiesByUser = (userId: string): Activity[] => {
  return mockActivities.filter(a => a.user_id === userId).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const searchPeople = (query: string): Person[] => {
  const lowerQuery = query.toLowerCase();
  return mockPeople.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.email.toLowerCase().includes(lowerQuery) ||
    p.role.toLowerCase().includes(lowerQuery) ||
    p.department.toLowerCase().includes(lowerQuery) ||
    p.team.toLowerCase().includes(lowerQuery)
  );
};

export const getDepartments = (): string[] => {
  return Array.from(new Set(mockPeople.map(p => p.department)));
};

export const getTeams = (): string[] => {
  return Array.from(new Set(mockPeople.map(p => p.team)));
};

export const getRoles = (): string[] => {
  return Array.from(new Set(mockPeople.map(p => p.role)));
};
