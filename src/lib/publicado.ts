/** Hoje (YYYY-MM-DD) no fuso do autor, avaliado no momento do build. */
const hoje = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Campo_Grande' });

const avisados = new Set<string>();

/**
 * Filtro para getCollection. No build de produção fica fora (sem página, card, RSS
 * nem sitemap) o item que:
 * - tem data futura — entra num deploy feito na data;
 * - ainda tem marcador `[CONFIRMAR: …]` no corpo — relato pessoal pendente;
 * - está marcado `rascunho: true` (Notícias, Análise da semana e Tech radar, escritos pelo agente).
 * No `pnpm dev` tudo aparece, para revisar antes.
 */
export const publicado = ({ id, data, body }: { id: string; data: { date: string; rascunho?: boolean }; body?: string }) => {
  if (import.meta.env.DEV) return true;
  if (data.rascunho) return false;
  if (data.date > hoje) return false;
  if (body?.includes('[CONFIRMAR')) {
    if (!avisados.has(id)) {
      avisados.add(id);
      console.warn(`[publicado] fora do build: ${id} ainda tem [CONFIRMAR]`);
    }
    return false;
  }
  return true;
};
