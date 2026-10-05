---
name: novo-conteudo
description: Cria ou revisa um artigo do gusflopes.dev (Radar ou Insights, em um dos eixos Engenharia & IA, Negócios ou Bastidores) com frontmatter validado e a linha editorial do site. Use ao escrever, revisar ou publicar conteúdo.
---

# Novo conteúdo

## Linha editorial

- **Engenharia & IA** e **Negócios**: informativo e impessoal. Nada de "testei", "no meu projeto" ou caso de cliente. Opinião de autor ("a regra que eu seguiria") pode ficar. Poucos textos, escolhidos como referência que envelhece devagar; crônica de lançamento não entra.
- **Bastidores**: o único eixo pessoal, com foco em entender e ensinar IA: a série com o filho, o homelab, o próprio site e a campanha da Reforma Tributária (landing, servidor MCP multiusuário, contexto para agentes, criativos com IA, ensinar gente a usar IA numa dúvida real). Conte pelo que ensina, não como vitrine. Outros projetos paralelos (CalcJud, hublaw…) só com aval.
- Relato pessoal nunca é inventado: em Bastidores, o que depende de lembrança do Gustavo fica como `[CONFIRMAR: pergunta]` até ele responder. Fora de Bastidores não se usa esse marcador — o texto é factual.
- Sem anacronismo: nada citado antes de existir na data do artigo (`docs/pesquisa/linha-do-tempo-ia.md`).
- Fatos e números com fonte e link; pesquisas diferentes não se comparam como se medissem a mesma coisa.
- Advocacia e contabilidade: tom de parceiro, recomendação condicional, ética OAB (Provimento 205/2021).
- pt-BR, voz de arquiteto sênior pragmático.

## Arquivo

- Insights (autoral): `src/content/insights/<slug>.md`. Radar (curadoria ou nota curta): `src/content/radar/<slug>.md`.
- `<slug>` em kebab-case; vira a rota `/insights/article/<slug>` ou `/radar/article/<slug>`.
- Schema, enums de `category` e regras de `tags` em `src/content.config.ts`; eixos em `src/lib/eixos.ts`. É a fonte de verdade — `pnpm build` falha se o frontmatter não bater.
- Data futura é permitida: o artigo fica fora do build de produção até um deploy feito na data (`src/lib/publicado.ts`), mas aparece no `pnpm dev`.

### Insights

```markdown
---
title: "..."
excerpt: "..."
date: "YYYY-MM-DD"
duration: "N min"
category: "Arquitetura"      # ver enum em src/content.config.ts
eixo: "engenharia"           # engenharia | negocios | bastidores
tags: ["mcp", "claude-code"] # kebab-case minúsculo
image: "https://..."
---
```

### Radar

Mesmos campos, mais `type` (`article` | `video`), `isExternal`, `link` e `source`.
- `isExternal: false` → o build gera `/radar/article/<slug>` com o corpo; `link` aponta para ela e `source: "Local"`.
- `isExternal: true` → o card leva ao `link` externo; `source` = nome do veículo.

Imagem: a capa exibida no site, o OG e a margem pintada são **gerados no build a partir do slug** (`scripts/tela/`); não procure foto. O campo `image` continua obrigatório no schema e fica só como dado: use uma URL real e estável (Unsplash com `?auto=format&fit=crop&w=1080&q=80`). Como o slug é a semente da capa, escolha-o bem antes de publicar: trocar o slug troca a capa. Links externos reais e verificados.

## Antes de commitar

`pnpm build` e conferir a página em `http://localhost:3001`. Rascunhos fora do site ficam em `docs/rascunhos/`.
