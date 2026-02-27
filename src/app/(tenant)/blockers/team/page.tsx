'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Clock, TrendingUp, Users, Filter } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { KPICard } from '@/components/dashboard/KPICard';
import { mockBlockers, type Blocker } from '@/lib/mock-data/blockers';
import { showInfo } from '@/lib/utils/toast';

export default function TeamBlockersPage() {
  const router = useRouter();
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock team blockers (in real app, filter by team)
  const teamBlockers = mockBlockers;

  const filteredBlockers = teamBlockers.filter(blocker => {
    const severityMatch = severityFilter === 'all' || blocker.severity === severityFilter;
    const statusMatch = statusFilter === 'all' || blocker.status === statusFilter;
    return severityMatch && statusMatch;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'S0':
        return 'bg-red-600 text-white';
      case 'S1':
        return 'bg-orange-600 text-white';
      case 'S2':
        return 'bg-yellow-600 text-white';
      case 'S3':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-neutral-600 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-700';
      case 'in_progress':
        return 'bg-amber-100 text-amber-700';
      case 'escalated':
        return 'bg-purple-100 text-purple-700';
      case 'resolved':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const calculateTTR = (blocker: Blocker): number => {
    if (blocker.status !== 'resolved' || !blocker.resolved_at) return 0;
    const created = new Date(blocker.created_at);
    const resolved = new Date(blocker.resolved_at);
    const diffTime = Math.abs(resolved.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const stats = {
    total: teamBlockers.length,
    open: teamBlockers.filter(b => b.status === 'open').length,
    inProgress: teamBlockers.filter(b => b.status === 'in_progress').length,
    escalated: teamBlockers.filter(b => b.status === 'escalated').length,
    resolved: teamBlockers.filter(b => b.status === 'resolved').length,
    s0: teamBlockers.filter(b => b.severity === 'S0').length,
    s1: teamBlockers.filter(b => b.severity === 'S1').length,
    s2: teamBlockers.filter(b => b.severity === 'S2').length,
    s3: teamBlockers.filter(b => b.severity === 'S3').length,
    avgTTR: teamBlockers.filter(b => b.status === 'resolved').reduce((sum, b) => sum + calculateTTR(b), 0) / 
            Math.max(teamBlockers.filter(b => b.status === 'resolved').length, 1),
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Blockers"
        subtitle="Monitor and manage team blockers"
        showExport={true}
        showHelp={true}
        onExport={() => showInfo('Exporting team blockers...')}
        onHelp={() => showInfo('Track blockers across your team with severity and resolution metrics')}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          label="Total Blockers"
          value={stats.total}
          icon={<AlertTriangle className="w-5 h-5" />}
        />
        <KPICard
          label="Open + In Progress"
          value={stats.open + stats.inProgress}
          icon={<Clock className="w-5 h-5" />}
          delta={{
            value: '-2 from last week',
            trend: 'down',
            isPositive: true,
          }}
        />
        <KPICard
          label="Escalated"
          value={stats.escalated}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <KPICard
          label="Avg TTR"
          value={`${stats.avgTTR.toFixed(1)}d`}
          icon={<Clock className="w-5 h-5" />}
          delta={{
            value: '-0.5d from last week',
            trend: 'down',
            isPositive: true,
          }}
        />
      </div>

      {/* Blocker Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Blocker Heatmap by Severity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-6 bg-red-50 border-2 border-red-200 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className={`inline-flex px-3 py-1 text-sm font-bold rounded ${getSeverityColor('S0')}`}>
                  S0
                </span>
                <span className="text-xs text-neutral-600">Critical</span>
              </div>
              <p className="text-3xl font-bold text-red-600">{stats.s0}</p>
              <p className="text-xs text-neutral-600 mt-1">blockers</p>
            </div>

            <div className="text-center p-6 bg-orange-50 border-2 border-orange-200 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className={`inline-flex px-3 py-1 text-sm font-bold rounded ${getSeverityColor('S1')}`}>
                  S1
                </span>
                <span className="text-xs text-neutral-600">High</span>
              </div>
              <p className="text-3xl font-bold text-orange-600">{stats.s1}</p>
              <p className="text-xs text-neutral-600 mt-1">blockers</p>
            </div>

            <div className="text-center p-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className={`inline-flex px-3 py-1 text-sm font-bold rounded ${getSeverityColor('S2')}`}>
                  S2
                </span>
                <span className="text-xs text-neutral-600">Medium</span>
              </div>
              <p className="text-3xl font-bold text-yellow-600">{stats.s2}</p>
              <p className="text-xs text-neutral-600 mt-1">blockers</p>
            </div>

            <div className="text-center p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className={`inline-flex px-3 py-1 text-sm font-bold rounded ${getSeverityColor('S3')}`}>
                  S3
                </span>
                <span className="text-xs text-neutral-600">Low</span>
              </div>
              <p className="text-3xl font-bold text-blue-600">{stats.s3}</p>
              <p className="text-xs text-neutral-600 mt-1">blockers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">Open</span>
                <span className="text-sm font-semibold text-red-600">{stats.open} blockers</span>
              </div>
              <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all"
                  style={{ width: `${(stats.open / stats.total) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">In Progress</span>
                <span className="text-sm font-semibold text-amber-600">{stats.inProgress} blockers</span>
              </div>
              <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all"
                  style={{ width: `${(stats.inProgress / stats.total) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">Escalated</span>
                <span className="text-sm font-semibold text-purple-600">{stats.escalated} blockers</span>
              </div>
              <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 transition-all"
                  style={{ width: `${(stats.escalated / stats.total) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">Resolved</span>
                <span className="text-sm font-semibold text-green-600">{stats.resolved} blockers</span>
              </div>
              <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${(stats.resolved / stats.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-neutral-600" />
              <span className="text-sm font-medium text-neutral-700">Filters:</span>
            </div>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Severities</option>
              <option value="S0">S0 - Critical</option>
              <option value="S1">S1 - High</option>
              <option value="S2">S2 - Medium</option>
              <option value="S3">S3 - Low</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="escalated">Escalated</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Blockers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Blockers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Blocker</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Severity</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Owner</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">ETA</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Age</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlockers.map((blocker) => {
                  const age = Math.ceil((new Date().getTime() - new Date(blocker.created_at).getTime()) / (1000 * 60 * 60 * 24));
                  return (
                    <tr key={blocker.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                      <td className="py-4 px-4">
                        <button
                          onClick={() => router.push(`/blockers/${blocker.id}`)}
                          className="text-sm font-medium text-neutral-900 hover:text-primary-600 text-left"
                        >
                          {blocker.title}
                        </button>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-bold rounded ${getSeverityColor(blocker.severity)}`}>
                          {blocker.severity}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(blocker.status)}`}>
                          {blocker.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-neutral-900">{blocker.owner || 'Unassigned'}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-sm text-neutral-900">
                          {blocker.eta ? new Date(blocker.eta).toLocaleDateString() : '-'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`text-sm font-semibold ${age > 7 ? 'text-red-600' : age > 3 ? 'text-amber-600' : 'text-neutral-900'}`}>
                          {age}d
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
