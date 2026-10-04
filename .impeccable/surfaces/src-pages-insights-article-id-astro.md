---
version: 1
slug: "src-pages-insights-article-id-astro"
primary_target: "src/pages/insights/article/[id].astro"
related_targets: ["src/pages/radar/article/[id].astro","src/pages/insights.astro","src/pages/radar.astro","src/pages/[eixo]/index.astro","src/pages/newsletter/index.astro","src/pages/newsletter/[id].astro"]
---

# Artigos, hubs e newsletter — gusflopes.dev

Escopo: `/insights/article/*`, `/radar/article/*`, `/newsletter/*`, hubs `/insights`, `/radar`, `/engenharia`, `/negocios`, `/bastidores`, `/newsletter`. Modo: **Read**. Pergunta do leitor: "isso vale minha leitura e o que muda para mim?". Copy e conteúdo intocados.

## Direction contract

THESIS: a abertura de cada texto é gerada do próprio título por um sistema determinístico de quebra, escala e peso (por eixo); o corpo é uma coluna calma de serifa. Recusa a foto de banco no topo e o título serifado centrado.

OWN-WORLD: moldura azul-escuro `#0B1A33` com o título em blocos de Archivo 900 caixa-alta ajustados à largura, uma palavra/linha vazada, dois-pontos em laranja; corpo em Source Serif 4 ~19px sobre papel frio `#F2F4F7`, tinta azul-escuro, links laranja profundo `#C2410C`. Hubs: tabela de grade rígida, filetes, sem cards nem sombra.

STORY: o leitor reconhece o eixo pela forma da abertura (bloco justificado = Engenharia & IA; escada alinhada à direita = Negócios; degraus = Bastidores), lê sem atrito e encontra o autor e a newsletter no fim.

FIRST VIEWPORT: barra azul-escuro com voltar/compartilhar; faixa de metadados em grade (eixo · categoria · data · leitura); bloco do título ocupando a largura da coluna larga; linha-fina em serifa clara; o papel começa logo abaixo com o corpo.

FORM: sistema tipográfico concreto aplicado a leitura; 1º da lista (direção fixada pelo dono); seed key: n/a.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Rodada 2 — hubs, fim do artigo, newsletter

- **Hubs** (achar o próximo texto): linhas de tabela; o dia como numeral leve e largo, "Mês, ano" e duração em rótulo; o texto mais recente (sem filtro) tem a célula de data em plano laranja e o título em 900 caixa-alta. Bastidores: o simulador vira grade de células com metadados ao lado do título e a ação como célula laranja.
- **Fim do artigo** (saber quem escreveu e continuar): grade de duas células sobre azul — autor (foto, nome em estreita, "Sobre o Autor" em linha de metadados depois do nome, bio, redes) e o plano laranja da newsletter.
- **Newsletter** (assinar e achar uma edição): plano laranja de inscrição; "Edições" em abertura estreita; cada edição com "Edição #N · data" numa célula ao lado do título, o número em numeral grande. Página da edição: metadados e linha-fina numa coluna de células ao lado da abertura; "Ler no Substack" com seta SVG.
- **404 e legais**: abertura gerada do título, metadados ("Erro 404", "Última atualização") em célula ao lado; uma linha vazada só ("DE LUGAR").
