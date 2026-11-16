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

## Estratégia v2 (16/11/2026): Notícias, Análise da semana e Tech radar

Branch `recalibracao-v2`. Três seções novas, escritas pelo agente de marketing (`mkt-agent`) a partir da base de
conhecimento (`mkt-branding-gusflopes: content/base/`). Nada entra no ar antes do aval do Gustavo: os exemplos estão
com `rascunho: true` e o menu só mostra uma seção quando ela tem algo publicado.

### Encaixe (o que foi decidido)

- **`/noticias/`** — volume diário (~25–40 por semana). Índice compacto agrupado por semana ISO (as 4 semanas mais
  recentes inteiras; as anteriores numa lista), uma página por semana em `/noticias/semana/<aaaa>-w<ss>/` e uma página
  por notícia em `/noticias/<slug>/`. Feed próprio em `/noticias/rss.xml` (fora do `/rss.xml` geral, para não afogar
  os textos autorais). Sem tela gerada por notícia (volume): imagem é opcional e só com crédito.
- **`/analise/`** — Análise da semana (sexta): tese, "a semana em 3 linhas", ~5 temas ligados, leitura por público e
  as notícias citadas. Rota `/analise/<aaaa>-w<ss>/`. Entra no `/rss.xml` geral. Assinatura com transparência
  (`gustavo` | `agente-revisado` | `agente`).
- **`/tech-radar/`** — edição mensal/trimestral, uma por arquivo; `/tech-radar/` mostra a mais recente e
  `/tech-radar/<aaaa>-<mm>/` as anteriores. Lista por anel (adotar, experimentar, avaliar, evitar) em vez do disco
  clássico (lê no celular e no leitor de tela), com abas para as 3 visões: Tecnologia (A+B), Empresa com TI enxuta
  (C), Empresa sem TI (D). `#visao=<id>` abre a visão; `#<id-do-blip>` abre o blip (link vindo da notícia).
- **`/radar/` (curadoria antiga) fica como está**: 12 itens, URLs preservadas, sem item novo. O papel de "diário de
  bordo" passa para Notícias, que herda o mesmo desenho (data na margem, item, tema · fonte). Não reaproveitei o nome
  "Radar" para o Tech radar para não quebrar links nem confundir com a newsletter "Radar de IA". Decisão de menu
  (tirar "Radar" do menu quando Notícias entrar, redirecionar `/radar/` para `/noticias/`) fica para o Gustavo.
- **Publicado:** `src/lib/publicado.ts` ganhou a regra `rascunho: true` → fora do build de produção (sem página,
  RSS, sitemap nem menu). No `pnpm dev` tudo aparece com a marca "Rascunho". Data futura continua fora, como antes.
- Vocabulário (temas, públicos, visões, anéis, quadrantes) em `src/lib/temas.ts`, espelhando
  `content/base/taxonomia.yaml` do repo da marca. Tema novo na taxonomia entra aqui no mesmo dia; id em uso não se renomeia.
- Build validado no GitHub Actions (`.github/workflows/build.yml`: push em branch que não é `main` e PR; sem deploy,
  sem segredo). O deploy de produção continua manual (`pnpm run deploy`).

### Contrato com o agente de marketing

Quem escreve: o agente (`mkt-agent`, skills de notícia/análise/tech radar), sempre numa branch ou commit revisável
neste repo. Toda notícia/análise nasce `rascunho: true` até a regra de publicação automática ser aprovada.
Datas em ISO `AAAA-MM-DD`; slugs em kebab-case minúsculo; o schema (`src/content.config.ts`) é a fonte da verdade e o
build falha se o frontmatter não bater.

**Notícia** — `src/content/noticias/<AAAA>/<MM>/<slug>.md` (ano e mês da publicação no site; o `slug` é o do item da
base e vira a URL `/noticias/<slug>/`, então precisa ser único no repo inteiro).

```yaml
title: "Sujeito + verbo + o que muda"        # até 100 caracteres (alvo ~70)
excerpt: "Lead em uma frase"                  # até 320 caracteres (~40 palavras)
date: "2026-11-23"                            # publicação no site
temas: ["agentes", "plataformas"]             # 1–3 ids de TEMA_IDS; o 1º é o principal
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
image: { src: "https://...", alt: "...", credito: "Divulgação X" }   # opcional; só capa própria ou imagem oficial com crédito
rascunho: true
```

Corpo: 2 a 4 parágrafos curtos, reescritos com as palavras da casa (nunca cópia da fonte), número sempre com a
origem ("segundo a empresa"). A linha "Conforme publicado em <fonte> em dd/mm", o "Por que importa" e o rodapé
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

**Tech radar** — `src/content/tech-radar/<aaaa>-<mm>.md` (rota `/tech-radar/<aaaa>-<mm>/`; a mais recente publicada
também em `/tech-radar/`). Corpo = apresentação curta da edição.

```yaml
title: "Edição de janeiro de 2027"
excerpt: "..."
date: "2027-01-29"
rascunho: true
blips:
  - id: mcp                                   # id da taxonomia (também é a âncora #mcp)
    nome: "MCP (Model Context Protocol)"
    quadrante: tecnica                        # tecnica | ferramenta | plataforma | modelo
    movimento: novo                           # novo | subiu | desceu | igual
    visoes:                                   # pelo menos uma; a ferramenta pode ficar fora de uma visão
      tecnologia: { anel: adotar, texto: "por quê, em uma ou duas frases" }
      ti-enxuta:  { anel: experimentar, texto: "..." }
      sem-ti:     { anel: avaliar, texto: "..." }
    noticias: ["<slug-da-noticia>"]           # evidência (só as publicadas aparecem)
    base: ["<slug-do-item>"]
```

Depois de publicar, o agente grava o vínculo de volta no item da base (`vinculos.noticias` / `analises` / `radar`) e
muda o status do item para `publicado`. UTM não é responsabilidade do site: os links das redes já chegam com UTM.

### Pendências desta frente

- Aval do Gustavo para: nomes e ordem no menu, decks das páginas, assinatura "Agente de IA do Gustavo Lopes", destino
  do `/radar/` antigo e a primeira publicação real (tirar `rascunho`).
- Publicação diária exige deploy diário: hoje o deploy é manual (`pnpm run deploy`). Ligar o deploy por GitHub
  Actions (rascunho em `.github/workflows-drafts/deploy.yml`, precisa dos segredos `CLOUDFLARE_API_TOKEN` e
  `CLOUDFLARE_ACCOUNT_ID`) ou Workers Builds no painel da Cloudflare.
- Faixas de abertura (`noticias`, `analise`, `tech-radar`) já estão no gerador de telas; revisar visualmente no `pnpm dev`.
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
