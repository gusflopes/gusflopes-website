/** Hoje (YYYY-MM-DD) no fuso do autor, avaliado no momento do build. */
const hoje = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Campo_Grande' });

/**
 * Filtro para getCollection: item com data futura fica fora do build de produção
 * (não gera página, card, RSS nem sitemap) e só entra num deploy feito na data.
 * No `pnpm dev` tudo aparece, para revisar antes.
 */
export const publicado = ({ data }: { data: { date: string } }) =>
  import.meta.env.DEV || data.date <= hoje;
