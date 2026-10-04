---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/components/pages/HomePage.tsx"]
---

# Home — gusflopes.dev

Escopo: `/` (HomePage e seções). Modo: **Persuade**. Visitante: técnico ou empresário vindo das redes; ação: assinar a newsletter (Substack) ou entrar por um eixo. Prova real: textos publicados, simulador da Reforma, trajetória Direito + Contabilidade + software. Nada inventado; copy intocada.

Direção fixada pelo dono: **3. Concretismo** (maquete `data-k="6"` da página de direções).

## Direction contract

THESIS: a tese da marca é montada como construção tipográfica — "Tecnologia e negócio, partes do mesmo sistema" empilhada em blocos de tipo sobre azul-escuro. Recusa o hero de foto com degradê, título centrado e cards com brilho.

OWN-WORLD (reescrito na rodada 4, papéis do PRODUCT.md de 04/10): o mundo é o do quadro, não o monocromático. **Papel quente `#FFF8F2` é o campo dominante** (onde se lê e onde a página respira; claro da Shelfye desde a rodada 5, com o creme `#FDEED9` de destaque); **azul-escuro `#0B1A33` é estrutura** — moldura, cabeçalho, tese, rodapé, filetes e vãos da grade —, nunca um bloco atrás do outro; toda seção escura grande chega de um campo claro. **Laranja `#F97316` é a cor principal e vive em dois registros:** (a) **chapado = ação** — uma célula inteira por região (newsletter, diagnóstico, simulador, filtro ativo), texto e ícone em azul-escuro `#0B1A33` sobre ela (6,19:1); (b) **presença = detalhe não textual** — filete de 2px no topo de linha e de oferta, marca quadrada sólida (data, "Mais recente", tema), quadrado do play, barra do item ativo —, pelo menos uma vez a cada 900px de página. No papel o laranja nunca é texto (2,5:1); texto laranja sobre papel é `#C2410C` e só em link/ação. **As cores do quadro** (petróleo `#457183`/`#315b6f`, ardósia `#648188`/`#7f989a`, areia `#aa9c87`, marrom `#907a5f`/`#50372a`, ferrugem `#8a4c1b`) entram só como **campo chapado de bordas retas, no máximo um campo por seção**, com função (plano da pergunta, célula de metadados, célula de link, contrapeso da composição); ferrugem nunca encosta em laranja nem em texto `#C2410C` (uma célula de separação, no mínimo). Cor no campo e cor no filete são nativas de Wollner/Ulm; cor decorando card, borda laranja em volta de célula, textura e degradê não existem aqui. Archivo variável (900/100 display, 600/75 rótulos) + Source Serif 4 para leitura. Grade rígida de filetes de 1–2px, cantos retos, zero sombra, zero vidro. Par 900/100: a linha marcada de cada abertura no peso 100 sólido; contorno vazado só no MESMO da tese e no Simulador. Caixa-alta 900 uma vez por seção; nomes dentro da seção em estreita 780 caixa mista. O quadro em si só aparece recortado pela janela girada do hero.

STORY: o visitante lê a tese como poema concreto, entende que é uma pessoa que junta negócio e engenharia, escolhe a porta (Engenharia & IA / Negócios / Bastidores) e assina.

FIRST VIEWPORT: tese em 5 linhas ajustadas à largura, entrelinha .86 (TECNOLOGIA / e negócio, em laranja menor / PARTES DO / MESMO vazado / SISTEMA) ocupando ~3/4 da largura; a janela laranja girada 12° com o quadro (única da página) no celular tem ~42% da largura da tela, começa abaixo de PARTES DO (sem cobrir o DO), no vão à direita de MESMO/SISTEMA, e sangra na borda direita; no desktop encosta no bloco e sangra na borda direita. Abaixo, faixa de grade: metadados | frase e apoio | plano laranja da newsletter, encostado nos eixos.

FORM: sistema tipográfico concreto (poesia concreta Noigandres + escola de Ulm/Wollner); 1º e único da lista — direção escolhida pelo dono; seed key: n/a (decisão fixada, sem sorteio).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Momento memorável
A janela laranja girada mostrando um pedaço do quadro; o quadro desliza dentro dela com o scroll (scroll-driven, desligado em reduced-motion).

## Rodada 2 — o resto da página (trabalho → composição)

Mandato do dono: "mudou o hero, mas o resto continua ruim". A grade rígida passa a ser o motor da página inteira.

Ordem nova e porquê: tese → eixos → ferramenta → ideias e vídeo → temas → serviços → rodapé. Depois de escolher a porta, o visitante pode experimentar algo agora (ferramenta) e ver o que saiu (ideias); só então vem quem escreve (temas) e o que contratar (serviços), que fecham a página como oferta logo antes da newsletter do rodapé. Isso também deixa os campos em dois blocos: azul (tese, eixos, ferramenta) → papel (ideias, temas, serviços) → azul (rodapé). Duas trocas.

- **Tese** — entender a proposta. Bloco a .86; faixa de grade com metadados ao lado da frase; a newsletter é um plano laranja de célula.
- **Eixos** — escolher por onde entrar. Plano alto (a pergunta, abertura estreita; era laranja na rodada 2, virou petróleo na rodada 4) encostado em três linhas de papel; o nome de cada eixo ocupa a célula na forma do próprio eixo (bloco, escada, degraus); "Mais recente" em célula ao lado do título do texto.
- **Ferramenta** — experimentar algo agora. Grade de filetes azul-3; abertura em degraus + célula de metadados "Ferramenta gratuita · Experimento aberto"; a ação é a própria célula laranja; texto e nota de cautela em células vizinhas.
- **Ideias recentes + vídeo** — ver o que saiu e abrir um texto. Título estreito ocupando a largura toda; linhas de tabela iguais às dos hubs (data em numeral | título | categoria ao lado | ação); vídeo como linha de duas células: título à esquerda, célula azul inteira como link com o quadrado laranja do play.
- **Temas** — entender quem escreve e em que áreas atua. Abertura em bloco + trajetória; os cinco temas numa partição 3 + 2 desenhada pelo fundo azul nos vãos; cada nome é um bloco justificado na célula, "&" em laranja (a ponte).
- **Serviços** — entender o que contratar. Abertura em escada (forma do eixo Negócios) à direita; as três ofertas descem em degraus a partir dela. É o único lugar com três colunas, e mesmo assim desencontradas.
- **Rodapé** — células com filetes azul-3; newsletter como plano laranja (na rodada 5 vira célula de creme com filete laranja e só o botão chapado).

Regra de laranja (substituída na rodada 4, ver OWN-WORLD e "Rodada 4"): chapado numa célula inteira = a ação principal da região, ou a ordem real (texto mais recente nos hubs). Regra de número: só data, número de edição ou ordem real; nada de 01/02/03 decorativo.

Corte proposto na rodada 2 e aplicado na rodada 3 (aval do dono): ver abaixo.

## Rodada 3 — volume

Mandato do dono: "o hero prende a atenção, depois cada uma das camadas conquista". A grade fica; o conserto é volume. Cada camada continua com gesto próprio, mas nenhuma grita tão alto quanto as vizinhas.

Ordem final: tese → eixos (com os textos recentes) → ferramenta → vídeo → temas → serviços → rodapé. Campos: azul (tese, eixos, ferramenta) → papel (vídeo, temas, serviços) → azul (rodapé). Duas trocas.

- **Volume:** caixa-alta 900 só na abertura de cada seção. Nomes de eixos, temas e serviços, "Vídeo em Destaque" e "Fazer o diagnóstico" em Archivo estreita 780 caixa mista (as strings já são caixa mista na fonte; só CSS).
- **Par 900/100:** a linha marcada de toda abertura (última no bloco, primeira na escada, a do meio nos degraus) é o mesmo desenho no peso 100, sólida, medida com as larguras do peso 100. Contorno vazado só em MESMO e no Simulador.
- **Eixos** — escolher por onde entrar e ver o que saiu em cada porta. "Ideias recentes" fundida aqui: cada porta mostra os dois textos mais recentes como linhas de tabela dos hubs (dia em numeral leve, "Mês, ano", "Mais recente" no primeiro); os dois insights mais recentes do site sempre entram. O plano da pergunta saiu do laranja (não é ação) para azul-2, com a pergunta em papel.
- **Vídeo** — assistir a uma coisa só. A camada de volume baixo, de propósito: abre o papel depois do Simulador (a camada mais alta) com o título em caixa mista, sem bloco de tipo, para os temas voltarem a pesar. Gesto: o quadrado laranja do play girado 12°, o mesmo ângulo da janela (único eco do giro fora do hero); endireita no hover.
- **Temas no celular:** só filete de topo em cada tema, sem caixas fechadas.
- **Hero:** metadados sem "·" pendurado (cada item sem quebra; o separador vai com o item seguinte); janela do celular maior, como no FIRST VIEWPORT acima.

Teste do dono, camada a camada: tese (bloco + janela, conquista), eixos (plano azul alto + três linhas de papel com tabela datada, conquista), ferramenta (degraus vazados + célula laranja de ação, conquista — é a mais alta), vídeo (calma deliberada: duas células e o play girado; conquista pelo contraste, não pelo volume), temas (bloco 900/100 + partição 3+2, conquista), serviços (escada à direita + ofertas em degraus, conquista).

## Rodada 4 — cor como sistema

Mandato do dono: "a pincelada está muito azul; a cor de destaque é o laranja"; "o que funciona da imagem original é a variedade de cores"; "o laranja sumiu do site, e ele é a cor principal". Revisor da v3: azul já é estrutura (41% escuro), papel em 83% das janelas, rodapé chega do papel; falta laranja no meio da página (razão 52:1 entre a janela mais e a menos laranja) e variedade do quadro depois do hero.

Contrato de cor (vale para toda a direção):
1. **Laranja, registro (a) chapado = ação.** Uma célula laranja inteira por região, texto e ícone `#0B1A33`. Fundo laranja com texto é sempre `#F97316` (azul sobre `#C2410C` cai para 3,35:1).
2. **Laranja, registro (b) presença.** `#F97316` não textual — filete de 2px no topo de cada linha de lista e de cada lista dos eixos, marca quadrada sólida na célula de data e no "Mais recente", marca no canto de cada tema, segmento laranja no filete de cada oferta, quadrado do play — pelo menos uma vez em toda janela de 900px. Meta: ≥ 0,5% de laranja em ≥ 90% das janelas da home e dos hubs, total 1,5–3%, razão entre a janela mais e a menos laranja ≤ 15:1.
3. **Paleta secundária nomeada do quadro, só como campo chapado** de bordas retas, no máximo um por seção: petróleo `#457183` no plano da pergunta dos eixos (papel sobre ele, 4,83:1); areia `#aa9c87` na célula de metadados da Ferramenta (azul sobre ela, 6,46:1); petróleo escuro `#315b6f` na célula de link do vídeo (papel, 6,67:1); ardósia clara `#7f989a` numa célula da partição 3+2 dos temas (azul, 5,67:1); ferrugem `#8a4c1b` como contrapeso chapado sem texto no vão embaixo à esquerda de Serviços, longe de qualquer laranja; petróleo escuro no cabeçalho dos hubs, como campo da frase de apoio.
4. **Proibido:** borda laranja em volta de célula, laranja como texto sobre papel (`#C2410C` só em link/ação), cor do quadro como textura, degradê ou repetição do quadro.

Por seção (cor → função):
- **Tese:** azul estrutura; laranja chapado na newsletter (ação) e na janela; "e negócio," em laranja sobre azul.
- **Eixos:** plano da pergunta em petróleo; cada lista de textos abre com filete laranja de 2px; marca laranja na célula de data e no "Mais recente"; papel nas três portas.
- **Ferramenta:** azul estrutura; "Fazer o diagnóstico" chapado laranja (ação); metadados numa célula de areia. No celular, a célula de metadados vai para o fim (depois da ação e da nota), sem virar sobretítulo.
- **Vídeo:** papel; célula de link em petróleo escuro; quadrado laranja do play (presença).
- **Temas:** papel; marca laranja no canto de cada tema; uma célula (a mais larga) em ardósia clara.
- **Serviços:** papel; segmento laranja no começo do filete de cada oferta; campo de ferrugem no vão embaixo à esquerda (contrapeso da escada).
- **Rodapé:** chega do papel de Serviços; azul estrutura; newsletter chapada laranja.
- **Hubs:** cabeçalho azul com a frase de apoio num campo de petróleo escuro; índice sobre papel, cada linha abre com filete laranja de 2px; o mais recente segue com a célula de data chapada.

Resultado medido (`medir-cor.cjs`, desktop 1366): home com laranja ≥ 0,5% em 100% das janelas de 900px (mín. 0,82%, máx. 10,85%: razão 13:1, antes 52:1), cor do quadro ≥ 3% em 92% das janelas, escuro 32%, maior trecho escuro 143px; hubs com laranja ≥ 0,5% em 100% das janelas (desktop e celular). Rodapé: em todos os modelos (home, hubs, Radar, Newsletter, edição, artigo, 404) os 400px acima dele são ≥ 56% claros; no celular o plano laranja da newsletter abre o rodapé (papel → laranja → azul), menos nas páginas de texto, que já terminam com ele. Pendências da v3 resolvidas: "Engenharia & IA" numa linha (nome de eixo não quebra no "&"), vão de Serviços ocupado pelo campo de ferrugem, respiro de 0,12em nas linhas de abertura com acento (É MAIS, TRIBUTÁRIA). 404: abertura no azul, caminhos no papel.

## Rodada 5 — claros da Shelfye + refinamento

Mandato do dono: "o bege ou creme deles é mais bonito que esse cinza". Os claros passam a ser os da Shelfye.ai (PRODUCT.md, "Claros quentes da Shelfye.ai"): papel `#FFF8F2` como campo de leitura, creme `#FDEED9` como claro quente de destaque, `#EEE7E1`/`#F9F2EC` para aninhar, fio quente `#E6D9C8`, texto secundário `#475569`. O texto claro sobre azul usa o mesmo papel (um só claro no site). O laranja continua `#F97316`; nada de serifa display ou terracota por causa do creme.

Onde o creme entrou e por quê: **Temas** (a seção de "quem escreve" esquenta, e as células de papel da partição aninham por tom sobre ela; papel → creme → papel dá o ritmo do vídeo aos serviços), **caixa do autor** no fim do artigo (o destaque da leitura), e a **célula da newsletter do rodapé** (o claro que antecede o escuro; no celular abre o rodapé: papel → creme → azul).

Refinamento (pendências dos revisores da v4):
1. Newsletter do rodapé: célula de creme com filete laranja de 6px e só o botão chapado. No celular, a newsletter do hero também deixa de ser plano (azul com filete laranja de 2px, só o botão chapado): o plano ocupava a tela toda e repetia a placa. Desktop mantém o plano no hero; o fim do artigo mantém o dele.
2. Uma ação chapada por região: os três "Ler…" dos eixos e duas das três ofertas viraram links `#C2410C` com seta; fica chapado só "Agendar diagnóstico".
3. O campo de ferrugem sem texto de Serviços saiu; o último degrau ficou mais curto (26rem → 23rem).
4. Hubs: a célula de data de cada texto é o campo do quadro do eixo (petróleo escuro, ferrugem, ardósia clara; `EIXO_CAMPO`), a do mais recente segue laranja; a frase de apoio do hub vai no campo do eixo. O mesmo campo marca a data nas listas dos eixos da home.
5. Sem marca quadrada de canto (eixos, vídeo, Ferramenta, temas). A presença passa a filete: topo de cada porta dos eixos, filetes de cima e de baixo da partição dos temas.
6. Ferramenta: a célula vazia de areia virou ardósia clara com os metadados e a nota de cautela.
7. "&": na cor do texto em todo o site (antes só nos nomes de célula, e em azul dentro do campo).
8. Quente com frio carregando conteúdo: na Ferramenta, ardósia clara (metadados + nota) encosta na ferrugem (texto + "Como funciona por dentro"); a areia foi para a célula larga dos temas.
9. Esta página corrigida: o plano da pergunta dos eixos é petróleo, não laranja.

Artigo (texto único, igual nos dois briefs): costura laranja de 4px na passagem noite → papel; filete laranja sob os metadados e sobre a linha-fina; no desktop, a margem esquerda (3 colunas) é um sumário fixo com os títulos reais dos H2, aberto por filete laranja de 4px, a seção corrente no campo do quadro do eixo com topo laranja (`aria-current="location"`), sem rótulo visível e sem número; cada H2 tem filete laranja de 4px com a marca do eixo (barra de 4rem × 8px no campo do eixo) na ponta esquerda, também no celular, onde não há sumário; links sublinhados em `#F97316`; no fim, caixa do autor em creme e plano laranja da newsletter (no celular o plano vem antes e o creme fecha a página), e o rodapé omite a célula da newsletter.

Medido (`medir-cor.cjs`, v4 → v5): home desktop laranja 4,4% → 3,3% (janelas ≥ 0,5%: 100% → 100%), quadro ≥ 3% 92% → 67%, escuro 32% → 31%; home celular laranja 7,5% → 3,3%, quadro 42% → 50%; insights desktop quadro 8% → 92%; artigo desktop laranja nas janelas 14% → 100%, quadro 0% → 86%; artigo celular 36% → 96% e 0% → 70%. Os 400px acima do rodapé ficam ≥ 56% claros em todos os modelos. axe sem falha séria em 10 rotas × 2 larguras.

### Correções do revisor (v5)
1. Artigo: saíram as placas numeradas 01–08 (numeração decorativa); a margem virou sumário fixo com os títulos reais dos H2, a seção corrente marcada no campo do eixo com topo laranja; no H2 fica só a marca estreita do eixo sob o filete laranja.
2. Eixos (home): a coluna de petróleo de ~1.000px virou faixa na largura da grade, na altura do conteúdo; as portas ganharam a largura toda.
3. Rodapé sem a célula da newsletter nas páginas que já terminam com o plano laranja (textos e /newsletter); onde fica, abre o rodapé.
4. Simulador: o link "Como funciona por dentro" foi para a célula de ardósia, empilhada a partir do topo.
5. Temas: a célula larga é `#EEE7E1` com faixa de areia de 12px no topo (areia não é fundo de leitura).
6. Vídeo: título e célula azul em duas faixas de largura total, na altura do conteúdo.
Opcional: texto secundário sobre creme aquecido para `#57534E` (6,7:1 no creme, 6,1:1 em `#EEE7E1`).
