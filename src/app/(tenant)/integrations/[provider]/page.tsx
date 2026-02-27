'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Settings,
  RefreshCw,
  Trash2,
  ExternalLink,
  Key,
  Webhook,
  Calendar,
  Save,
  Eye,
  EyeOff,
} from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  mockIntegrations, 
  mockIntegrationConfigs,
  mockSyncLogs,
  type Integration,
  type SyncLog,
} from '@/lib/mock-data/integrations';
import { showSuccess, showInfo, showError } from '@/lib/utils/toast';

export default function IntegrationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const providerId = params?.provider as string;

  const integration = mockIntegrations.find(i => i.id === providerId);
  const config = mockIntegrationConfigs.find(c => c.integrationId === providerId);
  const syncLogs = mockSyncLogs.filter(l => l.integrationId === providerId).slice(0, 10);

  const [showApiKey, setShowApiKey] = useState(false);
  const [syncEnabled, setSyncEnabled] = useState(config?.syncEnabled || false);
  const [syncSchedule, setSyncSchedule] = useState(config?.syncSchedule || '*/15 * * * *');

  if (!integration) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
          <p className="text-neutral-600">Integration not found</p>
          <Button
            variant="primary"
            onClick={() => router.push('/integrations')}
            className="mt-4"
          >
            Back to Integrations
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'success':
        return 'text-green-600';
      case 'disconnected':
        return 'text-gray-600';
      case 'error':
      case 'failed':
        return 'text-red-600';
      case 'pending':
      case 'partial':
        return 'text-amber-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'disconnected':
        return <XCircle className="w-5 h-5 text-gray-400" />;
      case 'error':
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'pending':
      case 'partial':
        return <Clock className="w-5 h-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const handleConnect = () => {
    showSuccess(`Connecting to ${integration.name}...`);
    setTimeout(() => {
      showSuccess(`${integration.name} connected successfully!`);
    }, 1500);
  };

  const handleDisconnect = () => {
    if (confirm(`Are you sure you want to disconnect ${integration.name}?`)) {
      showSuccess(`${integration.name} disconnected`);
      router.push('/integrations');
    }
  };

  const handleSync = () => {
    showInfo('Sync started...');
    setTimeout(() => {
      showSuccess('Sync completed successfully');
    }, 2000);
  };

  const handleSaveSettings = () => {
    showSuccess('Settings saved successfully');
  };

  const handleTestConnection = () => {
    showInfo('Testing connection...');
    setTimeout(() => {
      showSuccess('Connection test successful!');
    }, 1500);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => router.push('/integrations')}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Back
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-4xl">{integration.icon}</div>
            <div>
              <h1 className="text-2xl font-semibold text-neutral-900">{integration.name}</h1>
              <p className="text-sm text-neutral-600">{integration.provider}</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              {getStatusIcon(integration.status)}
              <span className={`text-sm font-medium capitalize ${getStatusColor(integration.status)}`}>
                {integration.status}
              </span>
            </div>
          </div>
          <p className="text-neutral-600">{integration.description}</p>
        </div>
      </div>

      {/* Connection Status Card */}
      <Card className={`border-l-4 ${
        integration.status === 'connected' ? 'border-l-green-500' :
        integration.status === 'error' ? 'border-l-red-500' :
        'border-l-gray-300'
      }`}>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-1">Connection Status</h3>
              {integration.status === 'connected' && config && (
                <div className="space-y-1 text-sm">
                  {integration.connectedAt && (
                    <p className="text-neutral-600">
                      Connected on {formatDate(integration.connectedAt)}
                    </p>
                  )}
                  {integration.lastSyncAt && (
                    <p className="text-neutral-600">
                      Last synced {formatDate(integration.lastSyncAt)}
                    </p>
                  )}
                  {integration.syncFrequency && (
                    <p className="text-neutral-600">
                      Sync frequency: {integration.syncFrequency}
                    </p>
                  )}
                </div>
              )}
              {integration.status === 'error' && (
                <p className="text-sm text-red-600">
                  {config?.errorMessage || 'Connection error occurred'}
                </p>
              )}
              {integration.status === 'disconnected' && (
                <p className="text-sm text-neutral-600">
                  This integration is not connected yet
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {integration.status === 'connected' ? (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleSync}
                    leftIcon={<RefreshCw className="w-4 h-4" />}
                  >
                    Sync Now
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleDisconnect}
                    leftIcon={<Trash2 className="w-4 h-4" />}
                  >
                    Disconnect
                  </Button>
                </>
              ) : integration.status === 'error' ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleConnect}
                >
                  Reconnect
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleConnect}
                >
                  Connect
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* OAuth / API Configuration */}
          {integration.status === 'connected' && config && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-primary-600" />
                  Authentication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      OAuth Status
                    </label>
                    <div className="flex items-center gap-2">
                      {config.oauthConnected ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm text-green-600 font-medium">Connected</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-600" />
                          <span className="text-sm text-red-600 font-medium">Not Connected</span>
                          <Button variant="primary" size="sm" className="ml-auto">
                            Authorize
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  {config.apiKey && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        API Key
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type={showApiKey ? 'text' : 'password'}
                          value={config.apiKey}
                          readOnly
                          className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg bg-neutral-50 text-sm font-mono"
                        />
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setShowApiKey(!showApiKey)}
                          leftIcon={showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        >
                          {showApiKey ? 'Hide' : 'Show'}
                        </Button>
                      </div>
                    </div>
                  )}

                  {config.webhookUrl && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Webhook URL
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={config.webhookUrl}
                          readOnly
                          className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg bg-neutral-50 text-sm font-mono"
                        />
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(config.webhookUrl!);
                            showSuccess('Webhook URL copied to clipboard');
                          }}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  )}

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleTestConnection}
                  >
                    Test Connection
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sync Settings */}
          {integration.status === 'connected' && config && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary-600" />
                  Sync Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Enable Sync
                      </label>
                      <p className="text-xs text-neutral-600">
                        Automatically sync data on schedule
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={syncEnabled}
                        onChange={(e) => setSyncEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  {syncEnabled && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Sync Schedule (Cron)
                        </label>
                        <input
                          type="text"
                          value={syncSchedule}
                          onChange={(e) => setSyncSchedule(e.target.value)}
                          placeholder="*/15 * * * *"
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                        />
                        <p className="text-xs text-neutral-600 mt-1">
                          Current: Every 15 minutes
                        </p>
                      </div>

                      {config.nextSync && (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-blue-700">
                            Next sync scheduled for {formatDate(config.nextSync)}
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  <div className="flex items-center gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleSaveSettings}
                      leftIcon={<Save className="w-4 h-4" />}
                    >
                      Save Settings
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleSync}
                      leftIcon={<RefreshCw className="w-4 h-4" />}
                    >
                      Sync Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sync Logs */}
          {syncLogs.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Sync History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {syncLogs.map(log => (
                    <div 
                      key={log.id}
                      className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(log.status)}
                        <div>
                          <p className="text-sm font-medium text-neutral-900">
                            {formatDate(log.timestamp)}
                          </p>
                          <p className="text-xs text-neutral-600">
                            {log.recordsProcessed} processed
                            {log.recordsFailed > 0 && `, ${log.recordsFailed} failed`}
                            {' • '}
                            {formatDuration(log.duration)}
                          </p>
                          {log.errorMessage && (
                            <p className="text-xs text-red-600 mt-1">{log.errorMessage}</p>
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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {integration.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Setup Guide */}
          {integration.setupGuideUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => window.open(integration.setupGuideUrl, '_blank')}
                  leftIcon={<ExternalLink className="w-4 h-4" />}
                  className="w-full"
                >
                  View Setup Guide
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Support */}
          <Card className="bg-primary-50 border-primary-200">
            <CardContent>
              <div className="text-center">
                <Settings className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-neutral-900 mb-1">
                  Need Help?
                </h3>
                <p className="text-xs text-neutral-600 mb-3">
                  Contact support for integration assistance
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => router.push('/support/tickets')}
                >
                  Create Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
