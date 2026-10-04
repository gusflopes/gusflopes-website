# Kit Substack — direção "Metrô Noturno"

O site é um mapa de rede noturno: cada eixo é uma linha, cada texto é uma estação. No Substack sobra pouco
espaço para personalizar (cor de destaque, cor de fundo, logo, wordmark, capa e uma fonte de lista fixa), então a
identidade viaja em três coisas que sobrevivem a qualquer tema: **o laranja**, **o azul-escuro** e **o desenho da
linha com estações** nas capas.

## O que configurar (Settings → Branding / Design)

| Campo | Valor | Por quê |
|---|---|---|
| Cor de destaque (accent) | `#F97316` | O laranja oficial. Botões do Substack usam texto branco por cima; se houver opção de texto escuro, use `#1C0A02` (contraste 6,9:1). |
| Cor de fundo da publicação (web) | `#0B1A33` | A noite da moldura do site. Se o tema escuro ficar pesado no app, a alternativa segura é `#F2F4F7` (papel frio). |
| E-mail | fundo claro (padrão do Substack) | Cliente de e-mail ignora fundo escuro de forma imprevisível; o e-mail fica claro e a identidade vai na capa do post e no destaque laranja. |
| Fonte de títulos | **a mais próxima de Hanken Grotesk na lista** | Não consegui confirmar a lista atual de fontes do Substack daqui (o painel exige login). Duas escolhas seguras, se aparecerem: uma grotesca humanista moderna (ex.: a sans "padrão" do Substack) para títulos, ou manter a sans padrão. Evite serifas display. |
| Fonte do corpo | **a serifa de texto mais próxima de Source Serif 4** | Mesma ressalva: escolha uma serifa de leitura (do tipo Georgia/serifa padrão do Substack). Se a lista só tiver sans, fique com a sans padrão. |

## Arquivos

| Arquivo | Uso no Substack |
|---|---|
| `logo.svg`, `logo-512.png` | Logo/ícone da publicação (quadrado). A marca é a baldeação: a linha da tecnologia (laranja) cruza a linha do negócio (azul-céu) numa estação. |
| `wordmark.png` (fundo transparente, texto azul-escuro) | Wordmark/cabeçalho quando o fundo da publicação for claro e no cabeçalho do e-mail. |
| `wordmark-noite.png` (sobre `#0B1A33`) | Wordmark quando o fundo for azul-escuro. |
| `wordmark.svg`, `wordmark-noite.svg` | Vetores-fonte. O texto usa a família Hanken Grotesk; sem a fonte instalada, o visualizador troca por outra. Use os PNG no Substack. |
| `capa-publicacao.png` (1456×816) | Capa/cover da publicação e imagem de compartilhamento padrão: a tagline e as três linhas sob a cidade do quadro, apagada no topo. |
| `exemplos/` | Capas de post geradas com títulos reais do site. |

## Capa de post

```bash
node docs/substack-kit/gerar-capa.mjs "Título" <engenharia|negocios|bastidores|radar|newsletter> [rótulo] [saída]
```

Gera `…-1456x816.png` (capa do post no Substack) e `…-1200x630.png` (prévia social). Desenha o trecho da linha do
eixo — ou, para `radar` e `newsletter`, o serviço tracejado — com a estação atual em destaque, o título em Hanken
Grotesk 800 e o quadro apagado só no topo, nunca atrás do título. `rótulo` troca o nome da linha na placa por um
texto curto que já exista (ex.: `"Edição #1"`). Exemplo da edição atual:

```bash
node docs/substack-kit/gerar-capa.mjs "Modelo bom virou commodity. Contexto não." newsletter "Edição #1"
```

O kit fixo (logo, wordmarks, capa da publicação) sai de `node docs/substack-kit/gerar-kit.mjs`.

Requisitos: `pnpm install` na raiz (usa `sharp`, `wawoff2` e as fontes `@fontsource-variable` do site; o script
descomprime o woff2 para TTF numa pasta temporária porque o freetype do sharp não lê woff2).

## Como a identidade sobrevive ao e-mail

- O e-mail é claro; o que carrega a marca é a **capa do post** (linha + título) no topo de cada edição e o
  **destaque laranja** nos botões e links.
- Nada depende de fonte web: as capas são PNG com o texto já desenhado.
- O wordmark transparente funciona sobre o branco do e-mail; a versão noturna fica para a web.

## Proveniência dos rasters

Todos os PNG deste diretório foram **gerados por código**, sem IA de imagem: SVG desenhado nos scripts
`gerar-kit.mjs` / `gerar-capa.mjs` e rasterizado por `sharp` (librsvg) com Hanken Grotesk (OFL, via
`@fontsource-variable/hanken-grotesk`). `capa-publicacao.png` e as capas de post usam o quadro do hero
(`src/assets/326189a758fea0fe0e2da42349b6da943b29ba51.png`) redimensionado e apagado com máscara em degradê. Os
títulos dos exemplos vêm de `src/content/insights/agent-skills-pacotes-de-contexto.md` e
`src/content/newsletter/radar-semanal-01.md`. A origem também está gravada em cada PNG (chunk tEXt, via
`impeccable embed-prompt`); ao regenerar, rode de novo
`.claude/skills/impeccable/scripts/impeccable embed-prompt --scan docs/substack-kit` e grave a origem nos que faltarem.
