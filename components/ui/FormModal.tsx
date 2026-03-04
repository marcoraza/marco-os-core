import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { FormTextarea } from './FormTextarea';
import { FormToggle } from './FormToggle';

export interface FieldDef {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'textarea' | 'toggle';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  defaultValue?: string | number | boolean;
}

export interface FormModalProps {
  title: string;
  fields: FieldDef[];
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
}

function buildInitialState(fields: FieldDef[]): Record<string, unknown> {
  const state: Record<string, unknown> = {};
  for (const f of fields) {
    if (f.defaultValue !== undefined) {
      state[f.name] = f.defaultValue;
    } else if (f.type === 'toggle') {
      state[f.name] = false;
    } else if (f.type === 'number') {
      state[f.name] = '';
    } else {
      state[f.name] = '';
    }
  }
  return state;
}

export function FormModal({ title, fields, onSubmit, onClose, isOpen }: FormModalProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>(() => buildInitialState(fields));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const firstInputRef = useRef<HTMLDivElement>(null);

  // Reset form when opened
  useEffect(() => {
    if (isOpen) {
      setFormData(buildInitialState(fields));
      setErrors({});
      setIsLoading(false);
    }
  }, [isOpen, fields]);

  // Focus first input when opened
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      const first = firstInputRef.current.querySelector('input, select, textarea') as HTMLElement | null;
      first?.focus();
    }
  }, [isOpen]);

  // ESC closes
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleChange = useCallback((name: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    for (const f of fields) {
      if (f.required) {
        const val = formData[f.name];
        if (val === undefined || val === null || val === '') {
          newErrors[f.name] = 'Campo obrigatório';
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [fields, formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch {
      // error handling done by caller
    } finally {
      setIsLoading(false);
    }
  }, [formData, onSubmit, onClose, validate]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            key="modal-card"
            className="bg-surface border border-border-panel rounded-sm w-full sm:w-[480px] mx-4 sm:mx-0 p-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-text-primary">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  'flex items-center justify-center w-7 h-7 rounded-sm text-text-secondary',
                  'hover:text-text-primary hover:bg-surface-hover transition-colors',
                  'focus-visible:ring-2 focus-visible:ring-brand-mint/50 focus-visible:outline-none',
                )}
                aria-label="Fechar"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>close</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-3" ref={firstInputRef}>
                {fields.map((field) => {
                  if (field.type === 'toggle') {
                    return (
                      <FormToggle
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        checked={Boolean(formData[field.name])}
                        onChange={(val) => handleChange(field.name, val)}
                      />
                    );
                  }

                  if (field.type === 'select') {
                    return (
                      <FormSelect
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={String(formData[field.name] ?? '')}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        options={field.options ?? []}
                        required={field.required}
                        error={errors[field.name]}
                      />
                    );
                  }

                  if (field.type === 'textarea') {
                    return (
                      <FormTextarea
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={String(formData[field.name] ?? '')}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        required={field.required}
                        error={errors[field.name]}
                      />
                    );
                  }

                  // text | number | date
                  return (
                    <FormInput
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      type={field.type as 'text' | 'number' | 'date'}
                      value={String(formData[field.name] ?? '')}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                      error={errors[field.name]}
                    />
                  );
                })}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-border-panel">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className={cn(
                    'px-3 py-2 min-h-[44px] rounded-sm text-[9px] font-bold uppercase tracking-widest',
                    'bg-bg-base border border-border-panel text-text-secondary',
                    'hover:text-text-primary hover:border-text-secondary/30 transition-colors',
                    'focus-visible:ring-2 focus-visible:ring-brand-mint/50 focus-visible:outline-none',
                    'disabled:opacity-50',
                  )}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    'px-3 py-2 min-h-[44px] rounded-sm text-[9px] font-bold uppercase tracking-widest',
                    'bg-brand-mint/10 border border-brand-mint/30 text-brand-mint',
                    'hover:bg-brand-mint/20 transition-colors',
                    'focus-visible:ring-2 focus-visible:ring-brand-mint/50 focus-visible:outline-none',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                  )}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-1.5">
                      <span className="animate-pulse font-mono">Salvando...</span>
                    </span>
                  ) : 'Salvar'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
