// /api/unsubscribe?t=…
//   GET  → página do site com o botão de confirmar (scanners de link não descadastram ninguém sozinhos)
//   POST → botão daquela página, ou o "one-click" (RFC 8058) do cliente de e-mail
import { redirect } from './http';
import { unsubscribeToken, verifyUnsubscribeToken } from './tokens';

/** Link de descadastro para os e-mails enviados pelo Worker (boas-vindas e afins). */
export async function unsubscribeUrl(id: string, env: Env) {
  return `${env.SITE_URL}/api/unsubscribe?t=${encodeURIComponent(await unsubscribeToken(id, env.LINK_SECRET))}`;
}

export async function handleUnsubscribe(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  let token = url.searchParams.get('t') ?? '';

  if (request.method === 'GET') {
    if (!(await verifyUnsubscribeToken(token, env.LINK_SECRET))) return redirect(request, '/newsletter/link-invalido/');
    return redirect(request, `/newsletter/cancelar/?t=${encodeURIComponent(token)}`);
  }

  const form = await request.formData().catch(() => null);
  const oneClick = form?.get('List-Unsubscribe') === 'One-Click';
  token ||= String(form?.get('t') ?? '');
  const id = await verifyUnsubscribeToken(token, env.LINK_SECRET);
  if (!id) return oneClick ? new Response(null, { status: 400 }) : redirect(request, '/newsletter/link-invalido/');

  const now = new Date().toISOString();
  await env.DB.prepare(
    `UPDATE subscribers SET status = 'unsubscribed', unsubscribed_at = ?2, updated_at = ?2
     WHERE id = ?1 AND status != 'unsubscribed'`,
  )
    .bind(id, now)
    .run();
  console.log('subscribe.unsubscribed', { oneClick });

  return oneClick ? new Response(null, { status: 204 }) : redirect(request, '/newsletter/cancelada/');
}
