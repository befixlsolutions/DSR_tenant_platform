'use client';

import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { motion } from 'framer-motion';

const sessions = [
  { type: 'Focus Session', value: 60, color: 'bg-orange-400' },
  { type: 'Break Session', value: 40, color: 'bg-neutral-300' },
  { type: 'Focus Session', value: 80, color: 'bg-orange-400' },
  { type: 'Break Session', value: 30, color: 'bg-neutral-300' },
  { type: 'Focus Session', value: 90, color: 'bg-orange-400' },
  { type: 'Break Session', value: 50, color: 'bg-neutral-300' },
];

export const TrackerDetail = () => {
  const maxValue = Math.max(...sessions.map(s => s.value));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Tracker Detail</CardTitle>
          <button className="text-sm text-primary-700 hover:text-primary-800 font-medium">
            See All
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between h-40 space-x-2">
          {sessions.map((session, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${(session.value / maxValue) * 100}%` }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex-1 ${session.color} rounded-t-lg relative group`}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {session.value}%
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-orange-400" />
            <span className="text-neutral-600">Focus Session</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-neutral-300" />
            <span className="text-neutral-600">Break Session</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
