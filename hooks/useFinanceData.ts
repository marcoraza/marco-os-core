// hooks/useFinanceData.ts
import { useMemo } from 'react';
import { useNotionData } from '../contexts/NotionDataContext';

// Safe extractor for raw JSON format: {_meta, items}
function extractItems<T>(raw: unknown): T[] {
  if (!raw) return [];
  if (Array.isArray(raw) && raw.length > 0 && (raw[0] as Record<string, unknown>)?._meta) {
    return ((raw[0] as Record<string, unknown>).items ?? []) as T[];
  }
  return Array.isArray(raw) ? (raw as T[]) : [];
}

interface RawFinancaItem {
  Titulo?: string;
  Valor?: number;
  Tipo?: string;
  Categoria?: string;
  Data?: string;
  Recorrente?: boolean;
  // typed interface fields (lowercase)
  title?: string;
  valor?: number;
  tipo?: string;
  categoria?: string;
  data?: string;
  recorrente?: boolean;
}

export interface FinancaMetrics {
  totalEntradas: number;
  totalSaidas: number;
  saldo: number;
  porCategoria: Record<string, number>;
  isLoading: boolean;
  isEmpty: boolean;
}

export function useFinanceData(): FinancaMetrics {
  const { financas } = useNotionData();

  const items = useMemo(
    () => extractItems<RawFinancaItem>(financas.items),
    [financas.items]
  );

  return useMemo(() => {
    const totalEntradas = items
      .filter(i => (i.Tipo ?? i.tipo) === 'Entrada')
      .reduce((sum, i) => sum + ((i.Valor ?? i.valor) || 0), 0);

    const totalSaidas = items
      .filter(i => (i.Tipo ?? i.tipo) === 'Saida')
      .reduce((sum, i) => sum + ((i.Valor ?? i.valor) || 0), 0);

    const saldo = totalEntradas - totalSaidas;

    const porCategoria: Record<string, number> = {};
    for (const item of items) {
      const cat = (item.Categoria ?? item.categoria) || 'Outros';
      const val = (item.Valor ?? item.valor) || 0;
      porCategoria[cat] = (porCategoria[cat] ?? 0) + val;
    }

    return {
      totalEntradas,
      totalSaidas,
      saldo,
      porCategoria,
      isLoading: financas.isLoading,
      isEmpty: items.length === 0,
    };
  }, [items, financas.isLoading]);
}
