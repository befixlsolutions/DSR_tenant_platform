'use client';

import { useState } from 'react';
import { FileCheck, FileX, Edit, Download } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { KPICard } from '@/components/dashboard/KPICard';
import { TodayFocusStrip } from '@/components/dashboard/TodayFocusStrip';
import { ActionPanel } from '@/components/dashboard/ActionPanel';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export const AuditorDashboard = () => {
  const [dateRange, setDateRange] = useState('week');
  const [eventType, setEventType] = useState('all');

  // Mock data
  const submissionCoverage = 94;
  const approvalCoverage = 89;
  const editsReopens = 45;
  const exportsCount = 67;

  // Today focus items
  const focusItems = [
    { id: '1', text: 'High export volume this week (67 requests)' },
    { id: '2', text: 'Many reopens in Engineering dept (12 cases)' },
  ];

  // Action items
  const actionItems = [
    {
      id: 'action-1',
      title: 'Export Volume Spike',
      description: '67 exports this week (avg: 30)',
      badge: { text: 'Monitor', variant: 'warning' as const },
      action: () => {},
      actionLabel: 'Open Drilldown',
    },
    {
      id: 'action-2',
      title: 'Engineering Dept Reopens',
      description: '12 reports reopened in 7 days',
      badge: { text: 'Review', variant: 'info' as const },
      action: () => {},
      actionLabel: 'Generate Report',
    },
    {
      id: 'action-3',
      title: 'Role Change Activity',
      description: '5 role changes this week',
      badge: { text: 'Audit', variant: 'info' as const },
      action: () => {},
      actionLabel: 'View Chain',
    },
  ];

  // Mock audit log data
  const auditLogData = [
    { timestamp: '2026-02-23 14:30', actor: 'john.employee@company.com', event: 'DSR Submitted', object: 'DSR-2026-02-23', details: 'Report submitted on time' },
    { timestamp: '2026-02-23 14:15', actor: 'sarah.manager@company.com', event: 'DSR Approved', object: 'DSR-2026-02-22', details: 'Approved with comments' },
    { timestamp: '2026-02-23 13:45', actor: 'lisa.orgadmin@company.com', event: 'Role Changed', object: 'User: Mike', details: 'Changed from EMPLOYEE to MANAGER' },
    { timestamp: '2026-02-23 12:30', actor: 'emma.hr@company.com', event: 'Export Request', object: 'MSR Report Pack', details: 'Exported Q1 2026 data' },
    { timestamp: '2026-02-23 11:20', actor: 'john.employee@company.com', event: 'Report Reopened', object: 'DSR-2026-02-20', details: 'Reopened for corrections' },
  ];

  // Mock compliance evidence data
  const complianceData = [
    { dept: 'Engineering', submitted: 92, approved: 88, late: 8, missed: 4 },
    { dept: 'Product', submitted: 95, approved: 92, late: 5, missed: 3 },
    { dept: 'Sales', submitted: 88, approved: 85, late: 12, missed: 7 },
    { dept: 'Marketing', submitted: 96, approved: 94, late: 4, missed: 2 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Audit Dashboard"
        subtitle="Read-only compliance monitoring and audit logs"
        dateRangeOptions={[
          { label: 'Today', value: 'today' },
          { label: 'This Week', value: 'week' },
          { label: 'This Month', value: 'month' },
          { label: 'Custom', value: 'custom' },
        ]}
        selectedDateRange={dateRange}
        onDateRangeChange={setDateRange}
        onExport={() => alert('Export audit logs')}
        onHelp={() => alert('Help: Audit metrics definitions')}
      />

      {/* Today Focus Strip */}
      {focusItems.length > 0 && (
        <TodayFocusStrip
          items={focusItems}
          onAction={() => {}}
          actionLabel="View Details"
        />
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard
          label="Submission Coverage"
          value={`${submissionCoverage}%`}
          delta={{ value: '+2% vs last week', trend: 'up', isPositive: true }}
          icon={<FileCheck className="w-5 h-5" />}
          sparklineData={[90, 91, 92, 93, 93, 94, 94]}
        />
        <KPICard
          label="Approval Coverage"
          value={`${approvalCoverage}%`}
          delta={{ value: '+1% vs last week', trend: 'up', isPositive: true }}
          icon={<FileCheck className="w-5 h-5" />}
          sparklineData={[85, 86, 87, 88, 88, 89, 89]}
        />
        <KPICard
          label="Edits / Reopens"
          value={editsReopens}
          delta={{ value: '+8 vs last week', trend: 'up', isPositive: false }}
          icon={<Edit className="w-5 h-5" />}
        />
        <KPICard
          label="Exports"
          value={exportsCount}
          delta={{ value: '+37 vs avg', trend: 'up', isPositive: false }}
          icon={<Download className="w-5 h-5" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Audit Logs */}
        <div className="lg:col-span-2 space-y-4">
          {/* Audit Log Explorer */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Audit Log Explorer</CardTitle>
                <div className="flex gap-2">
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="px-3 py-1 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  >
                    <option value="all">All Events</option>
                    <option value="submission">Submissions</option>
                    <option value="approval">Approvals</option>
                    <option value="export">Exports</option>
                    <option value="role_change">Role Changes</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-2 px-3 font-medium text-neutral-700">Timestamp</th>
                      <th className="text-left py-2 px-3 font-medium text-neutral-700">Actor</th>
                      <th className="text-left py-2 px-3 font-medium text-neutral-700">Event</th>
                      <th className="text-left py-2 px-3 font-medium text-neutral-700">Object</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogData.map((row, i) => (
                      <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-2 px-3 text-xs text-neutral-600">{row.timestamp}</td>
                        <td className="py-2 px-3 text-xs text-neutral-700">{row.actor}</td>
                        <td className="py-2 px-3">
                          <span className={`badge ${
                            row.event.includes('Approved') ? 'badge-success' :
                            row.event.includes('Submitted') ? 'badge-info' :
                            row.event.includes('Export') ? 'badge-warning' :
                            'badge-info'
                          }`}>
                            {row.event}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-xs font-medium text-neutral-900">{row.object}</td>
                        <td className="text-right py-2 px-3">
                          <button className="text-xs text-primary-600 hover:text-primary-700">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="btn btn-primary">Export Logs</button>
                <button className="btn btn-secondary">Download Evidence</button>
                <button className="btn btn-ghost">View Chain</button>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Evidence Pack */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Evidence Pack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-2 px-3 font-medium text-neutral-700">Department</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Submitted %</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Approved %</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Late</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Missed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complianceData.map((row, i) => (
                      <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-2 px-3 font-medium text-neutral-900">{row.dept}</td>
                        <td className="text-right py-2 px-3">
                          <span className={`${row.submitted >= 90 ? 'text-green-600' : 'text-amber-600'}`}>
                            {row.submitted}%
                          </span>
                        </td>
                        <td className="text-right py-2 px-3">
                          <span className={`${row.approved >= 85 ? 'text-green-600' : 'text-amber-600'}`}>
                            {row.approved}%
                          </span>
                        </td>
                        <td className="text-right py-2 px-3">
                          <span className={`${row.late > 10 ? 'text-red-600' : 'text-neutral-700'}`}>
                            {row.late}
                          </span>
                        </td>
                        <td className="text-right py-2 px-3">
                          <span className={`${row.missed > 5 ? 'text-red-600' : 'text-neutral-700'}`}>
                            {row.missed}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="btn btn-primary">Generate Pack</button>
                <button className="btn btn-secondary">Download</button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sticky Action Panel */}
        <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <ActionPanel
            title="Audit Alerts"
            items={actionItems}
            emptyMessage="No anomalies detected ✓"
          />

          {/* Export Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Export Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-700">This Week</span>
                  <span className="font-semibold text-neutral-900">67</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-700">Weekly Avg</span>
                  <span className="font-semibold text-neutral-600">30</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-700">Variance</span>
                  <span className="font-semibold text-amber-600">+123%</span>
                </div>
              </div>
              <div className="mt-4">
                <button className="btn btn-secondary w-full text-xs">View Export Logs</button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <button className="btn btn-ghost w-full text-xs justify-start">All Events</button>
                <button className="btn btn-ghost w-full text-xs justify-start">Submissions Only</button>
                <button className="btn btn-ghost w-full text-xs justify-start">Approvals Only</button>
                <button className="btn btn-ghost w-full text-xs justify-start">Exports Only</button>
                <button className="btn btn-ghost w-full text-xs justify-start">Role Changes</button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
