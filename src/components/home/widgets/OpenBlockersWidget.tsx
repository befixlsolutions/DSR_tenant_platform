'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/providers/AuthProvider';
import { getOpenBlockers } from '@/lib/mock-data/blockers';
import { AlertTriangle, Clock, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const OpenBlockersWidget = () => {
  const { user } = useAuth();
  const openBlockers = user ? getOpenBlockers(user.id) : [];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'S0': return 'danger';
      case 'S1': return 'danger';
      case 'S2': return 'warning';
      case 'S3': return 'info';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-600 bg-red-100';
      case 'in_progress': return 'text-orange-600 bg-orange-100';
      case 'escalated': return 'text-purple-600 bg-purple-100';
      default: return 'text-neutral-600 bg-neutral-100';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <CardTitle>Open Blockers</CardTitle>
          </div>
          {openBlockers.length > 0 && (
            <Badge variant="danger">{openBlockers.length}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {openBlockers.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm font-medium text-neutral-900 mb-1">No Active Blockers</p>
            <p className="text-xs text-neutral-600">You're all clear! 🎉</p>
          </div>
        ) : (
          <div className="space-y-3">
            {openBlockers.slice(0, 3).map((blocker, index) => (
              <motion.div
                key={blocker.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/blockers/${blocker.id}`}>
                  <div className="p-3 rounded-lg border border-neutral-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant={getSeverityColor(blocker.severity)} size="sm">
                            {blocker.severity}
                          </Badge>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(blocker.status)}`}>
                            {blocker.status.replace('_', ' ')}
                          </span>
                        </div>
                        <h4 className="text-sm font-medium text-neutral-900 line-clamp-1">
                          {blocker.title}
                        </h4>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-600 line-clamp-2 mb-2">
                      {blocker.impact}
                    </p>

                    {blocker.eta && (
                      <div className="flex items-center text-xs text-neutral-500">
                        <Clock className="w-3 h-3 mr-1" />
                        ETA: {new Date(blocker.eta).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}

            {openBlockers.length > 3 && (
              <Link href="/blockers/my">
                <Button variant="ghost" size="sm" className="w-full">
                  View {openBlockers.length - 3} More
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        )}

        {/* Quick Action */}
        <div className="mt-4 pt-4 border-t border-neutral-200">
          <Link href="/blockers/my">
            <Button variant="outline" size="sm" className="w-full">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Manage Blockers
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
