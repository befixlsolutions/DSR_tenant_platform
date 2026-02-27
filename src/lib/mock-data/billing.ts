// Mock data for Billing & Subscription module

export type PlanTier = 'free' | 'starter' | 'pro' | 'enterprise';
export type BillingCycle = 'monthly' | 'annual';
export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'failed';
export type PaymentMethod = 'card' | 'bank_transfer' | 'invoice';

export interface Plan {
  id: PlanTier;
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: string[];
  limits: {
    users: number | 'unlimited';
    storage: string;
    history: string;
    reports: string;
    integrations: number | 'unlimited';
    apiCalls: string;
  };
  popular?: boolean;
}

export interface Subscription {
  id: string;
  plan: PlanTier;
  billingCycle: BillingCycle;
  status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  startDate: Date;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  trialEnd?: Date;
}

export interface UsageMetrics {
  users: {
    current: number;
    limit: number | 'unlimited';
    percentage: number;
  };
  storage: {
    current: number; // in GB
    limit: number | 'unlimited';
    percentage: number;
  };
  apiCalls: {
    current: number;
    limit: number | 'unlimited';
    percentage: number;
  };
  reports: {
    current: number;
    limit: number | 'unlimited';
    percentage: number;
  };
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: Date;
  dueDate: Date;
  amount: number;
  status: InvoiceStatus;
  paidDate?: Date;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  downloadUrl?: string;
}

export interface PaymentMethodData {
  id: string;
  type: PaymentMethod;
  isDefault: boolean;
  cardLast4?: string;
  cardBrand?: string;
  cardExpiry?: string;
  bankName?: string;
  bankLast4?: string;
  createdAt: Date;
}

export const mockPlans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for trying out the platform',
    price: {
      monthly: 0,
      annual: 0,
    },
    features: [
      'Up to 5 users',
      'Basic reporting (DSR)',
      '30-day history',
      'Email support',
      'Basic analytics',
    ],
    limits: {
      users: 5,
      storage: '1 GB',
      history: '30 days',
      reports: 'DSR only',
      integrations: 0,
      apiCalls: '100/day',
    },
  },
  {
    id: 'starter',
    name: 'Starter',
    description: 'For small teams getting started',
    price: {
      monthly: 29,
      annual: 290, // ~$24/month
    },
    features: [
      'Up to 25 users',
      'All report types (DSR, WSR, MSR)',
      'Structured goals (GLS)',
      'Auto MSR generation',
      'Basic dashboards',
      '90-day history',
      'Priority email support',
      'Basic integrations (2)',
    ],
    limits: {
      users: 25,
      storage: '10 GB',
      history: '90 days',
      reports: 'All types',
      integrations: 2,
      apiCalls: '1,000/day',
    },
    popular: true,
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'For growing teams with advanced needs',
    price: {
      monthly: 99,
      annual: 990, // ~$82.50/month
    },
    features: [
      'Up to 100 users',
      'All Starter features',
      'Employee Efficiency Scoring',
      'Manager dashboards',
      'Appraisal system',
      'Template builder',
      'Advanced analytics',
      '1-year history',
      'Priority support + chat',
      'All integrations (unlimited)',
      'Custom workflows',
    ],
    limits: {
      users: 100,
      storage: '100 GB',
      history: '1 year',
      reports: 'All types',
      integrations: 'unlimited',
      apiCalls: '10,000/day',
    },
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    price: {
      monthly: 299,
      annual: 2990, // ~$249/month
    },
    features: [
      'Unlimited users',
      'All Pro features',
      'Governance & compliance',
      'SSO (SAML, OAuth)',
      'Audit logs',
      'Data retention policies',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
      'Custom training',
      'API access',
      'White-label options',
    ],
    limits: {
      users: 'unlimited',
      storage: 'Unlimited',
      history: 'Unlimited',
      reports: 'All types',
      integrations: 'unlimited',
      apiCalls: 'Unlimited',
    },
  },
];

export const mockSubscription: Subscription = {
  id: 'sub-001',
  plan: 'pro',
  billingCycle: 'annual',
  status: 'active',
  startDate: new Date('2025-12-01T00:00:00'),
  currentPeriodStart: new Date('2025-12-01T00:00:00'),
  currentPeriodEnd: new Date('2026-11-30T23:59:59'),
  cancelAtPeriodEnd: false,
};

export const mockUsageMetrics: UsageMetrics = {
  users: {
    current: 45,
    limit: 100,
    percentage: 45,
  },
  storage: {
    current: 23.5,
    limit: 100,
    percentage: 23.5,
  },
  apiCalls: {
    current: 3250,
    limit: 10000,
    percentage: 32.5,
  },
  reports: {
    current: 1250,
    limit: 'unlimited',
    percentage: 0,
  },
};

export const mockInvoices: Invoice[] = [
  {
    id: 'inv-001',
    invoiceNumber: 'INV-2026-001',
    date: new Date('2026-02-01T00:00:00'),
    dueDate: new Date('2026-02-15T00:00:00'),
    amount: 99.00,
    status: 'paid',
    paidDate: new Date('2026-02-03T10:30:00'),
    items: [
      {
        description: 'Professional Plan - Monthly',
        quantity: 1,
        unitPrice: 99.00,
        total: 99.00,
      },
    ],
    downloadUrl: '/invoices/INV-2026-001.pdf',
  },
  {
    id: 'inv-002',
    invoiceNumber: 'INV-2026-002',
    date: new Date('2026-01-01T00:00:00'),
    dueDate: new Date('2026-01-15T00:00:00'),
    amount: 99.00,
    status: 'paid',
    paidDate: new Date('2026-01-05T14:20:00'),
    items: [
      {
        description: 'Professional Plan - Monthly',
        quantity: 1,
        unitPrice: 99.00,
        total: 99.00,
      },
    ],
    downloadUrl: '/invoices/INV-2026-002.pdf',
  },
  {
    id: 'inv-003',
    invoiceNumber: 'INV-2025-012',
    date: new Date('2025-12-01T00:00:00'),
    dueDate: new Date('2025-12-15T00:00:00'),
    amount: 990.00,
    status: 'paid',
    paidDate: new Date('2025-12-02T09:15:00'),
    items: [
      {
        description: 'Professional Plan - Annual',
        quantity: 1,
        unitPrice: 990.00,
        total: 990.00,
      },
    ],
    downloadUrl: '/invoices/INV-2025-012.pdf',
  },
  {
    id: 'inv-004',
    invoiceNumber: 'INV-2025-011',
    date: new Date('2025-11-01T00:00:00'),
    dueDate: new Date('2025-11-15T00:00:00'),
    amount: 99.00,
    status: 'paid',
    paidDate: new Date('2025-11-04T11:45:00'),
    items: [
      {
        description: 'Professional Plan - Monthly',
        quantity: 1,
        unitPrice: 99.00,
        total: 99.00,
      },
    ],
    downloadUrl: '/invoices/INV-2025-011.pdf',
  },
  {
    id: 'inv-005',
    invoiceNumber: 'INV-2025-010',
    date: new Date('2025-10-01T00:00:00'),
    dueDate: new Date('2025-10-15T00:00:00'),
    amount: 99.00,
    status: 'paid',
    paidDate: new Date('2025-10-06T16:30:00'),
    items: [
      {
        description: 'Professional Plan - Monthly',
        quantity: 1,
        unitPrice: 99.00,
        total: 99.00,
      },
    ],
    downloadUrl: '/invoices/INV-2025-010.pdf',
  },
];

export const mockPaymentMethods: PaymentMethodData[] = [
  {
    id: 'pm-001',
    type: 'card',
    isDefault: true,
    cardLast4: '4242',
    cardBrand: 'Visa',
    cardExpiry: '12/2027',
    createdAt: new Date('2025-12-01T00:00:00'),
  },
  {
    id: 'pm-002',
    type: 'card',
    isDefault: false,
    cardLast4: '5555',
    cardBrand: 'Mastercard',
    cardExpiry: '06/2026',
    createdAt: new Date('2025-06-15T00:00:00'),
  },
];

export const addOns = [
  {
    id: 'addon-storage',
    name: 'Additional Storage',
    description: '100 GB extra storage',
    price: 10,
    unit: 'per month',
  },
  {
    id: 'addon-users',
    name: 'Additional Users',
    description: '10 extra user seats',
    price: 20,
    unit: 'per month',
  },
  {
    id: 'addon-api',
    name: 'API Access',
    description: 'Increased API rate limits',
    price: 50,
    unit: 'per month',
  },
  {
    id: 'addon-support',
    name: 'Premium Support',
    description: '24/7 phone support',
    price: 100,
    unit: 'per month',
  },
];
