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

O site é Van Gogh como sistema, não como foto. A assinatura é o **gerador de telas** (`scripts/tela/pincel.mjs`): tinta, não vetor. Um renderizador raster próprio pinta em camadas — subpintura, corpo, realce, luzes — pinceladas que seguem um campo de fluxo (um redemoinho com centro deslocado, um segundo menor do outro lado, ruído suave no ângulo) nos azuis do quadro da marca. Cada traço é um feixe de cerdas em 2 a 4 sub-estrias de valores vizinhos do mesmo matiz, levemente desalinhadas; afina da entrada carregada para a saída seca, as cerdas terminam em pontos diferentes e falham perto do fim; o traço arrasta um pouco da tinta de baixo e cobre com opacidade parcial. No material **empasto** (o escolhido no estudo `docs/design-review/estudo-pinceladas.png`, contra chapado e cerda) cada cerda deixa relevo num mapa de altura iluminado por luz rasante. As **luzes** (1 a 3 por tela) são espirais densas de toques curtos concêntricos, do azul claro de fora ao miolo empastado de pêssego, e o fluxo gira em volta delas. Nenhum ruído ou blur global. A semente é o slug do texto (ou um nome fixo por papel), então cada texto tem uma tela própria e sempre a mesma.

**Escala fixa de traço.** Cada papel (`scripts/tela/config.mjs`: abertura, faixa, capa, capítulo, close) tem uma tela-mestre em px de tela, e cada formato servido é uma **janela** dela pintada no tamanho em que é exibida: o traço tem a mesma espessura no hero, nas faixas, nas capas, no OG e no Substack. O card não é a capa encolhida, é um recorte dela; o celular recebe a sua própria janela via `<picture media>`. As luzes são postas para ficarem inteiras (ou inteiramente fora) em todas as janelas do papel. A única exceção deliberada é o **close** (o pintor chegando perto, 2,5×), nunca o contrário.

As telas são geradas **no build**, por uma integração Astro (`scripts/tela/integracao.mjs`, em workers), codificadas pelo `sharp` em AVIF/WebP/JPG (AVIF q40 em 1×, q30 acima), mais a imagem OG 1200×630 de cada texto. Cache incremental por manifesto: só o que mudou é repintado. Zero JS no cliente: a tela é um `<picture>`. Elas substituem no render as fotos genéricas do Unsplash do frontmatter (que fica intocado); capa autoral (a da newsletter) é mantida.

Dois modos de página, decididos pela tarefa, não pela categoria:

- **Mostrar** (home, hubs, arquivo da newsletter, 404): chão azul-escuro, a tela abre a página em faixa panorâmica, o título vem logo abaixo numa faixa sólida costurada pelo **fio laranja**.
- **Ler** (artigos, edições, páginas legais): a tela fica só na capa; o título em faixa azul-escuro; a coluna de leitura em **papel frio** `#F2F4F7`, Literata 17–18px, ~68 caracteres por linha, nada se mexendo atrás do texto. Papel em vez de azul-escuro porque a leitura longa acontece de dia, no celular: texto escuro em fundo claro frio tem contraste alto (16:1) sem o halo do texto claro em fundo escuro, e a pintura continua presente acima, como um quadro pendurado sobre a página.

**Cada tela tem um papel**, nunca textura em série: abrir uma página (abertura, faixa de hub), abrir os eixos (coluna vertical), ser a capa de um texto (cabeçalho do artigo, destaque do hub, vídeo da home), dar um close de traço (Ferramenta, caixa da newsletter). Listas de textos são só texto.

O quadro original da marca (cidade noturna em pinceladas) aparece uma vez, emoldurado ao lado do texto na seção "Engenharia é mais do que código" (`#about`): a referência de onde o gerador veio.

## Colors

Restrição de marca: azul-escuro + laranja, fixos. Estratégia: **Committed** no azul-escuro (o chão de quase todas as páginas), laranja como luz rara.

- **Noite** `#0B1A33` é o chão: header, rodapé, faixas de título, hubs. **Noite 2** `#13284D` separa blocos sobre o chão (faixa da ferramenta, caixa da newsletter). **Linha** `#22385C` é a régua fina sobre azul-escuro.
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
- **Abertura**: tela em largura total — home: `calc(100svh − 72px − 400px)` entre 300 e 620px no desktop (janela 1440×450) e 28svh no celular (janela 400×250); hubs: faixa 5:1/6:1 (janela 1440×240; 400×134 no celular, 132px); artigo: 44svh (janela 1440×420; recorte 448×252 no celular). Logo abaixo, o fio laranja e a faixa de título.
- Home: H1 em 7/12 colunas, deck + newsletter em 5/12; o botão "Assinar Newsletter" cabe na primeira dobra em 1366×900 e 390×844.
- Home, abaixo da abertura (ordem: Eixos → Vídeo + Ideias recentes → Ferramenta → Sobre → Serviços): cada seção tem estrutura própria — coluna pintada + lista de portas; capa panorâmica + resumo ao lado de sumário só texto; faixa em três tempos (close, texto, ação); quadro original + áreas em colunas (o único "título + colunas entre réguas"); cardápio de serviços em linhas largas sobre papel.
- Hubs: Insights e eixos abrem com a capa panorâmica do texto mais recente (24:7) e seguem num **índice de leitura** só texto (título e resumo em 8/12, metadados ao lado em 4/12). Radar é um **diário de bordo**: data na margem (2/12), item e comentário (7/12), categoria, fonte e ação (3/12).
- Artigo: título e coluna compartilham a mesma borda esquerda (43rem com padding → 40rem úteis). Blocos de código sangram 1–1,4rem para fora da coluna.
- Ritmo de página (home): **duas** trocas de campo — azul-escuro da abertura até "Sobre" (a noite do quadro; capítulos separados por telas e réguas, não por listras) → **papel** ("Como posso ajudar", lido como documento) → azul-escuro no rodapé.

## Elevation & Depth

Nenhuma sombra, nenhum glow, nenhum vidro. Profundidade vem só de três coisas: a tela (a única superfície com textura), a mudança de chão (`noite` / `noite-2` / `papel`) e réguas finas. O header é azul-escuro sólido e fixo no topo.

## Shapes

Cantos retos em tudo — telas, botões, chips, caixas. As únicas curvas são o avatar redondo do autor e o raio de 2px do código inline. A forma recorrente é o **fio**: uma régua laranja de 3px, em largura total, sempre na costura entre pintura e texto (abaixo da tela da home, dos hubs e do artigo; topo dos blocos de código; base do cabeçalho das páginas legais).

## Components

- **Tela** (`TelaPicture`): `<picture>` AVIF → WebP → JPG, `object-fit: cover`, decorativa (`alt=""`), com a janela `estreita` por media query no celular quando o papel tiver; `priority` só na primeira dobra.
- **Abertura de hub** (`AberturaHub`): faixa de tela + fio + H1 (Literata 2,6–3,75rem) e deck em Hanken.
- **Linha de índice** (hubs, Ideias recentes): título Literata → resumo (2 linhas) → metadados ao lado ou depois (eixo · categoria em `ceu`, data · duração em `bruma`) → ação. A linha inteira é o link; régua `linha` embaixo. Sem tela.
- **Porta de eixo** (home): eixo em Literata 2,25rem + público em `ceu` à esquerda; descrição, texto mais recente (e "Mais recente" depois do título) e ação à direita.
- **Fio vivo**: régua laranja de 3px que mostra só 12% em repouso e se estende até a largura toda no hover ou foco (`transform: scaleX`, 0,6s, `cubic-bezier(0.22, 1, 0.36, 1)`), nas linhas de serviço: a interação-assinatura, a única animação do site.
- **Botão** (`.botao`): laranja, texto `brasa`, 48px de altura, canto reto; hover para `laranja-claro`. **Contato** no header: contorno laranja que se preenche no hover.
- **Ação em texto** (`.acao`): Hanken 700 com seta; no hover sublinha e a seta se afasta 4px.
- **Navegação**: links Hanken 15px em `nevoa`; o ativo fica branco com régua laranja de 2px embaixo (`scaleX`). No celular, menu em lista com títulos em Literata e o botão Contato.
- **Filtros**: abas de eixo com régua laranja de 3px no ativo; busca como campo de linha única (régua `petroleo`, laranja no foco); categorias como chips retos (ativo laranja com texto `brasa`). No Radar os chips são em caixa alta, nos Insights em caixa normal.
- **Coluna de leitura** (`.leitura`): papel, Literata 17/18px, 40rem; H2 1,6em com 2,2em acima; links `laranja-fundo` sublinhados; citação em itálico com um fio laranja curto acima (sem borda lateral); código sobre azul-escuro com fio laranja no topo; tabelas em Hanken com números tabulares e régua de 2px no cabeçalho.
- **Caixa da newsletter** (`NewsletterCta`): bloco `noite-2` com a tela da própria newsletter de perto (semente "Radar de IA", a mesma da capa do Substack) ao lado do convite — ou acima, em `pilha` — separada por fio de 3px; promessa em Literata, botão laranja. Fecha cada artigo e edição.
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
- **Não** aumente as luzes laranja da tela além de três focos; laranja é luz rara. Na primeira dobra da home, o laranja fica no fio, na 2ª linha do H1 e no botão.
- **Não** mostre o traço menor que a escala fixa (tela encolhida num card): faça uma janela.
- **Não** ponha borda colorida em cards ou caixas (a caixa da newsletter é chão `noite-2`, sem fio).
- **Não** coloque textura, tela ou o quadro atrás de texto corrido.
- **Não** use mono fora de código.
