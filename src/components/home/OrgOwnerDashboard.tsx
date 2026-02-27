'use client';

import { useState } from 'react';
import { CreditCard, Sparkles, Users, AlertTriangle, BrainCircuit } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { TodayFocusStrip } from '@/components/dashboard/TodayFocusStrip';
import { ActionPanel } from '@/components/dashboard/ActionPanel';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export const OrgOwnerDashboard = () => {
  const [dateRange, setDateRange] = useState('month');

  // Mock data
  const seatsUsed = 248;
  const seatsLimit = 300;
  const renewalDays = 45;
  const orgCompliance = 92;
  const riskIndex = 23;

  const topCards = [
    {
      label: 'Plan Utilization',
      value: `${seatsUsed}/${seatsLimit}`,
      subtext: '83% seats in use',
      gradient: 'from-indigo-500 to-blue-500',
      icon: Users,
    },
    {
      label: 'Renewal Window',
      value: `${renewalDays} Days`,
      subtext: 'Enterprise annual cycle',
      gradient: 'from-emerald-500 to-cyan-500',
      icon: CreditCard,
    },
    {
      label: 'Risk Index',
      value: `${riskIndex}`,
      subtext: `${orgCompliance}% compliance health`,
      gradient: 'from-amber-500 to-rose-500',
      icon: AlertTriangle,
    },
  ];

  const complianceTrendData = [
    { name: 'W1', value: 88 },
    { name: 'W2', value: 90 },
    { name: 'W3', value: 91 },
    { name: 'W4', value: 92 },
  ];

  const bottleneckData = [
    { team: 'Platform', count: 6 },
    { team: 'Operations', count: 4 },
    { team: 'People', count: 3 },
    { team: 'Finance', count: 2 },
  ];

  const riskDistributionData = [
    { name: 'Critical', value: 8, color: '#ef4444' },
    { name: 'High', value: 7, color: '#f59e0b' },
    { name: 'Medium', value: 5, color: '#0ea5e9' },
    { name: 'Low', value: 3, color: '#22c55e' },
  ];

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className={`rounded-2xl bg-gradient-to-br ${card.gradient} p-[1px] shadow-sm`}
            >
              <div className="h-full rounded-2xl bg-white/95 backdrop-blur-sm p-5 flex items-start justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-widest font-bold text-neutral-500">{card.label}</p>
                  <p className="text-3xl font-bold text-neutral-900 mt-2">{card.value}</p>
                  <p className="text-xs text-neutral-600 mt-1">{card.subtext}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} text-white shadow-lg`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
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

          <Card>
            <CardHeader>
              <CardTitle>Leadership Intelligence Studio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="rounded-xl border border-neutral-200 p-3">
                  <p className="text-xs font-semibold text-neutral-500 mb-2">Org Compliance Curve</p>
                  <div className="h-44">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={complianceTrendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                        <YAxis domain={[80, 100]} tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="rounded-xl border border-neutral-200 p-3">
                  <p className="text-xs font-semibold text-neutral-500 mb-2">Bottleneck Leaders</p>
                  <div className="h-44">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={bottleneckData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="team" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="rounded-xl border border-neutral-200 p-3">
                  <p className="text-xs font-semibold text-neutral-500 mb-2">Risk Distribution</p>
                  <div className="h-44">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={riskDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={62} innerRadius={35}>
                          {riskDistributionData.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
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
            className="min-h-[240px]"
          />

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-primary-600" />
                AI Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-primary-50 border border-primary-100">
                  <p className="text-sm font-medium text-primary-900">Weekly AI Leadership Brief</p>
                  <p className="text-xs text-primary-700 mt-1">Auto-generated summary for risk, reliability, and upcoming actions.</p>
                </div>
                <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                  <p className="text-sm font-medium text-neutral-900">Anomaly Watchlist</p>
                  <p className="text-xs text-neutral-600 mt-1">2 unusual blocker spikes and 1 review delay cluster detected.</p>
                </div>
                <button className="btn btn-primary w-full text-xs flex items-center justify-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Generate AI Executive Report
                </button>
              </div>
            </CardContent>
          </Card>

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
