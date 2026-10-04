# Brief comum — redesign gusflopes.dev (4 direções em paralelo)

Você é um de 4 agentes. Cada um aplica UMA direção visual ao site gusflopes.dev, na sua própria worktree e branch.
Não toque nas outras worktrees (`.worktrees/*` que não a sua) nem na branch `design/base` ou `main`.

## Contexto obrigatório (leia antes de tudo)
- `CLAUDE.md` da raiz da worktree (regras do repo), `PRODUCT.md` (verdade do produto, confirmada pelo dono), `DESIGN.md` (sistema ATUAL — vira evidência/anti-referência, exceto onde a sua direção diz para preservar).
- Página com as 9 direções e as maquetes que o dono aprovou (HTML, abra e leia o CSS da sua maquete — ela é o norte visual):
  `/tmp/claude-0/-home-user-gusflopes-website/3585d3d5-9874-53ce-a9d0-733568287c59/scratchpad/direcoes/index.html`
  (procure `data-k="N"` e o bloco `/* N ... */` do CSS, e o objeto `{k:N,...}` no array `D`).
- Skill Impeccable instalada em `.claude/skills/impeccable/`. Leia `SKILL.md`, depois `reference/new-work.md` (seções 4–7), `reference/craft-floor.md` (antes de qualquer edição de UI), `reference/mode-read.md` (artigos, hubs, newsletter) e `reference/mode-persuade.md` (home). Rode `"<worktree>/.claude/skills/impeccable/scripts/impeccable" context` uma vez, com cwd na worktree.
  - A direção JÁ FOI ESCOLHIDA pelo dono (decisão fixada pelo usuário vence o sorteio). NÃO rode `concept-seed`, não re-sorteie, não abra página de decisão, não pergunte nada ao usuário — trabalhe sozinho até o fim.
  - Não há geração de imagem: caminho code-led.
  - Grave o contrato de direção (THESIS / OWN-WORLD / STORY / FIRST VIEWPORT / FORM / FINISH) no surface brief como o Impeccable manda, nunca em código servido ao navegador.
  - No fim, reescreva `DESIGN.md` a partir do que foi construído (siga `reference/document.md`; pode usar o subagente `impeccable-documenter` se o tool Agent existir para você) e, se possível, rode uma revisão final no espírito do `impeccable-finish-reviewer`. Rode o detector do Impeccable no build (`scripts/impeccable` tem verbos de detecção/audit; veja `--help`) e corrija o que for material.

## Restrições do dono (inegociáveis)
1. **Paleta oficial fixa:** azul-escuro + laranja. Base de referência das maquetes: azul-escuro `#0B1A33`, azul-escuro 2 `#13284D`, laranja `#F97316`, laranja profundo `#C2410C` (texto/link laranja sobre claro), laranja claro `#FB923C`/`#FDBA74`, azul-céu do quadro `#8FB3D9`, papel frio `#F2F4F7`. Pode ajustar tons para contraste, não pode trocar a paleta. Botão laranja leva texto escuro (`#1c0a02`), contraste AA.
2. **O quadro do hero** (`src/assets/326189a758fea0fe0e2da42349b6da943b29ba51.png`, cidade noturna em pinceladas) e **Van Gogh** são a inspiração da marca. Nunca ponha textura/pintura atrás de texto corrido.
3. **Copy é zona protegida:** NÃO mude nenhum texto visível, nome de seção, label ou tagline. A tagline já é "Tecnologia e negócio, partes do mesmo sistema" (não volte para "Engenharia"). O eixo continua "Engenharia & IA" em `/engenharia`. Se a direção exigir um rótulo novo (ex.: "estação 14"), use só dado já existente (número/ordem/data) e liste no relatório como "texto novo a aprovar", isolado num commit próprio `copy(<direcao>): ...`.
4. Não invente valores em `src/config/site.ts`. Não mexa no conteúdo de `src/content/` (frontmatter e texto). Não mexa em rotas, redirects, RSS, sitemap, JSON-LD, analytics, nem no filtro `publicado`.
5. **Nunca rode `pnpm run deploy` nem `wrangler`.** Não abra PR, não faça merge.
6. Fontes: evite as da lista proibida do Impeccable (Cormorant, Plus Jakarta Sans, Fraunces, Playfair, Inter, Space Grotesk, IBM Plex, DM Sans/Serif etc.) salvo justificativa. Self-host via `@fontsource`/`@fontsource-variable` (pnpm add é permitido); remova as dependências de fontes que deixarem de ser usadas. Mantenha performance: LCP da home não pode piorar (hero AVIF/WebP responsivo já existe em `src/lib/imagens.ts` / `FundoPicture`).

## Escopo
Sistema visual completo, não só a home:
- Tokens/tema (`src/styles/globals.css`, `src/index.css`), fontes, `Header`, `Footer`, `SocialLinks`, `NewsletterForm`/`NewsletterCta`.
- Home (`HomePage.tsx`, `Hero`, `Eixos`, `LatestContent`, `Ferramenta`, `Services`, `Themes`).
- Hubs: `/insights`, `/radar`, `/engenharia` `/negocios` `/bastidores` (`src/pages/[eixo]`), `/newsletter` e edição.
- Artigos: `InsightArticlePage`, `RadarArticlePage` e o estilo do corpo markdown (prose) — coluna de leitura calma, 60–75 caracteres, corpo ~17–18px, contraste real; código, tabelas, citações no idioma da direção.
- 404, privacy, terms: só herdar o sistema.
- Mobile 390px e desktop 1366px. Foco visível, `prefers-reduced-motion`, ordem de headings.

## Kit Substack (entregável obrigatório)
Pasta `docs/substack-kit/` na sua branch:
- `README.md`: o que configurar no Substack (cor de destaque hex, cor de fundo hex, fontes mais próximas da lista do Substack — se não conseguir confirmar a lista atual, diga isso e dê 2 alternativas seguras), como usar logo/wordmark/capa, e como a identidade sobrevive ao e-mail.
- `logo.svg` + `logo-512.png` (quadrado), `wordmark.svg` + `wordmark.png` (horizontal, fundo transparente e versão sobre azul-escuro), `capa-publicacao.png` (cabeçalho/cover da publicação).
- Um gerador de capa de post (script Node com `sharp`, ex.: `docs/substack-kit/gerar-capa.mjs "Título" eixo`) que produz PNG nos tamanhos 1456×816 e 1200×630, mais 2 exemplos gerados com títulos reais de `src/content/`.
- Rasters gerados por script, com proveniência anotada no README.

## Verificação (passes limitados, como manda o Impeccable)
- `pnpm build` deve passar sem erro.
- Rode `pnpm preview --port <SUA_PORTA>` (em background) e tire screenshots com Playwright (`import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs'`) de: `/`, `/insights/`, `/engenharia/`, `/insights/article/agent-skills-pacotes-de-contexto/`, `/radar/`, `/newsletter/` — desktop 1366×900 e mobile 390×844, viewport + página inteira. Salve em `docs/design-review/` na branch. Imagens do Unsplash não carregam neste sandbox (egress bloqueado) — é esperado, ignore.
- Um round de inspeção, um lote de correções, no máximo mais um round. Pare.

## Git
- Commits pequenos e descritivos em português, no padrão do repo (`feat(design): ...`, `chore(fonts): ...`, `docs(design): ...`), cada um terminando com:
  ```
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01G5QirRtrqW1g2QHV9fAH4M
  ```
- No fim: `git push -u origin <sua-branch>` (se falhar por rede, tente até 4 vezes com 2s/4s/8s/16s).

## Relatório final (sua última mensagem)
Curto, em português: o que foi feito por área, fontes escolhidas e por quê, onde o quadro entra, desvios da maquete e motivo, qualquer "texto novo a aprovar", resultado do build/detector, caminho dos screenshots e do kit Substack, hash do último commit pushado, e o que ficou pendente/riscos.
