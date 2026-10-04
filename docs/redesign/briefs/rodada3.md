# Rodada 3 (comum às 3 branches)

As regras dos briefs anteriores continuam valendo. Leia os dois:
- `/tmp/claude-0/-home-user-gusflopes-website/3585d3d5-9874-53ce-a9d0-733568287c59/scratchpad/brief-comum.md`
- `/tmp/claude-0/-home-user-gusflopes-website/3585d3d5-9874-53ce-a9d0-733568287c59/scratchpad/brief-rodada2.md`

O que segue valendo:
- paleta fixa azul-escuro + laranja;
- copy protegida;
- sem deploy, sem PR;
- skill Impeccable;
- commits com coautoria;
- push da branch no fim.

Não crie tags: o orquestrador cuida delas. Não toque nas outras worktrees.

## O que o dono disse depois da rodada 2 (é o mandato)
> "Em geral, me parece que o hero acertou em cheio, mas, no resto da página, a que mais acerta a direção é o Concretismo; as demais meio que perdem o charme. Na minha visão: **o hero prende a atenção, depois cada uma das camadas conquista.**"

Cada seção abaixo do hero é uma camada que precisa conquistar o leitor sozinha. Ela tem que ter um gesto próprio, forte e comprometido com a direção. Não basta estar "organizada e coerente".

O que o Concretismo faz de certo, e que serve de régua para as outras (o princípio, não a aparência):
- toda camada tem um movimento visual inconfundível da própria direção;
- a composição nasce do conteúdo;
- o leitor sente que entrou num lugar novo a cada camada, sem sair do mesmo mundo.

## Decisões do dono, já aprovadas (aplique)
1. **Fundir "Ideias recentes" nos eixos.** A seção "Ideias recentes" deixa de existir como lista separada, porque repetia os textos "Mais recente" de cada eixo. O título "Ideias recentes" pode sair; isso está aprovado. O conteúdo mais recente fica nos eixos. O "Vídeo em Destaque" continua: realoque-o numa camada que faça sentido e mantenha o texto dele. Se o eixo precisar mostrar mais de um texto para não perder conteúdo, faça.
2. **Os commits de copy isolados da rodada 2 estão aprovados.** Na Evolução, links de ação em caixa normal (68b9f27). No Concretismo, data nas linhas (8e30f5e). Não reverta.
3. **A caixa da newsletter no fim de todo artigo fica.**
4. Navegação anterior/próximo ou "Leia também" no fim do artigo continua fora do escopo, porque precisaria de texto novo.

## Verificação (limitada, como na rodada 2)
- `pnpm build` precisa passar.
- **Screenshots:** antes de cada full-page, force `loading="eager"` em todas as `img`, role até o fim e espere `img.complete`. Sem isso as imagens lazy saem em branco, e a revisão anterior foi recusada justamente por isso.
  - Rotas: `/`, `/insights/`, `/engenharia/`, `/insights/article/agent-skills-pacotes-de-contexto/`, `/radar/`, `/newsletter/`, `/newsletter/radar-semanal-01/`.
  - Tamanhos: desktop 1366×900 e mobile 390×844, viewport + página inteira, em `docs/design-review/`.
  - Copie `home-desktop.png`/`home-mobile.png` para `.impeccable/review/`.
- **Acessibilidade:** zero falhas sérias no axe-core. O arquivo está em `/tmp/claude-0/-home-user-gusflopes-website/3585d3d5-9874-53ce-a9d0-733568287c59/scratchpad/eval/node_modules/axe-core/axe.min.js`.
- **Teste do dono, antes de parar:** role a home inteira camada por camada e pergunte de cada uma: "isto conquista sozinho, ou só está organizado?". Camada que só está organizada não está pronta.
- Faça no máximo 2 rounds de inspeção e correção.
- Atualize `DESIGN.md`, `.impeccable/design.json` e o surface brief.

## Relatório final (curto)
- O gesto de cada camada.
- A ordem final da home.
- O resultado do teste "conquista ou só organizado".
- O que mudou por causa das decisões aprovadas.
- Falhas no axe.
- Hash do último commit pushado.
- O que ficou pendente.
