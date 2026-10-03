# Continuar daqui — estado em 27/09/2026 (newsletter e simulador: 02/10)

Documento de passagem para a próxima sessão (humana ou de agente). Leia este arquivo, depois `docs/revisao-site-2026-09.md` e `docs/pauta-editorial.md`.

## Dois projetos, dois repositórios

| | Site principal | Reforma Tributária |
| --- | --- | --- |
| Repositório | este (`gusflopes-website`) | `../reforma-tributaria` |
| No ar em | https://gusflopes.dev | https://reforma-tributaria.gusflopes.dev (landing + leads) e https://mcp.gusflopes.dev/rt2026 (servidor MCP, no ar; chave liberada automaticamente) |
| Deploy | manual: `pnpm run deploy` (não há build ligado ao Git; push não publica) | `pnpm deploy:web` e `pnpm deploy:mcp` na raiz daquele repo |
| Papel | marca pessoal, 3 eixos editoriais | campanha "opte até 30/09, decida até 30/11", newsletter nº 1 e simulador |

Ligação entre os dois:
- **Newsletter (desde 02/10):** Radar semanal no Substack. `newsletter.substack` em `src/config/site.ts` — vazio, o CTA leva para `/newsletter` ("inscrições em breve"); preenchido, vai para `<substack>/subscribe`. O site guarda o arquivo (`src/content/newsletter/`), espelhado do marketing por `scripts/importar-newsletter.py`. Kit e checklist: `../marketing-brands/gusflopes/content/newsletter/substack.md`.
- O site promove a **ferramenta** (`/simulador`: diagnóstico + motor oficial), não a campanha do Simples: faixa na home, rodapé, hub de Bastidores. Atalhos `gusflopes.dev/reforma` e `/simulador` vão para o simulador (`public/_redirects`).
- O eixo **Bastidores** usa a reforma como case (artigos 37 e 38); o conteúdo tributário em si fica na landing.
- UTMs: do site para a landing `utm_source=gusflopes.dev`; da landing para o site `utm_source=reforma-tributaria`.

Pauta de publicação da demonstração de IA (artigos, shorts e vídeos, com calendário até 30/11): `docs/pauta-ia-reforma.md`.

## Onde está cada coisa

- `main` (publicada em 26/09): evolução de marca + hotfix da newsletter.
- `feat/conteudo-eixos` (worktree `.worktrees/conteudo`, **não publicada**): tudo abaixo, pronto para revisão.
  - Eixos: **Engenharia & IA** (`/engenharia`), **Negócios** (`/negocios`), **Bastidores** (`/bastidores`); campo `eixo` no schema (`src/lib/eixos.ts`), filtros, RSS por eixo, seção na home.
  - Correções técnicas: hero em AVIF/WebP (home de 17 s → 3 s de LCP no celular), og 1200×630 `.jpg`, fontes self-hosted, 404 real, bio nova, política de privacidade corrigida, redes no rodapé, botões laranja com texto escuro (contraste 6,85:1).
  - Curadoria de 27/09: publicados 4 artigos novos de Engenharia & IA, 6 de Negócios e 4 de Bastidores (2 com data futura, 28 e 29/09, ficam fora do build até um deploy na data — `src/lib/publicado.ts`). Os outros 13 estão em `docs/rascunhos/`.
  - Linha editorial: Engenharia e Negócios informativos, sem relato pessoal; só Bastidores é pessoal (entender e ensinar IA), sem vitrine de projeto paralelo. Detalhes na skill `.claude/skills/novo-conteudo`.
  - Marcadores `[CONFIRMAR]` restantes: série com o filho (2), `refazendo-meu-site` (1) e `campanha-inteira-com-claude-code` (5, em revisão em outra sessão).
  - Pesquisa com fontes em `docs/pesquisa/` (coding agents, linha do tempo de IA/MCP, negócios, ensino de IA para crianças).
- Branches de trabalho já mescladas na `feat/conteudo-eixos` (podem ser apagadas): `conteudo/eng-a`, `conteudo/eng-b`, `conteudo/neg`, `conteudo/bas`, `conteudo/fix`.

## Para publicar a `feat/conteudo-eixos`

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
