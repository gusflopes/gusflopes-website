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

OWN-WORLD: azul-escuro de verdade (#0B1A33, #13284D) e laranja (#F97316 sobre escuro, #C2410C sobre claro), azul-céu do quadro (#8FB3D9) como apoio frio; papel frio #F2F4F7 nos artigos. Literata (óptica variável) para títulos e leitura, Hanken Grotesk para UI, JetBrains Mono só para código. Fios de 1px no lugar de cartões, cantos de 3–4px, nenhuma sombra ou brilho decorativo; botão laranja com texto #1c0a02.

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
