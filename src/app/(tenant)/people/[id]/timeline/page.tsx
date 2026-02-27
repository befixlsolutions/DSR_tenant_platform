'use client';

import { useParams, useRouter } from 'next/navigation';
import { Calendar, FileText, Target, AlertTriangle, CheckCircle, Mail, Phone, MapPin, Users, TrendingUp, ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getPersonById, getActivitiesByUser, getDirectReports } from '@/lib/mock-data/people';
import { showInfo } from '@/lib/utils/toast';

export default function UserTimelinePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const person = getPersonById(userId);
  const activities = getActivitiesByUser(userId);
  const directReports = person ? getDirectReports(person.id) : [];

  if (!person) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-neutral-600">Employee not found</p>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'report_submission':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'goal_achievement':
        return <Target className="w-5 h-5 text-green-600" />;
      case 'review_received':
        return <CheckCircle className="w-5 h-5 text-purple-600" />;
      case 'blocker_resolved':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'action_completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Calendar className="w-5 h-5 text-neutral-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'report_submission':
        return 'bg-blue-100 border-blue-300';
      case 'goal_achievement':
        return 'bg-green-100 border-green-300';
      case 'review_received':
        return 'bg-purple-100 border-purple-300';
      case 'blocker_resolved':
        return 'bg-amber-100 border-amber-300';
      case 'action_completed':
        return 'bg-green-100 border-green-300';
      default:
        return 'bg-neutral-100 border-neutral-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-neutral-100 text-neutral-700';
      case 'on_leave':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={person.name}
        subtitle="Employee profile and activity timeline"
        showExport={true}
        onExport={() => showInfo('Exporting employee profile...')}
        showHelp={true}
        onHelp={() => showInfo('View employee information and activity history')}
        actions={
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.push('/people/directory')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Directory
          </Button>
        }
      />

      {/* Profile Card */}
      <Card>
        <CardContent>
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-3xl flex-shrink-0">
              {getInitials(person.name)}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">{person.name}</h2>
                  <p className="text-lg text-neutral-600">{person.role}</p>
                </div>
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full capitalize ${getStatusColor(person.status)}`}>
                  {person.status.replace('_', ' ')}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-neutral-400" />
                    <div>
                      <p className="text-xs text-neutral-500">Department & Team</p>
                      <p className="text-sm font-medium text-neutral-900">{person.department} • {person.team}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-neutral-400" />
                    <div>
                      <p className="text-xs text-neutral-500">Email</p>
                      <p className="text-sm font-medium text-neutral-900">{person.email}</p>
                    </div>
                  </div>
                  {person.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-neutral-400" />
                      <div>
                        <p className="text-xs text-neutral-500">Phone</p>
                        <p className="text-sm font-medium text-neutral-900">{person.phone}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-neutral-400" />
                    <div>
                      <p className="text-xs text-neutral-500">Location</p>
                      <p className="text-sm font-medium text-neutral-900">{person.location} ({person.timezone})</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-neutral-400" />
                    <div>
                      <p className="text-xs text-neutral-500">Start Date</p>
                      <p className="text-sm font-medium text-neutral-900">
                        {new Date(person.start_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {person.manager_name && (
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-neutral-400" />
                      <div>
                        <p className="text-xs text-neutral-500">Reports to</p>
                        <p className="text-sm font-medium text-neutral-900">{person.manager_name}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      {(person.efficiency_score || person.compliance_rate) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {person.efficiency_score && (
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Efficiency Score</p>
                    <p className="text-3xl font-bold text-primary-600">{person.efficiency_score}</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-primary-600" />
                </div>
              </CardContent>
            </Card>
          )}
          {person.compliance_rate && (
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Compliance Rate</p>
                    <p className="text-3xl font-bold text-green-600">{person.compliance_rate}%</p>
                  </div>
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Direct Reports */}
      {directReports.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Direct Reports ({directReports.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {directReports.map(report => (
                <div
                  key={report.id}
                  className="flex items-center gap-3 p-3 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors cursor-pointer"
                  onClick={() => router.push(`/people/${report.id}/timeline`)}
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-sm">
                    {getInitials(report.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-900 truncate">{report.name}</p>
                    <p className="text-xs text-neutral-600 truncate">{report.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          {activities.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <p className="text-neutral-600">No activity history found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity, idx) => (
                <div key={activity.id} className="relative">
                  {/* Timeline Line */}
                  {idx < activities.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-px bg-neutral-200" />
                  )}

                  {/* Activity Item */}
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h4 className="font-medium text-neutral-900">{activity.title}</h4>
                          <p className="text-sm text-neutral-600 mt-1">{activity.description}</p>
                        </div>
                        <span className="text-xs text-neutral-500 whitespace-nowrap">
                          {formatDate(activity.date)}
                        </span>
                      </div>

                      {/* Metadata */}
                      {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                        <div className="mt-2 p-3 bg-neutral-50 rounded-lg">
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-600">
                            {Object.entries(activity.metadata).map(([key, value]) => (
                              <span key={key}>
                                <strong className="text-neutral-700">{key.replace('_', ' ')}:</strong> {value}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
