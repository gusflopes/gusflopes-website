# gusflopes.dev

Site pessoal do Gustavo — marca "ponte entre Negócios e Tecnologia". Astro 6 + ilhas React, conteúdo em Content Collections (`src/content/`, schema em `src/content.config.ts`), deploy em Cloudflare Workers Static Assets.

## Regras

- **Push no `main` publica em produção** (`.github/workflows/deploy.yml`, desde 17/11/2026), atrás do portão `scripts/ci/deploy-liberado.sh`: passa commit que só mexe em `src/content/**` (agente de marketing) ou commit/merge do Gustavo sem trailer do Claude. Código feito com o Claude vai por branch + PR, com merge pelo GitHub (`gh pr merge --merge`, que sai na conta do Gustavo) só com aval dele na sessão; não dê push direto no `main`. `pnpm run deploy` (manual) continua valendo, só com aval explícito. GitHub Pages desligado.
- **Copy e posicionamento são zona protegida.** Melhorias funcionais (bugs, SEO mecânico, render de conteúdo) podem ir direto; mudar texto visível, naming ou direção de marca exige aval explícito antes — de preferência em commit isolado, fácil de reverter.
- Analytics do site (Cloudflare Web Analytics, GA4 da landing) é tratado neste repo; métricas das redes sociais ficam no repo de marketing (`../mkt-branding-gusflopes`).
- `src/config/site.ts` é a fonte única de nome, e-mail, socials e newsletter e tem TODOs do dono: não invente valores (handle, mailbox, conta de newsletter). Pendências em `NEXT_STEPS.md`.

## Convenções

- Páginas `.astro` são finas: leem a coleção e passam props para um componente-página React em `src/components/pages/` (`client:load`). O corpo markdown entra por slot via `render(entry)`, não pelo React.
- Toda leitura de coleção passa pelo filtro `publicado` (`src/lib/publicado.ts`): no build de produção fica fora artigo com data futura (entra num deploy feito na data) ou com `[CONFIRMAR: …]` pendente.
- Seções (16/11/2026): Notícias, Análise, Radar (tech radar), Artigos (`/insights`) e Ferramentas; mapa de rotas, redirects e coleções em `NEXT_STEPS.md` ("Reorganização das seções"). Eixo editorial (`engenharia` | `negocios` | `bastidores`, `src/lib/eixos.ts`) saiu do menu: virou filtro por público (`src/lib/temas.ts`) e a tag Bastidores. Datas no frontmatter em ISO, exibição pt-BR só via `src/lib/format.ts`.
- Os aliases versionados em `astro.config.mjs` (`vaul@1.1.2 → vaul` etc.) são herança do export do Figma, com cleanup pendente (`NEXT_STEPS.md`).
- Notícias (`src/content/noticias/`), Análise da semana (`src/content/analises/`) e Radar (`src/content/radar/`, o tech radar) são escritos pelo agente de marketing, nascem com `rascunho: true` (fora do build de produção) e seguem o contrato em `NEXT_STEPS.md` ("Contrato com o agente de marketing").
- Novo artigo (Artigos = `src/content/insights/`): skill `novo-conteudo`. A curadoria antiga (`src/content/curadoria/`) é arquivo, sem item novo. Edição da newsletter (espelho do marketing em `/newsletter`): skill `sync-newsletter`. Estado editorial, pendências e pauta: `docs/CONTINUAR.md`.

## Verificação

- `pnpm build` valida o frontmatter contra o schema — rode antes de commitar conteúdo.
- Verificação visual: `pnpm dev` (porta 3001) + Claude in Chrome em `http://localhost:3001`.
