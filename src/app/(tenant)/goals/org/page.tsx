'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Target, TrendingUp, AlertTriangle, CheckCircle, Clock, Building2, Filter, BarChart3, Users } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockGoals, Goal, GoalStatus, GoalPriority } from '@/lib/mock-data/goals';
import { showInfo } from '@/lib/utils/toast';

export default function OrgGoalsPage() {
  const router = useRouter();

  // Mock organization data (in real app, this would come from auth context)
  const orgName = 'TechCorp';
  
  // Mock departments
  const departments = [
    { 
      id: 'dept-engineering', 
      name: 'Engineering',
      teams: ['Frontend', 'Backend', 'DevOps'],
      memberIds: ['user-1', 'user-8', 'user-9', 'user-10', 'user-11', 'user-12']
    },
    { 
      id: 'dept-product', 
      name: 'Product',
      teams: ['Product Management', 'Design'],
      memberIds: ['user-2', 'user-3']
    },
    { 
      id: 'dept-sales', 
      name: 'Sales',
      teams: ['Enterprise Sales', 'SMB Sales'],
      memberIds: ['user-4', 'user-5']
    },
    { 
      id: 'dept-marketing', 
      name: 'Marketing',
      teams: ['Content', 'Growth'],
      memberIds: ['user-6', 'user-7']
    },
  ];

  const allOrgMemberIds = departments.flatMap(d => d.memberIds);
  const orgGoals = mockGoals.filter(g => allOrgMemberIds.includes(g.user_id));

  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<GoalStatus | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<GoalPriority | 'all'>('all');
  const [viewMode, setViewMode] = useState<'summary' | 'detailed'>('summary');

  // Filter goals
  const filteredGoals = orgGoals.filter(goal => {
    if (selectedDepartment !== 'all') {
      const dept = departments.find(d => d.id === selectedDepartment);
      if (!dept || !dept.memberIds.includes(goal.user_id)) return false;
    }
    if (selectedStatus !== 'all' && goal.status !== selectedStatus) return false;
    if (selectedPriority !== 'all' && goal.priority !== selectedPriority) return false;
    return true;
  });

  // Calculate organization metrics
  const totalGoals = orgGoals.length;
  const inProgressGoals = orgGoals.filter(g => g.status === 'in_progress').length;
  const achievedGoals = orgGoals.filter(g => g.status === 'achieved').length;
  const atRiskGoals = orgGoals.filter(g => 
    g.status === 'in_progress' && 
    g.actual_progress < g.expected_progress - 10
  ).length;
  const achievementRate = totalGoals > 0 ? Math.round((achievedGoals / totalGoals) * 100) : 0;
  const avgProgress = orgGoals.length > 0 
    ? Math.round(orgGoals.reduce((sum, g) => sum + g.actual_progress, 0) / orgGoals.length)
    : 0;
  const highPriorityGoals = orgGoals.filter(g => g.priority === 'high').length;

  // Department performance comparison
  const deptPerformance = departments.map(dept => {
    const deptGoals = orgGoals.filter(g => dept.memberIds.includes(g.user_id));
    const deptAchieved = deptGoals.filter(g => g.status === 'achieved').length;
    const deptAtRisk = deptGoals.filter(g => 
      g.status === 'in_progress' && 
      g.actual_progress < g.expected_progress - 10
    ).length;
    const deptAvgProgress = deptGoals.length > 0
      ? Math.round(deptGoals.reduce((sum, g) => sum + g.actual_progress, 0) / deptGoals.length)
      : 0;
    const deptAchievementRate = deptGoals.length > 0
      ? Math.round((deptAchieved / deptGoals.length) * 100)
      : 0;
    const deptHighPriority = deptGoals.filter(g => g.priority === 'high').length;

    return {
      ...dept,
      totalGoals: deptGoals.length,
      achieved: deptAchieved,
      atRisk: deptAtRisk,
      avgProgress: deptAvgProgress,
      achievementRate: deptAchievementRate,
      highPriority: deptHighPriority,
    };
  });

  // Strategic goals (high priority)
  const strategicGoals = orgGoals.filter(g => g.priority === 'high' && g.status !== 'achieved');

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

  const getDepartmentName = (userId: string) => {
    const dept = departments.find(d => d.memberIds.includes(userId));
    return dept?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${orgName} Organization Goals`}
        subtitle="Track strategic goals and performance across the entire organization"
        showExport={true}
        showHelp={true}
        onHelp={() => showInfo('View organization-wide goal performance and department comparisons')}
      />

      {/* Organization Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
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
                <p className="text-xs text-neutral-600 mb-1">Strategic</p>
                <p className="text-2xl font-bold text-red-600">{highPriorityGoals}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
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
                <p className="text-xs text-neutral-600 mb-1">Achievement</p>
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

      {/* Strategic Goals Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Strategic Goals (High Priority)</CardTitle>
            <span className="text-sm text-neutral-600">{strategicGoals.length} active</span>
          </div>
        </CardHeader>
        <CardContent>
          {strategicGoals.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
              <p className="text-neutral-600">All strategic goals achieved!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {strategicGoals.slice(0, 5).map(goal => (
                <div
                  key={goal.id}
                  className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors cursor-pointer"
                  onClick={() => router.push(`/goals/${goal.id}`)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">{goal.title}</p>
                      <p className="text-xs text-neutral-600 mt-1">
                        {getDepartmentName(goal.user_id)} • {goal.owner}
                      </p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(goal.status)}`}>
                      {goal.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
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
                    <div className="text-right">
                      <p className="text-xs text-neutral-600">Due</p>
                      <p className="text-sm font-medium text-neutral-900">{goal.due_week}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Department Performance Comparison */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Department Performance</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'summary' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewMode('summary')}
              >
                Summary
              </Button>
              <Button
                variant={viewMode === 'detailed' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewMode('detailed')}
              >
                Detailed
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'summary' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deptPerformance.map(dept => (
                <div
                  key={dept.id}
                  className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary-700" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{dept.name}</p>
                        <p className="text-xs text-neutral-600">{dept.totalGoals} goals • {dept.teams.length} teams</p>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setSelectedDepartment(dept.id)}
                    >
                      View
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-neutral-600">Achievement Rate</p>
                        <span className="text-sm font-bold text-green-600">{dept.achievementRate}%</span>
                      </div>
                      <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-600 transition-all"
                          style={{ width: `${dept.achievementRate}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-neutral-600">Avg Progress</p>
                        <span className="text-sm font-bold text-primary-600">{dept.avgProgress}%</span>
                      </div>
                      <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-600 transition-all"
                          style={{ width: `${dept.avgProgress}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-200">
                      <div className="text-center">
                        <p className="text-lg font-bold text-red-600">{dept.highPriority}</p>
                        <p className="text-xs text-neutral-600">Strategic</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-green-600">{dept.achieved}</p>
                        <p className="text-xs text-neutral-600">Achieved</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-red-600">{dept.atRisk}</p>
                        <p className="text-xs text-neutral-600">At Risk</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-neutral-600">Department</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-neutral-600">Total Goals</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-neutral-600">Strategic</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-neutral-600">Achieved</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-neutral-600">At Risk</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-neutral-600">Achievement Rate</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-neutral-600">Avg Progress</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-neutral-600">Teams</th>
                  </tr>
                </thead>
                <tbody>
                  {deptPerformance.map(dept => (
                    <tr
                      key={dept.id}
                      className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-primary-600" />
                          <span className="text-sm font-medium text-neutral-900">{dept.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-sm font-bold text-neutral-900">{dept.totalGoals}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-sm font-bold text-red-600">{dept.highPriority}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-sm font-bold text-green-600">{dept.achieved}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-sm font-bold text-red-600">{dept.atRisk}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-2 bg-neutral-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-600 transition-all"
                              style={{ width: `${dept.achievementRate}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-green-600">{dept.achievementRate}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-2 bg-neutral-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary-600 transition-all"
                              style={{ width: `${dept.avgProgress}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-primary-600">{dept.avgProgress}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Users className="w-3 h-3 text-neutral-600" />
                          <span className="text-sm text-neutral-700">{dept.teams.length}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
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
              <option value="high">High (Strategic)</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {(selectedDepartment !== 'all' || selectedStatus !== 'all' || selectedPriority !== 'all') && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedDepartment('all');
                  setSelectedStatus('all');
                  setSelectedPriority('all');
                }}
              >
                Clear Filters
              </Button>
            )}

            <div className="ml-auto text-sm text-neutral-600">
              Showing {filteredGoals.length} of {orgGoals.length} goals
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Goals Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Organization Goals</CardTitle>
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
                    <th className="text-left py-3 px-4 text-xs font-medium text-neutral-600">Department</th>
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
                        <span className="text-sm text-neutral-900">{getDepartmentName(goal.user_id)}</span>
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
