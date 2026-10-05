export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

/** Redireciona para uma página do site (303: o navegador segue com GET). */
export const redirect = (request: Request, path: string) => Response.redirect(new URL(path, request.url).toString(), 303);

/** Aceita só o próprio site (e as origens de dev); bloqueia POST cross-site de navegadores. */
export function originAllowed(request: Request, env: Env): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true; // cliente não-navegador; o Turnstile continua obrigatório
  if (origin === new URL(request.url).origin || origin === env.SITE_URL) return true;
  return (env.DEV_ORIGINS ?? '').split(',').map((o) => o.trim()).includes(origin);
}
