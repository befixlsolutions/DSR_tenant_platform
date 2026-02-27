'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, CheckCircle, Clock, AlertTriangle, Filter, UserPlus } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getTeamActions, type Action, type ActionStatus } from '@/lib/mock-data/actions';
import { showSuccess, showInfo } from '@/lib/utils/toast';

export default function TeamActionsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | ActionStatus | 'overdue'>('all');
  const [memberFilter, setMemberFilter] = useState<string>('all');

  // Mock team member IDs (in real app, get from auth context)
  const teamMemberIds = ['user-1', 'user-8', 'user-9', 'user-10'];
  const allActions = getTeamActions(teamMemberIds);

  const filteredActions = allActions.filter(action => {
    const statusMatch = filter === 'all' || 
      (filter === 'overdue' && isOverdue(action.due_date, action.status)) ||
      action.status === filter;
    const memberMatch = memberFilter === 'all' || action.owner_id === memberFilter;
    return statusMatch && memberMatch;
  });

  const teamMembers = [
    { id: 'user-1', name: 'John Employee' },
    { id: 'user-8', name: 'Jane Developer' },
    { id: 'user-9', name: 'Bob Engineer' },
    { id: 'user-10', name: 'Alice Designer' },
  ];

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
        return 'bg-red-100 text-red-700';
      case 'high':
        return 'bg-orange-100 text-orange-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  function isOverdue(dueDate: string, status: ActionStatus): boolean {
    if (status === 'completed' || status === 'cancelled') return false;
    const today = new Date().toISOString().split('T')[0];
    return dueDate < today;
  }

  const handleReassign = (actionId: string) => {
    showInfo('Reassignment dialog would open here');
  };

  const handleBulkComplete = () => {
    showSuccess('Selected actions marked as complete');
  };

  const stats = {
    total: allActions.length,
    open: allActions.filter(a => a.status === 'open').length,
    inProgress: allActions.filter(a => a.status === 'in_progress').length,
    overdue: allActions.filter(a => isOverdue(a.due_date, a.status)).length,
    completed: allActions.filter(a => a.status === 'completed').length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Actions"
        subtitle="Manage and track team action items"
        showExport={true}
        showHelp={true}
        onExport={() => showInfo('Exporting team actions...')}
        onHelp={() => showInfo('Manage action items for your team members')}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('all')}>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Total Actions</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-neutral-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('open')}>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Open</p>
                <p className="text-2xl font-bold text-blue-600">{stats.open}</p>
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
                <p className="text-2xl font-bold text-amber-600">{stats.inProgress}</p>
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
                <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
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
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-neutral-600" />
              <span className="text-sm font-medium text-neutral-700">Filters:</span>
            </div>
            <select
              value={memberFilter}
              onChange={(e) => setMemberFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Team Members</option>
              {teamMembers.map(member => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>
            {filter !== 'all' && (
              <button
                onClick={() => setFilter('all')}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Actions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Team Actions</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleBulkComplete}
              >
                Bulk Complete
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Action</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Owner</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Priority</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Status</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Due Date</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredActions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-sm text-neutral-600">
                      No actions found
                    </td>
                  </tr>
                ) : (
                  filteredActions.map((action) => {
                    const overdue = isOverdue(action.due_date, action.status);
                    return (
                      <tr key={action.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                        <td className="py-4 px-4">
                          <input type="checkbox" className="rounded" />
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <button
                              onClick={() => router.push(`/actions/${action.id}`)}
                              className="text-sm font-medium text-neutral-900 hover:text-primary-600"
                            >
                              {action.title}
                            </button>
                            <p className="text-xs text-neutral-600 mt-1">{action.description.substring(0, 60)}...</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-xs">
                              {action.owner_name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm text-neutral-900">{action.owner_name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getPriorityColor(action.priority)}`}>
                            {action.priority}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(action.status)}`}>
                            {action.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`text-sm ${overdue ? 'text-red-600 font-semibold' : 'text-neutral-900'}`}>
                            {new Date(action.due_date).toLocaleDateString()}
                            {overdue && ' ⚠️'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => handleReassign(action.id)}
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 mx-auto"
                          >
                            <UserPlus className="w-4 h-4" />
                            Reassign
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Team Member Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Actions by Team Member</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map(member => {
              const memberActions = allActions.filter(a => a.owner_id === member.id);
              const memberOpen = memberActions.filter(a => a.status === 'open').length;
              const memberOverdue = memberActions.filter(a => isOverdue(a.due_date, a.status)).length;
              
              return (
                <div key={member.id} className="p-4 border border-neutral-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-sm">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm font-semibold text-neutral-900">{member.name}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Total:</span>
                      <span className="font-semibold text-neutral-900">{memberActions.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Open:</span>
                      <span className="font-semibold text-blue-600">{memberOpen}</span>
                    </div>
                    {memberOverdue > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-600">Overdue:</span>
                        <span className="font-semibold text-red-600">{memberOverdue}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
