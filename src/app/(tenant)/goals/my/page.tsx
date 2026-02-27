'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Filter, Target, CheckCircle, Clock, XCircle } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/lib/providers/AuthProvider';
import { getGoalsByUser, type Goal } from '@/lib/mock-data/goals';
import { showSuccess } from '@/lib/utils/toast';

type GoalTab = 'active' | 'completed' | 'deferred';
type GoalPriority = 'all' | 'high' | 'medium' | 'low';
type SortOption = 'due_date' | 'priority' | 'progress' | 'risk';

export default function MyGoalsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<GoalTab>('active');
  const [priorityFilter, setPriorityFilter] = useState<GoalPriority>('all');
  const [sortBy, setSortBy] = useState<SortOption>('due_date');

  // Get user's goals
  const allGoals = getGoalsByUser(user?.id || '');

  // Filter goals by tab
  const filteredGoals = allGoals.filter(goal => {
    if (activeTab === 'active') {
      return goal.status === 'in_progress' || goal.status === 'not_started';
    } else if (activeTab === 'completed') {
      return goal.status === 'achieved';
    } else {
      return goal.status === 'deferred' || goal.status === 'missed';
    }
  });

  // Apply priority filter
  const priorityFilteredGoals = priorityFilter === 'all' 
    ? filteredGoals 
    : filteredGoals.filter(g => g.priority === priorityFilter);

  // Sort goals
  const sortedGoals = [...priorityFilteredGoals].sort((a, b) => {
    switch (sortBy) {
      case 'due_date':
        return a.due_week.localeCompare(b.due_week);
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'progress':
        return b.actual_progress - a.actual_progress;
      case 'risk':
        const riskOrder = { high: 3, medium: 2, low: 1 };
        return riskOrder[b.risk_level] - riskOrder[a.risk_level];
      default:
        return 0;
    }
  });

  const getStatusIcon = (status: Goal['status']) => {
    switch (status) {
      case 'achieved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'not_started':
        return <Target className="w-5 h-5 text-neutral-400" />;
      case 'deferred':
      case 'missed':
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusLabel = (status: Goal['status']) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getPriorityColor = (priority: Goal['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getRiskColor = (risk: Goal['risk_level']) => {
    switch (risk) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-amber-600';
      case 'low':
        return 'text-green-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="My Goals"
        subtitle="Track and manage your goals with the Goal Lifecycle System"
        showExport={false}
        onHelp={() => showSuccess('Help: Goals are tracked using the GLS system')}
        actions={
          <button
            onClick={() => router.push('/goals/new')}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Goal
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'active'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Active Goals ({allGoals.filter(g => g.status === 'in_progress' || g.status === 'not_started').length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'completed'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Completed ({allGoals.filter(g => g.status === 'achieved').length})
        </button>
        <button
          onClick={() => setActiveTab('deferred')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'deferred'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Deferred ({allGoals.filter(g => g.status === 'deferred' || g.status === 'missed').length})
        </button>
      </div>

      {/* Filters & Sort */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-neutral-500" />
          <span className="text-sm text-neutral-700">Priority:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as GoalPriority)}
            className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-700">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option value="due_date">Due Date</option>
            <option value="priority">Priority</option>
            <option value="progress">Progress</option>
            <option value="risk">Risk Level</option>
          </select>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-3">
        {sortedGoals.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Target className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-base font-medium text-neutral-900 mb-2">
                No goals found
              </h3>
              <p className="text-sm text-neutral-500 mb-4">
                {activeTab === 'active' && 'Create your first goal to get started'}
                {activeTab === 'completed' && 'No completed goals yet'}
                {activeTab === 'deferred' && 'No deferred goals'}
              </p>
              {activeTab === 'active' && (
                <button
                  onClick={() => router.push('/goals/new')}
                  className="btn btn-primary"
                >
                  Create Goal
                </button>
              )}
            </CardContent>
          </Card>
        ) : (
          sortedGoals.map((goal) => (
            <Card
              key={goal.id}
              className="hover:shadow-md hover:border-neutral-300 cursor-pointer transition-all"
              onClick={() => router.push(`/goals/${goal.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  {/* Left: Goal Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      {getStatusIcon(goal.status)}
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-neutral-900 mb-1">
                          {goal.title}
                        </h3>
                        <p className="text-sm text-neutral-600 line-clamp-2">
                          {goal.description}
                        </p>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mt-3 text-xs text-neutral-600">
                      <span className={`px-2 py-1 rounded-md border font-medium ${getPriorityColor(goal.priority)}`}>
                        {goal.priority.toUpperCase()}
                      </span>
                      <span>Due: {goal.due_week}</span>
                      <span>Category: {goal.category}</span>
                      {goal.blockers.length > 0 && (
                        <span className="text-red-600">
                          {goal.blockers.length} blocker{goal.blockers.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Progress & Risk */}
                  <div className="flex flex-col items-end gap-2 min-w-[120px]">
                    {/* Progress */}
                    <div className="w-full">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-neutral-600">Progress</span>
                        <span className="font-medium text-neutral-900">{goal.actual_progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            goal.actual_progress >= goal.expected_progress
                              ? 'bg-green-500'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${goal.actual_progress}%` }}
                        />
                      </div>
                      {goal.actual_progress < goal.expected_progress && (
                        <p className="text-xs text-amber-600 mt-1">
                          {goal.expected_progress - goal.actual_progress}% behind
                        </p>
                      )}
                    </div>

                    {/* Risk Level */}
                    <div className="text-xs">
                      <span className="text-neutral-600">Risk: </span>
                      <span className={`font-medium ${getRiskColor(goal.risk_level)}`}>
                        {goal.risk_level.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
