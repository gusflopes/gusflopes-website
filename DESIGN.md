---
name: gusflopes.dev
description: Metrô Noturno — os eixos editoriais são linhas, os textos são estações, a ponte negócio/tecnologia é a baldeação.
colors:
  noite: "#0B1A33"
  noite-2: "#13284D"
  trilho: "#24406B"
  luz: "#EEF2F8"
  nevoa: "#A9BCD3"
  laranja: "#F97316"
  laranja-claro: "#FB923C"
  ambar: "#FDBA74"
  laranja-fundo: "#C2410C"
  ceu: "#8FB3D9"
  brasa: "#1C0A02"
  papel: "#F2F4F7"
  tinta: "#14233D"
  tinta-2: "#4A5A72"
  fio: "#D5DCE6"
typography:
  display:
    fontFamily: "Hanken Grotesk Variable, Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 5vw, 3.8rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Hanken Grotesk Variable, Hanken Grotesk, ui-sans-serif, sans-serif"
    fontSize: "2.6rem"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Hanken Grotesk Variable, Hanken Grotesk, ui-sans-serif, sans-serif"
    fontSize: "1.9rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Source Serif 4 Variable, Source Serif 4, Georgia, serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Hanken Grotesk Variable, Hanken Grotesk, ui-sans-serif, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 700
    letterSpacing: "0.1em"
  code:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.86rem"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  sm: "4px"
  md: "6px"
  pill: "999px"
spacing:
  gutter-mobile: "16px"
  gutter: "24px"
  section: "96px"
  station: "48px"
components:
  button-primary:
    backgroundColor: "{colors.laranja}"
    textColor: "{colors.brasa}"
    rounded: "{rounded.md}"
    padding: "0 28px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.laranja-claro}"
    textColor: "{colors.brasa}"
  button-contato:
    backgroundColor: "transparent"
    textColor: "{colors.laranja-claro}"
    rounded: "{rounded.pill}"
    height: "36px"
  placa-linha:
    backgroundColor: "{colors.laranja}"
    textColor: "{colors.brasa}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  chip-filtro-ativo:
    backgroundColor: "{colors.luz}"
    textColor: "{colors.noite}"
    rounded: "{rounded.pill}"
    height: "40px"
  input-busca:
    backgroundColor: "{colors.noite-2}"
    textColor: "{colors.luz}"
    rounded: "{rounded.md}"
    height: "44px"
  coluna-leitura:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    typography: "{typography.body}"
    width: "68ch"
---

# Design System: gusflopes.dev

## Overview

**Creative North Star: "Metrô Noturno"**

O site é um mapa de rede de transporte sobre a cidade do quadro, à noite. Cada eixo editorial é uma linha com a sua
cor, cada texto autoral é uma estação numerada por data dentro da linha, e a tese da marca (tecnologia e negócio,
partes do mesmo sistema) aparece como baldeação: quando textos de linhas diferentes têm tag em comum, as linhas se
ligam. A moldura (barra de sinalização, mapa, títulos, índices) é noturna e fala em Hanken Grotesk como placa de
estação; a leitura acontece em papel frio, numa coluna serifada e calma.

O quadro da marca (cidade noturna em pinceladas) aparece uma única vez por página e só no topo da home: apagado
(~30% de opacidade), mascarado em degradê, atrás do mapa das linhas. Nunca atrás de texto corrido. Densidade média,
sem cards com sombra: estrutura vem de trilhos, estações e fios.

**Key Characteristics:**
- Trilhos de 5–6px na cor da linha; estações = círculo de miolo escuro com anel claro.
- "Você está aqui": estação atual maior, anel na cor da linha, contorno claro.
- Serviço tracejado para Radar (trilho azul-ardósia) e Newsletter (laranja).
- Moldura noturna, coluna de leitura em papel frio.
- Uma tipografia de sinalização (Hanken Grotesk) e uma de leitura (Source Serif 4).

## Colors

Paleta oficial azul-escuro + laranja, com o azul-céu e o âmbar do quadro como cores de linha.

### Primary
- **Laranja Sinal** (laranja): linha Engenharia & IA, botão primário, destaque. Botão laranja sempre com texto Brasa.
- **Laranja Fundo** (laranja-fundo): links e destaques laranja sobre o papel (4,7:1).
- **Laranja Claro** (laranja-claro): links e destaques laranja sobre a noite; segunda linha da tagline.

### Secondary
- **Azul-Céu do Quadro** (ceu): linha Negócios.
- **Âmbar de Lampião** (ambar): linha Bastidores; rótulos curtos sobre a noite.

### Neutral
- **Noite** (noite): fundo da moldura, barra, hubs, rodapé.
- **Noite Funda 2** (noite-2): faixas alternadas, painéis (newsletter, aside de Bastidores), campos.
- **Trilho** (trilho): fios e divisórias sobre a noite; trilho tracejado do Radar.
- **Luz** (luz) e **Névoa** (nevoa): texto principal e secundário sobre a noite (15:1 e 8,9:1).
- **Papel Frio** (papel), **Tinta** (tinta), **Tinta 2** (tinta-2), **Fio** (fio): a coluna de leitura e as faixas claras da home.
- **Brasa** (brasa): texto sobre laranja e sobre as placas de linha.

### Named Rules
**A Regra da Linha.** Cor de linha só nomeia linha: laranja = Engenharia & IA, céu = Negócios, âmbar = Bastidores (fonte: `src/lib/linhas.ts`, chaves de `src/lib/eixos.ts`). Nada de nova cor fora da paleta; serviços extras são tracejados.

**A Regra do Quadro.** O quadro entra apagado e mascarado atrás do mapa, nunca atrás de parágrafo.

## Typography

**Display Font:** Hanken Grotesk (variável, self-hosted)
**Body Font:** Source Serif 4 (variável com eixo óptico, itálico real)
**Label/Mono Font:** JetBrains Mono só em código

**Character:** grotesca de sinalização, larga e firme nos pesos 700–800, contra uma serifa de texto tranquila. A placa orienta; a serifa conversa.

### Hierarchy
- **Display** (800, até 3,8rem, 1.02): tagline da home, título de artigo (até 3,6rem), nome dos hubs.
- **Headline** (800, 2,6rem, 1.08): títulos de seção da home.
- **Title** (800, 1,4–1,9rem, 1.15): títulos de estação nos índices.
- **Body** (400, 18–19px, 1.7, máx. 68ch): corpo dos artigos em Source Serif 4 sobre o papel; excertos e decks em serifa sobre a noite.
- **Label** (700, 0,75–0,8rem, 0.08–0.12em, caixa-alta): data, categoria, ações curtas.

### Named Rules
**A Regra da Placa.** Títulos, navegação e rótulos em Hanken; tudo que se lê em parágrafo em Source Serif 4. Mono nunca como figurino.

## Layout

Contêiner de 72rem (desktop) / 80rem (barra), gutter de 16px no celular e 24px a partir de 640px. Home: primeira
dobra em 12 colunas (tese em 5, mapa em 7). Índices: uma coluna com trilhos paralelos à esquerda, um por linha
presente. Artigo: coluna de leitura de 68ch centrada (≈680px). Seções da home alternam noite / papel / noite-2 com
96–112px de respiro. No mobile o mapa vira trilho vertical (diagrama dentro do vagão), sem rolagem horizontal; o
trilho do artigo distribui as estações em largura flexível.

## Elevation & Depth

Plano por padrão: profundidade vem de troca de chão (noite → noite-2 → papel) e de trilhos, não de sombra. Exceções
pontuais: o botão primário da home leva um brilho baixo com deslocamento, e blocos de código uma sombra curta sobre
o papel.

### Shadow Vocabulary
- **Botão primário** (`0 1px 0 rgb(255 255 255/0.25) inset, 0 10px 24px -12px rgb(249 115 22/0.7)`): só no CTA da newsletter.
- **Código no papel** (`0 1px 2px rgb(11 26 51/0.15), 0 8px 24px -12px rgb(11 26 51/0.45)`).

## Shapes

Cantos discretos: 4–6px em botões, campos, imagens e código; pílula só para placas de linha, filtros de eixo e o
botão Contato. Círculo é a estação; pílula horizontal é a estação de baldeação. Trilhos têm pontas arredondadas.

## Components

### Buttons
- **Shape:** cantos de 6px.
- **Primary:** laranja com texto brasa, 52px de altura na home e 48px no resto; hover para laranja claro.
- **Contato:** pílula vazada com borda laranja; hover preenche.
- **Ações de texto:** caixa-alta 700 em laranja claro (noite) ou laranja fundo (papel), com seta que avança 4px no hover.

### Chips
- **Filtro de eixo:** pílula com roundel da cor da linha; ativo = fundo luz, texto noite.
- **Tema:** retângulo 6px; ativo = laranja com texto brasa.

### Inputs / Fields
- **Busca:** fundo noite-2, borda trilho, 44px; foco troca a borda para laranja claro.

### Navigation
- **Barra:** sempre noturna, fixa, 64px. Eixos com roundel da linha; ativo e hover ganham trilho de 4px por baixo, na cor da linha. Mobile: painel noite-2 com os mesmos roundels.
- **Artigo:** a barra global some; o artigo tem a sua (logo, voltar, compartilhar).

### Mapa das linhas (assinatura)
Placa da linha (pílula na cor, contagem de estações) e trilho horizontal com as 4 estações mais recentes; títulos
em três linhas. Quando há baldeação, uma passagem dupla clara liga as placas e as linhas nascem nela.

### Trilho do artigo ("você está aqui")
Todas as estações da linha, em ordem de data, como links; a atual com anel na cor da linha. No rodapé, estação
anterior e próxima com trecho de linha; acima, as baldeações (até três textos de outras linhas com tag em comum).

### Coluna de leitura
Papel frio, Source Serif 4 19px/1.7, 68ch. h2 abre com trecho de linha de 44×5px na cor do eixo; marcadores de lista
são estaçõezinhas; citação com fio de 1px e itálico real; código em painel noite; tabelas com algarismos tabulares.

## Do's and Don'ts

### Do:
- **Do** derivar linhas de `src/lib/eixos.ts` e cores de `src/lib/linhas.ts`.
- **Do** mostrar estações só com dado real (data, ordem, tag em comum) e como links de verdade.
- **Do** manter a coluna de leitura no papel, 60–75 caracteres.
- **Do** usar o tracejado para serviços que não são eixo (Radar, Newsletter).

### Don't:
- **Don't** pôr o quadro, gradiente ou textura atrás de texto corrido.
- **Don't** criar cor de linha fora da paleta oficial.
- **Don't** voltar aos cards com borda laranja brilhante e thumbnail de stock nos índices.
- **Don't** inventar baldeação: só existe se houver tag em comum.
