# Handoff do redesign do gusflopes.dev (04/10/2026, fim da rodada 4)

Este documento é o ponto de partida da próxima sessão. Leia nesta ordem: este arquivo, `PRODUCT.md` (seção
"Papéis das cores"), `docs/redesign-versoes.md` e `docs/design-referencias.md`.

## 1. Onde estamos

Há três direções vivas, cada uma na sua branch. Todas estão na versão 4 e receberam **fix** do revisor independente
do Impeccable. A rodada 4 tratou cor como sistema e, pela primeira vez, mudou "o principal" que o dono apontava.

| Direção | Branch | v4 (SHA) | O que é |
| --- | --- | --- | --- |
| Evolução do atual | `design/evolucao` | `4994a37` | O site atual refinado: quadro no hero, Literata, camadas de revista, dois recortes do quadro como passagem |
| Concretismo | `design/concretismo` | `e0f149b` | Poesia concreta / Wollner: tese em blocos de tipo, grade, abertura tipográfica gerada do título |
| Pincelada | `design/pincelada` | `fb4c63f` | Telas geradas no build (seis arquétipos) com a paleta do quadro; OG por artigo |
| Metrô Noturno | `design/metro` | `0d2753a` | **Descartada** pelo dono |

- `design/base` guarda a base comum: PRODUCT.md, a skill Impeccable em `.claude/skills/impeccable/`, a tagline nova e
  estes documentos. As três branches saíram dela, mas o PRODUCT.md de cada uma pode estar atrás. Antes de trabalhar
  numa branch, traga o arquivo: `git checkout origin/design/base -- PRODUCT.md`, num commit próprio.
- O dicionário das 13 versões (tag, SHA, checkout) está em `docs/redesign-versoes.md`.
- **Tags:** foram criadas só localmente, porque o push de tags deu 403 neste ambiente. O dicionário traz os comandos
  para publicá-las.
- **Nada foi para produção.** Deploy é manual (`pnpm run deploy`) e exige aval explícito do dono. Nenhuma PR foi aberta.

## 2. O que o dono decidiu (é lei, já está no PRODUCT.md)

- **Paleta:** azul-escuro `#0B1A33` + laranja `#F97316` são as cores oficiais. O quadro do hero e o Van Gogh são a
  inspiração.
- **Laranja é a cor principal, vivendo em detalhes** pela página inteira: fios, filetes, marcas, datas, estados,
  ações. "Uma página em que o laranja só aparece no botão perdeu a marca."
- **Azul é estrutura e fundo.** Nada de "azulão": blocos azuis em sequência estão proibidos.
- **Claros são obrigatórios no ritmo.** Toda seção escura grande, o rodapé principalmente, chega por transição de
  algo claro.
- **Variedade do quadro.** Paleta de apoio aprovada: petróleo `#457183`/`#315b6f`, ardósia `#648188`/`#7f989a`,
  areia `#aa9c87`, marrom `#907a5f`/`#50372a`, ferrugem `#8a4c1b`.
- **Texto sobre laranja nunca é preto.** Laranja da marca e laranjas claros levam texto azul-escuro (6,19:1). O
  laranja escuro `#C2410C` leva texto branco (5,18:1), em uso pontual. São proibidos `#C2410C` com azul e `#F97316`
  com branco.
- **Copy é protegida.** Tagline: "Tecnologia e negócio, partes do mesmo sistema". O eixo continua "Engenharia & IA".
  Texto novo só com aval e em commit isolado `copy(...)`.
- **Já aprovado:** fundir "Ideias recentes" nos eixos, newsletter no fim de todo artigo, data nas linhas (Concretismo)
  e links de ação em caixa normal (Evolução).

## 3. Foco da próxima sessão (pedido do dono)

1. **Uma sessão de refinamento para as três direções.** Os itens estão na seção 4.
2. **Revisar as paletas claras, principalmente o cinza.** O dono não gosta do papel frio `#F2F4F7` nem da areia
   acinzentada `#D9D4CB`/`#D8D1C4` que entraram na v4. Ele gosta muito da paleta clara da **Shelfye.ai**, que também é
   dele: "o bege ou creme deles é mais bonito que esse cinza".
   - **Onde buscar:** os repositórios estão na conta `shelfye-ai`, que esta sessão consegue listar:
     `shelfye-ai/landing-page`, `shelfye-ai/webapp`, `shelfye-ai/platform`, `shelfye-ai/shelfye` e
     `shelfye-ai/Webappfigma`. O design system deve estar na landing ou no webapp. Anexe com `add_repo` (leitura) e
     procure os tokens (`tailwind.config`, `globals.css`, `tokens`, `theme`). O site shelfye.ai é a alternativa;
     WebFetch costuma estar bloqueado aqui, mas a busca funciona.
   - **Atenção ao conflito com o Impeccable:** ele lista "fundo creme + serifa display + acento terracota" como clichê
     de IA. A preferência do dono vence. O que manda é PRODUCT.md, e "o brief vence" é regra do próprio Impeccable.
     Então: use o bege/creme da Shelfye como o claro do site, atualize a linha "nunca creme" do PRODUCT.md (ela vem de
     uma sugestão do revisor, não do dono) e evite só o resto do clichê: o acento continua laranja, não terracota.
   - Depois de escolher o claro, re-verifique o contraste de todo texto sobre ele (`#C2410C` sobre bege, petróleo
     etc.).

## 4. Pendências por direção (revisores da v4, da mais importante para a menos)

**Comum às três**
- No máximo uma ação laranja chapada por região. O resto vira link `#C2410C` com seta ou fio laranja.
- Levar cor do quadro e laranja de detalhe para **hubs e artigo**. A home está resolvida; as páginas de leitura, não.

**Evolução** (`4994a37`)
1. Hubs e moldura do artigo: um recorte do quadro na base da moldura escura (passagem noite → papel) e a marca do eixo
   com peso real. Hoje é um quadradinho de 6px.
2. Laranja no corpo do artigo sem virar texto laranja: sublinhado dos links em `#F97316`, marcadores, filete nos H2.
3. No índice dos hubs, o fio laranja de largura total por entrada vira fio neutro de 1px com marca laranja de 5px na
   data.
4. Costura reta entre o hero e o primeiro recorte do quadro, no desktop.
5. Dar função à ardósia e ao marrom, que estão no contrato e não aparecem.

**Concretismo** (`e0f149b`)
1. Placa laranja da newsletter repetida (hero, rodapé e caixa do autor): no rodapé vira célula de papel com filete
   laranja e só o botão chapado. Meta: laranja total em cerca de 3%; hoje está em 4,4%.
2. Uma ação chapada por região: os três "Ler…" dos eixos e duas das três ofertas de Serviços voltam a ser links.
3. O campo de ferrugem sem texto em Serviços é enchimento: dar função ou tirar e recompor a escada.
4. Cor do quadro com função no corpo dos hubs.
5. Tirar o confete de quadrados de canto (eixos, vídeo, célula areia).
6. A célula areia do Simulador no desktop está quase vazia.
7. O "&" em `#C2410C` nos títulos fica inconsistente; aplicar em todos ou em nenhum.
8. Encostar duas cores do quadro (quente com frio) carregando conteúdo.
9. Doc: `src-pages-index-astro.md:38` ainda fala em "plano laranja".

**Pincelada** (`fb4c63f`)
1. Vídeo, Ferramenta e quadro original somam uns 2.300px escuros seguidos no meio da home. Pôr o vídeo em papel ou
   areia.
2. No gerador, organizar a cor em zonas grandes, como no quadro, em vez de confete uniforme. Começar pela coluna dos
   eixos: três estratos legíveis.
3. Tirar as "luas garantidas" das telas pequenas (fita, faixa de hub, capa 4:5, vídeo). Discos translúcidos e
   sobrepostos, com traço por cima. Conter as luas no hero mobile.
4. A fita do rodapé hoje é reta e tem luas. Precisa de borda superior pintada e irregular, sem luas, sem o fio laranja
   na emenda e com semente própria por página.
5. Em Serviços, um só botão chapado; os outros dois voltam a ser links. Botões em caixa mista.
6. Capas de ~17% dos artigos estão com petróleo abaixo da meta. `dist/telas` tem 27 MB; vale conferir o peso.

## 5. Como trabalhamos (o que funcionou)

- **Um agente por branch, em paralelo**, cada um na sua worktree (`.worktrees/<direção>`; se o container for novo,
  recrie com `git worktree add .worktrees/<d> design/<d>` e rode `pnpm install`). O brief comum e os briefs das
  rodadas estão em `docs/redesign/briefs/`. Eles citam caminhos do scratchpad antigo; os arquivos equivalentes estão em
  `docs/redesign/`.
- **Revisor independente** depois de cada rodada: o agente `impeccable-finish-reviewer`, com um pacote como o de
  `docs/redesign/briefs/pacote-revisor-rodada4.md`. Os construtores não conseguem abrir o revisor; quem abre é a
  sessão principal.
- **Medição objetiva de cor:**
  - `node docs/redesign/ferramentas/medir-cor.cjs <página-inteira.png>`: dá escuro, claro, laranja, cores do quadro,
    janelas de 900px e maior trecho escuro;
  - `medir-familias-quadro.cjs`: dá as famílias de cor de uma tela ou recorte contra o quadro.
- **Capturas válidas** (`docs/redesign/ferramentas/capturar.mjs` é a base):
  - role lento, 400px a cada 150ms;
  - espere `naturalWidth > 0` em todas as imagens locais;
  - **não bloqueie a rede na captura**, porque isso quebrou a capa da Pincelada;
  - confira que nenhuma imagem saiu como retângulo liso.
  
  Duas revisões foram recusadas por captura inválida.
- **Medições da v4** (home desktop, página inteira):

  | | escuro | claro | laranja | janelas c/ laranja ≥0,5% | janelas c/ cor do quadro | maior escuro |
  |---|---|---|---|---|---|---|
  | site atual | 92% | 1% | 1,5% | 100% | 11% | 578px |
  | Evolução v4 | 32% | 55% | 1,6% | 100% | 80% | 224px |
  | Concretismo v4 | 32% | 48% | 4,4% | 100% | 92% | 143px |
  | Pincelada v4 | 36% | 40% | 1,6% | 100% | 100% | 233px |

- **Referências de "como o bom deveria parecer"**, com uma régua de 13 critérios, 9 direções novas e 24 referências:
  `docs/design-referencias.md`. As maquetes originais das 9 direções estão em `docs/redesign/direcoes-maquetes.html`.

## 6. Lições do dono, para não repetir

- "Mudou o hero, mas o resto continua ruim": cada camada abaixo do hero precisa de gesto próprio. "O hero prende, cada
  camada conquista."
- Composição sem cor como sistema não muda a percepção. As rodadas 2 e 3 mexeram em layout e o dono disse que "o
  principal não mudou".
- No gerador, o segredo do quadro é a **amplitude** e a **variedade de cores**. O padrão "duas bolas + espiral" e o
  monocromático azul foram rejeitados.
- Quando a meta é numérica, o revisor caça "cumprimento de meta" sem papel: campo chapado vazio, confete de laranja.
