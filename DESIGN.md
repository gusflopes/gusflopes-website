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
  laranja-tinta: "#0B1A33"
typography:
  abertura:
    fontFamily: "Archivo Variable, Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "min(calc(var(--fit) * 1cqi), var(--teto))"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  abertura-estreita:
    fontFamily: "Archivo Variable, Archivo, sans-serif"
    fontSize: "min(calc(var(--fit) * 1cqi), var(--teto))"
    fontWeight: 850
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  tese:
    fontFamily: "Archivo Variable, Archivo, sans-serif"
    fontSize: "min(calc(var(--fit) * 1cqi), 20rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.02em"
  numeral:
    fontFamily: "Archivo Variable, Archivo, sans-serif"
    fontSize: "clamp(2.75rem, 5vw, 4.25rem)"
    fontWeight: 250
    lineHeight: 0.82
    letterSpacing: "-0.04em"
  display:
    fontFamily: "Archivo Variable, Archivo, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3rem)"
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
  celula-acao:
    backgroundColor: "{colors.laranja}"
    textColor: "{colors.laranja-tinta}"
    typography: "{typography.abertura-estreita}"
    rounded: "{rounded.none}"
    padding: "24px"
  celula-acao-hover:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.azul}"
  button-on-laranja:
    backgroundColor: "{colors.azul}"
    textColor: "{colors.papel}"
    typography: "{typography.rotulo}"
    rounded: "{rounded.none}"
    padding: "0 1.6rem"
    height: "52px"
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

Dois campos dividem a página em regiões inteiras: **azul-escuro** é a moldura (cabeçalhos, aberturas, tese, eixos, ferramenta, rodapé) e **papel frio** é onde se lê (corpo dos textos, listas, vídeo, temas, serviços). Um campo carrega várias seções: a home troca de campo só duas vezes. O **laranja** é plano estrutural — ocupa uma célula inteira quando marca a ação principal da região (newsletter, diagnóstico, simulador) ou a ordem real (o texto mais recente de um hub) — e, fora disso, aparece como tipo (o "&" dos temas, o dois-pontos da abertura), nunca como brilho.

A grade rígida é o motor de toda página, não só das aberturas: cada seção é uma composição de células desenhadas pelo próprio fundo nos vãos de 2px, com tipo que ocupa a célula inteira (abertura estreita, bloco justificado) e números que só aparecem quando codificam algo verdadeiro (data, número da edição, ordem).

O sistema resolve o risco declarado da direção ("ótimo para a home, difícil sustentar em 40 textos") com regras, não com composição manual: cada título vira abertura por um algoritmo determinístico (`src/lib/abertura.ts`) cuja forma depende do eixo editorial.

**Key Characteristics:**
- Aberturas tipográficas geradas do título: caixa-alta Archivo 900 (larga) ou 850/62 (estreita, títulos de seção), linhas ajustadas à largura, uma linha leve (o mesmo desenho no peso 100, sólida: o par 900/100), separador em laranja. Contorno vazado só no MESMO da tese e no Simulador.
- Laranja como plano: a ação principal de cada região é uma célula laranja inteira, com botão azul sobre ela.
- Rótulos nunca acima do título: metadados numa célula ao lado ou numa linha depois.
- Grade de filetes de 1–2px e células separadas por `gap` sobre fundo azul (a cor do fundo vira a linha).
- Cantos retos em tudo (`rounded: 0`), zero sombra.
- Leitura calma: Source Serif 4, 18–19px, 68ch, tinta azul-escuro sobre papel frio.
- Uma janela laranja girada 12° com o quadro, no máximo uma vez por página. O ângulo conversa com um só elemento a mais: o quadrado do play do vídeo, girado 12°.

## Colors

Estratégia **comprometida em dois campos**: azul-escuro e papel frio dividem a página em regiões inteiras; o laranja é o único acento e aparece chapado.

### Primary
- **Laranja** (`#F97316`): botão primário, célula de filtro ativa, janela, dois-pontos/travessão da abertura, rótulos sobre azul, barra de item ativo no menu. Sobre ele, texto e ícones em azul-escuro da marca `#0B1A33` (6,19:1; 7,67:1 sobre `#FB923C`). Fundo laranja com texto é sempre `#F97316`: sobre `#C2410C` o azul cai para 3,35:1.
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
- **Tese** (900, line-height 0,86, sem respiro entre linhas): o bloco da home, cinco linhas, "e negócio," menor em laranja, MESMO vazado (um dos dois contornos do site).
- **Abertura larga** (900, caixa-alta, line-height 0,92, tracking −0,02em): títulos de texto, hubs, 404, páginas legais e as seções de tese da home (Ferramenta, Temas, Serviços). Corpo por linha em `cqi`, calculado no build; teto 7,5–11rem.
- **Abertura estreita** (850, largura 62%, word-spacing 0,12em): títulos de seção que precisam de outra textura — "O que eu escrevo, e para quem", "Edições". Mesmas regras, métricas próprias.
- **Linha leve** (100, mesma largura da instância): a linha marcada de toda abertura, sólida, medida com as larguras do peso 100 (`abertura-metricas.json` traz `leve` e `estreita.leve`).
- **Nome de célula** (`.nome-celula`, 780, largura 72%, caixa mista, 1,75–2,5rem): nomes dos temas, serviços e eixos, "Vídeo em Destaque" e a ação "Fazer o diagnóstico". Quebra no " & ", com o "&" em laranja profundo no fim da primeira linha.
- **Numeral** (250, largura 125%, tabular): o dia nas listas e o número da edição. Leve e largo contra o bloco pesado — o contraste de peso faz a hierarquia.
- **Display** (900, caixa-alta, 2–3rem): títulos auxiliares (nome do simulador em Bastidores, caminhos do 404).
- **Título de lista** (800, largura 87%, 1,5–1,875rem, caixa normal): itens de hubs e listas; o mais recente do hub sobe para 900 caixa-alta.
- **Linha-fina** (500, largura 87%): cauda da abertura e frase de apoio do hero, em céu sobre azul.
- **Rótulo** (650, largura 75%, 0,8125rem, caixa-alta, tracking 0,12em): metadados, navegação, ações. Só textos curtos.
- **Leitura** (Source Serif 4, 18px no celular, 19px a partir de 768px, line-height 1,7, máx. 68ch).

### Named Rules
**The Abertura Rule.** Todo título de texto (artigo, edição, hub, seção de tese) é desenhado por `src/lib/abertura.ts`: corte no primeiro ": " (ou travessão, ou parêntese) em cabeça e cauda; palavras curtas grudam na seguinte; 1–5 linhas pelo comprimento; partição mais equilibrada pelas larguras reais dos glifos (`src/lib/abertura-metricas.json`, gerado por `scripts/gerar-metricas-abertura.mjs`). Forma por eixo: **Engenharia & IA / Newsletter = bloco** (linhas justificadas, última leve); **Negócios = escada** (larguras decrescentes, à direita, primeira leve); **Bastidores = degraus** (corpo único, recuo progressivo, linha do meio leve). A linha marcada é peso 100 sólido; `vazado: true` troca por contorno (só o Simulador usa).

**The One Outline Rule.** O contorno vazado existe em dois lugares do site: MESMO, na tese, e a linha do meio do Simulador. Toda outra abertura marca a linha com o peso 100 sólido. Se a cabeça tem uma linha só, nenhuma linha é marcada. Nomes de célula e títulos de lista nunca vazam.

**The Volume Rule.** Caixa-alta 900 é uma por seção: a abertura. Tudo que vive dentro da seção (nomes de tema, serviço, eixo, ações) fala em estreita 780 caixa mista. Pelo menos uma camada da home abre em volume baixo (o vídeo), para as outras voltarem a pesar.

**The Two Instances Rule.** A instância larga é a voz das teses e dos textos; a estreita é a voz das seções. Pesos e larguras variam dentro do Archivo (900/100, 850/62, 250/125) para criar hierarquia sem empilhar caixa-alta 900 em todo título.

**The Quiet Column Rule.** Nenhum jogo tipográfico dentro da coluna de leitura: o corpo é serifa calma; o sistema fica na moldura.

## Layout

Grade de 12 colunas numa moldura de 1240px com gutter `clamp(16px, 4vw, 48px)`. Seções com 80px (celular) / 112px (desktop) de respiro vertical. A coluna de leitura dos textos começa na coluna 4 (margem esquerda vazia, assimétrica); a abertura ocupa 8 colunas e a linha-fina do artigo as 4 restantes, alinhadas pela base.

Grades de células usam `gap: 2px` sobre um fundo (azul no papel, azul-3 no azul) para que o próprio fundo vire o filete. Listas são tabelas: data (2 colunas: dia em numeral, "Mês, ano" e duração em rótulo), título + resumo (7), eixo/categoria + ação (3).

### Home, seção por seção (trabalho → composição)
- **Tese** (entender a proposta): bloco de cinco linhas a .86; a janela encaixa no vão de MESMO/SISTEMA no celular e sangra na borda direita no desktop. Faixa de grade: metadados à esquerda, frase e apoio no meio, plano laranja da newsletter à direita, encostado na seção seguinte.
- **Eixos** (escolher por onde entrar e ver o que saiu em cada porta): plano azul-2 alto com a pergunta em papel (abertura estreita), encostado em três linhas de papel. O plano saiu do laranja porque não é ação. Nome de cada eixo em estreita 780 caixa mista; os dois textos mais recentes do eixo descem como linhas de tabela dos hubs (dia em numeral leve, "Mês, ano", "Mais recente" no primeiro). "Ideias recentes" foi fundida aqui.
- **Ferramenta** (experimentar agora): grade de filetes azul-3; abertura em degraus com a linha do meio vazada (o segundo e último contorno do site) + célula de metadados; a ação é a própria célula laranja.
- **Vídeo** (assistir a uma coisa só): a camada de volume baixo. Abre o campo de papel com "Vídeo em Destaque" em nome de célula, sem bloco de tipo; linha de duas células (título à esquerda, célula azul inteira como link), quadrado laranja do play girado 12° que endireita no hover.
- **Temas** (entender quem escreve): abertura em bloco + trajetória; os cinco temas numa partição 3 + 2 desenhada pelo fundo azul nos vãos (no celular, só filete de topo em cada tema, sem caixas), nomes em estreita 780 caixa mista.
- **Serviços** (entender o que contratar): abertura em escada à direita; as três ofertas descem em degraus a partir dela.
- **Rodapé**: células com filetes azul-3; a coluna da newsletter é o plano laranja.

Header fixo de 72px; páginas de texto trocam o header por uma barra de 56px (voltar / compartilhar).

## Elevation & Depth

Plano. Nenhuma sombra, nenhum blur, nenhum vidro. Profundidade só por campo de cor (azul sobre papel, laranja sobre azul) e pela rotação de 12° da janela (ecoada uma vez, no play do vídeo).

### Named Rules
**The Flat Plane Rule.** Se algo precisa se destacar, muda de campo ou de peso — não ganha sombra.

## Shapes

Cantos retos em tudo: botões, células, inputs, blocos de código, foto do autor (quadrada, em tons de cinza). As únicas formas não ortogonais são a janela (um quadrado laranja girado 12° com o quadro contra-girado dentro) e o seu eco, o quadrado do play do vídeo, no mesmo ângulo. Marcadores de lista e de citação são quadrados laranja.

## Components

### Buttons
- **Primário (`.botao`)**: bloco laranja, texto `#0B1A33`, Archivo 800 largura 87% em caixa-alta, 52px de altura, canto reto. Hover: vira papel com tinta azul (sobre azul) ou azul com tinta papel (sobre papel). Dentro de um plano laranja (`.campo-laranja`) inverte: bloco azul, texto papel.
- **Célula de ação (`.celula-acao`)**: a célula laranja inteira é o link, rótulo estreito 800/72 em caixa mista e seta SVG no canto; hover vira papel.
- **Ação (`.acao`)**: rótulo laranja com seta; sublinhado de 2px aparece no hover. Laranja `#F97316` sobre azul, `#C2410C` sobre papel.

### Chips (filtros)
- **Célula de eixo**: célula de grade azul com rótulo céu-claro; ativa = bloco laranja. `aria-pressed`.
- **Categoria**: rótulo pequeno sem caixa; ativa = bloco azul com texto papel.

### Cards / Containers
Não há cards. Conteúdo agrupado vira linha de tabela (borda inferior em filete), célula de grade (gap de 2px sobre o fundo) ou plano chapado: laranja para a ação principal (newsletter em hero, rodapé, arquivo e fim do artigo; diagnóstico; simulador em Bastidores), azul para o vídeo em destaque.

### Inputs / Fields
Busca: sem caixa; só um filete inferior de 2px azul, que fica laranja profundo no foco; ícone de lupa em traço 2,5.

### Navigation
Header azul chapado, itens em rótulo céu-claro; o ativo fica papel com uma barra laranja de 4px na base. "Contato" é o único botão laranja da barra. No celular, menu em painel azul com itens em display 1,75rem separados por filetes.

### Abertura (signature component)
`<Abertura titulo eixo as teto />` (`src/components/Abertura.tsx`). Renderiza o heading com o título completo na ordem original; cada linha é um `span` com `--fit` (cqi) e `--recuo`; o heading é contêiner de tamanho (`container-type: inline-size`). O mesmo dado alimenta o gerador de capas do Substack (`docs/substack-kit/gerar-capa.mjs`).

### Janela (signature component)
Bloco laranja girado 12°, inset de 9%, com o quadro (AVIF/WebP responsivo) contra-girado e ampliado dentro. Com `animation-timeline: view()` o quadro desliza ±7% dentro da janela durante o scroll; desligado em `prefers-reduced-motion`. Uso: uma vez por página, no máximo (hoje só no hero da home e nas capas do Substack). Posição: no celular tem ~42% da largura da tela (46cqi), começa logo abaixo de PARTES DO (sem cobrir o DO), à direita de MESMO/SISTEMA, e sangra na borda direita; o bloco ganha respiro embaixo para ela; no desktop encosta no bloco da tese e sangra ~18% na borda direita (`.tese-janela`).

### Corpo de leitura (`.leitura`)
H2 em Archivo 850 com filete de 2px acima; H3 em 800/87%; links laranja profundo sublinhados; listas com quadrado laranja; citação em itálico entre filetes com quadrado laranja; código em bloco azul-escuro (tema Shiki), código inline em papel 2; tabelas em rótulo + tabular-nums.

## Do's and Don'ts

### Do:
- **Do** pôr a ação principal de cada região numa célula laranja inteira, com botão azul.
- **Do** levar metadados para uma célula ao lado do título ou para a linha depois dele.
- **Do** usar números só quando codificam algo verdadeiro: data, número da edição, ordem real.
- **Do** gerar todo título de texto pela abertura; nunca compor quebra à mão por artigo.
- **Do** deixar um campo carregar várias seções; trocar de campo só quando a história muda (na home, no máximo três trocas).
- **Do** usar `#C2410C` para texto laranja sobre papel e `#F97316` sobre azul.
- **Do** manter o corpo em Source Serif 4, 68ch, sem efeito.
- **Do** usar filete e `gap` sobre azul para desenhar grades.

### Don't:
- **Don't** pôr o quadro ou qualquer textura atrás de texto corrido; ele só aparece dentro da janela.
- **Don't** usar mais de uma janela por página, nem contorno vazado fora do MESMO e do Simulador.
- **Don't** empilhar caixa-alta 900 dentro de uma seção: uma abertura por seção, o resto em caixa mista.
- **Don't** usar sombra, blur, vidro, degradê, cantos arredondados ou cards com borda.
- **Don't** usar caixa-alta em texto com mais de uma linha curta (rótulos só para metadados curtos).
- **Don't** pôr rótulo curto em caixa-alta acima de um título.
- **Don't** usar setas ou ícones em caractere unicode; ícones são SVG (lucide ou traço próprio).
- **Don't** numerar seções (01/02/03) quando a ordem não informa nada.
- **Don't** voltar a foto de banco no topo dos textos; ela fica só como imagem de prévia social (OG).
