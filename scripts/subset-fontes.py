#!/usr/bin/env python3
"""
Gera as fontes do site em src/assets/fonts/ a partir dos arquivos latinos do @fontsource-variable.

Por quê: o artigo baixava ~293 KB de fonte (Literata normal + itálico completos, Hanken, Mono).
Aqui cada fonte é recortada para o português (latim básico + Latin-1 + pontuação tipográfica,
setas e €) e o eixo de peso fica só no intervalo usado:
  - Literata (opsz 7–72 inteiro, wght 400–700)            ~75 KB
  - Literata itálico (opsz 7–72, peso fixo 400)            ~43 KB  (só baixa se a página usa itálico)
  - Hanken Grotesk (wght 400–700)                          ~20 KB
  - JetBrains Mono (peso fixo 400, + desenho de caixas)    ~20 KB  (só baixa se há código)

Uso:  pip install fonttools brotli && python3 scripts/subset-fontes.py
"""
import io
import os
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FS = os.path.join(RAIZ, 'node_modules', '@fontsource-variable')
OUT = os.path.join(RAIZ, 'src', 'assets', 'fonts')

PT = ('U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2013-2014,'
      'U+2018-201A,U+201C-201E,U+2022,U+2026,U+2032-2033,U+2039-203A,U+20AC,U+2122,'
      'U+2190-2193,U+2212')
BASE = ['kern', 'liga', 'ccmp', 'locl', 'mark', 'mkmk', 'rvrn']


def gerar(origem, destino, eixos, extras=(), unicodes=PT):
    fonte = TTFont(os.path.join(FS, origem))
    fonte = instancer.instantiateVariableFont(fonte, eixos)
    # Recarrega do zero: o subsetter não lida com o gvar preguiçoso logo após o instancer.
    buf = io.BytesIO()
    fonte.flavor = None
    fonte.save(buf)
    buf.seek(0)
    fonte = TTFont(buf, lazy=False)
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = BASE + list(extras)
    opts.name_IDs = ['*']
    opts.hinting = False
    opts.desubroutinize = True
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=subset.parse_unicodes(unicodes))
    sub.subset(fonte)
    caminho = os.path.join(OUT, destino)
    subset.save_font(fonte, caminho, opts)
    print(f'{destino}: {os.path.getsize(caminho) / 1024:.1f} KB')


os.makedirs(OUT, exist_ok=True)
gerar('literata/files/literata-latin-opsz-normal.woff2', 'literata-opsz.woff2',
      {'wght': (400, 700)}, ['tnum', 'lnum', 'pnum', 'onum'])
gerar('literata/files/literata-latin-opsz-italic.woff2', 'literata-opsz-italico.woff2',
      {'wght': 400})
gerar('hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2', 'hanken-grotesk.woff2',
      {'wght': (400, 700)}, ['tnum', 'lnum'])
gerar('jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2', 'jetbrains-mono.woff2',
      {'wght': 400}, ['calt'], PT + ',U+2500-257F,U+25A0-25FF')
