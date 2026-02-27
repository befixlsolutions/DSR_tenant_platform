// DSR Detail Page
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockDSRReports } from '@/lib/mock-data/reports';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, XCircle } from 'lucide-react';
import { showSuccess, showInfo } from '@/lib/utils/toast';

export default function DSRDetailPage() {
  const params = useParams();
  const router = useRouter();
  const report = mockDSRReports.find(r => r.id === params.id);

  // Mock: Check if current user is a manager
  const isManager = true; // In real app, this would come from auth context
  const canReview = isManager && report?.status === 'submitted';

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewComments, setReviewComments] = useState('');
  const [reviewAction, setReviewAction] = useState<'approve' | 'rework' | null>(null);

  if (!report) {
    return (
      <div className="p-6">
        <Card className="p-8 text-center">
          <p className="text-gray-500">Report not found</p>
          <Button className="mt-4" onClick={() => router.back()}>Go Back</Button>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string): 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' => {
    switch (status) {
      case 'submitted': return 'info';
      case 'approved': return 'success';
      case 'draft': return 'secondary';
      case 'rework_requested': return 'warning';
      case 'locked': return 'primary';
      default: return 'secondary';
    }
  };

  const canEdit = report.status === 'draft' || report.status === 'rework_requested';

  const handleApprove = () => {
    setReviewAction('approve');
    setShowReviewForm(true);
  };

  const handleRequestRework = () => {
    setReviewAction('rework');
    setShowReviewForm(true);
  };

  const handleSubmitReview = () => {
    if (reviewAction === 'approve') {
      showSuccess('DSR approved successfully');
    } else if (reviewAction === 'rework') {
      if (!reviewComments.trim()) {
        showInfo('Please provide comments for rework request');
        return;
      }
      showSuccess('Rework requested successfully');
    }
    setShowReviewForm(false);
    setReviewComments('');
    setReviewAction(null);
    router.push('/reporting/inbox');
  };

  const handleCancelReview = () => {
    setShowReviewForm(false);
    setReviewComments('');
    setReviewAction(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">{/* Removed p-6, added max-w */}
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">Daily Status Report</h1>
            <Badge variant={getStatusColor(report.status)}>
              {report.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            {new Date(report.report_date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        {canEdit && (
          <Button onClick={() => router.push(`/reporting/dsr/${report.id}/edit`)}>
            Edit Report
          </Button>
        )}
      </div>

      {/* Status Timeline */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Timeline</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Created</p>
              <p className="text-sm text-gray-600">{new Date(report.created_at).toLocaleString()}</p>
            </div>
          </div>
          {report.submitted_at && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Submitted</p>
                <p className="text-sm text-gray-600">{new Date(report.submitted_at).toLocaleString()}</p>
              </div>
            </div>
          )}
          {report.reviewed_at && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Reviewed</p>
                <p className="text-sm text-gray-600">{new Date(report.reviewed_at).toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* What I Did Today */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">What I Did Today</h2>
        <div className="space-y-2">
          {report.what_i_did_today.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="text-gray-400 mt-1">•</span>
              <p className="text-gray-900">{item}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Blockers */}
      {report.blockers.length > 0 && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Blockers</h2>
          <div className="space-y-3">
            {report.blockers.map((blocker) => (
              <div key={blocker.id} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      blocker.severity === 'S0' ? 'danger' :
                      blocker.severity === 'S1' ? 'warning' :
                      blocker.severity === 'S2' ? 'warning' : 'info'
                    }>
                      {blocker.severity}
                    </Badge>
                    <h3 className="font-medium text-gray-900">{blocker.title}</h3>
                  </div>
                  <Badge variant={
                    blocker.status === 'resolved' ? 'success' :
                    blocker.status === 'in_progress' ? 'info' : 'secondary'
                  }>
                    {blocker.status.replace('_', ' ')}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mb-2">{blocker.impact}</p>
                {blocker.eta && (
                  <p className="text-xs text-gray-600">ETA: {blocker.eta}</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tomorrow's Plan */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tomorrow's Plan</h2>
        <div className="space-y-2">
          {report.tomorrow_plan.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="text-gray-400 mt-1">•</span>
              <p className="text-gray-900">{item}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Evidence Links */}
      {report.evidence_links.length > 0 && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Evidence Links</h2>
          <div className="space-y-2">
            {report.evidence_links.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="text-sm">{link}</span>
              </a>
            ))}
          </div>
        </Card>
      )}

      {/* Manager Review */}
      {report.review_comments && (
        <Card className="p-6 bg-purple-50 border-purple-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Manager Review</h2>
          <p className="text-gray-900">{report.review_comments}</p>
          <p className="text-sm text-gray-600 mt-2">
            Reviewed by {report.reviewed_by} on {report.reviewed_at && new Date(report.reviewed_at).toLocaleString()}
          </p>
        </Card>
      )}

      {/* Manager Actions - Only visible to managers for submitted reports */}
      {canReview && !showReviewForm && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Manager Actions</h2>
          <p className="text-sm text-gray-700 mb-4">
            Review this DSR and take action. You can approve it or request rework with comments.
          </p>
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              onClick={handleApprove}
              leftIcon={<CheckCircle className="w-4 h-4" />}
            >
              Approve DSR
            </Button>
            <Button
              variant="secondary"
              onClick={handleRequestRework}
              leftIcon={<XCircle className="w-4 h-4" />}
            >
              Request Rework
            </Button>
          </div>
        </Card>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <Card className="p-6 bg-amber-50 border-amber-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {reviewAction === 'approve' ? 'Approve DSR' : 'Request Rework'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comments {reviewAction === 'rework' && <span className="text-red-500">*</span>}
              </label>
              <textarea
                value={reviewComments}
                onChange={(e) => setReviewComments(e.target.value)}
                placeholder={
                  reviewAction === 'approve'
                    ? 'Add optional feedback (e.g., "Great work!", "Keep it up!")...'
                    : 'Explain what needs to be reworked and why...'
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                onClick={handleSubmitReview}
              >
                {reviewAction === 'approve' ? 'Confirm Approval' : 'Submit Rework Request'}
              </Button>
              <Button
                variant="secondary"
                onClick={handleCancelReview}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button variant="secondary" onClick={() => router.back()}>
          Back to Reports
        </Button>
        <div className="flex gap-3">
          {report.status === 'draft' && (
            <Button variant="secondary">Request Reopen</Button>
          )}
          <Link href="/reporting/inbox">
            <Button variant="secondary">Go to Inbox</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
