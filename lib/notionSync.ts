// Fire-and-forget Notion sync layer.
// If VITE_FORM_API_URL is not configured, writes are silently skipped.
// UX is never blocked — IndexedDB is the source of truth for local state.

const API_URL = (import.meta as any).env?.VITE_FORM_API_URL || '';

export async function syncToNotion(command: string, data: Record<string, unknown>): Promise<void> {
  if (!API_URL) return; // silently skip if no API configured
  try {
    await fetch(`${API_URL}/api/notion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command, params: data }),
    });
  } catch {
    // fire-and-forget — don't break UX
  }
}
