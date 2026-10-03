# gusflopes.dev

Site pessoal do Gustavo — marca "ponte entre Negócios e Tecnologia". Astro 6 + ilhas React, conteúdo em Content Collections (`src/content/`, schema em `src/content.config.ts`), deploy em Cloudflare Workers Static Assets.

## Regras

- **Deploy é manual:** `pnpm run deploy` (build + `wrangler deploy`) publica direto em produção. Push não publica — não há build conectado ao Git, apesar do que o histórico do README sugeria. Só rode com aval explícito.
- **Copy e posicionamento são zona protegida.** Melhorias funcionais (bugs, SEO mecânico, render de conteúdo) podem ir direto; mudar texto visível, naming ou direção de marca exige aval explícito antes — de preferência em commit isolado, fácil de reverter.
- Analytics do site (Cloudflare Web Analytics, GA4 da landing) é tratado neste repo; métricas das redes sociais ficam no repo de marketing (`../marketing-brands/gusflopes`).
- `src/config/site.ts` é a fonte única de nome, e-mail, socials e newsletter e tem TODOs do dono: não invente valores (handle, mailbox, conta de newsletter). Pendências em `NEXT_STEPS.md`.

## Convenções

- Páginas `.astro` são finas: leem a coleção e passam props para um componente-página React em `src/components/pages/` (`client:load`). O corpo markdown entra por slot via `render(entry)`, não pelo React.
- Toda leitura de coleção passa pelo filtro `publicado` (`src/lib/publicado.ts`): no build de produção fica fora artigo com data futura (entra num deploy feito na data) ou com `[CONFIRMAR: …]` pendente.
- Eixo editorial (`engenharia` | `negocios` | `bastidores`) é a fonte única em `src/lib/eixos.ts`; datas no frontmatter em ISO, exibição pt-BR só via `src/lib/format.ts`.
- Os aliases versionados em `astro.config.mjs` (`vaul@1.1.2 → vaul` etc.) são herança do export do Figma, com cleanup pendente (`NEXT_STEPS.md`).
- Novo artigo de Radar/Insights: skill `novo-conteudo`. Edição da newsletter (espelho do marketing em `/newsletter`): skill `nova-edicao`. Estado editorial, pendências e pauta: `docs/CONTINUAR.md`.

## Verificação

- `pnpm build` valida o frontmatter contra o schema — rode antes de commitar conteúdo.
- Verificação visual: `pnpm dev` (porta 3001) + Claude in Chrome em `http://localhost:3001`.
