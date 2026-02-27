'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CreditCard, 
  Download,
  TrendingUp,
  Users,
  Database,
  Zap,
  Check,
  Crown,
  Calendar,
  DollarSign,
  FileText,
} from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  mockPlans,
  mockSubscription,
  mockUsageMetrics,
  mockInvoices,
  mockPaymentMethods,
  addOns,
  type Plan,
  type Invoice,
} from '@/lib/mock-data/billing';
import { showSuccess, showInfo } from '@/lib/utils/toast';

export default function BillingPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'plans' | 'invoices' | 'payment'>('overview');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const currentPlan = mockPlans.find(p => p.id === mockSubscription.plan)!;

  const handleUpgrade = (plan: Plan) => {
    showSuccess(`Upgrading to ${plan.name} plan...`);
  };

  const handleDowngrade = (plan: Plan) => {
    if (confirm(`Are you sure you want to downgrade to ${plan.name}?`)) {
      showSuccess(`Downgrading to ${plan.name} plan...`);
    }
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    showSuccess(`Downloading invoice ${invoice.invoiceNumber}...`);
  };

  const handleAddPaymentMethod = () => {
    showInfo('Add payment method functionality coming soon');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing & Subscription"
        subtitle="Manage your subscription and billing information"
        showExport={false}
        showHelp={true}
        onHelp={() => showInfo('View and manage your subscription, usage, and billing')}
      />

      {/* Tabs */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 border-b border-neutral-200 -mb-6 pb-4">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                selectedTab === 'overview'
                  ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedTab('plans')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                selectedTab === 'plans'
                  ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Plans & Pricing
            </button>
            <button
              onClick={() => setSelectedTab('invoices')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                selectedTab === 'invoices'
                  ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Invoices
            </button>
            <button
              onClick={() => setSelectedTab('payment')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                selectedTab === 'payment'
                  ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Payment Methods
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Current Plan */}
          <Card className="border-l-4 border-l-primary-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-primary-600" />
                    Current Plan: {currentPlan.name}
                  </CardTitle>
                  <p className="text-sm text-neutral-600 mt-1">{currentPlan.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary-600">
                    {formatCurrency(currentPlan.price[mockSubscription.billingCycle])}
                  </p>
                  <p className="text-sm text-neutral-600">
                    per {mockSubscription.billingCycle === 'annual' ? 'year' : 'month'}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-neutral-600 mb-1">Status</p>
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded capitalize">
                    {mockSubscription.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-neutral-600 mb-1">Billing Cycle</p>
                  <p className="text-sm font-medium text-neutral-900 capitalize">{mockSubscription.billingCycle}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-600 mb-1">Next Billing Date</p>
                  <p className="text-sm font-medium text-neutral-900">{formatDate(mockSubscription.currentPeriodEnd)}</p>
                </div>
              </div>
              <Button variant="primary" size="sm" onClick={() => setSelectedTab('plans')}>
                Change Plan
              </Button>
            </CardContent>
          </Card>

          {/* Usage Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Usage This Period</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Users */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-neutral-600" />
                      <span className="text-sm font-medium text-neutral-700">Users</span>
                    </div>
                    <span className="text-sm text-neutral-600">
                      {mockUsageMetrics.users.current} / {mockUsageMetrics.users.limit === 'unlimited' ? '∞' : mockUsageMetrics.users.limit}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all"
                      style={{ width: `${mockUsageMetrics.users.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Storage */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-neutral-600" />
                      <span className="text-sm font-medium text-neutral-700">Storage</span>
                    </div>
                    <span className="text-sm text-neutral-600">
                      {mockUsageMetrics.storage.current} GB / {mockUsageMetrics.storage.limit === 'unlimited' ? '∞' : `${mockUsageMetrics.storage.limit} GB`}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${mockUsageMetrics.storage.percentage}%` }}
                    />
                  </div>
                </div>

                {/* API Calls */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-neutral-600" />
                      <span className="text-sm font-medium text-neutral-700">API Calls (Today)</span>
                    </div>
                    <span className="text-sm text-neutral-600">
                      {mockUsageMetrics.apiCalls.current.toLocaleString()} / {mockUsageMetrics.apiCalls.limit === 'unlimited' ? '∞' : mockUsageMetrics.apiCalls.limit.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div 
                      className="bg-amber-600 h-2 rounded-full transition-all"
                      style={{ width: `${mockUsageMetrics.apiCalls.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Invoices */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Invoices</CardTitle>
                <Button variant="secondary" size="sm" onClick={() => setSelectedTab('invoices')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockInvoices.slice(0, 3).map(invoice => (
                  <div key={invoice.id} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{invoice.invoiceNumber}</p>
                      <p className="text-xs text-neutral-600">{formatDate(invoice.date)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-neutral-900">{formatCurrency(invoice.amount)}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded capitalize ${
                        invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                        invoice.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {invoice.status}
                      </span>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleDownloadInvoice(invoice)}
                        leftIcon={<Download className="w-4 h-4" />}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Plans Tab */}
      {selectedTab === 'plans' && (
        <div className="space-y-6">
          {/* Billing Cycle Toggle */}
          <Card>
            <CardContent>
              <div className="flex items-center justify-center gap-4">
                <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-neutral-900' : 'text-neutral-600'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-neutral-900' : 'text-neutral-600'}`}>
                  Annual
                  <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded">Save 17%</span>
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockPlans.map(plan => (
              <Card 
                key={plan.id}
                className={`${plan.popular ? 'border-2 border-primary-500 shadow-lg' : ''} ${
                  plan.id === currentPlan.id ? 'bg-primary-50' : ''
                }`}
              >
                <CardContent>
                  {plan.popular && (
                    <div className="mb-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-primary-600 text-white rounded">
                        <TrendingUp className="w-3 h-3" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{plan.name}</h3>
                  <p className="text-sm text-neutral-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-neutral-900">
                      {formatCurrency(plan.price[billingCycle])}
                    </span>
                    <span className="text-sm text-neutral-600">
                      /{billingCycle === 'annual' ? 'year' : 'month'}
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.id === currentPlan.id ? (
                    <Button variant="secondary" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : plan.price[billingCycle] > currentPlan.price[billingCycle] ? (
                    <Button variant="primary" className="w-full" onClick={() => handleUpgrade(plan)}>
                      Upgrade
                    </Button>
                  ) : (
                    <Button variant="secondary" className="w-full" onClick={() => handleDowngrade(plan)}>
                      Downgrade
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add-ons */}
          <Card>
            <CardHeader>
              <CardTitle>Add-ons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addOns.map(addon => (
                  <div key={addon.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{addon.name}</p>
                      <p className="text-xs text-neutral-600">{addon.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-neutral-900">{formatCurrency(addon.price)}</p>
                      <p className="text-xs text-neutral-600">{addon.unit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Invoices Tab */}
      {selectedTab === 'invoices' && (
        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Invoice</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {mockInvoices.map(invoice => (
                    <tr key={invoice.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3 text-sm font-medium text-neutral-900">{invoice.invoiceNumber}</td>
                      <td className="px-4 py-3 text-sm text-neutral-700">{formatDate(invoice.date)}</td>
                      <td className="px-4 py-3 text-sm font-medium text-neutral-900">{formatCurrency(invoice.amount)}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded capitalize ${
                          invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                          invoice.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleDownloadInvoice(invoice)}
                          leftIcon={<Download className="w-4 h-4" />}
                        >
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Methods Tab */}
      {selectedTab === 'payment' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Payment Methods</CardTitle>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddPaymentMethod}
                leftIcon={<CreditCard className="w-4 h-4" />}
              >
                Add Payment Method
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockPaymentMethods.map(method => (
                <div key={method.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <CreditCard className="w-8 h-8 text-neutral-600" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-neutral-900">
                          {method.cardBrand} •••• {method.cardLast4}
                        </p>
                        {method.isDefault && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-600">Expires {method.cardExpiry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!method.isDefault && (
                      <Button variant="secondary" size="sm">
                        Set as Default
                      </Button>
                    )}
                    <Button variant="secondary" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
