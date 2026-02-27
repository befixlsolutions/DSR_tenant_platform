'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  AlertTriangle,
  Calendar,
  User,
  CheckCircle,
  Clock,
  TrendingUp,
  Edit,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/lib/providers/AuthProvider';
import { mockBlockers, type Blocker, severityDescriptions } from '@/lib/mock-data/blockers';
import { showSuccess, showError } from '@/lib/utils/toast';

export default function BlockerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const blockerId = params.id as string;

  // Find blocker
  const blocker = mockBlockers.find(b => b.id === blockerId);

  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState<Blocker['status']>(blocker?.status || 'open');
  const [isEditingETA, setIsEditingETA] = useState(false);
  const [newETA, setNewETA] = useState(blocker?.eta || '');
  const [isEditingOwner, setIsEditingOwner] = useState(false);
  const [newOwner, setNewOwner] = useState(blocker?.owner || '');
  const [resolutionNotes, setResolutionNotes] = useState(blocker?.resolution_notes || '');
  const [showResolutionForm, setShowResolutionForm] = useState(false);

  if (!blocker) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">Blocker not found</h2>
          <p className="text-neutral-600 mb-4">The blocker you're looking for doesn't exist.</p>
          <button onClick={() => router.push('/blockers/my')} className="btn btn-primary">
            Back to Blockers
          </button>
        </div>
      </div>
    );
  }

  const handleUpdateStatus = () => {
    if (newStatus === 'resolved' && !resolutionNotes.trim()) {
      showError('Please add resolution notes before marking as resolved');
      return;
    }

    showSuccess(`Status updated to ${newStatus}`);
    setIsEditingStatus(false);
  };

  const handleUpdateETA = () => {
    if (!newETA) {
      showError('Please enter a valid ETA');
      return;
    }

    showSuccess('ETA updated');
    setIsEditingETA(false);
  };

  const handleUpdateOwner = () => {
    if (!newOwner.trim()) {
      showError('Please enter a valid owner');
      return;
    }

    showSuccess('Owner updated');
    setIsEditingOwner(false);
  };

  const handleEscalate = () => {
    const reason = prompt('Please provide a reason for escalation:');
    if (reason) {
      showSuccess('Blocker escalated to manager');
    }
  };

  const handleResolve = () => {
    if (!resolutionNotes.trim()) {
      showError('Please add resolution notes');
      return;
    }

    showSuccess('Blocker marked as resolved! 🎉');
    router.push('/blockers/my');
  };

  const getSeverityColor = (severity: Blocker['severity']) => {
    switch (severity) {
      case 'S0':
      case 'S1':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'S2':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'S3':
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getStatusColor = (status: Blocker['status']) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'escalated':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'open':
        return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  const getBlockerAge = (createdAt: string) => {
    const days = Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return '1 day';
    return `${days} days`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <button
            onClick={() => router.push('/blockers/my')}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-600" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-semibold text-neutral-900">{blocker.title}</h1>
              <span className={`px-2 py-1 rounded-md border text-xs font-medium ${getSeverityColor(blocker.severity)}`}>
                {blocker.severity}
              </span>
              <span className={`px-2 py-1 rounded-md border text-xs font-medium ${getStatusColor(blocker.status)}`}>
                {blocker.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-neutral-600">{blocker.description}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {blocker.status !== 'resolved' && (
            <>
              <button onClick={handleEscalate} className="btn btn-secondary">
                <TrendingUp className="w-4 h-4 mr-2" />
                Escalate
              </button>
              <button
                onClick={() => setShowResolutionForm(true)}
                className="btn btn-primary"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Resolved
              </button>
            </>
          )}
        </div>
      </div>

      {/* Resolution Form */}
      {showResolutionForm && blocker.status !== 'resolved' && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-base">Resolve Blocker</CardTitle>
          </CardHeader>
          <CardContent>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Resolution Notes <span className="text-red-600">*</span>
            </label>
            <textarea
              value={resolutionNotes}
              onChange={(e) => setResolutionNotes(e.target.value)}
              placeholder="Describe how this blocker was resolved..."
              rows={4}
              className="input w-full mb-3"
            />
            <div className="flex gap-2">
              <button onClick={handleResolve} className="btn btn-primary">
                Confirm Resolution
              </button>
              <button
                onClick={() => {
                  setShowResolutionForm(false);
                  setResolutionNotes(blocker.resolution_notes || '');
                }}
                className="btn btn-ghost"
              >
                Cancel
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Blocker Details */}
          <Card>
            <CardHeader>
              <CardTitle>Blocker Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Severity */}
                <div>
                  <p className="text-xs text-neutral-600 mb-1">Severity</p>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-md border text-sm font-medium ${getSeverityColor(blocker.severity)}`}>
                      {blocker.severity}
                    </span>
                    <span className="text-sm text-neutral-600">
                      {severityDescriptions[blocker.severity]}
                    </span>
                  </div>
                </div>

                {/* Impact */}
                <div>
                  <p className="text-xs text-neutral-600 mb-1">Impact</p>
                  <p className="text-sm text-neutral-900">{blocker.impact}</p>
                </div>

                {/* Status */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-neutral-600">Status</p>
                    {!isEditingStatus && blocker.status !== 'resolved' && (
                      <button
                        onClick={() => setIsEditingStatus(true)}
                        className="text-xs text-primary-600 hover:text-primary-700"
                      >
                        <Edit className="w-3 h-3 inline mr-1" />
                        Update
                      </button>
                    )}
                  </div>
                  {isEditingStatus ? (
                    <div className="space-y-2">
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as Blocker['status'])}
                        className="input w-full"
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="escalated">Escalated</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <div className="flex gap-2">
                        <button onClick={handleUpdateStatus} className="btn btn-primary btn-sm">
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setIsEditingStatus(false);
                            setNewStatus(blocker.status);
                          }}
                          className="btn btn-ghost btn-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span className={`px-2 py-1 rounded-md border text-sm font-medium ${getStatusColor(blocker.status)}`}>
                      {blocker.status.replace('_', ' ').toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Owner */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-neutral-600">Owner</p>
                    {!isEditingOwner && blocker.status !== 'resolved' && (
                      <button
                        onClick={() => setIsEditingOwner(true)}
                        className="text-xs text-primary-600 hover:text-primary-700"
                      >
                        <Edit className="w-3 h-3 inline mr-1" />
                        Update
                      </button>
                    )}
                  </div>
                  {isEditingOwner ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={newOwner}
                        onChange={(e) => setNewOwner(e.target.value)}
                        placeholder="Enter owner name or ID"
                        className="input w-full"
                      />
                      <div className="flex gap-2">
                        <button onClick={handleUpdateOwner} className="btn btn-primary btn-sm">
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setIsEditingOwner(false);
                            setNewOwner(blocker.owner || '');
                          }}
                          className="btn btn-ghost btn-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-neutral-900">{blocker.owner || 'Not assigned'}</p>
                  )}
                </div>

                {/* ETA */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-neutral-600">ETA</p>
                    {!isEditingETA && blocker.status !== 'resolved' && (
                      <button
                        onClick={() => setIsEditingETA(true)}
                        className="text-xs text-primary-600 hover:text-primary-700"
                      >
                        <Edit className="w-3 h-3 inline mr-1" />
                        Update
                      </button>
                    )}
                  </div>
                  {isEditingETA ? (
                    <div className="space-y-2">
                      <input
                        type="date"
                        value={newETA}
                        onChange={(e) => setNewETA(e.target.value)}
                        className="input w-full"
                      />
                      <div className="flex gap-2">
                        <button onClick={handleUpdateETA} className="btn btn-primary btn-sm">
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setIsEditingETA(false);
                            setNewETA(blocker.eta || '');
                          }}
                          className="btn btn-ghost btn-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-neutral-900">{blocker.eta || 'Not set'}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resolution Notes */}
          {blocker.resolution_notes && (
            <Card>
              <CardHeader>
                <CardTitle>Resolution Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-700">{blocker.resolution_notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Escalation History */}
          {blocker.escalation_history.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Escalation History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {blocker.escalation_history.map((escalation, index) => (
                    <div key={index} className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-medium text-neutral-900">
                          Escalated to {escalation.escalated_to}
                        </p>
                        <p className="text-xs text-neutral-600">
                          {new Date(escalation.escalated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-xs text-neutral-600 mb-1">
                        By: {escalation.escalated_by}
                      </p>
                      <p className="text-sm text-neutral-700">
                        Reason: {escalation.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Related To */}
          {blocker.related_to_type && blocker.related_to_id && (
            <Card>
              <CardHeader>
                <CardTitle>Related To</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-600">
                    {blocker.related_to_type === 'goal' ? 'Goal:' : 'Report:'}
                  </span>
                  <button
                    onClick={() => {
                      if (blocker.related_to_type === 'goal') {
                        router.push(`/goals/${blocker.related_to_id}`);
                      } else {
                        router.push(`/reporting/dsr/${blocker.related_to_id}`);
                      }
                    }}
                    className="text-sm text-primary-600 hover:underline"
                  >
                    {blocker.related_to_id}
                  </button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Age</span>
                  <span className="font-medium text-neutral-900">
                    {getBlockerAge(blocker.created_at)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Created</span>
                  <span className="font-medium text-neutral-900">
                    {new Date(blocker.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Last Updated</span>
                  <span className="font-medium text-neutral-900">
                    {new Date(blocker.updated_at).toLocaleDateString()}
                  </span>
                </div>
                {blocker.resolved_at && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">Resolved</span>
                    <span className="font-medium text-green-600">
                      {new Date(blocker.resolved_at).toLocaleDateString()}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Escalations</span>
                  <span className="font-medium text-neutral-900">
                    {blocker.escalation_history.length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Log */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-xs">
                  <p className="text-neutral-600 mb-1">
                    {new Date(blocker.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-neutral-900">Blocker created by {blocker.created_by}</p>
                </div>
                {blocker.escalation_history.map((esc, i) => (
                  <div key={i} className="text-xs">
                    <p className="text-neutral-600 mb-1">
                      {new Date(esc.escalated_at).toLocaleDateString()}
                    </p>
                    <p className="text-neutral-900">Escalated to {esc.escalated_to}</p>
                  </div>
                ))}
                {blocker.resolved_at && (
                  <div className="text-xs">
                    <p className="text-neutral-600 mb-1">
                      {new Date(blocker.resolved_at).toLocaleDateString()}
                    </p>
                    <p className="text-green-600 font-medium">Blocker resolved</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
