'use client';

import { useState } from 'react';
import { 
  Shield, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Globe,
  Monitor,
  Lock,
  Plus,
  Trash2,
} from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  mockSecurityEvents,
  mockIPRestrictions,
  mockActiveSessions,
  type SecurityEvent,
  type IPRestriction,
  type ActiveSession,
} from '@/lib/mock-data/audit';
import { showSuccess, showInfo } from '@/lib/utils/toast';

export default function SecurityPosturePage() {
  const [selectedTab, setSelectedTab] = useState<'events' | 'sessions' | 'ip'>('events');

  // Calculate stats
  const stats = {
    totalEvents: mockSecurityEvents.length,
    unresolved: mockSecurityEvents.filter(e => !e.resolved).length,
    critical: mockSecurityEvents.filter(e => e.severity === 'critical').length,
    activeSessions: mockActiveSessions.length,
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-300';
    }
  };

  const handleResolveEvent = (event: SecurityEvent) => {
    showSuccess(`Security event ${event.id} marked as resolved`);
  };

  const handleTerminateSession = (session: ActiveSession) => {
    if (confirm(`Terminate session for ${session.userName}?`)) {
      showSuccess(`Session terminated for ${session.userName}`);
    }
  };

  const handleAddIPRestriction = () => {
    showInfo('Add IP restriction functionality coming soon');
  };

  const handleRemoveIPRestriction = (ip: IPRestriction) => {
    if (confirm(`Remove IP restriction for ${ip.ipAddress}?`)) {
      showSuccess(`IP restriction removed for ${ip.ipAddress}`);
    }
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
        title="Security Posture"
        subtitle="Monitor security events and manage access controls"
        showExport={false}
        showHelp={true}
        onHelp={() => showInfo('View security events, active sessions, and IP restrictions')}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Security Events</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.totalEvents}</p>
              </div>
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Unresolved</p>
                <p className="text-2xl font-bold text-amber-600">{stats.unresolved}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Critical</p>
                <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Active Sessions</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeSessions}</p>
              </div>
              <Monitor className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 border-b border-neutral-200 -mb-6 pb-4">
            <button
              onClick={() => setSelectedTab('events')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                selectedTab === 'events'
                  ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Security Events
            </button>
            <button
              onClick={() => setSelectedTab('sessions')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                selectedTab === 'sessions'
                  ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Active Sessions
            </button>
            <button
              onClick={() => setSelectedTab('ip')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                selectedTab === 'ip'
                  ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              IP Restrictions
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Security Events Tab */}
      {selectedTab === 'events' && (
        <div className="space-y-3">
          {mockSecurityEvents.map(event => (
            <Card key={event.id} className={`border-l-4 ${
              event.severity === 'critical' ? 'border-l-red-500' :
              event.severity === 'high' ? 'border-l-orange-500' :
              event.severity === 'medium' ? 'border-l-amber-500' :
              'border-l-blue-500'
            }`}>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded border capitalize ${getSeverityColor(event.severity)}`}>
                        {event.severity}
                      </span>
                      <span className="text-xs text-neutral-600">{formatDate(event.timestamp)}</span>
                      {event.resolved ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
                          <CheckCircle className="w-3 h-3" />
                          Resolved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded">
                          <Clock className="w-3 h-3" />
                          Unresolved
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-neutral-900 mb-1">{event.description}</p>
                    <div className="flex items-center gap-4 text-xs text-neutral-600">
                      {event.userName && <span>User: {event.userName}</span>}
                      <span>IP: {event.ipAddress}</span>
                      {event.location && <span>Location: {event.location}</span>}
                    </div>
                    {event.resolved && event.resolvedBy && (
                      <p className="text-xs text-neutral-600 mt-2">
                        Resolved by {event.resolvedBy} on {formatDate(event.resolvedAt!)}
                      </p>
                    )}
                  </div>
                  {!event.resolved && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleResolveEvent(event)}
                    >
                      Resolve
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Active Sessions Tab */}
      {selectedTab === 'sessions' && (
        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockActiveSessions.map(session => (
                <div key={session.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-700 font-medium text-sm">
                          {session.userName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{session.userName}</p>
                        <p className="text-xs text-neutral-600">{session.device} • {session.browser}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      <div>
                        <p className="text-neutral-600 mb-1">IP Address</p>
                        <p className="font-mono text-neutral-900">{session.ipAddress}</p>
                      </div>
                      <div>
                        <p className="text-neutral-600 mb-1">Location</p>
                        <p className="text-neutral-900">{session.location}</p>
                      </div>
                      <div>
                        <p className="text-neutral-600 mb-1">Started</p>
                        <p className="text-neutral-900">{formatDate(session.startedAt)}</p>
                      </div>
                      <div>
                        <p className="text-neutral-600 mb-1">Last Activity</p>
                        <p className="text-neutral-900">{formatDate(session.lastActivity)}</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleTerminateSession(session)}
                    leftIcon={<XCircle className="w-4 h-4" />}
                  >
                    Terminate
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* IP Restrictions Tab */}
      {selectedTab === 'ip' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>IP Restrictions</CardTitle>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddIPRestriction}
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Add Restriction
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockIPRestrictions.map(ip => (
                <div key={ip.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded ${
                        ip.type === 'allow' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {ip.type === 'allow' ? <CheckCircle className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                        {ip.type === 'allow' ? 'Allowed' : 'Blocked'}
                      </span>
                      <span className="text-sm font-mono font-medium text-neutral-900">{ip.ipAddress}</span>
                      {!ip.active && (
                        <span className="px-2 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 rounded">
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 mb-2">{ip.reason}</p>
                    <div className="flex items-center gap-4 text-xs text-neutral-600">
                      <span>Created by {ip.createdBy}</span>
                      <span>on {formatDate(ip.createdAt)}</span>
                      {ip.expiresAt && <span>Expires {formatDate(ip.expiresAt)}</span>}
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleRemoveIPRestriction(ip)}
                    leftIcon={<Trash2 className="w-4 h-4" />}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
