// contexts/NotionDataContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import type {
  DataProvider,
  ResearchItem,
  DeepDiveItem,
  CriadorItem,
  ProjetoItem,
  ChecklistItem,
  ReuniaoItem,
  PessoaItem,
  ContentItem,
  BrainDumpItem,
  FinancaItem,
  SaudeItem,
  SkillItem,
  DecisionItem,
  CalendarEvent,
  GitHubRepo,
} from "../lib/dataProvider";

// ─── DB name → JSON filename mapping ────────────────────────────────────────

const DB_FILES = [
  "research",
  "deep_dives",
  "criadores",
  "projetos",
  "checklist",
  "reunioes",
  "pessoas",
  "content",
  "brain_dump",
  "financas",
  "saude",
  "skills",
  "decisions",
  "calendar",
  "github",
] as const;

type DBName = (typeof DB_FILES)[number];

// Maps DB key → actual JSON filename (hyphens/plurals differ from key names)
const DB_FILENAME: Record<DBName, string> = {
  research: "research",
  deep_dives: "deep-dives",
  criadores: "criadores",
  projetos: "projetos",
  checklist: "checklists",
  reunioes: "reunioes",
  pessoas: "pessoas",
  content: "content",
  brain_dump: "brain-dump",
  financas: "financas",
  saude: "saude",
  skills: "skills",
  decisions: "decisions",
  calendar: "calendar",
  github: "github",
};

// ─── Context shape ───────────────────────────────────────────────────────────

interface NotionDataContextValue {
  research: DataProvider<ResearchItem>;
  deep_dives: DataProvider<DeepDiveItem>;
  criadores: DataProvider<CriadorItem>;
  projetos: DataProvider<ProjetoItem>;
  checklist: DataProvider<ChecklistItem>;
  reunioes: DataProvider<ReuniaoItem>;
  pessoas: DataProvider<PessoaItem>;
  content: DataProvider<ContentItem>;
  brain_dump: DataProvider<BrainDumpItem>;
  financas: DataProvider<FinancaItem>;
  saude: DataProvider<SaudeItem>;
  skills: DataProvider<SkillItem>;
  decisions: DataProvider<DecisionItem>;
  calendar: DataProvider<CalendarEvent>;
  github: DataProvider<GitHubRepo>;
  isLoading: boolean;
  lastSync: string | null;
  error: string | null;
  refetch: () => Promise<void>;
}

// ─── Cache ───────────────────────────────────────────────────────────────────

type CacheEntry = { data: unknown[]; fetchedAt: number };
type Cache = Map<DBName, CacheEntry>;
type ErrorMap = Map<DBName, string | null>;

// ─── Context ─────────────────────────────────────────────────────────────────

const NotionDataContext = createContext<NotionDataContextValue | null>(null);

// ─── Helpers ─────────────────────────────────────────────────────────────────

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function buildProvider<T>(
  name: DBName,
  cache: Cache,
  errors: ErrorMap,
  isLoading: boolean,
  lastSync: string | null,
  refetch: () => Promise<void>
): DataProvider<T> {
  return {
    items: (cache.get(name)?.data ?? []) as T[],
    isLoading,
    lastSync,
    error: errors.get(name) ?? null,
    refetch,
  };
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function NotionDataProvider({ children }: { children: ReactNode }) {
  const cacheRef = useRef<Cache>(new Map());
  const errorsRef = useRef<ErrorMap>(new Map());
  const [tick, setTick] = useState(0); // bump to trigger re-render after fetch
  const [isLoading, setIsLoading] = useState(true);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fetchingRef = useRef(false);

  const fetchAll = useCallback(async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    let anyError: string | null = null;

    for (let i = 0; i < DB_FILES.length; i++) {
      const name = DB_FILES[i];
      try {
        const base = import.meta.env.BASE_URL ?? '/';
        const filename = DB_FILENAME[name];
        const res = await fetch(`${base}data/${filename}.json`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: unknown[] = await res.json();
        cacheRef.current.set(name, { data, fetchedAt: Date.now() });
        errorsRef.current.set(name, null); // clear per-DB error on success
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        errorsRef.current.set(name, msg);
        anyError = msg;
        // keep previous cache entry — no update needed, it stays
      }
      if (i < DB_FILES.length - 1) await sleep(100);
    }

    setError(anyError);
    setLastSync(new Date().toISOString());
    setIsLoading(false);
    setTick((t) => t + 1);
    fetchingRef.current = false;
  }, []);

  // Single interval — 30s polling
  useEffect(() => {
    fetchAll();
    const id = setInterval(fetchAll, 30_000);
    return () => clearInterval(id);
  }, [fetchAll]);

  const refetch = useCallback(async () => {
    await fetchAll();
  }, [fetchAll]);

  // Rebuild context value on every tick
  const cache = cacheRef.current;
  const errors = errorsRef.current;
  const sharedArgs = [errors, isLoading, lastSync, refetch] as const;

  const value: NotionDataContextValue = {
    research: buildProvider<ResearchItem>("research", cache, ...sharedArgs),
    deep_dives: buildProvider<DeepDiveItem>("deep_dives", cache, ...sharedArgs),
    criadores: buildProvider<CriadorItem>("criadores", cache, ...sharedArgs),
    projetos: buildProvider<ProjetoItem>("projetos", cache, ...sharedArgs),
    checklist: buildProvider<ChecklistItem>("checklist", cache, ...sharedArgs),
    reunioes: buildProvider<ReuniaoItem>("reunioes", cache, ...sharedArgs),
    pessoas: buildProvider<PessoaItem>("pessoas", cache, ...sharedArgs),
    content: buildProvider<ContentItem>("content", cache, ...sharedArgs),
    brain_dump: buildProvider<BrainDumpItem>("brain_dump", cache, ...sharedArgs),
    financas: buildProvider<FinancaItem>("financas", cache, ...sharedArgs),
    saude: buildProvider<SaudeItem>("saude", cache, ...sharedArgs),
    skills: buildProvider<SkillItem>("skills", cache, ...sharedArgs),
    decisions: buildProvider<DecisionItem>("decisions", cache, ...sharedArgs),
    calendar: buildProvider<CalendarEvent>("calendar", cache, ...sharedArgs),
    github: buildProvider<GitHubRepo>("github", cache, ...sharedArgs),
    isLoading,
    lastSync,
    error,
    refetch,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  void tick; // consumed to trigger re-render

  return (
    <NotionDataContext.Provider value={value}>
      {children}
    </NotionDataContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useNotionData(): NotionDataContextValue {
  const ctx = useContext(NotionDataContext);
  if (!ctx) {
    throw new Error("useNotionData must be used inside <NotionDataProvider>");
  }
  return ctx;
}
