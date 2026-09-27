# Continuar daqui — estado em 27/09/2026

Documento de passagem para a próxima sessão (humana ou de agente). Leia este arquivo, depois `docs/revisao-site-2026-09.md` e `docs/pauta-editorial.md`.

## Dois projetos, dois repositórios

| | Site principal | Reforma Tributária |
| --- | --- | --- |
| Repositório | este (`gusflopes-website`) | `../reforma-tributaria` |
| No ar em | https://gusflopes.dev | https://reforma-tributaria.gusflopes.dev (landing + leads) e https://mcp.gusflopes.dev/rt2026 (servidor MCP, beta fechado) |
| Deploy | manual: `pnpm run deploy` (não há CI; push não publica) | `pnpm deploy:web` e `pnpm deploy:mcp` na raiz daquele repo |
| Papel | marca pessoal, 3 eixos editoriais | campanha "opte até 30/09, decida até 30/11", newsletter nº 1 e simulador |

Ligação entre os dois:
- A newsletter do site é a da reforma: o botão "Assinar Newsletter" leva para a inscrição da landing (o consentimento cobre reforma, tecnologia e IA). Quando houver provedor próprio de newsletter, trocar `newsletter.url` em `src/config/site.ts`.
- Atalhos: `gusflopes.dev/reforma` e `gusflopes.dev/simulador` redirecionam para a landing (`public/_redirects`, nesta branch).
- O eixo **Bastidores** usa a reforma como case (artigos 37 e 38); o conteúdo tributário em si fica na landing.
- UTMs: do site para a landing `utm_source=gusflopes.dev`; da landing para o site `utm_source=reforma-tributaria`.

## Onde está cada coisa

- `main` (publicada em 26/09): evolução de marca + hotfix da newsletter.
- `feat/conteudo-eixos` (worktree `.worktrees/conteudo`, **não publicada**): tudo abaixo, pronto para revisão.
  - Eixos: **Engenharia & IA** (`/engenharia`), **Negócios** (`/negocios`), **Bastidores** (`/bastidores`); campo `eixo` no schema (`src/lib/eixos.ts`), filtros, RSS por eixo, seção na home.
  - Correções técnicas: hero em AVIF/WebP (home de 17 s → 3 s de LCP no celular), og 1200×630 `.jpg`, fontes self-hosted, 404 real, bio nova, política de privacidade corrigida, redes no rodapé.
  - 26 artigos novos (12 Engenharia & IA, 11 Negócios, 3 Bastidores), de jul/2024 a set/2026. **24 têm marcadores `[CONFIRMAR: …]`** onde entra relato pessoal — preencher ou remover antes de publicar.
  - Pesquisa com fontes em `docs/pesquisa/` (coding agents, linha do tempo de IA/MCP, negócios, ensino de IA para crianças).
- Branches de trabalho já mescladas na `feat/conteudo-eixos` (podem ser apagadas): `conteudo/eng-a`, `conteudo/eng-b`, `conteudo/neg`, `conteudo/bas`, `conteudo/fix`.

## Para publicar a `feat/conteudo-eixos`

1. Revisar o preview: `cd .worktrees/conteudo && pnpm build && pnpm preview`.
2. Resolver os `[CONFIRMAR]` (`grep -rn CONFIRMAR src/content`).
3. Decidir o contraste do botão laranja (ver abaixo).
4. `git checkout main && git merge --no-ff feat/conteudo-eixos && git push && pnpm run deploy`.
5. Depois do deploy: conferir `https://gusflopes.dev/nao-existe` (deve dar 404), `https://gusflopes.dev/reforma` (redirect) e atualizar a prévia no LinkedIn Post Inspector (og mudou para `.jpg`).
   Atenção: o artigo 38 tem data 29/09/2026 — se publicar antes, ele aparece já.

## Decisões pendentes do Gustavo

1. **Contraste do botão laranja** (branco sobre #F97316 = 2,8:1, reprova): texto escuro `#1c0a02` (6,85:1, recomendado, igual à landing da reforma) ou laranja `#C2410C` com texto branco (5,18:1). Exige atualizar o DESIGN.md. O texto de introdução da página Bastidores (cinza claro sobre creme) também está com pouco contraste.
2. **Datas retroativas**: mostrar ou não "Escrito em … / publicado aqui em …".
3. **Grok Bot**: qual produto (artigo 35 em espera).
4. **CalcJud**: pode ser citado com nome e detalhes? (artigo 5)
5. **Série com o filho**: artigo de abertura escrito (27/09); falta o relato da sessão do cubo 3D ([CONFIRMAR]). Os próximos saem a cada sessão real. Contas e canal: ver esclarecimentos na pauta.
6. **Analytics**: ligar o Cloudflare Web Analytics (sem cookies) e citar na política de privacidade.

## Próximos passos sugeridos

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
