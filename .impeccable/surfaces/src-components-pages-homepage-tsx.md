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
