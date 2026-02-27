'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, Sparkles, CheckCircle, Target, AlertTriangle, Edit, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockWSRReports } from '@/lib/mock-data/reports';
import { showSuccess, showInfo } from '@/lib/utils/toast';

export default function WSRDetailPage() {
  const params = useParams();
  const router = useRouter();
  const reportId = params.id as string;

  const report = mockWSRReports.find(r => r.id === reportId);
  const [isEditing, setIsEditing] = useState(false);

  if (!report) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-neutral-600">WSR not found</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-700';
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-neutral-100 text-neutral-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-amber-100 text-amber-700';
      case 'low':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const handleEdit = () => {
    router.push(`/reporting/wsr/${reportId}/edit`);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this WSR?')) {
      showSuccess('WSR deleted successfully');
      router.push('/reporting');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Weekly Status Report"
        subtitle={`Week of ${report.week_start} to ${report.week_end}`}
        showExport={true}
        showHelp={true}
        onExport={() => showInfo('Exporting WSR...')}
        onHelp={() => showInfo('WSR provides weekly summary and next week planning')}
        actions={
          <div className="flex items-center gap-2">
            {report.status === 'draft' && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleEdit}
                  leftIcon={<Edit className="w-4 h-4" />}
                >
                  Edit
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
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(report.status)}`}>
                {report.status}
              </span>
            </div>
            <div>
              <p className="text-xs text-neutral-600 mb-1">Week Start</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neutral-400" />
                <p className="text-sm font-medium text-neutral-900">{report.week_start}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-neutral-600 mb-1">Week End</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neutral-400" />
                <p className="text-sm font-medium text-neutral-900">{report.week_end}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-neutral-600 mb-1">Submitted</p>
              <p className="text-sm font-medium text-neutral-900">
                {report.submitted_at ? new Date(report.submitted_at).toLocaleDateString() : 'Not submitted'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Week Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Week Summary</CardTitle>
            {report.ai_generated && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">
                <Sparkles className="w-3 h-3" />
                AI Generated
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-700 leading-relaxed">{report.week_summary}</p>
        </CardContent>
      </Card>

      {/* Key Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Key Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {report.key_achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-neutral-900">{achievement}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Week Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Next Week Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {report.next_week_goals.map((goal, index) => (
              <div key={index} className="border border-neutral-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <Target className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-neutral-900 mb-1">{goal.title}</h4>
                    </div>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getPriorityColor(goal.priority)}`}>
                    {goal.priority}
                  </span>
                </div>
                <div className="ml-8">
                  <p className="text-xs font-medium text-neutral-600 mb-2">Success Criteria:</p>
                  <ul className="space-y-1">
                    {goal.success_criteria.map((criteria, criteriaIndex) => (
                      <li key={criteriaIndex} className="flex items-start gap-2 text-sm text-neutral-700">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Blockers Summary */}
      {report.blockers_summary && (
        <Card>
          <CardHeader>
            <CardTitle>Blockers Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-neutral-700 leading-relaxed">{report.blockers_summary}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Review Section */}
      {report.reviewed_at && (
        <Card>
          <CardHeader>
            <CardTitle>Manager Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <span>Reviewed by:</span>
                <span className="font-medium text-neutral-900">{report.reviewed_by}</span>
                <span>•</span>
                <span>{new Date(report.reviewed_at).toLocaleDateString()}</span>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-neutral-700">Review comments will appear here</p>
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
                <p className="text-xs text-neutral-600">{new Date(report.created_at).toLocaleString()}</p>
              </div>
            </div>
            {report.submitted_at && (
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Submitted</p>
                  <p className="text-xs text-neutral-600">{new Date(report.submitted_at).toLocaleString()}</p>
                </div>
              </div>
            )}
            {report.reviewed_at && (
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Reviewed</p>
                  <p className="text-xs text-neutral-600">{new Date(report.reviewed_at).toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
