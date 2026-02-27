'use client';

import { useState } from 'react';
import { Users, Clock, Target, AlertTriangle, TrendingUp, TrendingDown, CheckCircle } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { KPICard } from '@/components/dashboard/KPICard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { mockTeamAnalytics } from '@/lib/mock-data/analytics';

export default function TeamAnalyticsPage() {
  const [period] = useState('2026-02');
  const team = mockTeamAnalytics;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <span className="text-xs text-neutral-500">—</span>;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Analytics"
        subtitle="Monitor team performance and delivery metrics"
        dateRangeOptions={[
          { label: '2026-02', value: '2026-02' },
          { label: '2026-01', value: '2026-01' },
          { label: '2025-12', value: '2025-12' },
        ]}
        selectedDateRange={period}
        onExport={() => alert('Export team analytics')}
        onHelp={() => alert('Help: Team analytics show aggregated performance metrics')}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          label="Team Compliance"
          value={`${team.compliance_rate}%`}
          icon={<CheckCircle className="w-5 h-5" />}
          delta={{
            value: '+3% vs last month',
            trend: 'up',
            isPositive: true,
          }}
        />
        <KPICard
          label="Review SLA"
          value={`${team.review_sla_compliance}%`}
          icon={<Clock className="w-5 h-5" />}
          delta={{
            value: '+5% vs last month',
            trend: 'up',
            isPositive: true,
          }}
        />
        <KPICard
          label="Goal Reliability"
          value={`${team.goal_reliability_score}%`}
          icon={<Target className="w-5 h-5" />}
          delta={{
            value: '+2% vs last month',
            trend: 'up',
            isPositive: true,
          }}
        />
        <KPICard
          label="Blocker TTR"
          value={`${team.blocker_ttr_avg}d`}
          icon={<AlertTriangle className="w-5 h-5" />}
          delta={{
            value: '-0.5d vs last month',
            trend: 'down',
            isPositive: true,
          }}
        />
      </div>

      {/* Delivery Signals */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Signals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">
                {team.delivery_signals.on_time_delivery}%
              </p>
              <p className="text-sm text-neutral-700 mt-2">On-Time Delivery</p>
              <p className="text-xs text-neutral-500 mt-1">Goals & commitments met on schedule</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">
                {team.delivery_signals.quality_score}%
              </p>
              <p className="text-sm text-neutral-700 mt-2">Quality Score</p>
              <p className="text-xs text-neutral-500 mt-1">Evidence completeness & accuracy</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-center gap-2">
                {getTrendIcon(team.delivery_signals.velocity_trend)}
                <p className="text-3xl font-bold text-purple-600 capitalize">
                  {team.delivery_signals.velocity_trend}
                </p>
              </div>
              <p className="text-sm text-neutral-700 mt-2">Velocity Trend</p>
              <p className="text-xs text-neutral-500 mt-1">Team output momentum</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members Drilldown */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Member</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Efficiency Score</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Compliance Rate</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Status</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {team.members.map((member) => (
                  <tr key={member.user_id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-medium text-neutral-900">{member.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col items-center">
                        <span className={`text-lg font-bold ${getScoreColor(member.efficiency_score)}`}>
                          {member.efficiency_score}
                        </span>
                        <div className="w-24 h-2 bg-neutral-200 rounded-full overflow-hidden mt-1">
                          <div
                            className={`h-full ${getScoreBgColor(member.efficiency_score)} transition-all`}
                            style={{ width: `${member.efficiency_score}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`text-sm font-semibold ${getScoreColor(member.compliance_rate)}`}>
                        {member.compliance_rate}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {member.at_risk ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                          <AlertTriangle className="w-3 h-3" />
                          At Risk
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          On Track
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => alert(`View details for ${member.name}`)}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Performance Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">High Performers (90+)</span>
                <span className="text-sm font-semibold text-green-600">
                  {team.members.filter(m => m.efficiency_score >= 90).length} members
                </span>
              </div>
              <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${(team.members.filter(m => m.efficiency_score >= 90).length / team.members.length) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">Good Performers (75-89)</span>
                <span className="text-sm font-semibold text-blue-600">
                  {team.members.filter(m => m.efficiency_score >= 75 && m.efficiency_score < 90).length} members
                </span>
              </div>
              <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${(team.members.filter(m => m.efficiency_score >= 75 && m.efficiency_score < 90).length / team.members.length) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">Needs Support (60-74)</span>
                <span className="text-sm font-semibold text-amber-600">
                  {team.members.filter(m => m.efficiency_score >= 60 && m.efficiency_score < 75).length} members
                </span>
              </div>
              <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all"
                  style={{ width: `${(team.members.filter(m => m.efficiency_score >= 60 && m.efficiency_score < 75).length / team.members.length) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">At Risk (&lt;60)</span>
                <span className="text-sm font-semibold text-red-600">
                  {team.members.filter(m => m.efficiency_score < 60).length} members
                </span>
              </div>
              <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all"
                  style={{ width: `${(team.members.filter(m => m.efficiency_score < 60).length / team.members.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
