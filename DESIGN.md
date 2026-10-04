---
name: gusflopes.dev
description: Tecnologia e negócio, partes do mesmo sistema. O site de sempre, executado sem timidez — azul-escuro, laranja e o quadro como herói único.
colors:
  noite: "#0B1A33"
  noite-2: "#13284D"
  noite-fundo: "#081428"
  noite-fio: "#22385C"
  noite-fio-forte: "#34507D"
  nevoa: "#C9D6E6"
  nevoa-2: "#9FB1C8"
  ceu: "#8FB3D9"
  ceu-fundo: "#36608C"
  laranja: "#F97316"
  laranja-hover: "#FB8A3C"
  laranja-claro: "#FB923C"
  laranja-palido: "#FDBA74"
  laranja-fundo: "#C2410C"
  laranja-brasa: "#9A3412"
  brasa: "#1C0A02"
  papel: "#F2F4F7"
  papel-2: "#E7EBF1"
  papel-fio: "#D3DAE4"
  tinta: "#0B1A33"
  tinta-2: "#33445F"
  tinta-3: "#56657D"
typography:
  display:
    fontFamily: "Literata Variable, Literata, Georgia, serif"
    fontSize: "4.75rem"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.032em"
    fontVariation: "'opsz' 72"
  display-hub:
    fontFamily: "Literata Variable, Literata, Georgia, serif"
    fontSize: "4.5rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.028em"
    fontVariation: "'opsz' 72"
  heading:
    fontFamily: "Literata Variable, Literata, Georgia, serif"
    fontSize: "clamp(1.875rem, 1.25rem + 1.6vw, 2.625rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.014em"
  accent:
    fontFamily: "Literata Variable, Literata, Georgia, serif"
    fontStyle: "italic"
    fontWeight: 400
  title:
    fontFamily: "Literata Variable, Literata, Georgia, serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.22
    letterSpacing: "normal"
  reading:
    fontFamily: "Literata Variable, Literata, Georgia, serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.72
    letterSpacing: "normal"
  deck:
    fontFamily: "Literata Variable, Literata, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  ui:
    fontFamily: "Hanken Grotesk Variable, Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  meta:
    fontFamily: "Hanken Grotesk Variable, Hanken Grotesk, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "normal"
  label:
    fontFamily: "Hanken Grotesk Variable, Hanken Grotesk, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.12em"
  code:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
rounded:
  fio: "3px"
  imagem: "4px"
  ponto: "9999px"
spacing:
  gutter-mobile: "16px"
  gutter: "24px"
  secao: "112px"
  secao-mobile: "80px"
  linha-indice: "40px"
components:
  button-primary:
    backgroundColor: "{colors.laranja}"
    textColor: "{colors.brasa}"
    typography: "{typography.ui}"
    rounded: "{rounded.fio}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.laranja-hover}"
    textColor: "{colors.brasa}"
  action-link:
    textColor: "{colors.laranja}"
    typography: "{typography.ui}"
    padding: "0"
  meta-line:
    textColor: "{colors.ceu}"
    typography: "{typography.meta}"
  button-outline-header:
    backgroundColor: "transparent"
    textColor: "{colors.laranja}"
    rounded: "{rounded.fio}"
    height: "36px"
    padding: "0 16px"
  chip-filtro:
    backgroundColor: "transparent"
    textColor: "{colors.tinta-2}"
    rounded: "{rounded.fio}"
    height: "32px"
    padding: "0 12px"
  chip-filtro-ativo:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.papel}"
  input-busca:
    backgroundColor: "transparent"
    textColor: "{colors.tinta}"
    padding: "8px 8px 8px 28px"
  header:
    backgroundColor: "{colors.noite}"
    textColor: "{colors.nevoa}"
    height: "72px"
  header-mobile:
    backgroundColor: "{colors.noite}"
    height: "64px"
---

# Design System: gusflopes.dev — Evolução

## Overview

O site de antes, limpo e executado com acabamento de site premiado. O mundo não muda: azul-escuro e laranja, o quadro da cidade noturna em pinceladas como imagem da marca. Mudou o acabamento. O fundo slate quase preto virou azul-escuro de verdade (`#0B1A33`). O texto em gradiente virou laranja sólido. Cormorant e Plus Jakarta deram lugar a Literata e Hanken Grotesk. Glows, desfoques e cartões com tudo dentro sumiram; no lugar ficaram fio de 1px, tipografia e ritmo.

O quadro aparece com força **uma vez**: no hero da home, à direita, sem véu, abaixo de um header fino e sólido. Depois volta só como recorte: a faixa dos reflexos na água que faz a passagem da noite para o papel na home, e as capas do Substack. Nunca fica atrás de texto corrido.

A memória do site vem de tipografia, escala e composição, nunca de ornamento: Literata com eixo óptico (o título do hero no desenho de exibição, opsz 72, tracking fechado), o acento em itálico da Literata nos títulos de seção, o "&" dos nomes em itálico azul-céu (a ponte da tese: tecnologia e negócio), fios de 1px e composições assimétricas diferentes em cada seção.

Os modos seguem o conteúdo, não um seletor de tema. A home e o Radar (descoberta, curadoria) ficam no azul-escuro. Tudo o que é leitura (Insights, eixos, artigos, newsletter, páginas legais) fica em papel frio (`#F2F4F7`), com moldura azul em cima (header ou cabeçalho do texto) e embaixo (rodapé). O texto é o produto: a coluna de leitura é calma, e o mundo da marca mora na moldura.

## Colors

Estratégia restrita: neutros tirados do mundo (azul e papel frio) e um acento, o laranja, que faz trabalho real (ação, link, eixo, estado ativo). O azul-céu do quadro (`#8FB3D9`) é o apoio frio, usado em rótulos sobre azul.

### Primary
- **laranja `#F97316`**: botões (sempre com texto `brasa #1C0A02`, 7:1), links e estados ativos sobre azul-escuro (5,9:1 sobre `noite`). Hover do botão: `laranja-hover #FB8A3C`.
- **laranja-fundo `#C2410C`**: o laranja sobre claro: links, rótulos e metadados em papel (5:1). Hover: `laranja-brasa #9A3412`.
- **laranja-claro `#FB923C` / laranja-palido `#FDBA74`**: texto laranja pequeno sobre azul (linha de público, eixo nos metadados) e hover de títulos-link.

### Neutral
- **noite `#0B1A33`**: chão da home (primeiro campo), do Radar, do header, das molduras. **noite-2 `#13284D`**: fundo de imagem ausente, hover de ícone. **noite-fundo `#081428`**: o campo final da home (como posso ajudar + rodapé) e o rodapé de todas as páginas.
- **noite-fio `#22385C` / noite-fio-forte `#34507D`**: todas as réguas sobre azul.
- **nevoa `#C9D6E6`**: texto corrido sobre azul (11:1). **nevoa-2 `#9FB1C8`**: secundário (8:1).
- **ceu `#8FB3D9`** (8:1 sobre noite) e **ceu-fundo `#36608C`** (5,9:1 sobre papel): a cor de apoio, com função de **orientação** — data, eixo, público ("Para quem…"), origem de um link externo, linha de metadados, o "&" dos nomes, o fio que abre a Ferramenta. Nunca ação.
- **papel `#F2F4F7`**: chão da leitura (frio, nunca creme). **papel-2 `#E7EBF1`**: código inline, fundo de imagem. **papel-fio `#D3DAE4`**: réguas finas no claro.
- **tinta `#0B1A33`**: títulos e régua forte no claro (15:1). **tinta-2 `#33445F`**: corpo de leitura. **tinta-3 `#56657D`**: datas e auxiliares.

### Named Rules
- **Laranja é ação, céu é orientação.** Botão, link de ação e estado ativo são laranja; quando, de onde e para quem são céu.
- **Laranja tem duas mãos.** `#F97316` sobre escuro, `#C2410C` sobre claro. Texto branco sobre laranja não existe.
- **Uma pintura por página.** O quadro inteiro só no hero; recortes em faixa, nunca como fundo de seção com véu.
- **Nada de creme.** O claro é papel frio azulado.

## Typography

**Literata** (variável, com eixo óptico de 7 a 72) é a voz: títulos e leitura. O eixo óptico faz o trabalho de duas famílias. No título grande o navegador escolhe o desenho de exibição (contraste alto, aberturas finas); no corpo de 19px, o desenho de texto (robusto, confortável). **Hanken Grotesk** é a interface: navegação, botões, decks da home, rótulos e metadados. **JetBrains Mono** só aparece em código.

Por quê: Literata foi desenhada para leitura longa em tela e tem a seriedade de livro que a tese pede ("negócio" e "tecnologia" no mesmo nível), sem os clichês da lista proibida (Playfair, Fraunces, Cormorant). Hanken Grotesk é uma grotesca neutra e calorosa, sem o ar de SaaS das geométricas, que fica no fundo e deixa a Literata falar.

Fontes self-hosted e recortadas para o português por `scripts/subset-fontes.py` (latim + pontuação tipográfica, eixo de peso só no intervalo usado): Literata 73 KB, itálico 42 KB (peso fixo 400, só baixa se a página usa itálico), Hanken 19 KB, Mono 19 KB (só com código). O artigo com tudo isso fica em ~153 KB. `font-synthesis-weight: none` impede negrito falso no itálico.

### Hierarchy
- **display** (Literata 600, opsz 72, 2,5rem no celular → 4,75rem, entrelinha 0,96, -0,032em): só o H1 do hero. Um degrau real acima de tudo.
- **display-hub** (Literata 600, opsz 72, 3rem → 4,5rem, -0,028em, `.display-opsz`): títulos de hub, 404, títulos de artigo e páginas legais.
- **heading** (`.h-secao`, Literata 600, 1,875–2,625rem, 1,1): títulos de seção da home e "Edições". Lê como seção, não como segundo hero.
- **accent** (`.acento`, itálico 400): a segunda metade de um título de seção ("O que eu escrevo, *e para quem*", "Engenharia é *mais do que código*"). O mesmo texto, outro desenho.
- **title** (Literata 600, 1,375–1,75rem, 1,22): itens de índice, eixos, serviços.
- **deck** (Literata 400, 1,25–1,44rem, 1,5): o resumo sob o título dos artigos e hubs.
- **reading** (Literata 400, 18px no celular, 19px a partir de md, 1,72, coluna de 66ch): corpo dos artigos.
- **ui** (Hanken 400–600, 15–17px): texto da home, navegação, botões.
- **meta** (`.meta`, Hanken 500, 14px, caixa normal, números tabulares, céu): a linha de metadados, sempre DEPOIS do título ("Mais recente · 2 Jun, 2026", "Bastidores · Casos", "Edição #1 · 3 Out, 2026", "Sobre o Autor", "Erro 404"). Separador "·" gerado em CSS.
- **label** (Hanken 600, 12px, caixa alta, +0,12em): só os títulos de coluna do rodapé.

### Named Rules
- **Ênfase é peso ou cor sólida, nunca gradiente.**
- **Sem sobrelinha acima de título.** Linhas de contexto ("Ferramenta gratuita · Experimento aberto", "Experimento aberto") vão abaixo do título. A linha de assuntos do hero desceu para o rodapé do hero.
- **Mono só para código.**
- **O "&" é a ponte.** Em nomes com "&" (eixos, áreas, serviços), o "&" sai em itálico da Literata em céu (`<Amp>`, `.amp`). Só o glifo muda.

## Layout

- Contêiner `max-w-7xl` (1280px) na home e no rodapé, `max-w-6xl` nos hubs, `max-w-3xl` na coluna de leitura (o corpo limita a 66ch). Imagem de artigo em `max-w-5xl`.
- Gutter de 16px no celular e 24px a partir de sm. Nenhum texto encosta na borda.
- Seções da home: 80px (celular) e 112px (desktop) verticais. Títulos de seção ficam em grade 5/7: título à esquerda, apoio alinhado à direita, base com base.
- **Ritmo da home: três campos, não listras.** Noite (hero, eixos, ferramenta) → recorte do quadro (reflexos) → papel (sobre, ideias recentes) → noite funda (como posso ajudar, rodapé). Cada troca é uma virada da história: descobrir → conhecer → contratar.
- **Uma composição por seção, nunca repetida em vizinhas:** eixos como portas desiguais (7/12 + duas empilhadas em 5/12); ferramenta liderada pela pergunta em itálico grande, com o nome como ficha à esquerda; sobre como índice tipográfico (nome em 2,5rem pendurado, explicação recuada a 38%); ideias recentes como lista de leitura com a data na margem; serviços como livro-razão (nome | o que é | ação à direita). O módulo "título + 3 colunas entre fios" não é usado.
- **Índice em linhas** nos hubs: data | título + resumo | miniatura, separados por fio. Varre rápido e tira o peso das fotos de banco.
- **Hero:** no desktop o quadro ocupa de 36% da largura em diante (srcset em 64vw), rampa curta e quadro limpo a partir de ~55%; só a base tem degradê. No celular o quadro vira faixa de 34svh logo abaixo do header, recortada (sem costura), e o texto desce para o azul; o botão cabe em 390×844.

## Elevation & Depth

Plano. Não há sombras, brilhos nem desfoques decorativos. A profundidade vem de três coisas: a mudança de chão (azul ↔ papel), a imagem do artigo que atravessa a borda entre a moldura azul e o papel, e o fio de 1px.

### Named Rules
- **Fio, não cartão.** Agrupamento por régua e espaço; cartões com borda, sombra e ícone não voltam.
- **Sem vidro.** O header vira azul sólido ao rolar, sem `backdrop-blur`.

## Shapes

Cantos quase retos: 3px em botões, chips e blocos; 4px em imagens; círculo só no avatar e no botão de play. Réguas de 1px; 2px só no sublinhado da aba de eixo ativa.

## Components

### Buttons
- **Primário** (`.botao`): laranja, texto `brasa`, 48px (52px no hero), canto de 3px, Hanken 700, seta que anda 3px no hover. Um por região.
- **Contato no header**: contorno laranja de 1px, 36px, preenche no hover.
- **Ação em texto** (`.acao`): um tratamento só no site. Hanken 600, 15px, caixa normal, seta (ou ícone de link externo) que anda 3px; o sublinhado de 1px só aparece no hover (também quando a linha inteira é o link). Laranja sobre azul, laranja-fundo sobre papel.

### Chips
Filtros de tema: 32px, canto de 3px, borda `papel-fio` (ou `noite-fio-forte` no Radar). O ativo fica preenchido de tinta (no Radar, de laranja com texto brasa). `aria-pressed` em todos.

### Cards / Containers
Não há cartões. A exceção é o bloco do Simulador no hub Bastidores: um painel azul-escuro com canto de 4px dentro do papel, a única caixa da página.

### Inputs / Fields
Busca com régua inferior de 1px, ícone de lupa à esquerda e foco que escurece a régua. Sem caixa, sem pílula flutuante.

### Navigation
- **Header**: 64px no celular, 72px a partir de lg, sempre `noite` sólido com fio (o fio acende um tom ao rolar). O quadro começa abaixo dele. Links em Hanken 15px; o ativo é branco com régua laranja embaixo, e no hover a régua cresce da esquerda.
- **Menu móvel**: lista em Literata 20px com fios e o botão Contato.
- **Barra do artigo**: 56px em azul, fixa no topo, com logo, divisor, "Voltar" e compartilhar.
- **Abas de eixo** nos hubs: texto com sublinhado de 2px laranja, coladas na base da moldura azul.

### Moldura de leitura (componente-assinatura)
`ArtigoShell` serve Insights, Radar e newsletter. No fim do texto: a caixa da newsletter (entre dois fios de tinta) e o bloco do autor (nome em Literata, "Sobre o Autor" como metadado abaixo). No topo, o cabeçalho azul: título em display, deck em Literata, uma régua e os metadados (eixo em laranja-claro · categoria · data · leitura; o ponto médio fica preso ao item seguinte). A imagem atravessa a borda azul/papel. Embaixo, a coluna `.leitura` em papel e o bloco do autor. No corpo:
- links em laranja-fundo com sublinhado a 45%, que fecha no hover;
- marcadores de lista em laranja-fundo;
- citação em itálico com régua de 1px;
- tabelas em Hanken com números tabulares e fios;
- código inline em chip de papel-2;
- blocos de código Shiki com fundo `noite` (sangram a coluna no celular).

## Do's and Don'ts

### Do:
- Use `#F97316` com texto `#1C0A02` em todo botão; `#C2410C` para laranja sobre papel.
- Mostre o quadro inteiro uma vez por página (hero); fora disso, só recorte em faixa.
- Separe com fio de 1px e espaço; deixe Literata carregar a hierarquia.
- Mantenha a coluna de leitura em 66ch, corpo de 18–19px, em papel frio.
- Use tabular-nums em datas e metadados (`.num`).
- Respeite `prefers-reduced-motion`: o único movimento autoral (o quadro assentando de 1,06 para 1 ao carregar) desliga.

### Don't:
- Não use texto em gradiente, glow laranja, sombra colorida, `backdrop-blur` decorativo nem zoom de imagem no hover.
- Não ponha o quadro (nem textura nenhuma) atrás de texto corrido.
- Não use fundo creme nem slate quase preto (`#020617`).
- Não volte a Cormorant, Plus Jakarta, Playfair, Fraunces, Inter ou outras da lista proibida.
- Não ponha sobrelinha ou rótulo acima de título; nem caixa alta em frase. Contexto vai na linha `.meta` abaixo.
- Não repita o módulo "título + 3 colunas iguais entre fios", nem alterne fundo seção a seção.
- Não use mono como fantasia "técnica" fora de código.
