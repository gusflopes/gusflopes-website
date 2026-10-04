# Rodada 4: cor como sistema (comum às 3 branches)

As regras dos briefs anteriores continuam valendo. Leia:
- `/tmp/claude-0/-home-user-gusflopes-website/3585d3d5-9874-53ce-a9d0-733568287c59/scratchpad/brief-comum.md`
- `.../brief-rodada2.md`
- `.../brief-rodada3.md`

Copy protegida, sem deploy, sem PR, sem tag (o orquestrador cuida). Commits com coautoria e push da branch no fim. Não toque nas outras worktrees.

## Por que esta rodada existe
O dono avaliou a v3 e os revisores independentes confirmaram, com medição: **o principal não mudou da v2 para a v3**. As rodadas 2 e 3 trataram composição, e ninguém tratou a cor como sistema. Palavras do dono:

1. "A pincelada está muito azul. A cor de destaque é o laranja; o azul é fundo para dar estrutura, mas tons claros equilibram."
2. "O que funciona da imagem original é a variedade de cores, e não o monocromático."
3. "Está ficando um azulão só, sem graça."
4. "O hero funciona porque tem mais cores; daí depois é um blocão azul atrás do outro, e perde toda a inspiração artística do hero."
5. "O principal que está ruim não mudou nada."
6. "O rodapé, sem transição de clara, parece um bloco gigantesco; teria que vir de uma transição de algo claro."
7. "O laranja sumiu do site, e ele é a cor principal. Por ser forte, precisa ser usado em detalhes; era isso que as bordas e os cards faziam. Não precisa de bordas e cards, mas precisa da cor."

**Leia `/home/user/gusflopes-website/PRODUCT.md`, seção "Papéis das cores", que agora inclui a paleta de apoio aprovada em 04/10.** Se ainda não estiver no repositório, traga-a de `design/base`:
```
git fetch origin design/base && git checkout origin/design/base -- PRODUCT.md
```
Faça isso num commit próprio.

Resumo da seção:
- laranja é a cor principal e vive em **detalhes distribuídos pela página inteira**;
- azul-escuro é estrutura e fundo, não protagonista;
- claros são obrigatórios no ritmo;
- seção escura grande chega por transição de algo claro;
- a variedade do quadro é a inspiração.

**Paleta de apoio aprovada:**
- petróleo `#457183`/`#315b6f`;
- ardósia `#648188`/`#7f989a`;
- areia `#aa9c87`;
- marrom `#907a5f`/`#50372a`;
- ferrugem `#8a4c1b`;
- um campo claro quente (areia acinzentada puxada do quadro, **nunca creme**) pode substituir o papel frio em poucas seções.

## Primeiro passo, antes de qualquer código
O contrato da sua direção (`.impeccable/surfaces/...`) e o `DESIGN.md` ainda codificam o monocromático: OWN-WORLD só com azul, céu e papel, e a regra "laranja = só ação". Enquanto isso estiver escrito, o build obedece. **Reescreva o OWN-WORLD e a regra de cor** com os papéis do PRODUCT.md. Use dois registros de laranja:
- (a) chapado = ação;
- (b) detalhe não textual = presença: filete de 2px, marca, número, data, estado ativo.

No fundo claro, o laranja `#F97316` não pode ser texto (contraste ~2,5:1). Lá ele entra como filete ou marca; o texto laranja sobre claro é `#C2410C`, e só para links. Commit próprio.

## Metas medíveis (todas)
Meça com o script do orquestrador sobre as suas capturas de página inteira (desktop 1366):
```
node /tmp/claude-0/-home-user-gusflopes-website/3585d3d5-9874-53ce-a9d0-733568287c59/scratchpad/r4/medir-cor.cjs docs/design-review/home-desktop-full.png
```
Também aceita `--recorte x,y,w,h`.

Para comparar, o site atual (antes do redesign) dá na home:
- laranja ≥ 0,5% em 100% das janelas;
- escuro 92%;
- claro 1%.

As metas são estas:
1. **Laranja:** presente com ≥ 0,5% em **≥ 90% das janelas de 900px** na home e nos hubs. Total entre 1,5% e 3% dos pixels (é detalhe, não campo). Pelo menos um detalhe laranja estrutural por seção.
2. **Claros:** na home, claro em ≥ 60% das janelas e escuro ≤ 55% dos pixels. Nenhum campo escuro com mais de ~1.000px de altura sem passar por um campo claro de ≥ 150px. Use o "maior trecho escuro contínuo" do script como apoio; a meta é ≤ 600px. Nos hubs, o índice de leitura fica sobre fundo claro, como a coluna do artigo.
3. **Rodapé:** em todo modelo de página (home, hubs, Radar, Newsletter, edição, artigo, 404), os ~400px imediatamente acima do rodapé são ≥ 50% claros. A passagem para o escuro é um gesto, não um corte seco.
4. **Cores do quadro:** pelo menos 3 cores da paleta de apoio com função abaixo do hero (campo chapado, casa, célula, metadado, filete). Meta: janelas com cor do quadro ≥ 3% em ≥ 50% das janelas abaixo do hero. Atenção: a ferrugem nunca encosta em texto `#C2410C` nem no laranja chapado. Deixe pelo menos uma célula de separação.
5. **Não regredir:** acessibilidade (axe, zero falhas sérias), contraste AA de todo texto (confira petróleo, ardósia e areia com o texto que vai sobre eles), LCP e peso das imagens.

## Verificação
- `pnpm build`.
- Capturas de página inteira **válidas**:
  - role lento (400px a cada 150ms);
  - espere `naturalWidth > 0` em todas as imagens locais;
  - **não bloqueie a rede na captura**: o bloqueio quebrou capturas antes;
  - confira que nenhuma imagem local saiu como retângulo liso.
- Rotas: `/`, `/insights/`, `/engenharia/`, `/insights/article/agent-skills-pacotes-de-contexto/`, `/radar/`, `/newsletter/`, `/newsletter/radar-semanal-01/`, `/nao-existe/`, em desktop 1366×900 e mobile 390×844, viewport + página inteira, em `docs/design-review/`. Copie para `.impeccable/review/`.
- Rode o `medir-cor.cjs` na home, no insights e no artigo (desktop e mobile) e cole a saída no relatório.
- Faça no máximo 2 rounds de inspeção e correção.
- Atualize `DESIGN.md`, `.impeccable/design.json` e o surface brief.

## Relatório final (curto)
- A saída do medidor de cor antes e depois (home, insights, artigo).
- O papel de cada cor por seção.
- Como o rodapé chega em cada modelo.
- O que mudou no contrato.
- Falhas do axe.
- Hash do último commit pushado.
- Pendências.
