// Reporting Inbox Page
'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockDSRReports } from '@/lib/mock-data/reports';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ReportingInboxPage() {
  const [timeUntilCutoff, setTimeUntilCutoff] = useState('');

  useEffect(() => {
    const updateCutoff = () => {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setHours(18, 0, 0, 0); // 6 PM cutoff

      if (now > cutoff) {
        cutoff.setDate(cutoff.getDate() + 1);
      }

      const diff = cutoff.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeUntilCutoff(`${hours}h ${minutes}m`);
    };

    updateCutoff();
    const interval = setInterval(updateCutoff, 60000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const todayReport = mockDSRReports.find(r => r.report_date === today);
  const reworkReports = mockDSRReports.filter(r => r.status === 'rework_requested');

  const now = new Date();
  const cutoff = new Date();
  cutoff.setHours(18, 0, 0, 0);

  const isPastCutoff = now > cutoff;
  const isOverdue = isPastCutoff && (!todayReport || todayReport.status === 'draft');
  const isUrgent = !isPastCutoff && (timeUntilCutoff.startsWith('0h') || timeUntilCutoff.startsWith('1h'));

  return (
    <div className="space-y-5">{/* Removed p-6 */}
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reporting Inbox</h1>
        <p className="text-sm text-gray-600 mt-1">Your daily reporting checklist</p>
      </div>

      {/* Cutoff Banner */}
      <Card className={`p-4 border-2 ${isUrgent ? 'border-red-500 bg-red-50' : 'border-orange-500 bg-orange-50'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Daily Cutoff Time</h3>
            <p className="text-sm text-gray-600 mt-1">Submit your DSR before 6:00 PM</p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${isUrgent ? 'text-red-600' : 'text-orange-600'}`}>
              {timeUntilCutoff}
            </div>
            <p className="text-xs text-gray-600">remaining</p>
          </div>
        </div>
      </Card>

      {/* Required Today */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Required Today</h2>
          {isOverdue && (
            <Badge variant="red">Overdue</Badge>
          )}
        </div>

        <div className="space-y-4">
          {/* DSR Status */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${todayReport?.status === 'submitted' || todayReport?.status === 'approved'
                  ? 'bg-green-100'
                  : 'bg-orange-100'
                }`}>
                {todayReport?.status === 'submitted' || todayReport?.status === 'approved' ? (
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Daily Status Report (DSR)</h3>
                <p className="text-sm text-gray-600">
                  {todayReport?.status === 'submitted' || todayReport?.status === 'approved'
                    ? `Submitted at ${new Date(todayReport.submitted_at!).toLocaleTimeString()}`
                    : todayReport?.status === 'draft'
                      ? 'Draft saved - Continue editing'
                      : 'Not started yet'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {todayReport?.status === 'draft' ? (
                <Link href={`/reporting/dsr/${todayReport.id}`}>
                  <Button variant="secondary">Continue Draft</Button>
                </Link>
              ) : !todayReport ? (
                <Link href="/reporting/dsr/new">
                  <Button>Start DSR</Button>
                </Link>
              ) : (
                <Link href={`/reporting/dsr/${todayReport.id}`}>
                  <Button variant="secondary">View</Button>
                </Link>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">4/5</div>
              <div className="text-xs text-gray-600 mt-1">This Week</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">92%</div>
              <div className="text-xs text-gray-600 mt-1">On-Time</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{reworkReports.length}</div>
              <div className="text-xs text-gray-600 mt-1">Pending Rework</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Rework Pending */}
      {reworkReports.length > 0 && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Rework Pending</h2>
          <div className="space-y-3">
            {reworkReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="orange">Rework Requested</Badge>
                    <span className="text-sm text-gray-600">{report.report_date}</span>
                  </div>
                  {report.review_comments && (
                    <p className="text-sm text-gray-700 mt-2">{report.review_comments}</p>
                  )}
                </div>
                <Link href={`/reporting/dsr/${report.id}`}>
                  <Button variant="secondary" size="sm">Fix Now</Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="/reporting">
            <Button variant="secondary" className="w-full justify-start">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View All Reports
            </Button>
          </Link>
          <Link href="/goals/my">
            <Button variant="secondary" className="w-full justify-start">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              My Goals
            </Button>
          </Link>
          <Link href="/blockers/my">
            <Button variant="secondary" className="w-full justify-start">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              My Blockers
            </Button>
          </Link>
          <Link href="/analytics/my">
            <Button variant="secondary" className="w-full justify-start">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              My Analytics
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
