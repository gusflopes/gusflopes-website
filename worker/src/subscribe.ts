// POST /api/subscribe — inscrição pelo formulário do site. Grava como "pending" e manda o e-mail de confirmação.
// A resposta é a mesma para quem já está na lista: o formulário não revela se um e-mail é inscrito.
import { confirmEmail, sendEmail } from './email';
import { json, originAllowed } from './http';
import { confirmToken } from './tokens';
import { verifyTurnstile } from './turnstile';

/** Versão do texto de consentimento exibido no formulário. Mude junto com o texto. */
export const CONSENT_VERSION = 'site-2026-10-05.v1';

/** Reenvio da confirmação para o mesmo e-mail: no máximo uma vez a cada 10 minutos. */
const RESEND_AFTER_MS = 10 * 60 * 1000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SLUG_RE = /^[a-z0-9-]{1,80}$/;
const EIXOS = ['engenharia', 'negocios', 'bastidores'];

interface Input {
  email: string;
  token: string;
  source: string | null;
  page: string | null;
  eixo: string | null;
  landing_page: string | null;
  referrer_host: string | null;
  utm: Record<'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_content' | 'utm_term', string | null>;
}

const text = (v: unknown, max: number) => (typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null);
const path = (v: unknown) => {
  const p = text(v, 200);
  return p && p.startsWith('/') ? p : null;
};

function parse(raw: Record<string, unknown>): Input | { error: string } {
  const email = text(raw.email, 254)?.toLowerCase() ?? '';
  if (!EMAIL_RE.test(email)) return { error: 'Confira o e-mail digitado.' };
  const token = text(raw['cf-turnstile-response'], 2048);
  if (!token) return { error: 'Confirme a verificação anti-robô.' };
  const source = text(raw.source, 80);
  const eixo = text(raw.eixo, 20);
  return {
    email,
    token,
    source: source && SLUG_RE.test(source) ? source : null,
    page: path(raw.page),
    eixo: eixo && EIXOS.includes(eixo) ? eixo : null,
    landing_page: path(raw.landing_page),
    referrer_host: text(raw.referrer_host, 120),
    utm: {
      utm_source: text(raw.utm_source, 100),
      utm_medium: text(raw.utm_medium, 100),
      utm_campaign: text(raw.utm_campaign, 100),
      utm_content: text(raw.utm_content, 100),
      utm_term: text(raw.utm_term, 100),
    },
  };
}

export async function handleSubscribe(request: Request, env: Env): Promise<Response> {
  if (!originAllowed(request, env)) return json({ ok: false, error: 'origin' }, 403);

  const ip = request.headers.get('cf-connecting-ip');
  if (!(await env.SUBSCRIBE_RATE_LIMIT.limit({ key: ip ?? 'unknown' })).success) {
    console.warn('subscribe.rate_limited');
    return json({ ok: false, error: 'Muitas tentativas. Aguarde um minuto e tente de novo.' }, 429);
  }

  const raw = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!raw || typeof raw !== 'object') return json({ ok: false, error: 'Requisição inválida.' }, 400);
  const input = parse(raw);
  if ('error' in input) return json({ ok: false, error: input.error }, 400);

  if (!(await verifyTurnstile(input.token, ip, env))) {
    return json({ ok: false, error: 'Não conseguimos validar a verificação anti-robô. Recarregue a página e tente de novo.' }, 403);
  }

  const now = new Date().toISOString();
  const row = await upsert(env.DB, input, now);
  console.log('subscribe.saved', { status: row.status, isNew: row.isNew, source: input.source });

  if (row.status === 'pending' && (await canSendConfirm(env.DB, row.id))) {
    const confirmUrl = `${env.SITE_URL}/api/confirm?t=${encodeURIComponent(await confirmToken(row.id, env.LINK_SECRET))}`;
    if (await sendEmail(confirmEmail({ to: input.email, confirmUrl, siteUrl: env.SITE_URL }), env)) {
      await logEmail(env.DB, row.id, 'confirm');
    }
  }
  return json({ ok: true });
}

/**
 * Novo e-mail entra como "pending" com a atribuição desta visita. Quem já existe renova o consentimento:
 * "unsubscribed" volta a "pending" (precisa confirmar de novo); "confirmed" não muda. A atribuição do
 * primeiro cadastro nunca é sobrescrita.
 */
async function upsert(db: D1Database, d: Input, now: string) {
  const id = crypto.randomUUID();
  const inserted = await db
    .prepare(
      `INSERT INTO subscribers (id, email, status, created_at, updated_at, consent_version, consent_at,
         source, page, eixo, landing_page, referrer_host, utm_source, utm_medium, utm_campaign, utm_content, utm_term)
       VALUES (?1, ?2, 'pending', ?3, ?3, ?4, ?3, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14)
       ON CONFLICT(email) DO NOTHING`,
    )
    .bind(id, d.email, now, CONSENT_VERSION, d.source, d.page, d.eixo, d.landing_page, d.referrer_host,
      d.utm.utm_source, d.utm.utm_medium, d.utm.utm_campaign, d.utm.utm_content, d.utm.utm_term)
    .run();
  if (inserted.meta.changes === 1) return { id, status: 'pending', isNew: true };

  const existing = await db
    .prepare(
      `UPDATE subscribers SET
         status = CASE WHEN status = 'unsubscribed' THEN 'pending' ELSE status END,
         consent_version = ?2, consent_at = ?3, updated_at = ?3
       WHERE email = ?1 RETURNING id, status`,
    )
    .bind(d.email, CONSENT_VERSION, now)
    .first<{ id: string; status: string }>();
  return { id: existing!.id, status: existing!.status, isNew: false };
}

async function canSendConfirm(db: D1Database, id: string) {
  const last = await db
    .prepare(`SELECT MAX(sent_at) AS at FROM emails_sent WHERE subscriber_id = ?1 AND kind = 'confirm'`)
    .bind(id)
    .first<{ at: string | null }>();
  return !last?.at || Date.now() - Date.parse(last.at) > RESEND_AFTER_MS;
}

export async function logEmail(db: D1Database, subscriberId: string, kind: string) {
  await db
    .prepare('INSERT INTO emails_sent (id, subscriber_id, kind, sent_at) VALUES (?1, ?2, ?3, ?4)')
    .bind(crypto.randomUUID(), subscriberId, kind, new Date().toISOString())
    .run();
}
