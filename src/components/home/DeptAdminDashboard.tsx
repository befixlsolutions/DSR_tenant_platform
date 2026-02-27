'use client';

import { useState } from 'react';
import { Users, AlertTriangle, TrendingDown, FileX } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { KPICard } from '@/components/dashboard/KPICard';
import { TodayFocusStrip } from '@/components/dashboard/TodayFocusStrip';
import { ActionPanel } from '@/components/dashboard/ActionPanel';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export const DeptAdminDashboard = () => {
  const [scope, setScope] = useState('dept');
  const [dateRange, setDateRange] = useState('week');

  // Mock data
  const deptCompliance = 88;
  const lateReports = 12;
  const blockerHotspots = 3;
  const reviewSLABreach = 15;

  // Today focus items
  const focusItems = [
    { id: '1', text: '3 teams below 70% compliance' },
    { id: '2', text: '2 managers with SLA breach > 30%' },
    { id: '3', text: '5 S1 blockers aging > 5 days' },
  ];

  // Action items
  const actionItems = [
    {
      id: 'action-1',
      title: 'Engineering Team Low Compliance',
      description: '68% compliance, 8 members',
      badge: { text: 'Critical', variant: 'danger' as const },
      action: () => {},
      actionLabel: 'Open Insights',
    },
    {
      id: 'action-2',
      title: 'Manager SLA Breach',
      description: 'Sarah Manager: 35% breach rate',
      badge: { text: 'Action Needed', variant: 'warning' as const },
      action: () => {},
      actionLabel: 'Message Manager',
    },
    {
      id: 'action-3',
      title: 'Blocker Hotspot',
      description: 'Product team: 8 open blockers',
      badge: { text: 'Monitor', variant: 'warning' as const },
      action: () => {},
      actionLabel: 'View Details',
    },
  ];

  // Mock team data
  const teamData = [
    { team: 'Engineering', compliance: 68, openBlockers: 8, avgBlockerAge: 6, reviewSLABreach: 35, carryOverRate: 22 },
    { team: 'Product', compliance: 92, openBlockers: 3, avgBlockerAge: 2, reviewSLABreach: 8, carryOverRate: 5 },
    { team: 'Design', compliance: 95, openBlockers: 1, avgBlockerAge: 1, reviewSLABreach: 5, carryOverRate: 3 },
    { team: 'QA', compliance: 88, openBlockers: 5, avgBlockerAge: 4, reviewSLABreach: 12, carryOverRate: 15 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Department Dashboard"
        subtitle="Department execution health and team performance"
        scopeOptions={[
          { label: 'My Department', value: 'dept' },
          { label: 'By Team', value: 'team' },
        ]}
        selectedScope={scope}
        onScopeChange={setScope}
        dateRangeOptions={[
          { label: 'This Week', value: 'week' },
          { label: 'Last 7 Days', value: '7days' },
          { label: 'This Month', value: 'month' },
        ]}
        selectedDateRange={dateRange}
        onDateRangeChange={setDateRange}
        onExport={() => alert('Export department report')}
        onHelp={() => alert('Help: Department metrics definitions')}
      />

      {/* Today Focus Strip */}
      <TodayFocusStrip
        items={focusItems}
        onAction={() => {}}
        actionLabel="View All Issues"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard
          label="Department Compliance"
          value={`${deptCompliance}%`}
          delta={{ value: '-4% vs last week', trend: 'down', isPositive: false }}
          icon={<Users className="w-5 h-5" />}
          sparklineData={[92, 91, 90, 89, 88, 88, 88]}
        />
        <KPICard
          label="Late Reports"
          value={lateReports}
          delta={{ value: '+3 vs last week', trend: 'up', isPositive: false }}
          icon={<FileX className="w-5 h-5" />}
        />
        <KPICard
          label="Blocker Hotspots"
          value={blockerHotspots}
          delta={{ value: '3 teams affected', trend: 'up', isPositive: false }}
          icon={<AlertTriangle className="w-5 h-5" />}
        />
        <KPICard
          label="Review SLA Breach"
          value={`${reviewSLABreach}%`}
          delta={{ value: '+5% vs last week', trend: 'up', isPositive: false }}
          icon={<TrendingDown className="w-5 h-5" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Analytics */}
        <div className="lg:col-span-2 space-y-4">
          {/* Department Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Department Compliance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center bg-neutral-50 rounded-lg">
                <p className="text-sm text-neutral-500">Chart: Compliance over time (30 days)</p>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-xs text-neutral-600">On-Time</p>
                  <p className="text-xl font-semibold text-green-600">156</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-neutral-600">Late</p>
                  <p className="text-xl font-semibold text-amber-600">12</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-neutral-600">Missed</p>
                  <p className="text-xl font-semibold text-red-600">8</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-neutral-600">Avg Score</p>
                  <p className="text-xl font-semibold text-neutral-900">88%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bottleneck Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle>Team Performance & Bottlenecks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-2 px-3 font-medium text-neutral-700">Team</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Compliance</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Blockers</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Avg Age</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">SLA Breach</th>
                      <th className="text-right py-2 px-3 font-medium text-neutral-700">Carry-Over</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamData.map((row, i) => (
                      <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-2 px-3 font-medium text-neutral-900">{row.team}</td>
                        <td className="text-right py-2 px-3">
                          <span className={`${
                            row.compliance >= 90 ? 'text-green-600' : 
                            row.compliance >= 70 ? 'text-amber-600' : 
                            'text-red-600'
                          }`}>
                            {row.compliance}%
                          </span>
                        </td>
                        <td className="text-right py-2 px-3">
                          <span className={`${row.openBlockers > 5 ? 'text-red-600' : 'text-neutral-700'}`}>
                            {row.openBlockers}
                          </span>
                        </td>
                        <td className="text-right py-2 px-3">
                          <span className={`${row.avgBlockerAge > 5 ? 'text-red-600' : 'text-neutral-700'}`}>
                            {row.avgBlockerAge}d
                          </span>
                        </td>
                        <td className="text-right py-2 px-3">
                          <span className={`${row.reviewSLABreach > 20 ? 'text-red-600' : row.reviewSLABreach > 10 ? 'text-amber-600' : 'text-green-600'}`}>
                            {row.reviewSLABreach}%
                          </span>
                        </td>
                        <td className="text-right py-2 px-3">
                          <span className={`${row.carryOverRate > 15 ? 'text-red-600' : 'text-neutral-700'}`}>
                            {row.carryOverRate}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="btn btn-primary">Open Team Drilldown</button>
                <button className="btn btn-secondary">Message Manager</button>
              </div>
            </CardContent>
          </Card>

          {/* Risk & Escalations */}
          <Card>
            <CardHeader>
              <CardTitle>Risk & Escalations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-red-900">S0/S1 Incidents</p>
                    <span className="badge badge-danger">2</span>
                  </div>
                  <p className="text-xs text-red-700">Critical blockers requiring immediate attention</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-amber-900">Escalations Triggered</p>
                    <span className="badge badge-warning">5</span>
                  </div>
                  <p className="text-xs text-amber-700">Automated escalations in last 7 days</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="btn btn-primary">View Escalations</button>
                <button className="btn btn-secondary">Download Report</button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sticky Action Panel */}
        <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <ActionPanel
            title="Department Actions"
            items={actionItems}
            emptyMessage="All teams performing well! 🎯"
          />

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-700">Total Teams</span>
                  <span className="font-semibold text-neutral-900">4</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-700">Total Members</span>
                  <span className="font-semibold text-neutral-900">32</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-700">Active Managers</span>
                  <span className="font-semibold text-neutral-900">4</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
