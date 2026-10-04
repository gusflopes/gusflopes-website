---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/components/pages/HomePage.tsx"]
---

# Home — gusflopes.dev

Escopo: `/` (HomePage e seções). Modo: **Persuade**. Visitante: técnico ou empresário vindo das redes; ação: assinar a newsletter (Substack) ou entrar por um eixo. Prova real: textos publicados, simulador da Reforma, trajetória Direito + Contabilidade + software. Nada inventado; copy intocada.

Direção fixada pelo dono: **3. Concretismo** (maquete `data-k="6"` da página de direções).

## Direction contract

THESIS: a tese da marca é montada como construção tipográfica — "Tecnologia e negócio, partes do mesmo sistema" empilhada em blocos de tipo sobre azul-escuro. Recusa o hero de foto com degradê, título centrado e cards com brilho.

OWN-WORLD: azul-escuro `#0B1A33` como campo, papel frio `#F2F4F7` como segundo campo, laranja `#F97316` em blocos chapados; Archivo variável (900/100 display, 600/75 rótulos) + Source Serif 4 para leitura. Grade rígida de filetes de 1–2px, cantos retos, zero sombra, zero vidro. Par 900/100: a linha marcada de cada abertura no peso 100 sólido; contorno vazado só no MESMO da tese e no Simulador. Caixa-alta 900 uma vez por seção; nomes dentro da seção em estreita 780 caixa mista.

STORY: o visitante lê a tese como poema concreto, entende que é uma pessoa que junta negócio e engenharia, escolhe a porta (Engenharia & IA / Negócios / Bastidores) e assina.

FIRST VIEWPORT: tese em 5 linhas ajustadas à largura, entrelinha .86 (TECNOLOGIA / e negócio, em laranja menor / PARTES DO / MESMO vazado / SISTEMA) ocupando ~3/4 da largura; a janela laranja girada 12° com o quadro (única da página) no celular tem ~42% da largura da tela, começa abaixo de PARTES DO (sem cobrir o DO), no vão à direita de MESMO/SISTEMA, e sangra na borda direita; no desktop encosta no bloco e sangra na borda direita. Abaixo, faixa de grade: metadados | frase e apoio | plano laranja da newsletter, encostado nos eixos.

FORM: sistema tipográfico concreto (poesia concreta Noigandres + escola de Ulm/Wollner); 1º e único da lista — direção escolhida pelo dono; seed key: n/a (decisão fixada, sem sorteio).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Momento memorável
A janela laranja girada mostrando um pedaço do quadro; o quadro desliza dentro dela com o scroll (scroll-driven, desligado em reduced-motion).

## Rodada 2 — o resto da página (trabalho → composição)

Mandato do dono: "mudou o hero, mas o resto continua ruim". A grade rígida passa a ser o motor da página inteira.

Ordem nova e porquê: tese → eixos → ferramenta → ideias e vídeo → temas → serviços → rodapé. Depois de escolher a porta, o visitante pode experimentar algo agora (ferramenta) e ver o que saiu (ideias); só então vem quem escreve (temas) e o que contratar (serviços), que fecham a página como oferta logo antes da newsletter do rodapé. Isso também deixa os campos em dois blocos: azul (tese, eixos, ferramenta) → papel (ideias, temas, serviços) → azul (rodapé). Duas trocas.

- **Tese** — entender a proposta. Bloco a .86; faixa de grade com metadados ao lado da frase; a newsletter é um plano laranja de célula.
- **Eixos** — escolher por onde entrar. Plano laranja alto (a pergunta, abertura estreita) encostado em três linhas de papel; o nome de cada eixo ocupa a célula na forma do próprio eixo (bloco, escada, degraus); "Mais recente" em célula ao lado do título do texto.
- **Ferramenta** — experimentar algo agora. Grade de filetes azul-3; abertura em degraus + célula de metadados "Ferramenta gratuita · Experimento aberto"; a ação é a própria célula laranja; texto e nota de cautela em células vizinhas.
- **Ideias recentes + vídeo** — ver o que saiu e abrir um texto. Título estreito ocupando a largura toda; linhas de tabela iguais às dos hubs (data em numeral | título | categoria ao lado | ação); vídeo como linha de duas células: título à esquerda, célula azul inteira como link com o quadrado laranja do play.
- **Temas** — entender quem escreve e em que áreas atua. Abertura em bloco + trajetória; os cinco temas numa partição 3 + 2 desenhada pelo fundo azul nos vãos; cada nome é um bloco justificado na célula, "&" em laranja (a ponte).
- **Serviços** — entender o que contratar. Abertura em escada (forma do eixo Negócios) à direita; as três ofertas descem em degraus a partir dela. É o único lugar com três colunas, e mesmo assim desencontradas.
- **Rodapé** — células com filetes azul-3; newsletter como plano laranja.

Regra de laranja: chapado numa célula inteira = a ação principal da região, ou a ordem real (texto mais recente nos hubs). Regra de número: só data, número de edição ou ordem real; nada de 01/02/03 decorativo.

Corte proposto na rodada 2 e aplicado na rodada 3 (aval do dono): ver abaixo.

## Rodada 3 — volume

Mandato do dono: "o hero prende a atenção, depois cada uma das camadas conquista". A grade fica; o conserto é volume. Cada camada continua com gesto próprio, mas nenhuma grita tão alto quanto as vizinhas.

Ordem final: tese → eixos (com os textos recentes) → ferramenta → vídeo → temas → serviços → rodapé. Campos: azul (tese, eixos, ferramenta) → papel (vídeo, temas, serviços) → azul (rodapé). Duas trocas.

- **Volume:** caixa-alta 900 só na abertura de cada seção. Nomes de eixos, temas e serviços, "Vídeo em Destaque" e "Fazer o diagnóstico" em Archivo estreita 780 caixa mista (as strings já são caixa mista na fonte; só CSS).
- **Par 900/100:** a linha marcada de toda abertura (última no bloco, primeira na escada, a do meio nos degraus) é o mesmo desenho no peso 100, sólida, medida com as larguras do peso 100. Contorno vazado só em MESMO e no Simulador.
- **Eixos** — escolher por onde entrar e ver o que saiu em cada porta. "Ideias recentes" fundida aqui: cada porta mostra os dois textos mais recentes como linhas de tabela dos hubs (dia em numeral leve, "Mês, ano", "Mais recente" no primeiro); os dois insights mais recentes do site sempre entram. O plano da pergunta saiu do laranja (não é ação) para azul-2, com a pergunta em papel.
- **Vídeo** — assistir a uma coisa só. A camada de volume baixo, de propósito: abre o papel depois do Simulador (a camada mais alta) com o título em caixa mista, sem bloco de tipo, para os temas voltarem a pesar. Gesto: o quadrado laranja do play girado 12°, o mesmo ângulo da janela (único eco do giro fora do hero); endireita no hover.
- **Temas no celular:** só filete de topo em cada tema, sem caixas fechadas.
- **Hero:** metadados sem "·" pendurado (cada item sem quebra; o separador vai com o item seguinte); janela do celular maior, como no FIRST VIEWPORT acima.

Teste do dono, camada a camada: tese (bloco + janela, conquista), eixos (plano azul alto + três linhas de papel com tabela datada, conquista), ferramenta (degraus vazados + célula laranja de ação, conquista — é a mais alta), vídeo (calma deliberada: duas células e o play girado; conquista pelo contraste, não pelo volume), temas (bloco 900/100 + partição 3+2, conquista), serviços (escada à direita + ofertas em degraus, conquista).
