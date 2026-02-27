'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, TrendingUp, Target, AlertTriangle, Award, MessageSquare, User, Edit } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockMSRReports } from '@/lib/mock-data/reports';
import { showInfo } from '@/lib/utils/toast';

export default function MSRDetailPage() {
  const params = useParams();
  const router = useRouter();
  const reportId = params.id as string;

  const report = mockMSRReports.find(r => r.id === reportId);

  if (!report) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-neutral-600">MSR not found</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-700';
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-neutral-100 text-neutral-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const monthName = new Date(report.month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Monthly Status Report"
        subtitle={monthName}
        showExport={true}
        showHelp={true}
        onExport={() => showInfo('Exporting MSR...')}
        onHelp={() => showInfo('MSR provides comprehensive monthly performance summary')}
        actions={
          report.status === 'draft' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push(`/reporting/msr/${reportId}/edit`)}
              leftIcon={<Edit className="w-4 h-4" />}
            >
              Edit
            </Button>
          )
        }
      />

      {/* Status & Metadata */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-neutral-600 mb-1">Status</p>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(report.status)}`}>
                {report.status}
              </span>
            </div>
            <div>
              <p className="text-xs text-neutral-600 mb-1">Month</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neutral-400" />
                <p className="text-sm font-medium text-neutral-900">{monthName}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-neutral-600 mb-1">Created</p>
              <p className="text-sm font-medium text-neutral-900">
                {new Date(report.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Executive Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-700 leading-relaxed">{report.executive_summary}</p>
        </CardContent>
      </Card>

      {/* Efficiency Trend Snapshot */}
      <Card>
        <CardHeader>
          <CardTitle>Efficiency Trend Snapshot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Circular Score */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="none"
                    className="text-neutral-200"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - report.efficiency_trend_snapshot.total_score / 100)}`}
                    className={getScoreColor(report.efficiency_trend_snapshot.total_score)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className={`text-4xl font-bold ${getScoreColor(report.efficiency_trend_snapshot.total_score)}`}>
                    {report.efficiency_trend_snapshot.total_score}
                  </p>
                  <p className="text-xs text-neutral-600 mt-1">Total Score</p>
                </div>
              </div>
            </div>

            {/* Component Breakdown */}
            <div className="space-y-3">
              {[
                { label: 'Discipline', score: report.efficiency_trend_snapshot.discipline, weight: 20 },
                { label: 'Goals', score: report.efficiency_trend_snapshot.goals, weight: 25 },
                { label: 'Delivery', score: report.efficiency_trend_snapshot.delivery, weight: 25 },
                { label: 'Blockers', score: report.efficiency_trend_snapshot.blockers, weight: 15 },
                { label: 'Communication', score: report.efficiency_trend_snapshot.communication, weight: 15 },
              ].map((component) => (
                <div key={component.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-neutral-700">
                      {component.label} ({component.weight}%)
                    </span>
                    <span className={`text-sm font-semibold ${getScoreColor(component.score)}`}>
                      {component.score}
                    </span>
                  </div>
                  <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getScoreBgColor(component.score)} transition-all`}
                      style={{ width: `${component.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals & Outcomes */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary-600" />
            <CardTitle>Goals & Outcomes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-700 leading-relaxed">{report.goals_outcomes}</p>
        </CardContent>
      </Card>

      {/* Delivery Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary-600" />
            <CardTitle>Delivery Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-700 leading-relaxed">{report.delivery_summary}</p>
        </CardContent>
      </Card>

      {/* Blocker Analysis */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <CardTitle>Blocker Analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-neutral-700 leading-relaxed">{report.blocker_analysis}</p>
          </div>
        </CardContent>
      </Card>

      {/* Communication Signals */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary-600" />
            <CardTitle>Communication Signals</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-700 leading-relaxed">{report.communication_signals}</p>
        </CardContent>
      </Card>

      {/* Manager Review & Employee Reflection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary-600" />
              <CardTitle>Manager Review</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-neutral-700 leading-relaxed">{report.manager_review}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary-600" />
              <CardTitle>Employee Reflection</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-neutral-700 leading-relaxed">{report.employee_reflection}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Month Focus */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            <CardTitle>Next Month Focus</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {report.next_month_focus.map((focus, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-primary-50 border border-primary-200 rounded-lg">
                <span className="text-primary-600 font-semibold">{index + 1}.</span>
                <p className="text-sm text-neutral-900">{focus}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-neutral-900">Created</p>
                <p className="text-xs text-neutral-600">{new Date(report.created_at).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-neutral-900">Last Updated</p>
                <p className="text-xs text-neutral-600">{new Date(report.updated_at).toLocaleString()}</p>
              </div>
            </div>
            {report.status === 'approved' && (
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Approved</p>
                  <p className="text-xs text-neutral-600">Status: {report.status}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
