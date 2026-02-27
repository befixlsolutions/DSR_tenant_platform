'use client';

import { useState } from 'react';
import { Clock, CheckCircle, AlertTriangle, MessageSquare, Plus, Send } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/providers/AuthProvider';
import { getPendingReviews, getReviewsBySLA, type WeeklyReview } from '@/lib/mock-data/reviews';
import { showSuccess, showInfo } from '@/lib/utils/toast';

export default function WeeklyReviewsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'on_time' | 'warning' | 'breached'>('all');
  const [selectedReview, setSelectedReview] = useState<WeeklyReview | null>(null);
  const [coachingNotes, setCoachingNotes] = useState('');
  const [actionItems, setActionItems] = useState<string[]>(['']);

  const allReviews = getPendingReviews(user?.id || '');
  const onTimeReviews = getReviewsBySLA(user?.id || '', 'on_time');
  const warningReviews = getReviewsBySLA(user?.id || '', 'warning');
  const breachedReviews = getReviewsBySLA(user?.id || '', 'breached');

  const filteredReviews = filter === 'all' 
    ? allReviews 
    : filter === 'on_time'
    ? onTimeReviews
    : filter === 'warning'
    ? warningReviews
    : breachedReviews;

  const getSLAColor = (status: string) => {
    switch (status) {
      case 'on_time':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-amber-600 bg-amber-100';
      case 'breached':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-neutral-600 bg-neutral-100';
    }
  };

  const getSLAIcon = (status: string) => {
    switch (status) {
      case 'on_time':
        return <CheckCircle className="w-4 h-4" />;
      case 'warning':
        return <Clock className="w-4 h-4" />;
      case 'breached':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatHoursRemaining = (hours: number) => {
    if (hours < 0) return `${Math.abs(hours)}h overdue`;
    if (hours < 24) return `${hours}h remaining`;
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h remaining`;
  };

  const handleAddActionItem = () => {
    setActionItems([...actionItems, '']);
  };

  const handleActionItemChange = (index: number, value: string) => {
    const updated = [...actionItems];
    updated[index] = value;
    setActionItems(updated);
  };

  const handleApprove = () => {
    if (!selectedReview) return;
    showSuccess(`Report approved for ${selectedReview.employee_name}`);
    setSelectedReview(null);
    setCoachingNotes('');
    setActionItems(['']);
  };

  const handleRequestRework = () => {
    if (!selectedReview) return;
    if (!coachingNotes.trim()) {
      showInfo('Please provide coaching notes for rework request');
      return;
    }
    showSuccess(`Rework requested for ${selectedReview.employee_name}`);
    setSelectedReview(null);
    setCoachingNotes('');
    setActionItems(['']);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Weekly Reviews"
        subtitle="Review and provide feedback on team reports"
        showExport={false}
        showHelp={true}
        onHelp={() => showInfo('Review reports within 24h SLA. Provide coaching notes and action items.')}
      />

      {/* SLA Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('all')}>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Total Pending</p>
                <p className="text-2xl font-bold text-neutral-900">{allReviews.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('on_time')}>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">On Time</p>
                <p className="text-2xl font-bold text-green-600">{onTimeReviews.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('warning')}>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Warning</p>
                <p className="text-2xl font-bold text-amber-600">{warningReviews.length}</p>
              </div>
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('breached')}>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Breached</p>
                <p className="text-2xl font-bold text-red-600">{breachedReviews.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Review Queue */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Review Queue</CardTitle>
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
              {filteredReviews.length === 0 ? (
                <p className="text-sm text-neutral-600 text-center py-8">No pending reviews</p>
              ) : (
                filteredReviews.map((review) => (
                  <div
                    key={review.id}
                    onClick={() => setSelectedReview(review)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedReview?.id === review.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-neutral-900">{review.employee_name}</h4>
                        <p className="text-xs text-neutral-600 mt-1">
                          {review.report_type} • Submitted {new Date(review.submitted_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getSLAColor(review.sla_status)}`}>
                        {getSLAIcon(review.sla_status)}
                        {review.sla_status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-600">
                      <Clock className="w-3 h-3" />
                      <span>{formatHoursRemaining(review.hours_remaining)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Review Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Review & Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedReview ? (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                <p className="text-sm text-neutral-600">Select a report to review</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Selected Report Info */}
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <h4 className="text-sm font-semibold text-neutral-900 mb-2">{selectedReview.employee_name}</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-neutral-600">Type:</span>
                      <span className="ml-2 font-medium text-neutral-900">{selectedReview.report_type}</span>
                    </div>
                    <div>
                      <span className="text-neutral-600">Status:</span>
                      <span className={`ml-2 font-medium ${getSLAColor(selectedReview.sla_status).split(' ')[0]}`}>
                        {selectedReview.sla_status}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-600">Submitted:</span>
                      <span className="ml-2 font-medium text-neutral-900">
                        {new Date(selectedReview.submitted_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-600">Due:</span>
                      <span className="ml-2 font-medium text-neutral-900">
                        {new Date(selectedReview.due_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-3 w-full"
                    onClick={() => window.open(`/reporting/${selectedReview.report_type.toLowerCase()}/${selectedReview.report_id}`, '_blank')}
                  >
                    View Full Report
                  </Button>
                </div>

                {/* Coaching Notes */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Coaching Notes
                  </label>
                  <textarea
                    value={coachingNotes}
                    onChange={(e) => setCoachingNotes(e.target.value)}
                    placeholder="Provide constructive feedback and coaching notes..."
                    className="w-full h-32 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-sm"
                  />
                </div>

                {/* Action Items */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-neutral-700">
                      Action Items (Optional)
                    </label>
                    <button
                      onClick={handleAddActionItem}
                      className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add Item
                    </button>
                  </div>
                  <div className="space-y-2">
                    {actionItems.map((item, index) => (
                      <input
                        key={index}
                        type="text"
                        value={item}
                        onChange={(e) => handleActionItemChange(index, e.target.value)}
                        placeholder={`Action item ${index + 1}`}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                      />
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
                  <Button
                    variant="secondary"
                    onClick={handleRequestRework}
                    className="flex-1"
                  >
                    Request Rework
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleApprove}
                    leftIcon={<CheckCircle className="w-4 h-4" />}
                    className="flex-1"
                  >
                    Approve
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
