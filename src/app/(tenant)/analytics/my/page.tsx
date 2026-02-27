'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, Target, FileCheck, AlertTriangle, MessageSquare, Award } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/lib/providers/AuthProvider';
import { getEmployeeEfficiency, getEmployeeEfficiencyHistory, type EfficiencyScore } from '@/lib/mock-data/analytics';

export default function MyAnalyticsPage() {
  const { user } = useAuth();
  const [period, setPeriod] = useState('2026-02');

  const currentScore = getEmployeeEfficiency(user?.id || '', period);
  const history = getEmployeeEfficiencyHistory(user?.id || '');

  if (!currentScore) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-neutral-600">No analytics data available</p>
      </div>
    );
  }

  const scoreComponents = [
    { label: 'Discipline', score: currentScore.discipline_score, weight: 20, icon: FileCheck, color: 'text-blue-600' },
    { label: 'Goals', score: currentScore.goals_score, weight: 25, icon: Target, color: 'text-green-600' },
    { label: 'Delivery', score: currentScore.delivery_score, weight: 25, icon: Award, color: 'text-purple-600' },
    { label: 'Blockers', score: currentScore.blockers_score, weight: 15, icon: AlertTriangle, color: 'text-amber-600' },
    { label: 'Communication', score: currentScore.communication_score, weight: 15, icon: MessageSquare, color: 'text-indigo-600' },
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

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Analytics"
        subtitle="Track your performance and efficiency metrics"
        dateRangeOptions={history.map(h => ({ label: h.period, value: h.period }))}
        selectedDateRange={period}
        onDateRangeChange={setPeriod}
        onExport={() => alert('Export analytics')}
        onHelp={() => alert('Help: Efficiency score is calculated from 5 components')}
      />

      {/* Efficiency Meter */}
      <Card>
        <CardHeader>
          <CardTitle>Efficiency Meter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center py-8">
            {/* Circular Progress */}
            <div className="relative w-48 h-48 mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-neutral-200"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - currentScore.total_score / 100)}`}
                  className={getScoreColor(currentScore.total_score)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className={`text-5xl font-bold ${getScoreColor(currentScore.total_score)}`}>
                  {currentScore.total_score}
                </p>
                <p className="text-sm text-neutral-600 mt-1">Total Score</p>
              </div>
            </div>

            {/* Trend Indicator */}
            <div className="flex items-center gap-2 mb-6">
              {currentScore.trend === 'up' ? (
                <>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    +{currentScore.total_score - (currentScore.previous_score || 0)} from last period
                  </span>
                </>
              ) : currentScore.trend === 'down' ? (
                <>
                  <TrendingDown className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-red-600">
                    {currentScore.total_score - (currentScore.previous_score || 0)} from last period
                  </span>
                </>
              ) : (
                <span className="text-sm font-medium text-neutral-600">No change from last period</span>
              )}
            </div>

            {/* Score Components */}
            <div className="w-full max-w-2xl space-y-3">
              {scoreComponents.map((component) => {
                const Icon = component.icon;
                return (
                  <div key={component.label} className="flex items-center gap-4">
                    <div className="flex items-center gap-2 w-40">
                      <Icon className={`w-4 h-4 ${component.color}`} />
                      <span className="text-sm font-medium text-neutral-700">{component.label}</span>
                      <span className="text-xs text-neutral-500">({component.weight}%)</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-3 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getScoreBgColor(component.score)} transition-all`}
                            style={{ width: `${component.score}%` }}
                          />
                        </div>
                        <span className={`text-sm font-semibold w-12 text-right ${getScoreColor(component.score)}`}>
                          {component.score}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Discipline Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700">DSR On-Time</span>
                <span className="text-sm font-semibold text-neutral-900">
                  {currentScore.breakdown.dsr_on_time_percent}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700">WSR On-Time</span>
                <span className="text-sm font-semibold text-neutral-900">
                  {currentScore.breakdown.wsr_on_time_percent}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700">MSR On-Time</span>
                <span className="text-sm font-semibold text-neutral-900">
                  {currentScore.breakdown.msr_on_time_percent}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goals Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700">Achievement Rate</span>
                <span className="text-sm font-semibold text-neutral-900">
                  {currentScore.breakdown.goal_achievement_rate}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700">On-Track Goals</span>
                <span className="text-sm font-semibold text-neutral-900">
                  {currentScore.breakdown.goal_on_track_percent}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700">Evidence Quality</span>
                <span className="text-sm font-semibold text-neutral-900">
                  {currentScore.breakdown.evidence_quality_score}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700">Avg Response Time</span>
                <span className="text-sm font-semibold text-neutral-900">
                  {currentScore.breakdown.review_response_time_avg}h
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blockers Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700">Early Raising</span>
                <span className="text-sm font-semibold text-neutral-900">
                  {currentScore.breakdown.blocker_early_raising_percent}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700">Resolution Rate</span>
                <span className="text-sm font-semibold text-neutral-900">
                  {currentScore.breakdown.blocker_resolution_rate}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Efficiency Trend (Last 3 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-around gap-4 px-4">
            {history.slice(0, 3).reverse().map((score, index) => (
              <div key={score.period} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-neutral-200 rounded-t-lg overflow-hidden" style={{ height: '200px' }}>
                  <div
                    className={`w-full ${getScoreBgColor(score.total_score)} transition-all`}
                    style={{ height: `${(score.total_score / 100) * 200}px`, marginTop: `${200 - (score.total_score / 100) * 200}px` }}
                  />
                </div>
                <p className="text-sm font-semibold text-neutral-900 mt-2">{score.total_score}</p>
                <p className="text-xs text-neutral-600">{score.period}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {currentScore.breakdown.dsr_on_time_percent}%
              </p>
              <p className="text-sm text-neutral-700 mt-1">DSR Compliance</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {currentScore.breakdown.goal_achievement_rate}%
              </p>
              <p className="text-sm text-neutral-700 mt-1">Goal Achievement</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">
                {currentScore.breakdown.evidence_quality_score}
              </p>
              <p className="text-sm text-neutral-700 mt-1">Evidence Quality</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
