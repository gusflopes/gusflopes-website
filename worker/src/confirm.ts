// GET /api/confirm?t=… — link do e-mail de confirmação. Marca "confirmed" e leva para a página do site.
import { redirect } from './http';
import { verifyConfirmToken } from './tokens';

export async function handleConfirm(request: Request, env: Env): Promise<Response> {
  const token = new URL(request.url).searchParams.get('t') ?? '';
  const id = await verifyConfirmToken(token, env.LINK_SECRET);
  if (!id) return redirect(request, '/newsletter/link-invalido/');

  const now = new Date().toISOString();
  // Só "pending" confirma; quem já confirmou cai na mesma página. Quem saiu depois do pedido continua fora.
  const row = await env.DB.prepare(
    `UPDATE subscribers SET
       status = CASE WHEN status = 'pending' THEN 'confirmed' ELSE status END,
       confirmed_at = CASE WHEN status = 'pending' THEN ?2 ELSE confirmed_at END,
       updated_at = CASE WHEN status = 'pending' THEN ?2 ELSE updated_at END
     WHERE id = ?1 RETURNING status`,
  )
    .bind(id, now)
    .first<{ status: string }>();

  if (!row || row.status === 'unsubscribed') return redirect(request, '/newsletter/link-invalido/');
  console.log('subscribe.confirmed');
  return redirect(request, '/newsletter/confirmada/');
}
