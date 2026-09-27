---
title: "Refazendo meu site com coding agents: de um export do Figma a Astro"
excerpt: "Os bastidores da migração deste site: de um export do Figma Make em Vite e React para Astro 6 com Content Collections na Cloudflare, feita com um coding agent numa noite de abril. O plano em fases, o que o agente acertou, onde errou e o que precisou de mão humana."
date: "2026-05-04"
duration: "8 min"
category: "Casos"
eixo: "bastidores"
tags: ["claude-code", "astro", "cloudflare", "figma"]
image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1080&q=80"
---

Este site tinha um problema que muita empresa conhece: ele era bonito e não funcionava direito.

A versão que estava no ar desde dezembro de 2025 veio de um export do **Figma Make**. O README gerado dizia, com honestidade, que aquilo era "um code bundle" do projeto no Figma. Era um app React com Vite, roteado no navegador por React Router, com componentes do shadcn/ui e fotos do Unsplash. Visualmente, era o que eu queria. Por dentro, tinha as marcas típicas de código gerado para protótipo:

- todo artigo mostrava **o mesmo texto** sobre Domain-Driven Design, qualquer que fosse o link clicado;
- o botão de copiar código mudava para "copiado" sem copiar nada;
- os formulários de newsletter não tinham para onde enviar;
- os ícones de redes sociais apontavam para `#`;
- o CSS era um arquivo de 39 KB já compilado, e os imports tinham versão no nome (`vaul@1.1.2`) por herança do export.

Em 26 de abril de 2026 resolvi refazer a base com um coding agent, o Claude Code com o Opus 4.7. Este texto é o relato daquela noite, montado a partir do histórico do git.

## Primeiro tropeço: Pages ou Worker?

Antes de mexer no framework, tirei o site do GitHub Pages e levei para a Cloudflare. O agente fez a migração para **Cloudflare Pages** às 19h01. Seis minutos depois veio a correção: o projeto que eu tinha criado no painel era um **Worker**, não um projeto do Pages. Sem um `wrangler.jsonc` explícito, o deploy tentava se autoconfigurar, injetava um plugin no `vite.config.ts` e quebrava o build com o lockfile congelado. A saída foi declarar o Worker com Static Assets e deixar o fallback de SPA na própria configuração.

É um erro pequeno e instrutivo. O agente partiu de uma suposição razoável (site estático → Pages), e a realidade estava num painel que ele não via. Coding agent não enxerga o que está fora do repositório. Quem enxerga é você.

## A migração em cinco fases (e uma que ficou de fora)

A migração seguiu um plano em fases, cada uma com commit próprio, e o build rodando no fim de cada uma:

1. **Astro como casca** (19h40). O Astro substituiu o Vite como ferramenta de build, mas o site continuou sendo o mesmo SPA React montado numa página só. Nenhum componente mudou. É o passo mais chato e o mais seguro.
2. **Uma página por rota** (20h03). Cada rota virou um arquivo `.astro`, e os componentes React viraram *islands* que recebem os dados por props. O React Router saiu das dependências.
3. **Content Collections** (20h08). Os artigos, que eram arrays escritos direto nos componentes, viraram arquivos markdown com frontmatter validado por schema Zod. Se um artigo tem data em formato errado, o build falha.
4. **Tailwind 4 a partir do código-fonte** (20h05; a ordem dos commits não é a do plano). O CSS pré-compilado de 39 KB deu lugar a umas 30 linhas de fonte com o tema, e o Tailwind passou a gerar só as classes usadas. O CSS final ficou do mesmo tamanho, cerca de 110 KB minificado, mas agora ele nasce do código, e não de um export.
5. **Limpeza** (20h10). Saíram pasta de build versionada, imagens soltas e imports `figma:asset/*`.

A **fase 6**, renderização no servidor, ficou de fora de propósito. O argumento registrado no próprio repositório é bom: o site era 100% conteúdo estático, e ligar SSR traria adaptador no bundle, *cold start* no Worker e uma camada de runtime para manter, sem nenhum benefício. A fase só faria sentido quando houvesse um formulário de verdade para processar.

Também ficou para depois a limpeza dos imports com versão no nome, que tocaria uns 45 arquivos de componentes de UI. A avaliação foi que o ganho não justificava o risco naquela noite. Concordo: uma migração não é hora de fazer faxina em arquivo que ninguém está usando.

O pull request da migração foi mergeado às 21h01.

## Como o agente validou o próprio trabalho

A validação não foi só "o build passou". O agente abriu as sete rotas num Chrome controlado via MCP (o Chrome DevTools MCP), conferiu o console e comparou o visual com o site anterior. O registro da migração diz: console limpo, visual idêntico.

O mais útil foi o que ele encontrou navegando. O documento de próximos passos saiu com onze itens, em ordem de criticidade, e os primeiros eram exatamente os problemas da lista lá de cima: o artigo fixo, a rota de insights sem id, o botão de copiar que não copiava, os formulários sem destino, a paginação decorativa. Eu conhecia alguns deles. Outros, não.

## Do "migrado" ao "pronto": seis ondas

Com a base no lugar, a pergunta mudou de "funciona?" para "está pronto para receber gente?". Às 21h38 eu mesmo adicionei o `DESIGN.md`, com a identidade visual escrita (cores, tipografia, modos claro e escuro), para o agente ter uma referência que não fosse o próprio código.

Às 22h30 saiu um documento de *launch readiness* com seis ondas e um critério de passagem entre elas, para o site nunca regredir de uma onda para outra: fundação técnica (SEO, favicon, sitemap, render de artigos), captura de leads, páginas de produto para cursos e mentoria, conteúdo inicial, polimento e pós-lançamento.

Uma decisão desse documento contradiz a fase 6, e é bom que contradiga. Para a newsletter, escolhi guardar os leads comigo, em D1 na Cloudflare, com envio pelo Resend, em vez de usar um provedor hospedado. O motivo registrado é querer controle dos dados para usar com IA depois (segmentação, análise, automação). Com isso, a renderização no servidor, que o agente tinha recusado horas antes por falta de caso de uso, ganhou um caso de uso real. O argumento anterior continuava correto; a premissa é que mudou.

## Estimativas de humano, velocidade de agente

O documento estimava de um a dois dias de trabalho para a primeira onda, dois a três para a segunda e um para a terceira. O plano da primeira onda ficou pronto às 22h42. Os commits das ondas 1 a 5 vão das 22h50 às 23h29.

Isso não quer dizer que cinco ondas ficaram prontas em quarenta minutos. Quer dizer que o código de cinco ondas foi escrito em quarenta minutos. O resto continuou comigo:

- **Contas e segredos.** A onda de leads deixou os IDs do D1 e do KV como pendência e escreveu as instruções para eu criar o banco, o namespace e o secret do Resend. O agente não cria conta, não aceita termo de serviço e não deveria ver chave de produção.
- **Conteúdo.** A onda de conteúdo entregou a estrutura: rota dinâmica, templates de frontmatter e um artigo de teste para validar o pipeline. Os artigos reais, avisa o commit, são comigo. A estimativa dessa onda era "uma semana de produção real", e continua sendo.
- **Revisão.** Cada onda ficou numa branch própria, empilhada sobre a anterior. Hoje, 04/05, as cinco continuam esperando revisão.

O gargalo saiu da digitação e foi para a revisão, para as decisões e para o conteúdo. E isso não é defeito do processo. É o processo.

## O que eu levo disso

Três coisas, para quem está pensando em fazer o mesmo com um sistema da empresa:

1. **Fases pequenas com build no fim de cada uma.** A primeira fase não mudou nada visível, e é por isso que ela é boa. Se algo quebrasse na fase 3, eu voltava para a 2 sem drama.
2. **Peça ao agente para escrever o que ele decidiu não fazer.** A nota sobre a fase 6 e a sobre os imports me pouparam uma discussão comigo mesmo semanas depois.
3. **O que está fora do repositório é responsabilidade sua.** Painel da Cloudflare, contas, segredos, identidade visual, o que o site deve dizer. O agente trabalha muito bem dentro da caixa. A caixa é você que desenha.

[CONFIRMAR: uma frase sua sobre como foi a experiência — se surpreendeu, frustrou, ou as duas coisas.]
