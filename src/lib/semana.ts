/**
 * Semana ISO (segunda a domingo) a partir de datas ISO "YYYY-MM-DD" — agrupa as notícias e dá o
 * endereço da análise da semana. Funções puras, sem fuso: a data do frontmatter já é a data local.
 */

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'] as const;

const utc = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};
const iso = (dt: Date) => dt.toISOString().slice(0, 10);

/** "2026-11-16" → "2026-W47" (semana ISO 8601). */
export function semanaIso(data: string): string {
  const dt = utc(data);
  const dia = dt.getUTCDay() || 7;
  dt.setUTCDate(dt.getUTCDate() + 4 - dia); // a quinta da semana decide o ano
  const ano = dt.getUTCFullYear();
  const n = Math.ceil(((dt.getTime() - Date.UTC(ano, 0, 1)) / 86400000 + 1) / 7);
  return `${ano}-W${String(n).padStart(2, '0')}`;
}

/** Segunda e domingo de uma semana ISO ("2026-W47" → 2026-11-16 a 2026-11-22). */
export function intervaloSemana(semana: string): { inicio: string; fim: string } {
  const [ano, n] = semana.split('-W').map(Number);
  const jan4 = new Date(Date.UTC(ano, 0, 4));
  const segunda = new Date(jan4);
  segunda.setUTCDate(jan4.getUTCDate() - ((jan4.getUTCDay() || 7) - 1) + (n - 1) * 7);
  const domingo = new Date(segunda);
  domingo.setUTCDate(segunda.getUTCDate() + 6);
  return { inicio: iso(segunda), fim: iso(domingo) };
}

/** "2026-W47" → "16 a 22 Nov 2026" (ou "30 Nov a 6 Dez 2026" quando a semana vira o mês). */
export function rotuloSemana(semana: string): string {
  const { inicio, fim } = intervaloSemana(semana);
  const [, m1, d1] = inicio.split('-').map(Number);
  const [y2, m2, d2] = fim.split('-').map(Number);
  return m1 === m2 ? `${d1} a ${d2} ${MESES[m2 - 1]} ${y2}` : `${d1} ${MESES[m1 - 1]} a ${d2} ${MESES[m2 - 1]} ${y2}`;
}

/** Segmento de URL da semana: "2026-W47" → "2026-w47". */
export const slugSemana = (semana: string) => semana.toLowerCase();

/** "2026-11-04" → "04/11" (o "conforme publicado em … em dd/mm" das notícias). */
export function diaMes(data: string): string {
  const [, m, d] = data.split('-');
  return `${d}/${m}`;
}
