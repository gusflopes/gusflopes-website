---
version: 1
slug: "src-components-pages-homepage-tsx"
primary_target: "src/components/pages/HomePage.tsx"
related_targets: ["src/components/pages/InsightArticlePage.tsx","src/components/pages/InsightsPage.tsx"]
---

# Superfície: sistema visual gusflopes.dev — direção "Metrô Noturno"

Escopo: site inteiro (home = Persuade; hubs, artigos, newsletter = Read). Direção escolhida pelo dono (2º lugar no ranking, maquete k=4); nada foi sorteado. Caminho code-led (sem geração de imagem).

Público e tarefa: profissional técnico e empresário chegam por rede social/busca, leem um texto até o fim, assinam a newsletter. Prova: só artigos reais (estações = textos publicados). Restrições: paleta fixa azul-escuro + laranja; copy protegida; quadro nunca atrás de texto corrido.

## Direction contract

THESIS: o site é um mapa de rede de transporte noturno — cada eixo editorial é uma linha, cada texto é uma estação em ordem de data, e a ponte Negócios/Tecnologia é a baldeação (tags em comum entre linhas). Recusa o blog de cards com thumbnail de stock e o hero de foto com overlay.

OWN-WORLD: moldura azul-escuro #0B1A33/#13284D; linhas em laranja #F97316 (Engenharia & IA), azul-céu #8FB3D9 (Negócios), âmbar #FDBA74 (Bastidores); Radar e Newsletter como serviço tracejado. Estações = círculo de miolo escuro com anel claro; estação atual = anel laranja grande. Placas de sinalização em Hanken Grotesk 700–800, leitura em Source Serif 4 sobre papel frio #F2F4F7. Trilhos paralelos verticais como índice; nada de cards com sombra.

STORY: o visitante vê de cara as três linhas e as estações mais recentes, entende que há três portas (técnico, negócio, bastidores) que se cruzam, entra numa estação, lê numa coluna clara e calma, segue para a próxima estação da mesma linha ou faz baldeação; assina a newsletter.

FIRST VIEWPORT: desktop — barra de sinalização noturna no topo; à esquerda (5/12) a tagline em Hanken 800 grande, o deck e o botão laranja "Assinar Newsletter"; à direita (7/12) o mapa das três linhas com as 3–4 estações mais recentes de cada uma, clicáveis, sobre a cidade do quadro apagada (opacidade ~.25, máscara em degradê) que some antes do texto. Mobile — tagline e CTA, depois as linhas viram trilhos verticais como o diagrama dentro do vagão.

FORM: rede de metrô / diagrama de linha (item 1 da lista do dono, direção 4 "Metrô Noturno"); seed key: dono-ranking-k4 (não sorteado). Interação-assinatura: "você está aqui" em todo artigo — trilho da linha com todas as estações e a atual destacada, anterior/próxima estação no rodapé.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Decisões em aberto
- Rótulos "Estação", "Você está aqui", "Baldeação", "Estação anterior/Próxima estação" são texto novo: ficam em commit `copy(metro):` isolado, aguardando aval.
