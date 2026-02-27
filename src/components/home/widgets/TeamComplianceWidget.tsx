'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Users, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const TeamComplianceWidget = () => {
  const teamStats = {
    totalMembers: 8,
    submittedToday: 6,
    pendingToday: 2,
    weeklyCompliance: 92,
    trend: 'up' as const,
  };

  const teamMembers = [
    { id: '1', name: 'John Employee', status: 'submitted', avatar: '👨‍💻' },
    { id: '2', name: 'Jane Developer', status: 'submitted', avatar: '👩‍💻' },
    { id: '3', name: 'Mike Designer', status: 'pending', avatar: '🎨' },
    { id: '4', name: 'Sarah QA', status: 'submitted', avatar: '🔍' },
    { id: '5', name: 'Tom Backend', status: 'submitted', avatar: '⚙️' },
    { id: '6', name: 'Lisa Frontend', status: 'pending', avatar: '💅' },
    { id: '7', name: 'Alex DevOps', status: 'submitted', avatar: '🚀' },
    { id: '8', name: 'Emma PM', status: 'submitted', avatar: '📊' },
  ];

  const complianceRate = Math.round((teamStats.submittedToday / teamStats.totalMembers) * 100);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary-700" />
            <CardTitle>Team Compliance</CardTitle>
          </div>
          <Badge variant={complianceRate >= 80 ? 'success' : complianceRate >= 60 ? 'warning' : 'danger'}>
            {complianceRate}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{teamStats.submittedToday}</p>
            <p className="text-xs text-green-700">Submitted</p>
          </div>

          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{teamStats.pendingToday}</p>
            <p className="text-xs text-orange-700">Pending</p>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{teamStats.weeklyCompliance}%</p>
            <p className="text-xs text-blue-700">Weekly Avg</p>
          </div>
        </div>

        {/* Team Members List */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-neutral-700 mb-3">Today's Status</h4>
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{member.avatar}</span>
                <span className="text-sm font-medium text-neutral-900">{member.name}</span>
              </div>
              {member.status === 'submitted' ? (
                <Badge variant="success" size="sm">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Submitted
                </Badge>
              ) : (
                <Badge variant="warning" size="sm">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Pending
                </Badge>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
