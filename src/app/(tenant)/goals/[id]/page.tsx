'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  Target,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  Link as LinkIcon,
  Plus,
  Edit,
  Trash2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/lib/providers/AuthProvider';
import { mockGoals, type Goal } from '@/lib/mock-data/goals';
import { getBlockersByGoal } from '@/lib/mock-data/blockers';
import { showSuccess, showError } from '@/lib/utils/toast';

export default function GoalDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const goalId = params.id as string;

  // Find goal
  const goal = mockGoals.find(g => g.id === goalId);
  const blockers = goal ? getBlockersByGoal(goal.id) : [];

  const [isEditingProgress, setIsEditingProgress] = useState(false);
  const [newProgress, setNewProgress] = useState(goal?.actual_progress || 0);
  const [newEvidence, setNewEvidence] = useState('');
  const [showEvidenceForm, setShowEvidenceForm] = useState(false);

  if (!goal) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Target className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">Goal not found</h2>
          <p className="text-neutral-600 mb-4">The goal you're looking for doesn't exist.</p>
          <button onClick={() => router.push('/goals/my')} className="btn btn-primary">
            Back to Goals
          </button>
        </div>
      </div>
    );
  }

  const handleUpdateProgress = () => {
    if (newProgress < goal.actual_progress) {
      showError('Progress cannot decrease');
      return;
    }

    const jump = newProgress - goal.actual_progress;
    if (jump > 20) {
      showError('Large progress jumps (>20%) require manager approval');
      return;
    }

    showSuccess(`Progress updated to ${newProgress}%`);
    setIsEditingProgress(false);
  };

  const handleAddEvidence = () => {
    if (!newEvidence.trim()) {
      showError('Please enter a valid URL');
      return;
    }

    showSuccess('Evidence link added');
    setNewEvidence('');
    setShowEvidenceForm(false);
  };

  const handleMarkAchieved = () => {
    if (goal.actual_progress < 100) {
      showError('Goal must be at 100% progress to mark as achieved');
      return;
    }

    showSuccess('Goal marked as achieved! 🎉');
    router.push('/goals/my');
  };

  const handleDeferGoal = () => {
    const reason = prompt('Please provide a reason for deferring this goal:');
    if (reason) {
      showSuccess('Goal deferred');
      router.push('/goals/my');
    }
  };

  const getStatusColor = (status: Goal['status']) => {
    switch (status) {
      case 'achieved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'not_started':
        return 'bg-neutral-100 text-neutral-700 border-neutral-200';
      case 'deferred':
      case 'missed':
        return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  const getPriorityColor = (priority: Goal['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-amber-600';
      case 'low':
        return 'text-blue-600';
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
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <button
            onClick={() => router.push('/goals/my')}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-600" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-semibold text-neutral-900">{goal.title}</h1>
              <span className={`px-2 py-1 rounded-md border text-xs font-medium ${getStatusColor(goal.status)}`}>
                {goal.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-neutral-600">{goal.description}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {goal.status === 'in_progress' && (
            <>
              <button
                onClick={handleMarkAchieved}
                className="btn btn-primary"
                disabled={goal.actual_progress < 100}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Achieved
              </button>
              <button onClick={handleDeferGoal} className="btn btn-secondary">
                Defer Goal
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Goal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Goal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-neutral-600 mb-1">Category</p>
                  <p className="text-sm font-medium text-neutral-900">{goal.category}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-600 mb-1">Related Project</p>
                  <p className="text-sm font-medium text-neutral-900">{goal.related_project || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-600 mb-1">Priority</p>
                  <p className={`text-sm font-medium ${getPriorityColor(goal.priority)}`}>
                    {goal.priority.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-600 mb-1">Risk Level</p>
                  <p className={`text-sm font-medium ${getRiskColor(goal.risk_level)}`}>
                    {goal.risk_level.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-600 mb-1">Due Week</p>
                  <p className="text-sm font-medium text-neutral-900">{goal.due_week}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-600 mb-1">Owner</p>
                  <p className="text-sm font-medium text-neutral-900">{goal.owner}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Criteria */}
          <Card>
            <CardHeader>
              <CardTitle>Success Criteria (Required)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {goal.success_criteria.map((criteria, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700">{criteria}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Progress Tracking */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Progress Tracking</CardTitle>
                {!isEditingProgress && goal.status === 'in_progress' && (
                  <button
                    onClick={() => setIsEditingProgress(true)}
                    className="btn btn-secondary btn-sm"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Update
                  </button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress Bars */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-neutral-700">Actual Progress</span>
                    <span className="font-semibold text-neutral-900">{goal.actual_progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-600 transition-all"
                      style={{ width: `${goal.actual_progress}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-neutral-700">Expected Progress</span>
                    <span className="font-semibold text-neutral-900">{goal.expected_progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-neutral-400 transition-all"
                      style={{ width: `${goal.expected_progress}%` }}
                    />
                  </div>
                </div>

                {/* Gap Indicator */}
                {goal.actual_progress < goal.expected_progress && (
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-900">
                      <AlertTriangle className="w-4 h-4 inline mr-1" />
                      {goal.expected_progress - goal.actual_progress}% behind expected progress
                    </p>
                  </div>
                )}

                {/* Update Form */}
                {isEditingProgress && (
                  <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      New Progress (%)
                    </label>
                    <input
                      type="number"
                      min={goal.actual_progress}
                      max="100"
                      value={newProgress}
                      onChange={(e) => setNewProgress(Number(e.target.value))}
                      className="input w-full mb-3"
                    />
                    <p className="text-xs text-neutral-600 mb-3">
                      Note: Progress jumps &gt;20% require manager approval
                    </p>
                    <div className="flex gap-2">
                      <button onClick={handleUpdateProgress} className="btn btn-primary">
                        Save Progress
                      </button>
                      <button
                        onClick={() => {
                          setIsEditingProgress(false);
                          setNewProgress(goal.actual_progress);
                        }}
                        className="btn btn-ghost"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Evidence Links */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Evidence Links</CardTitle>
                <button
                  onClick={() => setShowEvidenceForm(!showEvidenceForm)}
                  className="btn btn-secondary btn-sm"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add Evidence
                </button>
              </div>
            </CardHeader>
            <CardContent>
              {showEvidenceForm && (
                <div className="mb-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Evidence URL
                  </label>
                  <input
                    type="url"
                    value={newEvidence}
                    onChange={(e) => setNewEvidence(e.target.value)}
                    placeholder="https://github.com/..."
                    className="input w-full mb-3"
                  />
                  <div className="flex gap-2">
                    <button onClick={handleAddEvidence} className="btn btn-primary">
                      Add Link
                    </button>
                    <button
                      onClick={() => {
                        setShowEvidenceForm(false);
                        setNewEvidence('');
                      }}
                      className="btn btn-ghost"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {goal.evidence_links.length === 0 ? (
                <p className="text-sm text-neutral-500 text-center py-4">
                  No evidence links added yet
                </p>
              ) : (
                <ul className="space-y-2">
                  {goal.evidence_links.map((link, index) => (
                    <li key={index} className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg">
                      <LinkIcon className="w-4 h-4 text-primary-600 flex-shrink-0" />
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:underline flex-1 truncate"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Blockers */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Blockers ({blockers.length})</CardTitle>
                <button
                  onClick={() => router.push('/blockers/new')}
                  className="btn btn-secondary btn-sm"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add Blocker
                </button>
              </div>
            </CardHeader>
            <CardContent>
              {blockers.length === 0 ? (
                <p className="text-sm text-neutral-500 text-center py-4">
                  No blockers for this goal
                </p>
              ) : (
                <div className="space-y-2">
                  {blockers.map((blocker) => (
                    <div
                      key={blocker.id}
                      className="p-3 bg-neutral-50 rounded-lg border border-neutral-200"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-sm font-medium text-neutral-900">{blocker.title}</h4>
                        <span className={`badge ${
                          blocker.severity === 'S0' || blocker.severity === 'S1'
                            ? 'badge-danger'
                            : 'badge-warning'
                        }`}>
                          {blocker.severity}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 mb-2">{blocker.impact}</p>
                      <div className="flex items-center gap-3 text-xs text-neutral-600">
                        <span>Status: {blocker.status}</span>
                        {blocker.owner && <span>Owner: {blocker.owner}</span>}
                        {blocker.eta && <span>ETA: {blocker.eta}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
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
                  <span className="text-neutral-600">Created</span>
                  <span className="font-medium text-neutral-900">
                    {new Date(goal.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Last Updated</span>
                  <span className="font-medium text-neutral-900">
                    {new Date(goal.updated_at).toLocaleDateString()}
                  </span>
                </div>
                {goal.achieved_at && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">Achieved</span>
                    <span className="font-medium text-green-600">
                      {new Date(goal.achieved_at).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Dependencies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Dependencies</CardTitle>
            </CardHeader>
            <CardContent>
              {goal.dependencies.length === 0 ? (
                <p className="text-sm text-neutral-500 text-center py-2">
                  No dependencies
                </p>
              ) : (
                <ul className="space-y-2">
                  {goal.dependencies.map((dep, index) => (
                    <li key={index} className="text-sm text-neutral-700">
                      • {dep}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Activity Ledger */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Activity Ledger</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-xs">
                  <p className="text-neutral-600 mb-1">
                    {new Date(goal.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-neutral-900">Goal created</p>
                </div>
                <div className="text-xs">
                  <p className="text-neutral-600 mb-1">
                    {new Date(goal.updated_at).toLocaleDateString()}
                  </p>
                  <p className="text-neutral-900">Progress updated to {goal.actual_progress}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
