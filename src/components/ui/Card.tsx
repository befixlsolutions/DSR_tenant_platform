'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, hover = false, padding = 'md', animate = true, className, ...props }, ref) => {
    const paddingStyles = {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-[var(--spacing-card)]',
      lg: 'p-6',
    };

    const Component = animate ? motion.div : 'div';
    const animationProps = animate
      ? {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3 },
        }
      : {};

    return (
      <Component
        ref={ref}
        className={clsx(
          'card',
          hover && 'card-hover cursor-pointer',
          paddingStyles[padding],
          className
        )}
        {...animationProps}
        {...(props as any)}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('mb-4', className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={clsx('text-base font-semibold text-neutral-900', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={clsx('text-xs text-neutral-600 mt-1', className)} {...props}>
    {children}
  </p>
);

export const CardContent = ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx(className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('mt-4 pt-4 border-t border-neutral-200', className)} {...props}>
    {children}
  </div>
);
