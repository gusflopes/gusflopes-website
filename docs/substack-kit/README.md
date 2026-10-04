# Kit Substack — direção Concretismo

Identidade do gusflopes.dev (azul-escuro + laranja, tipo como construção) adaptada ao que o Substack
deixa configurar: cor de destaque, cor de fundo, logo, wordmark, capa e fontes de uma lista fixa.

## O que configurar no Substack (Settings → Branding / Style)

| Campo | Valor | Por quê |
|---|---|---|
| Cor de destaque (accent) | `#C2410C` (laranja profundo) | O Substack põe texto **branco** sobre o accent nos botões. Branco sobre `#C2410C` dá 5,2:1 (AA). O laranja da marca `#F97316` com branco dá 2,8:1 e reprova. |
| Cor de fundo | `#F2F4F7` (papel frio) | É o fundo do corpo de leitura no site. Se o tema só aceitar branco, use branco: a identidade fica no wordmark, na capa e no accent. |
| Logo (quadrado) | `logo-512.png` | G em Archivo 900 sobre azul-escuro com o bloco laranja girado. |
| Wordmark (horizontal) | `wordmark.png` (fundo transparente, tinta azul-escuro) para fundo claro; `wordmark-azul.png` (bloco azul-escuro) quando o espaço tiver fundo próprio ou escuro | "Wordmark em bloco azul-escuro" é a assinatura pedida para o Substack. |
| Capa da publicação | `capa-publicacao.png` (1456×816) | A tese da marca no sistema de abertura tipográfica, com a janela laranja mostrando o quadro. |
| Capa de cada post | gerar com `gerar-capa.mjs` (abaixo) | Substitui foto de banco por abertura tipográfica do título. |

### Fontes

Não consegui confirmar a lista de fontes que o Substack oferece hoje (ela muda e só aparece dentro do painel).
O site usa **Archivo** (títulos, 900) e **Source Serif 4** (texto). No painel, escolha nesta ordem:

1. Títulos: uma grotesca pesada (Archivo, se aparecer; senão a sans mais pesada da lista). Texto: Source Serif 4, se aparecer.
2. Alternativa segura A: títulos numa sans neutra em negrito (a sans padrão do Substack) + texto em **Georgia**.
3. Alternativa segura B: tudo na serifa padrão do Substack — a identidade se apoia então no wordmark, nas capas e no accent.

Evite fontes decorativas ou script: o sistema é tipográfico e seco.

## Gerador de capa de post

```bash
node docs/substack-kit/gerar-capa.mjs "Título da edição" newsletter
# eixos: engenharia | negocios | bastidores | newsletter (padrão)
# saída: docs/substack-kit/capas/<slug>-1456x816.png e <slug>-1200x630.png
```

- **1456×816**: imagem de capa do post no Substack (proporção 16:9 que ele usa).
- **1200×630**: prévia social (LinkedIn, X, Bluesky) e `og:image`, se quiser usar no site.
- As regras de quebra, escala e linha leve (o par 900/100: a linha marcada sai no peso 100, sólida) vêm de `src/lib/abertura.ts`, as mesmas das aberturas dos
  artigos no site. Mesmo título + mesmo eixo = mesma capa, sempre. O eixo muda a forma: bloco justificado
  (Engenharia & IA, Newsletter), escada à direita (Negócios), degraus (Bastidores).
- O texto vira curva (SVG `<path>`) a partir dos arquivos `@fontsource-variable` do próprio site
  (`tipo.mjs`): o PNG sai igual em qualquer máquina, sem fonte instalada.

Exemplos em `capas/`, gerados com títulos reais de `src/content/`:
- `modelo-bom-virou-commodity-contexto-nao-*` — edição #1 da newsletter (`newsletter`).
- `agent-skills-pacotes-de-contexto-e-o-fim-do-prompt-gigante-*` — artigo de Insights (`engenharia`).

## Peças fixas

```bash
node docs/substack-kit/gerar-kit.mjs
```

Regenera `logo.svg`, `logo-512.png`, `wordmark.svg`, `wordmark.png`, `wordmark-azul.svg`, `wordmark-azul.png`,
`capa-publicacao.png` e também `public/favicon.svg` do site (mesmo desenho do logo).

## Como a identidade sobrevive ao e-mail

O e-mail do Substack ignora quase tudo do site: não há fontes próprias nem layout. O que chega:

1. **A capa do post** (imagem): carrega a abertura tipográfica, o azul-escuro, o laranja e o quadro. É o principal portador da marca no e-mail — sempre gere uma.
2. **O accent `#C2410C`**: botões e links do e-mail saem nele.
3. **O wordmark no cabeçalho**: em bloco azul-escuro, legível em cliente claro ou escuro.
4. **A voz**: o texto direto e sem hype é a parte da identidade que não depende de CSS.

No modo escuro de clientes de e-mail, a capa e o wordmark em bloco continuam corretos porque já são
azul-escuro com tipo claro; o wordmark transparente (tinta azul) é só para fundos claros.

## Proveniência dos rasters

Todos os PNGs deste diretório são gerados por script, sem IA generativa e sem banco de imagens:

| Arquivo | Origem |
|---|---|
| `logo-512.png`, `wordmark.png`, `wordmark-azul.png` | `gerar-kit.mjs`: texto em curvas do Archivo variável (wght 900, wdth 100, pacote `@fontsource-variable/archivo`), rasterizado com `sharp`. |
| `capa-publicacao.png` | `gerar-kit.mjs` → `capa()` de `gerar-capa.mjs`, título "Tecnologia e negócio, partes do mesmo sistema". |
| `capas/*.png` | `gerar-capa.mjs` com os títulos listados acima. |
| Quadro dentro da janela laranja (em todas as capas) | Recorte (900×900 a partir de x=860, y=120) do quadro da marca, `src/assets/326189a758fea0fe0e2da42349b6da943b29ba51.png`, reduzido para 700 px em JPEG. |
