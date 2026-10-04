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
  laranja-tinta: "#0B1A33"
  branco: "#FFFFFF"
  creme: "#FDEED9"
  creme-fio: "#E3CFB3"
  petroleo: "#457183"
  petroleo-fundo: "#315B6F"
  ardosia: "#648188"
  ardosia-clara: "#7F989A"
  areia: "#AA9C87"
  marrom: "#907A5F"
  marrom-fundo: "#50372A"
  ferrugem: "#8A4C1B"
  papel: "#FFF8F2"
  papel-2: "#F9F2EC"
  papel-3: "#EEE7E1"
  papel-fio: "#E6D9C8"
  tinta: "#0B1A33"
  tinta-2: "#33445F"
  tinta-3: "#475569"
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
    fontSize: "clamp(2.125rem, 1.35rem + 2.1vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.02em"
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
  selo: "2px"
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
    textColor: "{colors.laranja-tinta}"
    typography: "{typography.ui}"
    rounded: "{rounded.fio}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.laranja-hover}"
    textColor: "{colors.laranja-tinta}"
  action-link:
    textColor: "{colors.laranja}"
    typography: "{typography.ui}"
    padding: "0"
  meta-line:
    textColor: "{colors.petroleo-fundo}"
  meta-line-escuro:
    textColor: "{colors.ceu}"
  selo-estado:
    backgroundColor: "{colors.laranja}"
    textColor: "{colors.laranja-tinta}"
    rounded: "{rounded.selo}"
    padding: "1px 7px"
  placa-eixo-engenharia:
    backgroundColor: "{colors.petroleo-fundo}"
    textColor: "{colors.branco}"
  placa-eixo-negocios:
    backgroundColor: "{colors.areia}"
    textColor: "{colors.tinta}"
  placa-eixo-bastidores:
    backgroundColor: "{colors.ferrugem}"
    textColor: "{colors.branco}"
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
    backgroundColor: "{colors.laranja}"
    textColor: "{colors.laranja-tinta}"
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

O site de antes, limpo e executado com acabamento de site premiado. O mundo não muda: azul-escuro e laranja, o quadro da cidade noturna em pinceladas como imagem da marca. Mudou o acabamento. O fundo slate quase preto virou azul-escuro de verdade (`#0B1A33`). O texto em gradiente virou laranja sólido. Cormorant e Plus Jakarta deram lugar a Literata e Hanken Grotesk. Glows, desfoques e cartões com tudo dentro sumiram; no lugar ficaram fio, tipografia e ritmo, com o laranja nos detalhes e o azul como estrutura.

O quadro aparece com força **uma vez**: no hero da home, à direita, sem véu, abaixo de um header fino e sólido. Depois volta só como recorte, em faixa, e é a gramática da página inteira (rodada 5): a faixa dos reflexos na água na base de toda moldura escura (abaixo do hero, costurada a ele por um fio laranja reto; na base do cabeçalho dos hubs, do artigo e da 404) e a faixa das luzes da cidade antes do rodapé de toda página. E nas capas do Substack. As cores dele seguem pela página com função: placas dos eixos (petróleo, areia, ferrugem), metadados, uma casa do Sobre, o filete ardósia da voz de outro, o fio marrom da assinatura do autor. Nunca fica atrás de texto corrido.

A memória do site vem de tipografia, escala e composição, nunca de ornamento: Literata com eixo óptico (o título do hero no desenho de exibição, opsz 72, tracking fechado), o acento em itálico da Literata só onde a segunda metade do título carrega o sentido, o "&" dos nomes em itálico (laranja no escuro e petróleo no claro, só no par negócio/tecnologia), fios em laranja nos pontos estruturais e, abaixo do hero, uma ideia de página de revista por camada.

Os modos seguem o conteúdo, não um seletor de tema. O azul-escuro é estrutura: o hero da home, um encarte, a moldura no alto dos hubs e dos artigos, o rodapé. Tudo o que é leitura (os eixos da home, o Sobre, os índices de Insights, eixos e Radar, artigos, newsletter, 404, páginas legais) fica no papel quente da Shelfye (`#FFF8F2`); o creme (`#FDEED9`) esquenta as caixas e o claro que antecede o escuro: "Como posso ajudar", a régua de busca dos hubs, a faixa de inscrição da newsletter e o fecho do artigo. O rodapé sempre chega de um claro, pelo recorte de fecho. O texto é o produto: a coluna de leitura é calma, e o mundo da marca mora na moldura.

## Colors

Estratégia (rodada 4, com os papéis das cores do PRODUCT.md): **laranja é a cor principal e vive em detalhes pela página inteira; azul-escuro é estrutura e fundo; claros são obrigatórios no ritmo; as cores do quadro dão variedade, com função.** O azul-céu caiu para apoio frio.

### Primary: laranja, em dois registros
- **(a) Chapado = ação.** `laranja #F97316` em botões, play, chip ativo. Texto e ícone sobre laranja são `laranja-tinta #0B1A33` (o azul-escuro da marca, 6,19:1). Fundo laranja com texto é sempre `#F97316` (sobre `#C2410C` o azul cairia para 3,35:1). Hover: `laranja-hover #FB8A3C`.
- **(b) Detalhe não textual = presença.** Filete de 2–3px, fio de capa (`.fio-capa`, 3px + 1px), marca de 5px sobre a data no índice dos hubs e sobre os H2 do artigo, sublinhado dos links do artigo (2px), marcadores quadrados, costura entre o hero e o recorte, marca da data na margem, selo "Mais recente", fio do encarte, fio do quadro 3×2, fio no alto do rodapé, estado ativo (aba, régua do header). Pelo menos um detalhe estrutural laranja por seção.
- **Sobre claro, `#F97316` nunca é texto** (2,5:1): só filete ou marca. Texto laranja sobre claro é `laranja-fundo #C2410C`, e só em link: 4,9:1 no papel, 4,5:1 no creme. Em `#EEE7E1` ele cai para 4,2:1 e vira `laranja-brasa #9A3412` (6,0:1); no creme de "Como posso ajudar" os links secundários já usam `#9A3412`. No corpo do artigo o link fica em tinta, com o laranja no sublinhado.
- Sobre escuro, `#F97316` é texto e fio (6,2:1 em `noite`); `laranja-claro #FB923C` / `laranja-palido #FDBA74` para hover de títulos-link.

### Estrutura: azul-escuro
- **noite `#0B1A33`**: hero, header, encarte da Ferramenta, moldura dos hubs e do artigo. **noite-2 `#13284D`**: fundo de imagem ausente. **noite-fundo `#081428`**: o rodapé.
- Regra de massa: nenhum campo escuro com mais de ~1.000px sem passar por um claro de ≥150px; nunca dois blocos escuros empilhados.
- **noite-fio `#22385C` / noite-fio-forte `#34507D`**: réguas sobre azul. **nevoa `#C9D6E6`** (11:1) e **nevoa-2 `#9FB1C8`** (8:1): texto sobre azul.
- **ceu `#8FB3D9`**: apoio frio, só texto secundário sobre escuro (linha de assuntos do hero, metadados do encarte e da moldura dos hubs). Não é mais acento estrutural.

### Claros: os da Shelfye.ai (rodada 5)
O papel frio `#F2F4F7` e a areia acinzentada `#D9D4CB` saíram (decisão do dono, PRODUCT.md). Herda-se da Shelfye só o claro: o laranja continua `#F97316`, sem terracota, e não entra serifa decorativa por causa do creme.
- **papel `#FFF8F2`**: chão da leitura e da maior parte da home (eixos, encarte, sobre, índices, artigo).
- **creme `#FDEED9`** (1,08:1 contra o papel): campo quente de destaque e o claro que antecede o escuro. Onde entra: "Como posso ajudar" (home), a régua de busca e temas dos hubs (entre o recorte e o índice), a faixa de inscrição do arquivo da newsletter e o fecho do artigo (newsletter + autor, logo antes do recorte de fecho). **creme-fio `#E3CFB3`**: réguas e bordas de chip sobre ele.
- **papel-2 `#F9F2EC`** / **papel-3 `#EEE7E1`**: aninhar sem fio, por mudança de tom (placeholder de imagem, chip de código inline em `#EEE7E1`, hover dos ícones sociais).
- **papel-fio `#E6D9C8`**: o fio quente de separação sobre claro (índice, H2 do artigo, grades do Sobre, colunas dos eixos).
- **tinta `#0B1A33`** (16,5:1 no papel, 15,2:1 no creme), **tinta-2 `#33445F`** (8,6:1 ou mais), **tinta-3 `#475569`** (texto secundário: 7,2:1 no papel, 6,6:1 no creme, 6,2:1 em `#EEE7E1`). `#64748B` não serve em creme.
- Texto claro sobre a noite continua frio (névoa `#C9D6E6`, `#E8EEF6` no hero): pertence ao azul, não ao papel.

### Cores do quadro (paleta de apoio aprovada em 04/10), com função
- **petróleo `#315B6F`** (texto branco 7,4:1; como texto, 7,0:1 no papel e 6,4:1 no creme) / **`#457183`** (texto só no papel ou grande): cor do eixo Engenharia & IA (placa da cabeça de coluna e `PlacaEixo`); metadados no claro (`.claro .meta`); o "&" da ponte no claro.
- **areia `#AA9C87`** (texto tinta 6,5:1): cor do eixo Negócios.
- **ferrugem `#8A4C1B`** (texto branco 6,7:1): cor do eixo Bastidores e a sexta casa ("hoje") do quadro do Sobre. Nunca encosta em texto `#C2410C` nem no laranja chapado: pelo menos uma célula de distância.
- **ardósia `#648188`** = **a voz de outro**: filete de 3px das citações no corpo do artigo e da fonte externa no índice do Radar (curadoria comenta a voz de alguém). Sem texto (3,96:1).
- **marrom `#907A5F`** = **a assinatura do autor**: fio de 2px sobre a frase-tese do Sobre e sobre a caixa do autor no fim do artigo. Sem texto (3,89:1). `#50372A` fica reservado.
- **Placa do eixo** (`PlacaEixo`, `.placa-*`): o eixo como placa chapada com texto AA, com peso real. Na moldura do hub (com o público), em cada linha do índice geral e do Radar, nos metadados do artigo; e como capa quando a foto não carrega.

### Named Rules
- **Laranja é a marca, em detalhe.** Chapado para ação; filete, marca e estado para presença. Uma seção sem laranja perdeu a marca.
- **Texto sobre laranja é azul-escuro.** `#F97316`, `#FB923C` e `#FDBA74` levam texto `#0B1A33` (6,19:1 / 7,67:1); é o padrão de botões e blocos. Laranja escuro (`#C2410C`, `#9A3412`) leva texto branco (5,18:1), só em uso pontual (hover/pressionado, ou bloco sobre claro onde `#F97316` fique estridente), nunca como segundo laranja oficial. Proibido: `#C2410C` com azul-escuro (3,35:1), `#F97316` com branco (2,8:1), preto ou quase-preto sobre qualquer laranja.
- **Azul é chão, não bloco.** Escuro em sequência apaga a identidade; o escuro grande chega de um claro.
- **O rodapé chega de um claro, com um gesto.** Em todo modelo: último claro (papel ou creme) → recorte de fecho do quadro (as luzes da cidade, no layout) → fio de capa laranja → rodapé.
- **Variedade com função.** Cada cor do quadro tem um papel nomeado (eixo, metadado, casa, campo). Cor sem papel não entra.
- **Claros quentes, acento laranja.** Papel `#FFF8F2` para ler, creme `#FDEED9` para esquentar caixas e antecipar o escuro. O resto do clichê de creme (terracota, serifa decorativa) não entra.

## Typography

**Literata** (variável, com eixo óptico de 7 a 72) é a voz: títulos e leitura. O eixo óptico faz o trabalho de duas famílias. No título grande o navegador escolhe o desenho de exibição (contraste alto, aberturas finas); no corpo de 19px, o desenho de texto (robusto, confortável). **Hanken Grotesk** é a interface: navegação, botões, decks da home, rótulos e metadados. **JetBrains Mono** só aparece em código.

Por quê: Literata foi desenhada para leitura longa em tela e tem a seriedade de livro que a tese pede ("negócio" e "tecnologia" no mesmo nível), sem os clichês da lista proibida (Playfair, Fraunces, Cormorant). Hanken Grotesk é uma grotesca neutra e calorosa, sem o ar de SaaS das geométricas, que fica no fundo e deixa a Literata falar.

Fontes self-hosted e recortadas para o português por `scripts/subset-fontes.py` (latim + pontuação tipográfica, eixo de peso só no intervalo usado): Literata 73 KB, itálico 42 KB (peso fixo 400, só baixa se a página usa itálico), Hanken 19 KB, Mono 19 KB (só com código). O artigo com tudo isso fica em ~153 KB. `font-synthesis-weight: none` impede negrito falso no itálico.

### Hierarchy
- **display** (Literata 600, opsz 72, 2,5rem no celular → 4,75rem, entrelinha 0,96, -0,032em): só o H1 do hero. Um degrau real acima de tudo.
- **display-hub** (Literata 600, opsz 72, 3rem → 4,5rem, -0,028em, `.display-opsz`): títulos de hub, 404, títulos de artigo e páginas legais.
- **heading** (`.h-secao`, Literata 600, 2,125–3rem, 1,04, -0,02em): títulos de seção da home (inclusive o nome da Ferramenta) e "Edições". Um degrau abaixo do hero e um degrau claro acima de qualquer título interno.
- **accent** (`.acento`, itálico 400): só quando a segunda metade do título carrega o sentido ("O que eu escrevo, *e para quem*", "Engenharia é *mais do que código*"). "Como posso ajudar" fica sem acento.
- **title** (Literata 400–600, teto de 2,25rem): manchete da porta larga e oferta principal (2,25rem), cabeças de coluna dos eixos (1,625–2rem), áreas do Sobre (1,5rem), ofertas secundárias (1,375rem). Nada interno passa de 2,25rem.
- **statement** (Literata 400, 1,5–2,25rem, 1,16): a frase-tese do Sobre, em escala de citação; a parte depois dos dois-pontos em itálico.
- **deck** (Literata 400, 1,25–1,44rem, 1,5): o resumo sob o título dos artigos e hubs.
- **reading** (Literata 400, 18px no celular, 19px a partir de md, 1,72, coluna de 66ch): corpo dos artigos.
- **ui** (Hanken 400–600, 15–17px): texto da home, navegação, botões.
- **meta** (`.meta`, Hanken 500, 14px, caixa normal, números tabulares; petróleo no claro, céu no escuro; "Mais recente" como selo laranja): a linha de metadados, sempre DEPOIS do título ("Mais recente · 2 Jun, 2026", "Bastidores · Casos", "Edição #1 · 3 Out, 2026", "Sobre o Autor", "Erro 404"). Separador "·" gerado em CSS.
- **label** (Hanken 600, 12px, caixa alta, +0,12em, laranja): só os títulos de coluna do rodapé.

### Named Rules
- **Ênfase é peso ou cor sólida, nunca gradiente.**
- **Sem sobrelinha acima de título.** Linhas de contexto ("Ferramenta gratuita · Experimento aberto", "Experimento aberto") vão abaixo do título. A linha de assuntos do hero desceu para o rodapé do hero.
- **Mono só para código.**
- **O "&" colorido é a ponte, e só ela.** Em nomes com "&" o glifo sai em itálico da Literata na cor do texto (`<Amp>`, `.amp`). Colorido (`<Amp ponte>`, `.amp-ponte`: laranja no escuro, petróleo no claro) só onde o "&" liga negócio e tecnologia: hoje, "Domínio & Arquitetura".

## Layout

- Contêiner `max-w-7xl` (1280px) na home e no rodapé, `max-w-6xl` nos hubs, `max-w-3xl` na coluna de leitura (o corpo limita a 66ch). Imagem de artigo em `max-w-5xl`.
- Gutter de 16px no celular e 24px a partir de sm. Nenhum texto encosta na borda.
- Seções da home: 48–64px no topo e 64–80px na base (celular) / 56–96px (desktop). Sem vazios de 120px+: a base do hero emenda nos eixos a ~100px do título, e o encarte da Ferramenta fecha a 64px do recorte.
- **Mapa de campos da home (rodada 5).** Noite (hero) → costura laranja reta → recorte do quadro (reflexos; passagem) → papel (eixos, o encarte escuro da ferramenta, sobre) → creme (como posso ajudar) → recorte de fecho (luzes da cidade) → rodapé escuro, aberto pelo fio de capa laranja.
- **Mapa dos hubs e do artigo (rodada 5).** Hub: noite (título, deck, placa do eixo) → recorte do quadro → creme (busca e temas) → papel (índice) → recorte de fecho → rodapé. Artigo: barra + noite (título, deck, metadados com a placa do eixo) → recorte do quadro com a capa atravessando para o papel → papel (coluna de leitura) → creme (newsletter e autor) → recorte de fecho → rodapé. Nenhum campo escuro passa de ~1.000px (desktop: maior trecho escuro contínuo 224px; celular: hero ~950px, encarte ~900px, rodapé ~870px), e o escuro nunca empilha.
- **Cada camada é uma página de revista com uma ideia própria:**
  - **Eixos = primeira página**, em papel. Fio de capa laranja (`.fio-capa`: 3px sobre 1px) no alto, colunas desiguais (7/12 | 5/12) separadas por fio vertical. Cada porta abre com uma placa na cor do eixo (petróleo, areia, ferrugem) com o nome e o público, depois a manchete (o texto mais recente, com o selo laranja "Mais recente") e os seguintes com a data em petróleo na margem, marcada por um filete laranja de 2px sobre o fio. A coluna larga leva a manchete em 2,25rem, mais dois textos e, fechando, o vídeo em destaque como a foto da capa. No celular, o vídeo fecha a capa inteira. "Ideias recentes" foi fundida aqui.
  - **Ferramenta = encarte.** A única caixa da home e o único bloco escuro abaixo do hero, impresso sobre o papel: noite, fio laranja de 3px no alto, cantos de 4px só embaixo. O nome é o H2 (3rem); a pergunta em itálico (2rem) abre a coluna da direita; a letra miúda fica no pé da coluna do título.
  - **Sobre = abertura de ensaio** em papel. Título e trajetória na mesma linha, a frase-tese em escala de citação sob o fio marrom da assinatura, e as cinco áreas num quadro de fios 3×2 (grade com `gap-px`, não cartões) com o fio de cima em laranja (2px), cuja sexta casa, em ferrugem, é o trabalho de hoje.
  - **Como posso ajudar = página do pedido**, no campo creme. Título pendurado à esquerda; fio de capa laranja sobre a oferta principal; a Consultoria Estratégica em escala de abertura (descrição em Literata 1,5rem e botão sólido); Mentoria e Conteúdo como notas compactas lado a lado. Contraste de densidade, não lista.
  - O módulo "título + 3 colunas entre fios" e a "lista entre fios" como estrutura de seção não são usados na home.
- **Índice em linhas** nos hubs (Insights, eixos, Radar, newsletter, 404), sempre em papel: data em petróleo | título + resumo | miniatura, separados por um fio neutro e quente de 1px (`.indice-linha`, `papel-fio`), com a marca laranja de 5px só sobre a data (a largura da coluna da data no desktop, 4,5rem no celular). O eixo nos metadados do índice geral vira placa (`PlacaEixo`). Varre rápido e tira o peso das fotos de banco.
- **Hero:** no desktop o quadro ocupa de 36% da largura em diante (srcset em 64vw), rampa curta e quadro limpo a partir de ~55%; sem degradê na base: a pintura desce reta até a costura laranja de 2px do recorte. No celular o quadro vira faixa de 34svh logo abaixo do header, recortada (sem costura), e o texto desce para o azul; o botão cabe em 390×844.

## Elevation & Depth

Plano. Não há sombras, brilhos nem desfoques decorativos. A profundidade vem de três coisas: a mudança de chão (azul ↔ papel), a imagem do artigo que atravessa a borda entre a moldura azul e o papel, e o fio de 1px.

### Named Rules
- **Fio, não cartão.** Agrupamento por régua e espaço; cartões com borda, sombra e ícone não voltam.
- **Sem vidro.** O header vira azul sólido ao rolar, sem `backdrop-blur`.

## Shapes

Cantos quase retos: 3px em botões, chips e blocos; 4px em imagens; círculo só no avatar e no botão de play. Réguas de 1px; 2px só no sublinhado da aba de eixo ativa.

## Components

### Buttons
- **Primário** (`.botao`): laranja `#F97316`, texto e ícone `laranja-tinta #0B1A33` (6,19:1), 48px (52px no hero), canto de 3px, Hanken 700, seta que anda 3px no hover. Um por região.
- **Contato no header**: contorno laranja de 1px, 36px, preenche no hover.
- **Ação em texto** (`.acao`): um tratamento só no site. Hanken 600, 15px, caixa normal, seta (ou ícone de link externo) que anda 3px; o sublinhado de 1px só aparece no hover (também quando a linha inteira é o link). Laranja sobre azul, laranja-fundo sobre papel.

### Chips
Filtros de tema: 32px, canto de 3px, borda `creme-fio` (a régua dos hubs fica no creme). O ativo fica preenchido de laranja com texto `#0B1A33` (estado ativo é presença do laranja). `aria-pressed` em todos.

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
`ArtigoShell` serve Insights, Radar e newsletter. No topo, o cabeçalho azul: título em display, deck em Literata, uma régua e os metadados (placa do eixo · categoria · data · leitura; o ponto médio fica preso ao item seguinte). A moldura termina num recorte do quadro, e a capa atravessa essa passagem para o papel (sem foto, a capa vira a placa do eixo). Embaixo, a coluna `.leitura` em papel. No fim, numa faixa de creme: a caixa da newsletter (fio laranja de 2px em cima) e o bloco do autor sob o fio marrom (nome em Literata, "Sobre o Autor" como metadado abaixo). No corpo:
- links em tinta com sublinhado `#F97316` de 2px (hover: `#9A3412`);
- marcadores de lista quadrados em `#F97316`;
- H2 com o fio quente de 1px na largura da coluna e a marca laranja de 5px por cima (a mesma linha do índice);
- citação em itálico com o filete ardósia de 3px;
- `hr` como filete laranja de 3px;
- tabelas em Hanken com números tabulares e fios;
- código inline em chip `#EEE7E1`;
- blocos de código Shiki com fundo `noite` (sangram a coluna no celular).

## Do's and Don'ts

### Do:
- Use `#F97316` com texto `#0B1A33` em todo botão; `#C2410C` para link laranja sobre papel e creme.
- Mostre o quadro inteiro uma vez por página (hero); fora disso, só recorte em faixa.
- Separe com fio de 1px e espaço; deixe Literata carregar a hierarquia.
- Mantenha a coluna de leitura em 66ch, corpo de 18–19px, no papel `#FFF8F2`.
- Use tabular-nums em datas e metadados (`.num`).
- Respeite `prefers-reduced-motion`: o único movimento autoral (o quadro assentando de 1,06 para 1 ao carregar) desliga.

### Don't:
- Não use texto em gradiente, glow laranja, sombra colorida, `backdrop-blur` decorativo nem zoom de imagem no hover.
- Não ponha o quadro (nem textura nenhuma) atrás de texto corrido.
- Não use papel frio azulado (`#F2F4F7`), areia acinzentada (`#D9D4CB`) nem slate quase preto (`#020617`); nem terracota no lugar do laranja.
- Não volte a Cormorant, Plus Jakarta, Playfair, Fraunces, Inter ou outras da lista proibida.
- Não ponha sobrelinha ou rótulo acima de título; nem caixa alta em frase. Contexto vai na linha `.meta` abaixo.
- Não repita o módulo "título + 3 colunas iguais entre fios", nem alterne fundo seção a seção.
- Não use mono como fantasia "técnica" fora de código.
