'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const AtRiskGoalsWidget = () => {
  const atRiskGoals = [
    { id: '1', title: 'Payment Gateway Integration', owner: 'John Employee', progress: 45, expected: 60, risk: 'high' },
    { id: '2', title: 'Analytics Dashboard', owner: 'Jane Developer', progress: 30, expected: 50, risk: 'medium' },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <CardTitle>At-Risk Goals</CardTitle>
          </div>
          <Badge variant="danger">{atRiskGoals.length}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {atRiskGoals.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm font-medium text-neutral-900 mb-1">All Goals On Track!</p>
            <p className="text-xs text-neutral-600">No at-risk goals</p>
          </div>
        ) : (
          <div className="space-y-3">
            {atRiskGoals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/goals/${goal.id}`}>
                  <div className="p-3 rounded-lg border border-red-200 bg-red-50/50 hover:bg-red-100/50 transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-neutral-900 line-clamp-1">
                          {goal.title}
                        </h4>
                        <p className="text-xs text-neutral-600">{goal.owner}</p>
                      </div>
                      <Badge variant={goal.risk === 'high' ? 'danger' : 'warning'} size="sm">
                        {goal.risk}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-600">Progress</span>
                        <span className="font-medium text-red-600">
                          {goal.progress}% / {goal.expected}%
                        </span>
                      </div>
                      <div className="relative h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-neutral-300"
                          style={{ width: `${goal.expected}%` }}
                        />
                        <div
                          className="absolute inset-y-0 left-0 bg-red-500"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center text-xs text-red-600 mt-2">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      Behind schedule
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
