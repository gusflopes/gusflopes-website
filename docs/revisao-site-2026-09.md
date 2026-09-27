# Revisão do gusflopes.dev e arquitetura editorial (set/2026)

Data: 26/09/2026. Base: branch `feat/conteudo-eixos`, a partir de `main` em `cf24e10` (merge da evolução de marca "Engenharia e negócio, partes do mesmo sistema").

O documento tem três partes:

1. Revisão do site: medições, achados e prioridades.
2. Arquitetura editorial: eixos, público, tom, formatos, taxonomia e navegação.
3. O que foi implementado nesta branch e o que ficou de fora.

A pauta de artigos está em `docs/pauta-editorial.md`. A base factual (datas de lançamentos, agentes, dados de negócio) está em `docs/pesquisa/`.

---

## Parte 1: Revisão do site

### 1.1 Como medi

- `pnpm install && pnpm build`: build limpo, 17 páginas antes da mudança e 20 depois (3 hubs de eixo + 3 feeds por eixo). Nenhum erro ou aviso.
- Lighthouse `latest`, perfil mobile (padrão: Moto G4 simulado, 4G lento), contra `astro preview` na porta 4410, Chrome local.
- Verificação de links: todos os `href`, `src` e `content` com URL do HTML gerado (84 URLs únicas), via `curl`.
- Conferência manual de `robots.txt`, sitemap, canonical, OG, RSS e do site em produção.

### 1.2 Notas do Lighthouse (mobile, antes das mudanças)

| Página | Performance | Acessibilidade | Boas práticas | SEO | LCP | FCP | CLS |
|---|---|---|---|---|---|---|---|
| `/` | **69** | 94 | 100 | 100 | **17,6 s** | 3,1 s | 0 |
| `/radar` | 77 | 92 | 100 | 100 | 4,5 s | 3,3 s | 0,001 |
| `/insights` | 71 | 92 | 100 | 100 | 6,5 s | 3,2 s | 0 |
| `/insights/article/evals-…` | 84 | 92 | 100 | 100 | 4,3 s | 1,9 s | 0,055 |

Depois das mudanças desta branch, a acessibilidade da home ficou em 94, a de `/insights` em 96 e a de `/radar` em 94. A performance não mudou, porque as causas estão fora do escopo (ver P0-3 e P1-1). O hub `/bastidores` marca SEO 69 de propósito: sem textos, ele sai com `noindex`.

Principais causas:

- **Imagem do hero com 2,8 MB** (`src/assets/326189…png`, PNG), usada como `background-image` com `bg-fixed` na home e de novo na seção Themes. Ela sozinha explica o LCP de 17,6 s. O Lighthouse estima 2,5 MB de economia.
- **Google Fonts bloqueando a renderização**: 3 famílias e 13 pesos, com cerca de 2,4 s de atraso estimado em todas as páginas.
- **Imagens do Unsplash em 1080 px** nos cards, sem `srcset` nem `width`/`height`. São 600 KB evitáveis em `/radar` e `/insights`.
- O logo (PNG de 70 KB) aparece sem dimensões explícitas (`unsized-images`).

### 1.3 Achados por área

**SEO (a base está boa)**

- Estão certos: títulos únicos, `description`, canonical absoluto e coerente com o sitemap (barra final), OG e Twitter completos, `og:type=article` com data nos artigos, `lang="pt-BR"`, `robots.txt` apontando para o sitemap, RSS com `<language>`.
- `public/og-default.png` tem **2,8 MB** (1920×1080 RGBA). WhatsApp e LinkedIn costumam falhar ou demorar a mostrar prévias desse tamanho. O ideal é JPG/WebP de 1200×630 com menos de 300 KB.
- **Soft 404**: `wrangler.jsonc` usa `"not_found_handling": "single-page-application"`, então qualquer URL inexistente responde **200 com a home** (confirmado em produção com `/nao-existe`). Para SEO e para o tráfego pago, falta um `src/pages/404.astro` com `"not_found_handling": "404-page"`.
- Os artigos usam fotos genéricas do Unsplash como `og:image`. Funciona, mas não diferencia nada no feed do LinkedIn. Vale gerar OG por artigo (título e eixo sobre o fundo da marca).
- Falta JSON-LD (`Person` na home e `Article` nos textos). É prioridade baixa, mas ajuda no painel de conhecimento do Google para "Gustavo Lopes".
- A descrição do RSS ainda falava em "futuro da Engenharia de Software". **Corrigido** nesta branch.

**Acessibilidade**

- Contraste (em todas as páginas): o botão laranja `bg-orange-500` com texto branco dá cerca de 2,8:1, abaixo do mínimo de 4,5:1. O mesmo acontece no copyright `text-slate-500` sobre `slate-950`, em metadados `text-slate-400` sobre o creme e no badge laranja do Radar. A correção é de design system: usar `orange-600`/`700` para fundos com texto branco, ou texto `slate-950` sobre `orange-500`. Isso mexe em DESIGN.md, então não alterei.
- Ordem de títulos: `CardTitle` renderiza `h4` em Services, `LatestContent` usa `h3`/`h4` fora de ordem e o footer usava `h4`. **O footer foi corrigido** (agora `h2`); os demais ficaram pendentes.
- Faltava o landmark `<main>` em `/radar`, `/insights` e nos artigos. **Corrigido.**
- Faltava `aria-label` nos campos de busca e `aria-pressed` nos filtros. **Corrigido** em Insights e Radar.

**Links**

- Das 84 URLs, nenhuma está quebrada. A única exceção é `linkedin.com/in/gusflopes`, que responde 999 (bloqueio anti-bot do LinkedIn). Como o próprio `site.ts` tem um TODO dizendo que o handle é suposição, **é preciso confirmar o handle**.

**Newsletter: não funciona**

- O formulário (hero e rodapé) faz POST para `https://buttondown.com/api/emails/embed-subscribe/gusflopes`. **`buttondown.com/gusflopes` e o endpoint respondem 404**: a conta não existe. Quem assina cai numa página de erro do Buttondown e o e-mail se perde.
- A política de privacidade fala em "Google Analytics (ou similar)" e em "Mailchimp/Substack", mas nenhum dos dois existe no site. Para um advogado, uma política que descreve um tratamento que não acontece (e omite o que acontece) é um risco de reputação e de LGPD.
- Não há separação de consentimentos (newsletter técnica × lembretes de negócio). A landing da reforma já faz isso direito (consentimentos separados, D1 e Resend).

**Marca e copy frente ao novo posicionamento**

O posicionamento-alvo é "especialista em Tecnologia e Negócios; advogado, contador e engenheiro de software; aplica Direito e Contabilidade para resolver problemas de negócio com tecnologia e IA". O que o site diz hoje:

- `author.role` = "Tech Lead & Arquiteto de Software" e `author.bio` = "Tech Lead e Arquiteto de Software…". O bio aparece no rodapé de todo artigo e **não menciona Direito, Contabilidade nem negócios**.
- O Hero fala só com público técnico e corporativo ("ampliar autonomia, melhorar o fluxo de entrega"). O empresário, público do eixo Negócios, não se reconhece ali.
- Themes (`#about`) cita o cargo atual numa plataforma de mobilidade do Grupo Volkswagen. Vale confirmar se ele quer essa menção num site que agora também capta empresários e parceiros.
- Services oferece "Consultoria Estratégica", "Mentoria & Formação" e "Conteúdo & Insights", tudo por `mailto:`. Não há oferta para escritórios de contabilidade e advocacia ("ensinar escritórios a construir soluções de IA"), que é a linha de parceria.
- Os 22 textos existentes são todos de engenharia enterprise e .NET. Eles cabem no eixo Engenharia & IA, mas deixam Negócios e Bastidores vazios.
- A copy é consistente em tom (direto, sem juridiquês) e a tipografia e as cores seguem o DESIGN.md.

**Conexão com a landing da Reforma Tributária**

- Antes desta branch, **o site não tinha nenhum link** para `reforma-tributaria.gusflopes.dev`.
- A landing aponta para `https://gusflopes.dev` **sem UTM**. O site também não tem analytics, então hoje é impossível medir o tráfego nos dois sentidos.
- A landing já lê `utm_source`, `utm_medium`, `utm_campaign` e `utm_content` e grava junto do lead (ver `apps/web/src/components/LeadForm.astro` no repo da reforma). Basta o site mandar os parâmetros.
- Convenção adotada (em `src/config/site.ts`, função `comUtm()`):
  - site → landing: `utm_source=gusflopes.dev&utm_medium=site&utm_campaign=simples-30-09&utm_content=<ponto>`, com `<ponto>` ∈ {`home-eixos`, `footer`, `bastidores-hub`, `artigo-<slug>`}. Trocar `projetos.reforma.campanha` quando a campanha mudar (ex.: `simples-30-11`).
  - landing → site (a fazer no repo da reforma): `https://gusflopes.dev/bastidores?utm_source=reforma-tributaria&utm_medium=landing&utm_campaign=simples-30-09&utm_content=rodape`. Melhor apontar para o hub Bastidores ou para o artigo do case do que para a home.
  - Anúncios pagos apontam **só para a landing**, nunca para o site principal. O site recebe tráfego pago só por consequência.
- Por ética da OAB, a cross-promo no site trata a reforma **como case técnico** ("Projeto em produção… construído com Claude Code"). Não há CTA do tipo "opte agora" no site principal.

### 1.4 Prioridades

**Antes de qualquer tráfego pago nesta semana (P0)**

A landing é o destino dos anúncios, mas o link "gusflopes.dev" dela leva gente ao site, e é aí que se forma a credibilidade.

1. **Newsletter**: criar hoje a conta Buttondown com o username `gusflopes` (cerca de 5 min) e testar um envio real. Se não der, **esconder o formulário** (`Hero` e `Footer`). Formulário que termina em 404 é pior do que não ter formulário.
2. **Política de privacidade**: reescrever para refletir o que existe (Buttondown como operador, Cloudflare como hospedagem, sem Google Analytics). Linkar a política da landing para os dados da campanha.
3. **Imagem do hero**: converter para AVIF/WebP em até 1600 px (cerca de 150–250 KB), servir via `astro:assets` ou `<picture>` e tirar o `bg-fixed` no mobile (ele não funciona no iOS e força repaint). A troca é de um arquivo e deve levar o LCP da home de 17,6 s para menos de 4 s.
4. **`og-default.png`**: reexportar em 1200×630, JPG, com menos de 300 KB.
5. **`author.bio` e `author.role`**: alinhar ao posicionamento, por exemplo: "Especialista em Tecnologia e Negócios. Advogado, contador e engenheiro de software: uso Direito, Contabilidade e IA para resolver problemas de negócio complexos." Isso aparece em todo artigo.
6. **Link de volta da landing** para `gusflopes.dev/bastidores` com UTM (repo da reforma).
7. Confirmar o handle do LinkedIn.

**Logo depois, nas próximas 2–4 semanas (P1)**

1. Fontes: self-host (`@fontsource` ou arquivos em `public/`) e cortar para 2 pesos por família, com `preload` do serif do título. Ganho estimado de 2 s no FCP.
2. Página 404 real + `not_found_handling: "404-page"`.
3. Analytics sem cookie: Cloudflare Web Analytics (grátis, sem banner). É o que permite ler as UTMs no site.
4. Contraste do laranja no design system (DESIGN.md → `primary` para texto branco = `orange-600`/`700`).
5. Publicar os primeiros textos de Negócios e Bastidores (ver a pauta). Enquanto isso, o menu esconde eixo vazio e o hub vazio sai com `noindex` (já implementado).
6. Revisar o Hero e o Services para falar também com empresário e escritório (ver Parte 2).
7. `srcset` e dimensões nas imagens de card; considerar trocar o Unsplash por capas geradas no padrão da marca.

**Depois (P2)**

- JSON-LD `Person` e `Article`.
- OG por artigo gerado no build (Satori ou `astro-og-canvas`).
- Newsletter segmentada por eixo: Buttondown tem tags, e os feeds `/<eixo>/rss.xml` já existem para RSS-to-email.
- Limpar os aliases herdados do Figma no `astro.config.mjs` e os componentes `ui/` sem uso (o `tsc` acusa 89 erros de resolução só neles).

---

## Parte 2: Arquitetura editorial

### 2.1 Princípio

A marca diz "Engenharia e negócio, partes do mesmo sistema". Os eixos são **as portas de entrada desse sistema para três leitores diferentes**, e cada um responde "para quem é este texto?". O formato (Radar = curadoria comentada; Insights = texto autoral) responde "que tipo de texto é?". Os dois são **ortogonais**: todo item tem um eixo e um formato.

### 2.2 Os três eixos (nomes finais sugeridos)

| | **Engenharia & IA** | **Negócios** | **Bastidores** |
|---|---|---|---|
| Slug / rota | `engenharia` → `/engenharia` | `negocios` → `/negocios` | `bastidores` → `/bastidores` |
| Público | Engenheiros, tech leads, arquitetos, CTOs | Empresários, gestores, sócios de escritórios de contabilidade e advocacia | Os dois públicos, mais curiosos e pais |
| Promessa | Agentes, coding agents, modelos e arquitetura, testados na prática, com código e critério | IA aplicada à economia real: vendas, operação, GTM, decisões com números | Projetos reais do problema ao deploy: o que funcionou, o que quebrou, quanto custou |
| Tom | Técnico, opinativo, com código e comparação honesta | Direto, sem jargão técnico nem juridiquês, com números e "o que fazer segunda-feira" | Primeira pessoa, diário de bordo, com números reais e erros admitidos |
| Formatos | Análise de lançamento (Radar), tutorial/guia, comparativo, ensaio de arquitetura | Guia de decisão, caso com métrica, roteiro de adoção, "o que perguntar ao fornecedor" | Relato de projeto em série (parte 1/2/3), making-of, vídeo + texto (série família) |
| Frequência alvo | 2 por mês | 1–2 por mês | 1 por mês, mais séries pontuais |
| CTA | Newsletter e GitHub | Contato / diagnóstico, parceiros | Projeto ao vivo (landing, MCP) e YouTube |

**Por que "Bastidores"** e não "Showcase":

- É pt-BR natural e já comunica "por dentro, sem maquiagem".
- Cabe tanto no case da Reforma quanto na série com o filho.
- Não soa como portfólio de vendas, o que também ajuda na ética da OAB.

Alternativas consideradas:

- **"Na prática"**: boa, mas genérica e parecida com o que todo blog diz.
- **"Laboratório"**: sugere experimento, não produção.
- **"Casos"**: soa jurídico e comercial.
- **"Oficina"**: simpática, mas menos clara.

**Por que "Engenharia & IA"** e não "Tecnologia & IA": "Engenharia" é a palavra da marca ("Engenharia e negócio…") e sinaliza profundidade para o público técnico. "Tecnologia" fala com todo mundo e, por isso, com ninguém.

**Por que só "Negócios"**: é curto, e a IA está implícita no site inteiro. Se quiser reforçar, use "IA nos Negócios" só como título de página.

### 2.3 Radar × Insights: manter como formato, não como seção principal

- **Radar** = o que aconteceu e por que importa. Curadoria externa comentada ou nota curta autoral, sempre ligada a uma data ou lançamento. É onde entram lançamentos de modelos e agentes.
- **Insights** = texto autoral de fôlego, que não envelhece em uma semana.
- **Bastidores** é sempre autoral. Pode morar em Insights (texto longo) ou no Radar (nota curta de marco do projeto).
- Recomendação de navegação: o menu passa a ser **eixos primeiro**, depois Radar (o "o que há de novo") e Insights (o "todos os textos"). Com o tempo, dá para renomear "Insights" para "Artigos" (mais claro para o empresário). Isso fica para depois, porque muda a URL.
- Não recomendo virar tudo uma coleção só agora. A separação atual funciona, e o hub de eixo já junta os dois formatos.

### 2.4 Taxonomia

Três níveis, do mais fixo ao mais livre:

1. **`eixo`** (obrigatório, enum de 3). Define hub, menu, feed e, no futuro, segmento da newsletter.
2. **`category`** (obrigatório, enum controlada, o "tema"). Agrupamento sugerido:
   - Engenharia & IA: `Arquitetura`, `.NET`, `DevOps`, `IA`, `Agentes`, `Carreira`
   - Negócios: `Estratégia`, `Vendas & GTM`, `Operações`
   - Bastidores: `Casos`, `Família`
   O filtro das páginas é derivado do conteúdo publicado, então tema sem texto não vira pill vazio.
3. **`tags`** (opcional, livre, kebab-case). Para produtos e assuntos transversais: `claude-code`, `mcp`, `pi`, `hermes`, `paperclip`, `roblox`, `gtm-engineering`, `lead-scoring`, `lgpd`, `reforma-tributaria`, `simples-nacional`, `cloudflare`. Ainda não há página de tag; o próximo passo natural é `/tags/<tag>`.

Regras editoriais para as tags:

- Nome de produto sempre como tag, nunca como categoria.
- No máximo 5 tags por texto.
- Tag usada uma vez só é sinal de que sobra.

### 2.5 Navegação e home

- **Menu** (implementado): `[eixos com conteúdo] · Radar · Insights · Trabalhe Comigo · Contato`. "Home" saiu (o logo cumpre o papel) e "Sobre" foi para o rodapé. Eixo sem texto não aparece no menu, então nada leva o visitante a uma página vazia.
- **Home** (implementado): nova seção "O que eu escrevo, e para quem" logo após o Hero, com um card por eixo (público, promessa e texto mais recente). Bastidores aparece mesmo sem texto, apontando para o case da Reforma com UTM.
- **Próximo passo de copy (não implementado)**: o Hero deveria ter dois caminhos explícitos, "Sou da área técnica → Engenharia & IA" e "Tenho uma empresa → Negócios". A newsletter continua como CTA principal, mas com a promessa segmentada.
- **Rodapé** (implementado): links por eixo, Radar, Insights, Sobre e "Projeto: Reforma Tributária" (com UTM).
- **Artigo** (implementado): o cabeçalho mostra `Eixo · Tema · data`, e o eixo linka para o hub.

### 2.6 Datas retroativas: recomendação de transparência

Publicar textos escritos e não publicados com a data em que foram escritos é legítimo. Mas o Wayback Machine, o Google e o RSS mostram quando a página apareceu de fato, e o repositório do site começa em set/2025 (formato atual desde abr/2026). Para não parecer que os textos foram fabricados depois, recomendo:

- Adicionar ao schema um campo opcional `publicadoEm` (data real de publicação no site) além de `date` (data em que o texto foi escrito).
- Nos textos em que as duas datas diferem, mostrar uma linha: "Escrito em mar/2025, publicado aqui em set/2026."
- Não reescrever o texto com informação posterior à data. Se for inevitável, usar uma nota "Atualização (set/2026): …" separada. A pauta foi montada para isso: cada texto só cita o que existia na sua data.

---

## Parte 3: O que foi implementado nesta branch

Commits em `feat/conteudo-eixos`:

1. `feat(conteudo): eixo editorial e tags no schema das coleções`
   - `src/lib/eixos.ts`: fonte única dos 3 eixos (id, rótulo, rota, público, descrição).
   - `src/content.config.ts`: `eixo` obrigatório, `tags` opcional (kebab-case), categorias novas para Negócios e Bastidores.
   - Os 22 itens existentes foram migrados para `eixo: "engenharia"`.
2. `feat(conteudo): hubs por eixo, filtros, nav e cross-promo com UTM`
   - `/engenharia`, `/negocios`, `/bastidores` (`src/pages/[eixo]/index.astro`). O hub junta Insights e Radar local do eixo, reusa o layout editorial claro do Insights e sai com `noindex` quando está vazio.
   - `/<eixo>/rss.xml` e `/rss.xml` com o eixo como categoria (`src/lib/feed.ts`).
   - `/insights` e `/radar` ganham filtro por eixo, com categorias derivadas do conteúdo. O Radar só mostra o filtro de eixo quando há mais de um eixo com itens.
   - Header: menu por eixos ativos, `aria-current` e breakpoint `lg` (o menu cresceu).
   - Home: seção de eixos (`src/components/Eixos.tsx`).
   - Artigos: eixo no cabeçalho, com link para o hub.
   - `site.ts`: `projetos.reforma` e `comUtm()`. Links para a landing com UTM na home, no rodapé e no hub Bastidores.
   - A11y: `<main>` nas páginas, `h2` no rodapé, `aria-label` nas buscas, `aria-pressed` nos filtros, contraste dos elementos novos.
3. `docs: revisão do site e pauta editorial`, com este arquivo e `docs/pauta-editorial.md`.

Para adicionar um texto agora:

```yaml
---
title: "…"
excerpt: "…"
date: "YYYY-MM-DD"
duration: "8 min"
category: "Casos"          # ver agrupamento por eixo em content.config.ts
eixo: "bastidores"         # engenharia | negocios | bastidores
tags: ["claude-code", "mcp"]
image: "https://…"
---
```

Verificação: `pnpm build` passa (20 páginas). O `tsc` não aponta erro nos arquivos alterados (os únicos erros são os preexistentes dos aliases em `src/components/ui/`). O Lighthouse de acessibilidade nas páginas alteradas ficou igual ou melhor.

**Ficou de fora, de propósito:**

- Correções de performance (imagem do hero, fontes) e de contraste do design system: são pequenas, mas são decisões de design ou de assets do dono.
- A página 404 e a troca do `not_found_handling`: mudam a configuração de deploy.
- A newsletter: depende de criar a conta.
- Páginas de tag, `publicadoEm` no schema, renomear Insights para Artigos e reescrever o Hero e o Services.
- `CLAUDE.md` do repo: a tabela de rotas e o exemplo de frontmatter precisam ganhar `eixo`/`tags` e as rotas novas. Fica para quando a branch for aprovada.
