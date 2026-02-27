'use client';

import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface FocusItem {
  id: string;
  text: string;
  severity?: 'info' | 'warning' | 'danger';
}

interface TodayFocusStripProps {
  items: FocusItem[];
  onAction?: () => void;
  actionLabel?: string;
}

export const TodayFocusStrip = ({
  items,
  onAction,
  actionLabel = 'Take Action',
}: TodayFocusStripProps) => {
  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-amber-50 border border-amber-200 rounded-xl p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3 flex-1">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-amber-900 mb-1">Needs Attention Today</h3>
            <div className="space-y-1">
              {items.map((item) => (
                <p key={item.id} className="text-sm text-amber-700">
                  • {item.text}
                </p>
              ))}
            </div>
          </div>
        </div>
        {onAction && (
          <button
            onClick={onAction}
            className="btn btn-primary flex-shrink-0"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </motion.div>
  );
};
