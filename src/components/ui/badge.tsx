import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'genre' | 'rating' | 'stock' | 'outline';
}

export function Badge({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-stone-100 text-stone-700 border-stone-200',
    genre: 'bg-brand-50 text-brand-700 border-brand-200 font-medium',
    rating: 'bg-amber-50 text-amber-800 border-amber-200 font-semibold',
    stock: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    outline: 'border-stone-300 text-stone-600 bg-transparent',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs border tracking-tight',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
