import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { newsletter } from '../config/site';
import { primeiroToque } from '../lib/atribuicao';
import type { EixoId } from '../lib/eixos';

// Chave pública do widget Turnstile (o mesmo da landing da reforma). Sem variável, usa a chave de TESTE
// da Cloudflare, que sempre passa — é o que roda no `pnpm dev` / `wrangler dev`.
const SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
};
type JanelaTurnstile = Window & { turnstile?: Turnstile; aoCarregarTurnstile?: () => void };

let scriptTurnstile: Promise<void> | null = null;
/** Script do Turnstile carregado uma vez, só quando alguém começa a preencher um formulário. */
function carregarTurnstile(): Promise<void> {
  const w = window as JanelaTurnstile;
  if (w.turnstile) return Promise.resolve();
  return (scriptTurnstile ??= new Promise((resolve, reject) => {
    w.aoCarregarTurnstile = () => resolve();
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=aoCarregarTurnstile';
    s.async = true;
    s.onerror = () => {
      scriptTurnstile = null;
      reject(new Error('turnstile'));
    };
    document.head.appendChild(s);
  }));
}

interface InscricaoFormProps {
  /** Ponto de clique gravado com o lead (footer, artigo-<slug>, newsletter-arquivo…). */
  source: string;
  /** Eixo do texto, quando a inscrição acontece no fim de um artigo. */
  eixo?: EixoId;
  /** "claro" sobre papel/creme; "escuro" no rodapé. */
  tom?: 'claro' | 'escuro';
}

type Estado = { tipo: 'pronto' } | { tipo: 'enviando' } | { tipo: 'enviado'; email: string } | { tipo: 'erro'; mensagem: string };

/**
 * Inscrição na lista própria do site (POST /api/subscribe → D1, dupla confirmação por e-mail).
 * A pessoa continua na página: o retorno aparece no lugar do formulário.
 */
export function InscricaoForm({ source, eixo, tom = 'claro' }: InscricaoFormProps) {
  const id = useId();
  const [estado, setEstado] = useState<Estado>({ tipo: 'pronto' });
  const caixaTurnstile = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const token = useRef<{ valor: string | null; esperando: ((t: string) => void)[] }>({ valor: null, esperando: [] });

  // Registra o primeiro toque já na chegada (o rodapé está em todas as páginas).
  useEffect(() => {
    primeiroToque();
  }, []);

  function iniciarTurnstile() {
    if (widget.current || !caixaTurnstile.current) return;
    widget.current = 'carregando';
    carregarTurnstile()
      .then(() => {
        const w = window as JanelaTurnstile;
        widget.current = w.turnstile!.render(caixaTurnstile.current!, {
          sitekey: SITE_KEY,
          appearance: 'interaction-only',
          theme: tom === 'escuro' ? 'dark' : 'light',
          language: 'pt-br',
          callback: (t: string) => {
            token.current.valor = t;
            token.current.esperando.splice(0).forEach((f) => f(t));
          },
          'expired-callback': () => {
            token.current.valor = null;
          },
        });
      })
      .catch(() => {
        widget.current = null;
      });
  }

  function aguardarToken(): Promise<string> {
    if (token.current.valor) return Promise.resolve(token.current.valor);
    iniciarTurnstile();
    return new Promise((resolve, reject) => {
      token.current.esperando.push(resolve);
      setTimeout(() => reject(new Error('turnstile-timeout')), 20000);
    });
  }

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get('email') ?? '').trim();
    setEstado({ tipo: 'enviando' });
    try {
      const t = await aguardarToken();
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email,
          source,
          eixo,
          page: location.pathname,
          ...primeiroToque(),
          'cf-turnstile-response': t,
        }),
      });
      const corpo = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !corpo.ok) throw new Error(corpo.error ?? 'Não deu certo. Tente de novo em instantes.');
      setEstado({ tipo: 'enviado', email });
    } catch (err) {
      const mensagem =
        err instanceof Error && err.message !== 'turnstile-timeout' && !err.message.startsWith('Failed')
          ? err.message
          : 'Não conseguimos enviar agora. Recarregue a página e tente de novo.';
      setEstado({ tipo: 'erro', mensagem });
    } finally {
      // Token do Turnstile é de uso único: o próximo envio pede outro.
      token.current.valor = null;
      const w = window as JanelaTurnstile;
      if (widget.current && widget.current !== 'carregando') w.turnstile?.reset(widget.current);
    }
  }

  const escuro = tom === 'escuro';
  const textoFino = escuro ? 'text-nevoa' : 'text-tinta-2';

  if (estado.tipo === 'enviado') {
    return (
      <p role="status" className={`font-sans text-[0.9375rem] leading-relaxed ${escuro ? 'text-white' : 'text-tinta'}`}>
        Falta um passo: confirme no e-mail que enviamos para <strong className="break-all">{estado.email}</strong>.
      </p>
    );
  }

  return (
    <form onSubmit={enviar} onFocus={iniciarTurnstile} aria-describedby={`${id}-consent`}>
      <div className={`flex ${escuro ? 'flex-col' : 'flex-col sm:flex-row'} gap-3`}>
        <label htmlFor={`${id}-email`} className="sr-only">Seu e-mail</label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="seu@email.com"
          className={`min-h-12 flex-1 min-w-0 px-4 font-sans text-base border focus:outline-none focus:border-laranja ${
            escuro ? 'bg-transparent border-linha text-white' : 'bg-papel border-regua text-tinta'
          }`}
        />
        <button type="submit" className={`botao ${escuro ? 'w-full' : 'shrink-0'}`} disabled={estado.tipo === 'enviando'}>
          {estado.tipo === 'enviando' ? 'Enviando…' : newsletter.ctaLabel}
        </button>
      </div>
      {/* Turnstile "interaction-only": só aparece se a Cloudflare precisar de uma confirmação manual. */}
      <div ref={caixaTurnstile} className="[&:not(:empty)]:mt-3" />
      {estado.tipo === 'erro' && (
        <p role="alert" className={`mt-3 font-sans text-sm font-semibold ${escuro ? 'text-laranja-claro' : 'text-laranja-fundo'}`}>
          {estado.mensagem}
        </p>
      )}
      <p id={`${id}-consent`} className={`mt-3 font-sans text-[0.8125rem] leading-relaxed ${textoFino}`}>
        {/* Mudou o texto? Suba CONSENT_VERSION em worker/src/subscribe.ts. */}
        Você recebe a newsletter, os textos novos do site e avisos de cursos e projetos. Mandamos um e-mail para confirmar; dá para sair quando
        quiser, com um clique.{' '}
        <a href="/privacy" className={`underline ${escuro ? 'hover:text-white' : 'hover:text-laranja-fundo'}`}>Política de Privacidade</a>.
      </p>
    </form>
  );
}
