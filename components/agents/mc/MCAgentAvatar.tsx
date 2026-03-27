/**
 * MCAgentAvatar — deterministic 2-letter avatar with status dot overlay.
 *
 * Color is resolved by:
 *  1. Fixed override map for known agents (Frank, Claude Code, etc.)
 *  2. Fallback: char-code sum mod 5 for unknown names
 *
 * Sizes: sm=20px, md=28px, lg=36px
 */
import React from 'react';
import { cn } from '../../../utils/cn';

// ── Types ────────────────────────────────────────────────────────────────────

type AvatarColor = 'mint' | 'blue' | 'orange' | 'purple' | 'red';

interface MCAgentAvatarProps {
  name: string;
  status: 'idle' | 'busy' | 'error' | 'offline';
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
}

// ── Color resolution ─────────────────────────────────────────────────────────

const FIXED_COLORS: Record<string, AvatarColor> = {
  frank: 'mint',
  'claude code': 'blue',
  'codex cli': 'purple',
  researcher: 'orange',
};

const COLOR_PALETTE: AvatarColor[] = ['mint', 'blue', 'orange', 'purple', 'red'];

function resolveColor(name: string): AvatarColor {
  const key = name.toLowerCase();
  if (FIXED_COLORS[key]) return FIXED_COLORS[key];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i);
  }
  return COLOR_PALETTE[hash % COLOR_PALETTE.length];
}

// ── Color class maps ─────────────────────────────────────────────────────────

const BG_CLASS: Record<AvatarColor, string> = {
  mint: 'bg-brand-mint/20',
  blue: 'bg-accent-blue/20',
  orange: 'bg-accent-orange/20',
  purple: 'bg-accent-purple/20',
  red: 'bg-accent-red/20',
};

const TEXT_CLASS: Record<AvatarColor, string> = {
  mint: 'text-brand-mint',
  blue: 'text-accent-blue',
  orange: 'text-accent-orange',
  purple: 'text-accent-purple',
  red: 'text-accent-red',
};

const BORDER_CLASS: Record<AvatarColor, string> = {
  mint: 'border-brand-mint/30',
  blue: 'border-accent-blue/30',
  orange: 'border-accent-orange/30',
  purple: 'border-accent-purple/30',
  red: 'border-accent-red/30',
};

// ── Status dot colors ────────────────────────────────────────────────────────

const STATUS_DOT_CLASS: Record<MCAgentAvatarProps['status'], string> = {
  idle: 'bg-brand-mint',
  busy: 'bg-accent-orange',
  error: 'bg-accent-red',
  offline: 'bg-text-secondary',
};

// ── Initials extraction ──────────────────────────────────────────────────────

function extractInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  // Single word: take first two letters
  return name.slice(0, 2).toUpperCase();
}

// ── Component ────────────────────────────────────────────────────────────────

export function MCAgentAvatar({
  name,
  status,
  size = 'md',
  showStatus = true,
}: MCAgentAvatarProps) {
  const color = resolveColor(name);
  const initials = extractInitials(name);

  return (
    <div className="relative inline-flex">
      <div
        className={cn(
          'flex items-center justify-center rounded-sm font-bold font-mono uppercase',
          size === 'sm' && 'w-5 h-5 text-[7px]',
          size === 'md' && 'w-7 h-7 text-[9px]',
          size === 'lg' && 'w-9 h-9 text-[11px]',
          BG_CLASS[color],
          TEXT_CLASS[color],
          'border',
          BORDER_CLASS[color],
        )}
      >
        {initials}
      </div>
      {showStatus && (
        <span
          className={cn(
            'absolute -bottom-0.5 -right-0.5 rounded-full border border-bg-base',
            size === 'sm' && 'w-1.5 h-1.5',
            size === 'md' && 'w-2 h-2',
            size === 'lg' && 'w-2.5 h-2.5',
            STATUS_DOT_CLASS[status],
          )}
        />
      )}
    </div>
  );
}
