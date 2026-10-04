import { ArrowRight } from 'lucide-react';
import { EIXOS } from '../lib/eixos';
import { COR_LINHA, type TrechoLinha } from '../lib/linhas';

/**
 * Mapa da rede: uma linha por eixo, com as estações (textos) mais recentes em ordem
 * de data. Lista semântica por baixo; o desenho do trilho é CSS (.mapa-trilho).
 * No mobile cada linha vira trilho vertical.
 */
export function MapaLinhas({ trechos, nivel = 2 }: { trechos: TrechoLinha[]; nivel?: 2 | 3 }) {
  if (trechos.length === 0) return null;
  const H = nivel === 2 ? 'h2' : 'h3';
  return (
    <ol className="relative grid gap-9 md:gap-11 list-none m-0 p-0">
      {trechos.map(({ eixo, estacoes, total }) => {
        const def = EIXOS[eixo];
        return (
          <li key={eixo} style={{ '--linha': COR_LINHA[eixo] } as React.CSSProperties}>
            <H className="mb-4 md:mb-5">
              <a
                href={def.href}
                className="group inline-flex items-center gap-3 text-[0.95rem] font-extrabold tracking-[0.01em] text-white"
              >
                <span
                  className="inline-flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1 text-brasa"
                  style={{ background: COR_LINHA[eixo] }}
                >
                  <span aria-hidden="true" className="grid place-items-center w-6 h-6 rounded-full bg-noite text-luz text-xs tabular-nums font-bold">
                    {total}
                  </span>
                  {def.label}
                </span>
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="text-nevoa transition-transform group-hover:translate-x-1 group-hover:text-white"
                />
              </a>
            </H>
            <ol className="mapa-trilho">
              {estacoes.map((e) => (
                <li key={e.href} className="min-w-0">
                  <a
                    href={e.href}
                    className="group flex md:flex-col gap-3 md:gap-3.5 py-2 md:py-0 text-left"
                  >
                    <span
                      className="estacao-ponto"
                      aria-hidden="true"
                      {...(e.baldeacao ? { 'data-baldeacao': '' } : {})}
                    />
                    <span className="min-w-0 md:pr-2">
                      <span className="block text-[0.95rem] md:text-[0.9rem] leading-snug font-semibold text-luz group-hover:text-white group-hover:underline decoration-[var(--linha)] decoration-2 underline-offset-4 md:line-clamp-3">
                        {e.title}
                      </span>
                      <span className="block mt-1 text-xs font-medium text-nevoa tabular-nums">
                        <time dateTime={e.isoDate}>{e.date}</time>
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
