/**
 * Abertura tipográfica — o sistema concretista que transforma um título em bloco de tipo.
 *
 * Regras determinísticas (mesmo título + mesmo eixo = mesma abertura, sempre):
 * 1. Corte: o título se divide no primeiro ": " (ou " — ", " – ", " - ", " (") em cabeça e cauda.
 *    A cabeça vira o bloco; a cauda vira a linha-fina abaixo dele. O separador fica visível,
 *    em laranja, no fim da última linha do bloco.
 * 2. Liga: palavras curtas (de, e, o, a, para, com…) não terminam linha — grudam na seguinte.
 * 3. Linhas: o número de linhas sai do comprimento da cabeça (1 a 5) e a quebra escolhe a
 *    partição mais equilibrada pelas larguras reais dos glifos (Archivo 900/100, medidas no
 *    build por scripts/gerar-metricas-abertura.mjs).
 * 4. Escala e forma por eixo:
 *    - engenharia → "bloco": cada linha ajustada à largura toda (justificado), alinhado à esquerda;
 *      a última linha vazada.
 *    - negocios → "escada": larguras decrescentes, alinhado à direita; a primeira linha vazada.
 *    - bastidores → "degraus": mesmo corpo em todas as linhas, cada uma recuada um degrau;
 *      a linha do meio vazada.
 *    - newsletter → "bloco", com a última linha vazada.
 *
 * O resultado é só dado (linhas, tamanhos em cqi, recuos); quem desenha é o componente
 * Abertura (site) e o gerador de capa do Substack (docs/substack-kit/gerar-capa.mjs).
 * Sem imports de TypeScript para rodar também direto no Node (type stripping).
 */
import metricas from './abertura-metricas.json' with { type: 'json' };

export type FormaAbertura = 'bloco' | 'escada' | 'degraus';
export type EixoAbertura = 'engenharia' | 'negocios' | 'bastidores' | 'newsletter';

export interface LinhaAbertura {
  texto: string;
  /** Corpo da linha em unidades de cqi (1cqi = 1% da largura do bloco). */
  fit: number;
  /** Recuo à esquerda em cqi (forma "degraus"). */
  recuo: number;
  estilo: 'cheio' | 'vazado';
  /** Largura da linha em em (para quem desenha fora do CSS). */
  largura: number;
}

export interface Abertura {
  forma: FormaAbertura;
  alinhamento: 'start' | 'end';
  linhas: LinhaAbertura[];
  /** Separador mantido no fim da última linha (":" ou "—"), desenhado em laranja. */
  sep?: string;
  cauda?: string;
}

const LIGA = new Set([
  'a', 'à', 'ao', 'as', 'às', 'o', 'os', 'e', 'é', 'de', 'da', 'do', 'das', 'dos', 'em', 'no', 'na',
  'nos', 'nas', 'um', 'uma', 'por', 'para', 'pra', 'com', 'que', 'se', 'sem', 'sua', 'seu', 'meu',
  'the', 'of', 'to', 'and', 'for', 'in', 'on', 'with', 'a', 'an', 'vs', 'x',
]);

const TRACKING = -0.02; // em por glifo, igual ao letter-spacing do CSS
const TETO_CQI = 24; // nenhuma linha passa de 24% da largura do bloco em corpo
const larguras = metricas.larguras as Record<string, number>;

/** Largura em em de um texto já em caixa-alta, na instância de display. */
export function larguraEm(texto: string): number {
  let soma = 0;
  for (const ch of texto) soma += larguras[ch] ?? metricas.padrao;
  return soma / metricas.upm + TRACKING * [...texto].length;
}

const caixaAlta = (s: string) => s.toLocaleUpperCase('pt-BR');

function cortar(titulo: string): { cabeca: string; sep?: string; cauda?: string } {
  const t = titulo.replace(/\s+/g, ' ').trim();
  const doisPontos = t.indexOf(': ');
  if (doisPontos > 0) return { cabeca: t.slice(0, doisPontos), sep: ':', cauda: t.slice(doisPontos + 2) };
  const traco = t.match(/ ([—–-]) /);
  if (traco && traco.index && traco.index > 0) {
    return { cabeca: t.slice(0, traco.index), sep: '—', cauda: t.slice(traco.index + 3) };
  }
  const parentese = t.indexOf(' (');
  if (parentese > 0) return { cabeca: t.slice(0, parentese), cauda: t.slice(parentese + 1) };
  return { cabeca: t };
}

/** Palavras com as ligas aplicadas: "para aprender" vira uma unidade inquebrável. */
function unidades(cabeca: string): string[] {
  const palavras = cabeca.split(' ').filter(Boolean);
  const out: string[] = [];
  let pendente = '';
  palavras.forEach((p, i) => {
    const curta = LIGA.has(p.toLocaleLowerCase('pt-BR')) && i < palavras.length - 1;
    if (curta) {
      pendente = pendente ? `${pendente} ${p}` : p;
      return;
    }
    out.push(pendente ? `${pendente} ${p}` : p);
    pendente = '';
  });
  if (pendente) out.push(pendente);
  return out;
}

function numeroDeLinhas(cabeca: string, total: number): number {
  const n = cabeca.length;
  const alvo = n <= 11 ? 1 : n <= 24 ? 2 : n <= 38 ? 3 : n <= 54 ? 4 : 5;
  return Math.max(1, Math.min(alvo, total));
}

/** Partição em n linhas que minimiza a linha mais larga (desempate: soma dos quadrados). */
function particionar(us: string[], n: number): string[] {
  const w = (a: number, b: number) => larguraEm(caixaAlta(us.slice(a, b).join(' ')));
  let melhor: { max: number; sq: number; cortes: number[] } | null = null;
  const busca = (inicio: number, resta: number, cortes: number[]) => {
    if (resta === 1) {
      const todos = [...cortes, us.length];
      let ant = 0;
      let max = 0;
      let sq = 0;
      for (const c of todos) {
        const lw = w(ant, c);
        max = Math.max(max, lw);
        sq += lw * lw;
        ant = c;
      }
      if (!melhor || max < melhor.max - 1e-6 || (Math.abs(max - melhor.max) < 1e-6 && sq < melhor.sq)) {
        melhor = { max, sq, cortes: todos };
      }
      return;
    }
    for (let c = inicio + 1; c <= us.length - resta + 1; c++) busca(c, resta - 1, [...cortes, c]);
  };
  busca(0, n, []);
  const linhas: string[] = [];
  let ant = 0;
  for (const c of (melhor as { cortes: number[] } | null)?.cortes ?? [us.length]) {
    linhas.push(us.slice(ant, c).join(' '));
    ant = c;
  }
  return linhas;
}

const FORMA: Record<EixoAbertura, FormaAbertura> = {
  engenharia: 'bloco',
  negocios: 'escada',
  bastidores: 'degraus',
  newsletter: 'bloco',
};

const arred = (x: number) => Math.round(x * 100) / 100;

export function abertura(titulo: string, eixo: EixoAbertura = 'engenharia'): Abertura {
  const { cabeca, sep, cauda } = cortar(titulo);
  const us = unidades(cabeca);
  const n = numeroDeLinhas(cabeca, us.length);
  const textos = particionar(us, n);
  const forma = FORMA[eixo];
  // A largura medida inclui o separador na última linha, para ele caber no ajuste.
  const medidas = textos.map((t, i) => larguraEm(caixaAlta(i === textos.length - 1 && sep ? t + sep : t)));
  // margem de 3% para kerning e arredondamento do navegador
  const util = 97;

  let linhas: LinhaAbertura[];
  if (forma === 'bloco') {
    linhas = medidas.map((m, i) => ({
      texto: textos[i],
      fit: arred(Math.min(util / m, TETO_CQI)),
      recuo: 0,
      estilo: n > 1 && i === n - 1 ? 'vazado' : 'cheio',
      largura: m,
    }));
  } else if (forma === 'escada') {
    linhas = medidas.map((m, i) => {
      const fracao = n === 1 ? 1 : 1 - i * (n === 2 ? 0.28 : 0.42 / (n - 1));
      return {
        texto: textos[i],
        fit: arred(Math.min((util * fracao) / m, TETO_CQI)),
        recuo: 0,
        estilo: n > 1 && i === 0 ? 'vazado' : 'cheio',
        largura: m,
      };
    });
  } else {
    const degrau = n > 1 ? Math.min(8, 24 / (n - 1)) : 0;
    const recuos = medidas.map((_, i) => i * degrau);
    const corpo = Math.min(TETO_CQI, ...medidas.map((m, i) => (util - recuos[i]) / m));
    const meio = Math.floor(n / 2);
    linhas = medidas.map((m, i) => ({
      texto: textos[i],
      fit: arred(corpo),
      recuo: arred(recuos[i]),
      estilo: n > 1 && i === meio ? 'vazado' : 'cheio',
      largura: m,
    }));
  }

  return { forma, alinhamento: forma === 'escada' ? 'end' : 'start', linhas, sep, cauda };
}
