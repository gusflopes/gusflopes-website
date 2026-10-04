---
name: gusflopes.dev — Pincelada
description: Van Gogh como sistema — cada texto ganha uma tela de pinceladas gerada do próprio slug; azul-escuro, luz laranja rara, leitura em papel frio.
colors:
  noite: "#0B1A33"
  noite-2: "#13284D"
  linha: "#22385C"
  quadro: "#1F3A66"
  petroleo: "#2E5069"
  ceu: "#8FB3D9"
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
  brasa: "#1C0A02"
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
    textColor: "{colors.brasa}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  botao-hover:
    backgroundColor: "{colors.laranja-claro}"
    textColor: "{colors.brasa}"
  botao-contato:
    backgroundColor: "transparent"
    textColor: "{colors.laranja-claro}"
    rounded: "{rounded.none}"
    height: "40px"
    padding: "0 16px"
  chip-filtro:
    backgroundColor: "transparent"
    textColor: "{colors.nevoa}"
    rounded: "{rounded.none}"
    height: "32px"
    padding: "0 12px"
  chip-filtro-ativo:
    backgroundColor: "{colors.laranja}"
    textColor: "{colors.brasa}"
  faixa-titulo:
    backgroundColor: "{colors.noite}"
    textColor: "#FFFFFF"
  coluna-leitura:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.corpo-papel}"
    typography: "{typography.leitura}"
    width: "{spacing.coluna-leitura}"
  caixa-newsletter:
    backgroundColor: "{colors.noite-2}"
    textColor: "{colors.nevoa}"
    padding: "32px"
---

# gusflopes.dev — Pincelada

## Overview

O site é Van Gogh como sistema, não como foto. A assinatura é o **gerador de telas** (`scripts/tela/pincel.mjs`, VERSAO 9): tinta, não vetor, e **cena ampla, não foco**. O segredo do quadro da marca é a amplitude — o céu inteiro salpicado de manchas redondas sem centro, massas grandes que organizam a cena, marcas variadas pela superfície toda — e é esse princípio (não a paisagem) que o gerador transporta. Cada tela tem uma estrutura grande, um **arquétipo** escolhido pela semente ou fixado pelo papel da tela na página: **horizonte** (céu de manchas, massa escura com crista, linha d'água e reflexos), **vento** (correntes diagonais largas, faixas de valor, respiros), **manchas** (campo de discos de vários tamanhos e cores, sem centro), **ondas** (cristas claras longas, cavas que descansam), **massas** (blocos verticais, campo horizontal e área clara que se encontram numa costura de luz) e **faixas** (estratos de alturas, escalas de traço e densidades diferentes). Não há vórtice nem luz-alvo concêntrica: quando há luz, é mancha ou disco espalhado, de tamanho e valor variados, ou toque quente curto (janela acesa, reflexo). Um respiro de baixa frequência abre campos onde o chão aparece, e o comprimento do traço varia muito (log-normal): toques quase quadrados ao lado de correntes longas. O corpo de tinta é o da rodada 2: renderizador raster em camadas (subpintura, corpo, realce, marcas do arquétipo, manchas, faíscas); cada traço é um feixe de cerdas em 2 a 4 sub-estrias de valores vizinhos, entrada carregada, saída seca, falhas da cerda, arrasto da tinta de baixo; no material **empasto** cada cerda deixa relevo iluminado por luz rasante. As manchas são discos preenchidos por toques de uma mão só, com borda redonda de arcos tangentes. O estudo `docs/design-review/estudo-pinceladas.png` põe os seis arquétipos no tamanho real do hero ao lado do quadro original inteiro.

**Escala fixa de traço.** Cada papel (`scripts/tela/config.mjs`: abertura, faixa, capa, capítulo, close, projeção, convite, fita, painel) tem uma tela-mestre em px de tela, e cada formato servido é uma **janela** dela pintada no tamanho em que é exibida: o traço tem a mesma espessura no hero, nas faixas, nas capas, no OG e no Substack. O card não é a capa encolhida, é um recorte dela; o celular recebe a sua própria janela via `<picture media>`. Marcas laranja ficam inteiras (ou inteiramente fora) em todas as janelas do papel; manchas azuis podem ser cortadas pela borda, como no quadro. A única exceção deliberada é o **close** da Ferramenta (o pintor chegando perto, 2,5×), nunca o contrário.

As telas são geradas **no build**, por uma integração Astro (`scripts/tela/integracao.mjs`, em workers), codificadas pelo `sharp` em AVIF/WebP/JPG (AVIF q40 em 1×, q30 acima), mais a imagem OG 1200×630 de cada texto. Cache incremental por manifesto: só o que mudou é repintado. Zero JS no cliente: a tela é um `<picture>`. Elas substituem no render as fotos genéricas do Unsplash do frontmatter (que fica intocado); capa autoral (a da newsletter) é mantida.

Dois modos de página, decididos pela tarefa, não pela categoria:

- **Mostrar** (home, hubs, arquivo da newsletter, 404): chão azul-escuro, a tela abre a página, o título vem numa faixa sólida costurada pelo **fio laranja**. A abertura muda por tipo de página (ver Layout).
- **Ler** (artigos, edições, páginas legais): a tela fica só na capa; o título em faixa azul-escuro; a coluna de leitura em **papel frio** `#F2F4F7`, Literata 17–18px, ~68 caracteres por linha, nada se mexendo atrás do texto. Papel em vez de azul-escuro porque a leitura longa acontece de dia, no celular: texto escuro em fundo claro frio tem contraste alto (16:1) sem o halo do texto claro em fundo escuro, e a pintura continua presente acima, como um quadro pendurado sobre a página.

**Cada tela tem um papel e uma anatomia**, nunca textura em série. Arquétipos fixados por papel: abertura da home = horizonte; faixas de hub = Insights manchas, Radar vento, Engenharia massas, Negócios ondas, Bastidores faixas; eixos da home = faixas com 3 estratos (um por porta); vídeo = ondas; close da Ferramenta = vento; convite da newsletter = vento; fita do arquivo da newsletter = horizonte; 404 = massas. A capa de um texto é sorteada pela semente, mas nunca com o arquétipo da faixa de Insights, da faixa do seu eixo nem do convite da newsletter — as telas da mesma página não repetem anatomia. Listas de textos são só texto.

O quadro original da marca (cidade noturna em pinceladas) aparece uma vez, emoldurado ao lado do texto na seção "Engenharia é mais do que código" (`#about`): a referência de onde o gerador veio.

## Colors

Restrição de marca: azul-escuro + laranja, fixos. Estratégia: **Committed** no azul-escuro (o chão de quase todas as páginas), laranja como luz rara.

- **Noite** `#0B1A33` é o chão: header, rodapé, faixas de título, hubs. **Noite 2** `#13284D` separa blocos sobre o chão (caixa da newsletter). **Linha** `#22385C` é a régua fina sobre azul-escuro.
- **Azuis do quadro** — `#1F3A66`, `#2E5069`, `#8FB3D9`, `#C9D6E6` — vivem dentro das telas. Fora delas, `nevoa` `#C9D6E6` é o texto secundário sobre azul-escuro (11:1) e `bruma` `#9FB0C6` o metadado (7,4:1).
- **Laranja** `#F97316` é luz: o fio de 3px, o botão (com texto `brasa` `#1C0A02`, 7,6:1), a seleção de filtro. Metadados de eixo/categoria e público ficam em `ceu` `#8FB3D9`, não em laranja. `laranja-claro` `#FB923C` é o laranja de texto/link sobre azul-escuro; `pessego` `#FDBA74` é ênfase em títulos sobre azul-escuro ("partes do mesmo sistema") e hover de títulos. Sobre papel, o laranja de texto é `laranja-fundo` `#C2410C` (4,9:1).
- **Papel** `#F2F4F7` com `tinta` `#0B1A33` (títulos), `#1A2740` (corpo) e `tinta-2` `#3D4E68` (secundário, 7,9:1). `regua` `#CCD5E1` para réguas sobre papel, `papel-2` `#E3E8EF` para código inline.

Seleção de texto: laranja com texto `brasa` sobre azul-escuro; pêssego com `tinta` sobre papel. Foco: anel de 2px `laranja-claro` (`laranja-fundo` sobre papel), afastado 3px. Scrollbar em `petroleo` sobre `noite`.

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
- Ritmo de página (home): **duas** trocas de campo — azul-escuro da abertura até "Sobre" (a noite do quadro; capítulos separados por telas e réguas, não por listras) → **papel** ("Como posso ajudar", lido como documento) → azul-escuro no rodapé.

## Elevation & Depth

Nenhuma sombra, nenhum glow, nenhum vidro. Profundidade vem só de três coisas: a tela (a única superfície com textura), a mudança de chão (`noite` / `noite-2` / `papel`) e réguas finas. O header é azul-escuro sólido e fixo no topo.

## Shapes

Cantos retos em tudo — telas, botões, chips, caixas. As únicas curvas são o avatar redondo do autor e o raio de 2px do código inline. A forma recorrente é o **fio**: uma régua laranja de 3px, em largura total, sempre na costura entre pintura e texto (abaixo da tela da home, dos hubs e do artigo; topo dos blocos de código; base do cabeçalho das páginas legais).

## Components

- **Tela** (`TelaPicture`): `<picture>` AVIF → WebP → JPG, `object-fit: cover`, decorativa (`alt=""`), com a janela `estreita` por media query no celular quando o papel tiver; `priority` só na primeira dobra.
- **Abertura de hub** (`AberturaHub`): faixa de tela + fio + H1 (Literata 2,6–3,75rem) e deck em Hanken.
- **Linha de índice** (hubs): título Literata → resumo (2 linhas) → metadados ao lado ou depois (eixo · categoria em `ceu`, data · duração em `bruma`) → ação. A linha inteira é o link; régua `linha` embaixo. Sem tela.
- **Porta de eixo** (home): eixo em Literata 2,25rem + público em `ceu` à esquerda; descrição, texto mais recente (e "Mais recente" depois do título) e ação à direita.
- **Fio vivo**: régua laranja de 3px que mostra só 12% em repouso e se estende até a largura toda no hover ou foco (`transform: scaleX`, 0,6s, `cubic-bezier(0.22, 1, 0.36, 1)`), nas linhas de serviço: a interação-assinatura, a única animação do site.
- **Botão** (`.botao`): laranja, texto `brasa`, 48px de altura, canto reto; hover para `laranja-claro`. **Contato** no header: contorno laranja que se preenche no hover.
- **Ação em texto** (`.acao`): Hanken 700 com seta; no hover sublinha e a seta se afasta 4px.
- **Navegação**: links Hanken 15px em `nevoa`; o ativo fica branco com régua laranja de 2px embaixo (`scaleX`). No celular, menu em lista com títulos em Literata e o botão Contato.
- **Filtros**: abas de eixo com régua laranja de 3px no ativo; busca como campo de linha única (régua `petroleo`, laranja no foco); categorias como chips retos em caixa mista (ativo laranja com texto `brasa`), iguais no Radar e nos Insights.
- **Coluna de leitura** (`.leitura`): papel, Literata 17/18px, 40rem; H2 1,6em com 2,2em acima; links `laranja-fundo` sublinhados; citação em itálico com um fio laranja curto acima (sem borda lateral); código sobre azul-escuro com fio laranja no topo; tabelas em Hanken com números tabulares e régua de 2px no cabeçalho.
- **Caixa da newsletter** (`NewsletterCta`): bloco `noite-2` com a tela da própria newsletter (semente "Radar de IA", arquétipo vento, o mesmo da capa do Substack) em escala 1:1 — coluna estreita de 200px ao lado do convite, ou faixa baixa em `pilha` — separada por fio de 3px; promessa em Literata, botão laranja. Fecha cada artigo e edição. Nunca o close da Ferramenta.
- **Bloco do autor**: nome em Literata como título, "Sobre o Autor" como metadado logo depois, bio e redes.
- **Imagens geradas**: OG 1200×630 por texto (tela em 40% superior, fio, rótulo do eixo e título em faixa azul-escuro, "gusflopes.dev"); OG padrão com a tagline; capa do Substack com faixa papel (`docs/substack-kit/`).

## Do's and Don'ts

- **Faça** gerar a imagem de um texto novo pelo gerador (semente = slug); não procure foto de banco.
- **Faça** pôr todo texto em faixa sólida; a pintura fica acima ou ao lado, nunca atrás.
- **Faça** usar o fio laranja só na costura pintura/texto e o fio vivo só nas linhas de serviço.
- **Faça** manter rótulo de eixo/categoria/"Mais recente" depois do título (ou ao lado), nunca acima.
- **Faça** dar a cada tela um papel e uma semente; lista de textos é só texto.
- **Faça** definir um formato novo como janela de um papel em `scripts/tela/config.mjs`, na proporção e no tamanho em que é exibido.
- **Faça** subir `VERSAO` em `scripts/tela/pincel.mjs` quando mudar o gerador (invalida o cache e regenera tudo).
- **Não** use sombra, glow, vidro, gradiente de texto ou blur — nem dentro das telas.
- **Não** volte ao template "vórtice central + luzes-alvo concêntricas": a tela é uma cena ampla, sem foco único. Laranja é luz rara: manchas e toques quentes pequenos, disco grande laranja só às vezes. Na primeira dobra da home, o laranja da interface fica no fio, na 2ª linha do H1 e no botão.
- **Não** mostre o traço menor que a escala fixa (tela encolhida num card): faça uma janela.
- **Não** ponha borda colorida em cards ou caixas (a caixa da newsletter é chão `noite-2`, sem fio).
- **Não** coloque textura, tela ou o quadro atrás de texto corrido.
- **Não** use mono fora de código.
