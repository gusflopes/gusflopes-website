// Envio pelo Cloudflare Email Service (binding send_email "EMAIL", domínio news.gusflopes.dev).
// Em dev (.dev.vars com EMAIL_DEV=log) o e-mail só aparece no log, com os links.

export interface OutgoingEmail {
  to: string;
  subject: string;
  html: string;
  text: string;
  unsubscribeUrl?: string;
}

/** "Nome <email@x>" → { name, email } */
function parseAddress(v: string) {
  const m = v.match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
  return m ? { name: m[1] ?? '', email: m[2]! } : { name: '', email: v.trim() };
}

export async function sendEmail(email: OutgoingEmail, env: Env): Promise<boolean> {
  if (env.EMAIL_DEV === 'log') {
    console.log('email.dev', { subject: email.subject, text: email.text });
    return true;
  }
  try {
    await env.EMAIL.send({
      to: email.to,
      from: parseAddress(env.EMAIL_FROM),
      replyTo: env.EMAIL_REPLY_TO,
      subject: email.subject,
      html: email.html,
      text: email.text,
      ...(email.unsubscribeUrl && {
        headers: {
          'List-Unsubscribe': `<${email.unsubscribeUrl}>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
      }),
    });
    return true;
  } catch (e) {
    // Não logar a mensagem do erro: pode ecoar o endereço do destinatário.
    console.error('email.send_error', { code: (e as { code?: string }).code ?? 'unknown' });
    return false;
  }
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** E-mail de dupla confirmação. Cores da marca: papel #FFF8F2, tinta #0B1A33, laranja #F97316 com texto #1c0a02. */
export function confirmEmail({ to, confirmUrl, siteUrl }: { to: string; confirmUrl: string; siteUrl: string }): OutgoingEmail {
  const subject = 'Confirme sua inscrição em gusflopes.dev';
  const text = `Olá!

Recebemos um pedido para inscrever este e-mail na newsletter de gusflopes.dev. Para confirmar, abra o link abaixo:

${confirmUrl}

Se não foi você, ignore esta mensagem: sem a confirmação, nada é enviado.

Gustavo Lopes
${siteUrl}`;
  const html = `<!doctype html><html lang="pt-BR"><body style="margin:0;padding:0;background:#FFF8F2">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8F2"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;font-family:Georgia,'Times New Roman',serif;color:#0B1A33">
<tr><td style="border-top:3px solid #F97316;padding-top:24px;font-size:18px;line-height:1.6">
<p style="margin:0 0 16px">Olá!</p>
<p style="margin:0 0 24px">Recebemos um pedido para inscrever este e-mail na newsletter de gusflopes.dev. Para confirmar, use o botão abaixo.</p>
<p style="margin:0 0 24px"><a href="${esc(confirmUrl)}" style="display:inline-block;background:#F97316;color:#1c0a02;font-family:Arial,sans-serif;font-weight:bold;font-size:16px;text-decoration:none;padding:14px 24px">Confirmar inscrição</a></p>
<p style="margin:0 0 24px;font-size:15px;color:#3D4E68">Se não foi você, ignore esta mensagem: sem a confirmação, nada é enviado.</p>
<p style="margin:0;font-size:15px">Gustavo Lopes<br><a href="${esc(siteUrl)}" style="color:#C2410C">gusflopes.dev</a></p>
</td></tr></table></td></tr></table></body></html>`;
  return { to, subject, html, text };
}
