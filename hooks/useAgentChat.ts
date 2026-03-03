import { useState, useEffect, useCallback } from 'react';
import { getDb, type ChatMessage } from '../data/db';

interface UseAgentChatOptions {
  agentId: string;
  sectionId: string;
}

export function useAgentChat({ agentId, sectionId }: UseAgentChatOptions) {
  const sessionId = `${agentId}:${sectionId}`;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load from IndexedDB on mount
  useEffect(() => {
    (async () => {
      try {
        const db = await getDb();
        const session = await db.get('chat_sessions', sessionId);
        if (session) setMessages(session.messages);
      } catch { /* IndexedDB unavailable — use empty */ }
    })();
  }, [sessionId]);

  // Persist to IndexedDB
  const persist = useCallback(async (msgs: ChatMessage[]) => {
    try {
      const db = await getDb();
      const now = new Date().toISOString();
      const existing = await db.get('chat_sessions', sessionId);
      await db.put('chat_sessions', {
        id: sessionId,
        agentId,
        sectionId,
        openClawSessionId: null,
        messages: msgs,
        createdAt: existing?.createdAt ?? now,
        updatedAt: now,
      });
    } catch { /* silent fail */ }
  }, [sessionId, agentId, sectionId]);

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setIsLoading(true);

    try {
      // TODO: integrate with OpenClaw Gateway HTTP client
      const agentMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'agent',
        content: '[Integracao OpenClaw pendente]',
        timestamp: new Date().toISOString(),
      };
      const final_ = [...updated, agentMsg];
      setMessages(final_);
      await persist(final_);
    } finally {
      setIsLoading(false);
    }
  }, [messages, persist]);

  const clearSession = useCallback(async () => {
    try {
      const db = await getDb();
      await db.delete('chat_sessions', sessionId);
    } catch { /* silent */ }
    setMessages([]);
  }, [sessionId]);

  return { messages, isLoading, sendMessage, clearSession, sessionId };
}
