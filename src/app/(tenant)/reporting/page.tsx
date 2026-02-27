// My Reports List Page
'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockDSRReports, mockWSRReports, mockMSRReports, type ReportType, type ReportStatus } from '@/lib/mock-data/reports';
import Link from 'next/link';
import { useAuth } from '@/lib/providers/AuthProvider';
import * as Icons from 'lucide-react';

export default function ReportsPage() {
  const { hasPermission } = useAuth();
  const [filterType, setFilterType] = useState<ReportType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<ReportStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [scope, setScope] = useState<'self' | 'team' | 'department' | 'org'>('self');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      setScope((searchParams.get('scope') as any) || 'self');
    }
  }, []);

  const canAccessScope = scope === 'self' ||
    (scope === 'team' && hasPermission('reports.list.team')) ||
    (scope === 'department' && hasPermission('reports.list.department')) ||
    (scope === 'org' && hasPermission('reports.list.org'));

  if (!canAccessScope) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="p-4 bg-red-100 rounded-full">
          <Icons.ShieldAlert className="w-12 h-12 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
        <p className="text-gray-600 text-center max-w-md">
          You do not have permission to view {scope} reports. Please contact your administrator if you believe this is an error.
        </p>
        <Link href="/reporting">
          <Button variant="secondary">Return to My Reports</Button>
        </Link>
      </div>
    );
  }

  // Combine all reports
  const allReports = [...mockDSRReports, ...mockWSRReports, ...mockMSRReports];

  // Filter reports
  const filteredReports = allReports.filter(report => {
    const matchesType = filterType === 'all' || report.report_type === filterType;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesSearch = searchQuery === '' ||
      report.report_type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case 'submitted': return 'blue';
      case 'approved': return 'green';
      case 'draft': return 'gray';
      case 'rework_requested': return 'orange';
      case 'locked': return 'purple';
      default: return 'gray';
    }
  };

  const getReportDate = (report: any) => {
    if ('report_date' in report) return report.report_date;
    if ('week_start' in report) return report.week_start;
    if ('month' in report) return report.month;
    return '';
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {scope === 'self' ? 'My Reports' : `${scope.charAt(0).toUpperCase() + scope.slice(1)} Reports`}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {scope === 'self' ? 'View and manage all your reports' : `Viewing reports for the entire ${scope}`}
          </p>
        </div>
        <Link href="/reporting/dsr/new">
          <Button>Create DSR</Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as ReportType | 'all')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="DSR">DSR</option>
              <option value="WSR">WSR</option>
              <option value="MSR">MSR</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as ReportStatus | 'all')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="approved">Approved</option>
              <option value="rework_requested">Rework Requested</option>
              <option value="locked">Locked</option>
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      {/* Reports List */}
      <div className="space-y-3">
        {filteredReports.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500">No reports found</p>
          </Card>
        ) : (
          filteredReports.map((report) => (
            <Link key={report.id} href={`/reporting/${report.report_type.toLowerCase()}/${report.id}`}>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Badge variant={getStatusColor(report.status)}>
                        {report.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <Badge variant="gray">{report.report_type}</Badge>
                      <span className="text-sm text-gray-600">{getReportDate(report)}</span>
                    </div>
                    <div className="mt-2">
                      {'what_i_did_today' in report && report.what_i_did_today.length > 0 && (
                        <p className="text-sm text-gray-700 line-clamp-1">
                          {report.what_i_did_today[0]}
                        </p>
                      )}
                      {'week_summary' in report && (
                        <p className="text-sm text-gray-700 line-clamp-1">
                          {report.week_summary}
                        </p>
                      )}
                      {'executive_summary' in report && (
                        <p className="text-sm text-gray-700 line-clamp-1">
                          {report.executive_summary}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {'submitted_at' in report && report.submitted_at ? `Submitted ${new Date(report.submitted_at).toLocaleDateString()}` : 'Not submitted'}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
