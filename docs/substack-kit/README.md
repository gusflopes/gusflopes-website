# Kit Substack: sistema "Evolução"

A newsletter no Substack (`gusflopes.substack.com`) é o segundo canal da mesma identidade do site: azul-escuro e laranja, com o quadro (cidade noturna em pinceladas) como imagem da marca. O Substack só deixa personalizar algumas coisas: cor de destaque, cor de fundo, logo, wordmark, capa e fontes de uma lista fixa. O que está abaixo cabe nesse limite.

## O que configurar (Settings → Branding / Theme)

| Campo no Substack | Valor | Por quê |
|---|---|---|
| Cor de destaque (accent) | `#F97316` | O laranja oficial. Botões e links do Substack usam essa cor; o texto do botão o Substack escolhe sozinho. |
| Cor de destaque, alternativa | `#C2410C` | Use esta se o Substack puser texto branco no botão laranja, ou se os links ficarem claros demais no fundo claro. `#C2410C` dá contraste AA (cerca de 5:1) sobre papel; `#F97316` com texto branco não passa. |
| Cor de fundo | `#F2F4F7` (papel frio) | É o fundo dos artigos do site. Se o campo só aceitar branco ou uma lista de opções, use branco. Nunca creme. |
| Fonte de títulos | A serifada mais próxima da Literata que a lista oferecer | Ver "Fontes" abaixo. |
| Fonte do texto | A mesma serifada, ou a sans padrão do Substack | O site lê em Literata; o e-mail cai para a fonte do sistema de qualquer jeito. |

### Fontes

O site usa **Literata** (títulos e leitura) e **Hanken Grotesk** (interface). **Não consegui confirmar a lista atual de fontes do Substack** (não havia acesso à web neste trabalho). A lista muda de tempos em tempos. Na ordem de preferência:

1. **Literata**, se aparecer na lista.
2. **Spectral** ou **Source Serif**: serifadas de texto com o mesmo desenho robusto e contraste moderado.
3. Se nenhuma das duas existir: a serifada de texto mais sóbria da lista (evite as de exibição, muito finas ou muito ornamentadas). Na sans, se houver escolha, prefira uma grotesca neutra à geométrica.

Confira no editor com um título real antes de salvar: o título tem que parecer o do site, firme, sem floreio.

## Arquivos

| Arquivo | Onde usar |
|---|---|
| `logo.svg`, `logo-512.png` | **Publication logo** (quadrado, 512×512). O monograma "G" com o quadrado e o ponto laranja, sobre azul-escuro. |
| `wordmark.svg`, `wordmark.png` | **Wordmark** no cabeçalho do Substack sobre fundo claro (tinta azul-escuro, ponto laranja, fundo transparente). |
| `wordmark-noite.svg`, `wordmark-noite.png` | Wordmark sobre azul-escuro: para fundo escuro, redes sociais e assinatura de e-mail. |
| `capa-publicacao.png` | **Cover image** da publicação (1600×900): painel azul com "Newsletter" e a tagline, quadro à direita. |
| `exemplos/*.png` | Duas capas de post geradas com títulos reais do site, nos dois tamanhos. |

### Capa de cada post

```bash
node docs/substack-kit/gerar-capa.mjs "Título do post" engenharia   # ou negocios | bastidores
# opcional: terceira posição = pasta de saída (padrão: docs/substack-kit/exemplos)
```

Gera `<slug>-1456x816.png` (a capa de post do Substack, 16:9) e `<slug>-1200x630.png` (prévia social). O título entra em Literata 600 branco sobre azul-escuro, com até quatro linhas; o corpo diminui sozinho se o título for longo. O eixo entra em laranja acima do título. À direita fica um recorte do quadro, um por eixo e sempre o mesmo para o mesmo eixo: a torre alta e a lua para Engenharia & IA, o casario do centro para Negócios, as torres da esquerda para Bastidores. Assim o leitor reconhece o eixo pela pintura antes de ler.

Para refazer os arquivos fixos: `node docs/substack-kit/gerar-kit.mjs`.

## Como a identidade sobrevive ao e-mail

- **Cor:** o laranja de destaque e o fundo claro vêm das configurações e aparecem em qualquer cliente de e-mail. O azul-escuro chega pelas imagens (logo, wordmark, capas), que nenhum cliente reescreve.
- **Tipografia:** clientes de e-mail ignoram fontes web e caem para Georgia ou para a fonte do sistema. Por isso o título de cada edição também está desenhado na capa do post, em Literata, como imagem. A voz tipográfica chega mesmo onde a fonte não chega.
- **O quadro:** entra só nas capas e na capa da publicação, nunca atrás do texto do e-mail.
- **Modo escuro dos clientes (Gmail, Apple Mail):** o logo tem fundo azul-escuro próprio, então não some. Para o cabeçalho, prefira `wordmark.png` (tinta azul). Se algum cliente inverter as cores e o wordmark sumir, troque pelo `wordmark-noite.png`.

## Proveniência dos rasters

Todos os PNG desta pasta são gerados por script, sem IA de imagem e sem banco de imagens:

- `logo-512.png`, `wordmark.png`, `wordmark-noite.png`: rasterizados com `sharp` a partir dos SVGs gerados por `gerar-kit.mjs`. As letras são contornos tirados das fontes do site (`@fontsource-variable/hanken-grotesk`, peso 800; OFL), lidos com `fontkitten` depois de descompactar o WOFF2 com `wawoff2`.
- `capa-publicacao.png` e `exemplos/*.png`: `gerar-kit.mjs` e `gerar-capa.mjs`. O título está em `@fontsource-variable/literata` (opsz 72, peso 600; OFL). O recorte vem do quadro do hero, `src/assets/326189a758fea0fe0e2da42349b6da943b29ba51.png`, a arte que o site já usa.
- Os exemplos usam os títulos de `src/content/insights/agent-skills-pacotes-de-contexto.md` (Engenharia & IA) e `src/content/insights/servidor-mcp-calculadora-oficial-receita-rt2026.md` (Bastidores).

**A aprovar:** o monograma e o wordmark são um redesenho em vetor, não um traçado do logo PNG atual (`src/assets/cfa6876664….png`). O monograma mantém a construção do logo: o "G" com o quadrado laranja em cima e o ponto laranja embaixo. O wordmark é "gusflopes.dev" em Hanken Grotesk 800, com o ponto em laranja. O site continua usando o PNG original no header e no rodapé até o Gustavo decidir se o vetor substitui o logo.
