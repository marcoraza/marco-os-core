// Fire-and-forget Notion sync layer.
// UX is never blocked — IndexedDB is the source of truth for local state.

const API_URL = (import.meta as any).env?.VITE_FORM_API_URL || 'http://76.13.234.209:8744';
const API_TOKEN = (import.meta as any).env?.VITE_FORM_API_TOKEN || '';

export async function syncToNotion(command: string, data: Record<string, unknown>): Promise<void> {
  if (!API_URL) return;
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (API_TOKEN) headers['Authorization'] = `Bearer ${API_TOKEN}`;
    await fetch(`${API_URL}/api/notion`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ command, params: data }),
    });
  } catch {
    // fire-and-forget — don't break UX
  }
}
