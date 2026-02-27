'use client';

import { useState } from 'react';
import { CreditCard, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { KPICard } from '@/components/dashboard/KPICard';
import { TodayFocusStrip } from '@/components/dashboard/TodayFocusStrip';
import { ActionPanel } from '@/components/dashboard/ActionPanel';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export const OrgOwnerDashboard = () => {
  const [dateRange, setDateRange] = useState('month');

  // Mock data
  const seatsUsed = 248;
  const seatsLimit = 300;
  const renewalDays = 45;
  const orgCompliance = 92;
  const riskIndex = 23;

  // Today focus items
  const focusItems = [
    { id: '1', text: 'Renewal in 45 days - review plan options' },
    { id: '2', text: 'Seat usage at 83% - consider upgrade' },
  ];

  // Action items
  const actionItems = [
    {
      id: 'action-1',
      title: 'Renewal Approaching',
      description: '45 days until renewal date',
      badge: { text: 'Plan Ahead', variant: 'warning' as const },
      action: () => {},
      actionLabel: 'Review Plans',
    },
    {
      id: 'action-2',
      title: 'Seat Limit Nearing',
      description: '248/300 seats used (83%)',
      badge: { text: 'Monitor', variant: 'info' as const },
      action: () => {},
      actionLabel: 'Add Seats',
    },
    {
      id: 'action-3',
      title: 'High Risk Index',
      description: '23 critical blockers org-wide',
      badge: { text: 'Review', variant: 'warning' as const },
      action: () => {},
      actionLabel: 'View Report',
    },
  ];

  // Mock invoice data
  const invoiceData = [
    { date: '2026-01-01', amount: '$2,400', status: 'Paid', plan: 'Enterprise' },
    { date: '2025-12-01', amount: '$2,400', status: 'Paid', plan: 'Enterprise' },
    { date: '2025-11-01', amount: '$2,400', status: 'Paid', plan: 'Enterprise' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Organization Overview"
        subtitle="Business health, billing, and executive insights"
        dateRangeOptions={[
          { label: 'This Month', value: 'month' },
          { label: 'This Quarter', value: 'quarter' },
          { label: 'This Year', value: 'year' },
        ]}
        selectedDateRange={dateRange}
        onDateRangeChange={setDateRange}
        onExport={() => alert('Export executive report')}
        onHelp={() => alert('Help: Executive metrics definitions')}
      />

      {/* Today Focus Strip */}
      {focusItems.length > 0 && (
        <TodayFocusStrip
          items={focusItems}
          onAction={() => {}}
          actionLabel="Manage Billing"
        />
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard
          label="Plan & Seats"
          value={`${seatsUsed}/${seatsLimit}`}
          delta={{ value: '83% utilized', trend: 'up', isPositive: true }}
          icon={<Users className="w-5 h-5" />}
        />
        <KPICard
          label="Renewal"
          value={`${renewalDays} days`}
          delta={{ value: 'Enterprise plan', trend: 'up', isPositive: true }}
          icon={<CreditCard className="w-5 h-5" />}
        />
        <KPICard
          label="Org Compliance"
          value={`${orgCompliance}%`}
          delta={{ value: '+1% vs last month', trend: 'up', isPositive: true }}
          icon={<TrendingUp className="w-5 h-5" />}
          sparklineData={[89, 90, 91, 91, 92, 92, 92]}
        />
        <KPICard
          label="Risk Index"
          value={riskIndex}
          delta={{ value: '23 critical items', trend: 'down', isPositive: false }}
          icon={<AlertTriangle className="w-5 h-5" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Business & Analytics */}
        <div className="lg:col-span-2 space-y-4">
          {/* Billing Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-primary-50 rounded-lg">
                  <p className="text-xs text-primary-700 mb-1">Current Plan</p>
                  <p className="text-xl font-semibold text-primary-900">Enterprise</p>
                  <p className="text-xs text-primary-600 mt-1">$2,400/month</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <p className="text-xs text-neutral-600 mb-1">Seats Used</p>
                  <p className="text-xl font-semibold text-neutral-900">248 / 300</p>
                  <p className="text-xs text-neutral-600 mt-1">52 seats available</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-700">Base Plan</span>
                  <span className="font-medium text-neutral-900">$2,000</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-700">Add-ons Enabled</span>
                  <span className="font-medium text-neutral-900">$400</span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-neutral-200">
                  <span className="font-medium text-neutral-900">Total Monthly</span>
                  <span className="font-semibold text-neutral-900">$2,400</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="btn btn-primary">Upgrade Plan</button>
                <button className="btn btn-secondary">Add Seats</button>
                <button className="btn btn-ghost">Enable Add-ons</button>
              </div>
            </CardContent>
          </Card>

          {/* Invoice History */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-2 px-3 font-medium text-neutral-700">Date</th>
                      <th className="text-left py-2 px-3 font-medium text-neutral-700">Plan</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Amount</th>
                      <th className="text-center py-2 px-3 font-medium text-neutral-700">Status</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.map((row, i) => (
                      <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-2 px-3 text-neutral-700">{row.date}</td>
                        <td className="py-2 px-3 text-neutral-700">{row.plan}</td>
                        <td className="text-right py-2 px-3 font-medium text-neutral-900">{row.amount}</td>
                        <td className="text-center py-2 px-3">
                          <span className="badge badge-success">{row.status}</span>
                        </td>
                        <td className="text-right py-2 px-3">
                          <button className="text-xs text-primary-600 hover:text-primary-700">Download</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Executive Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Executive Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-green-900">Compliance Trend</p>
                    <span className="text-xl font-semibold text-green-600">↑ 92%</span>
                  </div>
                  <p className="text-xs text-green-700">+1% improvement vs last month</p>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-amber-900">Bottleneck Leaderboard</p>
                    <span className="text-xl font-semibold text-amber-600">3 teams</span>
                  </div>
                  <p className="text-xs text-amber-700">Below 70% compliance threshold</p>
                </div>

                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-red-900">Escalations Overview</p>
                    <span className="text-xl font-semibold text-red-600">8 active</span>
                  </div>
                  <p className="text-xs text-red-700">S0/S1 incidents requiring attention</p>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <button className="btn btn-primary">Export Executive Report</button>
                <button className="btn btn-secondary">Open Leadership Dashboard</button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sticky Action Panel */}
        <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <ActionPanel
            title="Owner Actions"
            items={actionItems}
            emptyMessage="All business metrics healthy! 📈"
          />

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <button className="btn btn-secondary w-full text-xs">Extend Trial</button>
                <button className="btn btn-secondary w-full text-xs">Contact Support</button>
                <button className="btn btn-ghost w-full text-xs">View Documentation</button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
