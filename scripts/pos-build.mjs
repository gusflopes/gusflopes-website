/**
 * Integração de pós-build (roda depois do @astrojs/sitemap; a ordem em astro.config.mjs importa).
 *
 * 1. Sitemap sem página fora do índice: tira do sitemap toda URL cuja página saiu com
 *    `<meta name="robots" content="noindex…">` (notícia individual nas primeiras 8 semanas — A1 —, índice vazio,
 *    páginas de retorno da newsletter) ou que é só um redirecionamento.
 * 2. /radar/ → /noticias/ (A8): quando src/pages/radar.astro sai como redirecionamento (há notícia publicada),
 *    acrescenta o 301 ao dist/_redirects. Os itens antigos em /radar/article/<id>/ não mudam.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const NOINDEX = /<meta\s+name="robots"\s+content="noindex/i;
const REDIRECT_RADAR = 'data-redirect-radar';

/** Caminho do HTML gerado para uma URL do site (build com `build.format: 'directory'`, o padrão). */
function htmlDaUrl(dist, loc) {
  const p = decodeURIComponent(new URL(loc).pathname);
  const candidatos = p.endsWith('/') ? [path.join(dist, p, 'index.html')] : [path.join(dist, p, 'index.html'), path.join(dist, `${p}.html`)];
  return candidatos.find((c) => fs.existsSync(c));
}

export default function posBuild() {
  return {
    name: 'gusflopes:pos-build',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const dist = fileURLToPath(dir);

        // 1. Sitemap
        const sitemaps = fs.readdirSync(dist).filter((f) => /^sitemap-\d+\.xml$/.test(f));
        let removidas = 0;
        for (const f of sitemaps) {
          const arq = path.join(dist, f);
          const xml = fs.readFileSync(arq, 'utf8');
          const novo = xml.replace(/<url>[\s\S]*?<\/url>/g, (bloco) => {
            const loc = bloco.match(/<loc>([^<]+)<\/loc>/)?.[1];
            const html = loc && htmlDaUrl(dist, loc);
            if (!html) return bloco;
            const conteudo = fs.readFileSync(html, 'utf8');
            if (NOINDEX.test(conteudo) || conteudo.includes(REDIRECT_RADAR)) {
              removidas += 1;
              return '';
            }
            return bloco;
          });
          if (novo !== xml) fs.writeFileSync(arq, novo);
        }
        logger.info(`sitemap: ${removidas} URL(s) fora do índice removida(s)`);

        // 2. /radar/ → /noticias/
        const radar = path.join(dist, 'radar', 'index.html');
        if (fs.existsSync(radar) && fs.readFileSync(radar, 'utf8').includes(REDIRECT_RADAR)) {
          const redirects = path.join(dist, '_redirects');
          const atual = fs.existsSync(redirects) ? fs.readFileSync(redirects, 'utf8') : '';
          const linhas = '\n# A8: Notícias substitui o Radar antigo (gerado no build por scripts/pos-build.mjs)\n/radar /noticias/ 301\n/radar/ /noticias/ 301\n';
          fs.writeFileSync(redirects, atual.trimEnd() + '\n' + linhas);
          logger.info('_redirects: /radar/ → /noticias/ (301)');
        }
      },
    },
  };
}
