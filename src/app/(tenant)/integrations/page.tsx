'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plug, 
  Search, 
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  Zap,
  Settings,
} from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  mockIntegrations, 
  type Integration, 
  type IntegrationCategory,
  type IntegrationStatus,
  integrationCategories,
} from '@/lib/mock-data/integrations';
import { showSuccess, showInfo, showError } from '@/lib/utils/toast';

export default function IntegrationsPage() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<IntegrationCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<IntegrationStatus | 'all'>('all');
  const [showOnlyPopular, setShowOnlyPopular] = useState(false);

  // Filter integrations
  const filteredIntegrations = mockIntegrations.filter(integration => {
    if (categoryFilter !== 'all' && integration.category !== categoryFilter) return false;
    if (statusFilter !== 'all' && integration.status !== statusFilter) return false;
    if (showOnlyPopular && !integration.isPopular) return false;
    if (searchQuery && !integration.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !integration.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Calculate stats
  const stats = {
    total: mockIntegrations.length,
    connected: mockIntegrations.filter(i => i.status === 'connected').length,
    available: mockIntegrations.filter(i => i.status === 'disconnected').length,
    errors: mockIntegrations.filter(i => i.status === 'error').length,
  };

  const getStatusColor = (status: IntegrationStatus) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'disconnected':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'error':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusIcon = (status: IntegrationStatus) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'disconnected':
        return <XCircle className="w-5 h-5 text-gray-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: IntegrationCategory) => {
    const colors: Record<IntegrationCategory, string> = {
      communication: 'bg-blue-100 text-blue-700',
      project_management: 'bg-purple-100 text-purple-700',
      version_control: 'bg-green-100 text-green-700',
      calendar: 'bg-orange-100 text-orange-700',
      hrms: 'bg-pink-100 text-pink-700',
      webhooks: 'bg-indigo-100 text-indigo-700',
    };
    return colors[category];
  };

  const handleConnect = (integration: Integration) => {
    if (integration.status === 'connected') {
      showInfo(`${integration.name} is already connected`);
      router.push(`/integrations/${integration.id}`);
    } else {
      showSuccess(`Connecting to ${integration.name}...`);
      router.push(`/integrations/${integration.id}`);
    }
  };

  const handleDisconnect = (integration: Integration, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to disconnect ${integration.name}?`)) {
      showSuccess(`${integration.name} disconnected`);
    }
  };

  const handleConfigure = (integration: Integration, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/integrations/${integration.id}`);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Integrations"
        subtitle="Connect your favorite tools and services"
        showExport={false}
        showHelp={true}
        onHelp={() => showInfo('Browse and connect integrations to enhance your workflow')}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Total Integrations</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.total}</p>
              </div>
              <Plug className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Connected</p>
                <p className="text-2xl font-bold text-green-600">{stats.connected}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Available</p>
                <p className="text-2xl font-bold text-neutral-600">{stats.available}</p>
              </div>
              <Zap className="w-8 h-8 text-neutral-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Errors</p>
                <p className="text-2xl font-bold text-red-600">{stats.errors}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
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
                placeholder="Search integrations..."
                className="w-full pl-10 pr-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as IntegrationCategory | 'all')}
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Categories</option>
              {Object.entries(integrationCategories).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as IntegrationStatus | 'all')}
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="connected">Connected</option>
              <option value="disconnected">Available</option>
              <option value="error">Error</option>
              <option value="pending">Pending</option>
            </select>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyPopular}
                onChange={(e) => setShowOnlyPopular(e.target.checked)}
                className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">Popular only</span>
            </label>

            {(categoryFilter !== 'all' || statusFilter !== 'all' || searchQuery || showOnlyPopular) && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setCategoryFilter('all');
                  setStatusFilter('all');
                  setSearchQuery('');
                  setShowOnlyPopular(false);
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Integrations Grid */}
      {filteredIntegrations.length === 0 ? (
        <Card>
          <CardContent>
            <div className="text-center py-12">
              <Plug className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <p className="text-neutral-600">No integrations found matching the filters</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIntegrations.map(integration => (
            <Card 
              key={integration.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleConnect(integration)}
            >
              <CardContent>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{integration.icon}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-neutral-900">
                          {integration.name}
                        </h3>
                        {integration.isPopular && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
                            <TrendingUp className="w-3 h-3" />
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-600">{integration.provider}</p>
                    </div>
                  </div>
                  {getStatusIcon(integration.status)}
                </div>

                <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                  {integration.description}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${getCategoryColor(integration.category)}`}>
                    {integrationCategories[integration.category]}
                  </span>
                  <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded border capitalize ${getStatusColor(integration.status)}`}>
                    {integration.status}
                  </span>
                </div>

                {integration.status === 'connected' && (
                  <div className="mb-3 p-2 bg-neutral-50 rounded text-xs space-y-1">
                    {integration.connectedAt && (
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-600">Connected:</span>
                        <span className="text-neutral-900 font-medium">
                          {formatDate(integration.connectedAt)}
                        </span>
                      </div>
                    )}
                    {integration.lastSyncAt && (
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-600">Last Sync:</span>
                        <span className="text-neutral-900 font-medium">
                          {formatDate(integration.lastSyncAt)}
                        </span>
                      </div>
                    )}
                    {integration.syncFrequency && (
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-600">Frequency:</span>
                        <span className="text-neutral-900 font-medium">
                          {integration.syncFrequency}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="mb-3">
                  <p className="text-xs font-medium text-neutral-700 mb-1">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {integration.features.slice(0, 3).map((feature, index) => (
                      <span 
                        key={index}
                        className="px-2 py-0.5 text-xs bg-neutral-100 text-neutral-700 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                    {integration.features.length > 3 && (
                      <span className="px-2 py-0.5 text-xs bg-neutral-100 text-neutral-700 rounded">
                        +{integration.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {integration.status === 'connected' ? (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => handleConfigure(integration, e)}
                        leftIcon={<Settings className="w-4 h-4" />}
                        className="flex-1"
                      >
                        Configure
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => handleDisconnect(integration, e)}
                        className="flex-1"
                      >
                        Disconnect
                      </Button>
                    </>
                  ) : integration.status === 'error' ? (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConnect(integration);
                      }}
                      className="w-full"
                    >
                      Reconnect
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConnect(integration);
                      }}
                      className="w-full"
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
