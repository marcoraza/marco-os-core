import React, { useState, useEffect } from 'react';

interface DataBadgeProps {
  /** true = real Supabase data, false = mock/seed data */
  isReal: boolean;
  /** ISO timestamp of last successful sync */
  lastSync?: string | null;
  className?: string;
}

/**
 * DataBadge — shows "Dados de exemplo" when mock, "Sincronizado há Xmin" when real.
 * Render near section headers to communicate data freshness.
 */
export function DataBadge({ isReal, lastSync, className = '' }: DataBadgeProps) {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => forceUpdate(n => n + 1), 30_000);
    return () => clearInterval(interval);
  }, []);

  if (!isReal) {
    return (
      <span
        className={[
          'inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm',
          'text-[8px] font-mono leading-none',
          'bg-accent-orange/10 border border-accent-orange/30 text-accent-orange',
          className,
        ].join(' ')}
        title="Exibindo dados de exemplo — conecte suas fontes de dados"
      >
        Dados de exemplo
      </span>
    );
  }

  if (!lastSync) {
    return (
      <span className={`text-[8px] font-mono text-accent-orange ${className}`}>
        Sem dados
      </span>
    );
  }

  const diff = Date.now() - new Date(lastSync).getTime();
  const minutes = Math.floor(diff / 60_000);

  let label: string;
  let stale = false;

  if (minutes < 1) {
    label = 'agora mesmo';
  } else if (minutes < 60) {
    label = `ha ${minutes}min`;
    stale = minutes > 30;
  } else if (minutes < 1440) {
    const hours = Math.floor(minutes / 60);
    label = `ha ${hours}h`;
    stale = hours > 1;
  } else {
    const days = Math.floor(minutes / 1440);
    label = `ha ${days}d`;
    stale = true;
  }

  return (
    <span
      className={`text-[8px] font-mono ${stale ? 'text-accent-orange' : 'text-text-secondary'} ${className}`}
      title={lastSync ?? 'Nunca sincronizado'}
    >
      Sincronizado {label}
    </span>
  );
}
