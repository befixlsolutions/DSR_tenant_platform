'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, CheckCircle, Clock, AlertTriangle, Calendar, Link as LinkIcon, User } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/providers/AuthProvider';
import { getActionsByOwner, getActionsByStatus, getOverdueActions, type Action, type ActionStatus } from '@/lib/mock-data/actions';
import { showSuccess, showInfo } from '@/lib/utils/toast';

export default function MyActionsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | ActionStatus | 'overdue'>('all');

  const allActions = getActionsByOwner(user?.id || '');
  const openActions = getActionsByStatus(user?.id || '', 'open');
  const inProgressActions = getActionsByStatus(user?.id || '', 'in_progress');
  const completedActions = getActionsByStatus(user?.id || '', 'completed');
  const overdueActions = getOverdueActions(user?.id || '');

  const filteredActions = filter === 'all'
    ? allActions
    : filter === 'overdue'
    ? overdueActions
    : getActionsByStatus(user?.id || '', filter as ActionStatus);

  const getStatusColor = (status: ActionStatus) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-700';
      case 'in_progress':
        return 'bg-amber-100 text-amber-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-neutral-100 text-neutral-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-300';
    }
  };

  const isOverdue = (dueDate: string, status: ActionStatus) => {
    if (status === 'completed' || status === 'cancelled') return false;
    const today = new Date().toISOString().split('T')[0];
    return dueDate < today;
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleMarkComplete = (actionId: string) => {
    showSuccess('Action marked as complete');
  };

  const handleMarkInProgress = (actionId: string) => {
    showSuccess('Action marked as in progress');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Actions"
        subtitle="Track and manage your action items"
        showExport={false}
        showHelp={true}
        onHelp={() => showInfo('Actions are follow-up tasks from reviews, goals, and blockers')}
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push('/actions/new')}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Create Action
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('all')}>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">All Actions</p>
                <p className="text-2xl font-bold text-neutral-900">{allActions.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-neutral-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('open')}>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Open</p>
                <p className="text-2xl font-bold text-blue-600">{openActions.length}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('in_progress')}>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">In Progress</p>
                <p className="text-2xl font-bold text-amber-600">{inProgressActions.length}</p>
              </div>
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('overdue')}>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{overdueActions.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('completed')}>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedActions.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {filter === 'all' ? 'All Actions' : 
               filter === 'overdue' ? 'Overdue Actions' :
               `${filter.replace('_', ' ')} Actions`.replace(/\b\w/g, l => l.toUpperCase())}
            </CardTitle>
            {filter !== 'all' && (
              <button
                onClick={() => setFilter('all')}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Show All
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredActions.length === 0 ? (
              <p className="text-sm text-neutral-600 text-center py-8">No actions found</p>
            ) : (
              filteredActions.map((action) => {
                const daysUntilDue = getDaysUntilDue(action.due_date);
                const overdue = isOverdue(action.due_date, action.status);

                return (
                  <div
                    key={action.id}
                    className="p-4 border border-neutral-200 rounded-lg hover:border-neutral-300 hover:bg-neutral-50 transition-all cursor-pointer"
                    onClick={() => router.push(`/actions/${action.id}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-sm font-semibold text-neutral-900">{action.title}</h4>
                          <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full border ${getPriorityColor(action.priority)}`}>
                            {action.priority}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-600 mb-2">{action.description}</p>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(action.status)}`}>
                        {action.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-neutral-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span className={overdue ? 'text-red-600 font-semibold' : ''}>
                          Due: {new Date(action.due_date).toLocaleDateString()}
                          {overdue && ' (Overdue)'}
                          {!overdue && action.status !== 'completed' && ` (${daysUntilDue}d)`}
                        </span>
                      </div>
                      {action.assigned_by_name && (
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>Assigned by: {action.assigned_by_name}</span>
                        </div>
                      )}
                      {action.related_to_type && (
                        <div className="flex items-center gap-1">
                          <LinkIcon className="w-3 h-3" />
                          <span>Related to: {action.related_to_type}</span>
                        </div>
                      )}
                    </div>

                    {action.status !== 'completed' && action.status !== 'cancelled' && (
                      <div className="flex items-center gap-2 pt-3 border-t border-neutral-200">
                        {action.status === 'open' && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkInProgress(action.id);
                            }}
                          >
                            Start
                          </Button>
                        )}
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkComplete(action.id);
                          }}
                          leftIcon={<CheckCircle className="w-4 h-4" />}
                        >
                          Mark Complete
                        </Button>
                      </div>
                    )}

                    {action.status === 'completed' && action.completion_notes && (
                      <div className="pt-3 border-t border-neutral-200">
                        <p className="text-xs text-neutral-600">
                          <span className="font-medium">Completion notes:</span> {action.completion_notes}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
