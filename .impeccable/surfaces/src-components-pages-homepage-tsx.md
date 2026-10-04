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
não executado por instrução. Assinatura: o gerador (capa, OG, faixa de hub, abertura, capa Substack). Interação: o fio
laranja que se estende sob a tela no hover/foco dos cards; telas estáticas, zero JS extra.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Decisões em aberto
- Fotos do Unsplash trocadas pela tela só no render; frontmatter intocado.
- Capa autoral da newsletter (media.gusflopes.dev) mantida.
