#!/usr/bin/env python3
"""Espelha uma edição da newsletter do repositório de marketing para src/content/newsletter/.
Parte da skill nova-edicao (ver SKILL.md ao lado); rodar a partir da raiz do site.

Uso:
  python3 .claude/skills/nova-edicao/importar.py <pasta-da-edicao> --edicao 1 \\
      --assunto "Modelo bom virou commodity. Contexto não." \\
      --preheader "4 modelos em 9 dias, ..." [--substack-url https://...] [--duracao "6 min"]

<pasta-da-edicao> é algo como
../marketing-brands/gusflopes/content/newsletter/2026-10-03-radar-semanal-01 (tem edicao.md).
A data sai do nome da pasta; o slug do arquivo, do resto do nome. Rodar de novo sobrescreve:
o edicao.md do marketing é a fonte, o site é o espelho.
"""
import argparse
import json
import re
import sys
from pathlib import Path

ap = argparse.ArgumentParser()
ap.add_argument("pasta", type=Path)
ap.add_argument("--edicao", type=int, required=True)
ap.add_argument("--assunto", required=True)
ap.add_argument("--preheader", required=True)
ap.add_argument("--substack-url")
ap.add_argument("--duracao", default="6 min")
args = ap.parse_args()

m = re.match(r"(\d{4}-\d{2}-\d{2})-(.+)", args.pasta.resolve().name)
if not m:
    sys.exit("a pasta precisa se chamar AAAA-MM-DD-<slug>")
data, slug = m.groups()
linhas = (args.pasta / "edicao.md").read_text(encoding="utf-8").splitlines()

# Fora do site: o comentário de instruções, a capa (a página já mostra) e o link final para o próprio site.
if linhas and linhas[0].startswith("<!--"):
    linhas = linhas[1:]
capa = None
for i, linha in enumerate(linhas):
    c = re.match(r"!\[[^\]]*\]\((https://[^)]+)\)$", linha.strip())
    if c:
        capa = c.group(1)
        del linhas[i]
        break
while linhas and (not linhas[-1].strip() or "gusflopes.dev](https://gusflopes.dev" in linhas[-1]):
    linhas.pop()
while linhas and not linhas[0].strip():
    linhas.pop(0)
if not capa:
    sys.exit("edicao.md sem imagem de capa")

fm = {
    "title": args.assunto,
    "excerpt": args.preheader,
    "edicao": args.edicao,
    "date": data,
    "duration": args.duracao,
    "image": capa,
}
if args.substack_url:
    fm["substackUrl"] = args.substack_url
cab = "\n".join(f"{k}: {json.dumps(v, ensure_ascii=False)}" for k, v in fm.items())
destino = Path(__file__).resolve().parents[3] / "src/content/newsletter" / f"{slug}.md"
destino.write_text(f"---\n{cab}\n---\n\n" + "\n".join(linhas) + "\n", encoding="utf-8")
print(destino)
