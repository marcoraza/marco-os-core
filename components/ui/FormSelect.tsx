import React from 'react';
import { cn } from '../../utils/cn';

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
  error?: string;
}

export function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  required,
  error,
}: FormSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-[8px] font-bold uppercase tracking-widest text-text-secondary">
        {label}{required && <span className="text-accent-red ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          aria-required={required ? 'true' : undefined}
          aria-invalid={error ? 'true' : undefined}
          className={cn(
            'appearance-none bg-bg-base border border-border-panel rounded-sm px-3 py-2 text-sm text-text-primary',
            'focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 focus:outline-none',
            'focus-visible:ring-2 focus-visible:ring-brand-mint/50 focus-visible:outline-none',
            'min-h-[44px] w-full transition-colors pr-8 cursor-pointer',
            error && 'border-accent-red/50',
          )}
        >
          <option value="" className="text-text-secondary bg-surface">Selecionar...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-surface text-text-primary">
              {opt.label}
            </option>
          ))}
        </select>
        {/* Chevron icon */}
        <span
          className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
          style={{ fontSize: '16px' }}
        >
          expand_more
        </span>
      </div>
      {error && <span className="text-[8px] text-accent-red mt-0.5">{error}</span>}
    </div>
  );
}
