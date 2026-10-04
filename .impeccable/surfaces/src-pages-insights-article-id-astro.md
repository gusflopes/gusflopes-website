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

OWN-WORLD: moldura azul-escuro `#0B1A33` com o título em blocos de Archivo 900 caixa-alta ajustados à largura, a linha marcada no peso 100 sólido (par 900/100), dois-pontos em laranja; corpo em Source Serif 4 ~19px sobre papel quente `#FFF8F2` (claro da Shelfye, rodada 5), tinta azul-escuro, links laranja profundo `#C2410C`. Hubs: tabela de grade rígida, filetes, sem cards nem sombra. Rodada 4 (cor como sistema, mesmo contrato da home): laranja em dois registros — chapado = ação (texto `#0B1A33` sobre `#F97316`), presença = detalhe não textual (filete de 2px no topo de cada linha do índice, marca quadrada) em toda janela de 900px; no papel o laranja nunca é texto. Cabeçalho de hub com a frase de apoio num campo chapado de petróleo escuro `#315b6f` (cor do quadro, papel sobre ele 6,67:1); índice sempre sobre papel; o rodapé chega do papel.

STORY: o leitor reconhece o eixo pela forma da abertura (bloco justificado = Engenharia & IA; escada alinhada à direita = Negócios; degraus = Bastidores), lê sem atrito e encontra o autor e a newsletter no fim.

FIRST VIEWPORT: barra azul-escuro com voltar/compartilhar; faixa de metadados em grade (eixo · categoria · data · leitura); bloco do título ocupando a largura da coluna larga; linha-fina em serifa clara; o papel começa logo abaixo com o corpo.

FORM: sistema tipográfico concreto aplicado a leitura; 1º da lista (direção fixada pelo dono); seed key: n/a.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Rodada 2 — hubs, fim do artigo, newsletter

- **Hubs** (achar o próximo texto): linhas de tabela; o dia como numeral leve e largo, "Mês, ano" e duração em rótulo; o texto mais recente (sem filtro) tem a célula de data em plano laranja e o título em 900 caixa-alta. Bastidores: o simulador vira grade de células com metadados ao lado do título e a ação como célula laranja.
- **Fim do artigo** (saber quem escreveu e continuar): grade de duas células sobre o papel, desenhada por filete azul de 2px — autor (foto, nome em estreita, "Sobre o Autor" em linha de metadados depois do nome, bio, redes) e o plano laranja da newsletter.
- **Newsletter** (assinar e achar uma edição): plano laranja de inscrição; "Edições" em abertura estreita; cada edição com "Edição #N · data" numa célula ao lado do título, o número em numeral grande. Página da edição: metadados e linha-fina numa coluna de células ao lado da abertura; "Ler no Substack" com seta SVG.
- **404 e legais**: abertura gerada do título, metadados ("Erro 404", "Última atualização") em célula ao lado; a linha marcada leve, peso 100 ("DE LUGAR").

## Rodada 3

- Aberturas de texto, hub, 404 e legais: a linha marcada deixa de ser vazada e passa a peso 100 sólido, medida com as larguras do peso 100; a forma por eixo e o corte determinístico do título não mudam. O gerador de capa do Substack segue a mesma regra.
- Fim do artigo: o brief passa a descrever o que está construído — autor e newsletter sobre o papel, numa grade de duas células com filete azul; a newsletter continua como plano laranja (decisão do dono: fica).

## Rodada 5

- Claros da Shelfye: corpo sobre papel `#FFF8F2`, caixa do autor em creme `#FDEED9`, fio `#E6D9C8`, hover de linha `#F9F2EC` (o `#C2410C` mantém AA), código inline em `#EEE7E1`.
- Hubs: célula de data no campo do quadro do eixo do texto (`EIXO_CAMPO`: petróleo escuro, ferrugem, ardósia clara); o mais recente segue laranja. Frase de apoio do hub no campo do eixo.
- Artigo (texto único, igual nos dois briefs): costura laranja de 4px na passagem noite → papel; filete laranja sob os metadados e sobre a linha-fina; no desktop, a margem esquerda (3 colunas) é um sumário fixo com os títulos reais dos H2, aberto por filete laranja de 6px, a seção corrente no campo do quadro do eixo com topo laranja de 6px (`aria-current="location"`), sem rótulo visível e sem número; cada H2 é uma célula da grade no campo do eixo (o próprio título em papel, ou azul sobre ardósia), com topo laranja de 10px (8px no celular) e base de 4px; o cabeçalho das tabelas usa o mesmo campo; listas numeradas com o número num chip laranja (azul-escuro sobre `#F97316`) e marcadores quadrados de 0,6em; links sublinhados em `#F97316`; no fim, caixa do autor em creme e plano laranja da newsletter (no celular o plano vem antes e o creme fecha a página), e o rodapé omite a célula da newsletter e leva o filete laranja de 6px no topo.
