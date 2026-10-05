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
- Papéis das cores (Gustavo, 04/10, depois da rodada 3 do redesign):
  - **Laranja é a cor principal da marca**, mas, por ser forte, vive em **detalhes** distribuídos pela página inteira
    (bordas, marcas, fios, números, estados, ações). Antes, as bordas e os cards cumpriam esse papel; eles não são
    obrigatórios, mas a presença do laranja ao longo da página é. Uma página em que o laranja só aparece no botão
    perdeu a marca.
  - **Azul-escuro é estrutura e fundo**, não protagonista. Blocos azuis em sequência ("um azulão só") apagam a
    identidade e o contraste.
  - **Tons claros equilibram** e são obrigatórios no ritmo. Uma seção escura grande (o rodapé, por exemplo) precisa
    chegar por transição de algo claro, nunca empilhada sobre outro bloco escuro.
  - **O que funciona no quadro é a variedade de cores, não o monocromático.** Além do azul, ele tem azul-petróleo,
    cinza-ardósia, areia, ferrugem e marrom quente (amostra por agrupamento: `#457183`, `#648188`, `#2f4554`,
    `#aa9c87`, `#907a5f`, `#8a4c1b`, `#50372a`, sobre `#223040`/`#1c1f27`). O hero da versão atual funciona porque
    tem mais cores; uma direção que só herda o azul do quadro perde a inspiração artística.
  - **Paleta de apoio aprovada (04/10):** as cores do quadro (petróleo `#457183`/`#315b6f`, ardósia `#648188`/`#7f989a`,
    areia `#aa9c87`, marrom `#907a5f`/`#50372a`, ferrugem `#8a4c1b`) entram como cores de apoio em campos e detalhes.
    Azul-escuro e laranja continuam as oficiais. A areia `#aa9c87` é cor de apoio (filete, metadado sobre noite),
    não fundo de leitura.
  - **Claros quentes da Shelfye.ai** (Gustavo, 04/10, depois da rodada 4): o papel frio `#F2F4F7` e a areia acinzentada
    `#D9D4CB`/`#D8D1C4` saem. Os claros passam a ser os da Shelfye (também marca do Gustavo, tokens de
    `shelfye-ai/landing-page` e `webapp`):
    - **papel `#FFF8F2`** ("pergaminho"): fundo claro padrão, de leitura;
    - **creme `#FDEED9`**: campo quente para seções de destaque, caixas e o claro que antecede um bloco escuro;
    - **tons de papel `#F9F2EC` / `#EEE7E1`**: aninhar cartões e células sem fio (mudança de tom, não borda).
    O que se herda da Shelfye é só o claro. O laranja continua `#F97316` (não o `#FE8C00` dela, nem terracota), o
    azul-escuro continua `#0B1A33`, e a tipografia e os traços "rubber-hose" dela não entram.
    Contraste de texto sobre os claros (medido em 04/10):
    - azul-escuro `#0B1A33`: 14,2–16,5:1 em todos;
    - link/destaque laranja escuro: `#C2410C` só em papel e creme (4,9 e 4,5:1); em `#EEE7E1` use `#9A3412` (6,0:1);
    - petróleo como texto: `#315b6f` (6,0–7,0:1); `#457183` só em papel (5,1:1) ou em tamanho grande;
    - ardósia `#648188`/`#7f989a`, marrom `#907a5f` e laranja `#F97316` sobre claro **não** levam texto (abaixo de
      4:1): ficam em filetes, marcas, campos e ilustração;
    - texto secundário: `#475569` (6,2–7,2:1); `#64748b` não serve em creme nem em `#EEE7E1`.
  - **Texto sobre laranja nunca é preto** (Gustavo, 04/10). A cor do texto depende do laranja:
    - laranja da marca e laranjas claros (`#F97316`, `#FB923C`, `#FDBA74`) → texto **azul-escuro `#0B1A33`**
      (6,19:1 sobre `#F97316`). É o padrão para botões e blocos.
    - laranja escuro (`#C2410C`, `#9A3412`) → texto **branco** (5,18:1 sobre `#C2410C`). Uso pontual: hover/pressionado
      do botão ou bloco sobre fundo claro onde o `#F97316` fique estridente. Não vira um segundo laranja oficial.
    - Nunca `#C2410C` com texto azul-escuro (3,35:1), nunca `#F97316` com texto branco (2,8:1).

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
