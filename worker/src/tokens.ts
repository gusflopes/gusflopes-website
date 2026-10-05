// Links assinados com HMAC (LINK_SECRET): não expõem o e-mail e não exigem login.
//   confirm:     <id>.<expira-em-ms>.<assinatura>  (vale 7 dias)
//   unsubscribe: <id>.<assinatura>                 (não expira)

const enc = new TextEncoder();
const CONFIRM_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const key = (secret: string) =>
  crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);

const toB64Url = (buf: ArrayBuffer) =>
  btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

function fromB64Url(s: string): Uint8Array | null {
  try {
    return Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
  } catch {
    return null;
  }
}

async function sign(payload: string, secret: string) {
  return toB64Url(await crypto.subtle.sign('HMAC', await key(secret), enc.encode(payload)));
}

async function verify(payload: string, sig: string, secret: string) {
  const bytes = fromB64Url(sig);
  return Boolean(bytes) && crypto.subtle.verify('HMAC', await key(secret), bytes!, enc.encode(payload));
}

export async function confirmToken(id: string, secret: string, now = Date.now()) {
  const exp = now + CONFIRM_TTL_MS;
  return `${id}.${exp}.${await sign(`confirm:${id}:${exp}`, secret)}`;
}

export async function verifyConfirmToken(token: string, secret: string, now = Date.now()): Promise<string | null> {
  const [id, exp, sig] = token.split('.');
  if (!id || !exp || !sig || !(Number(exp) > now)) return null;
  return (await verify(`confirm:${id}:${exp}`, sig, secret)) ? id : null;
}

export async function unsubscribeToken(id: string, secret: string) {
  return `${id}.${await sign(`unsubscribe:${id}`, secret)}`;
}

export async function verifyUnsubscribeToken(token: string, secret: string): Promise<string | null> {
  const [id, sig] = token.split('.');
  if (!id || !sig) return null;
  return (await verify(`unsubscribe:${id}`, sig, secret)) ? id : null;
}
