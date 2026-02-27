'use client';

import { useParams, useRouter } from 'next/navigation';
import { FileText, Target, AlertTriangle, TrendingUp, Calendar, Download, Eye } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { showSuccess, showInfo } from '@/lib/utils/toast';

export default function EvidencePackPage() {
  const params = useParams();
  const router = useRouter();
  const packId = params.id as string;

  // Mock evidence pack data
  const evidencePack = {
    id: packId,
    employee_id: 'user-1',
    employee_name: 'John Employee',
    period_start: '2025-11-01',
    period_end: '2026-01-31',
    appraisal_cycle: 'Q1 2026 Performance Review',
    generated_at: '2026-02-01T00:00:00Z',
    
    // MSR Collection (3 months)
    msr_reports: [
      {
        id: 'msr-1',
        month: 'November 2025',
        efficiency_score: 85,
        compliance_rate: 95,
        goals_achieved: 4,
        goals_total: 5,
        blockers_resolved: 3,
        key_achievements: [
          'Completed payment gateway integration',
          'Improved API response time by 40%',
          'Mentored 2 junior developers',
        ],
      },
      {
        id: 'msr-2',
        month: 'December 2025',
        efficiency_score: 88,
        compliance_rate: 98,
        goals_achieved: 5,
        goals_total: 5,
        blockers_resolved: 2,
        key_achievements: [
          'Launched mobile app redesign',
          'Achieved 95% test coverage',
          'Led architecture review sessions',
        ],
      },
      {
        id: 'msr-3',
        month: 'January 2026',
        efficiency_score: 86,
        compliance_rate: 96,
        goals_achieved: 4,
        goals_total: 5,
        blockers_resolved: 4,
        key_achievements: [
          'Optimized database queries',
          'Implemented caching layer',
          'Reduced deployment time by 50%',
        ],
      },
    ],

    // Goal Achievements
    goals: [
      {
        id: 'goal-1',
        title: 'Complete Payment Gateway Integration',
        status: 'achieved',
        completion_date: '2025-11-15',
        success_criteria_met: 5,
        success_criteria_total: 5,
      },
      {
        id: 'goal-2',
        title: 'Improve API Performance',
        status: 'achieved',
        completion_date: '2025-11-28',
        success_criteria_met: 4,
        success_criteria_total: 5,
      },
      {
        id: 'goal-3',
        title: 'Launch Mobile App Redesign',
        status: 'achieved',
        completion_date: '2025-12-20',
        success_criteria_met: 5,
        success_criteria_total: 5,
      },
      {
        id: 'goal-4',
        title: 'Achieve 90% Test Coverage',
        status: 'achieved',
        completion_date: '2025-12-15',
        success_criteria_met: 5,
        success_criteria_total: 5,
      },
    ],

    // Blocker Resolutions
    blockers: [
      {
        id: 'blocker-1',
        title: 'API documentation incomplete',
        severity: 'S2',
        raised_date: '2025-11-05',
        resolved_date: '2025-11-10',
        resolution_time_days: 5,
        impact: 'Blocked integration testing',
      },
      {
        id: 'blocker-2',
        title: 'Infrastructure migration pending',
        severity: 'S1',
        raised_date: '2025-12-01',
        resolved_date: '2025-12-08',
        resolution_time_days: 7,
        impact: 'Delayed deployment',
      },
      {
        id: 'blocker-3',
        title: 'Design review capacity',
        severity: 'S2',
        raised_date: '2026-01-10',
        resolved_date: '2026-01-15',
        resolution_time_days: 5,
        impact: 'Slowed feature development',
      },
    ],

    // Efficiency Scores
    efficiency_trend: [
      { month: 'Nov', score: 85 },
      { month: 'Dec', score: 88 },
      { month: 'Jan', score: 86 },
    ],

    // Summary Stats
    summary: {
      avg_efficiency: 86.3,
      total_goals_achieved: 13,
      total_goals: 15,
      goal_achievement_rate: 87,
      total_blockers_resolved: 9,
      avg_resolution_time: 5.7,
      compliance_rate: 96.3,
      dsr_submissions: 63,
      dsr_on_time: 61,
      wsr_submissions: 13,
      wsr_on_time: 13,
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'achieved':
        return 'bg-green-100 text-green-700';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700';
      case 'missed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'S0':
      case 'S1':
        return 'bg-red-100 text-red-700';
      case 'S2':
        return 'bg-amber-100 text-amber-700';
      case 'S3':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const handleExport = () => {
    showSuccess('Evidence pack exported successfully');
  };

  const handleViewReport = (reportId: string) => {
    router.push(`/reporting/msr/${reportId}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Evidence Pack"
        subtitle={`${evidencePack.employee_name} - ${evidencePack.appraisal_cycle}`}
        showExport={true}
        onExport={handleExport}
        showHelp={true}
        onHelp={() => showInfo('Evidence packs compile performance data for appraisal reviews')}
        actions={
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.back()}
          >
            Back to Appraisals
          </Button>
        }
      />

      {/* Period Info */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-neutral-600" />
              <div>
                <p className="text-sm font-medium text-neutral-900">Review Period</p>
                <p className="text-xs text-neutral-600">
                  {new Date(evidencePack.period_start).toLocaleDateString()} - {new Date(evidencePack.period_end).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-neutral-900">Generated</p>
              <p className="text-xs text-neutral-600">
                {new Date(evidencePack.generated_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-neutral-900">{evidencePack.summary.avg_efficiency}</p>
              <p className="text-sm text-neutral-600 mt-1">Avg Efficiency</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-center">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-neutral-900">{evidencePack.summary.goal_achievement_rate}%</p>
              <p className="text-sm text-neutral-600 mt-1">Goals Achieved</p>
              <p className="text-xs text-neutral-500 mt-1">{evidencePack.summary.total_goals_achieved}/{evidencePack.summary.total_goals}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-center">
              <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-neutral-900">{evidencePack.summary.total_blockers_resolved}</p>
              <p className="text-sm text-neutral-600 mt-1">Blockers Resolved</p>
              <p className="text-xs text-neutral-500 mt-1">Avg {evidencePack.summary.avg_resolution_time}d TTR</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-center">
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-neutral-900">{evidencePack.summary.compliance_rate}%</p>
              <p className="text-sm text-neutral-600 mt-1">Compliance Rate</p>
              <p className="text-xs text-neutral-500 mt-1">{evidencePack.summary.dsr_on_time}/{evidencePack.summary.dsr_submissions} DSRs on time</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Efficiency Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Efficiency Score Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between gap-4 h-48">
            {evidencePack.efficiency_trend.map((data, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-neutral-100 rounded-t-lg relative" style={{ height: '100%' }}>
                  <div
                    className="absolute bottom-0 w-full bg-primary-600 rounded-t-lg transition-all"
                    style={{ height: `${data.score}%` }}
                  />
                  <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-white">
                    {data.score}
                  </span>
                </div>
                <span className="text-sm font-medium text-neutral-700 mt-3">{data.month}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* MSR Collection */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Status Reports (Last 3 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {evidencePack.msr_reports.map((msr, idx) => (
              <div
                key={idx}
                className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-neutral-900">{msr.month}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-neutral-600">
                      <span>Efficiency: <strong className="text-primary-600">{msr.efficiency_score}</strong></span>
                      <span>Compliance: <strong className="text-green-600">{msr.compliance_rate}%</strong></span>
                      <span>Goals: <strong>{msr.goals_achieved}/{msr.goals_total}</strong></span>
                      <span>Blockers: <strong>{msr.blockers_resolved}</strong></span>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleViewReport(msr.id)}
                    leftIcon={<Eye className="w-4 h-4" />}
                  >
                    View Report
                  </Button>
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-700 mb-2">Key Achievements:</p>
                  <ul className="space-y-1">
                    {msr.key_achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-neutral-600 flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Goal Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Goal Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {evidencePack.goals.map((goal, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-neutral-900">{goal.title}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(goal.status)}`}>
                      {goal.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-neutral-600">
                    <span>Completed: {new Date(goal.completion_date).toLocaleDateString()}</span>
                    <span>Success Criteria: {goal.success_criteria_met}/{goal.success_criteria_total}</span>
                  </div>
                </div>
                <Target className="w-5 h-5 text-green-600" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Blocker Resolutions */}
      <Card>
        <CardHeader>
          <CardTitle>Blocker Resolutions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {evidencePack.blockers.map((blocker, idx) => (
              <div
                key={idx}
                className="p-4 border border-neutral-200 rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(blocker.severity)}`}>
                      {blocker.severity}
                    </span>
                    <h3 className="font-medium text-neutral-900">{blocker.title}</h3>
                  </div>
                  <span className="text-sm font-bold text-green-600">{blocker.resolution_time_days}d TTR</span>
                </div>
                <p className="text-sm text-neutral-600 mb-2">{blocker.impact}</p>
                <div className="flex items-center gap-4 text-xs text-neutral-500">
                  <span>Raised: {new Date(blocker.raised_date).toLocaleDateString()}</span>
                  <span>Resolved: {new Date(blocker.resolved_date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Actions */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-900">Export Evidence Pack</p>
              <p className="text-sm text-neutral-600 mt-1">Download complete evidence pack for offline review</p>
            </div>
            <Button
              variant="primary"
              onClick={handleExport}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Export PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
