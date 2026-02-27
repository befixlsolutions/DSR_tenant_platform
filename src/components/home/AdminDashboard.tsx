'use client';

import { useState } from 'react';
import { Users, FileText, Target, AlertTriangle, Settings, Zap } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { KPICard } from '@/components/dashboard/KPICard';
import { TodayFocusStrip } from '@/components/dashboard/TodayFocusStrip';
import { ActionPanel } from '@/components/dashboard/ActionPanel';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { ComplianceTrendChart } from '@/components/charts/ComplianceTrendChart';
import { Clock } from 'lucide-react';

export const AdminDashboard = () => {
  const [scope, setScope] = useState('org');
  const [dateRange, setDateRange] = useState('today');

  // Mock data
  const orgCompliance = 92;
  const templateAdoption = 95;
  const automationHealth = 98;
  const integrationsConnected = 5;

  // Today focus items
  const focusItems = [
    { id: '1', text: '2 automations failing (notification service)' },
    { id: '2', text: 'High export volume this week (45 requests)' },
  ];

  // Admin action items
  const actionItems = [
    {
      id: 'action-1',
      title: 'Notification Automation Failing',
      description: '2 jobs failed in last 24h',
      badge: { text: 'Critical', variant: 'danger' as const },
      action: () => { },
      actionLabel: 'Fix Now',
    },
    {
      id: 'action-2',
      title: 'Export Volume Spike',
      description: '45 exports this week (avg: 20)',
      badge: { text: 'Monitor', variant: 'warning' as const },
      action: () => { },
      actionLabel: 'View Logs',
    },
    {
      id: 'action-3',
      title: 'Template Update Available',
      description: 'DSR template v2.1 ready',
      badge: { text: 'Update', variant: 'info' as const },
      action: () => { },
      actionLabel: 'Review',
    },
  ];

  // Mock template data
  const templateData = [
    { name: 'DSR Template', version: 'v2.0', active: 248, reworkRate: 8, missingFields: 2 },
    { name: 'WSR Template', version: 'v1.5', active: 248, reworkRate: 12, missingFields: 5 },
    { name: 'MSR Template', version: 'v1.8', active: 248, reworkRate: 6, missingFields: 1 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Page Header */}
      <PageHeader
        title="Admin Control Center"
        subtitle="System-wide operations, governance, and configuration control"
        scopeOptions={[
          { label: 'Entire Organization', value: 'org' },
          { label: 'By Individual Department', value: 'dept' },
        ]}
        selectedScope={scope}
        onScopeChange={setScope}
        dateRangeOptions={[
          { label: 'Today', value: 'today' },
          { label: 'This Week', value: 'week' },
          { label: 'This Month', value: 'month' },
        ]}
        selectedDateRange={dateRange}
        onDateRangeChange={setDateRange}
        onExport={() => alert('Exporting organization governance report...')}
      />

      {/* Today Focus Strip - Refreshed */}
      {focusItems.length > 0 && (
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000" />
          <TodayFocusStrip
            items={focusItems}
            onAction={() => { }}
            actionLabel="Review System Alerts"
          />
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          label="Organization Compliance"
          value={`${orgCompliance}%`}
          delta={{ value: '+1% vs last week', trend: 'up', isPositive: true }}
          icon={<Users className="w-5 h-5" />}
          sparklineData={[89, 90, 91, 91, 92, 92, 92]}
        />
        <KPICard
          label="Template Adoption"
          value={`${templateAdoption}%`}
          delta={{ value: '248 active users', trend: 'up', isPositive: true }}
          icon={<FileText className="w-5 h-5" />}
        />
        <KPICard
          label="Automation Stability"
          value={`${automationHealth}%`}
          delta={{ value: '2 jobs failing', trend: 'down', isPositive: false }}
          icon={<Zap className="w-5 h-5 text-indigo-500" />}
          sparklineData={[100, 100, 98, 98, 98, 98, 98]}
        />
        <KPICard
          label="Active Integrations"
          value={integrationsConnected}
          delta={{ value: 'All systems green', trend: 'up', isPositive: true }}
          icon={<Settings className="w-5 h-5 text-neutral-500" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Analytics */}
        <div className="lg:col-span-2 space-y-4">
          {/* Org Compliance Trend */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Organization Compliance Trend</CardTitle>
                <div className="flex items-center gap-4 text-xs font-medium">
                  <div className="flex items-center gap-1.5 ">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-neutral-600">On-Time</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-neutral-600">Late</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ComplianceTrendChart />
              <div className="mt-8 grid grid-cols-3 gap-6">
                <div className="relative p-4 bg-green-50/50 rounded-2xl border border-green-100 overflow-hidden group">
                  <div className="absolute -right-2 -bottom-2 opacity-10 group-hover:scale-120 transition-transform duration-500">
                    <Users className="w-12 h-12 text-green-600" />
                  </div>
                  <p className="text-[10px] font-bold text-green-700 uppercase tracking-widest">Today On-Time</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">228</p>
                </div>
                <div className="relative p-4 bg-amber-50/50 rounded-2xl border border-amber-100 overflow-hidden group">
                  <div className="absolute -right-2 -bottom-2 opacity-10 group-hover:scale-120 transition-transform duration-500">
                    <Clock className="w-12 h-12 text-amber-600" />
                  </div>
                  <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">Today Late</p>
                  <p className="text-2xl font-bold text-amber-600 mt-1">15</p>
                </div>
                <div className="relative p-4 bg-red-50/50 rounded-2xl border border-red-100 overflow-hidden group">
                  <div className="absolute -right-2 -bottom-2 opacity-10 group-hover:scale-120 transition-transform duration-500">
                    <AlertTriangle className="w-12 h-12 text-red-600" />
                  </div>
                  <p className="text-[10px] font-bold text-red-700 uppercase tracking-widest">Today Missed</p>
                  <p className="text-2xl font-bold text-red-600 mt-1">5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Template & Policy Health */}
          <Card>
            <CardHeader>
              <CardTitle>Template & Policy Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-2 px-3 font-medium text-neutral-700">Template</th>
                      <th className="text-center py-2 px-3 font-medium text-neutral-700">Version</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Active</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Rework %</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Missing Fields</th>
                    </tr>
                  </thead>
                  <tbody>
                    {templateData.map((row, i) => (
                      <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-2 px-3 font-medium text-neutral-900">{row.name}</td>
                        <td className="text-center py-2 px-3">
                          <span className="badge badge-info">{row.version}</span>
                        </td>
                        <td className="text-right py-2 px-3 text-neutral-700">{row.active}</td>
                        <td className="text-right py-2 px-3">
                          <span className={`${row.reworkRate < 10 ? 'text-green-600' : 'text-amber-600'}`}>
                            {row.reworkRate}%
                          </span>
                        </td>
                        <td className="text-right py-2 px-3">
                          <span className={`${row.missingFields < 3 ? 'text-green-600' : 'text-red-600'}`}>
                            {row.missingFields}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="btn btn-primary">Edit Template</button>
                <button className="btn btn-secondary">Publish Version</button>
                <button className="btn btn-ghost">Preview Impact</button>
              </div>
            </CardContent>
          </Card>

          {/* Automation & Notification Health */}
          <Card>
            <CardHeader>
              <CardTitle>Automation & Notification Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Success Rate</p>
                    <p className="text-xs text-neutral-600">Last 24 hours</p>
                  </div>
                  <p className="text-2xl font-semibold text-green-600">98%</p>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p className="text-sm font-medium text-red-900">Failed Jobs</p>
                    <p className="text-xs text-red-600">Notification service</p>
                  </div>
                  <p className="text-2xl font-semibold text-red-600">2</p>
                </div>
                <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Spam Guard Triggers</p>
                    <p className="text-xs text-neutral-600">Rate limiting active</p>
                  </div>
                  <p className="text-2xl font-semibold text-neutral-900">0</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="btn btn-primary">View Runs</button>
                <button className="btn btn-secondary">Disable Automation</button>
                <button className="btn btn-ghost">Adjust Quiet Hours</button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sticky Action Panel */}
        <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <ActionPanel
            title="Admin Actions"
            items={actionItems}
            emptyMessage="All systems operational! ✅"
          />

          {/* Audit & Governance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Audit & Governance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-700">Export Logs</span>
                  <span className="font-semibold text-neutral-900">45</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-700">Role Changes</span>
                  <span className="font-semibold text-neutral-900">3</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-700">Sensitive Access</span>
                  <span className="font-semibold text-neutral-900">12</span>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <button className="btn btn-secondary w-full text-xs">Open Audit Logs</button>
                <button className="btn btn-ghost w-full text-xs">Export Audit</button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
