# gusflopes.dev — Website

Site em **Astro 6** com React 18 islands (Radix UI + Tailwind 4 + framer-motion). Roteamento file-based; conteúdo em Content Collections com schema Zod. Deploy via Cloudflare Workers (Static Assets).

## Desenvolvimento

```bash
pnpm install
pnpm dev        # http://localhost:3001
pnpm build      # gera ./dist
pnpm preview    # serve o build local
```

## Deploy

O deploy é **manual**. Não há build conectado ao Git: push em qualquer branch, inclusive `main`, não publica nada (conferido em 27/09/2026 pelo histórico de deployments do Worker).

```bash
pnpm wrangler login    # uma vez por máquina
pnpm run deploy        # build + wrangler deploy — vai direto para produção
```

- **Produção**: `https://gusflopes.dev` (custom domain) e `https://gusflopes-website.gusflopes86.workers.dev`.
- **Preview sem publicar**: `pnpm build && pnpm exec wrangler versions upload` gera uma versão com URL própria (`<hash>-gusflopes-website.gusflopes86.workers.dev`), sem promover.
- **Rollback**: dashboard do Worker → *Deployments* → escolher a versão anterior → *Deploy*.

Artigo com data futura fica fora do build (`src/lib/publicado.ts`); ele só entra no ar com um deploy feito na data.

## Configuração Cloudflare

O projeto é um **Worker** só com Static Assets, configurado por [`wrangler.jsonc`](./wrangler.jsonc):

- `assets.directory: "./dist"` — saída do `astro build`.
- `assets.not_found_handling: "404-page"` — rota inexistente serve `dist/404.html` com status 404.
- Redirects curtos (`/reforma`, `/simulador`) em `public/_redirects`.
- Custom domain `gusflopes.dev` em *Settings* → *Domains & Routes* do Worker.

Não há código de Worker (`main`). Para API/SSR no futuro, criar `src/worker.ts` e referenciar em `main` no `wrangler.jsonc`.

## Migrar para deploy via GitHub Actions (opcional, no futuro)

Há um workflow de exemplo em `.github/workflows-drafts/deploy.yml` para o caso de querer rodar testes/lint antes de cada deploy. Para ativar:

1. Mover para `.github/workflows/deploy.yml`.
2. Adicionar secrets no repo: `CLOUDFLARE_API_TOKEN` (com permissão `Workers Scripts: Edit`) e `CLOUDFLARE_ACCOUNT_ID`.
