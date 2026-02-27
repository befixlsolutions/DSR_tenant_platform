'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, User, Link as LinkIcon, Edit, Trash2, CheckCircle } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getActionById, ActionStatus } from '@/lib/mock-data/actions';
import { showSuccess, showInfo } from '@/lib/utils/toast';

export default function ActionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const actionId = params.id as string;

  const action = getActionById(actionId);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState<ActionStatus>(action?.status || 'open');
  const [completionNotes, setCompletionNotes] = useState(action?.completion_notes || '');

  if (!action) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-neutral-600">Action not found</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
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

  const isOverdue = () => {
    if (action.status === 'completed' || action.status === 'cancelled') return false;
    const today = new Date().toISOString().split('T')[0];
    return action.due_date < today;
  };

  const handleStatusChange = (newStatus: ActionStatus) => {
    setStatus(newStatus);
    showSuccess(`Action status updated to ${newStatus.replace('_', ' ')}`);
  };

  const handleComplete = () => {
    if (!completionNotes.trim()) {
      showInfo('Please add completion notes');
      return;
    }
    showSuccess('Action marked as complete');
    router.push('/actions/my');
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this action?')) {
      showSuccess('Action deleted');
      router.push('/actions/my');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Action Details"
        subtitle={action.title}
        showExport={false}
        showHelp={true}
        onHelp={() => showInfo('View and manage action item details')}
        actions={
          <div className="flex items-center gap-2">
            {action.status !== 'completed' && action.status !== 'cancelled' && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  leftIcon={<Edit className="w-4 h-4" />}
                >
                  {isEditing ? 'Cancel Edit' : 'Edit'}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleDelete}
                  leftIcon={<Trash2 className="w-4 h-4" />}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        }
      />

      {/* Status & Metadata */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-neutral-600 mb-1">Status</p>
              {isEditing ? (
                <select
                  value={status}
                  onChange={(e) => handleStatusChange(e.target.value as ActionStatus)}
                  className="px-3 py-1 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              ) : (
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(action.status)}`}>
                  {action.status.replace('_', ' ')}
                </span>
              )}
            </div>
            <div>
              <p className="text-xs text-neutral-600 mb-1">Priority</p>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getPriorityColor(action.priority)}`}>
                {action.priority}
              </span>
            </div>
            <div>
              <p className="text-xs text-neutral-600 mb-1">Due Date</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neutral-400" />
                <p className={`text-sm font-medium ${isOverdue() ? 'text-red-600' : 'text-neutral-900'}`}>
                  {new Date(action.due_date).toLocaleDateString()}
                  {isOverdue() && ' (Overdue)'}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-neutral-600 mb-1">Created</p>
              <p className="text-sm font-medium text-neutral-900">
                {new Date(action.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Details */}
      <Card>
        <CardHeader>
          <CardTitle>Action Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Title</label>
              <p className="text-base text-neutral-900">{action.title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
              <p className="text-sm text-neutral-700 leading-relaxed">{action.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* People */}
      <Card>
        <CardHeader>
          <CardTitle>People</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Owner</label>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-sm">
                  {action.owner_name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-sm text-neutral-900">{action.owner_name}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Created By</label>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-neutral-400" />
                <span className="text-sm text-neutral-900">{action.created_by_name}</span>
              </div>
            </div>
            {action.assigned_by_name && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Assigned By</label>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm text-neutral-900">{action.assigned_by_name}</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Related Item */}
      {action.related_to_type && (
        <Card>
          <CardHeader>
            <CardTitle>Related Item</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
              <LinkIcon className="w-5 h-5 text-primary-600" />
              <div>
                <p className="text-sm font-medium text-neutral-900 capitalize">{action.related_to_type}</p>
                <p className="text-xs text-neutral-600">{action.related_to_title}</p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  const routes: Record<string, string> = {
                    report: '/reporting/dsr',
                    goal: '/goals',
                    blocker: '/blockers',
                    review: '/reviews/weekly',
                  };
                  const route = routes[action.related_to_type!];
                  if (route && action.related_to_id) {
                    router.push(`${route}/${action.related_to_id}`);
                  }
                }}
              >
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completion Section */}
      {action.status !== 'completed' && action.status !== 'cancelled' && (
        <Card>
          <CardHeader>
            <CardTitle>Complete Action</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Completion Notes
                </label>
                <textarea
                  value={completionNotes}
                  onChange={(e) => setCompletionNotes(e.target.value)}
                  placeholder="Describe what was done to complete this action..."
                  className="w-full h-32 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>
              <Button
                variant="primary"
                onClick={handleComplete}
                leftIcon={<CheckCircle className="w-4 h-4" />}
              >
                Mark as Complete
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completion Info */}
      {action.status === 'completed' && action.completion_notes && (
        <Card>
          <CardHeader>
            <CardTitle>Completion Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Completed At</label>
                <p className="text-sm text-neutral-900">
                  {action.completed_at ? new Date(action.completed_at).toLocaleString() : 'N/A'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Completion Notes</label>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-neutral-700">{action.completion_notes}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-neutral-900">Created</p>
                <p className="text-xs text-neutral-600">{new Date(action.created_at).toLocaleString()}</p>
                <p className="text-xs text-neutral-600">by {action.created_by_name}</p>
              </div>
            </div>
            {action.updated_at !== action.created_at && (
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Last Updated</p>
                  <p className="text-xs text-neutral-600">{new Date(action.updated_at).toLocaleString()}</p>
                </div>
              </div>
            )}
            {action.completed_at && (
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Completed</p>
                  <p className="text-xs text-neutral-600">{new Date(action.completed_at).toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
