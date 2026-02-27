'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export const BlockerHeatmapWidget = () => {
  const teamMembers = [
    { name: 'John', blockers: { S0: 0, S1: 1, S2: 2, S3: 1 } },
    { name: 'Jane', blockers: { S0: 0, S1: 0, S2: 1, S3: 0 } },
    { name: 'Mike', blockers: { S0: 1, S1: 2, S2: 1, S3: 2 } },
    { name: 'Sarah', blockers: { S0: 0, S1: 0, S2: 0, S3: 1 } },
    { name: 'Tom', blockers: { S0: 0, S1: 1, S2: 3, S3: 0 } },
    { name: 'Lisa', blockers: { S0: 0, S1: 0, S2: 1, S3: 1 } },
  ];

  const getIntensity = (count: number) => {
    if (count === 0) return 'bg-neutral-100';
    if (count === 1) return 'bg-orange-200';
    if (count === 2) return 'bg-orange-400';
    return 'bg-red-500';
  };

  const totalBlockers = teamMembers.reduce((sum, member) => 
    sum + Object.values(member.blockers).reduce((a, b) => a + b, 0), 0
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <CardTitle>Blocker Heatmap</CardTitle>
          </div>
          <span className="text-sm text-neutral-600">{totalBlockers} total</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Header */}
          <div className="grid grid-cols-5 gap-2 text-xs font-medium text-neutral-600 pb-2 border-b">
            <div>Member</div>
            <div className="text-center">S0</div>
            <div className="text-center">S1</div>
            <div className="text-center">S2</div>
            <div className="text-center">S3</div>
          </div>

          {/* Heatmap */}
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="grid grid-cols-5 gap-2 items-center"
            >
              <div className="text-sm font-medium text-neutral-900">{member.name}</div>
              {(['S0', 'S1', 'S2', 'S3'] as const).map((severity) => (
                <div
                  key={severity}
                  className={`h-10 rounded flex items-center justify-center text-sm font-semibold ${
                    getIntensity(member.blockers[severity])
                  } ${member.blockers[severity] > 0 ? 'text-white' : 'text-neutral-400'}`}
                >
                  {member.blockers[severity] || '-'}
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-neutral-200">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-600">Severity Levels:</span>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded bg-red-500" />
                <span className="text-neutral-600">Critical</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded bg-orange-400" />
                <span className="text-neutral-600">High</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded bg-orange-200" />
                <span className="text-neutral-600">Medium</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
