'use client';

import { useState } from 'react';
import { Building2, Users, TrendingUp, AlertTriangle, Target, Clock, BarChart3, Activity } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { KPICard } from '@/components/dashboard/KPICard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { showInfo } from '@/lib/utils/toast';

export default function DepartmentAnalyticsPage() {
  const [period] = useState('2026-02');
  const [selectedDepartment, setSelectedDepartment] = useState('engineering');

  // Mock department data
  const departments = [
    { id: 'engineering', name: 'Engineering', teams: 5, members: 42 },
    { id: 'product', name: 'Product', teams: 3, members: 18 },
    { id: 'design', name: 'Design', teams: 2, members: 12 },
    { id: 'marketing', name: 'Marketing', teams: 2, members: 15 },
  ];

  const deptMetrics = {
    compliance_rate: 92,
    avg_efficiency_score: 84,
    goal_achievement_rate: 78,
    blocker_resolution_rate: 88,
    review_sla_compliance: 95,
    avg_ttr_days: 2.1,
  };

  const teamComparison = [
    { team_name: 'Backend Team', members: 8, efficiency: 88, compliance: 95, goals_achieved: 85, at_risk: 0 },
    { team_name: 'Frontend Team', members: 10, efficiency: 86, compliance: 92, goals_achieved: 80, at_risk: 1 },
    { team_name: 'Mobile Team', members: 7, efficiency: 82, compliance: 90, goals_achieved: 75, at_risk: 1 },
    { team_name: 'DevOps Team', members: 6, efficiency: 90, compliance: 98, goals_achieved: 88, at_risk: 0 },
    { team_name: 'QA Team', members: 11, efficiency: 84, compliance: 93, goals_achieved: 78, at_risk: 2 },
  ];

  const bottlenecks = [
    { type: 'Blocker', description: 'API documentation delays', affected_teams: 3, severity: 'high', days_open: 8 },
    { type: 'Dependency', description: 'Infrastructure migration pending', affected_teams: 2, severity: 'medium', days_open: 12 },
    { type: 'Resource', description: 'Design review capacity', affected_teams: 2, severity: 'medium', days_open: 5 },
    { type: 'Process', description: 'Approval workflow delays', affected_teams: 4, severity: 'high', days_open: 15 },
  ];

  const trendData = [
    { month: 'Nov', compliance: 88, efficiency: 82, goals: 75 },
    { month: 'Dec', compliance: 90, efficiency: 83, goals: 76 },
    { month: 'Jan', compliance: 91, efficiency: 83, goals: 77 },
    { month: 'Feb', compliance: 92, efficiency: 84, goals: 78 },
  ];

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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-amber-100 text-amber-700';
      case 'low':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Department Analytics"
        subtitle="Cross-team performance and bottleneck identification"
        dateRangeOptions={[
          { label: '2026-02', value: '2026-02' },
          { label: '2026-01', value: '2026-01' },
          { label: '2025-12', value: '2025-12' },
        ]}
        selectedDateRange={period}
        onExport={() => showInfo('Exporting department analytics...')}
        onHelp={() => showInfo('Department analytics provide cross-team insights and bottleneck identification')}
      />

      {/* Department Selector */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-neutral-600" />
              <span className="text-sm font-medium text-neutral-700">Department:</span>
            </div>
            <div className="flex gap-2">
              {departments.map(dept => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedDepartment === dept.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {dept.name}
                  <span className="ml-2 text-xs opacity-75">({dept.teams} teams, {dept.members} members)</span>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Department KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          label="Dept Compliance"
          value={`${deptMetrics.compliance_rate}%`}
          icon={<Activity className="w-5 h-5" />}
          delta={{
            value: '+2% vs last month',
            trend: 'up',
            isPositive: true,
          }}
        />
        <KPICard
          label="Avg Efficiency"
          value={`${deptMetrics.avg_efficiency_score}`}
          icon={<TrendingUp className="w-5 h-5" />}
          delta={{
            value: '+1 vs last month',
            trend: 'up',
            isPositive: true,
          }}
        />
        <KPICard
          label="Goal Achievement"
          value={`${deptMetrics.goal_achievement_rate}%`}
          icon={<Target className="w-5 h-5" />}
          delta={{
            value: '+1% vs last month',
            trend: 'up',
            isPositive: true,
          }}
        />
        <KPICard
          label="Avg TTR"
          value={`${deptMetrics.avg_ttr_days}d`}
          icon={<Clock className="w-5 h-5" />}
          delta={{
            value: '-0.3d vs last month',
            trend: 'down',
            isPositive: true,
          }}
        />
      </div>

      {/* Department Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Department Trends (Last 4 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Compliance Trend */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">Compliance Rate</span>
                <span className="text-sm font-bold text-green-600">{deptMetrics.compliance_rate}%</span>
              </div>
              <div className="flex items-end gap-2 h-32">
                {trendData.map((data, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-neutral-100 rounded-t-lg relative" style={{ height: '100%' }}>
                      <div
                        className="absolute bottom-0 w-full bg-green-500 rounded-t-lg transition-all"
                        style={{ height: `${data.compliance}%` }}
                      />
                    </div>
                    <span className="text-xs text-neutral-600 mt-2">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Efficiency Trend */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">Avg Efficiency Score</span>
                <span className="text-sm font-bold text-blue-600">{deptMetrics.avg_efficiency_score}</span>
              </div>
              <div className="flex items-end gap-2 h-32">
                {trendData.map((data, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-neutral-100 rounded-t-lg relative" style={{ height: '100%' }}>
                      <div
                        className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg transition-all"
                        style={{ height: `${data.efficiency}%` }}
                      />
                    </div>
                    <span className="text-xs text-neutral-600 mt-2">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Goals Trend */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">Goal Achievement Rate</span>
                <span className="text-sm font-bold text-purple-600">{deptMetrics.goal_achievement_rate}%</span>
              </div>
              <div className="flex items-end gap-2 h-32">
                {trendData.map((data, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-neutral-100 rounded-t-lg relative" style={{ height: '100%' }}>
                      <div
                        className="absolute bottom-0 w-full bg-purple-500 rounded-t-lg transition-all"
                        style={{ height: `${data.goals}%` }}
                      />
                    </div>
                    <span className="text-xs text-neutral-600 mt-2">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cross-Team Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Cross-Team Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Team</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Members</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Efficiency</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Compliance</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Goals Achieved</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">At Risk</th>
                </tr>
              </thead>
              <tbody>
                {teamComparison.map((team, idx) => (
                  <tr key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-neutral-400" />
                        <span className="font-medium text-neutral-900">{team.team_name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-sm text-neutral-700">{team.members}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getScoreBgColor(team.efficiency)} transition-all`}
                            style={{ width: `${team.efficiency}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${getScoreColor(team.efficiency)} w-10 text-right`}>
                          {team.efficiency}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getScoreBgColor(team.compliance)} transition-all`}
                            style={{ width: `${team.compliance}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${getScoreColor(team.compliance)} w-10 text-right`}>
                          {team.compliance}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`text-sm font-medium ${getScoreColor(team.goals_achieved)}`}>
                        {team.goals_achieved}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {team.at_risk > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                          <AlertTriangle className="w-3 h-3" />
                          {team.at_risk}
                        </span>
                      ) : (
                        <span className="text-sm text-green-600">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Bottleneck Identification */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Bottleneck Identification</CardTitle>
            <span className="text-sm text-neutral-600">{bottlenecks.length} active bottlenecks</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bottlenecks.map((bottleneck, idx) => (
              <div
                key={idx}
                className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getSeverityColor(bottleneck.severity)}`}>
                      {bottleneck.severity}
                    </span>
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-neutral-100 text-neutral-700">
                      {bottleneck.type}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-600">Open for</p>
                    <p className="text-sm font-bold text-neutral-900">{bottleneck.days_open} days</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-neutral-900 mb-2">{bottleneck.description}</p>
                <div className="flex items-center gap-2 text-xs text-neutral-600">
                  <Users className="w-3 h-3" />
                  <span>Affecting {bottleneck.affected_teams} teams</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">12</p>
              <p className="text-sm text-neutral-700 mt-1">Excellent (90+)</p>
              <p className="text-xs text-neutral-500 mt-1">29% of members</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">18</p>
              <p className="text-sm text-neutral-700 mt-1">Good (75-89)</p>
              <p className="text-xs text-neutral-500 mt-1">43% of members</p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <p className="text-3xl font-bold text-amber-600">8</p>
              <p className="text-sm text-neutral-700 mt-1">Needs Improvement (60-74)</p>
              <p className="text-xs text-neutral-500 mt-1">19% of members</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-3xl font-bold text-red-600">4</p>
              <p className="text-sm text-neutral-700 mt-1">At Risk (&lt;60)</p>
              <p className="text-xs text-neutral-500 mt-1">9% of members</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
