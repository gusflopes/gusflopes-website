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
    fontSize: "clamp(2.625rem, 5vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.018em"
  heading:
    fontFamily: "Literata Variable, Literata, Georgia, serif"
    fontSize: "clamp(2.125rem, 3.5vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.012em"
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
---

# Design System: gusflopes.dev — Evolução

## Overview

O site de antes, limpo e executado com acabamento de site premiado. O mundo não muda: azul-escuro e laranja, o quadro da cidade noturna em pinceladas como imagem da marca. Mudou o acabamento. O fundo slate quase preto virou azul-escuro de verdade (`#0B1A33`). O texto em gradiente virou laranja sólido. Cormorant e Plus Jakarta deram lugar a Literata e Hanken Grotesk. Glows, desfoques e cartões com tudo dentro sumiram; no lugar ficaram fio de 1px, tipografia e ritmo.

O quadro aparece com força **uma vez**: no hero da home, inteiro à direita, sem véu. Depois volta só como recorte, numa faixa dos reflexos na água que abre a seção "Sobre", e nas capas do Substack. Nunca fica atrás de texto corrido.

Os modos seguem o conteúdo, não um seletor de tema. A home e o Radar (descoberta, curadoria) ficam no azul-escuro. Tudo o que é leitura (Insights, eixos, artigos, newsletter, páginas legais) fica em papel frio (`#F2F4F7`), com moldura azul em cima (header ou cabeçalho do texto) e embaixo (rodapé). O texto é o produto: a coluna de leitura é calma, e o mundo da marca mora na moldura.

## Colors

Estratégia restrita: neutros tirados do mundo (azul e papel frio) e um acento, o laranja, que faz trabalho real (ação, link, eixo, estado ativo). O azul-céu do quadro (`#8FB3D9`) é o apoio frio, usado em rótulos sobre azul.

### Primary
- **laranja `#F97316`**: botões (sempre com texto `brasa #1C0A02`, 7:1), links e estados ativos sobre azul-escuro (5,9:1 sobre `noite`). Hover do botão: `laranja-hover #FB8A3C`.
- **laranja-fundo `#C2410C`**: o laranja sobre claro: links, rótulos e metadados em papel (5:1). Hover: `laranja-brasa #9A3412`.
- **laranja-claro `#FB923C` / laranja-palido `#FDBA74`**: texto laranja pequeno sobre azul (linha de público, eixo nos metadados) e hover de títulos-link.

### Neutral
- **noite `#0B1A33`**: chão da home, do Radar, do header, das molduras. **noite-2 `#13284D`**: seção alternada (serviços), fundo de imagem ausente. **noite-fundo `#081428`**: rodapé.
- **noite-fio `#22385C` / noite-fio-forte `#34507D`**: todas as réguas sobre azul.
- **nevoa `#C9D6E6`**: texto corrido sobre azul (11:1). **nevoa-2 `#9FB1C8`**: secundário e metadados (8:1). **ceu `#8FB3D9`**: rótulos de seção do rodapé e a linha de assuntos do hero.
- **papel `#F2F4F7`**: chão da leitura (frio, nunca creme). **papel-2 `#E7EBF1`**: código inline, fundo de imagem. **papel-fio `#D3DAE4`**: réguas finas no claro.
- **tinta `#0B1A33`**: títulos e régua forte no claro (15:1). **tinta-2 `#33445F`**: corpo de leitura. **tinta-3 `#56657D`**: datas e auxiliares.

### Named Rules
- **Laranja tem duas mãos.** `#F97316` sobre escuro, `#C2410C` sobre claro. Texto branco sobre laranja não existe.
- **Uma pintura por página.** O quadro inteiro só no hero; recortes em faixa, nunca como fundo de seção com véu.
- **Nada de creme.** O claro é papel frio azulado.

## Typography

**Literata** (variável, com eixo óptico de 7 a 72) é a voz: títulos e leitura. O eixo óptico faz o trabalho de duas famílias. No título grande o navegador escolhe o desenho de exibição (contraste alto, aberturas finas); no corpo de 19px, o desenho de texto (robusto, confortável). **Hanken Grotesk** é a interface: navegação, botões, decks da home, rótulos e metadados. **JetBrains Mono** só aparece em código.

Por quê: Literata foi desenhada para leitura longa em tela e tem a seriedade de livro que a tese pede ("negócio" e "tecnologia" no mesmo nível), sem os clichês da lista proibida (Playfair, Fraunces, Cormorant). Hanken Grotesk é uma grotesca neutra e calorosa, sem o ar de SaaS das geométricas, que fica no fundo e deixa a Literata falar.

### Hierarchy
- **display** (Literata 600, 2,6–4,25rem, entrelinha 1,04, -0,018em): título do hero, títulos de hub, 404.
- **heading** (Literata 600, 2,1–3rem, 1,08): títulos de seção da home.
- **title** (Literata 600, 1,375–1,75rem, 1,22): itens de índice, eixos, serviços.
- **deck** (Literata 400, 1,25–1,44rem, 1,5): o resumo sob o título dos artigos e hubs.
- **reading** (Literata 400, 18px no celular, 19px a partir de md, 1,72, coluna de 66ch): corpo dos artigos.
- **ui** (Hanken 400–600, 15–17px): texto da home, navegação, botões.
- **label** (Hanken 600, 12px, caixa alta, +0,12em): rótulos curtos (eixo · categoria, "Mais recente", títulos do rodapé). Nunca em frases: texto de mais de três palavras fica em caixa normal.

### Named Rules
- **Ênfase é peso ou cor sólida, nunca gradiente.**
- **Sem sobrelinha acima de título.** Linhas de contexto ("Ferramenta gratuita · Experimento aberto", "Experimento aberto") vão abaixo do título. A linha de assuntos do hero desceu para o rodapé do hero.
- **Mono só para código.**

## Layout

- Contêiner `max-w-7xl` (1280px) na home e no rodapé, `max-w-6xl` nos hubs, `max-w-3xl` na coluna de leitura (o corpo limita a 66ch). Imagem de artigo em `max-w-5xl`.
- Gutter de 16px no celular e 24px a partir de sm. Nenhum texto encosta na borda.
- Seções da home: 80px (celular) e 112px (desktop) verticais. Títulos de seção ficam em grade 5/7: título à esquerda, apoio alinhado à direita, base com base.
- **Ritmo da home:** hero (azul + quadro) → eixos (azul) → ferramenta (papel) → recorte do quadro → sobre (azul, título fixo à esquerda) → serviços (azul-2) → recentes (papel) → rodapé (azul-fundo). Faixa densa ganha faixa calma.
- **Índice em linhas** nos hubs: data | título + resumo | miniatura, separados por fio. Varre rápido e tira o peso das fotos de banco.
- **Hero no celular:** o quadro vira faixa no topo (46svh) e o texto desce para o azul sólido, em vez de ficar por cima da pintura.

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
- **Ação em texto** (`.acao`): Hanken 600 com sublinhado de 1px que engrossa para 2px no hover, mais uma seta. Laranja sobre azul, laranja-fundo sobre papel.

### Chips
Filtros de tema: 32px, canto de 3px, borda `papel-fio` (ou `noite-fio-forte` no Radar). O ativo fica preenchido de tinta (no Radar, de laranja com texto brasa). `aria-pressed` em todos.

### Cards / Containers
Não há cartões. A exceção é o bloco do Simulador no hub Bastidores: um painel azul-escuro com canto de 4px dentro do papel, a única caixa da página.

### Inputs / Fields
Busca com régua inferior de 1px, ícone de lupa à esquerda e foco que escurece a régua. Sem caixa, sem pílula flutuante.

### Navigation
- **Header**: 72px. Na home é transparente sobre o quadro e vira `noite` sólido com fio ao rolar 24px; nas outras páginas já nasce sólido. Links em Hanken 15px; o ativo é branco com régua laranja embaixo, e no hover a régua cresce da esquerda.
- **Menu móvel**: lista em Literata 20px com fios e o botão Contato.
- **Barra do artigo**: 56px em azul, fixa no topo, com logo, divisor, "Voltar" e compartilhar.
- **Abas de eixo** nos hubs: texto com sublinhado de 2px laranja, coladas na base da moldura azul.

### Moldura de leitura (componente-assinatura)
`ArtigoShell` serve Insights, Radar e newsletter. No topo, o cabeçalho azul: título em display, deck em Literata, uma régua e os metadados (eixo em laranja-claro · categoria · data · leitura; o ponto médio fica preso ao item seguinte). A imagem atravessa a borda azul/papel. Embaixo, a coluna `.leitura` em papel e o bloco do autor. No corpo:
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
- Não ponha sobrelinha ou rótulo acima de título; nem caixa alta em frase.
- Não use mono como fantasia "técnica" fora de código.
