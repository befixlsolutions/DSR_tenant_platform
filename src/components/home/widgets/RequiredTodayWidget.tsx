'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/providers/AuthProvider';
import { getRequiredToday } from '@/lib/mock-data/reports';
import { Clock, FileText, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const RequiredTodayWidget = () => {
  const { user } = useAuth();
  const todayReport = user ? getRequiredToday(user.id) : null;

  const now = new Date();
  const cutoffTime = new Date();
  cutoffTime.setHours(18, 0, 0, 0); // 6 PM cutoff
  const hoursUntilCutoff = Math.max(0, Math.floor((cutoffTime.getTime() - now.getTime()) / (1000 * 60 * 60)));

  const isOverdue = hoursUntilCutoff === 0;
  const isUrgent = hoursUntilCutoff <= 2;

  return (
    <Card className={isOverdue ? 'border-2 border-red-500' : isUrgent ? 'border-2 border-orange-500' : ''}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary-700" />
            <CardTitle>Required Today</CardTitle>
          </div>
          {isOverdue && (
            <Badge variant="danger" className="animate-pulse">
              <AlertCircle className="w-3 h-3 mr-1" />
              Overdue
            </Badge>
          )}
          {isUrgent && !isOverdue && (
            <Badge variant="warning">
              <Clock className="w-3 h-3 mr-1" />
              {hoursUntilCutoff}h left
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {todayReport ? (
          todayReport.status === 'submitted' || todayReport.status === 'approved' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">All Done! ✨</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Your DSR for today has been submitted
              </p>
              <Link href={`/reporting/dsr/${todayReport.id}`}>
                <Button variant="outline" size="sm">
                  View Report
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-orange-900">Draft in Progress</h4>
                    <p className="text-sm text-orange-700 mt-1">
                      You have a draft DSR that needs to be completed and submitted
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Link href={`/reporting/dsr/${todayReport.id}`} className="flex-1">
                  <Button variant="primary" className="w-full">
                    Continue Draft
                  </Button>
                </Link>
                <Link href="/reporting/dsr/new">
                  <Button variant="outline">
                    Start Fresh
                  </Button>
                </Link>
              </div>
            </div>
          )
        ) : (
          <div className="space-y-4">
            <div className={`${isOverdue ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'} border rounded-lg p-4`}>
              <div className="flex items-start space-x-3">
                <FileText className={`w-5 h-5 ${isOverdue ? 'text-red-600' : 'text-blue-600'} mt-0.5`} />
                <div className="flex-1">
                  <h4 className={`font-medium ${isOverdue ? 'text-red-900' : 'text-blue-900'}`}>
                    {isOverdue ? 'DSR Overdue!' : 'DSR Not Started'}
                  </h4>
                  <p className={`text-sm ${isOverdue ? 'text-red-700' : 'text-blue-700'} mt-1`}>
                    {isOverdue 
                      ? 'Your Daily Status Report was due at 6 PM. Please submit as soon as possible.'
                      : `Submit your Daily Status Report before 6 PM (${hoursUntilCutoff} hours remaining)`
                    }
                  </p>
                </div>
              </div>
            </div>
            <Link href="/reporting/dsr/new">
              <Button variant="primary" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Start DSR
              </Button>
            </Link>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-6 pt-6 border-t border-neutral-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary-700">12</p>
              <p className="text-xs text-neutral-600">This Week</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">95%</p>
              <p className="text-xs text-neutral-600">On-Time</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">2</p>
              <p className="text-xs text-neutral-600">Pending Review</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
