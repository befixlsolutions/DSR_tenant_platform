'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, CheckCircle, Clock, AlertTriangle, FileText, TrendingUp } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockAppraisalCycles, getAppraisalsByCycle, getPendingCalibration, type AppraisalCycle } from '@/lib/mock-data/reviews';
import { showInfo } from '@/lib/utils/toast';

export default function AppraisalCyclesPage() {
  const router = useRouter();
  const [selectedCycle, setSelectedCycle] = useState<AppraisalCycle | null>(mockAppraisalCycles[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'closed':
        return 'bg-neutral-100 text-neutral-700';
      case 'upcoming':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getCompletionPercentage = (cycle: AppraisalCycle) => {
    return Math.round((cycle.completed_appraisals / cycle.total_employees) * 100);
  };

  const cycleAppraisals = selectedCycle ? getAppraisalsByCycle(selectedCycle.id) : [];
  const calibrationCases = getPendingCalibration();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Appraisal Cycles"
        subtitle="Manage performance review cycles and calibration"
        showExport={true}
        showHelp={true}
        onExport={() => showInfo('Exporting appraisal data...')}
        onHelp={() => showInfo('Appraisal cycles track quarterly/annual performance reviews')}
      />

      {/* Cycles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAppraisalCycles.map((cycle) => {
          const completionPct = getCompletionPercentage(cycle);
          const isSelected = selectedCycle?.id === cycle.id;

          return (
            <Card
              key={cycle.id}
              className={`cursor-pointer transition-all ${
                isSelected ? 'ring-2 ring-primary-500 shadow-md' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedCycle(cycle)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base">{cycle.name}</CardTitle>
                    <p className="text-xs text-neutral-600 mt-1">{cycle.period}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(cycle.status)}`}>
                    {cycle.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-neutral-600">Completion</span>
                      <span className="text-sm font-semibold text-neutral-900">{completionPct}%</span>
                    </div>
                    <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500 transition-all"
                        style={{ width: `${completionPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-neutral-400" />
                      <div>
                        <p className="text-neutral-600">Total</p>
                        <p className="font-semibold text-neutral-900">{cycle.total_employees}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="text-neutral-600">Completed</p>
                        <p className="font-semibold text-green-600">{cycle.completed_appraisals}</p>
                      </div>
                    </div>
                  </div>

                  {/* Pending Items */}
                  {cycle.status === 'active' && (
                    <div className="pt-3 border-t border-neutral-200 space-y-2">
                      {cycle.pending_employee_review > 0 && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-neutral-600">Employee Review</span>
                          <span className="font-semibold text-amber-600">{cycle.pending_employee_review}</span>
                        </div>
                      )}
                      {cycle.pending_manager_review > 0 && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-neutral-600">Manager Review</span>
                          <span className="font-semibold text-blue-600">{cycle.pending_manager_review}</span>
                        </div>
                      )}
                      {cycle.pending_hr_calibration > 0 && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-neutral-600">HR Calibration</span>
                          <span className="font-semibold text-purple-600">{cycle.pending_hr_calibration}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Dates */}
                  <div className="pt-3 border-t border-neutral-200">
                    <div className="flex items-center gap-2 text-xs text-neutral-600">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(cycle.start_date).toLocaleDateString()} - {new Date(cycle.end_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Selected Cycle Details */}
      {selectedCycle && (
        <>
          {/* Appraisals List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Appraisals - {selectedCycle.name}</CardTitle>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => router.push('/reviews/appraisals/new')}
                >
                  Create Appraisal
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Employee</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Manager</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Status</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Rating</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Evidence</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cycleAppraisals.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-sm text-neutral-600">
                          No appraisals in this cycle
                        </td>
                      </tr>
                    ) : (
                      cycleAppraisals.map((appraisal) => (
                        <tr key={appraisal.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-sm">
                                {appraisal.employee_name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="text-sm font-medium text-neutral-900">{appraisal.employee_name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-neutral-700">{appraisal.manager_name}</span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              appraisal.status === 'finalized' ? 'bg-green-100 text-green-700' :
                              appraisal.status === 'hr_calibration' ? 'bg-purple-100 text-purple-700' :
                              appraisal.status === 'manager_review' ? 'bg-blue-100 text-blue-700' :
                              appraisal.status === 'employee_review' ? 'bg-amber-100 text-amber-700' :
                              'bg-neutral-100 text-neutral-700'
                            }`}>
                              {appraisal.status.replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            {appraisal.hr_final_rating ? (
                              <span className="text-sm font-semibold text-neutral-900">{appraisal.hr_final_rating}/5</span>
                            ) : appraisal.manager_rating ? (
                              <span className="text-sm font-semibold text-blue-600">{appraisal.manager_rating}/5</span>
                            ) : (
                              <span className="text-sm text-neutral-400">-</span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={() => router.push(`/reviews/appraisals/${appraisal.id}/evidence`)}
                              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 mx-auto"
                            >
                              <FileText className="w-4 h-4" />
                              View Pack
                            </button>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => router.push(`/reviews/appraisals/${appraisal.id}`)}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Calibration Queue */}
          {calibrationCases.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <CardTitle>Calibration Queue</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {calibrationCases.map((calibration) => (
                    <div key={calibration.id} className="p-4 border border-neutral-200 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-neutral-900">{calibration.employee_name}</h4>
                          <p className="text-xs text-neutral-600 mt-1">Manager: {calibration.manager_name}</p>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          calibration.reason === 'outlier' ? 'bg-red-100 text-red-700' :
                          calibration.reason === 'volatility' ? 'bg-amber-100 text-amber-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {calibration.reason}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="text-center p-2 bg-neutral-50 rounded">
                          <p className="text-xs text-neutral-600 mb-1">Manager Rating</p>
                          <p className="text-lg font-bold text-neutral-900">{calibration.manager_rating}</p>
                        </div>
                        <div className="text-center p-2 bg-primary-50 rounded">
                          <p className="text-xs text-neutral-600 mb-1">Suggested</p>
                          <p className="text-lg font-bold text-primary-600">{calibration.suggested_rating}</p>
                        </div>
                        <div className="text-center p-2 bg-amber-50 rounded">
                          <p className="text-xs text-neutral-600 mb-1">Variance</p>
                          <p className={`text-lg font-bold ${calibration.variance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {calibration.variance > 0 ? '+' : ''}{calibration.variance}
                          </p>
                        </div>
                      </div>
                      {calibration.notes && (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded text-xs text-neutral-700 mb-3">
                          {calibration.notes}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Button variant="secondary" size="sm" className="flex-1">
                          Keep Original
                        </Button>
                        <Button variant="primary" size="sm" className="flex-1">
                          Apply Suggestion
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
