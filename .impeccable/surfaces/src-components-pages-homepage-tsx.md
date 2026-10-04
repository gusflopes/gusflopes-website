---
version: 1
slug: "src-components-pages-homepage-tsx"
primary_target: "src/components/pages/HomePage.tsx"
related_targets: ["src/components/pages/InsightArticlePage.tsx","src/components/pages/InsightsPage.tsx","src/components/pages/RadarPage.tsx","src/components/pages/NewsletterPage.tsx"]
---

# Surface brief: gusflopes.dev, sistema visual "Evolução do atual"

Escopo: sistema visual inteiro do site (home, hubs, artigos, newsletter, 404/privacy/terms) mais o kit Substack.
Modos: home = Persuade (assinar a newsletter, abrir conversa); hubs, artigos e newsletter = Read.
Público, oferta, provas e restrições: ver PRODUCT.md. Direção escolhida pelo dono (1º no ranking, maquete k=9), não sorteada.
Momento memorável: o quadro respira inteiro à direita do hero, sem véu, e o título serifado em azul-escuro sólido à esquerda.

## Direction contract

THESIS: o site de hoje executado sem timidez. O quadro aparece com força uma vez, no hero; tudo o mais é tipografia, ritmo e fio. Recusa o padrão "dark SaaS com glow, cards com tudo e texto em gradiente".

OWN-WORLD: (reescrito na rodada 4, 04/10/2026, com os papéis das cores do PRODUCT.md) laranja (#F97316) é a cor principal da marca e vive em detalhes distribuídos pela página inteira, em dois registros: (a) chapado = ação (botão, play, chip ativo) e (b) detalhe não textual = presença (filete de 2–3px, fio de capa, fio de índice, marca de data, selo "Mais recente", número, estado ativo). Sobre claro, #F97316 nunca é texto: entra como filete ou marca; texto laranja sobre papel é #C2410C e só em link (#9A3412 no campo areia, onde #C2410C não passa). Texto sobre fundo laranja é o azul-escuro #0B1A33, e fundo laranja com texto é sempre #F97316. Azul-escuro (#0B1A33, #13284D, #081428) é estrutura e fundo: hero, um encarte, rodapé, moldura dos hubs; nunca dois blocos escuros em sequência e nenhum campo escuro de mais de ~1.000px sem passar por um claro. Claros são obrigatórios no ritmo: papel frio #F2F4F7 para leitura e um campo areia acinzentado (#D9D4CB, nunca creme) em poucas seções. As cores do quadro têm função abaixo do hero: petróleo (#315b6f/#457183) é a cor de Engenharia & IA, dos metadados e do "&" da ponte no claro; areia (#aa9c87) é a de Negócios e o campo quente; ferrugem (#8a4c1b) é a de Bastidores e a casa "hoje" do Sobre; ardósia (#648188/#7f989a) e marrom (#907a5f/#50372a) ficam para fios e fundos sem texto. Ferrugem nunca encosta em texto #C2410C nem no laranja chapado. O azul-céu #8FB3D9 caiu para apoio frio: texto secundário sobre escuro, nunca acento estrutural. Literata (óptica variável) para títulos e leitura, Hanken Grotesk para UI, JetBrains Mono só para código. Fios no lugar de cartões, cantos de 3–4px, nenhuma sombra ou brilho decorativo.

STORY: o visitante entende em uma tela quem escreve e sobre o quê (tecnologia e negócio), escolhe a porta (eixo) e assina a newsletter ou lê um texto.

FIRST VIEWPORT: header fino sobre azul; à esquerda, coluna de ~44% em azul-escuro sólido com a linha de assunto, o título em Literata 600 grande (segunda linha em laranja sólido), o deck e o botão "Assinar Newsletter"; à direita o quadro sem véu, ocupando o resto da altura; degradê só na base para emendar com a página.

FORM: evolução do incumbente (posição 1 do ranking do dono, maquete k=9); sem seed key — direção fixada pelo dono, concept-seed não rodou por instrução do brief.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Rodada 2: o resto da página (04/10/2026)

Veredito do dono: "Mudou o hero, mas o resto continua ruim." Esta rodada compõe cada seção a
partir do trabalho dela para o visitante, no idioma da direção (Literata óptica, fio de 1px,
papel frio, quadro como único raster, céu `#8FB3D9` com função).

Ajustes do hero pedidos pelo revisor: header sólido (o contrato já dizia "header fino sobre
azul"), quadro começa abaixo dele e ocupa de 36% da largura em diante, sem véu no topo; rampa
curta, quadro limpo a partir de ~55%; só o degradê da base. Celular: faixa de 34svh recortada
(overflow) para não haver costura; deck apertado; "Assinar Newsletter" cabe em 390×844.

### Trabalho → composição

| Seção | Trabalho para o visitante | Composição |
|---|---|---|
| Hero | entender quem escreve e assinar | inalterado no essencial: Literata 600 opsz 72 em 4 linhas, 2ª metade em laranja, quadro limpo à direita |
| Eixos | escolher por onde entrar | três portas desiguais: Engenharia & IA é a porta larga (7/12) com o texto mais recente ancorado embaixo em Literata 2,25rem; Negócios e Bastidores empilham à direita (5/12) separados por fio. "Mais recente · data" vira metadado abaixo do título |
| Ferramenta | experimentar algo agora | a pergunta do empresário abre em itálico grande (1ª frase do parágrafo, sem mudar texto); o nome fica à esquerda como ficha com "Ferramenta gratuita · Experimento aberto" embaixo; fio céu em cima |
| Recorte do quadro | passagem da noite para o papel | faixa dos reflexos na água, h-28/h-44, sem texto, lazy |
| Sobre (Themes) | entender por que a visão é sistêmica | papel; argumento preso à esquerda (sticky), as cinco áreas como índice tipográfico: nome em Literata 2,5rem pendurado na margem, explicação recuada a 38% embaixo |
| Ideias recentes + vídeo | ler algo agora | lista de leitura sem imagens: data na margem (céu), título, metadados eixo · tema; o vídeo é a única imagem da seção |
| Como posso ajudar | entender o que contratar | abre o campo escuro final como livro-razão: nome | o que é | ação na ponta direita, fio laranja acende no hover |
| Rodapé | achar o resto | mesmo campo de Services |

### Ordem e campos
Hero → Eixos → Ferramenta → [recorte do quadro] → Sobre → Ideias recentes → Como posso ajudar → Rodapé.
Por quê: depois de escolher a porta e experimentar a ferramenta, o visitante quer saber quem é
o autor e o que ele tem pensado; o pedido (contratar) fecha a página, colado ao contato do rodapé.
Campos: noite (hero, eixos, ferramenta) → recorte → papel (sobre, ideias) → noite funda (serviços,
rodapé). Três trocas, cada uma uma virada da história: descobrir → conhecer → contratar.

### Regras de composição aplicadas
- O módulo "título à esquerda + 3 colunas entre fios" não aparece mais na home (nem no 404).
- Vizinhos com estruturas diferentes: portas desiguais / pergunta + ficha / índice / lista + vídeo / razão.
- Sinal da direção em toda seção: acento em itálico da Literata no H2, o & em itálico céu, fios, papel frio, céu como cor de orientação.
- Rótulos acima de título viraram `.meta` abaixo do título em eixos, ideias, hubs, newsletter, autor, 404 e páginas legais.

### Corte proposto (não aplicado)
"Ideias recentes" repete parte do que as portas dos eixos já mostram (os mesmos textos mais
recentes aparecem nas duas). Proposta: fundir as duas listas, ou trocar "Ideias recentes" pelos
3 mais recentes que NÃO estão nas portas. Mantida até aval do dono.

## Rodada 3: cada camada conquista sozinha (04/10/2026)

Mandato do dono: "o hero prende a atenção, depois cada uma das camadas conquista." O hero
acertou; abaixo dele a página "perdia o charme" (lista entre fios em sequência). O mundo é o de
um site editorial premiado em azul-noite; cada camada ganhou uma ideia de página de revista.

### Achados do revisor da rodada 2 → resposta
1. Hierarquia: `.h-secao` vai a 3rem (2,125rem no celular). Teto interno de 2,25rem: manchete da
   porta larga 2,25rem e cabeça de coluna 2rem; áreas do Sobre 1,5rem; na Ferramenta o nome é o
   H2 (3rem) e a pergunta desce para 2rem.
2. Vazio da porta larga: a coluna larga agora leva a manchete, mais dois textos e o vídeo; as
   duas colunas fecham na mesma altura.
3. Sequência repetida: "Ideias recentes" saiu (fundida nos eixos). Sobre (ensaio com quadro de
   fios 3×2) e Serviços (página do pedido, oferta principal + notas) têm estruturas diferentes.
4. Acento: itálico só em "e para quem" e "mais do que código"; "Como posso ajudar" sem acento.
   "&" na cor do texto; céu só em "Domínio & Arquitetura" (negócio ↔ tecnologia).
5. Respiros: base do hero ~100px até o título dos eixos (era ~150); encarte fecha a 64px do recorte.

### Camadas → gesto
| Camada | Trabalho | Gesto |
|---|---|---|
| Eixos | escolher a porta e ler algo agora | PRIMEIRA PÁGINA: fio de capa 3px+1px, colunas 7/5 com fio vertical, manchete por porta, seguintes com data na margem, o vídeo como a foto da capa |
| Ferramenta | experimentar algo agora | ENCARTE: a única caixa da home, noite-2 com fio céu grosso no alto; nome em 3rem, pergunta em itálico, ação no pé |
| Recorte do quadro | passagem noite → papel | inalterado |
| Sobre | entender por que a visão é sistêmica | ABERTURA DE ENSAIO: frase-tese em escala de citação; cinco áreas num quadro de fios 3×2 cuja sexta casa, em azul-noite, é o trabalho de hoje |
| Como posso ajudar | entender o que contratar | PÁGINA DO PEDIDO: título pendurado, Consultoria em escala de abertura com botão sólido, Mentoria e Conteúdo como notas |
| Rodapé | achar o resto | inalterado |

### Ordem
Hero → Eixos (+ vídeo) → Ferramenta → [recorte] → Sobre → Como posso ajudar → Rodapé.
Campos: noite → papel → noite funda (três trocas).

### Decisões aprovadas aplicadas
- "Ideias recentes" fundida nos eixos: Engenharia leva 3 textos, Negócios e Bastidores 2 cada;
  os dois textos que a lista mostrava (servidor MCP; "O conceito é dele") estão em Bastidores.
  O "Ler Mais" da lista saiu com ela.
- "Vídeo em Destaque" realocado para a primeira página (fecha a coluna larga; no celular fecha a
  capa), texto mantido, "Vídeo em Destaque" como metadado depois do título.
- 68b9f27 (links em caixa normal) mantido; newsletter no fim do artigo mantida.

### Teste do dono ("conquista ou só organizado?")
- Hero: conquista (inalterado).
- Eixos: conquista — lê como capa de jornal; a manchete larga e a foto dão o foco.
- Ferramenta: conquista — o encarte é a única caixa, muda de matéria sem mudar de mundo.
- Sobre: conquista — a frase-tese domina e o quadro com a casa azul fecha a ideia de sistema.
- Serviços: conquista no desktop pelo contraste de densidade; no celular é a camada mais simples.
- Celular, Sobre: as áreas empilham em linhas (a grade 3×2 só existe a partir de md).

## Rodada 4: cor como sistema (04/10/2026)

Mandato do dono: "a pincelada está muito azul"; "um blocão azul atrás do outro"; "o laranja
sumiu do site, e ele é a cor principal"; "o rodapé, sem transição de clara, parece um bloco
gigantesco". O revisor mediu a v3: noite contínua de 0 a 2.608px, claro em 20% da página,
rodapé empilhado sobre Services, laranja só em links e botões, céu em todos os acentos
estruturais. A composição de cada camada fica; muda o campo de cor e o papel de cada cor.

### Contrato de cor (substitui as regras da rodada 1)
- Removido: "laranja é ação, céu é orientação"; "rodapé no mesmo campo de Services"; céu como
  fio de capa, fio do encarte, datas na margem e "&" da ponte.
- Laranja em dois registros: chapado = ação; detalhe = presença (pelo menos um por seção).
- Seção escura grande chega de um claro; o rodapé chega de um claro com um gesto (recorte do
  quadro na home; fio de capa laranja no alto do rodapé em todo modelo).
- Cores do quadro com função (tabela no OWN-WORLD).

### Mapa de campos da home (composição de cada camada mantida)
| Camada | Campo | Laranja (detalhe) | Cor do quadro |
|---|---|---|---|
| Hero | noite | 2ª metade do título, botão, fio da linha de assuntos | o quadro inteiro |
| Recorte 1 (reflexos) | quadro | — | a passagem noite → papel |
| Eixos (primeira página 7/5) | papel | fio de capa, selo "Mais recente", filete da data na margem, links #C2410C | placas: petróleo (Engenharia & IA), areia (Negócios), ferrugem (Bastidores); datas em petróleo |
| Ferramenta (encarte) | noite sobre papel (único bloco escuro abaixo do hero) | fio de 3px no alto, botão, link | — |
| Sobre (ensaio, quadro 3×2) | papel | fio de cima do quadro (2px) | sexta casa em ferrugem; "&" da ponte em petróleo |
| Como posso ajudar (pedido) | areia #D9D4CB | fio de capa da Consultoria, botão, links #9A3412 | o próprio campo |
| Recorte 2 (luzes) | quadro | — | a passagem areia → rodapé |
| Rodapé | noite-fundo | fio de capa no alto, títulos de coluna, botão | — |

Hubs, Radar, newsletter, 404: moldura noite no alto, índice em papel com o fio laranja do índice
(2px, marca de 5px sobre a data) e a marca do eixo na cor do quadro; rodapé chega do papel.
Artigo e edição: coluna em papel, caixa da newsletter com fio laranja; rodapé chega do papel.
Celular: rodapé compacto (navegação e contato lado a lado) para ficar abaixo de ~1.000px.

## Rodada 5: claros da Shelfye e o quadro nas páginas de leitura (04/10/2026)

Duas mudanças, nas palavras do dono: "o bege ou creme deles é mais bonito que esse cinza" e o
refinamento pedido pelos revisores da v4. Esta seção substitui, no OWN-WORLD e no mapa acima,
tudo o que fala em papel frio `#F2F4F7`, areia acinzentada `#D9D4CB` e "nunca creme".

### Claros (PRODUCT.md, "Claros quentes da Shelfye.ai")
- Papel `#FFF8F2` = leitura (home, índices, artigo). Creme `#FDEED9` = caixas e o claro que
  antecede o escuro. Tons `#F9F2EC`/`#EEE7E1` aninham sem fio; fio quente `#E6D9C8`.
- Texto: tinta `#0B1A33`, tinta-2 `#33445F`, secundário `#475569`; link `#C2410C` em papel e creme
  (`#9A3412` em `#EEE7E1`); petróleo como texto em `#315B6F`. Ardósia, marrom e `#F97316` sobre
  claro não levam texto. Texto claro sobre a noite continua frio.
- Do clichê de creme, só o creme: o acento segue laranja, sem terracota e sem serifa decorativa.

### O quadro como gramática de todo modelo de página
- Recorte de abertura (reflexos) na base de toda moldura escura: home (costurado reto ao hero por
  um fio laranja de 2px; a pintura do hero desce sem degradê no desktop), hubs, Radar, newsletter,
  artigo (a capa atravessa a passagem para o papel) e 404.
- Recorte de fecho (luzes) no layout, antes do rodapé de toda página: último claro → quadro →
  fio de capa laranja → rodapé.

### Funções novas de cor
- Placa do eixo (`PlacaEixo`): o eixo chapado na cor do quadro, com peso real, na moldura do hub,
  nas linhas do índice geral e do Radar, nos metadados do artigo; e como capa sem foto.
- Ardósia = a voz de outro (filete de citação, fonte externa no Radar). Marrom = a assinatura do
  autor (fio da frase-tese no Sobre e da caixa do autor).
- Índice: fio neutro de 1px e marca laranja de 5px só sobre a data. Artigo: links em tinta com
  sublinhado `#F97316`, marcadores quadrados laranja, H2 com fio e marca laranja (a linha do índice).

### Mapa de campos (rodada 5)
| Modelo | Sequência |
|---|---|
| Home | noite (hero) → costura laranja → recorte → papel (eixos, encarte, sobre) → creme (como posso ajudar) → recorte de fecho → rodapé |
| Hubs e Radar | noite (título, deck, placa do eixo) → recorte → creme (busca e temas) → papel (índice) → recorte de fecho → rodapé |
| Newsletter | noite → recorte → creme (inscrição) → papel (edições) → recorte de fecho → rodapé |
| Artigo e edição | noite (título, metadados com placa) → recorte com a capa atravessando → papel (leitura) → creme (newsletter e autor) → recorte de fecho → rodapé |

### Correções do revisor da v5 (fix)
- Capas de hub e de artigo em duotone noite + cor do eixo (CSS); o fallback é o mesmo campo.
- Artigo: o recorte aparece inteiro (capa sobre no máximo o terço de baixo no desktop; depois dele
  no celular); sumário dos H2 reais (margem fixa ≥1200px com a marca laranja de 5px no item ativo;
  bloco em creme depois do lede abaixo disso); cabeçalho da tabela em campo petróleo com texto papel;
  números das listas ordenadas em `#C2410C`.
- Ardósia na voz de outro que existe nas páginas capturadas: a legenda do vídeo em destaque da home.
  O blockquote dos artigos é frase do autor e passou para o fio marrom.
- Páginas que já fecham com a caixa da newsletter: a newsletter do rodapé vira link laranja com seta.
- `PlacaEixo`: "Engenharia & IA" com os espaços em volta do "&", como no título do hub.
