const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/** Valida o token do widget. O mesmo widget atende a landing da reforma e este site. */
export async function verifyTurnstile(token: string, ip: string | null, env: Env): Promise<boolean> {
  const body = new FormData();
  body.append('secret', env.TURNSTILE_SECRET_KEY);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  body.append('idempotency_key', crypto.randomUUID());

  const res = await fetch(SITEVERIFY_URL, { method: 'POST', body });
  if (!res.ok) {
    console.error('turnstile.siteverify_http', { status: res.status });
    return false;
  }
  const data = (await res.json()) as { success: boolean; hostname?: string; 'error-codes'?: string[] };
  if (!data.success) {
    console.warn('turnstile.rejected', { codes: data['error-codes'] ?? [] });
    return false;
  }
  const hosts = (env.TURNSTILE_EXPECTED_HOSTNAME ?? '').split(',').map((h) => h.trim()).filter(Boolean);
  if (hosts.length && !hosts.includes(data.hostname ?? '')) {
    console.warn('turnstile.hostname_mismatch');
    return false;
  }
  return true;
}
