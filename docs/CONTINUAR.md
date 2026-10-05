# Continuar daqui — estado em 27/09/2026 (newsletter e simulador: 02/10; redesign: 04/10; lista própria: 05/10)

Documento de passagem para a próxima sessão (humana ou de agente). Leia este arquivo, depois `docs/revisao-site-2026-09.md` e `docs/pauta-editorial.md`.

## Estado em 05/10/2026 (lista própria de e-mails no ar)

**No ar (deploy de 05/10, validado com inscrição real):** a inscrição acontece no site, não no Substack.
- Formulário (`src/components/InscricaoForm.tsx`) no fim dos textos, em `/newsletter`, nas edições e no rodapé →
  `POST /api/subscribe` no Worker do site (`worker/`, só `/api/*` passa por ele) → D1 **`gusflopes-leads`**.
- Dupla confirmação: e-mail de `newsletter@news.gusflopes.dev` (Cloudflare Email Service) com link HMAC de 7 dias
  (`/api/confirm`); descadastro em `/api/unsubscribe` (botão e one-click). Páginas de retorno em `/newsletter/*`.
- Tabelas: `subscribers` (pending → confirmed → unsubscribed; consentimento e atribuição do 1º cadastro: página,
  eixo, página de entrada, origem, UTM), `emails_sent`, `syncs` (para os jobs de replicação).
- Consentimento `site-2026-10-05.v1`: "newsletter, textos novos do site e avisos de cursos e projetos". Mudou o
  texto do formulário → suba `CONSENT_VERSION` em `worker/src/subscribe.ts`.
- `/assinar` → `/newsletter/` (formulário). O Substack só pelo link direto dele, sem atalho no site.
- Segredos do Worker: `TURNSTILE_SECRET_KEY` (widget compartilhado com a reforma) e `LINK_SECRET`.
- A tabela `newsletter` do D1 da reforma (endpoint antigo `/api/newsletter`) estava vazia em 05/10: nada a migrar.

**Pendências da lista:**
- Replicação para o Substack: job (homelab) gera CSV dos confirmados sem linha em `syncs` (destination `substack`),
  importação manual no painel, job marca como copiado. Sem pressa.
- Motivo para deixar o e-mail e e-mail de boas-vindas (depois dos primeiros números).
- Etapa 2 em andamento: convergir Substack e blog (o que é edição, o que é texto do site, como um aponta para o outro).

## Estado em 04/10/2026 (redesign Pincelada no ar)

**No ar:** a nova identidade visual (direção **Pincelada**): telas pintadas geradas no build a partir do slug
(`scripts/tela/`), claros quentes da Shelfye (papel `#FFF8F2`, creme `#FDEED9`), laranja de detalhe, artigo "menos
decorado" com o header do site, favicon = ícone do Substack. Regras de cor e marca: `PRODUCT.md`; sistema visual:
`DESIGN.md`; histórico das 5 rodadas e das direções: `docs/redesign-versoes.md` e `docs/redesign/HANDOFF.md`
(branch `design/base`). Evolução e Concretismo ficam nas branches `design/evolucao` e `design/concretismo` como
referência (Concretismo deve ser testado no projeto da reforma).

**Pendências do redesign:**
- Publicar as tags `redesign-v*` (comandos no fim de `docs/redesign-versoes.md`; o ambiente da sessão não deixou).
- Vídeo da home: o Gustavo vai gravar um próprio e substituir o da palestra de terceiro.
- Copy pendente de aval: "LER ARTIGO" (Radar) × "Ler Artigo" (Insights); deck do hub Newsletter sem "Radar de IA";
  "Conteúdo & Insights" → "Acessar o Radar"; "Limpar filtros" no estado vazio dos hubs.
- ~~**Fluxo de audiência e captura de e-mail**~~ — feito em 05/10 (ver acima). Registro da discussão: Fluxo desejado: redes → Substack → site; o
  site mostra o trabalho e não manda o visitante embora para o Substack. A abertura da home já leva a ler (branch
  `home/abertura-explorar`, na `main`). Falta decidir:
  - captura de e-mail no próprio site (formulário + consentimento LGPD + origem, Worker da Cloudflare + D1, como o
    `leads-service` da reforma/Shelfye) e convite posterior para o Substack (importação só de quem consentiu);
  - o motivo para deixar o e-mail (guia curto, aviso de textos de um eixo, acesso antecipado a projeto);
  - texto do e-mail de boas-vindas e onde a lista vive (própria × direto no Substack).
- **Análise: convergir Substack e blog** (05/10): o que é edição da newsletter, o que é texto do site, como um
  aponta para o outro. Resolve também a oferta "Conteúdo & Insights" de Serviços (hoje leva ao Radar).
- **Posicionamento pessoal** (05/10): credencial no ar "Líder de tecnologia, com formação em Direito e
  Contabilidade."; discussão completa (ofício × formação, tagline em inglês, LinkedIn, "Sobre") em
  `../mkt-strategy/brands/gusflopes/posicionamento.md`.
- Texto do botão da abertura ("Ler o texto mais recente") e da linha com o título do texto: revisar depois.
- Ideias da crítica final (não feitas): filtros dos hubs compactos no celular; Simulador mais alto na home;
  "próximo texto"/relacionados no fim do artigo; link "pular para o conteúdo"; alvos de toque de 44px no celular.

## Estado em 03/10/2026 (fim da sessão newsletter + simulador)

**No ar (deploy de 03/10):** newsletter Radar de IA no Substack (`gusflopes.substack.com`) com arquivo em `/newsletter`
(edição #1), atalho `/assinar`, Bluesky e Substack nas redes, faixa do simulador na home, `/reforma` e `/simulador` →
simulador, artigo do rt2026 (29/09), política de privacidade com Substack e Cloudflare Web Analytics.

**Commitado, falta deploy do site** (`pnpm run deploy`, só o Gustavo/aval): foto do autor nos artigos, JSON-LD
(Person/WebSite/BlogPosting), edições da newsletter no RSS geral.

**Repo `reforma-tributaria` (commit `8be454b`, sem push nem deploy):** landing reescrita para a ferramenta
(diagnóstico → conector na IA → "converse direto no seu Claude"), sem o texto do Simples/30-09. Antes do
`pnpm deploy:web`: Gustavo revisa o texto da landing (copy). O OAuth do MCP (WorkOS AuthKit) já foi testado pelo
Gustavo com um conector real no Claude e funciona. Publicar em diretório de conectores é opcional e vem depois.

**Rotina da newsletter:** skill `sync-newsletter` (importa do marketing quando a edição fica pronta, valida, coloca o
link do Substack depois do envio, pede o deploy).

**Próxima sessão separada (Gustavo):** conectores e analytics — ver item 0 de "Próximos passos sugeridos".
Redes sociais e bios: repo de marketing, não aqui.

## Dois projetos, dois repositórios

| | Site principal | Reforma Tributária |
| --- | --- | --- |
| Repositório | este (`gusflopes-website`) | `../reforma-tributaria` |
| No ar em | https://gusflopes.dev | https://reforma-tributaria.gusflopes.dev (landing + leads) e https://mcp.gusflopes.dev/rt2026 (servidor MCP, no ar; chave liberada automaticamente) |
| Deploy | manual: `pnpm run deploy` (não há build ligado ao Git; push não publica) | `pnpm deploy:web` e `pnpm deploy:mcp` na raiz daquele repo |
| Papel | marca pessoal, 3 eixos editoriais | campanha "opte até 30/09, decida até 30/11", newsletter nº 1 e simulador |

Ligação entre os dois:
- **Newsletter (desde 02/10):** Radar de IA no Substack. `newsletter.substack` em `src/config/site.ts` — vazio, o CTA leva para `/newsletter` ("inscrições em breve"); preenchido, vai para `<substack>/subscribe`. O site guarda o arquivo (`src/content/newsletter/`), espelhado do marketing pela skill `sync-newsletter`. Kit e checklist: `../marketing-brands/gusflopes/content/newsletter/substack.md`.
- O site promove a **ferramenta** (`/simulador`: diagnóstico + motor oficial), não a campanha do Simples: faixa na home, rodapé, hub de Bastidores. Atalhos `gusflopes.dev/reforma` e `/simulador` vão para o simulador (`public/_redirects`).
- O eixo **Bastidores** usa a reforma como case (artigos 37 e 38); o conteúdo tributário em si fica na landing.
- UTMs: do site para a landing `utm_source=gusflopes.dev`; da landing para o site `utm_source=reforma-tributaria`.

Pauta de publicação da demonstração de IA (artigos, shorts e vídeos, com calendário até 30/11): `docs/pauta-ia-reforma.md`.

## Onde está cada coisa

- `main` (publicada em 26/09): evolução de marca + hotfix da newsletter.
- `feat/conteudo-eixos` — **histórico:** já mesclada na `main` (branch e worktree não existem mais). O que ela trouxe:
  - Eixos: **Engenharia & IA** (`/engenharia`), **Negócios** (`/negocios`), **Bastidores** (`/bastidores`); campo `eixo` no schema (`src/lib/eixos.ts`), filtros, RSS por eixo, seção na home.
  - Correções técnicas: hero em AVIF/WebP (home de 17 s → 3 s de LCP no celular), og 1200×630 `.jpg`, fontes self-hosted, 404 real, bio nova, política de privacidade corrigida, redes no rodapé, botões laranja com texto escuro (contraste 6,85:1).
  - Curadoria de 27/09: publicados 4 artigos novos de Engenharia & IA, 6 de Negócios e 4 de Bastidores (2 com data futura, 28 e 29/09, ficam fora do build até um deploy na data — `src/lib/publicado.ts`). Os outros 13 estão em `docs/rascunhos/`.
  - Linha editorial: Engenharia e Negócios informativos, sem relato pessoal; só Bastidores é pessoal (entender e ensinar IA), sem vitrine de projeto paralelo. Detalhes na skill `.claude/skills/novo-conteudo`.
  - Marcadores `[CONFIRMAR]` restantes: série com o filho (2), `refazendo-meu-site` (1) e `campanha-inteira-com-claude-code` (5, em revisão em outra sessão).
  - Pesquisa com fontes em `docs/pesquisa/` (coding agents, linha do tempo de IA/MCP, negócios, ensino de IA para crianças).
- Branches de trabalho já mescladas na `feat/conteudo-eixos` (podem ser apagadas): `conteudo/eng-a`, `conteudo/eng-b`, `conteudo/neg`, `conteudo/bas`, `conteudo/fix`.

## Para publicar a `feat/conteudo-eixos` (histórico — já feito; vale só o checklist pós-deploy do item 5)

1. Revisar o preview: `cd .worktrees/conteudo && pnpm build && pnpm preview`.
2. Resolver os `[CONFIRMAR]` que restam (`grep -rn CONFIRMAR src/content`).
3. `git checkout main && git merge --no-ff feat/conteudo-eixos && git push && pnpm run deploy`.
5. Depois do deploy: conferir `https://gusflopes.dev/nao-existe` (deve dar 404), `https://gusflopes.dev/reforma` (redirect) e atualizar a prévia no LinkedIn Post Inspector (og mudou para `.jpg`).
   Os artigos de 28 e 29/09 só aparecem com um novo `pnpm run deploy` feito na data.

## Decisões pendentes do Gustavo

1. ~~Contraste do botão laranja~~ — resolvido em 27/09 (texto escuro `#1c0a02`, DESIGN.md atualizado).
2. **Datas retroativas**: mostrar ou não "Escrito em … / publicado aqui em …".
3. **Grok Bot**: qual produto (artigo 35 em espera).
4. ~~CalcJud~~ — resolvido em 27/09: o artigo 5 virou princípio geral, sem citar o produto.
5. **Série com o filho**: artigo de abertura escrito (27/09); falta o relato da sessão do cubo 3D ([CONFIRMAR]). Os próximos saem a cada sessão real. Contas e canal: ver esclarecimentos na pauta.
6. ~~**Analytics**~~ — resolvido em 03/10: o Cloudflare Web Analytics já estava ativo na borda (injeção automática, o mesmo token cobre a landing da reforma; filtre por hostname). A política de privacidade agora cita. GA4 (`G-PKP8H2J89F`) só existe na landing, com consentimento.

## Próximos passos sugeridos

0. **MCPs de analytics neste repo** (`.mcp.json` na raiz). Analytics do site e da landing ficam aqui; métricas das
   redes sociais ficam no repo de marketing (trypost).
   - **Cloudflare Web Analytics** — funcionando desde 03/10: `cloudflare-graphql` → `https://graphql.mcp.cloudflare.com/mcp`
     (OAuth feito, só leitura). Conta `a4ff6f2d957f8687e7841d91cbb83093`; dataset `rumPageloadEventsAdaptiveGroups`
     no nível da conta, agrupar por `requestHost`/`requestPath`. A mesma conta cobre gusflopes.dev, a landing da
     reforma, mcp.gusflopes.dev e outros domínios — sempre filtrar por hostname. O servidor avisa que está
     *deprecated* em favor de `https://mcp.cloudflare.com/mcp` (API inteira); trocar quando ele parar de funcionar.
   - **GA4** (`G-PKP8H2J89F`, só na landing, com consentimento) — funcionando desde 04/10: `google-analytics` →
     `uvx analytics-mcp`, credencial em `~/.config/gcloud/ga4-leitura.json`, projeto GCP `gusflopes-marketing`
     (só leitura). Property `543042928` ("gusflopes-dev"), compartilhada com pessoas., arch-tools.,
     arquitetura-software. e `localhost` (dev polui) — sempre filtrar por `hostName = reforma-tributaria.gusflopes.dev`.
     Em 04/10 a landing tinha só 1 page_view em 90 dias e nenhum evento `click`: cliques de saída para o Substack
     e o simulador ainda não aparecem (conferir medição otimizada/"cliques de saída" na stream e o consentimento).
   - Perguntas que isso deve responder: visitas por página e origem, cliques de saída para o Substack
     (`utm_content` por ponto de clique) e para o simulador.

1. Publicar a `feat/conteudo-eixos` (correções técnicas têm impacto imediato em anúncios: velocidade e prévia de link).
2. Escrever os artigos restantes da pauta: 22 (Pi), 24 (OpenClaw), 25 (Hermes — relato de uso próprio), 27 (Paperclip, como meta-harness), 36 (Jev); 35 (Grok Bot) quando confirmado.
3. Série com o filho: um texto por sessão real, a partir do artigo de abertura.
4. Reescrever Hero/Services da home para falar também com empresários (achado P0 da revisão).

## Regras que valem para todo conteúdo

- Sem anacronismo: nada citado antes de existir na data do artigo (checar `docs/pesquisa/linha-do-tempo-ia.md`).
- Sem experiência pessoal inventada: relato só com `[CONFIRMAR]` até o Gustavo preencher.
- Fatos e números com fonte e link; pesquisas diferentes não se comparam como se medissem a mesma coisa.
- Posicionamento: parceiro da contabilidade e da advocacia; ética OAB (Provimento 205/2021); recomendação condicional.
- Série com o filho: IA pela conta do pai (conta separada para o que fazem juntos), sempre com ele; o canal é da família e já filtrado pelos pais.
