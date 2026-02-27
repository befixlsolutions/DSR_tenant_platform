'use client';

import { useState } from 'react';
import { Plus, Link2, Clock, CheckCircle, AlertTriangle, User } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { showSuccess } from '@/lib/utils/toast';

type DependencyStatus = 'pending_ack' | 'in_progress' | 'delivered' | 'blocked';

interface Dependency {
  id: string;
  title: string;
  description: string;
  requester: string;
  provider: string;
  eta?: string;
  status: DependencyStatus;
  acknowledged_at?: string;
  delivered_at?: string;
  created_at: string;
}

// Mock dependencies data
const mockDependencies: Dependency[] = [
  {
    id: 'dep-1',
    title: 'API Endpoint for User Authentication',
    description: 'Need REST API endpoint for user login and token generation',
    requester: 'John Employee',
    provider: 'Backend Team',
    eta: '2026-02-25',
    status: 'in_progress',
    acknowledged_at: '2026-02-20T10:00:00Z',
    created_at: '2026-02-20T09:00:00Z',
  },
  {
    id: 'dep-2',
    title: 'Database Schema for Reports',
    description: 'Need database tables for DSR/WSR/MSR reports',
    requester: 'John Employee',
    provider: 'Database Team',
    status: 'pending_ack',
    created_at: '2026-02-22T14:00:00Z',
  },
  {
    id: 'dep-3',
    title: 'Design Assets for Dashboard',
    description: 'Need UI mockups and design system for analytics dashboard',
    requester: 'John Employee',
    provider: 'Design Team',
    eta: '2026-02-24',
    status: 'delivered',
    acknowledged_at: '2026-02-21T11:00:00Z',
    delivered_at: '2026-02-23T16:00:00Z',
    created_at: '2026-02-21T10:00:00Z',
  },
];

export default function DependenciesPage() {
  const [activeTab, setActiveTab] = useState<DependencyStatus | 'all'>('all');

  const filteredDependencies = activeTab === 'all' 
    ? mockDependencies 
    : mockDependencies.filter(d => d.status === activeTab);

  const getStatusIcon = (status: DependencyStatus) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'blocked':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'pending_ack':
        return <Clock className="w-5 h-5 text-amber-600" />;
    }
  };

  const getStatusLabel = (status: DependencyStatus) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getStatusColor = (status: DependencyStatus) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'blocked':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'pending_ack':
        return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  const getDaysAgo = (dateString: string) => {
    const days = Math.floor((Date.now() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dependencies"
        subtitle="Track dependencies across teams and projects"
        showExport={false}
        onHelp={() => showSuccess('Help: Dependencies are requests for work from other teams')}
        actions={
          <button
            onClick={() => showSuccess('Create dependency feature coming soon')}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Request Dependency
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'all'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          All ({mockDependencies.length})
        </button>
        <button
          onClick={() => setActiveTab('pending_ack')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'pending_ack'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Pending Ack ({mockDependencies.filter(d => d.status === 'pending_ack').length})
        </button>
        <button
          onClick={() => setActiveTab('in_progress')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'in_progress'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          In Progress ({mockDependencies.filter(d => d.status === 'in_progress').length})
        </button>
        <button
          onClick={() => setActiveTab('delivered')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'delivered'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Delivered ({mockDependencies.filter(d => d.status === 'delivered').length})
        </button>
        <button
          onClick={() => setActiveTab('blocked')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'blocked'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Blocked ({mockDependencies.filter(d => d.status === 'blocked').length})
        </button>
      </div>

      {/* Dependencies List */}
      <div className="space-y-3">
        {filteredDependencies.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Link2 className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-base font-medium text-neutral-900 mb-2">
                No dependencies found
              </h3>
              <p className="text-sm text-neutral-500 mb-4">
                {activeTab === 'all' && 'No dependencies have been created yet'}
                {activeTab === 'pending_ack' && 'No dependencies pending acknowledgment'}
                {activeTab === 'in_progress' && 'No dependencies in progress'}
                {activeTab === 'delivered' && 'No dependencies delivered yet'}
                {activeTab === 'blocked' && 'No blocked dependencies'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredDependencies.map((dependency) => (
            <Card
              key={dependency.id}
              className="hover:shadow-md hover:border-neutral-300 cursor-pointer transition-all"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {getStatusIcon(dependency.status)}
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-neutral-900 mb-1">
                          {dependency.title}
                        </h3>
                        <p className="text-sm text-neutral-600 mb-2">
                          {dependency.description}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-md border text-xs font-medium whitespace-nowrap ${getStatusColor(dependency.status)}`}>
                        {getStatusLabel(dependency.status)}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-neutral-600">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Requester: {dependency.requester}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Provider: {dependency.provider}
                      </span>
                      {dependency.eta && (
                        <span>ETA: {dependency.eta}</span>
                      )}
                      <span>Created: {getDaysAgo(dependency.created_at)}</span>
                    </div>

                    {dependency.acknowledged_at && (
                      <div className="mt-2 text-xs text-neutral-600">
                        Acknowledged: {new Date(dependency.acknowledged_at).toLocaleDateString()}
                      </div>
                    )}

                    {dependency.delivered_at && (
                      <div className="mt-2 text-xs text-green-600 font-medium">
                        ✓ Delivered: {new Date(dependency.delivered_at).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Info Card */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">Dependency Lifecycle</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div>
              <p className="font-medium text-amber-700 mb-1">1. Pending Acknowledgment</p>
              <p className="text-neutral-600">Waiting for provider to acknowledge the request</p>
            </div>
            <div>
              <p className="font-medium text-blue-700 mb-1">2. In Progress</p>
              <p className="text-neutral-600">Provider is working on the dependency</p>
            </div>
            <div>
              <p className="font-medium text-green-700 mb-1">3. Delivered</p>
              <p className="text-neutral-600">Dependency has been completed and delivered</p>
            </div>
            <div>
              <p className="font-medium text-red-700 mb-1">4. Blocked</p>
              <p className="text-neutral-600">Dependency is blocked and cannot proceed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
