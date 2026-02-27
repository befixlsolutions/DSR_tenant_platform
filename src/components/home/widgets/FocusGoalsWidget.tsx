'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/providers/AuthProvider';
import { getFocusGoals } from '@/lib/mock-data/goals';
import { Target, TrendingUp, AlertTriangle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const FocusGoalsWidget = () => {
  const { user } = useAuth();
  const focusGoals = user ? getFocusGoals(user.id) : [];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'secondary';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary-700" />
            <CardTitle>Focus Goals (GLS)</CardTitle>
          </div>
          <Link href="/goals/focus">
            <Button variant="ghost" size="sm">
              View All
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {focusGoals.length === 0 ? (
          <div className="text-center py-8">
            <Target className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <p className="text-neutral-600 mb-4">No active goals</p>
            <Link href="/goals/my">
              <Button variant="primary" size="sm">
                Create Goal
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {focusGoals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/goals/${goal.id}`}>
                  <div className="p-4 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50/50 transition-all cursor-pointer group">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-neutral-900 group-hover:text-primary-700 transition-colors">
                            {goal.title}
                          </h4>
                          {getRiskIcon(goal.risk_level)}
                        </div>
                        <p className="text-xs text-neutral-600 line-clamp-1">
                          {goal.description}
                        </p>
                      </div>
                      <Badge variant={getPriorityColor(goal.priority)} size="sm">
                        {goal.priority}
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-600">Progress</span>
                        <span className="font-medium text-neutral-900">
                          {goal.actual_progress}% / {goal.expected_progress}%
                        </span>
                      </div>
                      <div className="relative h-2 bg-neutral-200 rounded-full overflow-hidden">
                        {/* Expected Progress (background) */}
                        <div
                          className="absolute inset-y-0 left-0 bg-neutral-300"
                          style={{ width: `${goal.expected_progress}%` }}
                        />
                        {/* Actual Progress */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.actual_progress}%` }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                          className={`absolute inset-y-0 left-0 ${
                            goal.actual_progress >= goal.expected_progress
                              ? 'bg-green-500'
                              : goal.actual_progress >= goal.expected_progress * 0.8
                              ? 'bg-orange-500'
                              : 'bg-red-500'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between mt-3 text-xs text-neutral-500">
                      <span>Due: {goal.due_week}</span>
                      {goal.blockers.length > 0 && (
                        <span className="flex items-center text-red-600">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {goal.blockers.length} blocker{goal.blockers.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        {focusGoals.length > 0 && (
          <div className="mt-4 pt-4 border-t border-neutral-200">
            <Link href="/goals/my">
              <Button variant="outline" size="sm" className="w-full">
                <Target className="w-4 h-4 mr-2" />
                Manage All Goals
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
