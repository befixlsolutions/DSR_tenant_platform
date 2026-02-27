'use client';

import { ReactNode } from 'react';
import { HelpCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  scopeOptions?: { label: string; value: string }[];
  selectedScope?: string;
  onScopeChange?: (scope: string) => void;
  dateRangeOptions?: { label: string; value: string }[];
  selectedDateRange?: string;
  onDateRangeChange?: (range: string) => void;
  onExport?: () => void;
  onHelp?: () => void;
  showExport?: boolean;
  showHelp?: boolean;
  actions?: ReactNode;
}

export const PageHeader = ({
  title,
  subtitle,
  scopeOptions,
  selectedScope,
  onScopeChange,
  dateRangeOptions = [
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'week' },
    { label: 'Last 7 Days', value: '7days' },
    { label: 'This Month', value: 'month' },
    { label: 'Custom', value: 'custom' },
  ],
  selectedDateRange = '7days',
  onDateRangeChange,
  onExport,
  onHelp,
  showExport = true,
  showHelp = true,
  actions,
}: PageHeaderProps) => {
  return (
    <div className="flex items-start justify-between mb-6">
      {/* Left: Title & Subtitle */}
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">{title}</h1>
        {subtitle && (
          <p className="text-sm text-neutral-500 mt-1">{subtitle}</p>
        )}
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-3">
        {/* Scope Switcher */}
        {scopeOptions && scopeOptions.length > 0 && (
          <select
            value={selectedScope}
            onChange={(e) => onScopeChange?.(e.target.value)}
            className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            {scopeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {/* Date Range */}
        <select
          value={selectedDateRange}
          onChange={(e) => onDateRangeChange?.(e.target.value)}
          className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          {dateRangeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Export Button */}
        {showExport && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onExport}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export
          </Button>
        )}

        {/* Help Button */}
        {showHelp && (
          <button
            onClick={onHelp}
            className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
            title="Help & Definitions"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        )}

        {/* Custom Actions */}
        {actions}
      </div>
    </div>
  );
};
