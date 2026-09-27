# Skills e plugins desativados — revisão de 2026-09-27

Registro da limpeza de harness feita com `/doctor`. Este arquivo não é carregado automaticamente; serve para decidir o que reativar.

Critério: uso real, não teste funcional. Nenhum item abaixo foi testado nesta revisão; foram desligados porque não tiveram uso (contador de uso do Claude Code + transcrições de 50 sessões, 19–27/09/2026) e ocupavam espaço na lista de skills, que já passava do orçamento, e por isso várias descrições estavam sendo cortadas.

Tudo está em `~/.claude/settings.json` (escopo de usuário, vale para todos os projetos). Nada foi desinstalado.

- **Reativar plugin:** `"enabledPlugins": { "<nome>": true }` ou `/plugin`.
- **Reativar skill:** remover a chave de `"skillOverrides"`.

## Candidatos para produção de conteúdo (reavaliar antes de reativar)

| Item | Tipo | Usos | Por que pode servir ao site | Observação |
|---|---|---|---|---|
| `hyperframes@claude-plugins-official` | plugin (18 skills) | 0 | Vídeos: `faceless-explainer` (explicar um artigo em vídeo), `product-launch-video`, `motion-graphics`, `pr-to-video`, `embedded-captions` | O mais relevante para vídeo; pesado (~2,5k tokens de listagem). Reativar quando for produzir vídeo. |
| `marketing@synced` | plugin sincronizado do claude.ai | 0 | Posts: `content-creation`, `draft-content`, `email-sequence` (newsletter), `seo-audit`, `campaign-plan`, `brand-review` | Genérico de marketing; pode estar superado por uma skill própria com a voz do site (ver `.claude/skills/novo-conteudo`). |
| `product-management@synced` | plugin sincronizado | 0 | `stakeholder-update`, `write-spec` — pouco relação com o site | Provavelmente não. |
| `turnstile-spin` | skill Cloudflare | 0 | Proteção anti-bot se o formulário de newsletter voltar a ter backend próprio | Só se o form sair da landing externa. |

## Sem relação com o site (desligados por falta de uso)

| Item | Tipo | Usos | Nota |
|---|---|---|---|
| `duckdb-skills@claude-plugins-official` | plugin | 1 | Dados/DuckDB — útil em `data-labs`, reativar lá se precisar |
| `claude-code-setup@claude-plugins-official` | plugin | 1 | Recomendador de automações; substituído por `/doctor` |
| `finance@synced`, `data@synced`, `cowork-plugin-management@synced` | plugins sincronizados | 0 | Se o `false` não pegar para os `@synced`, desativar via `/plugin` |
| `cloudflare-one`, `cloudflare-one-migrations` | skills | 0 | Zero Trust/SASE |
| `durable-objects`, `agents-sdk` | skills | 0 / 1 | Workers com estado / Agents SDK |
| `nextjs-on-cloudflare` | skill | 0 | O site é Astro |
| `sandbox-sdk`, `sandbox-stable`, `sandbox-next`, `sandbox-migrate-to-next` | skills | 0 | Cloudflare Sandbox |
| `graphify` | skill | 1 | Grafo de conhecimento; bloco correspondente removido de `~/.claude/CLAUDE.md` |
| `workflow-visual` | skill | 0 | Visualização de `/workflow` no estilo do site |

## Mantidos

`context7`, `frontend-design`, `mattpocock-skills` (plugins); `cloudflare`, `wrangler`, `workers-best-practices`, `web-perf`, `cloudflare-email-service` (skills Cloudflare úteis ao deploy do site).

## Também removido do projeto

- `.mcp.json` (Playwright via Docker): nunca usado, e o container não alcança o `localhost:3001` do host sem ajuste de rede. A verificação visual passa a ser feita com o Claude in Chrome (ou o navegador embutido do app desktop, ou a skill `/run`).
- `.claude/workflows/evolucao-marca-gusflopes.js`: workflow único de rebranding (já executado e revertido); continua no histórico do git.
