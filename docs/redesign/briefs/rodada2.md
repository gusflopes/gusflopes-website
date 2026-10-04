# Rodada 2: refazer o que fica abaixo do hero (comum às 3 branches)

Você vai continuar o trabalho de uma branch de redesign do gusflopes.dev que outro agente construiu na rodada 1. As regras do brief da rodada 1 continuam valendo. Leia o brief inteiro:
`/tmp/claude-0/-home-user-gusflopes-website/3585d3d5-9874-53ce-a9d0-733568287c59/scratchpad/brief-comum.md`

Mantêm-se:
- paleta fixa azul-escuro + laranja;
- quadro e Van Gogh como inspiração;
- copy protegida;
- nada de deploy ou PR;
- skill Impeccable em `.claude/skills/impeccable/`;
- commits com as linhas de coautoria;
- push no fim.

Não toque nas outras worktrees.

## O veredito do dono (é o mandato desta rodada)
> "Mudou o hero, mas o resto continua ruim."

Uma avaliação independente confirmou isso. Na rodada 1, três das quatro branches ficaram com praticamente o MESMO esqueleto abaixo da primeira dobra: as mesmas seções, na mesma ordem, quase todas com o mesmo módulo (título à esquerda + três colunas de texto entre fios), e o fundo alternando de seção em seção como listras. Só o hero e o artigo ganharam a cara da direção.

Esta rodada existe para que a página INTEIRA pertença à direção.

## O que é "o resto"
1. **Home abaixo do hero**, em `src/components/pages/HomePage.tsx`:
   - `Eixos` ("O que eu escrevo, e para quem")
   - `Ferramenta` (Simulador da Reforma)
   - `Themes` ("Engenharia é mais do que código", 5 áreas)
   - `Services` ("Como posso ajudar", 3 ofertas)
   - `LatestContent` ("Ideias recentes" + "Vídeo em Destaque")
   - `Footer`
2. **Hubs:** `/insights`, `/radar`, `/engenharia`, `/negocios`, `/bastidores`, `/newsletter` e a página da edição. Inclui filtros, lista, estado vazio e paginação, se houver.
3. **Fim do artigo:** bloco do autor, newsletter, anterior/próximo, relacionados.
4. **404, privacidade e termos:** só herdam o sistema, mas precisam herdar bem.

## Regras de composição desta rodada
- **Comece pelo conteúdo.** Para cada seção, escreva em 1 linha o trabalho dela para o visitante (ex.: Eixos = "escolher por onde entrar"; Services = "entender o que contratar"; Ferramenta = "experimentar algo agora"). Depois derive uma composição própria daquele trabalho, no idioma da sua direção. Escreva isso no surface brief (`.impeccable/surfaces/...`), nunca no código servido.
- **Proibido repetir módulo.** O módulo "título à esquerda + 3 colunas entre fios" pode aparecer no máximo UMA vez na home inteira. Nenhuma seção pode ser uma "fileira de cards iguais". Duas seções vizinhas não podem ter a mesma estrutura.
- **Ritmo de fundo é decisão, não alternância.** No máximo 3 trocas de campo de cor na home, cada uma justificada pela história. Um campo pode carregar várias seções.
- **Ordem das seções:** pode reordenar (layout, não copy), se a história melhorar. Escreva o porquê no surface brief.
- **Cortes:** pode fundir seções, mas NÃO pode apagar texto. Se uma seção parecer sobrar (ex.: "Ideias recentes" repete o que Eixos já mostra), proponha o corte no relatório e mantenha a seção.
- **Sinal da direção em todas as seções.** A assinatura da direção tem de aparecer em toda a página, não só no hero. Cada seção precisa trazer pelo menos um sinal claro da direção (tipo, material, grade, gesto) e ainda ser lida como o que é.
- **Rótulos acima de título:** o padrão "rótulo curto em caixa-alta acima do título" é proibido pelo Impeccable. Exemplos: "Mais recente", "Casos", "Família", "Sobre o autor", "Erro 404", "Edição #1 · data", "Estratégia · Arquitetura · Fluxo · IA aplicada", "Ferramenta gratuita · Experimento aberto". Leve todos para uma linha de metadados depois do título ou ao lado dele, SEM mudar o texto.
- **Mobile 390px** é composição própria, não a do desktop empilhada.

## Verificação (limitada)
- Rode `pnpm build`.
- Preview na sua porta. Screenshots de `/`, `/insights/`, `/engenharia/`, `/insights/article/agent-skills-pacotes-de-contexto/`, `/radar/`, `/newsletter/`, `/newsletter/radar-semanal-01/`, desktop 1366×900 e mobile 390×844, viewport + página inteira. Sobrescreva `docs/design-review/` e copie `home-desktop.png`/`home-mobile.png` para `.impeccable/review/desktop.png` e `.impeccable/review/mobile.png`.
- Rode o axe-core (`/tmp/claude-0/-home-user-gusflopes-website/3585d3d5-9874-53ce-a9d0-733568287c59/scratchpad/eval/node_modules/axe-core/axe.min.js`, injete via `page.addScriptTag`) nessas páginas e zere as falhas sérias.
- Teste de autocrítica antes de parar: olhe a home inteira no desktop, cubra mentalmente o hero e pergunte: "dá para saber qual direção é esta só pelo resto da página?". Se não der, a rodada não acabou.
- Faça no máximo 2 rounds de inspeção e correção.
- Atualize o `DESIGN.md` e `.impeccable/design.json` para refletir o sistema final.

## Relatório final (curto, em português)
Inclua:
- o que mudou em cada seção e por quê (o trabalho → a composição);
- a ordem final da home;
- o resultado do teste "cubra o hero";
- as falhas do axe;
- cortes propostos e qualquer texto novo a aprovar (em commit `copy(...)` isolado);
- o hash do último commit pushado;
- o que ficou pendente.
