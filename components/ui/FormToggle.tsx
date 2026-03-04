import React from 'react';
import { cn } from '../../utils/cn';

interface FormToggleProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function FormToggle({ label, name, checked, onChange }: FormToggleProps) {
  return (
    <div className="flex items-center justify-between min-h-[44px]">
      <label htmlFor={name} className="text-[8px] font-bold uppercase tracking-widest text-text-secondary cursor-pointer select-none">
        {label}
      </label>
      <button
        type="button"
        id={name}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative w-9 h-5 rounded-full transition-colors duration-200',
          'focus-visible:ring-2 focus-visible:ring-brand-mint/50 focus-visible:outline-none',
          checked ? 'bg-brand-mint' : 'bg-border-panel',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 size-4 rounded-full bg-bg-base shadow-sm transition-transform duration-200',
            checked ? 'translate-x-[18px]' : 'translate-x-0.5',
          )}
        />
      </button>
    </div>
  );
}
