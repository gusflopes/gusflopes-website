#!/usr/bin/env bash
# Portão do deploy de produção (B3, decisão do Gustavo em 16/11/2026). Usado por .github/workflows/deploy.yml.
#
# Libera o deploy do main quando cada commit (na linha principal, --first-parent) desde o último deploy feito
#   (a) mexe só em src/content/**  — o que o agente de marketing publica (scripts/site-publish.sh no mkt-agent), ou
#   (b) veio do Gustavo: autor com e-mail em DEPLOY_AUTORES e sem o trailer "Co-Authored-By: Claude".
# Mudança de código feita com ajuda do Claude entra por merge do Gustavo (o commit de merge é dele) ou por deploy manual.
#
# Limite conhecido: autor de commit e trailer são convenção (o token do agente é da conta do Gustavo). A barreira
# dura é o ruleset do main e o site-publish.sh, que recusa push fora de src/content/**.
#
# Uso: deploy-liberado.sh <commit-base|""> [head]   → sai 0 (liberado) ou 1 (recusado), com o motivo no log.
set -euo pipefail

base="${1:-}"
head="${2:-HEAD}"
autores=" ${DEPLOY_AUTORES:-gustavo@gusflopes.dev gusflopes86@gmail.com} "

# Sem base conhecida (primeiro deploy, histórico reescrito): olha só o commit do topo.
if [[ -z "$base" || "$base" =~ ^0+$ ]] || ! git cat-file -e "${base}^{commit}" 2>/dev/null || ! git merge-base --is-ancestor "$base" "$head"; then
  echo "base do último deploy indisponível ($base); conferindo só o commit $head"
  commits=$(git rev-parse "$head")
else
  commits=$(git rev-list --first-parent "${base}..${head}")
fi

if [[ -z "$commits" ]]; then
  echo "nada novo desde o último deploy ($base); liberado (redeploy do mesmo commit)"
  exit 0
fi

recusados=0
for c in $commits; do
  curto=$(git rev-parse --short "$c")
  if git rev-parse -q --verify "${c}^1" >/dev/null; then
    arquivos=$(git diff --name-only "${c}^1" "$c")
  else
    arquivos=$(git show --name-only --format= "$c")
  fi
  fora=$(printf '%s\n' "$arquivos" | grep -v '^src/content/' | grep -v '^$' || true)
  if [[ -z "$fora" ]]; then
    echo "ok   $curto só src/content/**"
    continue
  fi
  email=$(git log -1 --format=%ae "$c")
  if [[ "$autores" == *" $email "* ]] && ! git log -1 --format=%B "$c" | grep -qi '^co-authored-by: claude'; then
    echo "ok   $curto do Gustavo ($email)"
    continue
  fi
  echo "NÃO  $curto de $email mexe fora de src/content/**:"
  printf '       %s\n' $fora
  recusados=$((recusados + 1))
done

if (( recusados > 0 )); then
  echo "::error::Deploy recusado: $recusados commit(s) mexem fora de src/content/** e não são do Gustavo. Faça o merge/commit pela sua conta (sem trailer do Claude) ou rode o deploy manual (pnpm run deploy)."
  exit 1
fi
echo "deploy liberado"
