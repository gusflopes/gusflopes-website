---
name: gusflopes.dev
description: Concretismo — tecnologia e negócio montados como construção tipográfica, em azul-escuro, papel frio e laranja.
colors:
  azul: "#0B1A33"
  azul-2: "#13284D"
  azul-3: "#1D3866"
  papel: "#F2F4F7"
  papel-2: "#E4E9F0"
  filete: "#C9D3E0"
  tinta-2: "#4A5872"
  ceu: "#8FB3D9"
  ceu-claro: "#B7C6DA"
  laranja: "#F97316"
  laranja-claro: "#FB923C"
  laranja-palido: "#FDBA74"
  laranja-fundo: "#C2410C"
  laranja-tinta: "#1C0A02"
typography:
  abertura:
    fontFamily: "Archivo Variable, Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "min(calc(var(--fit) * 1cqi), var(--teto))"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  display:
    fontFamily: "Archivo Variable, Archivo, sans-serif"
    fontSize: "clamp(2rem, 5vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  titulo-lista:
    fontFamily: "Archivo Variable, Archivo, sans-serif"
    fontSize: "clamp(1.5rem, 2.4vw, 1.875rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.012em"
  linha-fina:
    fontFamily: "Archivo Variable, Archivo, sans-serif"
    fontSize: "clamp(1.25rem, 1rem + 1.2vw, 2rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.005em"
  rotulo:
    fontFamily: "Archivo Variable, Archivo, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 650
    lineHeight: 1.35
    letterSpacing: "0.12em"
  leitura:
    fontFamily: "Source Serif 4 Variable, Source Serif 4, Georgia, serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  codigo:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  none: "0px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  largura: "1240px"
  secao: "112px"
  secao-movel: "80px"
components:
  button-primary:
    backgroundColor: "{colors.laranja}"
    textColor: "{colors.laranja-tinta}"
    typography: "{typography.rotulo}"
    rounded: "{rounded.none}"
    padding: "0 1.6rem"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.azul}"
  button-primary-hover-on-papel:
    backgroundColor: "{colors.azul}"
    textColor: "{colors.papel}"
  filtro-celula:
    backgroundColor: "{colors.azul}"
    textColor: "{colors.ceu-claro}"
    typography: "{typography.rotulo}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  filtro-celula-ativa:
    backgroundColor: "{colors.laranja}"
    textColor: "{colors.laranja-tinta}"
  input-busca:
    textColor: "{colors.azul}"
    rounded: "{rounded.none}"
    padding: "0 0 8px 0"
  nav-header:
    backgroundColor: "{colors.azul}"
    textColor: "{colors.ceu-claro}"
    typography: "{typography.rotulo}"
    height: "72px"
---

# Design System: gusflopes.dev

## Overview

**Creative North Star: "A palavra como construção"**

O site é uma peça de poesia concreta brasileira (Noigandres, Augusto de Campos) composta com a disciplina da escola de Ulm que Alexandre Wollner trouxe ao Brasil: a tese da marca — "Tecnologia e negócio, partes do mesmo sistema" — é montada como bloco de tipo, e todo o resto é grade rígida, filete e campo de cor chapado. Não há ilustração, foto de banco, sombra ou vidro. A única imagem é o quadro da marca (cidade noturna em pinceladas), visto por uma janela laranja girada, uma vez por página no máximo.

Dois campos se alternam: **azul-escuro** é a moldura (cabeçalhos, aberturas, seções de tese, rodapé) e **papel frio** é onde se lê (corpo dos textos, listas, a tabela de temas). O laranja entra em blocos — botão, célula ativa, a janela, o dois-pontos da abertura — nunca como brilho.

O sistema resolve o risco declarado da direção ("ótimo para a home, difícil sustentar em 40 textos") com regras, não com composição manual: cada título vira abertura por um algoritmo determinístico (`src/lib/abertura.ts`) cuja forma depende do eixo editorial.

**Key Characteristics:**
- Aberturas tipográficas geradas do título: caixa-alta Archivo 900, linhas ajustadas à largura, uma linha vazada só no contorno, separador em laranja.
- Grade de filetes de 1–2px e células separadas por `gap` sobre fundo azul (a cor do fundo vira a linha).
- Cantos retos em tudo (`rounded: 0`), zero sombra.
- Leitura calma: Source Serif 4, 18–19px, 68ch, tinta azul-escuro sobre papel frio.
- Uma janela laranja girada 12° com o quadro, no máximo uma vez por página.

## Colors

Estratégia **comprometida em dois campos**: azul-escuro e papel frio dividem a página em regiões inteiras; o laranja é o único acento e aparece chapado.

### Primary
- **Laranja** (`#F97316`): botão primário, célula de filtro ativa, janela, dois-pontos/travessão da abertura, rótulos sobre azul, barra de item ativo no menu. Sobre ele, texto `#1C0A02` (6,85:1).
- **Laranja profundo** (`#C2410C`): o laranja para texto e links sobre papel (4,7:1 sobre `#F2F4F7`); também o accent do Substack (branco sobre ele: 5,2:1).

### Neutral
- **Azul-escuro** (`#0B1A33`): campo da moldura e tinta do texto sobre papel (15,75:1 com o papel).
- **Azul 2 / Azul 3** (`#13284D`, `#1D3866`): fundo do quadro dentro da janela, hover de célula, filetes sobre azul.
- **Papel frio** (`#F2F4F7`) e **Papel 2** (`#E4E9F0`): campo de leitura e hover de linha/código inline.
- **Filete** (`#C9D3E0`): divisórias finas entre linhas de lista e tabela sobre papel.
- **Tinta 2** (`#4A5872`): texto secundário sobre papel (6,5:1).
- **Céu / Céu claro** (`#8FB3D9`, `#B7C6DA`): texto secundário e linha-fina sobre azul (7,95:1 e 10:1). Vem do céu do quadro.

### Named Rules
**The Two Fields Rule.** Toda seção é azul-escuro ou papel frio, inteira. Nada de cinza intermediário nem degradê entre eles.

**The Solid Orange Rule.** O laranja é bloco chapado ou tipo; nunca halo, brilho, degradê ou sombra colorida.

## Typography

**Display:** Archivo variável (eixos wght 100–900, wdth 62–125), self-hosted via `@fontsource-variable/archivo`. A instância 900/100 faz o papel de "Archivo Black"; 600–750 em largura 75% faz o papel de "Archivo Narrow" nos rótulos; 500–800 em 87% faz títulos de lista e linhas-finas.
**Leitura:** Source Serif 4 variável (wght), com itálico carregado só quando usado.
**Código:** JetBrains Mono, só em `code`/`pre`.

Uma família de display com dois eixos substitui três famílias da maquete: o mesmo desenho dá o bloco pesado e o rótulo estreito, que é exatamente a coerência de sistema que a escola de Ulm pedia.

### Hierarchy
- **Abertura** (900, caixa-alta, line-height 0,92, tracking −0,02em): corpo por linha em `cqi`, calculado no build; teto 7,5–9rem nas páginas, 20rem na tese da home.
- **Display** (900, caixa-alta, 2–4,5rem): títulos de seção ("Como posso ajudar", "Ideias recentes", "Edições").
- **Título de lista** (800, largura 87%, 1,5–1,875rem, caixa normal): itens de hubs e listas; o mais recente do hub sobe para 900 caixa-alta.
- **Linha-fina** (500, largura 87%): cauda da abertura e frase de apoio do hero, em céu sobre azul.
- **Rótulo** (650, largura 75%, 0,8125rem, caixa-alta, tracking 0,12em): metadados, navegação, ações. Só textos curtos.
- **Leitura** (Source Serif 4, 18px no celular, 19px a partir de 768px, line-height 1,7, máx. 68ch).

### Named Rules
**The Abertura Rule.** Todo título de texto (artigo, edição, hub, seção de tese) é desenhado por `src/lib/abertura.ts`: corte no primeiro ": " (ou travessão, ou parêntese) em cabeça e cauda; palavras curtas grudam na seguinte; 1–5 linhas pelo comprimento; partição mais equilibrada pelas larguras reais dos glifos (`src/lib/abertura-metricas.json`, gerado por `scripts/gerar-metricas-abertura.mjs`). Forma por eixo: **Engenharia & IA / Newsletter = bloco** (linhas justificadas, última vazada); **Negócios = escada** (larguras decrescentes, à direita, primeira vazada); **Bastidores = degraus** (corpo único, recuo progressivo, linha do meio vazada).

**The One Outline Rule.** Uma linha vazada por bloco, nunca mais. Se a cabeça tem uma linha só, nenhuma.

**The Quiet Column Rule.** Nenhum jogo tipográfico dentro da coluna de leitura: o corpo é serifa calma; o sistema fica na moldura.

## Layout

Grade de 12 colunas numa moldura de 1240px com gutter `clamp(16px, 4vw, 48px)`. Seções com 80px (celular) / 112px (desktop) de respiro vertical. A coluna de leitura dos textos começa na coluna 4 (margem esquerda vazia, assimétrica); a abertura ocupa 8 colunas e a linha-fina do artigo as 4 restantes, alinhadas pela base.

Grades de células usam `gap: 2px` sobre o campo azul para que o próprio fundo vire o filete (faixa dos eixos, filtros de eixo). Listas são tabelas: data/duração (2 colunas), título + resumo (7), eixo/categoria + ação (3).

Header fixo de 72px; páginas de texto trocam o header por uma barra de 56px (voltar / compartilhar).

## Elevation & Depth

Plano. Nenhuma sombra, nenhum blur, nenhum vidro. Profundidade só por campo de cor (azul sobre papel, laranja sobre azul) e pela rotação de 12° da janela.

### Named Rules
**The Flat Plane Rule.** Se algo precisa se destacar, muda de campo ou de peso — não ganha sombra.

## Shapes

Cantos retos em tudo: botões, células, inputs, blocos de código, foto do autor (quadrada, em tons de cinza). A única forma não ortogonal é a janela: um quadrado laranja girado 12° com o quadro contra-girado dentro. Marcadores de lista e de citação são quadrados laranja.

## Components

### Buttons
- **Primário (`.botao`)**: bloco laranja, texto `#1C0A02`, Archivo 800 largura 87% em caixa-alta, 52px de altura, canto reto. Hover: vira papel com tinta azul (sobre azul) ou azul com tinta papel (sobre papel).
- **Ação (`.acao`)**: rótulo laranja com seta; sublinhado de 2px aparece no hover. Laranja `#F97316` sobre azul, `#C2410C` sobre papel.

### Chips (filtros)
- **Célula de eixo**: célula de grade azul com rótulo céu-claro; ativa = bloco laranja. `aria-pressed`.
- **Categoria**: rótulo pequeno sem caixa; ativa = bloco azul com texto papel.

### Cards / Containers
Não há cards. Conteúdo agrupado vira linha de tabela (borda inferior em filete), célula de grade ou campo azul inteiro (vídeo em destaque, caixa da newsletter, destaque do simulador em Bastidores).

### Inputs / Fields
Busca: sem caixa; só um filete inferior de 2px azul, que fica laranja profundo no foco; ícone de lupa em traço 2,5.

### Navigation
Header azul chapado, itens em rótulo céu-claro; o ativo fica papel com uma barra laranja de 4px na base. "Contato" é o único botão laranja da barra. No celular, menu em painel azul com itens em display 1,75rem separados por filetes.

### Abertura (signature component)
`<Abertura titulo eixo as teto />` (`src/components/Abertura.tsx`). Renderiza o heading com o título completo na ordem original; cada linha é um `span` com `--fit` (cqi) e `--recuo`; o heading é contêiner de tamanho (`container-type: inline-size`). O mesmo dado alimenta o gerador de capas do Substack (`docs/substack-kit/gerar-capa.mjs`).

### Janela (signature component)
Bloco laranja girado 12°, inset de 9%, com o quadro (AVIF/WebP responsivo) contra-girado e ampliado dentro. Com `animation-timeline: view()` o quadro desliza ±7% dentro da janela durante o scroll; desligado em `prefers-reduced-motion`. Uso: uma vez por página, no máximo (hoje só no hero da home e nas capas do Substack).

### Corpo de leitura (`.leitura`)
H2 em Archivo 850 com filete de 2px acima; H3 em 800/87%; links laranja profundo sublinhados; listas com quadrado laranja; citação em itálico entre filetes com quadrado laranja; código em bloco azul-escuro (tema Shiki), código inline em papel 2; tabelas em rótulo + tabular-nums.

## Do's and Don'ts

### Do:
- **Do** gerar todo título de texto pela abertura; nunca compor quebra à mão por artigo.
- **Do** alternar campos inteiros azul / papel ao descer a página.
- **Do** usar `#C2410C` para texto laranja sobre papel e `#F97316` sobre azul.
- **Do** manter o corpo em Source Serif 4, 68ch, sem efeito.
- **Do** usar filete e `gap` sobre azul para desenhar grades.

### Don't:
- **Don't** pôr o quadro ou qualquer textura atrás de texto corrido; ele só aparece dentro da janela.
- **Don't** usar mais de uma janela por página, nem mais de uma linha vazada por bloco.
- **Don't** usar sombra, blur, vidro, degradê, cantos arredondados ou cards com borda.
- **Don't** usar caixa-alta em texto com mais de uma linha curta (rótulos só para metadados curtos).
- **Don't** voltar a foto de banco no topo dos textos; ela fica só como imagem de prévia social (OG).
