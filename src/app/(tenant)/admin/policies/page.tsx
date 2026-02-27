'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Plus, Edit, Copy, Archive, Eye, Filter, Search, Play, Pause, TrendingUp } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockPolicies, Policy, PolicyDomain, PolicyStatus, policyDomainLabels } from '@/lib/mock-data/policies';
import { showSuccess, showInfo } from '@/lib/utils/toast';

export default function PoliciesListPage() {
  const router = useRouter();

  const [selectedDomain, setSelectedDomain] = useState<PolicyDomain | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<PolicyStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter policies
  const filteredPolicies = mockPolicies.filter(policy => {
    if (selectedDomain !== 'all' && policy.domain !== selectedDomain) return false;
    if (selectedStatus !== 'all' && policy.status !== selectedStatus) return false;
    if (searchQuery && !policy.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status: PolicyStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-amber-100 text-amber-700';
      case 'disabled':
        return 'bg-neutral-100 text-neutral-700';
      case 'archived':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getDomainColor = (domain: PolicyDomain) => {
    const colors: Record<PolicyDomain, string> = {
      identity_access: 'bg-purple-100 text-purple-700',
      reporting: 'bg-blue-100 text-blue-700',
      quality_validation: 'bg-green-100 text-green-700',
      automation: 'bg-indigo-100 text-indigo-700',
      scoring: 'bg-pink-100 text-pink-700',
      reviews_appraisals: 'bg-orange-100 text-orange-700',
      data_governance: 'bg-teal-100 text-teal-700',
      safety_culture: 'bg-red-100 text-red-700',
    };
    return colors[domain] || 'bg-neutral-100 text-neutral-700';
  };

  const handleCreatePolicy = () => {
    router.push('/admin/policies/builder');
  };

  const handleEditPolicy = (id: string) => {
    router.push(`/admin/policies/builder?id=${id}`);
  };

  const handleDuplicatePolicy = (policy: Policy) => {
    showSuccess(`Policy "${policy.name}" duplicated`);
  };

  const handleTogglePolicy = (policy: Policy) => {
    const action = policy.enabled ? 'disabled' : 'enabled';
    showSuccess(`Policy "${policy.name}" ${action}`);
  };

  const handleArchivePolicy = (policy: Policy) => {
    showSuccess(`Policy "${policy.name}" archived`);
  };

  const handlePreviewPolicy = (id: string) => {
    showInfo('Policy preview will open');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Policies & Rules"
        subtitle="Manage automated policies and business rules for your organization"
        showExport={false}
        showHelp={true}
        onHelp={() => showInfo('Create IF-THEN rules to automate workflows and enforce policies')}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Total Policies</p>
                <p className="text-2xl font-bold text-neutral-900">{mockPolicies.length}</p>
              </div>
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockPolicies.filter(p => p.status === 'active').length}
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
                <p className="text-xs text-neutral-600 mb-1">Draft</p>
                <p className="text-2xl font-bold text-amber-600">
                  {mockPolicies.filter(p => p.status === 'draft').length}
                </p>
              </div>
              <Edit className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Disabled</p>
                <p className="text-2xl font-bold text-neutral-600">
                  {mockPolicies.filter(p => p.status === 'disabled').length}
                </p>
              </div>
              <Pause className="w-8 h-8 text-neutral-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Total Executions</p>
                <p className="text-2xl font-bold text-primary-600">
                  {mockPolicies.reduce((sum, p) => sum + (p.execution_count || 0), 0)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary-600" />
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
                placeholder="Search policies..."
                className="w-full pl-10 pr-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value as PolicyDomain | 'all')}
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Domains</option>
              {Object.entries(policyDomainLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as PolicyStatus | 'all')}
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="disabled">Disabled</option>
              <option value="archived">Archived</option>
            </select>

            {(selectedDomain !== 'all' || selectedStatus !== 'all' || searchQuery) && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedDomain('all');
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
                onClick={handleCreatePolicy}
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Create Policy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Policies List */}
      {filteredPolicies.length === 0 ? (
        <Card>
          <CardContent>
            <div className="text-center py-12">
              <Shield className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <p className="text-neutral-600 mb-4">No policies found matching the filters</p>
              <Button variant="primary" onClick={handleCreatePolicy} leftIcon={<Plus className="w-4 h-4" />}>
                Create Your First Policy
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredPolicies.map(policy => (
            <Card key={policy.id} className="hover:shadow-md transition-shadow">
              <CardContent>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-neutral-900">{policy.name}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getDomainColor(policy.domain)}`}>
                        {policyDomainLabels[policy.domain]}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(policy.status)}`}>
                        {policy.status}
                      </span>
                      <span className="text-xs text-neutral-600">v{policy.version}</span>
                      {policy.enabled ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                          <Play className="w-3 h-3" />
                          Enabled
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-neutral-100 text-neutral-700">
                          <Pause className="w-3 h-3" />
                          Disabled
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 mb-3">{policy.description}</p>
                    <div className="flex items-center gap-6 text-xs text-neutral-600">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Priority:</span>
                        <span>{policy.priority}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Actions:</span>
                        <span>{policy.actions.length}</span>
                      </div>
                      {policy.execution_count !== undefined && (
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Executions:</span>
                          <span>{policy.execution_count}</span>
                        </div>
                      )}
                      {policy.last_executed_at && (
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Last executed:</span>
                          <span>{new Date(policy.last_executed_at).toLocaleString()}</span>
                        </div>
                      )}
                      {policy.scope.departments && policy.scope.departments.length > 0 && (
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Scope:</span>
                          <span>{policy.scope.departments.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handlePreviewPolicy(policy.id)}
                      leftIcon={<Eye className="w-4 h-4" />}
                    >
                      Preview
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEditPolicy(policy.id)}
                      leftIcon={<Edit className="w-4 h-4" />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleTogglePolicy(policy)}
                      leftIcon={policy.enabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    >
                      {policy.enabled ? 'Disable' : 'Enable'}
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDuplicatePolicy(policy)}
                      leftIcon={<Copy className="w-4 h-4" />}
                    >
                      Duplicate
                    </Button>
                    {policy.status !== 'archived' && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleArchivePolicy(policy)}
                        leftIcon={<Archive className="w-4 h-4" />}
                      >
                        Archive
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
