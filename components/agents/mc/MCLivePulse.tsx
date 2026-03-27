/**
 * MCLivePulse — "What's happening NOW" live pulse view.
 * Compact, glanceable agent status rows with session info and task counts.
 * Replaces Standup as the default tab in Mission Control.
 */
import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../ui/Icon';
import { useMissionControlStore, type MCAgent } from '../../../store/missionControl';

// ── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_DOT_COLOR: Record<MCAgent['status'], string> = {
  idle: 'bg-brand-mint',
  busy: 'bg-accent-orange',
  error: 'bg-accent-red',
  offline: 'bg-text-secondary',
};

const STATUS_LABEL: Record<MCAgent['status'], string> = {
  idle: 'idle',
  busy: 'busy',
  error: 'error',
  offline: 'offline',
};

function relativeTime(ts: number | undefined): string {
  if (!ts) return '--';
  const diff = Date.now() - ts;
  if (diff < 60_000) return 'agora';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h`;
  return `${Math.floor(diff / 86_400_000)}d`;
}

function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// ── Sub-components ───────────────────────────────────────────────────────────

function SessionBadge({ model, tokens, age }: { model: string; tokens: string; age: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[8px] font-mono text-text-secondary">
      <span className="bg-accent-blue/10 border border-accent-blue/30 text-accent-blue font-bold uppercase px-1.5 py-0.5 rounded-sm text-[7px]">
        {model}
      </span>
      <span>{tokens}</span>
      <span className="text-border-panel">/</span>
      <span>{age}</span>
    </span>
  );
}

function TaskCountPill({ count }: { count: number }) {
  return (
    <span className="text-[8px] bg-accent-blue/10 border border-accent-blue/30 text-accent-blue px-1.5 py-0.5 rounded-sm font-bold font-mono">
      {count} {count === 1 ? 'task' : 'tasks'}
    </span>
  );
}

interface AgentRowProps {
  agent: MCAgent;
  sessionInfo: { model: string; tokens: string; age: string } | null;
  inProgressCount: number;
  onSelect: (agentId: number) => void;
}

function AgentRow({ agent, sessionInfo, inProgressCount, onSelect }: AgentRowProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(agent.id)}
      className={cn(
        'w-full text-left px-3 py-2 transition-all duration-300 ease-out',
        'hover:bg-surface-hover',
        'focus-visible:ring-2 focus-visible:ring-brand-mint/50 focus-visible:outline-none',
        'flex items-start gap-2',
      )}
    >
      {/* Status dot */}
      <span className="flex items-center justify-center pt-1 shrink-0">
        <span
          className={cn(
            'w-2 h-2 rounded-full',
            STATUS_DOT_COLOR[agent.status] ?? 'bg-text-secondary',
            agent.status === 'busy' && 'animate-pulse',
          )}
        />
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Top row: name + status + time */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-text-primary shrink-0">
            {agent.name}
          </span>
          <span className="text-[9px] font-mono text-text-secondary shrink-0">
            {STATUS_LABEL[agent.status]}
            {' '}
            <span className="text-border-panel">/</span>
            {' '}
            {relativeTime(agent.last_seen)}
          </span>

          {/* In-progress task pill */}
          {inProgressCount > 0 && (
            <TaskCountPill count={inProgressCount} />
          )}
        </div>

        {/* Bottom row: last activity + session info */}
        <div className="flex items-center gap-2 mt-0.5">
          {agent.last_activity && (
            <span className="text-[9px] text-text-secondary italic truncate">
              {agent.last_activity}
            </span>
          )}
        </div>

        {/* Session info (if active) */}
        {sessionInfo && (
          <div className="mt-1">
            <SessionBadge
              model={sessionInfo.model}
              tokens={sessionInfo.tokens}
              age={sessionInfo.age}
            />
          </div>
        )}
      </div>
    </button>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 py-8">
      <span className="material-symbols-outlined text-[28px] text-text-secondary opacity-40">
        sensors
      </span>
      <p className="text-text-secondary text-xs text-center">Nenhum agente registrado</p>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export function MCLivePulse() {
  const agents = useMissionControlStore((s) => s.agents);
  const sessions = useMissionControlStore((s) => s.sessions);
  const tasks = useMissionControlStore((s) => s.tasks);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const visibleAgents = useMemo(
    () => agents.filter((a) => !a.hidden),
    [agents],
  );

  // Map agent name -> active session info
  const sessionMap = useMemo(() => {
    const map = new Map<string, { model: string; tokens: string; age: string }>();
    for (const session of sessions) {
      if (session.active && session.agent) {
        map.set(session.agent.toLowerCase(), {
          model: session.model,
          tokens: session.tokens,
          age: session.age,
        });
      }
    }
    return map;
  }, [sessions]);

  // Map agent name -> in_progress task count
  const taskCountMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const task of tasks) {
      if (task.status === 'in_progress' && task.assigned_to) {
        const key = task.assigned_to.toLowerCase();
        map.set(key, (map.get(key) ?? 0) + 1);
      }
    }
    return map;
  }, [tasks]);

  const handleSelect = useCallback((agentId: number) => {
    console.log('[MCLivePulse] agent selected:', agentId);
  }, []);

  const now = useMemo(() => new Date(), []);

  if (visibleAgents.length === 0) {
    return (
      <div
        className={cn(
          'transition-opacity duration-300',
          visible ? 'opacity-100' : 'opacity-0',
        )}
      >
        <EmptyState />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col transition-opacity duration-300',
        visible ? 'opacity-100' : 'opacity-0',
      )}
    >
      {/* Agent rows */}
      <div className="bg-surface border border-border-panel rounded-sm overflow-hidden divide-y divide-border-panel">
        {visibleAgents.map((agent) => {
          const nameKey = agent.name.toLowerCase();
          return (
            <AgentRow
              key={agent.id}
              agent={agent}
              sessionInfo={sessionMap.get(nameKey) ?? null}
              inProgressCount={taskCountMap.get(nameKey) ?? 0}
              onSelect={handleSelect}
            />
          );
        })}
      </div>

      {/* Footer timestamp */}
      <div className="flex justify-end mt-2 px-1">
        <span className="text-[8px] font-mono text-text-secondary">
          Ultima atualizacao {formatTimestamp(now)}
        </span>
      </div>
    </div>
  );
}
