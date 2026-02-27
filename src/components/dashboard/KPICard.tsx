'use client';

import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface KPICardProps {
  label: string;
  value: string | number;
  delta?: {
    value: string;
    trend: 'up' | 'down';
    isPositive?: boolean;
  };
  icon?: ReactNode;
  sparklineData?: number[];
  onClick?: () => void;
}

export const KPICard = ({
  label,
  value,
  delta,
  icon,
  sparklineData,
  onClick,
}: KPICardProps) => {
  const hasClick = !!onClick;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hasClick ? { y: -3 } : { y: -2 }}
      className={`relative overflow-hidden group p-5 rounded-2xl border border-neutral-200 bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-300 ${hasClick ? 'cursor-pointer hover:border-primary-200 hover:shadow-lg' : 'hover:border-neutral-300'}`}
      onClick={onClick}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 to-cyan-500 opacity-80" />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{label}</p>
            <h3 className="text-3xl font-bold text-neutral-900 tracking-tight">{value}</h3>
          </div>
          {icon && (
            <div className="p-2.5 bg-primary-50 border border-primary-100 rounded-xl text-primary-600">
              {icon}
            </div>
          )}
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div className="flex-1">
            {delta && (
              <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold ${delta.isPositive !== false
                ? delta.trend === 'up' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                : delta.trend === 'up' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'
                }`}>
                {delta.trend === 'up' ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{delta.value}</span>
              </div>
            )}
          </div>

          {sparklineData && sparklineData.length > 0 && (
            <div className="w-20 h-10 -mb-1 opacity-70 group-hover:opacity-100 transition-opacity">
              <Sparkline data={sparklineData} trend={delta?.trend} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Sparkline = ({ data, trend }: { data: number[]; trend?: 'up' | 'down' }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 90 - ((value - min) / range) * 80;
    return `${x},${y}`;
  }).join(' ');

  const strokeColor = trend === 'down' ? '#ef4444' : '#6366f1';

  return (
    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M 0 100 L ${points} L 100 100 Z`} fill="url(#gradient)" />
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
