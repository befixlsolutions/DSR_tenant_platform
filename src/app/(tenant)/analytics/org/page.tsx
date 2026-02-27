'use client';

import { useState } from 'react';
import { Building, TrendingUp, AlertTriangle, Users, Target, Clock, BarChart3, Activity, Award } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { KPICard } from '@/components/dashboard/KPICard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { showInfo } from '@/lib/utils/toast';

export default function OrgAnalyticsPage() {
  const [period] = useState('2026-02');

  // Mock org-level data
  const orgMetrics = {
    org_compliance_rate: 91,
    avg_efficiency_score: 83,
    total_employees: 187,
    active_projects: 24,
    goal_achievement_rate: 76,
    blocker_resolution_rate: 87,
    escalation_rate: 3.2,
    avg_ttr_days: 2.3,
  };

  const complianceTrend = [
    { month: 'Sep', value: 85 },
    { month: 'Oct', value: 87 },
    { month: 'Nov', value: 88 },
    { month: 'Dec', value: 89 },
    { month: 'Jan', value: 90 },
    { month: 'Feb', value: 91 },
  ];

  const bottleneckLeaderboard = [
    { department: 'Engineering', blockers: 12, avg_ttr: 2.1, escalations: 2, severity_score: 68 },
    { department: 'Product', blockers: 8, avg_ttr: 1.8, escalations: 1, severity_score: 52 },
    { department: 'Design', blockers: 5, avg_ttr: 2.5, escalations: 1, severity_score: 45 },
    { department: 'Marketing', blockers: 4, avg_ttr: 1.5, escalations: 0, severity_score: 28 },
    { department: 'Sales', blockers: 3, avg_ttr: 1.2, escalations: 0, severity_score: 18 },
  ];

  const projectHealth = [
    { project: 'Payment Gateway Integration', status: 'on_track', completion: 85, team_size: 8, risk: 'low' },
    { project: 'Mobile App Redesign', status: 'at_risk', completion: 62, team_size: 6, risk: 'high' },
    { project: 'Analytics Dashboard', status: 'on_track', completion: 78, team_size: 5, risk: 'low' },
    { project: 'API Performance Optimization', status: 'ahead', completion: 92, team_size: 4, risk: 'low' },
    { project: 'User Authentication Module', status: 'on_track', completion: 88, team_size: 6, risk: 'medium' },
    { project: 'Infrastructure Migration', status: 'delayed', completion: 45, team_size: 7, risk: 'high' },
  ];

  const workMixTrend = [
    { category: 'Feature Development', percentage: 45, color: 'bg-blue-500' },
    { category: 'Bug Fixes', percentage: 25, color: 'bg-amber-500' },
    { category: 'Technical Debt', percentage: 15, color: 'bg-purple-500' },
    { category: 'Maintenance', percentage: 10, color: 'bg-green-500' },
    { category: 'Research', percentage: 5, color: 'bg-pink-500' },
  ];

  const escalationsOverview = [
    { type: 'Blocker Escalation', count: 4, avg_resolution_days: 3.5, status: 'active' },
    { type: 'Resource Conflict', count: 2, avg_resolution_days: 5.0, status: 'active' },
    { type: 'Scope Change', count: 3, avg_resolution_days: 2.0, status: 'resolved' },
    { type: 'Technical Blocker', count: 1, avg_resolution_days: 4.0, status: 'active' },
  ];

  const departmentPerformance = [
    { name: 'Engineering', compliance: 92, efficiency: 84, members: 42 },
    { name: 'Product', compliance: 90, efficiency: 82, members: 18 },
    { name: 'Design', compliance: 88, efficiency: 81, members: 12 },
    { name: 'Marketing', compliance: 93, efficiency: 85, members: 15 },
    { name: 'Sales', compliance: 89, efficiency: 80, members: 25 },
    { name: 'Operations', compliance: 91, efficiency: 83, members: 20 },
    { name: 'HR', compliance: 95, efficiency: 87, members: 8 },
    { name: 'Finance', compliance: 94, efficiency: 86, members: 12 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_track':
        return 'bg-green-100 text-green-700';
      case 'ahead':
        return 'bg-blue-100 text-blue-700';
      case 'at_risk':
        return 'bg-amber-100 text-amber-700';
      case 'delayed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-amber-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-neutral-600';
    }
  };

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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Organization Analytics"
        subtitle="Enterprise-wide performance insights and strategic metrics"
        dateRangeOptions={[
          { label: '2026-02', value: '2026-02' },
          { label: '2026-01', value: '2026-01' },
          { label: '2025-12', value: '2025-12' },
        ]}
        selectedDateRange={period}
        onExport={() => showInfo('Exporting organization analytics...')}
        onHelp={() => showInfo('Organization analytics provide enterprise-wide insights for strategic decision making')}
      />

      {/* Org-Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          label="Org Compliance"
          value={`${orgMetrics.org_compliance_rate}%`}
          icon={<Activity className="w-5 h-5" />}
          delta={{
            value: '+1% vs last month',
            trend: 'up',
            isPositive: true,
          }}
        />
        <KPICard
          label="Avg Efficiency"
          value={`${orgMetrics.avg_efficiency_score}`}
          icon={<TrendingUp className="w-5 h-5" />}
          delta={{
            value: '+0.5 vs last month',
            trend: 'up',
            isPositive: true,
          }}
        />
        <KPICard
          label="Active Projects"
          value={`${orgMetrics.active_projects}`}
          icon={<Target className="w-5 h-5" />}
          delta={{
            value: '+2 vs last month',
            trend: 'up',
            isPositive: true,
          }}
        />
        <KPICard
          label="Escalation Rate"
          value={`${orgMetrics.escalation_rate}%`}
          icon={<AlertTriangle className="w-5 h-5" />}
          delta={{
            value: '-0.5% vs last month',
            trend: 'down',
            isPositive: true,
          }}
        />
      </div>

      {/* Org Compliance Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Compliance Trend (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-end justify-between gap-2 h-48">
              {complianceTrend.map((data, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-neutral-100 rounded-t-lg relative" style={{ height: '100%' }}>
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg transition-all"
                      style={{ height: `${data.value}%` }}
                    />
                    <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-white">
                      {data.value}%
                    </span>
                  </div>
                  <span className="text-sm font-medium text-neutral-700 mt-3">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-neutral-600">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span>Steady improvement over 6 months (+6%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Department Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {departmentPerformance.map((dept, idx) => (
              <div
                key={idx}
                className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-neutral-400" />
                    <span className="font-medium text-neutral-900">{dept.name}</span>
                  </div>
                  <span className="text-xs text-neutral-600">{dept.members} members</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-neutral-600">Compliance</span>
                      <span className={`font-medium ${getScoreColor(dept.compliance)}`}>{dept.compliance}%</span>
                    </div>
                    <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getScoreBgColor(dept.compliance)} transition-all`}
                        style={{ width: `${dept.compliance}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-neutral-600">Efficiency</span>
                      <span className={`font-medium ${getScoreColor(dept.efficiency)}`}>{dept.efficiency}</span>
                    </div>
                    <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getScoreBgColor(dept.efficiency)} transition-all`}
                        style={{ width: `${dept.efficiency}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottleneck Leaderboard */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Bottleneck Leaderboard</CardTitle>
            <span className="text-sm text-neutral-600">Departments by blocker impact</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Rank</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Department</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Active Blockers</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Avg TTR</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Escalations</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Severity Score</th>
                </tr>
              </thead>
              <tbody>
                {bottleneckLeaderboard.map((dept, idx) => (
                  <tr key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 text-neutral-700 font-bold text-sm">
                        {idx + 1}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-neutral-900">{dept.department}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                        <AlertTriangle className="w-3 h-3" />
                        {dept.blockers}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-sm text-neutral-700">{dept.avg_ttr}d</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {dept.escalations > 0 ? (
                        <span className="inline-flex px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                          {dept.escalations}
                        </span>
                      ) : (
                        <span className="text-sm text-green-600">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`text-sm font-bold ${getScoreColor(100 - dept.severity_score)}`}>
                        {dept.severity_score}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Project Health Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle>Project Health Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {projectHealth.map((project, idx) => (
              <div
                key={idx}
                className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-neutral-900">{project.project}</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(project.status)}`}>
                        {project.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-neutral-600">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{project.team_size} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span className={`font-medium capitalize ${getRiskColor(project.risk)}`}>
                          {project.risk} risk
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600">{project.completion}%</p>
                    <p className="text-xs text-neutral-600">Complete</p>
                  </div>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-600 transition-all"
                    style={{ width: `${project.completion}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Work Mix Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Work Mix Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workMixTrend.map((category, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-700">{category.category}</span>
                  <span className="text-sm font-bold text-neutral-900">{category.percentage}%</span>
                </div>
                <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${category.color} transition-all`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Insight:</strong> Feature development remains the primary focus (45%), with healthy balance 
              between bug fixes (25%) and technical debt (15%).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Escalations Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Escalations Overview</CardTitle>
            <span className="text-sm text-neutral-600">
              {escalationsOverview.filter(e => e.status === 'active').length} active escalations
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {escalationsOverview.map((escalation, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`w-5 h-5 ${escalation.status === 'active' ? 'text-red-600' : 'text-green-600'}`} />
                  <div>
                    <p className="font-medium text-neutral-900">{escalation.type}</p>
                    <p className="text-xs text-neutral-600">
                      Avg resolution: {escalation.avg_resolution_days} days
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-neutral-900">{escalation.count}</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${
                    escalation.status === 'active' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {escalation.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Users className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-neutral-900">{orgMetrics.total_employees}</p>
              <p className="text-sm text-neutral-600 mt-1">Total Employees</p>
            </div>
            <div className="text-center">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-neutral-900">{orgMetrics.goal_achievement_rate}%</p>
              <p className="text-sm text-neutral-600 mt-1">Goal Achievement</p>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-neutral-900">{orgMetrics.blocker_resolution_rate}%</p>
              <p className="text-sm text-neutral-600 mt-1">Blocker Resolution</p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-neutral-900">{orgMetrics.avg_ttr_days}d</p>
              <p className="text-sm text-neutral-600 mt-1">Avg TTR</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
