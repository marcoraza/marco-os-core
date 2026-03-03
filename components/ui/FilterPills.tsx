import React from 'react';
import { cn } from '@/utils/cn';

interface FilterPillsProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FilterPills({ options, value, onChange, className }: FilterPillsProps) {
  return (
    <div className={cn('flex flex-wrap gap-1', className)}>
      {options.map(option => {
        const isActive = option === value;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            aria-pressed={isActive}
            className={cn(
              'text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm border transition-all min-h-[44px]',
              'focus-visible:ring-2 focus-visible:ring-brand-mint/50 focus-visible:outline-none',
              isActive
                ? 'bg-brand-mint/10 border-brand-mint/30 text-brand-mint'
                : 'bg-surface border-border-panel text-text-secondary hover:text-text-primary'
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
