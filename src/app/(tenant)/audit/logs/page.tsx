'use client';

import { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter,
  Download,
  Eye,
  Calendar,
  User,
  Activity,
} from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  mockAuditLogs, 
  type AuditLog, 
  type AuditAction,
  type AuditEntity,
} from '@/lib/mock-data/audit';
import { showSuccess, showInfo } from '@/lib/utils/toast';

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<AuditAction | 'all'>('all');
  const [entityFilter, setEntityFilter] = useState<AuditEntity | 'all'>('all');
  const [userFilter, setUserFilter] = useState('');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  // Filter logs
  const filteredLogs = mockAuditLogs.filter(log => {
    if (actionFilter !== 'all' && log.action !== actionFilter) return false;
    if (entityFilter !== 'all' && log.entity !== entityFilter) return false;
    if (userFilter && !log.userName.toLowerCase().includes(userFilter.toLowerCase())) return false;
    if (searchQuery && !log.entityName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Calculate stats
  const stats = {
    total: mockAuditLogs.length,
    today: mockAuditLogs.filter(l => {
      const today = new Date();
      const logDate = new Date(l.timestamp);
      return logDate.toDateString() === today.toDateString();
    }).length,
    users: new Set(mockAuditLogs.map(l => l.userId)).size,
    entities: new Set(mockAuditLogs.map(l => l.entity)).size,
  };

  const getActionColor = (action: AuditAction) => {
    const colors: Record<AuditAction, string> = {
      create: 'bg-green-100 text-green-700',
      update: 'bg-blue-100 text-blue-700',
      delete: 'bg-red-100 text-red-700',
      view: 'bg-neutral-100 text-neutral-700',
      export: 'bg-purple-100 text-purple-700',
      login: 'bg-indigo-100 text-indigo-700',
      logout: 'bg-neutral-100 text-neutral-700',
      approve: 'bg-green-100 text-green-700',
      reject: 'bg-red-100 text-red-700',
    };
    return colors[action];
  };

  const getEntityColor = (entity: AuditEntity) => {
    const colors: Record<AuditEntity, string> = {
      user: 'bg-blue-100 text-blue-700',
      role: 'bg-purple-100 text-purple-700',
      report: 'bg-green-100 text-green-700',
      goal: 'bg-amber-100 text-amber-700',
      blocker: 'bg-red-100 text-red-700',
      action: 'bg-indigo-100 text-indigo-700',
      integration: 'bg-pink-100 text-pink-700',
      policy: 'bg-orange-100 text-orange-700',
      automation: 'bg-teal-100 text-teal-700',
    };
    return colors[entity];
  };

  const handleExport = () => {
    showSuccess('Audit logs exported successfully');
  };

  const handleViewDetails = (log: AuditLog) => {
    setSelectedLog(log);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Logs"
        subtitle="Track all system activities and changes"
        showExport={false}
        showHelp={true}
        onHelp={() => showInfo('View detailed audit trail of all system activities')}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Total Events</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Today</p>
                <p className="text-2xl font-bold text-primary-600">{stats.today}</p>
              </div>
              <Calendar className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Active Users</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.users}</p>
              </div>
              <User className="w-8 h-8 text-neutral-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Entity Types</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.entities}</p>
              </div>
              <Activity className="w-8 h-8 text-neutral-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-neutral-600" />
              <span className="text-sm font-medium text-neutral-700">Filters:</span>
            </div>

            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by entity name..."
                className="w-full pl-10 pr-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <input
              type="text"
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              placeholder="Filter by user..."
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />

            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value as AuditAction | 'all')}
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Actions</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
              <option value="view">View</option>
              <option value="export">Export</option>
              <option value="login">Login</option>
              <option value="logout">Logout</option>
              <option value="approve">Approve</option>
              <option value="reject">Reject</option>
            </select>

            <select
              value={entityFilter}
              onChange={(e) => setEntityFilter(e.target.value as AuditEntity | 'all')}
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Entities</option>
              <option value="user">User</option>
              <option value="role">Role</option>
              <option value="report">Report</option>
              <option value="goal">Goal</option>
              <option value="blocker">Blocker</option>
              <option value="action">Action</option>
              <option value="integration">Integration</option>
              <option value="policy">Policy</option>
              <option value="automation">Automation</option>
            </select>

            {(actionFilter !== 'all' || entityFilter !== 'all' || searchQuery || userFilter) && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setActionFilter('all');
                  setEntityFilter('all');
                  setSearchQuery('');
                  setUserFilter('');
                }}
              >
                Clear Filters
              </Button>
            )}

            <div className="ml-auto">
              <Button
                variant="primary"
                onClick={handleExport}
                leftIcon={<Download className="w-4 h-4" />}
              >
                Export Logs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      {filteredLogs.length === 0 ? (
        <Card>
          <CardContent>
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <p className="text-neutral-600">No audit logs found matching the filters</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Entity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Entity Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      IP Address
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-900">
                        {formatDate(log.timestamp)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-neutral-900">{log.userName}</p>
                          <p className="text-xs text-neutral-500">{log.userEmail}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded capitalize ${getActionColor(log.action)}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded capitalize ${getEntityColor(log.entity)}`}>
                          {log.entity}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-700">
                        {log.entityName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600 font-mono">
                        {log.ipAddress}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleViewDetails(log)}
                          leftIcon={<Eye className="w-4 h-4" />}
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-neutral-900">Audit Log Details</h3>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedLog(null)}
                >
                  Close
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-neutral-600 mb-1">Timestamp</p>
                    <p className="text-sm font-medium text-neutral-900">{formatDate(selectedLog.timestamp)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600 mb-1">Action</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded capitalize ${getActionColor(selectedLog.action)}`}>
                      {selectedLog.action}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600 mb-1">User</p>
                    <p className="text-sm font-medium text-neutral-900">{selectedLog.userName}</p>
                    <p className="text-xs text-neutral-500">{selectedLog.userEmail}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600 mb-1">Entity</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded capitalize ${getEntityColor(selectedLog.entity)}`}>
                      {selectedLog.entity}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-neutral-600 mb-1">Entity Name</p>
                    <p className="text-sm font-medium text-neutral-900">{selectedLog.entityName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600 mb-1">IP Address</p>
                    <p className="text-sm font-mono text-neutral-900">{selectedLog.ipAddress}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600 mb-1">User Agent</p>
                    <p className="text-xs text-neutral-700 break-all">{selectedLog.userAgent}</p>
                  </div>
                </div>

                {selectedLog.changes && selectedLog.changes.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-neutral-900 mb-2">Changes</p>
                    <div className="space-y-2">
                      {selectedLog.changes.map((change, index) => (
                        <div key={index} className="p-3 bg-neutral-50 rounded-lg">
                          <p className="text-xs font-medium text-neutral-700 mb-1">{change.field}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-red-600">
                              {typeof change.oldValue === 'object' 
                                ? JSON.stringify(change.oldValue) 
                                : String(change.oldValue)}
                            </span>
                            <span className="text-neutral-400">→</span>
                            <span className="text-green-600">
                              {typeof change.newValue === 'object' 
                                ? JSON.stringify(change.newValue) 
                                : String(change.newValue)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedLog.metadata && Object.keys(selectedLog.metadata).length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-neutral-900 mb-2">Metadata</p>
                    <div className="p-3 bg-neutral-50 rounded-lg">
                      <pre className="text-xs text-neutral-700 overflow-x-auto">
                        {JSON.stringify(selectedLog.metadata, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
