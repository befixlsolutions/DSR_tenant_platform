'use client';

import { motion } from 'framer-motion';

interface ActionItem {
  id: string;
  title: string;
  description?: string;
  badge?: {
    text: string;
    variant: 'success' | 'warning' | 'danger' | 'info';
  };
  action?: () => void;
  actionLabel?: string;
}

interface ActionPanelProps {
  title: string;
  items: ActionItem[];
  emptyMessage?: string;
  className?: string;
}

export const ActionPanel = ({
  title,
  items,
  emptyMessage = 'No actions needed',
  className = '',
}: ActionPanelProps) => {
  return (
    <div className={`card ${className}`}>
      <h3 className="text-base font-bold text-neutral-900 mb-4">{title}</h3>

      {items.length === 0 ? (
        <p className="text-sm text-neutral-500 text-center py-6">{emptyMessage}</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-3 bg-gradient-to-r from-white to-neutral-50 rounded-xl border border-neutral-200 hover:border-primary-200 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-sm font-semibold text-neutral-900 flex-1">{item.title}</p>
                {item.badge && (
                  <span className={`badge badge-${item.badge.variant} text-xs`}>
                    {item.badge.text}
                  </span>
                )}
              </div>
              {item.description && (
                <p className="text-xs text-neutral-600 mb-2">{item.description}</p>
              )}
              {item.action && (
                <button
                  onClick={item.action}
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700"
                >
                  {item.actionLabel || 'View'}
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
