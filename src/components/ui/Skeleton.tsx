'use client';

import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({
  className,
  variant = 'rectangular',
  width,
  height,
}: SkeletonProps) => {
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  };

  return (
    <div
      className={clsx('skeleton', variants[variant], className)}
      style={style}
    />
  );
};

export const SkeletonCard = () => (
  <div className="card animate-pulse">
    <div className="flex items-center space-x-4 mb-4">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
      </div>
    </div>
    <Skeleton variant="rectangular" height={100} className="mb-3" />
    <div className="space-y-2">
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-5/6" />
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="text" className="flex-1" />
        <Skeleton variant="text" className="w-24" />
        <Skeleton variant="text" className="w-16" />
      </div>
    ))}
  </div>
);
