'use client';

import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Project Done', value: '50%', color: 'text-purple-600' },
  { label: 'In Progress', value: '25%', color: 'text-orange-600' },
  { label: 'Backlog', value: '15%', color: 'text-blue-600' },
];

export const ProjectCompletion = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Project Completed</CardTitle>
          <span className="text-sm text-neutral-500">Total project 100</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="96"
                cy="96"
                r="80"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="16"
              />
              {/* Purple segment (50%) */}
              <motion.circle
                cx="96"
                cy="96"
                r="80"
                fill="none"
                stroke="#a78bfa"
                strokeWidth="16"
                strokeDasharray={`${2 * Math.PI * 80 * 0.5} ${2 * Math.PI * 80}`}
                strokeLinecap="round"
                initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
              {/* Orange segment (25%) */}
              <motion.circle
                cx="96"
                cy="96"
                r="80"
                fill="none"
                stroke="#fb923c"
                strokeWidth="16"
                strokeDasharray={`${2 * Math.PI * 80 * 0.25} ${2 * Math.PI * 80}`}
                strokeDashoffset={-2 * Math.PI * 80 * 0.5}
                strokeLinecap="round"
                initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
                animate={{ strokeDashoffset: -2 * Math.PI * 80 * 0.5 }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              />
              {/* Blue segment (15%) */}
              <motion.circle
                cx="96"
                cy="96"
                r="80"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="16"
                strokeDasharray={`${2 * Math.PI * 80 * 0.15} ${2 * Math.PI * 80}`}
                strokeDashoffset={-2 * Math.PI * 80 * 0.75}
                strokeLinecap="round"
                initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
                animate={{ strokeDashoffset: -2 * Math.PI * 80 * 0.75 }}
                transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
              />
            </svg>
          </div>
        </div>

        <div className="space-y-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${stat.color.replace('text-', 'bg-')}`} />
                <span className="text-sm text-neutral-600">{stat.label}</span>
              </div>
              <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
