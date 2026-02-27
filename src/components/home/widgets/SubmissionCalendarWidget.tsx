'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export const SubmissionCalendarWidget = () => {
  // Generate last 30 days
  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date;
  });

  // Mock submission data (1 = submitted, 0 = missed, null = future/weekend)
  const submissions = days.map((date) => {
    const dayOfWeek = date.getDay();
    // Weekend
    if (dayOfWeek === 0 || dayOfWeek === 6) return null;
    // Future date
    if (date > new Date()) return null;
    // Random submission status (90% submitted)
    return Math.random() > 0.1 ? 1 : 0;
  });

  const getColor = (status: number | null) => {
    if (status === null) return 'bg-gray-100 border border-gray-200';
    if (status === 1) return 'bg-green-500';
    return 'bg-red-500';
  };

  const getTooltip = (date: Date, status: number | null) => {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return 'Weekend';
    if (date > new Date()) return 'Future';
    if (status === 1) return 'Submitted';
    return 'Missed';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-primary-700" />
          <CardTitle>Submission Calendar (Last 30 Days)</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-3">
          {days.map((date, index) => {
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNum = date.getDate();
            const status = submissions[index];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                className="group relative"
              >
                <div className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-1">{dayName}</div>
                  <div
                    className={`w-12 h-12 rounded-lg ${getColor(status)} transition-all group-hover:scale-110 cursor-pointer flex items-center justify-center text-sm font-medium ${
                      status === null ? 'text-gray-400' : 'text-white'
                    }`}
                  >
                    {dayNum}
                  </div>
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-lg">
                  <div className="font-medium">{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                  <div className="text-gray-300">{getTooltip(date, status)}</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div className="border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-green-500" />
            <span>Submitted</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-red-500" />
            <span>Missed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-gray-100 border border-gray-300" />
            <span>Weekend/Future</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
