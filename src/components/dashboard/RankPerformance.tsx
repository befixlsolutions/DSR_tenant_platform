'use client';

import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const performers = [
  { name: 'Cindy Marlina', role: 'Marketing Specialist', points: 115 },
  { name: 'Robbie Harrison', role: 'Product Manager', points: 114 },
  { name: 'Mavis Mata', role: 'Customer Service', points: 115 },
];

export const RankPerformance = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Rank Performance</CardTitle>
          <button className="text-sm text-primary-700 hover:text-primary-800 font-medium">
            See All
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {performers.map((performer, index) => (
            <motion.div
              key={performer.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-900">{performer.name}</h4>
                <p className="text-sm text-neutral-500">{performer.role}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary-700">{performer.points} Point</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
