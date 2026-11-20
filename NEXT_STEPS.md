# Próximos passos — pós-evolução de marca (feat/brand-evolution)

Estado das grandes fases:

- [x] **Migração Astro (fases 1–5)** — shell, rotas, Content Collections, Tailwind 4, cleanup
- [x] **Evolução de marca** — conteúdo real, render de markdown, rota dinâmica de insights, SEO/OG/RSS/sitemap, newsletter, socials
- [ ] **Fase 6 (SSR / Edge)** — deliberadamente não executada (ver justificativa no fim deste doc)

---

## Resolvido nesta iteração (verificado no código)

### Conteúdo dos artigos agora é markdown real das coleções

- `src/pages/radar/article/[id].astro` e `src/pages/insights/article/[id].astro` usam `render(entry)` + `<Content />` do Astro, passado como `children` para os shells React (`RadarArticlePage`, `InsightArticlePage`). Nenhum body hardcoded sobrou (`ArticlePage2.tsx` foi deletado). Não foi preciso MDX — `.md` puro com code blocks via Shiki atende.
- Tipografia do body via `@tailwindcss/typography` (`@plugin` em `src/index.css`) com classes `prose prose-invert` customizadas nos shells.

### `/insights/article/[id]` é rota dinâmica

- `src/pages/insights/article.astro` (rota fixa) foi removida; `[id].astro` com `getStaticPaths` derivando da coleção `insights`. Links em `InsightsPage.tsx` apontam para `/insights/article/${article.id}`.

### Conteúdo real nas coleções (Dez/2025 → Jun/2026)

- **Radar**: 12 itens (8 externos com `target="_blank"`, 4 locais que geram página estática).
- **Insights**: 8 artigos autorais com code blocks.
- Schema Zod atualizado em `src/content.config.ts` (data ISO `YYYY-MM-DD`, formatação pt-BR em `src/lib/format.ts`).

### SEO / meta / infraestrutura de descoberta

- `Default.astro`: canonical, Open Graph completo (`og:type=article` + `article:published_time` + `article:author` em artigos), Twitter Card, `theme-color`, `lang="pt-BR"`.
- `public/favicon.svg`, `public/og-default.jpg` (fallback de OG image, 1200×630), `public/robots.txt`.
- Sitemap via `@astrojs/sitemap` (`site` configurado no `astro.config.mjs`) + `<link rel="sitemap">`.
- RSS em `/rss.xml` (`src/pages/rss.xml.ts`, `@astrojs/rss`): insights + radar locais, ordenado por data, `<language>pt-BR</language>` + `<link rel="alternate">` no layout.

### Newsletter, contato e socials

- `src/config/site.ts` é a fonte única de verdade (site, autor, socials, newsletter).
- `NewsletterForm.tsx` (variantes hero/footer): POST padrão para endpoint embed-subscribe do Buttondown, com honeypot e reset de estado via `pageshow`. Usado no `Hero` e no `Footer`.
- Header "Contato" → `mailto:gustavo@gusflopes.dev`. Footer e author footer dos artigos com GitHub/LinkedIn reais (sem mais `href="#"`); ícones de redes inexistentes (YouTube, Twitter) removidos.
- Share nos artigos: Web Share API com fallback `navigator.clipboard` + feedback "Link copiado". Botão Bookmark e Copy-code fake removidos.

### Paginação fake de `/insights`

- Removida. A página usa busca textual + filtro por categoria client-side; com 8 artigos não há necessidade de paginação real.

---

## Pendências de configuração (bloqueiam funcionalidade, não build)

### 1. Confirmar conta no Buttondown

`src/config/site.ts` aponta para `https://buttondown.com/api/emails/embed-subscribe/gusflopes` (com `TODO` no código). Sem a conta criada com esse username, o submit do form falha. Criar a conta — ou trocar a `action` pelo endpoint do provedor escolhido (o form faz POST padrão com campo `email`).

### 2. Confirmar handle do LinkedIn

`socials.linkedin = "https://www.linkedin.com/in/gusflopes"` é suposição (TODO em `src/config/site.ts`). Confirmar o handle real ou ajustar.

---

## Reorganização das seções (16/11/2026)

Decisão do Gustavo em 16/11. Branch `recalibracao-v2`; validado no CI da branch (`build.yml`).

**Menu:** Notícias · Análise · Radar · Artigos · Ferramentas. As três primeiras só aparecem quando têm algo publicado
(no build de produção, rascunho e data anterior a 23/11 não contam); Artigos e Ferramentas sempre. Newsletter e
"Trabalhe comigo" saíram do menu e viraram chamadas à direita do topo (`CHAMADAS` em `src/components/Header.tsx`) e no
rodapé. Os eixos saíram do menu e do rodapé.

| Rota | O que é | Fonte |
|---|---|---|
| `/noticias/` | fluxo diário, com filtro por tema e por público (`?tema=<id>&publico=<slug>`) | `src/content/noticias/` |
| `/noticias/curadoria/` | **novo:** arquivo da curadoria do Radar antigo (8 links externos, sem item novo) | `src/content/curadoria/` |
| `/analise/` | semanal, a mesma edição da newsletter; cada análise linka o Sobre | `src/content/analises/` |
| `/radar/`, `/radar/<aaaa>-<mm>/` | **tech radar** (antes em `/tech-radar/`) | `src/content/radar/` (antes `src/content/tech-radar/`) |
| `/insights/`, `/insights/article/<id>/` | **Artigos** (rótulo novo, rota mantida); filtro por público (`?publico=`) e tag Bastidores (`?tag=bastidores`) | `src/content/insights/` |
| `/ferramentas/` | **novo:** Simulador da Reforma Tributária e servidor MCP rt2026 | `src/components/pages/FerramentasPage.tsx` + `projetos` em `src/config/site.ts` |
| `/sobre/` | **novo**, fora do menu, no rodapé e em cada análise; `rascunho: true` | `src/content/paginas/sobre.md` |
| `/engenharia/`, `/negocios/`, `/bastidores/` | mantidas como páginas de filtro (mesma lista de antes, com aviso de que os textos estão em Artigos); RSS por eixo mantido | `src/pages/[eixo]/` |

**Redirects (301, `public/_redirects`):** `/tech-radar`, `/tech-radar/` e `/tech-radar/*` → `/radar/:splat`;
`/radar/article/<id>` dos 4 textos autorais → `/insights/article/<id>/` (`eu-ai-act-checklist-engenharia`,
`opus-45-gemini-3-gpt-51-como-escolher`, `plataforma-interna-era-dos-agentes`, `retrospectiva-2025-agentes-fora-do-hype`);
qualquer outro `/radar/article/*` → `/noticias/curadoria/` (os externos nunca tiveram página). Saiu o 301
`/radar/` → `/noticias/` da A8 (o passo 2 de `scripts/pos-build.mjs`): `/radar/` agora é o tech radar.

**Coleções:** `radar` (curadoria antiga) virou `curadoria` (só externos, `isExternal: true`); os 4 locais foram para
`insights` sem os campos `type/isExternal/link/source`; `techRadar` virou `radar` (pasta `src/content/radar/`);
`insights` ganhou `publicos` opcional; nova coleção `paginas` (hoje só `sobre`).

**Por que a curadoria não foi para `noticias`:** o formato não cabe (notícia exige `porQueImporta`, `fonte` com data,
`apuradoEm`, `base`, temas da taxonomia) e a A6 proíbe notícia com data anterior a 23/11 — os 12 itens nunca iriam ao ar.

**Públicos:** Liderança (A), Quem executa (B), Empresa com TI enxuta (C), Empresa sem TI (D); slugs de URL
`lideranca`, `quem-executa`, `ti-enxuta`, `sem-ti` (`PUBLICO_SLUGS` em `src/lib/temas.ts`). Em Notícias, o público
vem das chaves preenchidas de `porQueImporta`. Em Artigos, de `publicos` no frontmatter ou, sem ele, do eixo
(`PUBLICOS_DO_EIXO` em `src/lib/eixos.ts`: engenharia → A+B, negócios → C+D, bastidores → A+B). Bastidores vira a
tag `bastidores` (derivada do eixo; não precisa repetir no frontmatter).

**Ferramentas — o que ficou fora:** o Business Game não tem nenhuma evidência no repositório do site (nem página, nem
URL, nem texto), então não entrou. Outros servidores MCP também não: só o rt2026 tem endereço e artigo.

Conferido em 16/11 num build de verificação no CI (run 43985819614, revertido em seguida), com notícias, análise,
radar e sobre publicados: menu com as cinco seções e as duas chamadas; rodapé com as seções, Sobre e Trabalhe comigo;
disco do radar com quadrantes, blips numerados, "Novo nesta edição" e "Desceu de anel · antes: Experimentar",
evidências das notícias; filtros de Notícias e Artigos; análise linkando `/sobre/`; `_redirects` com os 301; sitemap
com `/radar/`, `/ferramentas/`, `/sobre/` e `/noticias/curadoria/`.

### Pendências da reorganização (Gustavo)

- **Revisar o texto do `/sobre`** (`src/content/paginas/sobre.md`) e tirar o `rascunho: true`. Base: PR #7 (fechado),
  partes Trajetória, Formação (a acadêmica) e "três provas", ajustadas para liderança de tecnologia. Os fatos vieram
  do PR e não foram confirmados por ele (cargo, três squads, pricing do varejo automotivo, OAB/MS, Porto Hack Santos
  2025, "SQL Server de 2009" virou "sistema legado"). Ficaram de fora os cards de produto do PR (curso, workshop,
  mentoria), porque não existem no site. Enquanto for rascunho, `/sobre/` redireciona para `/#about` e o rodapé e as
  análises apontam para `/#about`.
- **Mapeamento eixo → público** dos artigos (`PUBLICOS_DO_EIXO`): provisório. Para um artigo específico, basta pôr
  `publicos: ["A", "C"]` no frontmatter.
- **Business Game:** se for para entrar em Ferramentas, mandar a URL pública e uma linha do que é.
- Copy nova, curta, a confirmar: deck de Ferramentas, deck do Radar, rótulos "Para quem"/"Tema" dos filtros, aviso
  nas páginas dos eixos ("Os textos agora ficam em Artigos, com filtro por público"), texto da curadoria em arquivo,
  "Quem é Gustavo Lopes" no fim da análise, e o card "Conteúdo & Insights" da home (`Services.tsx`), que agora diz
  "Ler os artigos" e aponta para `/insights` (antes "Acessar o Radar" → `/radar`).
- A seção "Eixos" da home (`Eixos.tsx`, "O que eu escrevo, e para quem") ainda apresenta os três eixos e linka as
  páginas de filtro. Decidir se ela passa a mostrar as seções novas.
- Topo: "Contato" (mailto) saiu do cabeçalho para dar lugar a Newsletter e Trabalhe comigo; o e-mail segue no rodapé.

## Estratégia v2 (16/11/2026): Notícias, Análise da semana e Radar

Branch `recalibracao-v2`. Três seções novas, escritas pelo agente de marketing (`mkt-agent`) a partir da base de
conhecimento (`mkt-branding-gusflopes: content/base/`). Decisões do Gustavo em 16/11/2026 (A1–A8 e B3 do plano da
recalibração) já estão no código. O site começa limpo em 23/11: os exemplos do repo são `rascunho: true` com data
anterior ao início, então não vão ao ar mesmo se alguém tirar o `rascunho`.

### Decisões de 16/11 aplicadas aqui

| # | Decisão | Onde está |
|---|---|---|
| A1 | O agente publica notícias no site. Notícia individual sai `noindex, follow` e fora do sitemap nas primeiras 8 semanas; o índice `/noticias/`, a página da semana e a análise ficam indexados. Só vira notícia publicada item com score ≥ 12 (regra do agente, não do site). | `politicaNoticias.noindexAte` em `src/config/site.ts` (hoje `2027-01-18`, comparado com a data do build); `noticiaSemIndice()` em `src/lib/noticias.ts`; `scripts/pos-build.mjs` tira páginas noindex do sitemap |
| A4 | Reforma Tributária: só o fato e o link para o simulador, sem explicar regra. | Notícia com tema `fiscal-br` e análise com bloco `fiscal-br` mostram a caixa "Abrir o Simulador da Reforma Tributária" (UTM `utm_content=noticia-<slug>` / `analise-<id>`) |
| A6 | Sem notícias retroativas. | `politicaNoticias.inicio = 2026-11-23`: notícia/análise com `date` anterior nunca entra no build de produção |
| A7 | Tema `agentes` dividido em `agentes-negocio` e `agentes-engenharia` (revisão em 20/12). | `src/lib/temas.ts`; os exemplos foram migrados |
| A8 | ~~`/tech-radar/` separado; `/radar/` → `/noticias/`~~ (substituído pela reorganização de 16/11: o tech radar é `/radar/`, a curadoria antiga está em `/noticias/curadoria/`); assinatura "Agente de IA do Gustavo Lopes · Não revisado / Revisado por Gustavo em dd/mm"; JSON-LD e `article:author` com o site (Organization gusflopes.dev) como autor quando a assinatura não é do Gustavo. | `Default.astro` (`autoria`, menu), `Header.tsx`, `Footer.tsx`, `public/_redirects`, `textoAssinatura` em `src/lib/temas.ts` |
| B3 | Deploy a cada push no `main`, com portão. | `.github/workflows/deploy.yml` + `scripts/ci/deploy-liberado.sh` (ver "Deploy" abaixo) |

### Encaixe (o que foi decidido)

- **`/noticias/`** — volume diário (~25–40 por semana). Índice compacto agrupado por semana ISO (as 4 semanas mais
  recentes inteiras; as anteriores numa lista), uma página por semana em `/noticias/semana/<aaaa>-w<ss>/` e uma página
  por notícia em `/noticias/<slug>/`. Feed próprio em `/noticias/rss.xml` (fora do `/rss.xml` geral, para não afogar
  os textos autorais). Sem tela gerada por notícia (volume): imagem é opcional e só com crédito.
- **`/analise/`** — Análise da semana (sexta): tese, "a semana em 3 linhas", ~5 temas ligados, leitura por público e
  as notícias citadas. Rota `/analise/<aaaa>-w<ss>/`. Entra no `/rss.xml` geral. Assinatura com transparência
  (`gustavo` | `agente-revisado` | `agente`).
- **`/radar/`** — tech radar no estilo Thoughtworks: edição trimestral com ajustes mensais, uma por arquivo; `/radar/`
  mostra a mais recente e `/radar/<aaaa>-<mm>/` as anteriores. Disco com quadrantes (Técnicas, Ferramentas,
  Plataformas, Modelos) e anéis (Adotar, Experimentar, Avaliar, Evitar), blips numerados com marca de novo ou de
  mudança de anel, e a lista por quadrante (a mesma numeração) com justificativa, "antes: <anel>" e as notícias que
  servem de evidência — a lista é o que o leitor de tela e o celular leem. **Desde 19/11/2026, em duas etapas:**
  (1) diagnóstico do perfil da empresa (`src/components/DiagnosticoPerfil.tsx`: 5 perguntas, cada uma uma lente —
  o que o cliente compra, DDD, Wardley/Team Topologies, DevOps, orçamento) e (2) o radar lido para o perfil. Perfis
  (`VISOES` em `src/lib/temas.ts`): `nativa` (Nativa digital), `diferencial` (Digital como diferencial), `suporte`
  (TI de suporte), `contratada` (Tecnologia contratada). Eles substituíram as visões de 16/11 (tecnologia /
  ti-enxuta / sem-ti), que misturavam papel de pessoa com tipo de empresa; os públicos A–D das notícias continuam.
  `#perfil=<id>` abre o perfil (`#visao=` antigo vale) e o perfil fica lembrado no navegador; `#<id-do-blip>` abre o
  blip (link vindo da notícia). Até 16/11 a rota era `/tech-radar/` (301).
- **Curadoria antiga** (12 itens): 4 textos autorais em Artigos, 8 links externos em `/noticias/curadoria/`
  (arquivo, sem item novo). Notícias herdou o papel de "diário de bordo" e o desenho.
- **Publicado:** `src/lib/publicado.ts`: `rascunho: true` → fora do build de produção (sem página, RSS, sitemap nem
  menu); data futura também fica fora. Notícia e análise têm ainda o corte de início (A6, `getNoticias`/`getAnalises`).
  No `pnpm dev` tudo aparece com a marca "Rascunho".
- Vocabulário (temas, públicos, visões, anéis, quadrantes) em `src/lib/temas.ts`, espelhando
  `content/base/taxonomia.yaml` do repo da marca. Tema novo na taxonomia entra aqui no mesmo dia; id em uso não se renomeia.
- Build de checagem no GitHub Actions (`.github/workflows/build.yml`: push em branch que não é `main` e PR; sem
  deploy, sem segredo). O pod não roda build do site.

### Deploy (B3)

- `.github/workflows/deploy.yml`: push no `main` (e `workflow_dispatch`) → portão → `pnpm build` → `wrangler deploy`
  (site estático **e** o Worker de `/api/*`; migração de D1 continua manual) → move a tag `deploy-producao`.
- **Portão** (`scripts/ci/deploy-liberado.sh`): para cada commit da linha principal desde a tag `deploy-producao`,
  libera se ele mexe só em `src/content/**` **ou** se é do Gustavo (autor `gustavo@gusflopes.dev` ou
  `gusflopes86@gmail.com`, variável de repo `DEPLOY_AUTORES` para trocar, e sem o trailer `Co-Authored-By: Claude`).
  Mudança de código feita com o Claude entra por merge do Gustavo (o commit de merge é dele). Commit recusado trava os
  deploys seguintes até o Gustavo resolver: rodar o workflow pela tela com `forcar: true`, ou reverter.
- Autor de commit é convenção (o token do agente é da conta do Gustavo); a barreira dura é o ruleset do `main` (B1) e o
  `scripts/site-publish.sh` do mkt-agent, que só empurra `src/content/**`.
- **Segredos** (Settings → Secrets and variables → Actions): `CLOUDFLARE_API_TOKEN` (permissão de editar Workers na
  conta) e `CLOUDFLARE_ACCOUNT_ID`. Sem eles o job falha no primeiro passo com a lista do que falta, sem publicar nada.
- O deploy manual (`pnpm run deploy`) continua valendo e não move a tag.

### Contrato com o agente de marketing

Quem escreve: o agente (`mkt-agent`, skills de notícia/análise/radar). Com `publish: true` na agenda do agente
(aval do Gustavo de 16/11, A1), notícia e análise saem com `rascunho: false` e entram por push direto no `main`
mexendo só em `src/content/**` (`scripts/site-publish.sh` do mkt-agent); o push dispara o deploy. Com
`publish: false`, ficam `rascunho: true` ou no staging da marca. O que é do agente, não do site: score ≥ 12 para virar
notícia, janela de veto de 12h na página Produção para opinião em 1ª pessoa (A2), no máximo 3 fatos da fonte e
"por que importa" com 1–2 públicos.
Datas em ISO `AAAA-MM-DD`; slugs em kebab-case minúsculo; o schema (`src/content.config.ts`) é a fonte da verdade e o
build falha se o frontmatter não bater.

**Notícia** — `src/content/noticias/<AAAA>/<MM>/<slug>.md` (ano e mês da publicação no site; o `slug` é o do item da
base e vira a URL `/noticias/<slug>/`, então precisa ser único no repo inteiro e não pode ser `curadoria` nem
`semana`, que são rotas fixas). O filtro por público de `/noticias/` usa as chaves preenchidas de `porQueImporta`.

```yaml
title: "Sujeito + verbo + o que muda"        # até 100 caracteres (alvo ~70)
excerpt: "Lead em uma frase"                  # até 320 caracteres (~40 palavras)
date: "2026-11-23"                            # publicação no site
temas: ["agentes-negocio", "plataformas"]     # 1–3 ids de TEMA_IDS; o 1º é o principal
ferramentas: ["mcp"]                          # ids da taxonomia (ligam ao tech radar); opcional
porQueImporta:                                # pelo menos um público; só os com relevância ≥ 2
  A: "Liderança: ..."
  B: "Quem executa: ..."
  C: "Empresa com TI enxuta: ..."
  D: "Empresa sem TI: ..."
fonte:                                        # a primária sempre que existir
  nome: "AWS"
  url: "https://..."
  data: "2026-11-20"                          # quando a fonte publicou ("conforme publicado em AWS em 20/11")
  tipo: primaria                              # primaria | imprensa | agregador (agregador nunca é a principal)
outrasFontes: []                              # mesma forma de `fonte`; opcional
apuradoEm: "2026-11-23"                       # quando o agente conferiu o fato na fonte
base: "<slug-do-item-na-base>"                # vínculo de volta (vinculos.noticias no item)
correcoes: []                                 # [{ data, texto }] — aparece como "Corrigido em dd/mm"
assinatura: agente                            # padrão; agente-revisado (exige revisadoEm) | gustavo (só texto dele)
revisadoEm: "2026-11-23"                      # obrigatório com agente-revisado
image: { src: "https://...", alt: "...", credito: "Divulgação X" }   # opcional; só capa própria ou imagem oficial com crédito
rascunho: false                               # true enquanto publish: false
```

Corpo: 2 a 4 parágrafos curtos, reescritos com as palavras da casa (nunca cópia da fonte), número sempre com a
origem ("segundo a empresa"). Tema `fiscal-br` (Reforma Tributária): só o fato, sem explicar regra nem fazer conta; a
página põe o link do simulador (A4). `date` não pode ser anterior a 2026-11-23 (A6). A linha "Conforme publicado em <fonte> em dd/mm", o "Por que importa" e o rodapé
(tema, ferramentas, apuração, outras fontes, semana) são montados pela página — não repita no corpo.

**Análise da semana** — `src/content/analises/<aaaa>-w<ss>.md` (semana ISO em minúsculas; rota `/analise/<aaaa>-w<ss>/`).

```yaml
title: "A tese da semana"
excerpt: "Subtítulo"
semana: "2026-W47"                            # semana ISO coberta
date: "2026-11-27"                            # a sexta da publicação
duration: "7 min"
emTresLinhas: ["...", "...", "..."]           # 1–3 linhas
temas:                                        # 1–6, na ordem do texto (alvo: 5)
  - titulo: "Título do bloco (igual ao H2 do corpo)"
    tema: custo-e-precificacao                # id de TEMA_IDS
    noticias: ["<slug-da-noticia>"]           # só notícias publicadas viram link; rascunho some sem quebrar
assinatura: agente                            # gustavo | agente-revisado (exige revisadoEm) | agente
revisadoEm: "2026-11-27"                      # obrigatório com agente-revisado
base: ["<slug>", "..."]                       # itens da base usados
newsletter: 12                                # nº da edição que levou o texto, quando houver; opcional
image: { src, alt, credito }                  # opcional
rascunho: true
```

Corpo: um `##` por tema, na ordem de `temas`, com a "ponte" para o tema seguinte; depois "Leitura por público" e
"O que observar na próxima semana".

**Radar (tech radar)** — `src/content/radar/<aaaa>-<mm>.md` (**mudou em 16/11/2026:** era
`src/content/tech-radar/<aaaa>-<mm>.md`; rota `/radar/<aaaa>-<mm>/`, era `/tech-radar/<aaaa>-<mm>/`; a mais recente
publicada também em `/radar/`; link para um blip: `/radar/#<id>`). Corpo = apresentação curta da edição. Uma edição
trimestral cheia por trimestre; entre elas, ajustes mensais (`tipo: ajuste`), cada um num arquivo do seu mês.

```yaml
title: "Edição de janeiro de 2027"
excerpt: "..."
date: "2027-01-29"
tipo: trimestral                              # trimestral (padrão) | ajuste  (campo novo, opcional)
rascunho: true
blips:
  - id: mcp                                   # id da taxonomia (também é a âncora #mcp)
    nome: "MCP (Model Context Protocol)"
    quadrante: tecnica                        # tecnica | ferramenta | plataforma | modelo
    movimento: novo                           # novo (1ª edição em que aparece) | igual | subiu | desceu
    visoes:                                   # perfis de empresa (19/11): pelo menos um; o item pode ficar fora de um perfil
      nativa:      { anel: adotar, texto: "por quê, em uma ou duas frases" }
      diferencial: { anel: experimentar, texto: "...", anterior: avaliar }   # anterior (opcional): anel na edição anterior
      suporte:     { anel: experimentar, texto: "..." }
      contratada:  { anel: avaliar, texto: "..." }
    noticias: ["<slug-da-noticia>"]           # evidência (só as publicadas aparecem)
    base: ["<slug-do-item>"]
```

Chave fora dos quatro perfis quebra o build (schema `strict`). O texto de cada perfil responde ao que ele faz: a
nativa constrói, a diferencial constrói em volta do legado e passa pela auditoria, a de suporte configura o que já
tem (e ganha com agentes em processos sem time de software), a contratada compra e exige do fornecedor.

Mudança de anel é por perfil: preencha `anterior` no perfil que mudou (a página mostra "Subiu/Desceu de anel · antes:
<anel>" e o blip com contorno tracejado). `movimento: novo` vale para o blip inteiro (contorno cheio) e ignora
`anterior`. Sem `anterior` e com `movimento: subiu|desceu`, a página mostra só "Subiu/Desceu de anel".

**Curadoria (arquivo)** — `src/content/curadoria/` é só leitura: a produção não escreve aí.

**Artigos** — `src/content/insights/<slug>.md`, rota `/insights/article/<slug>/` (sem mudança de caminho). Campo novo
opcional `publicos: ["A", "B"]` (sem ele, vale o padrão do eixo).

Depois de publicar, o agente grava o vínculo de volta no item da base (`vinculos.noticias` / `analises` / `radar`) e
muda o status do item para `publicado`. UTM não é responsabilidade do site: os links das redes já chegam com UTM.

### Pendências desta frente

- **Gustavo:** criar os segredos `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` no repo; mergear a
  `recalibracao-v2` no `main` (o merge é dele, então o portão libera); aplicar o ruleset do `main` (B1).
- Desligar o GitHub Pages do repo (branch `gh-pages`, deploy na fila desde 26/04), para não haver duas origens.
- Em ~18/01/2027 (fim das 8 semanas de noindex): decidir a regra de indexação depois do corte (ex.: só notícia com
  150 palavras ou mais) antes de deixar a data passar; hoje, passada a data, o próximo deploy indexa todas.
- Nome da newsletter "Radar de IA" ainda em aberto (conflito com o Radar, agora o tech radar em `/radar/`).
- Conferido em 16/11 num build de verificação no CI (run 43982070126, revertido em seguida): notícia com
  `noindex, follow`, autor `gusflopes.dev` no JSON-LD e em `article:author`, assinatura "Revisado por Gustavo em
  dd/mm", caixa do simulador em `fiscal-br` (notícia e análise), sitemap sem notícias individuais e sem `/radar/`,
  `_redirects` com o 301, menu e rodapé com Notícias no lugar do Radar; página da semana e índice indexados.
- Faixas de abertura (`noticias`, `analise`, `tech-radar` — usada por `/radar/` —, `ferramentas`, `sobre`) estão no gerador de telas; revisar visualmente no `pnpm dev`.
- Com centenas de notícias, avaliar paginação do arquivo de semanas e do RSS (hoje: 100 mais recentes).

---

## Importante — qualidade que afeta o produto

### 3. Imagens locais otimizadas com `<Image />`

Todas as imagens de conteúdo ainda vêm de `images.unsplash.com` (20 referências no frontmatter; schema usa `z.string().url()`). `ImageWithFallback` é `<img>` puro, sem `loading="lazy"` nem srcset. Caminho: baixar para `src/assets/`, trocar o schema para o helper `image()` do Astro e renderizar com `astro:assets` `<Image />`. Atenção: os cards são React islands — pode exigir pré-otimizar no `.astro` e passar URLs processadas via props.

### 4. ~~Foto real do autor~~ — feito em 03/10 (`src/assets/autor.jpg`, do avatar do Bluesky) nos dois shells de artigo; falta Hero/About

O author footer de `RadarArticlePage.tsx` (~linha 124) e `InsightArticlePage.tsx` (~linha 122) ainda usa `<div>` com gradient placeholder no lugar do avatar. Adicionar `src/assets/author.jpg` e substituir nos dois shells (e considerar usar também no Hero/seção About).

### 5. OG image própria

`public/og-default.jpg` existe, mas artigos usam a imagem Unsplash como `og:image`. Considerar OG images geradas por artigo (satori/`astro-og-canvas`) com a identidade da marca (slate-950 + laranja + serif).

### 6. Página `/sobre` dedicada

Nav aponta para `/#about` (seção da home). Uma página própria permite bio expandida, trajetória, foto e JSON-LD `Person` — importante para o posicionamento de especialista. Mesmo raciocínio para `/trabalhe-comigo` (hoje `/#consulting`): landing focada em conversão para consultoria de adoção de IA.

### 7. Copy button em code blocks

Os 8 insights têm code blocks (Shiki, tema default). O botão "copiar" do design antigo era fake e foi removido — vale reintroduzir de verdade: island pequeno (ou script vanilla no shell) que injeta botão de copy em `pre > code`. Aproveitar para alinhar o tema do Shiki à paleta (ex.: `markdown.shikiConfig.theme` no `astro.config.mjs`).

### 8. ~~Dados estruturados (JSON-LD)~~ — feito em 03/10 (Person em todas as páginas, WebSite na home, BlogPosting nos textos e edições)

Nenhuma página emite JSON-LD. Adicionar `Article` (com author/datePublished) nas páginas de artigo e `Person`/`WebSite` na home — barato e relevante para a estratégia de autoridade.

---

## Cleanup técnico (sem urgência)

### 9. Aliases versionados (herança Figma export)

Continuam: `astro.config.mjs` mantém ~35 aliases `'<pkg>@<versão>' → '<pkg>'`, usados por 41 arquivos em `src/components/ui/*`. Codemod com sed (`'<pkg>@<version>'` → `'<pkg>'`) e apagar o bloco do config.

### 10. Poda de `src/components/ui/`

São 48 primitives, mas o app usa pouquíssimos (button, input e dependências). Remover os não usados reduz superfície de manutenção (e elimina boa parte do item 9 de graça).

### 11. Taxonomia radar × insights

Reavaliar quando o volume crescer: hoje "radar" (curadoria, maioria externa) e "insights" (autoral) estão claros, mas itens locais do radar e insights se sobrepõem conceitualmente. Considerar consolidar em `posts` com `type: article|video|external` se a distinção começar a confundir.

### 12. Páginas de "vibe" opcionais

`/uses`, `/now` — comuns em sites pessoais, opcionais. Só fazer se alimentarem a marca.

---

## Evolução editorial / audiência (próximo ciclo)

- **Página de confirmação/obrigado da newsletter** — hoje o POST cai na página de confirmação do Buttondown; configurar redirect para uma `/obrigado` própria mantém o leitor no site.
- **Arquivo de edições da newsletter** — quando a newsletter tiver edições enviadas, considerar espelhá-las numa rota `/newsletter` (coleção própria ou link para o arquivo do Buttondown).
- **Analytics** — não há nenhum analytics no site. Cloudflare Web Analytics é o caminho de menor atrito (sem cookie banner) para medir o funil conteúdo → assinatura.
- **Cadência de conteúdo** — o pitch promete análise quinzenal; o conteúdo retroativo sustenta isso até Jun/2026. Manter a cadência a partir de agora.

---

## Por que a fase 6 (SSR) continua não feita

O site segue 100% estático (`output: 'static'`). O único form com submit real — newsletter — faz POST direto para o provedor (Buttondown), sem precisar de backend próprio. Adicionar `@astrojs/cloudflare` + `output: "server"` introduziria adaptador SSR, cold start no Worker (versus assets do edge cache) e uma camada de runtime sem benefício atual.

Casos que justificariam revisitar: form de contato/briefing server-side, gated content para assinantes, A/B testing, webhooks. O caminho está pronto: adicionar a integration e mudar o output. O `wrangler.jsonc` já tem `observability.logs.enabled: true` esperando.
