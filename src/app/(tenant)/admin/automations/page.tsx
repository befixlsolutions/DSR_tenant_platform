'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Plus, Edit, Play, Pause, Eye, Filter, Search, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockAutomations, mockExecutionLogs, Automation, AutomationType, AutomationStatus, automationTypeLabels } from '@/lib/mock-data/automations';
import { showSuccess, showInfo } from '@/lib/utils/toast';

export default function AutomationsListPage() {
  const router = useRouter();

  const [selectedType, setSelectedType] = useState<AutomationType | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<AutomationStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogs, setShowLogs] = useState(false);

  // Filter automations
  const filteredAutomations = mockAutomations.filter(automation => {
    if (selectedType !== 'all' && automation.type !== selectedType) return false;
    if (selectedStatus !== 'all' && automation.status !== selectedStatus) return false;
    if (searchQuery && !automation.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status: AutomationStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'disabled':
        return 'bg-neutral-100 text-neutral-700';
      case 'paused':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getTypeColor = (type: AutomationType) => {
    const colors: Record<AutomationType, string> = {
      reporting_reminder: 'bg-blue-100 text-blue-700',
      late_marking: 'bg-red-100 text-red-700',
      escalation: 'bg-orange-100 text-orange-700',
      review_assignment: 'bg-purple-100 text-purple-700',
      sla_reminder: 'bg-pink-100 text-pink-700',
      goal_auto_close: 'bg-green-100 text-green-700',
      blocker_escalation: 'bg-amber-100 text-amber-700',
      scoring_compute: 'bg-indigo-100 text-indigo-700',
      ticket_routing: 'bg-teal-100 text-teal-700',
    };
    return colors[type] || 'bg-neutral-100 text-neutral-700';
  };

  const handleCreateAutomation = () => {
    router.push('/admin/automations/builder');
  };

  const handleEditAutomation = (id: string) => {
    router.push(`/admin/automations/builder?id=${id}`);
  };

  const handleToggleAutomation = (automation: Automation) => {
    const action = automation.enabled ? 'paused' : 'resumed';
    showSuccess(`Automation "${automation.name}" ${action}`);
  };

  const handleViewLogs = (id: string) => {
    setShowLogs(true);
    showInfo('Viewing execution logs');
  };

  const getSuccessRate = (automation: Automation) => {
    if (automation.execution_count === 0) return 0;
    return Math.round((automation.success_count / automation.execution_count) * 100);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Automations"
        subtitle="Manage scheduled automations and background jobs"
        showExport={false}
        showHelp={true}
        onHelp={() => showInfo('Create automations to run tasks on a schedule')}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Total Automations</p>
                <p className="text-2xl font-bold text-neutral-900">{mockAutomations.length}</p>
              </div>
              <Zap className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockAutomations.filter(a => a.status === 'active').length}
                </p>
              </div>
              <Play className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Paused</p>
                <p className="text-2xl font-bold text-amber-600">
                  {mockAutomations.filter(a => a.status === 'paused').length}
                </p>
              </div>
              <Pause className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Total Executions</p>
                <p className="text-2xl font-bold text-primary-600">
                  {mockAutomations.reduce((sum, a) => sum + a.execution_count, 0)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Success Rate</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(
                    (mockAutomations.reduce((sum, a) => sum + a.success_count, 0) /
                      mockAutomations.reduce((sum, a) => sum + a.execution_count, 0)) *
                      100
                  )}%
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
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
                placeholder="Search automations..."
                className="w-full pl-10 pr-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as AutomationType | 'all')}
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Types</option>
              {Object.entries(automationTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as AutomationStatus | 'all')}
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="disabled">Disabled</option>
            </select>

            {(selectedType !== 'all' || selectedStatus !== 'all' || searchQuery) && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedType('all');
                  setSelectedStatus('all');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            )}

            <div className="ml-auto">
              <Button
                variant="primary"
                onClick={handleCreateAutomation}
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Create Automation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automations List */}
      {filteredAutomations.length === 0 ? (
        <Card>
          <CardContent>
            <div className="text-center py-12">
              <Zap className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <p className="text-neutral-600 mb-4">No automations found matching the filters</p>
              <Button variant="primary" onClick={handleCreateAutomation} leftIcon={<Plus className="w-4 h-4" />}>
                Create Your First Automation
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredAutomations.map(automation => (
            <Card key={automation.id} className="hover:shadow-md transition-shadow">
              <CardContent>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-neutral-900">{automation.name}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(automation.type)}`}>
                        {automationTypeLabels[automation.type]}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(automation.status)}`}>
                        {automation.status}
                      </span>
                      {automation.enabled ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                          <Play className="w-3 h-3" />
                          Running
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-neutral-100 text-neutral-700">
                          <Pause className="w-3 h-3" />
                          Stopped
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 mb-3">{automation.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      <div>
                        <p className="text-neutral-600 mb-1">Schedule</p>
                        <p className="font-medium text-neutral-900">
                          {automation.trigger.schedule_type === 'daily' && `Daily at ${automation.trigger.time}`}
                          {automation.trigger.schedule_type === 'weekly' && `${automation.trigger.day_of_week} at ${automation.trigger.time}`}
                          {automation.trigger.schedule_type === 'monthly' && `Day ${automation.trigger.day_of_month} at ${automation.trigger.time}`}
                          {automation.trigger.schedule_type === 'custom' && automation.trigger.cron_expression}
                        </p>
                      </div>
                      <div>
                        <p className="text-neutral-600 mb-1">Executions</p>
                        <p className="font-medium text-neutral-900">{automation.execution_count}</p>
                      </div>
                      <div>
                        <p className="text-neutral-600 mb-1">Success Rate</p>
                        <p className="font-medium text-green-600">{getSuccessRate(automation)}%</p>
                      </div>
                      <div>
                        <p className="text-neutral-600 mb-1">Next Run</p>
                        <p className="font-medium text-neutral-900">
                          {automation.next_execution_at 
                            ? new Date(automation.next_execution_at).toLocaleString()
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleViewLogs(automation.id)}
                      leftIcon={<Eye className="w-4 h-4" />}
                    >
                      Logs
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEditAutomation(automation.id)}
                      leftIcon={<Edit className="w-4 h-4" />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleToggleAutomation(automation)}
                      leftIcon={automation.enabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    >
                      {automation.enabled ? 'Pause' : 'Resume'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Execution Logs Modal */}
      {showLogs && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Execution Logs</CardTitle>
              <Button variant="secondary" size="sm" onClick={() => setShowLogs(false)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockExecutionLogs.slice(0, 10).map(log => (
                <div key={log.id} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    {log.status === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : log.status === 'failed' ? (
                      <XCircle className="w-5 h-5 text-red-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-amber-600" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        {new Date(log.executed_at).toLocaleString()}
                      </p>
                      <p className="text-xs text-neutral-600">
                        {log.affected_count} items affected • {log.duration_ms}ms
                      </p>
                      {log.error_message && (
                        <p className="text-xs text-red-600 mt-1">{log.error_message}</p>
                      )}
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                    log.status === 'success' ? 'bg-green-100 text-green-700' :
                    log.status === 'failed' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
