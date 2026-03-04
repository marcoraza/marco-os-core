import React from 'react';
import { cn } from '../../utils/cn';

interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  error?: string;
}

export function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 3,
  required,
  error,
}: FormTextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-[8px] font-bold uppercase tracking-widest text-text-secondary">
        {label}{required && <span className="text-accent-red ml-0.5">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        aria-required={required ? 'true' : undefined}
        aria-invalid={error ? 'true' : undefined}
        className={cn(
          'bg-bg-base border border-border-panel rounded-sm px-3 py-2 text-sm text-text-primary',
          'focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 focus:outline-none',
          'focus-visible:ring-2 focus-visible:ring-brand-mint/50 focus-visible:outline-none',
          'w-full transition-colors resize-none',
          'placeholder:text-text-secondary/50',
          error && 'border-accent-red/50',
        )}
      />
      {error && <span className="text-[8px] text-accent-red mt-0.5">{error}</span>}
    </div>
  );
}
