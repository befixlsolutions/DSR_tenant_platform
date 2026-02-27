'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FileText, Target, AlertTriangle, TrendingUp } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { KPICard } from '@/components/dashboard/KPICard';
import { TodayFocusStrip } from '@/components/dashboard/TodayFocusStrip';
import { ActionPanel } from '@/components/dashboard/ActionPanel';
import { RequiredTodayWidget } from './widgets/RequiredTodayWidget';
import { FocusGoalsWidget } from './widgets/FocusGoalsWidget';
import { OpenBlockersWidget } from './widgets/OpenBlockersWidget';
import { ComplianceStreakWidget } from './widgets/ComplianceStreakWidget';
import { SubmissionCalendarWidget } from './widgets/SubmissionCalendarWidget';
import { useAuth } from '@/lib/providers/AuthProvider';
import { mockDSRReports } from '@/lib/mock-data/reports';
import { getFocusGoals } from '@/lib/mock-data/goals';
import { getOpenBlockers } from '@/lib/mock-data/blockers';

export const EmployeeDashboard = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState('today');

  // Mock data
  const todayDSR = mockDSRReports.find(r => r.user_id === user?.id && r.report_date === '2026-02-23');
  const focusGoals = getFocusGoals(user?.id || '');
  const openBlockers = getOpenBlockers(user?.id || '');
  const streak = 8; // Mock streak

  // Today focus items
  const focusItems = [
    ...(todayDSR?.status === 'draft' ? [{ id: '1', text: 'DSR draft pending submission (due 6:00 PM)' }] : []),
    ...(openBlockers.filter(b => b.severity === 'S1' || b.severity === 'S0').length > 0
      ? [{ id: '2', text: `${openBlockers.filter(b => b.severity === 'S1' || b.severity === 'S0').length} high-severity blocker(s) need attention` }]
      : []),
    ...(focusGoals.filter(g => g.actual_progress < g.expected_progress).length > 0
      ? [{ id: '3', text: `${focusGoals.filter(g => g.actual_progress < g.expected_progress).length} goal(s) behind schedule` }]
      : []),
  ];

  // Action items for right panel
  const actionItems = [
    ...(todayDSR?.status === 'draft' ? [{
      id: 'action-1',
      title: 'Complete Today\'s DSR',
      description: 'Draft saved, ready to submit',
      badge: { text: 'Due 6 PM', variant: 'warning' as const },
      action: () => router.push('/reporting/dsr/new'),
      actionLabel: 'Open Draft',
    }] : []),
    ...openBlockers.filter(b => !b.owner || !b.eta).map(b => ({
      id: `blocker-${b.id}`,
      title: b.title,
      description: `${b.severity} blocker needs ${!b.owner ? 'owner' : 'ETA'}`,
      badge: { text: b.severity, variant: (b.severity === 'S0' || b.severity === 'S1' ? 'danger' : 'warning') as 'danger' | 'warning' },
      action: () => { },
      actionLabel: 'Update',
    })),
    ...focusGoals.filter(g => g.actual_progress < g.expected_progress - 10).map(g => ({
      id: `goal-${g.id}`,
      title: g.title,
      description: `${g.expected_progress - g.actual_progress}% behind schedule`,
      badge: { text: 'At Risk', variant: 'danger' as const },
      action: () => { },
      actionLabel: 'Update Progress',
    })),
  ].slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Page Header */}
      <PageHeader
        title={`Welcome back, ${user?.name}`}
        subtitle="Here's what you need to focus on today"
        dateRangeOptions={[
          { label: 'Today', value: 'today' },
          { label: 'This Week', value: 'week' },
          { label: 'This Month', value: 'month' },
        ]}
        selectedDateRange={dateRange}
        onDateRangeChange={setDateRange}
        showExport={false}
        onHelp={() => alert('Help: View definitions and metrics')}
      />

      {/* Today Focus Strip - Refreshed with glassmorphism */}
      {focusItems.length > 0 && (
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
          <TodayFocusStrip
            items={focusItems}
            onAction={() => router.push('/reporting/dsr/new')}
            actionLabel="Start DSR"
          />
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          label="Today's DSR Status"
          value={todayDSR?.status === 'submitted' ? 'Submitted' : todayDSR?.status === 'draft' ? 'Draft' : 'Not Started'}
          icon={<FileText className="w-5 h-5" />}
          onClick={() => router.push('/reporting/dsr/new')}
        />
        <KPICard
          label="Submission Streak"
          value={`${streak} days`}
          delta={{ value: '+2 vs last week', trend: 'up', isPositive: true }}
          icon={<TrendingUp className="w-5 h-5 text-indigo-500" />}
          sparklineData={[6, 7, 7, 8, 8, 8, 8]}
        />
        <KPICard
          label="Active Blockers"
          value={openBlockers.length}
          delta={openBlockers.length > 0 ? { value: `${openBlockers.filter(b => b.severity === 'S1' || b.severity === 'S0').length} high severity`, trend: 'down', isPositive: false } : undefined}
          icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
        />
        <KPICard
          label="Goal Progress"
          value={`${focusGoals.filter(g => g.status === 'in_progress' || g.status === 'achieved').length}/${focusGoals.length}`}
          delta={focusGoals.length > 0 ? {
            value: `${focusGoals.filter(g => g.actual_progress >= g.expected_progress).length} on track`,
            trend: 'up',
            isPositive: true
          } : undefined}
          icon={<Target className="w-5 h-5 text-emerald-500" />}
        />
      </div>

      {/* Intelligence & Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Analytics Column */}
        <div className="lg:col-span-8 space-y-6">
          <RequiredTodayWidget />
          <FocusGoalsWidget />
          <SubmissionCalendarWidget />
        </div>

        {/* Action Center Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="lg:sticky lg:top-24">
            <ActionPanel
              title="Action Center"
              items={actionItems}
              emptyMessage="All caught up! 🎉"
            />
            <div className="mt-6 space-y-6">
              <ComplianceStreakWidget />
              <OpenBlockersWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
