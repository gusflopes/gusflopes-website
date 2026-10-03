# Product

<!-- impeccable:product-schema 1 -->

> Rascunho de 03/10/2026, inferido do repositório (CLAUDE.md, `src/config/site.ts`, `docs/revisao-site-2026-09.md`,
> `docs/CONTINUAR.md`). Aguarda confirmação do Gustavo; nada aqui é copy nova.

## Platform

web

## Users

- **Profissional técnico** (dev, tech lead, arquiteto) que acompanha IA aplicada, agentes e arquitetura e quer leitura
  sem hype para decidir o que testar. Chega por LinkedIn, Bluesky, X e busca; lê no celular e no desktop.
- **Empresário e dono de escritório** (contabilidade, advocacia, PME) que quer entender onde a IA ajuda no negócio e
  onde inventa. Não se reconhece em jargão de engenharia.
- **Assinante da newsletter Radar de IA** (Substack): lê no e-mail e no app do Substack, toda semana.

## Product Purpose

Marca pessoal de Gustavo Lopes: publicar textos autorais em três eixos (Engenharia & IA, Negócios, Bastidores), guardar o
arquivo da newsletter Radar de IA, converter leitores em assinantes e abrir conversa de consultoria/mentoria.
Sucesso: leitura até o fim, assinatura da newsletter, contato qualificado.

## Positioning

"Ponte entre Negócios e Tecnologia": advogado, contador e engenheiro de software na mesma pessoa — aplica Direito e
Contabilidade para resolver problemas de negócio com tecnologia e IA. Tese da marca: tecnologia e negócio são partes do
mesmo sistema.

## Operating Context

- Site Astro 6 estático com ilhas React, deploy manual em Cloudflare Workers Static Assets.
- Newsletter no Substack (`gusflopes.substack.com`); o site espelha as edições em `/newsletter`.
- Substack só aceita personalização limitada: cor de destaque, cor de fundo, logo/wordmark, imagem de capa, fontes de
  uma lista fixa. A identidade precisa sobreviver a esse funil.
- Projeto irmão: Simulador da Reforma Tributária (landing própria), promovido como case.

## Capabilities and Constraints

- Conteúdo em Content Collections; datas ISO, eixo editorial fonte única em `src/lib/eixos.ts`.
- Copy, naming e posicionamento são zona protegida: mudança de texto visível exige aval explícito.
- Valores de `src/config/site.ts` (handles, e-mail, newsletter) não podem ser inventados.
- Performance: hero já otimizado (AVIF/WebP); fontes self-hosted.

## Brand Commitments

- Nome: Gustavo Lopes / gusflopes.dev. Tagline: "Tecnologia e negócio, partes do mesmo sistema" (03/10: "Engenharia" saiu porque, sem "de software", puxa para engenharia civil/mecânica e não diz nada a quem não é da área; o eixo "Engenharia & IA" segue com esse nome).
- Voz: direta, sem juridiquês, sem hype; Engenharia e Negócios informativos, Bastidores pessoal.
- Cores oficiais (confirmado em 03/10): azul-escuro com laranja (atual `#F97316`). Qualquer direção visual varia mundo,
  estrutura e tipografia, não a paleta.
- Referência artística: o quadro do hero (cidade noturna em pinceladas, `src/assets/326189…png`) e Van Gogh são
  inspiração da marca.

## Evidence on Hand

- ~40 artigos publicados em `src/content/insights` e `src/content/radar`; edição #1 da newsletter.
- Foto do autor (avatar público do Bluesky); logo em `src/assets`.
- Case real: servidor MCP rt2026 e simulador da reforma.
- Não há depoimentos, clientes nomeados nem números de audiência: não inventar.

## Product Principles

1. O texto é o produto: leitura confortável vence efeito.
2. Falar com dois públicos sem diluir: o técnico e o empresário reconhecem-se na mesma página.
3. Uma identidade, dois canais: o que o site é precisa caber no Substack.
4. Sem hype, sem vitrine: provas reais ou nada.
