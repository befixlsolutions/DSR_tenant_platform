'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

export const TeamHealthWidget = () => {
  const healthMetrics = [
    { label: 'Team Efficiency', value: 87, trend: 'up', change: '+5%' },
    { label: 'Goal Achievement', value: 92, trend: 'up', change: '+3%' },
    { label: 'Blocker Resolution', value: 78, trend: 'down', change: '-2%' },
    { label: 'Review SLA', value: 98, trend: 'up', change: '+1%' },
  ];

  const getColor = (value: number) => {
    if (value >= 90) return 'text-green-600 bg-green-100';
    if (value >= 70) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-primary-700" />
          <CardTitle>Team Health Indicators</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {healthMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg border border-neutral-200 hover:border-primary-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-neutral-600">{metric.label}</span>
                {metric.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
              </div>

              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-neutral-900">{metric.value}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  metric.trend === 'up' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                }`}>
                  {metric.change}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 h-2 bg-neutral-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  className={`h-full ${
                    metric.value >= 90 ? 'bg-green-500' :
                    metric.value >= 70 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
