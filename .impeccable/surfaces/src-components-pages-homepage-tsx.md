---
version: 1
slug: "src-components-pages-homepage-tsx"
primary_target: "src/components/pages/HomePage.tsx"
related_targets: ["src/components/pages/InsightArticlePage.tsx","src/components/pages/InsightsPage.tsx","src/components/pages/RadarPage.tsx"]
---

# Superfície: sistema visual gusflopes.dev — direção "Pincelada"

Escopo: site inteiro (home em modo Persuade; hubs, artigos, newsletter em modo Read). Direção fixada pelo dono
(4ª do ranking, maquete `data-k="8"`), sem sorteio. Caminho code-led (sem geração de imagem).

Público e tarefa: técnico e empresário chegam por rede/busca, leem no celular; sucesso = ler até o fim, assinar a
newsletter, abrir conversa. Restrições: paleta azul-escuro + laranja fixa; copy intocável; nada de textura atrás de texto.

## Direction contract

THESIS: Van Gogh como sistema, não como foto. Cada texto ganha uma "tela" própria — pinceladas curtas num campo de
fluxo semeado pelo slug, geradas no build. Recusa o blog-padrão de foto de banco + card com glow e a vitrine escura
genérica de dev.

OWN-WORLD: azul-escuro #0B1A33/#13284D como chão; azuis do quadro #1F3A66 #2E5069 #8FB3D9 #C9D6E6 só dentro das
telas e em realces; laranja #F97316 como luz rara (fio de 3px que separa pintura e texto, botão com texto #1c0a02);
papel frio #F2F4F7 na coluna de leitura. Literata para títulos e leitura, Hanken Grotesk para UI e rótulos. Cantos
retos, réguas finas, nenhum glow, nenhum vidro.

STORY: o visitante vê um quadro que nenhum outro site tem, entende pela faixa abaixo dele quem escreve e para quem,
lê sem nada se mexendo atrás do texto e assina a newsletter.

FIRST VIEWPORT: home — tela panorâmica gerada ocupa ~55% da altura em largura total; abaixo, faixa azul-escuro com
fio laranja no topo; H1 "Tecnologia e negócio, partes do mesmo sistema" em Literata grande à esquerda; deck,
rótulo de áreas e botão "Assinar Newsletter" na coluna direita, dentro da primeira dobra em 1366×900 e 390×844.

FORM: "Pincelada" (4ª no ranking do dono; maquete data-k="8"), sem seed key — direção fixada pelo usuário, concept-seed
não executado por instrução. Assinatura: o gerador (capa, OG, faixa de hub, abertura, capa Substack), tinta em camadas
(cerda + empasto) em escala de traço fixa por janela; desde a rodada 3, cenas amplas em seis arquétipos de
composição (horizonte, vento, manchas, ondas, massas, faixas), sem vórtice nem luz-alvo. Interação: o fio laranja que se estende
no hover/foco; telas estáticas, zero JS extra.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Rodada 2 — a página inteira (o trabalho de cada seção → a composição)

Regra de material: cada tela tem um papel (abrir, separar capítulo, ser capa), semente própria e enquadramento próprio
(panorâmica, coluna vertical, close de traço, o quadro original uma vez). Telas nunca atrás de texto corrido, nunca uma
por card em série. Traço com a mesma espessura em px de tela em todo formato (janelas de uma tela-mestre).

Ordem da home e porquê: abertura → Eixos → Vídeo + Ideias recentes → Ferramenta → Sobre (Themes) → Serviços → rodapé.
Primeiro escolher a porta, depois ver o que acabou de sair (prova de que a casa está viva), então experimentar algo de
graça, depois saber quem escreve e, só então, o que contratar — o pedido mais caro vem depois da confiança.

Campos de cor (2 trocas): noite carrega da abertura até "Sobre" (a noite do quadro; os capítulos se separam por telas e
réguas, não por listras de fundo) → papel em Serviços (o "contrato", lido como documento) → noite no rodapé.

- Abertura — "entender quem escreve e para quem": tela panorâmica + fio + faixa noite com H1 Literata (mantida). Laranja
  só no fio, na 2ª linha do H1 e no botão; o rótulo de áreas volta ao azul-céu.
- Eixos — "escolher por onde entrar": coluna vertical pintada (papel capitulo, semente própria, sticky) ao lado de uma
  lista de três portas em linhas; cada linha = eixo em Literata grande à esquerda, público/descrição/mais recente à
  direita. "Mais recente" desce para depois do título. No celular a coluna vira faixa baixa SEM luz, abrindo a seção.
- Vídeo + Ideias recentes — "ver o que saiu agora": a capa do vídeo em plano aberto na largura da coluna (24:7) com o
  play e o fio; abaixo, resumo do vídeo (7) ao lado de um sumário só de texto das ideias recentes (5), separados por régua.
- Ferramenta — "experimentar algo agora": faixa em três tempos — close de uma luz (o único traço visto de perto na
  home), texto, e a ação sozinha numa coluna com régua. "Ferramenta gratuita · Experimento aberto" já vem depois do título.
- Sobre (Themes) — "confiar em quem escreve": o quadro original emoldurado ao lado do texto (única aparição) + as 5 áreas
  no módulo título + colunas entre réguas (o único uso dele na home).
- Serviços — "entender o que contratar": cardápio em papel — título à esquerda, três linhas largas (serviço em Literata,
  o que resolve, ação), fio que se estende no hover/foco.
- Hubs — Insights/eixos: faixa de abertura + destaque com a capa panorâmica do texto mais recente + índice de leitura só
  texto (título e resumo, metadados ao lado). Radar: diário de bordo (data na margem, item e comentário, fonte e ação).
  Newsletter: lista de edições + caixa de inscrição com a tela da própria newsletter (semente "Radar de IA") de perto.
- Fim do artigo: nome do autor como título e "Sobre o Autor" depois; caixa da newsletter com a tela dela ao lado do convite.
- 404: faixa com semente própria; privacidade e termos herdam a coluna de papel.

## Decisões em aberto
- Fotos do Unsplash trocadas pela tela só no render; frontmatter intocado.
- Capa autoral da newsletter (media.gusflopes.dev) mantida.
- Anterior/próximo e relacionados no fim do artigo não existem; adicioná-los exige texto novo (a aprovar).

## Rodada 3 — a amplitude e "cada camada conquista"

Veredito do dono: o desenho repetia "duas bolas e espiral"; o segredo do quadro é a AMPLITUDE. E: "o hero prende a
atenção, depois cada uma das camadas conquista".

Gerador (VERSAO 9): morre o template vórtice central + 2–3 luzes-alvo. Seis arquétipos de estrutura grande —
horizonte, vento, manchas, ondas, massas, faixas — escolhidos pela semente ou fixados pelo papel. Luz = mancha/disco
espalhado ou toque quente curto, nunca alvo concêntrico. Respiro de baixa frequência (o ar da v1) e comprimento de
traço log-normal (a variedade da v1). Mantidos: corpo de tinta (carga, saída seca, cerda, empasto), escala de traço
fixa, render no build, peso controlado, zero JS. Prova: docs/design-review/estudo-pinceladas.png (6 arquétipos +
2 sorteados no tamanho do hero, ao lado do quadro inteiro).

Regra de página: telas da mesma página não repetem anatomia nem enquadramento. A capa de um texto sorteia o
arquétipo, mas evita o da faixa de Insights, o da faixa do seu eixo e o do convite da newsletter.

Ordem da home: abertura → Eixos → Vídeo → Ferramenta → Sobre → Serviços → rodapé. "Ideias recentes" fundida nos
eixos (aprovado): cada porta traz os dois textos mais recentes do eixo, e os dois insights mais novos sempre aparecem.
O vídeo virou camada própria entre as portas e a Ferramenta: primeiro escolher por onde entrar, depois assistir,
depois experimentar, conhecer quem escreve e, por fim, o que contratar. Campos: noite até "Sobre" → papel em
Serviços → noite no rodapé (2 trocas).

O gesto de cada camada (o trabalho → a composição):
- Abertura — "entender quem escreve e para quem": horizonte amplo (céu de manchas, massa, linha d'água com reflexos)
  em panorâmica + fio + faixa noite com H1 Literata.
- Eixos — "escolher por onde entrar": a tela tem a estrutura da lista — três estratos (faixas, bandas=3) ao lado das
  três portas, fio laranja vertical como costura, fio vivo em cada porta no hover.
- Vídeo — "assistir": sala de projeção; tela 16:9 (ondas: a fala) sangra até a borda direita, play grande no centro;
  "Vídeo em Destaque", título e resumo à esquerda.
- Ferramenta — "experimentar agora": meia seção é o close 2,5× (vento visto de perto) sangrando à esquerda de cima a
  baixo; a outra metade, texto e ação. O único close do site.
- Sobre — "confiar em quem escreve": a revelação da fonte — o quadro original na largura da janela (única aparição),
  fio, faixa do texto; as 5 áreas em colunas (o único "título + colunas entre réguas").
- Serviços — "entender o que contratar": cardápio em papel (mantido).

Aberturas por tipo de página: home = panorâmica alta; hubs de leitura = faixa 6:1 (arquétipo por hub: Insights
manchas, Radar vento, Engenharia massas, Negócios ondas, Bastidores faixas); artigo = faixa do título + capa em retrato
até a borda direita, fio vertical; arquivo da newsletter = título primeiro, fita fina de horizonte por baixo; 404 =
painel alto de massas ao lado da mensagem; edição = sem tela (capa autoral).
Hubs: destaque com a capa em retrato 4:5 ao lado do título (nunca a panorâmica da faixa). Newsletter e fim do texto:
convite com a tela "Radar de IA" (vento) em 1:1, coluna de 200px ou faixa baixa — nunca o close da Ferramenta.
Correções: "Erro 404" em ceu; chips do Radar em caixa mista.

Teste do dono ("conquista sozinha ou só organizada?"): abertura, Eixos, Vídeo, Ferramenta e Sobre conquistam pelo gesto
de pintura de cada uma; Serviços conquista pela troca de campo (o único papel da home) e pelo fio vivo, mas é a camada
mais "documento" — candidata a um gesto próprio numa próxima rodada.

## Decisões em aberto (rodada 3)
- Serviços ainda sem tela própria (decisão: o papel é o gesto; reavaliar).
- Anterior/próximo e relacionados no fim do artigo continuam fora (exigem texto novo).
