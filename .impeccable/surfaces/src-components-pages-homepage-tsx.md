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
