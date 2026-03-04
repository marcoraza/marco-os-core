import React from 'react';
import { cn } from '../../utils/cn';

interface FormInputProps {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'date' | 'email';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  error,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-[8px] font-bold uppercase tracking-widest text-text-secondary">
        {label}{required && <span className="text-accent-red ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={cn(
          'bg-bg-base border border-border-panel rounded-sm px-3 py-2 text-sm text-text-primary',
          'focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 focus:outline-none',
          'focus-visible:ring-2 focus-visible:ring-brand-mint/50 focus-visible:outline-none',
          'min-h-[44px] w-full transition-colors',
          'placeholder:text-text-secondary/50',
          error && 'border-accent-red/50',
        )}
      />
      {error && <span className="text-[8px] text-accent-red mt-0.5">{error}</span>}
    </div>
  );
}
