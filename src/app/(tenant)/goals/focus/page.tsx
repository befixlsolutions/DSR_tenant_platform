'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, TrendingUp, Target, Clock } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/lib/providers/AuthProvider';
import { getGoalsByUser, getAtRiskGoals, type Goal } from '@/lib/mock-data/goals';

export default function GoalsFocusPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [sortBy, setSortBy] = useState<'risk' | 'impact' | 'effort'>('risk');

  // Get user's active goals
  const allGoals = getGoalsByUser(user?.id || '').filter(
    g => g.status === 'in_progress' || g.status === 'not_started'
  );
  const atRiskGoals = getAtRiskGoals();

  // Calculate risk score (0-100)
  const calculateRiskScore = (goal: Goal): number => {
    let score = 0;
    
    // Risk level weight
    if (goal.risk_level === 'high') score += 40;
    else if (goal.risk_level === 'medium') score += 20;
    else score += 5;
    
    // Progress gap
    const gap = goal.expected_progress - goal.actual_progress;
    score += Math.min(gap, 30);
    
    // Blockers
    score += goal.blockers.length * 10;
    
    // Priority
    if (goal.priority === 'high') score += 20;
    else if (goal.priority === 'medium') score += 10;
    
    return Math.min(score, 100);
  };

  // Sort goals by risk
  const rankedGoals = [...allGoals]
    .map(goal => ({
      ...goal,
      riskScore: calculateRiskScore(goal),
    }))
    .sort((a, b) => b.riskScore - a.riskScore);

  // Effort vs Impact Matrix Data
  const matrixGoals = allGoals.map(goal => ({
    ...goal,
    effort: goal.expected_progress, // Using expected progress as effort proxy
    impact: goal.priority === 'high' ? 80 : goal.priority === 'medium' ? 50 : 30,
  }));

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-600 bg-red-50 border-red-200';
    if (score >= 40) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getRiskLabel = (score: number) => {
    if (score >= 70) return 'High Risk';
    if (score >= 40) return 'Medium Risk';
    return 'Low Risk';
  };

  const getRecommendedAction = (goal: Goal, riskScore: number) => {
    if (riskScore >= 70) {
      if (goal.blockers.length > 0) return 'Resolve blockers immediately';
      if (goal.actual_progress < goal.expected_progress - 20) return 'Escalate to manager';
      return 'Increase focus and resources';
    }
    if (riskScore >= 40) {
      return 'Monitor closely and update progress';
    }
    return 'Continue current pace';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Goals Focus"
        subtitle="Prioritize your goals based on risk, effort, and impact"
        showExport={false}
        onHelp={() => alert('Help: Focus on high-risk and high-impact goals')}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600">Total Active</p>
                <p className="text-2xl font-semibold text-neutral-900 mt-1">{allGoals.length}</p>
              </div>
              <Target className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600">At Risk</p>
                <p className="text-2xl font-semibold text-red-600 mt-1">{atRiskGoals.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600">On Track</p>
                <p className="text-2xl font-semibold text-green-600 mt-1">
                  {allGoals.filter(g => g.actual_progress >= g.expected_progress).length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600">Avg Progress</p>
                <p className="text-2xl font-semibold text-neutral-900 mt-1">
                  {allGoals.length > 0 
                    ? Math.round(allGoals.reduce((sum, g) => sum + g.actual_progress, 0) / allGoals.length)
                    : 0}%
                </p>
              </div>
              <Clock className="w-8 h-8 text-neutral-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* At-Risk Ranking */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>At-Risk Ranking</CardTitle>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value="risk">Sort by Risk</option>
              <option value="impact">Sort by Impact</option>
              <option value="effort">Sort by Effort</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {rankedGoals.length === 0 ? (
            <div className="text-center py-8">
              <Target className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <p className="text-sm text-neutral-600">No active goals to rank</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rankedGoals.map((goal, index) => (
                <div
                  key={goal.id}
                  className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-neutral-300 cursor-pointer transition-all"
                  onClick={() => router.push(`/goals/${goal.id}`)}
                >
                  <div className="flex items-start gap-4">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full border-2 border-neutral-300 flex items-center justify-center font-semibold text-sm text-neutral-700">
                      {index + 1}
                    </div>

                    {/* Goal Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-neutral-900 mb-1">
                            {goal.title}
                          </h4>
                          <p className="text-xs text-neutral-600">
                            {goal.category} • Due {goal.due_week}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-md border text-xs font-medium ${getRiskColor(goal.riskScore)}`}>
                          {getRiskLabel(goal.riskScore)} ({goal.riskScore})
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-neutral-600">Progress</span>
                          <span className="font-medium">
                            {goal.actual_progress}% / {goal.expected_progress}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              goal.actual_progress >= goal.expected_progress
                                ? 'bg-green-500'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${goal.actual_progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Recommended Action */}
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-neutral-600">Recommended:</span>
                        <span className="font-medium text-primary-600">
                          {getRecommendedAction(goal, goal.riskScore)}
                        </span>
                      </div>

                      {/* Risk Factors */}
                      <div className="flex items-center gap-3 mt-2 text-xs text-neutral-600">
                        {goal.blockers.length > 0 && (
                          <span className="text-red-600">
                            {goal.blockers.length} blocker{goal.blockers.length > 1 ? 's' : ''}
                          </span>
                        )}
                        {goal.actual_progress < goal.expected_progress && (
                          <span className="text-amber-600">
                            {goal.expected_progress - goal.actual_progress}% behind
                          </span>
                        )}
                        <span className={`${
                          goal.priority === 'high' ? 'text-red-600' :
                          goal.priority === 'medium' ? 'text-amber-600' :
                          'text-blue-600'
                        }`}>
                          {goal.priority.toUpperCase()} priority
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Effort vs Impact Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Effort vs Impact Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-96 bg-neutral-50 rounded-lg border border-neutral-200 p-4">
            {/* Axes Labels */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-medium text-neutral-700">
              High Impact
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-medium text-neutral-700">
              Low Impact
            </div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-medium text-neutral-700">
              High Effort
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-medium text-neutral-700">
              Low Effort
            </div>

            {/* Quadrant Lines */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-neutral-300" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-neutral-300" />

            {/* Quadrant Labels */}
            <div className="absolute top-8 left-8 text-xs font-medium text-green-600">Quick Wins</div>
            <div className="absolute top-8 right-8 text-xs font-medium text-blue-600">Major Projects</div>
            <div className="absolute bottom-8 left-8 text-xs font-medium text-neutral-500">Fill Ins</div>
            <div className="absolute bottom-8 right-8 text-xs font-medium text-red-600">Time Wasters</div>

            {/* Plot Goals */}
            {matrixGoals.map((goal) => {
              const x = 100 - goal.effort; // Invert effort (low effort = right)
              const y = 100 - goal.impact; // Invert impact (high impact = top)
              
              return (
                <div
                  key={goal.id}
                  className="absolute w-3 h-3 bg-primary-600 rounded-full cursor-pointer hover:scale-150 transition-transform"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  title={goal.title}
                  onClick={() => router.push(`/goals/${goal.id}`)}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-center gap-6 text-xs text-neutral-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary-600 rounded-full" />
              <span>Your Goals</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Click on a dot to view goal details</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
