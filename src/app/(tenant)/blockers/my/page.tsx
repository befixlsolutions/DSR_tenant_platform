'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Filter, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/lib/providers/AuthProvider';
import { getBlockersByUser, type Blocker, severityDescriptions } from '@/lib/mock-data/blockers';
import { showSuccess } from '@/lib/utils/toast';

type BlockerTab = 'active' | 'resolved';
type SeverityFilter = 'all' | 'S0' | 'S1' | 'S2' | 'S3';
type SortOption = 'age' | 'severity' | 'status';

export default function MyBlockersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<BlockerTab>('active');
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('age');

  // Get user's blockers
  const allBlockers = getBlockersByUser(user?.id || '');

  // Filter blockers by tab
  const filteredBlockers = allBlockers.filter(blocker => {
    if (activeTab === 'active') {
      return blocker.status !== 'resolved';
    } else {
      return blocker.status === 'resolved';
    }
  });

  // Apply severity filter
  const severityFilteredBlockers = severityFilter === 'all' 
    ? filteredBlockers 
    : filteredBlockers.filter(b => b.severity === severityFilter);

  // Sort blockers
  const sortedBlockers = [...severityFilteredBlockers].sort((a, b) => {
    switch (sortBy) {
      case 'age':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'severity':
        const severityOrder = { S0: 4, S1: 3, S2: 2, S3: 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const getStatusIcon = (status: Blocker['status']) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'escalated':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'open':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
    }
  };

  const getStatusLabel = (status: Blocker['status']) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
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

  const getBlockerAge = (createdAt: string) => {
    const days = Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return '1 day';
    return `${days} days`;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="My Blockers"
        subtitle="Track and manage blockers affecting your work"
        showExport={false}
        onHelp={() => showSuccess('Help: Blockers are issues preventing progress')}
        actions={
          <button
            onClick={() => router.push('/blockers/new')}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Blocker
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
          Active Blockers ({allBlockers.filter(b => b.status !== 'resolved').length})
        </button>
        <button
          onClick={() => setActiveTab('resolved')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'resolved'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Resolved ({allBlockers.filter(b => b.status === 'resolved').length})
        </button>
      </div>

      {/* Filters & Sort */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-neutral-500" />
          <span className="text-sm text-neutral-700">Severity:</span>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as SeverityFilter)}
            className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option value="all">All</option>
            <option value="S0">S0 - Critical</option>
            <option value="S1">S1 - High</option>
            <option value="S2">S2 - Medium</option>
            <option value="S3">S3 - Low</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-700">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option value="age">Age (Newest First)</option>
            <option value="severity">Severity</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      {/* Blockers List */}
      <div className="space-y-3">
        {sortedBlockers.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <AlertTriangle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-base font-medium text-neutral-900 mb-2">
                No blockers found
              </h3>
              <p className="text-sm text-neutral-500 mb-4">
                {activeTab === 'active' && 'No active blockers - great work!'}
                {activeTab === 'resolved' && 'No resolved blockers yet'}
              </p>
              {activeTab === 'active' && (
                <button
                  onClick={() => router.push('/blockers/new')}
                  className="btn btn-primary"
                >
                  Create Blocker
                </button>
              )}
            </CardContent>
          </Card>
        ) : (
          sortedBlockers.map((blocker) => (
            <Card
              key={blocker.id}
              className="hover:shadow-md hover:border-neutral-300 cursor-pointer transition-all"
              onClick={() => router.push(`/blockers/${blocker.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  {/* Left: Blocker Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      {getStatusIcon(blocker.status)}
                      <div className="flex-1">
                        <div className="flex items-start gap-2 mb-1">
                          <h3 className="text-base font-semibold text-neutral-900 flex-1">
                            {blocker.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-md border text-xs font-medium ${getSeverityColor(blocker.severity)}`}>
                            {blocker.severity}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-600 line-clamp-2 mb-2">
                          {blocker.description}
                        </p>
                        <p className="text-sm text-neutral-700 mb-2">
                          <span className="font-medium">Impact:</span> {blocker.impact}
                        </p>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-neutral-600">
                      <span className={`px-2 py-1 rounded-md ${
                        blocker.status === 'resolved' ? 'bg-green-100 text-green-700' :
                        blocker.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                        blocker.status === 'escalated' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {getStatusLabel(blocker.status)}
                      </span>
                      <span>Age: {getBlockerAge(blocker.created_at)}</span>
                      {blocker.owner && <span>Owner: {blocker.owner}</span>}
                      {blocker.eta && <span>ETA: {blocker.eta}</span>}
                      {blocker.escalation_history.length > 0 && (
                        <span className="text-red-600">
                          Escalated {blocker.escalation_history.length}x
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Severity Legend */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">Severity Levels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {Object.entries(severityDescriptions).map(([severity, description]) => (
              <div key={severity} className="flex items-start gap-2">
                <span className={`px-2 py-1 rounded-md border font-medium ${getSeverityColor(severity as Blocker['severity'])}`}>
                  {severity}
                </span>
                <span className="text-neutral-600">{description}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
