'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Target, TrendingUp, AlertTriangle, CheckCircle, Clock, Building2, Filter, BarChart3 } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockGoals, Goal, GoalStatus, GoalPriority } from '@/lib/mock-data/goals';
import { showInfo } from '@/lib/utils/toast';

export default function DepartmentGoalsPage() {
  const router = useRouter();

  // Mock department data (in real app, this would come from auth context)
  const departmentId = 'dept-engineering';
  const departmentName = 'Engineering';
  
  // Mock teams in department
  const teams = [
    { id: 'team-1', name: 'Frontend Team', memberIds: ['user-1', 'user-8'] },
    { id: 'team-2', name: 'Backend Team', memberIds: ['user-9', 'user-10'] },
    { id: 'team-3', name: 'DevOps Team', memberIds: ['user-11', 'user-12'] },
  ];

  const allDeptMemberIds = teams.flatMap(t => t.memberIds);
  const deptGoals = mockGoals.filter(g => allDeptMemberIds.includes(g.user_id));

  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<GoalStatus | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<GoalPriority | 'all'>('all');

  // Filter goals
  const filteredGoals = deptGoals.filter(goal => {
    if (selectedTeam !== 'all') {
      const team = teams.find(t => t.id === selectedTeam);
      if (!team || !team.memberIds.includes(goal.user_id)) return false;
    }
    if (selectedStatus !== 'all' && goal.status !== selectedStatus) return false;
    if (selectedPriority !== 'all' && goal.priority !== selectedPriority) return false;
    return true;
  });

  // Calculate department metrics
  const totalGoals = deptGoals.length;
  const inProgressGoals = deptGoals.filter(g => g.status === 'in_progress').length;
  const achievedGoals = deptGoals.filter(g => g.status === 'achieved').length;
  const atRiskGoals = deptGoals.filter(g => 
    g.status === 'in_progress' && 
    g.actual_progress < g.expected_progress - 10
  ).length;
  const achievementRate = totalGoals > 0 ? Math.round((achievedGoals / totalGoals) * 100) : 0;
  const avgProgress = deptGoals.length > 0 
    ? Math.round(deptGoals.reduce((sum, g) => sum + g.actual_progress, 0) / deptGoals.length)
    : 0;

  // Team performance comparison
  const teamPerformance = teams.map(team => {
    const teamGoals = deptGoals.filter(g => team.memberIds.includes(g.user_id));
    const teamAchieved = teamGoals.filter(g => g.status === 'achieved').length;
    const teamAtRisk = teamGoals.filter(g => 
      g.status === 'in_progress' && 
      g.actual_progress < g.expected_progress - 10
    ).length;
    const teamAvgProgress = teamGoals.length > 0
      ? Math.round(teamGoals.reduce((sum, g) => sum + g.actual_progress, 0) / teamGoals.length)
      : 0;
    const teamAchievementRate = teamGoals.length > 0
      ? Math.round((teamAchieved / teamGoals.length) * 100)
      : 0;

    return {
      ...team,
      totalGoals: teamGoals.length,
      achieved: teamAchieved,
      atRisk: teamAtRisk,
      avgProgress: teamAvgProgress,
      achievementRate: teamAchievementRate,
    };
  });

  const getStatusColor = (status: GoalStatus) => {
    switch (status) {
      case 'not_started':
        return 'bg-neutral-100 text-neutral-700';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700';
      case 'achieved':
        return 'bg-green-100 text-green-700';
      case 'missed':
        return 'bg-red-100 text-red-700';
      case 'deferred':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getPriorityColor = (priority: GoalPriority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-blue-100 text-blue-700';
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

  const getProgressColor = (goal: Goal) => {
    const diff = goal.actual_progress - goal.expected_progress;
    if (diff >= 0) return 'text-green-600';
    if (diff >= -10) return 'text-amber-600';
    return 'text-red-600';
  };

  const getTeamName = (userId: string) => {
    const team = teams.find(t => t.memberIds.includes(userId));
    return team?.name || 'Unknown Team';
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${departmentName} Department Goals`}
        subtitle="Track and manage goals across all teams in your department"
        showExport={true}
        showHelp={true}
        onHelp={() => showInfo('View department-wide goal performance and team comparisons')}
      />

      {/* Department Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Total Goals</p>
                <p className="text-2xl font-bold text-neutral-900">{totalGoals}</p>
              </div>
              <Target className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{inProgressGoals}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Achieved</p>
                <p className="text-2xl font-bold text-green-600">{achievedGoals}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">At Risk</p>
                <p className="text-2xl font-bold text-red-600">{atRiskGoals}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Achievement Rate</p>
                <p className="text-2xl font-bold text-primary-600">{achievementRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Avg Progress</p>
                <p className="text-2xl font-bold text-primary-600">{avgProgress}%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Team Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamPerformance.map(team => (
              <div
                key={team.id}
                className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary-700" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{team.name}</p>
                      <p className="text-xs text-neutral-600">{team.totalGoals} goals • {team.memberIds.length} members</p>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedTeam(team.id)}
                  >
                    View Goals
                  </Button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-neutral-600 mb-1">Achievement Rate</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-600 transition-all"
                          style={{ width: `${team.achievementRate}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-green-600">{team.achievementRate}%</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-neutral-600 mb-1">Avg Progress</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-600 transition-all"
                          style={{ width: `${team.avgProgress}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-primary-600">{team.avgProgress}%</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{team.achieved}</p>
                    <p className="text-xs text-neutral-600">Achieved</p>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">{team.atRisk}</p>
                    <p className="text-xs text-neutral-600">At Risk</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-neutral-600" />
              <span className="text-sm font-medium text-neutral-700">Filters:</span>
            </div>

            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Teams</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as GoalStatus | 'all')}
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Statuses</option>
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="achieved">Achieved</option>
              <option value="missed">Missed</option>
              <option value="deferred">Deferred</option>
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value as GoalPriority | 'all')}
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {(selectedTeam !== 'all' || selectedStatus !== 'all' || selectedPriority !== 'all') && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedTeam('all');
                  setSelectedStatus('all');
                  setSelectedPriority('all');
                }}
              >
                Clear Filters
              </Button>
            )}

            <div className="ml-auto text-sm text-neutral-600">
              Showing {filteredGoals.length} of {deptGoals.length} goals
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Department Goals</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredGoals.length === 0 ? (
            <div className="text-center py-12">
              <Target className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <p className="text-neutral-600">No goals found matching the filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-neutral-600">Team</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-neutral-600">Goal</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-neutral-600">Category</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-neutral-600">Priority</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-neutral-600">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-neutral-600">Progress</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-neutral-600">Risk</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-neutral-600">Due Week</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-neutral-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGoals.map(goal => (
                    <tr
                      key={goal.id}
                      className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <span className="text-sm text-neutral-900">{getTeamName(goal.user_id)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm font-medium text-neutral-900">{goal.title}</p>
                        <p className="text-xs text-neutral-600 mt-0.5">{goal.owner}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-neutral-700">{goal.category}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getPriorityColor(goal.priority)}`}>
                          {goal.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(goal.status)}`}>
                          {goal.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary-600 transition-all"
                                style={{ width: `${goal.actual_progress}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-neutral-900 w-10 text-right">
                              {goal.actual_progress}%
                            </span>
                          </div>
                          <p className={`text-xs ${getProgressColor(goal)}`}>
                            Expected: {goal.expected_progress}%
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-sm font-medium capitalize ${getRiskColor(goal.risk_level)}`}>
                          {goal.risk_level}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-neutral-700">{goal.due_week}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => router.push(`/goals/${goal.id}`)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
