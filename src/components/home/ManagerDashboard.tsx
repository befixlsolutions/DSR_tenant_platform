'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, FileCheck, AlertTriangle, Target } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { KPICard } from '@/components/dashboard/KPICard';
import { TodayFocusStrip } from '@/components/dashboard/TodayFocusStrip';
import { ActionPanel } from '@/components/dashboard/ActionPanel';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Clock } from 'lucide-react';
import { SLAAgingChart } from '@/components/charts/SLAAgingChart';
import { TeamComplianceWidget } from './widgets/TeamComplianceWidget';
import { ReviewQueueWidget } from './widgets/ReviewQueueWidget';
import { BlockerHeatmapWidget } from './widgets/BlockerHeatmapWidget';
import { AtRiskGoalsWidget } from './widgets/AtRiskGoalsWidget';
import { TeamHealthWidget } from './widgets/TeamHealthWidget';
import { useAuth } from '@/lib/providers/AuthProvider';

export const ManagerDashboard = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [scope, setScope] = useState('team');
  const [dateRange, setDateRange] = useState('today');

  // Mock data
  const teamCompliance = 83;
  const pendingReviews = 6;
  const highSeverityBlockers = 2;
  const goalReliability = 78;

  // Today focus items
  const focusItems = [
    { id: '1', text: '6 DSRs pending review (SLA: 24h)' },
    { id: '2', text: '2 S1 blockers > 3 days old' },
    { id: '3', text: '3 team members missed DSR yesterday' },
  ];

  // Manager action items
  const actionItems = [
    {
      id: 'action-1',
      title: 'Review John\'s DSR',
      description: 'Submitted 18h ago',
      badge: { text: 'SLA: 6h left', variant: 'warning' as const },
      action: () => { },
      actionLabel: 'Review Now',
    },
    {
      id: 'action-2',
      title: 'S1 Blocker: API Documentation',
      description: 'Blocking 2 team members, 4 days old',
      badge: { text: 'S1', variant: 'danger' as const },
      action: () => { },
      actionLabel: 'Escalate',
    },
    {
      id: 'action-3',
      title: 'Missing DSRs',
      description: '3 team members didn\'t submit yesterday',
      badge: { text: 'Action Needed', variant: 'warning' as const },
      action: () => { },
      actionLabel: 'Send Reminder',
    },
    {
      id: 'action-4',
      title: 'Goal Behind Schedule',
      description: 'Payment Gateway - 15% behind',
      badge: { text: 'At Risk', variant: 'danger' as const },
      action: () => { },
      actionLabel: 'Check In',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Page Header */}
      <PageHeader
        title="Team Overview"
        subtitle="Manage your team's performance, health, and reviews at a glance"
        scopeOptions={[
          { label: 'My Team', value: 'team' },
          { label: 'My Direct Reports', value: 'direct' },
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
        onExport={() => alert('Exporting team intelligence report...')}
      />

      {/* Today Focus Strip - Refreshed with glassmorphism */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
        <TodayFocusStrip
          items={focusItems}
          onAction={() => { }}
          actionLabel="Review All Items"
        />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          label="Team Compliance"
          value={`${teamCompliance}%`}
          delta={{ value: '+5% vs last week', trend: 'up', isPositive: true }}
          icon={<Users className="w-5 h-5" />}
          sparklineData={[72, 75, 74, 78, 80, 82, 83]}
        />
        <KPICard
          label="Pending Reviews"
          value={pendingReviews}
          delta={{ value: '2 overdue SLA', trend: 'up', isPositive: false }}
          icon={<FileCheck className="w-5 h-5" />}
          onClick={() => { }}
        />
        <KPICard
          label="Critical Blockers"
          value={highSeverityBlockers}
          delta={{ value: 'Immediate Action', trend: 'down', isPositive: false }}
          icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
        />
        <KPICard
          label="Goal Velocity"
          value={`${goalReliability}%`}
          delta={{ value: '-3% vs last week', trend: 'down', isPositive: false }}
          icon={<Target className="w-5 h-5" />}
          sparklineData={[85, 84, 82, 80, 79, 78, 78]}
        />
      </div>

      {/* Intelligence & Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Analytics Column */}
        <div className="lg:col-span-8 space-y-6">
          <TeamComplianceWidget />
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <CardTitle>Review SLA Aging</CardTitle>
                </div>
                <Badge variant="warning">Avg: 14.2h</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-neutral-500 -mt-2">Distribution of pending reviews by age and priority</p>
              <SLAAgingChart />
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BlockerHeatmapWidget />
            <TeamHealthWidget />
          </div>
        </div>

        {/* Action Center Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="lg:sticky lg:top-24">
            <ActionPanel
              title="Intelligence Feed"
              items={actionItems}
              emptyMessage="You're all caught up! Enjoy the quiet while it lasts. 🎉"
            />
            <div className="mt-6 space-y-6">
              <ReviewQueueWidget />
              <AtRiskGoalsWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
