'use client';

import { useState } from 'react';
import { TrendingUp, Award, Users, AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { KPICard } from '@/components/dashboard/KPICard';
import { TodayFocusStrip } from '@/components/dashboard/TodayFocusStrip';
import { ActionPanel } from '@/components/dashboard/ActionPanel';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export const HRDashboard = () => {
  const [scope, setScope] = useState('org');
  const [dateRange, setDateRange] = useState('month');

  // Mock data
  const orgCompliance = 94;
  const appraisalReadiness = 87;
  const managerAccountability = 91;
  const calibrationFlags = 12;

  // Today focus items
  const focusItems = [
    { id: '1', text: 'Appraisal cycle closing in 5 days' },
    { id: '2', text: '14 manager reviews pending' },
    { id: '3', text: '3 departments below 70% threshold' },
  ];

  // HR action items
  const actionItems = [
    {
      id: 'action-1',
      title: 'Appraisal Cycle Deadline',
      description: '5 days remaining, 87% complete',
      badge: { text: 'Urgent', variant: 'warning' as const },
      action: () => {},
      actionLabel: 'Open Cycle',
    },
    {
      id: 'action-2',
      title: 'Manager Reviews Pending',
      description: '14 reviews overdue by 2+ days',
      badge: { text: 'Action Needed', variant: 'danger' as const },
      action: () => {},
      actionLabel: 'Send Reminders',
    },
    {
      id: 'action-3',
      title: 'Engineering Dept Below Threshold',
      description: '68% compliance, target 70%',
      badge: { text: 'At Risk', variant: 'warning' as const },
      action: () => {},
      actionLabel: 'View Details',
    },
    {
      id: 'action-4',
      title: 'Calibration Outliers',
      description: '12 cases need review',
      badge: { text: 'Review', variant: 'info' as const },
      action: () => {},
      actionLabel: 'Open Flags',
    },
  ];

  // Mock table data
  const appraisalReadinessData = [
    { dept: 'Engineering', coverage: 92, evidence: 88, managerReviews: 3, employeeReflections: 5 },
    { dept: 'Product', coverage: 95, evidence: 91, managerReviews: 1, employeeReflections: 2 },
    { dept: 'Sales', coverage: 88, evidence: 85, managerReviews: 5, employeeReflections: 8 },
    { dept: 'Marketing', coverage: 90, evidence: 87, managerReviews: 2, employeeReflections: 3 },
  ];

  const managerAccountabilityData = [
    { manager: 'Sarah Manager', reviewSLA: 95, actionableComments: 88, teamCompliance: 92, supportGap: 'Low' },
    { manager: 'Mike Dept Admin', reviewSLA: 78, actionableComments: 72, teamCompliance: 85, supportGap: 'Medium' },
    { manager: 'Lisa Org Admin', reviewSLA: 92, actionableComments: 90, teamCompliance: 94, supportGap: 'Low' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="HR Analytics Dashboard"
        subtitle="Organization-wide compliance and appraisal insights"
        scopeOptions={[
          { label: 'Organization', value: 'org' },
          { label: 'By Department', value: 'dept' },
        ]}
        selectedScope={scope}
        onScopeChange={setScope}
        dateRangeOptions={[
          { label: 'This Week', value: 'week' },
          { label: 'This Month', value: 'month' },
          { label: 'This Quarter', value: 'quarter' },
        ]}
        selectedDateRange={dateRange}
        onDateRangeChange={setDateRange}
        onExport={() => alert('Export HR report')}
        onHelp={() => alert('Help: HR metrics definitions')}
      />

      {/* Today Focus Strip */}
      <TodayFocusStrip
        items={focusItems}
        onAction={() => {}}
        actionLabel="Take Action"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard
          label="Org Compliance"
          value={`${orgCompliance}%`}
          delta={{ value: '+2% vs last month', trend: 'up', isPositive: true }}
          icon={<TrendingUp className="w-5 h-5" />}
          sparklineData={[90, 91, 92, 93, 93, 94, 94]}
        />
        <KPICard
          label="Appraisal Readiness"
          value={`${appraisalReadiness}%`}
          delta={{ value: '13% incomplete', trend: 'up', isPositive: true }}
          icon={<Award className="w-5 h-5" />}
          sparklineData={[75, 78, 80, 82, 84, 86, 87]}
        />
        <KPICard
          label="Manager Accountability"
          value={managerAccountability}
          delta={{ value: '+3 vs last month', trend: 'up', isPositive: true }}
          icon={<Users className="w-5 h-5" />}
          sparklineData={[85, 86, 87, 88, 89, 90, 91]}
        />
        <KPICard
          label="Calibration Flags"
          value={calibrationFlags}
          delta={{ value: '5 resolved', trend: 'down', isPositive: true }}
          icon={<AlertTriangle className="w-5 h-5" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Analytics */}
        <div className="lg:col-span-2 space-y-4">
          {/* Appraisal Cycle Readiness */}
          <Card>
            <CardHeader>
              <CardTitle>Appraisal Cycle Readiness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-2 px-3 font-medium text-neutral-700">Department</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Coverage %</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Evidence %</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Pending Reviews</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Reflections</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appraisalReadinessData.map((row, i) => (
                      <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-2 px-3 font-medium text-neutral-900">{row.dept}</td>
                        <td className="text-right py-2 px-3">
                          <span className={`${row.coverage >= 90 ? 'text-green-600' : 'text-amber-600'}`}>
                            {row.coverage}%
                          </span>
                        </td>
                        <td className="text-right py-2 px-3">
                          <span className={`${row.evidence >= 85 ? 'text-green-600' : 'text-amber-600'}`}>
                            {row.evidence}%
                          </span>
                        </td>
                        <td className="text-right py-2 px-3">
                          <span className={`${row.managerReviews > 3 ? 'text-red-600' : 'text-neutral-700'}`}>
                            {row.managerReviews}
                          </span>
                        </td>
                        <td className="text-right py-2 px-3">
                          <span className={`${row.employeeReflections > 5 ? 'text-red-600' : 'text-neutral-700'}`}>
                            {row.employeeReflections}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="btn btn-primary">Open Cycle</button>
                <button className="btn btn-secondary">Send Reminders</button>
                <button className="btn btn-ghost">Export Readiness</button>
              </div>
            </CardContent>
          </Card>

          {/* Manager Accountability */}
          <Card>
            <CardHeader>
              <CardTitle>Manager Accountability Scores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-2 px-3 font-medium text-neutral-700">Manager</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Review SLA %</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Actionable %</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Team Compliance</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Support Gap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {managerAccountabilityData.map((row, i) => (
                      <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-2 px-3 font-medium text-neutral-900">{row.manager}</td>
                        <td className="text-right py-2 px-3">
                          <span className={`${row.reviewSLA >= 90 ? 'text-green-600' : row.reviewSLA >= 80 ? 'text-amber-600' : 'text-red-600'}`}>
                            {row.reviewSLA}%
                          </span>
                        </td>
                        <td className="text-right py-2 px-3">
                          <span className={`${row.actionableComments >= 85 ? 'text-green-600' : 'text-amber-600'}`}>
                            {row.actionableComments}%
                          </span>
                        </td>
                        <td className="text-right py-2 px-3">
                          <span className={`${row.teamCompliance >= 90 ? 'text-green-600' : 'text-amber-600'}`}>
                            {row.teamCompliance}%
                          </span>
                        </td>
                        <td className="text-right py-2 px-3">
                          <span className={`badge badge-${row.supportGap === 'Low' ? 'success' : row.supportGap === 'Medium' ? 'warning' : 'danger'}`}>
                            {row.supportGap}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="btn btn-secondary">View Details</button>
                <button className="btn btn-ghost">Send Coaching Nudge</button>
              </div>
            </CardContent>
          </Card>

          {/* Fairness Monitor */}
          <Card>
            <CardHeader>
              <CardTitle>Fairness Monitor (Aggregate)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-600 mb-4">
                Cohort suppression enforced (min 5 employees per group)
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-neutral-50 rounded-lg">
                  <p className="text-xs text-neutral-600 mb-1">Score Distribution</p>
                  <p className="text-2xl font-semibold text-neutral-900">Normal</p>
                </div>
                <div className="text-center p-4 bg-neutral-50 rounded-lg">
                  <p className="text-xs text-neutral-600 mb-1">Overcommitment Index</p>
                  <p className="text-2xl font-semibold text-amber-600">Medium</p>
                </div>
                <div className="text-center p-4 bg-neutral-50 rounded-lg">
                  <p className="text-xs text-neutral-600 mb-1">Volatility Alerts</p>
                  <p className="text-2xl font-semibold text-green-600">2</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="btn btn-secondary">View Details</button>
                <button className="btn btn-ghost">Export Aggregate</button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sticky Action Panel */}
        <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <ActionPanel
            title="HR Actions Today"
            items={actionItems}
            emptyMessage="All systems running smoothly! ✨"
          />

          {/* Policy Exceptions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Policy Exceptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-700">Export Requests</span>
                  <span className="font-semibold text-neutral-900">3</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-700">Sensitive Views</span>
                  <span className="font-semibold text-neutral-900">12</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="btn btn-secondary w-full text-xs">Approve Exports</button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
