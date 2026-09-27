import type { APIContext } from 'astro';
import { buildFeed } from '../../lib/feed';
import { EIXO_IDS, type EixoId } from '../../lib/eixos';

export function getStaticPaths() {
  return EIXO_IDS.map((eixo) => ({ params: { eixo } }));
}

export function GET(context: APIContext) {
  return buildFeed(context, context.params.eixo as EixoId);
}
