// Worker de gusflopes.dev: o site é estático (dist/), só /api/* passa por aqui (run_worker_first).
import { handleConfirm } from './confirm';
import { handleSubscribe } from './subscribe';
import { handleUnsubscribe } from './unsubscribe';

const notAllowed = (allow: string) => new Response(null, { status: 405, headers: { allow } });

export default {
  async fetch(request, env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/subscribe') {
      return request.method === 'POST' ? handleSubscribe(request, env) : notAllowed('POST');
    }
    if (pathname === '/api/confirm') {
      return request.method === 'GET' ? handleConfirm(request, env) : notAllowed('GET');
    }
    if (pathname === '/api/unsubscribe') {
      return request.method === 'GET' || request.method === 'POST' ? handleUnsubscribe(request, env) : notAllowed('GET, POST');
    }
    if (pathname.startsWith('/api/')) return new Response('Not found', { status: 404 });

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
