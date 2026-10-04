# Rodada 5: claros da Shelfye + refinamento (comum às 3 branches)

Os briefs anteriores continuam valendo (`docs/redesign/briefs/rodada1-comum.md`, `rodada2.md`, `rodada3.md`,
`rodada4.md`). Onde eles citam caminhos do scratchpad antigo, use os equivalentes em `docs/redesign/` da branch
`design/base` (por exemplo, `docs/redesign/ferramentas/medir-cor.cjs`). Para ler: `git show origin/design/base:<caminho>`.

Copy protegida, sem deploy, sem PR, sem tag (o orquestrador cuida). Commits com coautoria e push da branch no fim. Não
toque nas outras worktrees.

## Por que esta rodada existe
A v4 resolveu cor como sistema na home (os três revisores deram **fix**, não rebuild). Sobram duas coisas, nas palavras
do dono:

1. **"O bege ou creme deles é mais bonito que esse cinza."** O papel frio `#F2F4F7` e a areia acinzentada
   `#D9D4CB`/`#D8D1C4` saem. Os claros passam a ser os da Shelfye.ai (também marca do Gustavo).
2. **Refinamento:** as pendências dos revisores da v4, que estão em `docs/redesign/HANDOFF.md`, seção 4, e repetidas
   abaixo para a sua direção.

## Passo 0: traga o PRODUCT.md (commit próprio)
```
git fetch origin design/base && git checkout origin/design/base -- PRODUCT.md
```
Leia a seção "Papéis das cores", principalmente o item novo **"Claros quentes da Shelfye.ai"**. A linha antiga "nunca
creme" caiu: ela veio de um revisor, e o dono decidiu o contrário. A regra "fundo creme é clichê de IA" do Impeccable
cede ao brief. Evite só o resto do clichê: o acento continua laranja `#F97316`, não terracota, e não entra serifa
display decorativa por causa do creme.

## Passo 1: troca dos claros (commit próprio, antes do refinamento)
| Papel | Antes | Agora |
| --- | --- | --- |
| Fundo claro padrão / leitura | `#F2F4F7` | **`#FFF8F2`** (papel) |
| Campo claro quente (destaque, caixas, claro que antecede o escuro) | `#D9D4CB` / `#D8D1C4` | **`#FDEED9`** (creme) |
| Cartão/célula aninhada sobre papel | fio frio | **`#F9F2EC`** ou **`#EEE7E1`** (mudança de tom) |
| Fio de separação sobre claro | `#D3DAE4` (frio) | fio quente, derivado do papel (algo como `#E6D9C8`), ou nenhum |

- Troque também todo cinza frio derivado do papel antigo (fios, hovers, fundos de input, sombras azuladas sobre
  claro, `color-mix` com o papel). Procure: `grep -rniE "f2f4f7|d9d4cb|d8d1c4|d3dae4|slate|gray-" src`.
- Texto branco/claro sobre noite que hoje usa `#F2F4F7` pode continuar frio ou virar `#FFF8F2`; decida pela direção e
  mantenha um só.
- Meta de gosto: papel e creme se alternam no ritmo (contraste entre eles ~1,08:1, então o salto papel → creme é sutil;
  é o creme que "esquenta" a seção, e o laranja e as cores do quadro continuam fazendo o contraste).
- Na Pincelada, revise no gerador (`src/lib/telas*`) se algum fundo, fita ou borda de tela era pintado com o cinza
  antigo; as emendas tela → papel precisam casar com `#FFF8F2`/`#FDEED9`.

**Contraste (obrigatório, está no PRODUCT.md):**
- `#C2410C` como texto só em papel e creme; em `#EEE7E1` vira `#9A3412`.
- Petróleo como texto: `#315b6f`. `#457183` só em papel ou em tamanho grande.
- Ardósia, marrom `#907a5f` e `#F97316` sobre claro não levam texto.
- Texto secundário: `#475569`. `#64748b` reprova em creme.
- Rode axe e confira; zero falhas sérias.

## Passo 2: refinamento da sua direção
**Comum às três**
- No máximo **uma ação laranja chapada por região**. O resto vira link (`#C2410C` com seta) ou fio laranja.
- Levar cor do quadro e laranja de detalhe para **hubs e artigo**. A home está resolvida; as páginas de leitura, não.

**Evolução** (`design/evolucao`, v4 `4994a37`)
1. Hubs e moldura do artigo: um recorte do quadro na base da moldura escura (passagem noite → papel) e a marca do eixo
   com peso real. Hoje é um quadradinho de 6px.
2. Laranja no corpo do artigo sem virar texto laranja: sublinhado dos links em `#F97316`, marcadores, filete nos H2.
3. No índice dos hubs, o fio laranja de largura total por entrada vira fio neutro de 1px com marca laranja de 5px na data.
4. Costura reta entre o hero e o primeiro recorte do quadro, no desktop.
5. Dar função à ardósia e ao marrom, que estão no contrato e não aparecem.

**Concretismo** (`design/concretismo`, v4 `e0f149b`)
1. Placa laranja da newsletter repetida (hero, rodapé e caixa do autor): no rodapé vira célula de creme com filete
   laranja e só o botão chapado. Meta: laranja total em cerca de 3%; hoje está em 4,4%.
2. Uma ação chapada por região: os três "Ler…" dos eixos e duas das três ofertas de Serviços voltam a ser links.
3. O campo de ferrugem sem texto em Serviços é enchimento: dar função ou tirar e recompor a escada.
4. Cor do quadro com função no corpo dos hubs.
5. Tirar o confete de quadrados de canto (eixos, vídeo, célula areia).
6. A célula areia do Simulador no desktop está quase vazia.
7. O "&" em `#C2410C` nos títulos fica inconsistente; aplicar em todos ou em nenhum.
8. Encostar duas cores do quadro (quente com frio) carregando conteúdo.
9. Doc: `src-pages-index-astro.md:38` ainda fala em "plano laranja".

**Pincelada** (`design/pincelada`, v4 `fb4c63f`)
1. Vídeo, Ferramenta e quadro original somam uns 2.300px escuros seguidos no meio da home (confira também no mobile).
   Pôr o vídeo em papel ou creme.
2. No gerador, organizar a cor em zonas grandes, como no quadro, em vez de confete uniforme. Começar pela coluna dos
   eixos: três estratos legíveis.
3. Tirar as "luas garantidas" das telas pequenas (fita, faixa de hub, capa 4:5, vídeo). Discos translúcidos e
   sobrepostos, com traço por cima. Conter as luas no hero mobile.
4. A fita do rodapé hoje é reta e tem luas. Precisa de borda superior pintada e irregular, sem luas, sem o fio laranja
   na emenda e com semente própria por página.
5. Em Serviços, um só botão chapado; os outros dois voltam a ser links. Botões em caixa mista.
6. Capas de ~17% dos artigos estão com petróleo abaixo da meta. `dist/telas` tem 27 MB; reduza o peso (qualidade
   AVIF/WebP, larguras do srcset) sem perder a textura.

## Metas (não regredir a v4)
Meça com `node docs/redesign/ferramentas/medir-cor.cjs <png>` (o script conta papel e creme como "claro"):
- laranja ≥ 0,5% em ≥ 90% das janelas de 900px na home **e nos hubs e no artigo**; total entre 1,5% e 3%;
- escuro ≤ 55% na home; maior trecho escuro ≤ 600px (desktop e mobile);
- os ~400px acima do rodapé ≥ 50% claros em todo modelo de página;
- cor do quadro ≥ 3% em ≥ 50% das janelas abaixo do hero, agora também em hubs e artigo;
- zero `#F2F4F7`/`#D9D4CB`/`#D8D1C4` em `src` (salvo justificativa escrita no relatório);
- axe sem falhas sérias; contraste AA de todo texto; LCP e peso não pioram (Pincelada: peso cai).

## Verificação
- Primeiro, se a worktree veio de um container novo: `pnpm install`.
- `pnpm build`.
- Capturas válidas com `docs/redesign/ferramentas/capturar.mjs` como base:
  - role lento (400px a cada 150ms);
  - espere `naturalWidth > 0`;
  - **não bloqueie a rede**;
  - nenhuma imagem local pode sair como retângulo liso.
- Rotas: `/`, `/insights/`, `/engenharia/`, `/insights/article/agent-skills-pacotes-de-contexto/`, `/radar/`,
  `/newsletter/`, `/newsletter/radar-semanal-01/`, `/nao-existe/`, em desktop 1366×900 e mobile 390×844, viewport +
  página inteira, em `docs/design-review/` (copie para `.impeccable/review/`).
- Rode `medir-cor.cjs` na home, no insights e no artigo (desktop e mobile) e cole a saída no relatório.
- No máximo 2 rounds de inspeção e correção.
- Atualize `DESIGN.md`, `.impeccable/design.json` e o surface brief com os claros novos.

## Relatório final (curto)
- commits (SHA e uma linha cada);
- tabela de medições v4 → v5 (home, insights, artigo; desktop e mobile);
- itens da seção "Passo 2" resolvidos, e os não resolvidos com motivo;
- onde o creme entrou e por quê;
- riscos para o revisor olhar.
