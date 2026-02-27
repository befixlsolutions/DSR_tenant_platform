'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Target, TrendingUp, AlertTriangle, CheckCircle, Clock, Users, Filter } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockGoals, Goal, GoalStatus, GoalPriority } from '@/lib/mock-data/goals';
import { showInfo } from '@/lib/utils/toast';

export default function TeamGoalsPage() {
  const router = useRouter();

  // Mock team member IDs (in real app, this would come from auth context)
  const teamMemberIds = ['user-1', 'user-8', 'user-9'];
  
  // Filter team goals
  const teamGoals = mockGoals.filter(g => teamMemberIds.includes(g.user_id));

  const [selectedMember, setSelectedMember] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<GoalStatus | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<GoalPriority | 'all'>('all');

  // Filter goals
  const filteredGoals = teamGoals.filter(goal => {
    if (selectedMember !== 'all' && goal.user_id !== selectedMember) return false;
    if (selectedStatus !== 'all' && goal.status !== selectedStatus) return false;
    if (selectedPriority !== 'all' && goal.priority !== selectedPriority) return false;
    return true;
  });

  // Calculate team metrics
  const totalGoals = teamGoals.length;
  const inProgressGoals = teamGoals.filter(g => g.status === 'in_progress').length;
  const achievedGoals = teamGoals.filter(g => g.status === 'achieved').length;
  const atRiskGoals = teamGoals.filter(g => 
    g.status === 'in_progress' && 
    g.actual_progress < g.expected_progress - 10
  ).length;
  const achievementRate = totalGoals > 0 ? Math.round((achievedGoals / totalGoals) * 100) : 0;

  // Team members with goal counts
  const teamMembers = [
    { id: 'user-1', name: 'John Employee', goals: teamGoals.filter(g => g.user_id === 'user-1').length },
    { id: 'user-8', name: 'Jane Developer', goals: teamGoals.filter(g => g.user_id === 'user-8').length },
    { id: 'user-9', name: 'Bob Engineer', goals: teamGoals.filter(g => g.user_id === 'user-9').length },
  ];

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

  const getUserName = (userId: string) => {
    const member = teamMembers.find(m => m.id === userId);
    return member?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Goals"
        subtitle="Manage and track your team's goals"
        showExport={true}
        showHelp={true}
        onHelp={() => showInfo('View and manage goals for all team members')}
      />

      {/* Team Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
      </div>

      {/* Team Members Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teamMembers.map(member => {
              const memberGoals = teamGoals.filter(g => g.user_id === member.id);
              const memberAchieved = memberGoals.filter(g => g.status === 'achieved').length;
              const memberInProgress = memberGoals.filter(g => g.status === 'in_progress').length;
              const memberAtRisk = memberGoals.filter(g => 
                g.status === 'in_progress' && 
                g.actual_progress < g.expected_progress - 10
              ).length;

              return (
                <div
                  key={member.id}
                  className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors cursor-pointer"
                  onClick={() => setSelectedMember(member.id)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{member.name}</p>
                      <p className="text-xs text-neutral-600">{member.goals} goals</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-lg font-bold text-green-600">{memberAchieved}</p>
                      <p className="text-xs text-neutral-600">Achieved</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-blue-600">{memberInProgress}</p>
                      <p className="text-xs text-neutral-600">Active</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-red-600">{memberAtRisk}</p>
                      <p className="text-xs text-neutral-600">At Risk</p>
                    </div>
                  </div>
                </div>
              );
            })}
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
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Team Members</option>
              {teamMembers.map(member => (
                <option key={member.id} value={member.id}>{member.name}</option>
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

            {(selectedMember !== 'all' || selectedStatus !== 'all' || selectedPriority !== 'all') && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedMember('all');
                  setSelectedStatus('all');
                  setSelectedPriority('all');
                }}
              >
                Clear Filters
              </Button>
            )}

            <div className="ml-auto text-sm text-neutral-600">
              Showing {filteredGoals.length} of {teamGoals.length} goals
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Goals</CardTitle>
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
                    <th className="text-left py-3 px-4 text-xs font-medium text-neutral-600">Owner</th>
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
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-xs">
                            {getUserName(goal.user_id).split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm text-neutral-900">{getUserName(goal.user_id)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm font-medium text-neutral-900">{goal.title}</p>
                        <p className="text-xs text-neutral-600 mt-0.5">{goal.category}</p>
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
