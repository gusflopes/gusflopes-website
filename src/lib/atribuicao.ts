/**
 * Primeiro toque da visita (UTM, site de origem, página de entrada), guardado na sessionStorage para
 * acompanhar a inscrição mesmo que ela aconteça três páginas depois da chegada. Sem storage, vale a URL atual.
 */
const CHAVE = 'gf:toque';
const UTMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

export type Toque = Partial<Record<(typeof UTMS)[number] | 'referrer_host' | 'landing_page', string>>;

function toqueAtual(): Toque {
  const params = new URLSearchParams(location.search);
  const toque: Toque = { landing_page: location.pathname };
  for (const k of UTMS) {
    const v = params.get(k);
    if (v) toque[k] = v;
  }
  try {
    const host = document.referrer ? new URL(document.referrer).hostname : '';
    if (host && host !== location.hostname) toque.referrer_host = host;
  } catch {
    // referrer malformado: segue sem ele
  }
  return toque;
}

/** Registra o primeiro toque (só na primeira página da sessão) e devolve o que estiver guardado. */
export function primeiroToque(): Toque {
  try {
    const salvo = sessionStorage.getItem(CHAVE);
    if (salvo) return JSON.parse(salvo) as Toque;
    const toque = toqueAtual();
    sessionStorage.setItem(CHAVE, JSON.stringify(toque));
    return toque;
  } catch {
    return toqueAtual();
  }
}
