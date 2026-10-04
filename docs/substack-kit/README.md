# Kit Substack — direção "Pincelada"

A newsletter (Radar de IA, `gusflopes.substack.com`) precisa carregar a mesma identidade do site dentro do que o
Substack deixa mexer: cor de destaque, cor de fundo, fontes de uma lista fixa, logo, wordmark e imagens de capa.
No site a assinatura é a **tela gerada**: pinceladas curtas num campo de fluxo, semeadas pelo título, nos azuis do
quadro com poucas luzes laranja. No Substack ela entra pelas imagens (logo, capa da publicação, capa de cada post);
as cores e as fontes fazem o resto.

## O que configurar (Settings → Branding / Style)

| Campo | Valor | Por quê |
|---|---|---|
| Cor de destaque (accent) | `#C2410C` | Laranja profundo da marca. Sobre fundo claro passa AA para texto e links (4,9:1 em `#F2F4F7`, 5,2:1 em branco). O laranja de luz `#F97316` só passa 2,8:1 como texto em fundo claro — use `#F97316` apenas se o Substack aplicar o destaque só em botão com texto no azul-escuro da marca `#0B1A33` (6,2:1; regra da marca desde 04/10: texto e ícone sobre laranja são sempre `#0B1A33`, e fundo laranja com texto é sempre `#F97316`, nunca `#C2410C`), o que ele não garante. |
| Cor de fundo (background) | `#F2F4F7` | O papel frio da coluna de leitura do site. Se o seu plano só oferecer branco, use branco: o kit foi testado nos dois. |
| Fonte de título | **Lora** ou **Merriweather** (serifa) | A Literata, usada no site, não estava na lista do Substack que conheço; não consegui confirmar a lista atual daqui. Entre as serifas que o Substack costuma oferecer, Lora e Merriweather são as mais próximas do desenho da Literata (serifa de leitura, olho médio, peso firme). Escolha a que estiver disponível, nessa ordem. |
| Fonte de corpo | **a mesma serifa do título** ou a sans padrão do Substack | No site, título e leitura são Literata. Se o Substack permitir separar, mantenha serifa nos dois; se a única opção de corpo for sans, aceite a padrão. Alternativa segura se nada disso existir: Georgia (serifa) + sistema (sans). |

> Lista de fontes: confira em Settings → Style antes de escolher. Se mudou, a regra é "serifa de leitura com olho
> médio e peso firme para títulos" — evite serifas de alto contraste (didonas) e scripts.

## Arquivos

| Arquivo | Uso no Substack |
|---|---|
| `logo.svg`, `logo-512.png` | Logo/ícone da publicação (quadrado). "g" em Literata com o ponto laranja e o fio laranja na base — o mesmo gesto do favicon do site. Suba o PNG. |
| `wordmark.svg`, `wordmark.png` | Wordmark horizontal com fundo transparente e texto azul-escuro: para o cabeçalho sobre fundo claro (`#F2F4F7` ou branco). |
| `wordmark-noite.svg`, `wordmark-noite.png` | Mesma marca sobre azul-escuro `#0B1A33`, para onde o fundo for escuro (redes, e-mail com cabeçalho escuro). |
| `capa-publicacao.png` (2400×1350) | Capa/cover da publicação (página "about", cartões de compartilhamento da home da publicação). Tela gerada (semente "Radar de IA") + faixa papel com nome e promessa. |
| `gerar-capa.mjs` | Gera a capa de cada post. |
| `exemplos/` | Capas geradas com títulos reais (edição #1 e um texto de Engenharia & IA). |

## Capa de cada post

```sh
node docs/substack-kit/gerar-capa.mjs "Modelo bom virou commodity. Contexto não." radar
node docs/substack-kit/gerar-capa.mjs "Agent Skills: pacotes de contexto e o fim do prompt gigante" engenharia
```

Gera `<slug>-1456x816.png` (capa do post, proporção que o Substack usa no topo e nos cartões) e
`<slug>-1200x630.png` (prévia social). Eixos aceitos: `engenharia`, `negocios`, `bastidores`, `radar` (rótulo
"Radar de IA", o default). O terceiro argumento opcional é a pasta de saída (default `exemplos/`).

Como funciona: a semente é o próprio título, então cada edição ganha uma tela única e sempre a mesma se gerada de
novo. O título vai numa faixa sólida clara com o fio laranja — nunca sobre a pintura — para ficar legível no
e-mail, no app e no cartão da rede social. É o mesmo gerador das capas e imagens OG do site
(`scripts/tela/pincel.mjs`); no site a faixa é azul-escuro, aqui é clara porque o Substack é claro.

Depois de gerar, suba a 1456×816 como imagem de capa do post (e, se quiser, a 1200×630 em "social preview").
O espelho da edição no site (`/newsletter/<id>`) usa a imagem do frontmatter `image`; aponte para a mesma capa.

## Como a identidade sobrevive ao e-mail

- **Imagem carrega a assinatura.** Clientes de e-mail ignoram fontes web e muitas vezes CSS; a capa do post e o
  logo chegam como imagem, com a tela e o fio laranja intactos.
- **Cor de destaque faz o resto.** Links e botões do Substack saem em `#C2410C`: é o laranja que o site usa como
  texto sobre papel, então o e-mail e a coluna de leitura do site têm o mesmo tom.
- **Modo escuro do cliente de e-mail.** Alguns clientes invertem cores. A capa já é metade azul-escuro e a faixa
  clara tem contraste alto (azul-escuro 16:1), então continua legível invertida; o wordmark-noite cobre os
  cabeçalhos escuros.
- **Sem texto em imagem além do título.** O resto do e-mail é texto real, para leitor de tela e para quem bloqueia
  imagens.

## Proveniência dos rasters

Todos os PNG deste diretório são gerados por código, sem fotos nem IA de imagem:

- `logo-512.png`, `wordmark*.png`: `node docs/substack-kit/gerar-marca.mjs` — contornos da Literata SemiBold
  (`@fontsource/literata`, licença OFL) extraídos com `opentype.js`, rasterizados com `sharp`.
- `capa-publicacao.png`: mesmo script — tela de `scripts/tela/pincel.mjs` (semente "Radar de IA", versão do
  gerador em `VERSAO`) + texto Literata/Hanken Grotesk (`@fontsource`, OFL) via `sharp`/Pango.
- `exemplos/*.png`: `gerar-capa.mjs` com os títulos reais de `src/content/newsletter/radar-semanal-01.md` e
  `src/content/insights/agent-skills-pacotes-de-contexto.md`.

Regerar tudo: `node docs/substack-kit/gerar-marca.mjs` e os dois comandos de capa acima. O resultado é
determinístico enquanto `VERSAO` em `scripts/tela/pincel.mjs` não mudar.
