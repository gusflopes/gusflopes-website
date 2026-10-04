# Pacote de revisão: rodada 4, cor como sistema (comum às 3 direções)

Responda em português.

## Contexto que continua valendo
- Fixo:
  - paleta oficial azul-escuro + laranja;
  - o quadro do hero e o Van Gogh como inspiração;
  - copy protegida;
  - tagline "Tecnologia e negócio, partes do mesmo sistema".
- Build code-led, sem comp aprovado, sem state e sem diffs. A direção foi fixada pelo dono, sem sorteio. Nada disso conta como finding.
- Maquete de cada direção (só como provocação): `/tmp/claude-0/-home-user-gusflopes-website/3585d3d5-9874-53ce-a9d0-733568287c59/scratchpad/direcoes/index.html`
- Craft floor: `/home/user/gusflopes-website/.claude/skills/impeccable/reference/craft-floor.md`
- **PRODUCT.md atualizado (leia a seção "Papéis das cores"):** `/home/user/gusflopes-website/PRODUCT.md`
- **Capturas da v4**, feitas pelo builder com rolagem lenta e todas as imagens carregadas: `/home/user/gusflopes-website/.worktrees/<direcao>/docs/design-review/` (`*-desktop.png`, `*-mobile.png`, `*-full.png`; na pincelada, as de página inteira terminam em `-full.png`). As capturas da v3 ficam em `.../scratchpad/eval/shots3/<direcao>/`.
  - nomes: `{home,insights,engenharia,artigo,radar,newsletter,edicao}-{desktop,mobile}.png` e `-full.png`;
  - o site atual, antes do redesign, está em `.../shots3/base/`;
  - as rodadas anteriores estão em `.../shots/` (v1) e `.../shots2/` (v2);
  - imagens externas (Unsplash) foram bloqueadas: vazio no lugar delas é esperado.

## Lente principal: a avaliação do dono depois da v3, nas palavras dele
1. "A pincelada está muito azul. A cor de destaque é o laranja; o azul é fundo para dar estrutura, mas tons claros equilibram."
2. "O que funciona da imagem original é a variedade de cores, e não o monocromático."
3. "As versões estão perdendo a identidade e o contraste, está ficando um azulão só, sem graça."
4. "A evolução do original funciona no hero porque ele tem mais cores; daí depois é um blocão azul atrás do outro, perde toda a inspiração artística do hero."
5. "Não sei se essa nossa versão evoluiu, porque o principal que está ruim não mudou nada."
6. "O rodapé é um exemplo gritante: sem transição de clara, ele parece um bloco gigantesco; ele teria que vir de uma transição de algo claro."
7. "O laranja sumiu do site, e ele é a cor principal. Por ser forte, precisa ser usado em detalhes, e isso era o que as bordas e os cards faziam. Não que precise de bordas e cards, mas a cor sim."

## Medição objetiva do orquestrador (home-desktop-full)
Classificação de pixels:
- escuro-azul: valor < 32% com matiz azul ou baixa saturação;
- claro: valor > 85% e saturação < 15%;
- laranja: matiz 12–42°, saturação > 55% e valor > 55%;
- outras cores: o resto com saturação > 20%.

"Janelas c/ laranja" é a fração dos trechos de 900px de altura (com sobreposição) que têm pelo menos 0,2% de pixels laranja.

| variante | escuro-azul | claro | laranja | outras cores | janelas c/ laranja | janelas c/ claro | maior trecho escuro contínuo |
|---|---|---|---|---|---|---|---|
| site atual | 90,0% | 0,3% | 1,2% | 5,2% | 95% | 0% | 278px |
| evolução v3 | 73,0% | 18,6% | 1,0% | 4,8% | 62% | 29% | 344px |
| concretismo v3 | 41,4% | 48,5% | 3,8% | 3,6% | 63% | 83% | 112px |
| pincelada v3 | 77,1% | 12,1% | 0,9% | 7,1% | 62% | 19% | 562px |

Nos hubs da Pincelada (insights-full), o resultado é 90% escuro e 0% claro.

Quadro original, amostrado por agrupamento de cores: `#223040`, `#457183`, `#2f4554`, `#648188`, `#1c1f27`, `#5e5c56`, `#315b6f`, `#50372a`, `#aa9c87`, `#7f989a`, `#907a5f`, `#8a4c1b`. Ou seja: azul-petróleo, ardósia, areia, ferrugem e marrom quente, não só azul.

## Rodada 4: o que foi pedido aos builders (brief em `/tmp/claude-0/-home-user-gusflopes-website/3585d3d5-9874-53ce-a9d0-733568287c59/scratchpad/brief-rodada4.md`)
Metas:
- laranja ≥ 0,5% em ≥ 90% das janelas de 900px, com total entre 1,5% e 3%;
- home com claro em ≥ 60% das janelas e escuro ≤ 55%, sem campo escuro > ~1.000px;
- rodapé chegando de claro, com um gesto, em todo modelo;
- ≥ 3 cores do quadro com função abaixo do hero;
- texto sobre laranja nunca preto: `#F97316`/claros levam azul-escuro `#0B1A33`, `#C2410C` leva branco (pontual).

Medição do orquestrador da v4 (script `/tmp/claude-0/-home-user-gusflopes-website/3585d3d5-9874-53ce-a9d0-733568287c59/scratchpad/r4/medir-cor.cjs`, home-desktop-full):

| | escuro | claro | laranja | janelas laranja ≥ 0,5% | janelas claro | janelas cor do quadro | maior escuro |
|---|---|---|---|---|---|---|---|
| evolução v4 | 31,5% | 55,4% | 1,6% | 100% | 90% | 80% | 224px |
| concretismo v4 | 32,1% | 47,5% | 4,4% | 100% | 92% | 92% | 143px |
| pincelada v4 | 35,6% | 39,9% | 1,6% | 100% | 69% | 100% | 233px |

Na v3 a home dava: evolução 76% escuro / 57% janelas com laranja; concretismo 43% / 55%; pincelada 69% / 67%. As métricas não substituem o olho: julgue se a cor virou **sistema** com papel claro ou só **cumprimento de meta** (ex.: um campo chapado sem conteúdo só para pontuar, laranja distribuído como confete).

## O que fazer
Faça a revisão completa no formato do seu contrato, mas organize o julgamento pela lente acima:
- cor como sistema: papel do laranja, papel do azul, papel dos claros e variedade vinda do quadro;
- transições entre campos (em especial o rodapé);
- se a inspiração artística do hero sobrevive no resto da página.

Responda também, explicitamente:
- "o principal que está ruim (as 7 observações do dono) mudou da v3 para a v4?" Compare com shots3.
- "o que falta para esta direção estar pronta para o dono escolher?" No máximo 5 itens, do mais importante para o menos.
