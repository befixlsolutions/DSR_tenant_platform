'use client';

import { useState } from 'react';
import { Users, AlertTriangle, CheckCircle, TrendingUp, BarChart3 } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { KPICard } from '@/components/dashboard/KPICard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { mockHRAnalytics } from '@/lib/mock-data/analytics';

export default function HRAnalyticsPage() {
  const [period] = useState('2026-02');
  const hr = mockHRAnalytics;

  const getSupportGapColor = (gap: 'low' | 'medium' | 'high') => {
    if (gap === 'low') return 'text-green-600 bg-green-100';
    if (gap === 'medium') return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const maxCount = Math.max(...hr.calibration_data.score_distribution.map(d => d.count));

  return (
    <div className="space-y-6">
      <PageHeader
        title="HR Analytics"
        subtitle="Organization-wide performance and fairness metrics"
        dateRangeOptions={[
          { label: '2026-02', value: '2026-02' },
          { label: '2026-01', value: '2026-01' },
          { label: '2025-12', value: '2025-12' },
        ]}
        selectedDateRange={period}
        onExport={() => alert('Export HR analytics')}
        onHelp={() => alert('Help: HR analytics provide org-wide insights for appraisal readiness')}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          label="Org Compliance"
          value={`${hr.org_compliance}%`}
          icon={<CheckCircle className="w-5 h-5" />}
          delta={{
            value: '+4% vs last month',
            trend: 'up',
            isPositive: true,
          }}
        />
        <KPICard
          label="Calibration Outliers"
          value={hr.calibration_data.outliers}
          icon={<AlertTriangle className="w-5 h-5" />}
          delta={{
            value: '-2 vs last month',
            trend: 'down',
            isPositive: true,
          }}
        />
        <KPICard
          label="Volatility Alerts"
          value={hr.calibration_data.volatility_alerts}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <KPICard
          label="Score Variance"
          value={hr.fairness_metrics.score_variance.toFixed(1)}
          icon={<BarChart3 className="w-5 h-5" />}
        />
      </div>

      {/* Manager Accountability */}
      <Card>
        <CardHeader>
          <CardTitle>Manager Accountability Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Manager</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Review SLA</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Actionable Comments</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Team Compliance</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Support Gap</th>
                </tr>
              </thead>
              <tbody>
                {hr.manager_accountability.map((manager) => (
                  <tr key={manager.manager_id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-sm">
                          {manager.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-medium text-neutral-900">{manager.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`text-sm font-semibold ${getScoreColor(manager.review_sla_percent)}`}>
                        {manager.review_sla_percent}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`text-sm font-semibold ${getScoreColor(manager.actionable_comments_percent)}`}>
                        {manager.actionable_comments_percent}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`text-sm font-semibold ${getScoreColor(manager.team_compliance)}`}>
                        {manager.team_compliance}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getSupportGapColor(manager.support_gap_score)}`}>
                        {manager.support_gap_score}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Appraisal Readiness */}
      <Card>
        <CardHeader>
          <CardTitle>Appraisal Readiness by Department</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {hr.appraisal_readiness.map((dept) => (
              <div key={dept.department} className="border border-neutral-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-neutral-900">{dept.department}</h3>
                  <span className={`text-lg font-bold ${getScoreColor(dept.coverage_percent)}`}>
                    {dept.coverage_percent}% Ready
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-700">Evidence Completeness</span>
                      <span className="text-sm font-semibold text-neutral-900">{dept.evidence_completeness}%</span>
                    </div>
                    <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all"
                        style={{ width: `${dept.evidence_completeness}%` }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-amber-50 rounded-lg">
                      <p className="text-xl font-bold text-amber-600">{dept.pending_manager_reviews}</p>
                      <p className="text-xs text-neutral-600 mt-1">Pending Manager Reviews</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-xl font-bold text-purple-600">{dept.pending_employee_reflections}</p>
                      <p className="text-xs text-neutral-600 mt-1">Pending Reflections</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calibration Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hr.calibration_data.score_distribution.map((dist) => (
                <div key={dist.range}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-neutral-700">{dist.range}</span>
                    <span className="text-sm font-semibold text-neutral-900">{dist.count} employees</span>
                  </div>
                  <div className="h-8 bg-neutral-200 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-primary-500 transition-all flex items-center justify-end pr-2"
                      style={{ width: `${(dist.count / maxCount) * 100}%` }}
                    >
                      {dist.count > 10 && (
                        <span className="text-xs font-semibold text-white">{dist.count}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-700">Total Employees</span>
                <span className="font-semibold text-neutral-900">
                  {hr.calibration_data.score_distribution.reduce((sum, d) => sum + d.count, 0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fairness Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-700">Cohort Size Compliance</span>
                  {hr.fairness_metrics.cohort_size_compliant ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <p className="text-xs text-neutral-600">
                  {hr.fairness_metrics.cohort_size_compliant
                    ? 'All cohorts meet minimum size requirement (5+ members)'
                    : 'Some cohorts are below minimum size requirement'}
                </p>
              </div>

              <div className="p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-700">Score Variance</span>
                  <span className="text-lg font-bold text-blue-600">{hr.fairness_metrics.score_variance}</span>
                </div>
                <p className="text-xs text-neutral-600">
                  Standard deviation of scores across organization
                </p>
              </div>

              <div className="p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-700">Overcommitment Index</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${
                    hr.fairness_metrics.overcommitment_index === 'low'
                      ? 'text-green-600 bg-green-100'
                      : hr.fairness_metrics.overcommitment_index === 'medium'
                      ? 'text-amber-600 bg-amber-100'
                      : 'text-red-600 bg-red-100'
                  }`}>
                    {hr.fairness_metrics.overcommitment_index}
                  </span>
                </div>
                <p className="text-xs text-neutral-600">
                  Measures unrealistic goal setting patterns
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calibration Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Calibration Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-900">
                  {hr.calibration_data.outliers} Outliers Detected
                </p>
                <p className="text-xs text-red-700 mt-1">
                  Scores significantly deviate from team/org averages
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <TrendingUp className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-900">
                  {hr.calibration_data.volatility_alerts} Volatility Alerts
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  Unusual score fluctuations requiring review
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
