import { ArrowRight } from 'lucide-react';
import { EIXOS, type EixoId } from '../lib/eixos';
import { COR_LINHA } from '../lib/linhas';

export interface EixoResumo {
  id: EixoId;
  /** Texto mais recente do eixo, se houver. */
  destaque?: { title: string; href: string };
  /** Link alternativo quando o eixo ainda não tem texto (ex.: projeto em produção). */
  projeto?: { label: string; href: string };
}

interface EixosProps {
  eixos: EixoResumo[];
}

/**
 * Quadro de linhas (sobre o papel): cada eixo é uma linha que atravessa a página na sua
 * cor, com o público, a descrição e o texto mais recente. A página só recebe eixos que
 * têm algo para mostrar.
 */
export function Eixos({ eixos }: EixosProps) {
  if (eixos.length === 0) return null;

  return (
    <section aria-labelledby="eixos-title" className="papel bg-papel text-tinta py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-14 max-w-2xl">
          <h2 id="eixos-title" className="text-3xl md:text-[2.6rem] leading-[1.08] font-extrabold tracking-[-0.02em] text-noite mb-4">
            O que eu escrevo, e para quem
          </h2>
          <p className="font-serif text-lg leading-relaxed text-tinta-2">
            Tecnologia e negócio são partes do mesmo sistema — mas cada leitor entra por uma porta.
          </p>
        </div>

        <ul className="list-none m-0 p-0 grid gap-12 md:gap-14">
          {eixos.map(({ id, destaque, projeto }) => {
            const eixo = EIXOS[id];
            const cor = COR_LINHA[id];
            return (
              <li key={id} className="relative pt-7">
                {/* a linha atravessa a página, com a estação terminal à esquerda */}
                <span aria-hidden="true" className="absolute left-0 right-0 top-0 h-1.5 rounded-full" style={{ background: cor }} />
                <span aria-hidden="true" className="absolute -top-[5px] left-0 w-4 h-4 rounded-full bg-papel border-[3px] border-noite" />

                <article className="grid md:grid-cols-12 gap-x-10 gap-y-5">
                  <div className="md:col-span-4">
                    <h3 className="text-2xl md:text-[1.7rem] font-extrabold tracking-[-0.015em] text-noite">
                      <a href={eixo.href} className="hover:underline decoration-2 underline-offset-[6px]" style={{ textDecorationColor: cor }}>
                        {eixo.label}
                      </a>
                    </h3>
                    <p className="mt-2 text-[0.95rem] font-semibold leading-snug text-tinta">{eixo.publico}</p>
                  </div>

                  <p className="md:col-span-4 font-serif text-[1.05rem] leading-relaxed text-tinta-2">{eixo.descricao}</p>

                  <div className="md:col-span-4 flex flex-col gap-4">
                    {destaque && (
                      <p className="text-sm text-tinta-2">
                        <span className="block text-xs font-bold uppercase tracking-[0.1em] text-tinta-2 mb-1.5">
                          Mais recente
                        </span>
                        <a href={destaque.href} className="text-base font-semibold leading-snug text-noite hover:text-laranja-fundo">
                          {destaque.title}
                        </a>
                      </p>
                    )}
                    <a
                      href={destaque ? eixo.href : projeto?.href ?? eixo.href}
                      className="mt-auto inline-flex items-center gap-2 self-start text-sm font-bold uppercase tracking-[0.06em] text-laranja-fundo hover:text-noite transition-colors"
                    >
                      {destaque ? `Ler ${eixo.shortLabel}` : projeto?.label ?? `Ver ${eixo.shortLabel}`}
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
