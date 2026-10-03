import { ArrowRight } from 'lucide-react';
import { EIXOS, type EixoId } from '../lib/eixos';

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
 * Seção da home que apresenta os eixos editoriais — cada card diz para quem é o eixo
 * e aponta para o texto mais recente (ou para um projeto, no caso de Bastidores).
 * A página só recebe eixos que têm algo para mostrar.
 */
export function Eixos({ eixos }: EixosProps) {
  if (eixos.length === 0) return null;

  const cols = eixos.length === 3 ? 'md:grid-cols-3' : eixos.length === 2 ? 'md:grid-cols-2' : '';

  return (
    <section aria-labelledby="eixos-title" className="bg-slate-950 py-20 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 id="eixos-title" className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            O que eu escrevo, e para quem
          </h2>
          <p className="font-sans text-slate-300 leading-relaxed">
            Tecnologia e negócio são partes do mesmo sistema — mas cada leitor entra por uma porta.
          </p>
        </div>

        <div className={`grid grid-cols-1 ${cols} gap-6 max-w-5xl mx-auto`}>
          {eixos.map(({ id, destaque, projeto }) => {
            const eixo = EIXOS[id];
            return (
              <article
                key={id}
                className="h-full flex flex-col rounded-xl bg-slate-900/80 border-2 border-orange-500/60 shadow-[0_0_15px_-3px_rgba(249,115,22,0.15)] p-8 transition-all duration-300 hover:border-orange-400 hover:shadow-[0_0_25px_-5px_rgba(249,115,22,0.4)]"
              >
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  <a href={eixo.href} className="hover:text-orange-300 transition-colors">
                    {eixo.label}
                  </a>
                </h3>
                <p className="font-mono text-xs uppercase tracking-wider text-orange-400 mb-4">
                  {eixo.publico}
                </p>
                <p className="font-sans text-slate-300 leading-relaxed mb-6 flex-grow">{eixo.descricao}</p>

                {destaque && (
                  <p className="font-sans text-sm text-slate-400 mb-6">
                    <span className="block font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">
                      Mais recente
                    </span>
                    <a href={destaque.href} className="text-slate-200 hover:text-orange-300 transition-colors">
                      {destaque.title}
                    </a>
                  </p>
                )}

                <a
                  href={destaque ? eixo.href : projeto?.href ?? eixo.href}
                  className="mt-auto inline-flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-wide text-orange-400 hover:text-orange-300 transition-colors"
                >
                  {destaque ? `Ler ${eixo.shortLabel}` : projeto?.label ?? `Ver ${eixo.shortLabel}`}
                  <ArrowRight size={16} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
