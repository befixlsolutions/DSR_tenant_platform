'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TrendingUp, Calendar, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const ComplianceStreakWidget = () => {
  const currentStreak = 15;
  const longestStreak = 28;
  const thisMonthSubmissions = 18;
  const thisMonthTarget = 20;
  const complianceRate = 95;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <CardTitle>Compliance & Streak</CardTitle>
          </div>
          <Badge variant="success">
            {complianceRate}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Current Streak */}
        <div className="text-center py-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <div className="text-5xl font-bold text-green-600 mb-2">
              {currentStreak}
            </div>
            <p className="text-sm font-medium text-green-800">Day Streak 🔥</p>
            <p className="text-xs text-green-600 mt-1">Keep it going!</p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-orange-600" />
              <span className="text-sm text-neutral-700">Longest Streak</span>
            </div>
            <span className="text-sm font-semibold text-neutral-900">{longestStreak} days</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-neutral-700">This Month</span>
            </div>
            <span className="text-sm font-semibold text-neutral-900">
              {thisMonthSubmissions}/{thisMonthTarget}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-neutral-600">
              <span>Monthly Progress</span>
              <span>{Math.round((thisMonthSubmissions / thisMonthTarget) * 100)}%</span>
            </div>
            <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(thisMonthSubmissions / thisMonthTarget) * 100}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Achievement Badge */}
        {currentStreak >= 7 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🏆</span>
              <div className="flex-1">
                <p className="text-xs font-medium text-yellow-900">Achievement Unlocked!</p>
                <p className="text-xs text-yellow-700">Week Warrior - 7+ day streak</p>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
