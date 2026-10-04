---
name: gusflopes.dev — Pincelada
description: Van Gogh como sistema — cada texto ganha uma tela de pinceladas gerada do próprio slug, na paleta inteira do quadro; laranja em detalhes por toda a página, azul-escuro como estrutura, claros (papel e areia) no ritmo.
colors:
  noite: "#0B1A33"
  noite-2: "#13284D"
  linha: "#22385C"
  quadro: "#1F3A66"
  ceu: "#8FB3D9"
  petroleo: "#315B6F"
  petroleo-claro: "#457183"
  ardosia: "#648188"
  ardosia-clara: "#7F989A"
  areia: "#AA9C87"
  marrom: "#907A5F"
  marrom-escuro: "#50372A"
  ferrugem: "#8A4C1B"
  campo: "#D8D1C4"
  nevoa: "#C9D6E6"
  bruma: "#9FB0C6"
  papel: "#F2F4F7"
  papel-2: "#E3E8EF"
  regua: "#CCD5E1"
  tinta: "#0B1A33"
  tinta-2: "#3D4E68"
  corpo-papel: "#1A2740"
  laranja: "#F97316"
  laranja-claro: "#FB923C"
  pessego: "#FDBA74"
  laranja-fundo: "#C2410C"
typography:
  display-hero:
    fontFamily: "Literata Variable, Literata, Georgia, serif"
    fontSize: "clamp(2.4rem, 4vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.015em"
  display-hub:
    fontFamily: "Literata Variable, Literata, Georgia, serif"
    fontSize: "3.75rem"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  titulo-artigo:
    fontFamily: "Literata Variable, Literata, Georgia, serif"
    fontSize: "3.1rem"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.012em"
  titulo-secao:
    fontFamily: "Literata Variable, Literata, Georgia, serif"
    fontSize: "2.6rem"
    fontWeight: 600
    lineHeight: 1.15
  titulo-card:
    fontFamily: "Literata Variable, Literata, Georgia, serif"
    fontSize: "1.45rem"
    fontWeight: 600
    lineHeight: 1.35
  leitura:
    fontFamily: "Literata Variable, Literata, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.72
  ui:
    fontFamily: "Hanken Grotesk Variable, Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  rotulo:
    fontFamily: "Hanken Grotesk Variable, Hanken Grotesk, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.12em"
  codigo:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.82rem"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  none: "0px"
  codigo-inline: "2px"
  avatar: "9999px"
spacing:
  gutter-mobile: "16px"
  gutter-desktop: "24px"
  secao-mobile: "64px"
  secao-desktop: "96px"
  coluna-leitura: "40rem"
  container: "80rem"
components:
  botao:
    backgroundColor: "{colors.laranja}"
    textColor: "{colors.noite}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  botao-hover:
    backgroundColor: "{colors.laranja-claro}"
    textColor: "{colors.noite}"
  botao-contato:
    backgroundColor: "transparent"
    textColor: "{colors.laranja-claro}"
    rounded: "{rounded.none}"
    height: "40px"
    padding: "0 16px"
  chip-filtro:
    backgroundColor: "transparent"
    textColor: "{colors.tinta-2}"
    rounded: "{rounded.none}"
    height: "32px"
    padding: "0 12px"
  chip-filtro-ativo:
    backgroundColor: "{colors.laranja}"
    textColor: "{colors.noite}"
  faixa-titulo:
    backgroundColor: "{colors.noite}"
    textColor: "#FFFFFF"
  coluna-leitura:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.corpo-papel}"
    typography: "{typography.leitura}"
    width: "{spacing.coluna-leitura}"
  caixa-newsletter:
    backgroundColor: "{colors.campo}"
    textColor: "{colors.tinta}"
    padding: "32px"
---

# gusflopes.dev — Pincelada

## Overview

O site é Van Gogh como sistema, não como foto. A assinatura é o **gerador de telas** (`scripts/tela/pincel.mjs`, VERSAO 10): tinta, não vetor, e **cena ampla, não foco**. O segredo do quadro da marca é a amplitude — o céu inteiro salpicado de manchas redondas sem centro, massas grandes que organizam a cena, marcas variadas pela superfície toda — e é esse princípio (não a paisagem) que o gerador transporta. Cada tela tem uma estrutura grande, um **arquétipo** escolhido pela semente ou fixado pelo papel da tela na página: **horizonte** (céu de manchas, massa escura com crista, linha d'água e reflexos), **vento** (correntes diagonais largas, faixas de valor, respiros), **manchas** (campo de discos de vários tamanhos e cores, sem centro), **ondas** (cristas claras longas, cavas que descansam), **massas** (blocos verticais, campo horizontal e área clara que se encontram numa costura de luz) e **faixas** (estratos de alturas, escalas de traço e densidades diferentes). Não há vórtice nem luz-alvo concêntrica: quando há luz, é mancha ou disco espalhado, de tamanho e valor variados, ou toque quente curto (janela acesa, reflexo). Um respiro de baixa frequência abre campos onde o chão aparece, e o comprimento do traço varia muito (log-normal): toques quase quadrados ao lado de correntes longas. O corpo de tinta é o da rodada 2: renderizador raster em camadas (subpintura, corpo, realce, marcas do arquétipo, manchas, faíscas); cada traço é um feixe de cerdas em 2 a 4 sub-estrias de valores vizinhos, entrada carregada, saída seca, falhas da cerda, arrasto da tinta de baixo; no material **empasto** cada cerda deixa relevo iluminado por luz rasante. As manchas são discos preenchidos por toques de uma mão só, com borda redonda de arcos tangentes. Desde a VERSAO 10, a tinta é a **paleta do quadro inteiro**, não só os azuis dele: petróleo, ardósia, areia, marrom e ferrugem sobre o fundo azul-acinzentado, com os laranjas da marca como luz. O motor é o contraste complementar ferrugem × petróleo (torres de tijolo e janelas acesas no horizonte, correntes quentes e frias alternadas no vento, ondas alternadas, um estrato quente e um claro em toda faixa, bloco de tijolo nas massas) e o céu da abertura tem uma passagem clara de areia, como o alto-esquerdo do quadro. As manchas revezam cinco famílias (areia/pêssego, aqua, branco, ocre, azul-noite), com luas grandes e pingos (razão ≥ 6:1), opacidade, sobreposição e borda variáveis; os reflexos na água são faixas verticais quentes. O azul-claro da marca (`#8FB3D9`/`#C9D6E6`) ficou como acento raro. `scripts/tela/medir.mjs` mede cada tela por família de cor; o estudo `docs/design-review/estudo-pinceladas.png` põe os seis arquétipos no tamanho real do hero ao lado do quadro original inteiro, com a medição anotada.

**Escala fixa de traço.** Cada papel (`scripts/tela/config.mjs`: abertura, faixa, capa, capítulo, close, projeção, convite, fita, painel) tem uma tela-mestre em px de tela, e cada formato servido é uma **janela** dela pintada no tamanho em que é exibida: o traço tem a mesma espessura no hero, nas faixas, nas capas, no OG e no Substack. O card não é a capa encolhida, é um recorte dela; o celular recebe a sua própria janela via `<picture media>`. Marcas laranja ficam inteiras (ou inteiramente fora) em todas as janelas do papel; manchas azuis podem ser cortadas pela borda, como no quadro. A única exceção deliberada é o **close** da Ferramenta (o pintor chegando perto, 2,5×), nunca o contrário.

As telas são geradas **no build**, por uma integração Astro (`scripts/tela/integracao.mjs`, em workers), codificadas pelo `sharp` em AVIF/WebP/JPG (AVIF q40 em 1×, q30 acima), mais a imagem OG 1200×630 de cada texto. Cache incremental por manifesto: só o que mudou é repintado. Zero JS no cliente: a tela é um `<picture>`. Elas substituem no render as fotos genéricas do Unsplash do frontmatter (que fica intocado); capa autoral (a da newsletter) é mantida.

Dois modos de página, decididos pela tarefa, não pela categoria:

- **Mostrar** (home, hubs, arquivo da newsletter, 404): a tela abre a página e o título vem numa faixa azul-escuro costurada pelo **fio laranja**; depois, o corpo alterna noite e claros (papel, areia) pela história. A abertura muda por tipo de página (ver Layout).
- **Ler** (artigos, edições, páginas legais): a tela fica só na capa; o título em faixa azul-escuro; a coluna de leitura em **papel frio** `#F2F4F7`, Literata 17–18px, ~68 caracteres por linha, nada se mexendo atrás do texto. Papel em vez de azul-escuro porque a leitura longa acontece de dia, no celular: texto escuro em fundo claro frio tem contraste alto (16:1) sem o halo do texto claro em fundo escuro, e a pintura continua presente acima, como um quadro pendurado sobre a página.

**Cada tela tem um papel e uma anatomia**, nunca textura em série. Arquétipos fixados por papel: abertura da home = horizonte; faixas de hub = Insights manchas, Radar vento, Engenharia massas, Negócios ondas, Bastidores faixas; eixos da home = faixas com 3 estratos (um por porta); vídeo = ondas; close da Ferramenta = vento; convite da newsletter = vento; fita do arquivo da newsletter = horizonte; 404 = massas. A capa de um texto é sorteada pela semente, mas nunca com o arquétipo da faixa de Insights, da faixa do seu eixo nem do convite da newsletter — as telas da mesma página não repetem anatomia. Listas de textos são só texto.

O quadro original da marca (cidade noturna em pinceladas) aparece uma vez, na largura da janela, abrindo a seção "Engenharia é mais do que código" (`#about`): a referência de onde o gerador veio.

## Colors

Restrição de marca: azul-escuro + laranja oficiais, mais a paleta de apoio do quadro aprovada em 04/10 (PRODUCT.md, "Papéis das cores"). Estratégia: **laranja como cor principal em detalhes**, azul-escuro como estrutura, claros obrigatórios no ritmo, a variedade do quadro como apoio.

- **Laranja** `#F97316` é a cor principal e aparece em toda seção, em dois registros. (a) **Chapado = ação**: botão, chip/aba ativa, play do vídeo, ações de Serviços; texto e ícone sobre ele em azul-escuro `#0B1A33` (6,19:1; sobre `#FB923C` no hover, 7,67:1). (b) **Detalhe não textual = presença**: o fio de 3px na costura pintura/texto, a costura de 6px ao lado das listas (portas da home, índices dos hubs), réguas de 2px no índice, o filete de 4px (marca de capítulo sob os títulos da home, topo das áreas do Sobre, célula de Serviços), a marca quadrada de 8px antes de um metadado, o sublinhado de 3px de um destaque. Sobre claro, `#F97316` nunca é texto (≈2,5:1); texto laranja sobre claro é `laranja-fundo` `#C2410C` (4,9:1), e só em links e ações. Fundo `#C2410C`/`#9A3412` com texto branco (5,18:1) só pontualmente; proibido `#C2410C` com azul-escuro (3,35:1) e `#F97316` com branco (2,8:1). Sobre azul-escuro, `laranja-claro` `#FB923C` é o laranja de texto/link e `pessego` `#FDBA74` a ênfase em títulos ("partes do mesmo sistema").
- **Azul-escuro** é estrutura e fundo, não protagonista: **Noite** `#0B1A33` no cabeçalho, nas faixas de título, no vídeo, na Ferramenta e no rodapé; **Noite 2** `#13284D` e **Linha** `#22385C` (régua sobre azul-escuro). Nunca dois blocos escuros grandes empilhados.
- **Claros** entram no ritmo: **Papel** `#F2F4F7` (coluna de leitura, Eixos, corpo dos hubs, Serviços, mensagem do 404) com `tinta` `#0B1A33`, corpo `#1A2740`, `tinta-2` `#3D4E68` (7,9:1) e `regua` `#CCD5E1`; **Campo** `#D8D1C4`, o claro quente — areia acinzentada do quadro, nunca creme — no Sobre e no convite da newsletter (tinta 13:1, `tinta-2` 5,5:1). Toda seção escura grande chega de um claro; o rodapé chega pela fita pintada areia → noite.
- **Paleta de apoio do quadro** (fora das telas, com função): **petróleo** `#315B6F` (célula chapada do título de Serviços e caixa do Bastidores, com branco 7,3:1; metadado sobre papel, 6,4:1), **petróleo claro** `#457183`, **ardósia** `#648188` (régua sobre claro; não é texto sobre papel), **ardósia clara** `#7F989A` (metadado sobre noite, 5,8:1), **areia** `#AA9C87` (metadado e rótulo sobre noite, 6,5:1), **marrom** `#907A5F`/`#50372A`, **ferrugem** `#8A4C1B` (filete; nunca encosta em texto `#C2410C` nem no laranja chapado — sempre uma célula de separação). Dentro das telas, a mesma família mais o fundo `#223040`/`#1C1F27`.
- **Azul-claro da marca** — `ceu` `#8FB3D9`, `nevoa` `#C9D6E6` — é acento raro nas telas; fora delas, `nevoa` segue como texto secundário sobre azul-escuro (11:1) e `bruma` `#9FB0C6` como metadado (7,4:1).

Seleção de texto: laranja com texto `noite` sobre azul-escuro; pêssego com `tinta` sobre claro. Foco: anel de 2px `laranja-claro` (`laranja-fundo` sobre claro), afastado 3px. Scrollbar em `petroleo` sobre `noite`.

## Typography

- **Literata** (variável, peso; itálico real carregado sob demanda) para tudo que é título e para a leitura. Títulos em 600 com tracking levemente negativo nos tamanhos grandes; corpo em 400, linha 1,72.
- **Hanken Grotesk** (variável) para UI: navegação, decks dos hubs, metadados, botões, rótulos.
- **JetBrains Mono** só em código (blocos e inline). Nunca como fantasia "técnica".

O **rótulo** (Hanken 700, 0,75rem, caixa alta, tracking 0,12em) marca eixo e categoria — e fica sempre **abaixo** do título, junto da data, nunca como eyebrow acima. Frases longas de rótulo (as áreas do hero, "Ferramenta gratuita · Experimento aberto") ficam em Hanken 600 em caixa normal.

As fontes das imagens geradas (OG, capas do Substack) são as mesmas, em versão estática (`@fontsource/literata`, `@fontsource/hanken-grotesk`, WOFF convertido para TTF em `node_modules/.cache`) renderizadas pelo Pango do `sharp`.

## Layout

- Container de 80rem com gutter de 16px no celular e 24px a partir de `md`. Seções respiram 64px (celular) / 96px (desktop).
- **Abertura, por tipo de página**: home — panorâmica alta em largura total, `calc(100svh − 72px − 400px)` entre 300 e 620px (janela 1440×450; 400×250 no celular), fio e faixa do título abaixo; hubs de leitura (Insights, eixos, Radar) — faixa 6:1/5:1 em largura total (janela 1440×240; 400×134 no celular); artigo — faixa do título à esquerda e a capa em **retrato** até a borda direita, costurada por fio vertical (janela 464×580; recorte 448×252 em cima, no celular); arquivo da newsletter — ordem invertida: faixa do título primeiro, depois uma **fita** fina de pintura (1440×120) com o fio por cima; 404 — painel alto ao lado da mensagem, fio vertical; edição da newsletter — sem tela (a capa autoral entra abaixo do título).
- Home: H1 em 7/12 colunas, deck + newsletter em 5/12; o botão "Assinar Newsletter" cabe na primeira dobra em 1366×900 e 390×844.
- Home, abaixo da abertura (ordem: Eixos → Vídeo → Ferramenta → Sobre → Serviços; "Ideias recentes" foi fundida nos eixos): cada camada tem um gesto próprio — **Eixos**: uma tela em três estratos ao lado das três portas, fio laranja vertical como costura, cada porta com os dois textos mais recentes do eixo; **Vídeo**: sala de projeção, a tela 16:9 sangra até a borda direita com o play grande, título e resumo à esquerda; **Ferramenta**: meia seção é o close de traço 2,5× sangrando à esquerda de cima a baixo, a outra metade é a ferramenta e a ação; **Sobre**: a revelação da fonte, o quadro original na largura da janela (única aparição) com fio e faixa do texto, depois as áreas em colunas (o único "título + colunas entre réguas"); **Serviços**: cardápio em linhas largas sobre papel.
- Hubs: Insights e eixos trazem o texto mais recente com a capa em **retrato 4:5** (4/12, fio vertical) ao lado do título grande (8/12) — nunca a panorâmica da faixa de abertura — e seguem num **índice de leitura** só texto (título e resumo em 8/12, metadados ao lado em 4/12). Radar é um **diário de bordo**: data na margem (2/12), item e comentário (7/12), categoria, fonte e ação (3/12).
- Artigo: título e coluna compartilham a mesma borda esquerda (43rem com padding → 40rem úteis). Blocos de código sangram 1–1,4rem para fora da coluna.
- Ritmo de página (home), desde a rodada 4: noite na abertura → **papel** nos Eixos → noite no Vídeo e na Ferramenta (as telas carregam cor) → o quadro → **campo de areia** no Sobre → **papel** em Serviços (título na célula de petróleo) → fita pintada areia → noite → rodapé. A regra anterior ("duas trocas", noite da abertura até o Sobre) produzia um azulão só e foi revogada. Hubs, Radar, Newsletter, artigo, edição e 404: noite só na abertura e no rodapé; o corpo é claro. Em todo modelo, os ~400px acima do rodapé são majoritariamente claros.

## Elevation & Depth

Nenhuma sombra, nenhum glow, nenhum vidro. Profundidade vem só de três coisas: a tela (a única superfície com textura), a mudança de chão (`noite` / `noite-2` / `papel`) e réguas finas. O header é azul-escuro sólido e fixo no topo.

## Shapes

Cantos retos em tudo — telas, botões, chips, caixas. As únicas curvas são o avatar redondo do autor e o raio de 2px do código inline. A forma recorrente é o **fio**: uma régua laranja de 3px, em largura total, sempre na costura entre pintura e texto (abaixo da tela da home, dos hubs e do artigo; topo dos blocos de código; base do cabeçalho das páginas legais).

## Components

- **Tela** (`TelaPicture`): `<picture>` AVIF → WebP → JPG, `object-fit: cover`, decorativa (`alt=""`), com a janela `estreita` por media query no celular quando o papel tiver; `priority` só na primeira dobra.
- **Abertura de hub** (`AberturaHub`): faixa de tela + fio + H1 (Literata 2,6–3,75rem) e deck em Hanken.
- **Linha de índice** (hubs, sobre papel): título Literata em `tinta` → resumo (2 linhas, `tinta-2`) → metadados ao lado (marca laranja de 8px + eixo · categoria em `petroleo`, data · duração em `tinta-2`) → ação em `laranja-fundo`. A linha inteira é o link; régua laranja de 2px embaixo; a lista tem a costura laranja de 6px à esquerda. Sem tela.
- **Porta de eixo** (home, sobre papel): eixo em Literata 2,25rem + público em `petroleo` à esquerda; descrição, texto mais recente (régua de ardósia, "Mais recente" com marca laranja depois do título) e ação em `laranja-fundo` à direita; costura laranja de 6px entre a tela e as portas.
- **Fio vivo**: régua laranja de 3px que mostra só 12% em repouso e se estende até a largura toda no hover ou foco (`transform: scaleX`, 0,6s, `cubic-bezier(0.22, 1, 0.36, 1)`), nas linhas de serviço: a interação-assinatura, a única animação do site.
- **Botão** (`.botao`): laranja, texto `noite` `#0B1A33` (6,19:1), 48px de altura (44px nas ações de Serviços), canto reto; hover para `laranja-claro` (7,67:1). **Contato** no header: contorno laranja que se preenche no hover (texto `noite`).
- **Marca** (`.marca`): quadrado laranja de 8px antes de um metadado ou rótulo (índice, "Mais recente", títulos do rodapé, "Erro 404"). **Marca de capítulo** (`.capitulo`): filete laranja de 4px × 3,5rem sob o título de seção na home.
- **Fita do rodapé**: tela do papel `rodape` (faixas em degradê: areia em cima, petróleo/terra no meio, noite embaixo), 80/112px, seguida do fio; é a passagem do campo claro para o rodapé em toda página.
- **Ação em texto** (`.acao`): Hanken 700 com seta; no hover sublinha e a seta se afasta 4px.
- **Navegação**: links Hanken 15px em `nevoa`; o ativo fica branco com régua laranja de 2px embaixo (`scaleX`). No celular, menu em lista com títulos em Literata e o botão Contato.
- **Filtros** (sobre papel): abas de eixo com régua laranja de 3px no ativo; busca como campo de linha única (régua `ardosia`, laranja no foco); categorias como chips retos em caixa mista (ativo laranja com texto `noite`), iguais no Radar e nos Insights.
- **Coluna de leitura** (`.leitura`): papel, Literata 17/18px, 40rem; H2 1,6em com 2,2em acima; links `laranja-fundo` sublinhados; citação em itálico com um fio laranja curto acima (sem borda lateral); código sobre azul-escuro com fio laranja no topo; tabelas em Hanken com números tabulares e régua de 2px no cabeçalho.
- **Caixa da newsletter** (`NewsletterCta`): bloco no **campo de areia** `#D8D1C4` (texto em `tinta`; nunca um bloco escuro logo acima do rodapé) com a tela da própria newsletter (semente "Radar de IA", arquétipo vento, o mesmo da capa do Substack) em escala 1:1 — coluna estreita de 200px ao lado do convite, ou faixa baixa em `pilha` — separada por fio de 3px; promessa em Literata, botão laranja. Fecha cada artigo e edição. Nunca o close da Ferramenta.
- **Bloco do autor**: nome em Literata como título, "Sobre o Autor" como metadado logo depois, bio e redes.
- **Imagens geradas**: OG 1200×630 por texto (tela em 40% superior, fio, rótulo do eixo e título em faixa azul-escuro, "gusflopes.dev"); OG padrão com a tagline; capa do Substack com faixa papel (`docs/substack-kit/`).

## Do's and Don'ts

- **Faça** gerar a imagem de um texto novo pelo gerador (semente = slug); não procure foto de banco.
- **Faça** pôr todo texto em faixa sólida; a pintura fica acima ou ao lado, nunca atrás.
- **Faça** pôr pelo menos um detalhe laranja estrutural em cada seção (fio, costura, filete, marca, estado ativo, ação); o laranja chapado é só ação.
- **Faça** alternar campos claros e escuros pela história e fazer toda seção escura grande (o rodapé incluso) chegar de um claro.
- **Faça** usar as cores do quadro (petróleo, ardósia, areia, marrom, ferrugem) com função: célula, metadado, régua, filete.
- **Faça** manter rótulo de eixo/categoria/"Mais recente" depois do título (ou ao lado), nunca acima.
- **Faça** dar a cada tela um papel e uma semente; lista de textos é só texto.
- **Faça** definir um formato novo como janela de um papel em `scripts/tela/config.mjs`, na proporção e no tamanho em que é exibido.
- **Faça** subir `VERSAO` em `scripts/tela/pincel.mjs` quando mudar o gerador (invalida o cache e regenera tudo).
- **Não** use sombra, glow, vidro, gradiente de texto ou blur — nem dentro das telas.
- **Não** volte ao template "vórtice central + luzes-alvo concêntricas": a tela é uma cena ampla, sem foco único. Nas telas, o laranja é luz de verdade (janelas, reflexos, poucas manchas), não pontinhos soltos.
- **Não** pinte telas só de azul nem discos de `#8FB3D9`/`#C9D6E6`: cada tela passa nas metas de família de `scripts/tela/medir.mjs`.
- **Não** use `#F97316` como texto sobre claro, `#C2410C` com azul-escuro, `#F97316` com branco, nem preto/quase-preto sobre laranja.
- **Não** encoste ferrugem em texto `#C2410C` ou no laranja chapado.
- **Não** mostre o traço menor que a escala fixa (tela encolhida num card): faça uma janela.
- **Não** ponha borda lateral colorida em card isolado: o laranja de borda é costura de lista ou fio de costura, nunca listra de card.
- **Não** coloque textura, tela ou o quadro atrás de texto corrido.
- **Não** use mono fora de código.
