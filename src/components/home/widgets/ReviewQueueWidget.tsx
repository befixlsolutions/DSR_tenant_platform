'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Clock, FileText, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const ReviewQueueWidget = () => {
  const pendingReviews = [
    { id: '1', employee: 'John Employee', type: 'DSR', dueIn: '2h', priority: 'high' },
    { id: '2', employee: 'Jane Developer', type: 'WSR', dueIn: '4h', priority: 'medium' },
    { id: '3', employee: 'Mike Designer', type: 'DSR', dueIn: '6h', priority: 'low' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      default: return 'info';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-orange-600" />
            <CardTitle>Review Queue</CardTitle>
          </div>
          <Badge variant="warning">{pendingReviews.length}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {pendingReviews.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm font-medium text-neutral-900 mb-1">All Caught Up!</p>
            <p className="text-xs text-neutral-600">No pending reviews</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/reviews/${review.id}`}>
                  <div className="p-3 rounded-lg border border-neutral-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-neutral-900">
                          {review.employee}
                        </h4>
                        <p className="text-xs text-neutral-600">{review.type}</p>
                      </div>
                      <Badge variant={getPriorityColor(review.priority)} size="sm">
                        {review.priority}
                      </Badge>
                    </div>

                    <div className="flex items-center text-xs text-neutral-500">
                      <Clock className="w-3 h-3 mr-1" />
                      Due in {review.dueIn}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            <Link href="/reviews/weekly">
              <Button variant="primary" size="sm" className="w-full mt-4">
                Review All
              </Button>
            </Link>
          </div>
        )}

        {/* SLA Stats */}
        <div className="mt-4 pt-4 border-t border-neutral-200">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-600">SLA Compliance</span>
            <span className="font-semibold text-green-600">98%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
