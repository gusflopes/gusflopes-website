# Como "o bom" deveria parecer: referências para gusflopes.dev

Documento de referência para a dúvida do dono: "nossa maior dificuldade é saber como o bom deveria parecer".
Data: 04/10/2026. Escopo: a home abaixo do hero, o artigo e o Substack, dentro das restrições fixas (paleta azul-escuro +
laranja, o quadro do hero e o clima Van Gogh como inspiração, copy protegida).

## Antes de ler: fontes, limites e o que foi verificado

**Fontes de método usadas**
- Skill Impeccable instalada (`.claude/skills/impeccable/`): `SKILL.md`, `reference/craft-floor.md`, `critique.md`,
  `new-work.md` (seções 3–4), `mode-persuade.md`, `mode-read.md`, `bolder.md`, `typeset.md`, e por tabela `layout.md`.
- Repositório completo do Impeccable (`scratchpad/impeccable/`). **Não existe ali um catálogo real de mundos.** O que
  existe:
  - `tests/fixtures/concept-catalog/`: um catálogo *de teste* (`catalogVersion: "fixture-1"`) com a anatomia de uma
    entrada (`form`, `lineage`, `system` em cinco linhas: paleta/material, tipo/composição, topologia/navegação,
    controles/estado, responsivo/movimento, `spark`, `webLeverage`) e um `qualityBar` com cinco portões de rejeição e oito
    eixos de revisão: identificação do público, clareza do produto, alavanca de sistema, uso do meio, honestidade da
    tradução, amplitude entre superfícies, segurança de render e ressonância cultural. Os textos são placeholders de
    teste, mas a estrutura e os nomes dos eixos servem de régua, e usei os dois.
  - `crates/context/src/seed_text.rs`: confirma que os challengers e os boards de QUALITY BAR vêm de um serviço remoto
    (`https://impeccable.style/api/roll`), que está bloqueado aqui. Por isso nenhum challenger real foi sorteado, e as
    direções da Parte 2 saem do método escrito em `new-work.md`, não do catálogo.
- As skills "taste" e "frontend-design" não estão instaladas. O Impeccable foi a régua.

**Rede**
- WebSearch funciona. WebFetch e curl estão **bloqueados** pelo proxy para todos os sites testados (stratechery.com,
  nexojornal.com.br, piaui.folha.uol.com.br, ubueditora.com.br). impeccable.style também está bloqueado, como já se sabia.
- Por isso o status de verificação neste documento significa:
  - **verificado (busca)**: a existência da pessoa, obra, publicação ou site e o fato citado aparecem em resultados de
    busca de fontes identificáveis (Wikipedia, Enciclopédia Itaú Cultural, sites oficiais, museus, teses). **Não abri as
    páginas.**
  - **verificado (busca), lição não conferida**: o site existe, mas a lição visual que descrevo vem do meu conhecimento
    prévio e não foi conferida nesta sessão, porque não consegui abrir a página. Confira ao abrir.
  - **não verificado**: dito de memória, sem confirmação nesta sessão.
- Nenhuma URL foi inventada: todas as URLs citadas apareceram literalmente em resultados de busca.

**Capturas usadas, com ressalvas**
- `eval/shots2/<direção>/` foi capturado às 03:21 de 04/10, ou seja, no fim da **rodada 2**. A rodada 3 está em
  andamento nas worktrees e ainda não tem commit nem captura. Então julgo o estado da rodada 2, que é o mesmo que o dono
  viu quando deu o mandato da rodada 3.
- Na captura da Pincelada em `shots2`, as telas geradas saem como **blocos azuis vazios** (o canvas não tinha pintado na
  hora da captura). Para não julgar um artefato de captura, usei também a captura da própria branch:
  `.worktrees/pincelada/docs/design-review/home-desktop-inteira.png`, onde as telas aparecem.
- Na captura da Evolução em `shots2`, o quadro não aparece no hero (imagem lazy). A captura da branch
  (`.worktrees/evolucao/docs/design-review/home-desktop.png`) mostra o quadro corretamente.
- Recortes de trabalho que gerei para olhar as camadas: `scratchpad/referencias/crops/`.

**As camadas da home, para dar nomes comuns**
Na rodada 2, as três direções têm a mesma sequência de conteúdo: hero → "O que eu escrevo, e para quem" (eixos) →
Simulador da Reforma Tributária (ferramenta) → "Ideias recentes" + "Vídeo em Destaque" → "Engenharia é mais do que
código" + os cinco temas (sobre) → "Como posso ajudar" (serviços) → rodapé. Na rodada 3, "Ideias recentes" se funde nos
eixos (decisão aprovada).

---

## Parte 1: A régua de "bom" (o que faz uma camada conquistar)

Treze critérios. Cada um é verificável numa captura ou no código e vem de uma fonte nomeada. Para cada um: o teste, por
que o Concretismo passa (ou onde ele também tropeça) e onde a Evolução e a Pincelada falham hoje.

### C1. Teste de cobrir o hero: dá para dizer qual é a direção olhando só esta camada?
- **Teste:** recorte a camada sozinha, sem hero, sem logo. Alguém que viu as três direções acerta qual é? Se a camada
  poderia estar em qualquer site de consultoria, ela falhou.
- **Fonte:** `critique.md`, "Design specificity: [...] could an unrelated product use it unchanged?"; mandato da
  rodada 2 ("Cubra o hero e veja se ainda dá para reconhecer a direção"); `mode-read.md`, "cover the name: could this be
  any other product's documentation?".
- **Concretismo passa.** Em `shots2/concretismo/home-desktop-full.png`, qualquer faixa recortada se reconhece: o bloco
  laranja com "O QUE EU ESCREVO, E PARA QUEM" em Archivo condensado, "SIMULADOR / DA REFORMA" com a segunda linha vazada,
  "IDEIAS RECENTES" ocupando a largura toda, "COMO POSSO / AJUDAR" em escada.
- **Evolução falha.** Em `shots2/evolucao/home-desktop-full.png`, "Engenharia é mais do que código" + a lista de cinco
  temas com fio fino, e "Como posso ajudar" em linhas título | texto | link, são o esqueleto padrão de qualquer site de
  consultoria. O que identifica a direção (o quadro) está só no hero e numa faixa decorativa.
- **Pincelada passa pela metade.** Na captura da branch, a tela de pinceladas identifica a camada, mas, se tirarmos a
  tela, sobra o mesmo esqueleto da Evolução: Literata, fio fino, lista. O mundo está na imagem, não na estrutura.

### C2. Existe um elemento dominante, pelo menos 2× maior que o seguinte
- **Teste:** teste do olhar desfocado. Com o detalhe borrado, você aponta o primeiro, o segundo e os grupos na ordem? O
  elemento principal tem pelo menos o dobro da área ou do corpo do seguinte?
- **Fonte:** `layout.md` ("squint test [...] identify the primary element, the secondary element"); `typeset.md`
  ("obvious scale and weight steps"); `bolder.md` ("Commit, then clarify [...] If every element got louder, the section
  got flatter").
- **Concretismo passa.** "IDEIAS RECENTES" tem cerca de 4× o corpo dos títulos da lista. "SIMULADOR DA REFORMA
  TRIBUTÁRIA" ocupa três linhas da largura toda. "AJUDAR" tem cerca de 3× o corpo de "CONSULTORIA ESTRATÉGICA".
- **Evolução falha.** "Engenharia é mais do que código", "Ideias recentes" e "Como posso ajudar" têm praticamente o mesmo
  corpo dos itens abaixo deles (por exemplo, "Domínio & Arquitetura" está quase no tamanho do título da seção). Nada
  domina: tudo é segundo plano.
- **Pincelada falha no texto e passa na imagem.** O dominante de cada camada é a tela pintada, que é decoração, e não o
  conteúdo. "O que eu escrevo, e para quem" e a tela vertical ao lado brigam pelo primeiro lugar.

### C3. A composição nasce do conteúdo (teste do esqueleto)
- **Teste:** tire o texto e olhe só a estrutura. O esqueleto ainda diz o que a seção é? Três ofertas viram uma forma de
  três ofertas, um diagnóstico vira uma forma de pergunta e resposta, uma trajetória vira uma forma de trajetória.
- **Fonte:** `bolder.md`, "The skeleton test"; quality bar das composições do catálogo-fixture ("names a structural idea
  that stays powerful [...] and survives the wireframe test"); brief da rodada 3 ("a composição nasce do conteúdo").
- **Concretismo passa na maioria das camadas.** "Como posso ajudar" é uma escada de três degraus, a forma de "três
  níveis de envolvimento". Os eixos são três portas ao lado de um bloco que diz "cada leitor entra por uma porta". O
  Simulador tem um botão-bloco laranja quadrado ("FAZER O DIAGNÓSTICO →") que é a própria ação.
  - **Onde tropeça:** os cinco temas viram uma grade de caixas iguais (3 + 2), quase o andaime de "cards iguais".
- **Evolução falha.** "Título à esquerda, lista à direita" serve para os eixos, os temas e os serviços. Sem o texto, os
  três esqueletos são indistinguíveis.
- **Pincelada falha.** "Lista à esquerda + tela à direita" e "tela grande + texto embaixo" se repetem sem relação com o
  conteúdo: a tela do "Vídeo em Destaque" é a mesma linguagem da tela dos eixos.

### C4. Nenhuma camada repete o esqueleto da vizinha
- **Teste:** descreva cada camada em cinco palavras de estrutura ("título enorme + linhas datadas"). Duas vizinhas com a
  mesma descrição reprovam.
- **Fonte:** `mode-persuade.md` ("a centred headline over a row of cards is the template whatever world paints it");
  mandato da rodada 2 ("não repetir o módulo título + 3 colunas e não alternar o fundo em listras").
- **Concretismo passa.** Sequência: bloco laranja + três linhas → título gigante em duas cores + botão-bloco → título de
  largura total + linhas com data grande → card dividido do vídeo → título empilhado + parágrafo → grade → escada. Sete
  estruturas diferentes.
- **Evolução falha.** Eixos, temas, ideias e serviços seguem "título + linhas separadas por fio". A alternância
  navy/claro/navy/claro é exatamente o "fundo em listras" que o brief proibiu.
- **Pincelada falha.** Três camadas seguidas com "texto + retângulo pintado" (eixos, vídeo, simulador) e, depois, um
  salto para fundo claro em "Como posso ajudar", sem motivo de conteúdo.

### C5. A densidade e o ritmo variam entre camadas vizinhas
- **Teste:** marque, para cada camada, se ela é densa (muita informação por área) ou aberta (muito respiro). A sequência
  deve alternar com intenção, sem três iguais seguidas. Dentro da camada, os intervalos apertados e os generosos devem
  ser claramente diferentes.
- **Fonte:** `layout.md` ("Rhythm: Do tight and generous intervals create a deliberate cadence, or is one spacing value
  repeated until everything has equal weight?"); `bolder.md` ("a shift in density or pace from what surrounds it").
- **Concretismo passa.** Os eixos são densos (grade com bordas, quatro informações por porta). "IDEIAS RECENTES" é
  aberta, com um título e duas linhas. O vídeo volta a ser denso. "Engenharia é mais" é aberta. Os temas são densos. Os
  serviços são abertos, em escada. A alternância é clara.
- **Evolução falha.** O mesmo espaçamento vertical entre todas as linhas de lista em todas as seções. É o "one spacing
  value repeated" que o `layout.md` descreve.
- **Pincelada falha.** A densidade do texto é constante, e a variação vem só do tamanho da tela pintada.

### C6. A tipografia faz trabalho estrutural, não só de rótulo
- **Teste:** o tipo de display monta a forma da seção (empilha, vaza, ocupa a largura, quebra de linha com intenção)?
  Ou é só um título no tamanho padrão em cima de um bloco? Um título de seção com pelo menos 3× o corpo do texto é um
  sinal mínimo.
- **Fonte:** `typeset.md` ("Persuade + Experience: display type may carry the voice. Use decisive contrast"); a própria
  tradição concreta ("verbivocovisual", Noigandres; verificado por busca).
- **Concretismo passa.** É o critério em que mais se destaca: palavras empilhadas, linhas vazadas, largura total,
  laranja numa palavra-chave.
  - **Onde tropeça:** o recurso do texto vazado aparece em quatro camadas ("MESMO", "DA REFORMA", "DO QUE CÓDIGO", "COMO
    POSSO"). Repetido assim, vira tique. É o risco anotado na maquete original ("difícil de sustentar sem repetir").
- **Evolução falha.** Literata com destaque em itálico ("*e para quem*", "*mais do que código*", "*ajudar*") em todas as
  seções. Além de não estruturar nada, cai num dos três clichês calibrados do `new-work.md` §4 (veja C9).
- **Pincelada falha.** O mesmo Literata 600 em corpo médio para todos os títulos. O tipo não participa do mundo.

### C7. O mundo é o chão da camada, não um adesivo
- **Teste:** o material da direção (cor, forma, textura, gesto) ocupa o fundo e as superfícies principais? Ou aparece
  como um enfeite sobre um layout neutro? E ao contrário: a camada virou um quadro pintado sem partes que funcionam?
- **Fonte:** `mode-persuade.md`: "a world reduced to an accent on a neutral template is the category default with a
  sticker on it" e "The world may be the carrier of the page, never a picture of it".
- **Concretismo passa.** Blocos laranja inteiros, grade com bordas e tipo-bloco são o próprio layout. Não existe
  "layout + enfeite".
- **Evolução falha.** O mundo (o quadro) aparece como uma faixa decorativa entre o Simulador e "Engenharia é mais"
  (`shots2/evolucao`, 2ª faixa). É o adesivo, literalmente.
- **Pincelada falha pelos dois lados.** A tela vertical ao lado dos eixos e a tela do vídeo são figuras do mundo coladas
  num layout neutro (adesivo). E o vídeo com tela pintada no lugar da miniatura vira "picture of the world" sem a parte
  que funciona, que é ver de que vídeo se trata.

### C8. A cor se compromete na escala de região
- **Teste:** o laranja e o azul-escuro são campos que ocupam regiões inteiras, ou só aparecem em botões e links? Escolha
  uma estratégia (Contida, Comprometida, Paleta cheia, Encharcada) e veja se a camada a cumpre.
- **Fonte:** `new-work.md` §4: "Color commits at page scale: fields that own whole regions, not accents scattered over a
  neutral ground".
- **Concretismo passa.** O laranja ocupa um terço dos eixos, metade do bloco da newsletter, o botão-bloco do Simulador e
  a célula de newsletter do rodapé. A estratégia é "Comprometida" e é cumprida.
- **Evolução falha.** O laranja aparece só em botões e links. A estratégia é "Contida", o que poderia estar certo para
  leitura, mas numa home que precisa conquistar camada por camada o laranja vira acento disperso.
- **Pincelada falha.** O laranja aparece nos fios embaixo das telas e nos "sóis" da pintura. A cor de região é sempre o
  mesmo azul.

### C9. Fica longe dos clichês calibrados e dos andaimes proibidos
- **Teste:** procure, na camada, os três visuais de IA do `new-work.md` §4 (fundo creme + serifa display de alto
  contraste + acento terracota; quase-preto + neon com brilho; jornal com fios finos + serifa display itálica + rótulos
  mono pequenos com tracking) e os itens de "Refuse" do `craft-floor.md` (eyebrow/kicker acima do título, que é
  proibição absoluta; números de seção; cards iguais de ícone + título + texto; borda lateral colorida; sombra dura).
- **Fonte:** `new-work.md` §4 ("Calibration") e `craft-floor.md` ("Refuse").
- **Concretismo passa na maior parte, com dois pontos a limpar.** Não tem creme, nem neon, nem serifa itálica.
  - **Ponto 1:** rótulos pequenos em caixa alta, laranja e com tracking acima de blocos ("ESTRATÉGIA · ARQUITETURA · FLUXO
    · IA APLICADA", "FERRAMENTA GRATUITA · EXPERIMENTO ABERTO") estão perto do eyebrow proibido.
  - **Ponto 2:** a grade dos temas está perto dos "cards iguais".
- **Evolução falha.** Fios finos + destaque em serifa itálica + metadados pequenos é exatamente o terceiro clichê ("broadsheet-editorial
  hairlines, italic display serif"). E o "—— Estratégia · Arquitetura · Fluxo · IA aplicada" do hero é um kicker.
- **Pincelada passa em parte.** Não tem itálico. Mas o "MAIS RECENTE" pequeno com tracking embaixo de cada título e a
  linha "Estratégia · Arquitetura · Fluxo · IA aplicada" repetem o padrão de rótulo.

### C10. Uma ação clara por camada, no vocabulário do mundo
- **Teste:** cada camada tem uma ação inconfundível? Ela foi desenhada na linguagem da direção, ou é o botão padrão de
  qualquer site?
- **Fonte:** `mode-persuade.md` ("Conversion lives inside the form's own vocabulary [...] a visible primary action";
  "an action on a door plaque as plainly clickable").
- **Concretismo passa.** "FAZER O DIAGNÓSTICO →" é um bloco laranja quadrado, a mesma peça construtiva da página. Os links
  dos eixos e dos serviços são curtos e consistentes.
- **Evolução passa na clareza e falha no vocabulário.** O botão laranja arredondado e o "Ler Negócios →" são os de
  qualquer site.
- **Pincelada, idem.** O botão laranja padrão. A ação do vídeo (o play) fica escondida no canto de uma tela pintada.

### C11. A camada continua funcionando como página (o mundo carrega as partes, não as engole)
- **Teste:** contraste de corpo ≥ 4,5:1, medida de leitura de 45–75 caracteres, ritmo vertical estável, a seção seguinte
  começa como seção. O gesto do mundo não pode atrapalhar a leitura.
- **Fonte:** `mode-persuade.md` ("the page still works as a page"); `mode-read.md` ("The world owns the frame and serves
  the column"); `craft-floor.md` ("Verify": contraste, medida, tipo).
- **Concretismo passa.** Os parágrafos dos eixos e dos temas estão em serifa de leitura com medida curta. No artigo
  (`shots2/concretismo/artigo-desktop-full.png`), a abertura é toda do mundo ("AGENT / SKILLS:" com o quadrado laranja)
  e a coluna é calma, sobre fundo claro. É o modelo do `mode-read.md`.
- **Evolução passa.** Leitura boa, porque não arrisca nada.
- **Pincelada tem um risco.** A captura de `shots2` mostra o que acontece quando o canvas não pinta: a camada vira um
  bloco azul vazio. O mundo depende de JavaScript para existir. Se a tela falha, a camada perde a razão de ser.

### C12. O quadro trabalha com um papel, não como ilustração
- **Teste:** quando o quadro (ou algo derivado dele) aparece abaixo do hero, ele tem uma função legível (janela, mapa,
  capa de um conteúdo, prova)? Ou é uma imagem bonita colocada ao lado?
- **Fonte:** compromisso de marca em `PRODUCT.md` ("Referência artística: o quadro do hero e Van Gogh"); `bolder.md`
  ("A placeholder for an image or artifact names a job, an anchor and a piece of evidence, not a cue to drop in a
  decorative photo").
- **Concretismo passa no hero e quase some depois.** A janela laranja girada com um recorte do quadro é o melhor uso do
  quadro das três direções, porque o quadro vira um objeto com função. Mas **abaixo do hero o quadro não aparece mais**.
  Esse é o ponto fraco do Concretismo diante do compromisso de marca, e é a primeira coisa a corrigir se ele for a base.
- **Evolução falha.** A faixa do quadro entre as seções não tem função.
- **Pincelada falha de outro jeito.** A pintura gerada está em todo lugar, mas sempre no mesmo papel de "ilustração ao
  lado". E as telas repetem o mesmo motivo (redemoinho com dois ou três "sóis" laranja), o que vai contra a tese da
  própria direção ("o mesmo gesto, nunca a mesma imagem").

### C13. Prova real no centro, não decoração
- **Teste:** quando a camada precisa de evidência (o simulador, o caso rt2026, o vídeo), ela mostra a coisa real ou uma
  imagem genérica? Sem depoimentos, números ou clientes inventados.
- **Fonte:** `PRODUCT.md` (princípio 4: "Sem hype, sem vitrine: provas reais ou nada"); `new-work.md` ("What stays
  uninventable are commercial and factual claims").
- **Nenhuma das três passa totalmente.** O Concretismo dá ao Simulador o maior peso visual da página, o que é a prova
  mais forte do site, mas não mostra nada do simulador (uma pergunta, um resultado). A Evolução e a Pincelada mostram o
  Simulador como uma linha de texto com botão. A Pincelada põe uma tela pintada onde a ferramenta deveria aparecer. Este
  é o critério com mais espaço de ganho para qualquer direção.

**Critério que não dá para julgar pelas capturas:** movimento. O `craft-floor.md` pede "one authored moment, not
scattered effects and not one identical entrance on every section". Isso exige olhar no navegador.

**Resumo da régua**

| Critério | Concretismo | Evolução | Pincelada |
|---|---|---|---|
| C1 cobrir o hero | passa | falha | metade |
| C2 dominante 2× | passa | falha | só na imagem |
| C3 nasce do conteúdo | passa (exceto temas) | falha | falha |
| C4 vizinhas diferentes | passa | falha | falha |
| C5 densidade varia | passa | falha | falha |
| C6 tipo estrutural | passa (vazado repetido) | falha (clichê) | falha |
| C7 mundo é o chão | passa | falha | falha |
| C8 cor de região | passa | falha | falha |
| C9 sem clichês | quase (rótulos, grade) | falha | metade |
| C10 ação no vocabulário | passa | metade | metade |
| C11 funciona como página | passa | passa | risco |
| C12 quadro com papel | só no hero | falha | falha |
| C13 prova real | metade | falha | falha |

Isso explica o que o dono sentiu: o Concretismo é a única direção em que **a estrutura** pertence ao mundo. Nas outras
duas, o mundo é **uma imagem** (o quadro, a tela gerada) posta sobre a mesma estrutura de site editorial. Quando a
imagem sai de vista, o charme vai junto.

---

## Parte 2: Outras direções além do Concretismo

Método (`new-work.md` §3, "Create or replace the visual world"): sair do universo cultural do público (Direito,
Contabilidade, software, negócios, Brasil, publicação editorial); usar pelo menos três famílias materiais; deixar fora a
"rut" (a página que a categoria sempre faz, que aqui é o site de consultoria com hero + cards, e o seu oposto previsível);
gastar no máximo uma direção com a leitura literal da metáfora ("ponte"), e aqui não gastei nenhuma; fugir dos clichês
calibrados e das fontes saturadas.

**Já feito, e por isso fora:** Partidas Dobradas (livro-razão), Vade Mecum, Ficha de Decisão, Metrô Noturno, Azulejo
Modular (Athos Bulcão), Concretismo, Papel de Segurança, Pincelada e Evolução.

**Famílias materiais cobertas:** imprensa e revista (1, 2), disco e fotografia (3), museografia e arquitetura (4, 5),
pintura reinterpretada (6, 7), gravura popular (8), formulário fiscal (9).
**Reinterpretam o quadro sem pincelada literal:** 3, 6, 7 e 8.
**Tradições editoriais e de design brasileiras:** 1, 2, 3, 4, 5 e 8.

**Regra que vale para todas:** nenhuma muda texto visível. Onde o gesto pediria texto novo (rótulos, números), isso está
marcado no risco e exige aval do dono antes, em commit isolado.

**Camadas da home usadas abaixo:** hero; eixos (já com "Ideias recentes" fundida, conforme a rodada 3); ferramenta
(Simulador); sobre ("Engenharia é mais do que código" + temas, e o "Vídeo em Destaque" realocado); serviços ("Como posso
ajudar").

---

### 1. Suplemento Dominical

- **Mundo:** a reforma gráfica do *Jornal do Brasil* (1956–61) e o *Suplemento Dominical do JB* (SDJB), diagramados
  por Amilcar de Castro com Reynaldo Jardim. Eles eliminaram os fios entre colunas, deixaram o branco dividir a página e
  trataram a mancha de texto como massa plástica. É o primo editorial e neoconcreto do Concretismo: a mesma família
  brasileira, só que feita para ler muito texto.
- **Referências**
  - Amilcar de Castro e a reforma do JB: verificado (busca) em
    [Wikipedia](https://pt.wikipedia.org/wiki/Amilcar_de_Castro) e na
    [Enciclopédia Itaú Cultural](https://enciclopedia.itaucultural.org.br/pessoas/706-amilcar-de-castro).
  - Eliminação dos fios, diagramação vertical, branco como elemento ativo e superposição de grades no SDJB: verificado
    (busca) em teses da PUC-Rio ([cap. 3](https://www.maxwell.vrac.puc-rio.br/9864/9864_4.PDF),
    [cap. 4](https://www.maxwell.vrac.puc-rio.br/9864/9864_5.PDF)) e numa
    [entrevista na SciELO](https://www.scielo.br/j/nec/a/mFLXTfGGpJqVp7jgGbVj8kH/?lang=pt).
- **Gesto-assinatura:** **o branco é a régua.** Não há nenhum fio na página inteira. As colunas se separam por vazios
  largos e assimétricos, e cada camada tem uma "mancha" (um bloco de texto ou um recorte do quadro) colocada fora do eixo,
  como uma matéria no suplemento.
- **Camadas da home**
  - **Hero:** o quadro como "foto de capa" em recorte vertical alto, encostado numa margem. A tese em Archivo pesado
    numa coluna estreita, com o branco no meio.
  - **Eixos:** uma página de suplemento com três colunas de **larguras diferentes** (a do eixo com mais textos é a mais
    larga). O título do texto mais recente é a "manchete" de cada coluna. Nenhuma borda.
  - **Ferramenta:** uma "chamada de capa". O nome do Simulador em corpo de manchete atravessando duas colunas, e a ação
    como um bloco laranja sólido, herdado do Concretismo.
  - **Sobre:** recorte grande do quadro (as torres) sangrando a página, com o parágrafo de trajetória como uma legenda
    longa. Os cinco temas como notas curtas em coluna estreita, separadas só por espaço.
  - **Serviços:** três blocos em degraus diagonais, a composição que o SDJB usava para poemas e chamadas.
- **Artigo:** a direção mais natural para 40 textos. A abertura em página de suplemento (título grande, linha fina, recorte
  do quadro), e a coluna serifada calma sem fios. As notas podem ir para a margem larga.
- **Substack:** fundo claro e frio (nunca creme), destaque laranja, capa = recorte vertical do quadro + título em bloco.
  Sobrevive bem ao funil limitado, porque o mundo é basicamente composição e espaço.
- **Tipografia:** Schibsted Grotesk (desenhada para um grupo de jornais, o que dá sentido à escolha) nos títulos, ou
  manter o Archivo do Concretismo, e Source Serif 4 no corpo (já está na branch). Nenhuma está na lista saturada.
- **Risco honesto:**
  - Se o branco não for corajoso, volta a ser "editorial genérico", e é exatamente o que o dono rejeitou na Evolução.
  - Tem que manter zero fio e zero itálico de destaque, senão cai no terceiro clichê.
  - Menos impacto imediato que o Concretismo.
- **Aproveitamento:** alto. Usa a grade, o Archivo, o botão-bloco e o corpo do artigo do Concretismo. Na prática, é uma
  evolução do Concretismo para o artigo e para o hub.

### 2. Senhor

- **Mundo:** a revista *Senhor* (Rio, 1959–64), com direção de arte de Carlos Scliar, Glauco Rodrigues e Bea Feitler.
  Ela juntava política, economia e cultura, e o projeto de Scliar resolvia **cada matéria com uma solução visual própria
  sem perder a identidade da revista**. É o princípio "cada camada conquista" escrito em 1959.
- **Referências**
  - Senhor, Scliar, Glauco Rodrigues e Bea Feitler, e o princípio da singularidade de cada matéria: verificado (busca)
    no [blog da Biblioteca Brasiliana/USP](https://blog.bbm.usp.br/2015/um-marco-do-design-grafico-brasileiro-revista-senhor-2/),
    na [Enciclopédia Itaú Cultural (Scliar)](https://enciclopedia.itaucultural.org.br/pessoas/3091-carlos-scliar) e na
    [Revista Continente (Bea Feitler)](https://revistacontinente.com.br/edicoes/144/bea-feitler).
- **Gesto-assinatura:** **cada camada é uma "abertura de matéria".** Um jogo tipográfico próprio, mais uma ilustração
  recortada do quadro (uma torre, uma lua, um reflexo) usada como colagem, não como foto inteira.
- **Camadas da home**
  - **Hero:** o quadro inteiro, como "capa" (pode ser o hero da Evolução).
  - **Eixos:** três aberturas lado a lado, cada uma com um recorte diferente do quadro como vinheta. Engenharia & IA com a
    torre, Negócios com as janelas acesas, Bastidores com o reflexo na água.
  - **Ferramenta:** uma página dupla. À esquerda, a pergunta do Simulador em corpo enorme. À direita, o texto e a ação.
  - **Sobre:** o título montado com a colagem de uma lua do quadro no lugar de uma letra "O". É uma brincadeira de
    revista, não uma mudança de texto.
  - **Serviços:** três "anúncios internos" de revista, cada um com proporção diferente.
- **Artigo:** a abertura muda por eixo (três famílias de abertura, não 40). O corpo é calmo.
- **Substack:** a capa da edição é uma colagem com um recorte do quadro. O fundo é claro e o destaque laranja.
- **Tipografia:** Gloock (display com personalidade, fora da lista saturada) + Hanken Grotesk (já usado nas branches).
- **Risco honesto:**
  - Exige mão de colagem e ilustração. Feito por código, pode virar retrô kitsch.
  - É a direção mais difícil de manter coerente, porque cada camada é diferente por definição.
  - Pode lembrar "revista de época" em vez de "consultor de 2026".
- **Aproveitamento:** médio. O hero da Evolução e os recortes do quadro já existem. O resto é novo.

### 3. Capa Elenco

- **Mundo:** as capas da gravadora Elenco (anos 1960), de César Villela com fotos de Chico Pereira: preto e branco de
  alto contraste, muito branco e pequenos pontos vermelhos. Villela dizia que eram quatro pontos, contando o do logo,
  como símbolo de harmonia. É bossa nova como sistema gráfico. **Reinterpreta o quadro:** as manchas redondas do céu
  viram os pontos, e o resto do quadro vira duotone.
- **Referências**
  - César Villela, Chico Pereira, a Elenco, o alto contraste e os pontos vermelhos: verificado (busca) no
    [Dicionário Cravo Albin](https://dicionariompb.com.br/personalidade/cesar-villela/), no
    [Teoria do Design](https://teoriadodesign.com/cesar-villela/) e no artigo acadêmico
    [O design da bossa nova](https://estudosemdesign.emnuvens.com.br/design/article/download/165/159).
  - A capa de *Chega de saudade* (1959) também é de Villela: verificado (busca), mesmas fontes.
- **Gesto-assinatura:** **o quadro reduzido a duas tintas (azul-escuro sobre branco) e pontos laranja exatos.** Três
  pontos, um por eixo, e o quarto é o traço laranja do logo. A mesma regra de Villela, com o significado da marca.
- **Camadas da home**
  - **Hero:** recorte do quadro em duotone azul-escuro, com o céu "limpo" e só três luas laranja.
  - **Eixos:** cada eixo é uma "capa de disco" quadrada, com um recorte do quadro em duotone e o ponto laranja em posição
    diferente. Sob o quadrado, como uma contracapa, vão o "mais recente" e o link.
  - **Ferramenta:** um quadrado branco quase vazio com um ponto laranja grande, que é o botão "Fazer o diagnóstico". É a
    capa mais silenciosa da página e, por contraste, a que mais chama atenção.
  - **Sobre:** uma foto do autor em alto contraste (a foto já existe) ao lado do texto, com um ponto.
  - **Serviços:** três quadrados com pontos em posições diferentes, como uma série de discos.
- **Artigo:** a abertura é um quadrado de capa com um recorte do quadro em duotone e o ponto do eixo. O corpo é limpo.
- **Substack:** fundo branco, destaque laranja, capa quadrada da edição com o ponto na posição do número da edição. É a
  direção que sobrevive melhor ao funil do Substack, porque cabe numa imagem quadrada.
- **Tipografia:** Jost (geométrica, no espírito das capas da época, fora da lista saturada) + Source Serif 4.
- **Risco honesto:**
  - Duotone pode apagar demais o quadro, e o dono gosta da cor dele. Talvez o quadro colorido fique só no hero.
  - "Pontos" podem virar enfeite se a regra (três + um) não for rígida.
  - A referência à bossa nova pode soar nostálgica.
- **Aproveitamento:** médio. O processamento do quadro (AVIF) e o grid quadrado são simples. Os pontos podem vir das
  "luzes" que o gerador da Pincelada já detecta.

### 4. Cavaletes de Cristal

- **Mundo:** os cavaletes de vidro de Lina Bo Bardi no MASP (1968, retirados em 1996, de volta em 2015). As obras saem
  da parede, flutuam sobre uma base de concreto, a legenda fica no verso, e o visitante escolhe o próprio caminho.
- **Referências**
  - A expografia dos cavaletes, as datas e o princípio do percurso livre: verificado (busca) no
    [ArchDaily](https://www.archdaily.com/pt//778296/masp-traz-de-volta-os-cavaletes-de-vidro-de-lina-bo-bardi), na
    [Revista Museu](https://www.revistamuseu.com.br/site/br/artigos/18-de-maio/18-maio-2019/6493-o-masp-imaginado-por-lina-bo-bardi-e-suas-derivacoes-poeticas.html)
    e no livro *Concreto e cristal* ([Cobogó](https://www.cobogo.com.br/produto/concreto-e-cristal-o-acervo-do-masp-nos-cavaletes-de-lina-bo-bardi-concrete-and-crystal-masp-s-collection-on-lina-bo-bardi-s-easels-534)).
- **Gesto-assinatura:** **cada conteúdo é uma peça em pé sobre uma base, com frente e verso.** A frente mostra o título.
  O verso (no foco ou hover; no celular, abaixo) mostra a descrição que já existe. Os cavaletes ficam num salão em
  ligeira perspectiva, desalinhados de propósito.
- **Camadas da home**
  - **Hero:** o próprio quadro num cavalete, em primeiro plano.
  - **Eixos:** três cavaletes em percurso sinuoso, como no MASP de 2015. O texto mais recente de cada eixo é a "obra" da
    frente.
  - **Ferramenta:** um cavalete sozinho, maior, com o Simulador como peça. O "Como funciona por dentro" fica no verso.
  - **Sobre:** a trajetória como a etiqueta do verso do próprio autor.
  - **Serviços:** três bases de concreto (azul-escuro) sem obra. A ação é a obra.
- **Artigo:** a imagem de capa num cavalete no topo. O resto é coluna calma.
- **Substack:** a capa da edição é o quadro no cavalete, com a edição como etiqueta.
- **Tipografia:** Familjen Grotesk (grotesca com caráter, fora da lista saturada) + Literata (já existe nas branches).
- **Risco honesto:**
  - Perspectiva e frente/verso são caros em acessibilidade e no celular (precisa de fallback empilhado).
  - "Vidro" tende ao glassmorphism, que o `craft-floor.md` recusa como decoração. Aqui o vidro tem função, mas a execução
    tem que ser seca: borda e reflexo, sem desfoque.
  - Pode virar fantasia de museu.
- **Aproveitamento:** baixo a médio. O quadro e o conteúdo, sim. O resto é novo.

### 5. Plano Piloto

- **Mundo:** o *Relatório do Plano Piloto de Brasília* de Lúcio Costa (1957): itens numerados, cada um com croquis à
  mão. O **croquis 1** é o cruzamento de dois eixos como ponto de partida da cidade. Para uma marca cuja tese é
  "tecnologia e negócio, partes do mesmo sistema", o cruzamento de dois eixos é o símbolo pronto, e vem da cultura
  brasileira.
- **Referências**
  - O relatório, os croquis numerados e o croquis 1 como cruzamento de dois eixos: verificado (busca) no
    [texto e croquis em doc.brazilia.jor.br](http://doc.brazilia.jor.br/plano-piloto-Brasilia/relatorio-Lucio-Costa.shtml)
    e em figuras de artigos no [ResearchGate](https://www.researchgate.net/figure/Croquis-Projeto-para-o-Plano-Piloto-de-Brasilia-Lucio-Costa-1957-Fonte_fig1_343167213).
- **Gesto-assinatura:** **o croqui de linha laranja que explica a camada.** Dois eixos que se cruzam (tecnologia ×
  negócio) aparecem redesenhados em cada camada para mostrar uma relação diferente.
- **Camadas da home**
  - **Hero:** o quadro com o croqui dos dois eixos traçado por cima, em laranja, como se o urbanista desenhasse sobre a
    cidade.
  - **Eixos:** os três eixos como setores de um plano em torno do cruzamento, cada um com sua "quadra" de textos.
  - **Ferramenta:** o croqui do caminho do Simulador (pergunta → motor da Receita → resultado) em três traços.
  - **Sobre:** Direito, Contabilidade, gestão e tecnologia como quatro vias chegando ao mesmo cruzamento.
  - **Serviços:** três "superquadras" de tamanhos diferentes.
- **Artigo:** croquis na margem como figuras numeradas. Aqui o número tem informação (liga figura e texto), o que é
  permitido pelo `craft-floor.md`.
- **Substack:** a capa é o croqui da edição sobre um recorte do quadro.
- **Tipografia:** Epilogue + Literata. Os croquis devem ser desenhados (SVG autoral), nunca com fonte manuscrita.
- **Risco honesto:**
  - Croqui "feito à mão" gerado por código fica falso. Pede uma pessoa desenhando de verdade, ou um traço geométrico
    assumido.
  - A numeração de itens pode escorregar para o "01/02/03" proibido.
  - Brasília pode parecer distante do público técnico.
- **Aproveitamento:** médio. A grade do Concretismo aguenta os setores. Os croquis são novos.

### 6. Reflexo

- **Mundo:** a linha d'água do próprio quadro. A metade de baixo é a cidade refletida em faixas verticais, o mesmo
  recurso de Van Gogh em *Noite estrelada sobre o Ródano* (1888, Musée d'Orsay), onde as luzes de Arles descem pela água
  em traços verticais longos. **Reinterpreta o quadro** pela composição dele, não pela pincelada.
- **Referências**
  - *Noite estrelada sobre o Ródano*, o museu e os reflexos em traços verticais: verificado (busca) na
    [Wikipedia](https://en.wikipedia.org/wiki/Starry_Night_Over_the_Rh%C3%B4ne) e na descrição do Orsay citada em
    resultados.
  - O quadro do hero do site: verificado localmente (o arquivo foi aberto).
- **Gesto-assinatura:** **toda camada tem uma linha d'água.** Acima dela fica o lado "construído" (o conteúdo, nítido).
  Abaixo, o reflexo: faixas verticais laranja e azul derivadas das cores daquela camada, que descem e se dissolvem. A
  tese da marca vira composição: dois lados do mesmo sistema, um espelhando o outro.
- **Camadas da home**
  - **Hero:** o quadro, com a linha d'água alinhada à tese.
  - **Eixos:** três "edifícios" tipográficos (os nomes dos eixos em blocos verticais) sobre a linha. O reflexo de cada um
    é a lista dos textos recentes, lida para baixo como luz na água.
  - **Ferramenta:** acima da linha, a pergunta. Abaixo, o reflexo é o resultado (a ação).
  - **Sobre:** as quatro formações refletidas numa só linha: a ideia "partes do mesmo sistema" sem uma palavra nova.
  - **Serviços:** três luzes acesas na margem, cada uma com o seu reflexo como link.
- **Artigo:** a linha d'água só na abertura (título acima, reflexo do título como textura abaixo, `aria-hidden`). A
  coluna fica limpa.
- **Substack:** a capa é o título da edição com o próprio reflexo. Vira uma marca reconhecível no feed.
- **Tipografia:** Piazzolla (serifa com corte firme, fora da lista saturada) + Hanken Grotesk.
- **Risco honesto:**
  - O reflexo pode virar truque se aparecer igual em todas as camadas. Ele precisa mudar de função de camada para camada.
  - Texto espelhado é decoração e tem que sair dos leitores de tela.
  - Pode parecer "efeito".
- **Aproveitamento:** médio. O gerador da Pincelada já sabe pintar traços verticais com as cores do quadro, e pode ser
  reaproveitado só para os reflexos.

### 7. Carta Celeste

- **Mundo:** o céu do quadro, salpicado de manchas redondas, lido como um mapa celeste. Cada artigo é uma mancha. O
  tamanho vem do tempo de leitura, a posição vem do eixo e da data, e a cor vem do quadro. **Reinterpreta o quadro** pela
  parte de cima, as luas e os pontos, e não pelas pinceladas. Família: cartografia e gráfico de dados, com dado real (os
  ~40 artigos), sem inventar nada.
- **Referências**
  - Nicholas Felton, os *Personal Annual Reports*, a vida medida como mapa e gráfico (acervo do MoMA): verificado (busca)
    na [Wikipedia](https://en.wikipedia.org/wiki/Nicholas_Felton_(graphic_designer)) e no
    [99% Invisible](https://99percentinvisible.org/episode/episode-31-the-feltron-annual-report/).
  - Nexo Jornal como referência brasileira de gráfico explicativo: verificado (busca),
    [bastidores dos gráficos](https://www.nexojornal.com.br/grafico/2024/03/08/grafico-e-infografico-como-faz-nexo-jornal).
- **Gesto-assinatura:** **as manchas do céu são o arquivo.** Um campo de círculos desenhado pelos dados reais, com três
  "constelações" (uma por eixo). Passar o cursor ou focar uma mancha mostra o título, e clicar abre o artigo.
- **Camadas da home**
  - **Hero:** o quadro. Ao rolar, as manchas do céu se soltam e viram os pontos do mapa (o único momento de movimento
    autoral).
  - **Eixos:** o mapa celeste com três constelações. Ao lado, o texto mais recente de cada eixo em destaque (a mancha
    maior e mais clara).
  - **Ferramenta:** uma mancha laranja enorme, sozinha, que é o Simulador, "a lua cheia" da página.
  - **Sobre:** a trajetória como uma constelação de quatro estrelas (as quatro formações).
  - **Serviços:** três manchas de tamanhos diferentes.
- **Artigo:** no topo, o "mapa local" do artigo (a mancha dele e as vizinhas do mesmo eixo). A coluna é calma.
- **Substack:** a capa é o mapa celeste com a mancha da edição em laranja. É gerável por código a cada edição.
- **Tipografia:** Chivo nos títulos + Chivo Mono só para datas e tempos de leitura (dado de verdade, o uso legítimo de
  mono segundo o `craft-floor.md`) + Literata no corpo.
- **Risco honesto:**
  - Gráfico de pontos como navegação exige aprender, e o `mode-read.md` proíbe substituir a navegação padrão. O mapa fica
    sempre ao lado de uma lista acessível.
  - Pode parecer dashboard.
  - Com 40 artigos o céu ainda fica ralo.
- **Aproveitamento:** médio. O schema das coleções já tem eixo, data e tempo de leitura. O gerador da Pincelada já
  extrai as cores do quadro.

### 8. Gravura Noturna

- **Mundo:** a xilogravura dos folhetos de cordel, de J. Borges e da tradição do Nordeste: duas tintas, talho largo, capa
  de folheto numerada. **Reinterpreta o quadro:** a cidade noturna recortada em madeira, com as luas virando furos
  brancos e o reflexo virando talhos verticais. A newsletter vira "folheto" com número.
- **Referências**
  - J. Borges (1935–2024), a xilogravura de capa de cordel e o acervo em museus: verificado (busca) na
    [Enciclopédia Itaú Cultural](https://enciclopedia.itaucultural.org.br/pessoas/2271-j-borges) e na
    [ArteRef](https://arteref.com/arte-brasileira/j-borges-o-mestre-da-xilogravura-biografia-obras-e-legado/).
- **Gesto-assinatura:** **uma versão do quadro em gravura de duas cores (azul-escuro e laranja, sobre branco frio),
  recortada em pedaços.** Cada camada usa um pedaço: a torre, as janelas, o reflexo.
- **Camadas da home**
  - **Hero:** o quadro original. A gravura entra logo abaixo, como a sua "tradução".
  - **Eixos:** três "folhetos" em pé, com capa em gravura (um pedaço do quadro cada) e, dentro, o mais recente.
  - **Ferramenta:** o Simulador como "folheto do mês", com a capa em gravura das janelas acesas.
  - **Sobre:** um retrato em gravura (só com aval: é imagem nova do autor).
  - **Serviços:** três vinhetas de gravura pequenas.
- **Artigo:** vinheta de gravura do eixo na abertura. O corpo é calmo.
- **Substack:** capa de folheto numerada, em duas tintas. Fica muito forte no feed.
- **Tipografia:** Alfa Slab One (display de talho pesado, fora da lista saturada) + Literata.
- **Risco honesto:**
  - O maior risco de "folclorização": pode soar regional ou artesanal demais para consultoria de arquitetura de
    software.
  - Gravura gerada por código fica falsa. O certo seria encomendar uma gravura a um gravador de verdade, o que custa
    dinheiro e tempo.
  - Pode brigar com o clima Van Gogh em vez de traduzi-lo.
- **Aproveitamento:** baixo. Só a estrutura do Concretismo.

### 9. Nota Fiscal

- **Mundo:** o DANFE, o documento auxiliar da NF-e que todo empresário e todo contador conhecem de cor. É uma grade densa
  de caixas com rótulo, a chave de acesso de 44 dígitos e o código de barras. Por definição, ele é a "ponte entre o mundo
  digital da NF-e e o mundo físico". Família: formulário fiscal. É o mundo mais específico do público de Negócios, e o
  Simulador **é** sobre imposto.
- **Referências**
  - O layout padronizado do DANFE e a chave de 44 dígitos em número e em código de barras: verificado (busca) no
    [Portal da NF-e](http://www.nfe.fazenda.gov.br/Portal/perguntasFrequentes.aspx?tipoConteudo=7w14caCnJ6E%3D&AspxAutoDetectCookieSupport=1)
    e em guias técnicos ([Bluesoft](https://blog.bluesoft.com.br/o-que-e-danfe/)).
- **Gesto-assinatura:** **a grade de caixas com rótulo interno**, levada ao limite da densidade (a coragem de densidade que
  falta às outras direções), e uma "chave" numérica gerada para cada artigo (data + eixo + slug), mostrada como faixa de
  barras na abertura.
- **Camadas da home**
  - **Hero:** o quadro.
  - **Eixos:** "itens da nota": uma tabela de verdade (eixo | para quem | descrição | mais recente), densa e alinhada em
    colunas.
  - **Ferramenta:** o Simulador como o quadro "cálculo do imposto": o lugar mais natural do mundo para ele.
  - **Sobre:** "dados do emitente": a trajetória em caixas.
  - **Serviços:** três caixas de "natureza da operação".
- **Artigo:** um cabeçalho em grade de caixas (eixo, data, leitura) e a chave em barras. O corpo fica fora da grade.
- **Substack:** a capa é a faixa de barras da edição com o número.
- **Tipografia:** Archivo Narrow (já existe) + JetBrains Mono só nos números da chave e nos valores (dado de verdade).
- **Risco honesto:**
  - Os rótulos das caixas e a "chave" são **texto visível novo** e exigem aval.
  - Burocrático e frio. O dono rejeitou a Ficha de Decisão por um risco parecido.
  - Não pode imitar um documento fiscal real: nada de brasão, nada da palavra "DANFE", nenhuma chave que pareça válida.
  - O público técnico pode não captar a referência.
- **Aproveitamento:** alto na estrutura. A grade com bordas do Concretismo já é meio caminho.

### Leitura rápida das nove nos dois eixos do Impeccable

Os eixos são identificação do público e clareza do produto (`new-work.md`, passo 4). Julgamento meu, sem o catálogo.

| Direção | Identificação do público | Clareza do produto | Observação |
|---|---|---|---|
| 1 Suplemento Dominical | alta (editorial, Brasil) | alta (é feita para ler) | a continuação natural do Concretismo |
| 2 Senhor | média | média | depende de mão de ilustração |
| 3 Capa Elenco | média | alta | a melhor para o Substack |
| 4 Cavaletes | média | média | cara de executar |
| 5 Plano Piloto | média | alta (os dois eixos = a tese) | precisa de croqui de verdade |
| 6 Reflexo | alta (é o quadro) | alta (os dois lados = a tese) | a melhor reinterpretação do quadro |
| 7 Carta Celeste | alta (técnico) | média | risco de dashboard |
| 8 Gravura Noturna | baixa a média | média | risco de folclore |
| 9 Nota Fiscal | alta (Negócios) e baixa (técnico) | alta | precisa de aval de copy |

---

## Parte 3: Biblioteca de referências

São 24 sites e publicações reais. Para cada um: o que olhar (a lição específica) e o status. Lembrete: o WebFetch está
bloqueado, então nenhuma página foi aberta. "Lição não conferida" quer dizer que o site existe, mas a observação visual
é de memória e deve ser conferida ao abrir.

### Marca pessoal editorial e newsletter

1. **Practical Typography / Typography for Lawyers**: Matthew Butterick, advogado e tipógrafo.
   - **O que olhar:** como um advogado com formação em design faz de um livro na web a própria marca. A tipografia é o
     argumento, e o site prova a competência que vende. É o caso mais próximo do perfil do Gustavo (formação jurídica +
     ofício técnico). Repare na disciplina de uma coluna só e na ausência de enfeite.
   - **Status:** verificado (busca), [Wikipedia](https://en.wikipedia.org/wiki/Matthew_Butterick) e
     [typographyforlawyers.com](https://typographyforlawyers.com/about-matthew-butterick.html). Lição não conferida.
2. **Craig Mod (craigmod.com, Ridgeline)**
   - **O que olhar:** cada edição da newsletter tem página própria no site com número (`/ridgeline/068/`), e o arquivo da
     newsletter é parte da obra, não um apêndice. É o modelo para `/newsletter` do site espelhando o Substack.
   - **Status:** verificado (busca), [craigmod.com/ridgeline](https://craigmod.com/ridgeline/subscribe/).
3. **Robin Sloan (robinsloan.com)**
   - **O que olhar:** a newsletter como "carta de um amigo", com tipografia escolhida e documentada em colofão (fontes de
     fundições independentes nomeadas). Lição: escrever o colofão do próprio site é parte da marca.
   - **Status:** verificado (busca), [colofão](https://www.robinsloan.com/winter-garden/colophon/).
4. **Stratechery (Ben Thompson)**
   - **O que olhar:** a marca é a regularidade e a estrutura (artigo semanal aberto + updates pagos), não o visual. Serve
     de contraponto: até onde a forma pode ser simples quando o ritmo editorial é forte.
   - **Status:** verificado (busca), [About](https://stratechery.com/about/). Lição não conferida.
5. **Benedict Evans (ben-evans.com)**
   - **O que olhar:** as apresentações semestrais como peça-âncora da marca. É um ativo grande e raro que organiza o resto.
     Para o Gustavo, o equivalente é o Simulador.
   - **Status:** verificado (busca), [Presentations](https://www.ben-evans.com/presentations).
6. **Simon Willison's Weblog**
   - **O que olhar:** densidade e arquivo. Milhares de posts organizados por tags, e o blog de links ("blogmarks") como
     ritmo diário. A lição é para os hubs dos eixos: uma navegação por tema que aguenta volume.
   - **Status:** verificado (busca), [tags](https://simonwillison.net/tags/).
7. **Frank Chimero**
   - **O que olhar:** ensaios visuais longos na web, em que o texto é o produto e o design só serve a ele, e o tom pessoal
     de um designer-autor.
   - **Status:** verificado (busca), [design.frankchimero.com](http://design.frankchimero.com/info). Lição não conferida.
8. **Gwern.net**
   - **O que olhar:** o aparato de leitura (notas laterais, versaletes, capitulares, popups) como marca. Ver
     especialmente a página de [sidenotes](https://gwern.net/sidenote) e a de [design](https://gwern.net/design), em
     que a tipografia é "o núcleo, e o resto se aplica sobre ela". É modelo para o artigo do Suplemento Dominical.
   - **Status:** verificado (busca).

### Consultor e autor técnico

9. **martinfowler.com**
   - **O que olhar:** como um consultor de arquitetura organiza 30 anos de obra em formatos distintos (artigos longos,
     "bliki" curto). Não é bonito, e a lição é de arquitetura de informação, não de visual: a autoridade vem do arquivo.
   - **Status:** verificado (busca), [Wikipedia](https://en.wikipedia.org/wiki/Martin_Fowler_(software_engineer)).
10. **Ink & Switch**
    - **O que olhar:** ensaios de pesquisa técnica com layout próprio por ensaio (o de
      [local-first](https://www.inkandswitch.com/essay/local-first/) é o clássico), mais um "dispatch" de newsletter. É
      publicação técnica que parece publicação, não blog.
    - **Status:** verificado (busca). Lição não conferida.

### Publicação técnica e de negócio

11. **Increment (Stripe, 2017–2021)**
    - **O que olhar:** uma revista técnica em que **cada edição tem identidade própria dentro de um sistema** (tema por
      edição: Planning, Reliability, Frontend…). É o princípio "cada camada conquista" aplicado a edições.
    - **Status:** verificado (busca), [increment.com](https://increment.com/).
12. **Stripe Press**
    - **O que olhar:** o objeto físico (o livro) traduzido para a web como objeto, com capas renderizadas que se pode
      girar. Mostra como "o mundo é o chão" pode funcionar num site de negócios sem virar SaaS.
    - **Status:** verificado (busca), [press.stripe.com](https://press.stripe.com/).
13. **Works in Progress**
    - **O que olhar:** a mesma publicação em dois registros, digital enxuta e impressa em camadas, "com algo novo a cada
      virada de página". É exatamente o contraste site × camadas que o dono pediu. Repare nas margens ilustradas.
    - **Status:** verificado (busca), [About](https://worksinprogress.co/about/) e o
      [estudo de caso da gráfica](https://www.parkcom.co.uk/case-studies/works-in-progress-business-magazine-printing/).
14. **Rest of World**
    - **O que olhar:** jornalismo de tecnologia com direção de arte premiada (National Magazine Award de design em 2024,
      medalhas da SND), em que cada matéria tem tratamento visual próprio sem perder o sistema.
    - **Status:** verificado (busca), [prêmios](https://restofworld.org/awards-recognition/).
15. **The Pudding**
    - **O que olhar:** ensaios visuais com dado real. É a referência para a Carta Celeste e para mostrar o Simulador como
      prova, em vez de botão.
    - **Status:** verificado (busca), [About](https://pudding.cool/about/).
16. **Every (every.to)**
    - **O que olhar:** uma publicação de IA e negócios que é concorrente direta de atenção da Radar de IA. Olhe o que ela
      faz para não parecer SaaS.
    - **Status:** verificado (busca), existência. **Não verifiquei nada sobre o design dela.**

### Design e edição brasileiros

17. **Nexo Jornal**
    - **O que olhar:** gráfico explicativo brasileiro como linguagem editorial, e a seção de bastidores sobre como os
      gráficos são feitos.
    - **Status:** verificado (busca), [bastidores](https://www.nexojornal.com.br/grafico/2024/03/08/grafico-e-infografico-como-faz-nexo-jornal).
18. **revista piauí**
    - **O que olhar:** a capa ilustrada como editorial (a diretora de arte diz que "as ilustrações de capa são o texto
      editorial") e o logo que muda de cor conforme a ilustração. A identidade aguenta variação.
    - **Status:** verificado (busca), por meio de [artigo acadêmico](https://periodicos.unemat.br/index.php/ccs/article/view/5473)
      e [blog de ilustração](https://ilustracaolivrada.wordpress.com/2017/07/27/por-tras-das-capas-da-revista-piaui/).
      Não consegui abrir o site da revista.
19. **Quatro Cinco Um**
    - **O que olhar:** projeto de Daniel Trench e Celso Longo, que parte das "book reviews" anglo-saxãs, em Financier
      (fonte de leitura longa) e papel Pólen. O site de 2024 é de Paula Carvalho. É o modelo de uma resenha brasileira que
      faz o impresso e o digital conversarem.
    - **Status:** verificado (busca), [Sobre Nós](https://quatrocincoum.com.br/sobre-nos/) e
      [notícia da casa nova](https://quatrocincoum.com.br/noticias/quatro-cinco-um/a-revista-dos-livros-esta-de-casa-nova/).
20. **Ubu Editora / Elaine Ramos estúdio gráfico**
    - **O que olhar:** "um livro cujo design é uma tradução esperta do conteúdo" (Elaine Ramos, na Eye). Cada capa nasce
      do livro. É o critério C3 em forma de catálogo.
    - **Status:** verificado (busca), [Eye Magazine](https://eyemagazine.com/feature/article/elaine-ramos-the-book-designer)
      e [estúdio](https://elaineramos-estudiografico.com.br/Ubu-Editora).
21. **ZUM (Instituto Moreira Salles)**
    - **O que olhar:** uma revista de imagem brasileira em que a imagem tem espaço e o texto tem respiro. É referência
      para quando o quadro aparecer grande.
    - **Status:** verificado (busca), [revistazum.com.br](https://revistazum.com.br/radar/about-zum-and-ims/). Lição não
      conferida.
22. **Plau (fundição, Rio de Janeiro)**
    - **O que olhar:** fontes brasileiras de varejo e sob medida (cliente: Globo). Se o projeto chegar a uma fonte
      própria ou licenciada, comece por aqui antes das fontes saturadas.
    - **Status:** verificado (busca), [plau.design](https://plau.design/en/).
23. **Linha do tempo do design gráfico no Brasil** (Chico Homem de Melo e Elaine Ramos, Cosac Naify, 2011; Jabuti 2012)
    - **O que olhar:** 1.600 imagens de jornais, revistas, capas de disco, cédulas e cartazes brasileiros, de 1808 a 1999.
      É o "catálogo de mundos" brasileiro que faltou no repositório do Impeccable. Senhor, JB, Elenco e Wollner estão lá.
    - **Status:** verificado (busca), [Revista PROJETO](https://revistaprojeto.com.br/acervo/linha-tempo-design-grafico-brasil-16-07-2012/).
24. **Alexandre Wollner** (identidades de Itaú, Eucatex, Metal Leve; a Forminform)
    - **O que olhar:** o programa de identidade como sistema aplicado em tudo, da marca à fachada. É a raiz do Concretismo
      e o argumento de que ele aguenta um site inteiro se virar *programa*, e não só estilo.
    - **Status:** verificado (busca), [Enciclopédia Itaú Cultural](https://enciclopedia.itaucultural.org.br/pessoas/6454-alexandre-wollner).

**Evitados de propósito:** galerias de inspiração de SaaS, templates de "personal brand" e qualquer coisa no visual de
creme + serifa + terracota.

---

## Parte 4: Recomendação

**Fundir e aprofundar.** O Concretismo vira a base de todas as camadas: é a única direção em que a estrutura pertence ao
mundo, e passa em 10 dos 13 critérios. Ele recebe dois reforços da Parte 2. Do Suplemento Dominical: o branco como
régua (sem fios nem caixas nos temas e no vídeo, e o vazado usado uma vez só). Do Reflexo e da janela: o quadro com
papel abaixo do hero, que é o ponto fraco dele hoje (C12). O hero fica em teste A/B: o do Concretismo contra o quadro
inteiro da Evolução.
**Experimento para uma rodada**, na worktree do Concretismo e sem mudar texto: parametrizar o hero (`?hero=evolucao`);
refazer os temas e o vídeo; pôr a janela do quadro na camada do Simulador; entregar quatro capturas (2 heros × antes e
depois) com a tabela da Parte 1 preenchida. Spike opcional: o Reflexo só na camada dos eixos, com o gerador da Pincelada.
