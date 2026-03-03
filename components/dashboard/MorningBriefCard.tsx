// components/dashboard/MorningBriefCard.tsx
import React, { useState, useMemo } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Icon } from '@/components/ui/Icon';
import { useNotionData } from '@/contexts/NotionDataContext';
import { useFinanceData } from '@/hooks/useFinanceData';
import { cn } from '@/utils/cn';

// Safe extractor for raw JSON format: {_meta, items}
function extractItems<T>(raw: unknown): T[] {
  if (!raw) return [];
  if (Array.isArray(raw) && raw.length > 0 && (raw[0] as Record<string, unknown>)?._meta) {
    return ((raw[0] as Record<string, unknown>).items ?? []) as T[];
  }
  return Array.isArray(raw) ? (raw as T[]) : [];
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function formatTime(): string {
  return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export function MorningBriefCard() {
  const [expanded, setExpanded] = useState(false);
  const { reunioes, projetos } = useNotionData();
  const finance = useFinanceData();

  const reunioesItems = useMemo(
    () => extractItems<Record<string, unknown>>(reunioes.items),
    [reunioes.items]
  );
  const projetosItems = useMemo(
    () => extractItems<Record<string, unknown>>(projetos.items),
    [projetos.items]
  );

  const today = todayKey();

  const reunioesHoje = reunioesItems.filter(r => {
    const d = (r['Data'] ?? r['data']) as string | undefined;
    return d?.slice(0, 10) === today;
  });

  const projetosAtivos = projetosItems.filter(p => {
    const status = (p['Status'] ?? p['status']) as string | undefined;
    return status && status !== 'Pausado' && status !== 'Concluído' && status !== 'Concluido';
  });

  const summaryText = useMemo(() => {
    const parts: string[] = [];
    if (reunioesHoje.length > 0) {
      parts.push(`${reunioesHoje.length} reunião(ões) hoje`);
    }
    if (projetosAtivos.length > 0) {
      parts.push(`${projetosAtivos.length} projeto(s) ativo(s)`);
    }
    if (!finance.isLoading) {
      const sign = finance.saldo >= 0 ? '+' : '-';
      parts.push(`saldo ${sign}R$ ${Math.abs(finance.saldo).toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`);
    }
    return parts.length > 0 ? parts.join(' · ') : 'Sem eventos para hoje';
  }, [reunioesHoje, projetosAtivos, finance]);

  return (
    <div className="bg-surface border border-brand-mint/20 rounded-sm mx-4 mb-3">
      {/* Header */}
      <button
        className={cn(
          'w-full flex items-center justify-between px-3 py-2',
          'focus-visible:ring-2 focus-visible:ring-brand-mint/50 focus-visible:outline-none',
          'min-h-[44px]'
        )}
        onClick={() => setExpanded(v => !v)}
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-2">
          <SectionLabel>MORNING BRIEF</SectionLabel>
          <span className="text-[8px] font-mono text-text-secondary">{formatTime()}</span>
        </div>
        <Icon
          name={expanded ? 'expand_less' : 'expand_more'}
          size="sm"
          className="text-text-secondary"
        />
      </button>

      {/* Collapsed summary */}
      {!expanded && (
        <div className="px-3 pb-2">
          <p className="text-xs text-text-secondary truncate">{summaryText}</p>
        </div>
      )}

      {/* Expanded content */}
      {expanded && (
        <div className="px-3 pb-3 flex flex-col gap-2">
          {/* Calendar events */}
          {reunioesHoje.length > 0 && (
            <div>
              <span className="text-[8px] font-bold uppercase tracking-widest text-text-secondary block mb-1">
                Reuniões
              </span>
              <ul className="flex flex-col gap-1">
                {reunioesHoje.map((r, i) => {
                  const name = (r['Name'] ?? r['title'] ?? r['Titulo'] ?? 'Reunião') as string;
                  const hora = (r['Data'] ?? r['data']) as string | undefined;
                  const time = hora && hora.includes('T')
                    ? new Date(hora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                    : '';
                  return (
                    <li key={i} className="flex items-center gap-2 text-xs text-text-primary">
                      <Icon name="fiber_manual_record" size="xs" className="text-accent-blue" />
                      <span>{name}{time ? ` — ${time}` : ''}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {reunioesHoje.length === 0 && (
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <Icon name="fiber_manual_record" size="xs" className="text-text-secondary opacity-40" />
              <span>Nenhuma reunião hoje</span>
            </div>
          )}

          {/* Active projects */}
          {projetosAtivos.length > 0 && (
            <div>
              <span className="text-[8px] font-bold uppercase tracking-widest text-text-secondary block mb-1">
                Projetos Ativos
              </span>
              <ul className="flex flex-col gap-1">
                {projetosAtivos.slice(0, 3).map((p, i) => {
                  const name = (p['Name'] ?? p['title'] ?? p['Titulo'] ?? 'Projeto') as string;
                  const status = (p['Status'] ?? p['status']) as string | undefined;
                  return (
                    <li key={i} className="flex items-center gap-2 text-xs text-text-primary">
                      <Icon name="fiber_manual_record" size="xs" className="text-brand-mint" />
                      <span>{name}{status ? ` · ${status}` : ''}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Financial summary */}
          {!finance.isLoading && (
            <div>
              <span className="text-[8px] font-bold uppercase tracking-widest text-text-secondary block mb-1">
                Finanças
              </span>
              <ul className="flex flex-col gap-1">
                <li className="flex items-center gap-2 text-xs">
                  <Icon name="fiber_manual_record" size="xs" className="text-brand-mint" />
                  <span className="text-text-secondary">Entradas:</span>
                  <span className="font-mono text-brand-mint">
                    R$ {finance.totalEntradas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </li>
                <li className="flex items-center gap-2 text-xs">
                  <Icon name="fiber_manual_record" size="xs" className="text-accent-red" />
                  <span className="text-text-secondary">Saídas:</span>
                  <span className="font-mono text-accent-red">
                    R$ {finance.totalSaidas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </li>
                <li className="flex items-center gap-2 text-xs">
                  <Icon name="fiber_manual_record" size="xs" className={finance.saldo >= 0 ? 'text-brand-mint' : 'text-accent-red'} />
                  <span className="text-text-secondary">Saldo:</span>
                  <span className={cn('font-mono font-bold', finance.saldo >= 0 ? 'text-brand-mint' : 'text-accent-red')}>
                    {finance.saldo >= 0 ? '+' : '-'}R$ {Math.abs(finance.saldo).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MorningBriefCard;
