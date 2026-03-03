// components/dashboard/MissionControlBar.tsx
import React, { useMemo } from 'react';
import { MetricBar } from '@/components/ui/MetricBar';
import { useNotionData } from '@/contexts/NotionDataContext';
import { useFinanceData } from '@/hooks/useFinanceData';
import { formatRelative } from '@/utils/dateUtils';

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

export function MissionControlBar() {
  const { reunioes, projetos, saude } = useNotionData();
  const finance = useFinanceData();

  const reunioesItems = useMemo(
    () => extractItems<Record<string, unknown>>(reunioes.items),
    [reunioes.items]
  );
  const projetosItems = useMemo(
    () => extractItems<Record<string, unknown>>(projetos.items),
    [projetos.items]
  );
  const saudeItems = useMemo(
    () => extractItems<Record<string, unknown>>(saude.items),
    [saude.items]
  );

  // Reuniões hoje
  const today = todayKey();
  const reunioesHoje = reunioesItems.filter(r => {
    const d = (r['Data'] ?? r['data']) as string | undefined;
    return d?.slice(0, 10) === today;
  }).length;

  // Projetos ativos (not Pausado, not Concluído)
  const projetosAtivos = projetosItems.filter(p => {
    const status = (p['Status'] ?? p['status']) as string | undefined;
    return status && status !== 'Pausado' && status !== 'Concluído' && status !== 'Concluido';
  }).length;

  // Saldo
  const saldoValue = finance.isLoading ? '...' : `R$ ${Math.abs(finance.saldo).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  const saldoColor = finance.isLoading ? undefined : (finance.saldo >= 0 ? 'text-brand-mint' : 'text-accent-red');

  // Último treino
  const treinos = saudeItems
    .filter(s => (s['Tipo'] ?? s['tipo']) === 'Treino')
    .sort((a, b) => {
      const da = new Date((a['Data'] ?? a['data']) as string).getTime();
      const db = new Date((b['Data'] ?? b['data']) as string).getTime();
      return db - da;
    });
  const ultimoTreino = treinos.length > 0
    ? formatRelative((treinos[0]['Data'] ?? treinos[0]['data']) as string)
    : 'Sem dados';

  const metrics = [
    {
      label: 'reuniões hoje',
      value: reunioes.isLoading ? '...' : reunioesHoje.toString(),
      icon: 'event',
      color: reunioesHoje > 0 ? 'text-accent-blue' : undefined,
    },
    {
      label: 'projetos ativos',
      value: projetos.isLoading ? '...' : projetosAtivos.toString(),
      icon: 'rocket_launch',
    },
    {
      label: 'saldo',
      value: saldoValue,
      icon: 'account_balance_wallet',
      color: saldoColor,
    },
    {
      label: 'último treino',
      value: saude.isLoading ? '...' : ultimoTreino,
      icon: 'fitness_center',
    },
  ];

  return <MetricBar metrics={metrics} />;
}

export default MissionControlBar;
