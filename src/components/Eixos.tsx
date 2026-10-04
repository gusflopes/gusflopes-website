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
 * Seção da home que apresenta os eixos editoriais — três portas lado a lado, separadas por
 * fio, cada uma dizendo para quem é e apontando para o texto mais recente (ou para um projeto,
 * no caso de Bastidores). A página só recebe eixos que têm algo para mostrar.
 */
export function Eixos({ eixos }: EixosProps) {
  if (eixos.length === 0) return null;

  const cols = eixos.length === 3 ? 'md:grid-cols-3' : eixos.length === 2 ? 'md:grid-cols-2' : '';

  return (
    <section aria-labelledby="eixos-title" className="bg-noite pt-20 md:pt-28 pb-20 md:pb-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end mb-14 md:mb-16">
          <h2 id="eixos-title" className="font-serif text-[2.125rem] md:text-5xl leading-[1.08] tracking-[-0.012em] text-white">
            O que eu escrevo, e para quem
          </h2>
          <p className="font-sans text-lg leading-relaxed text-nevoa max-w-[34rem] lg:justify-self-end">
            Tecnologia e negócio são partes do mesmo sistema — mas cada leitor entra por uma porta.
          </p>
        </div>

        <div className={`grid grid-cols-1 ${cols} border-t border-noite-fio-forte`}>
          {eixos.map(({ id, destaque, projeto }, i) => {
            const eixo = EIXOS[id];
            return (
              <article
                key={id}
                className={`group relative flex flex-col pt-8 pb-10 md:pb-2 md:px-8 border-b md:border-b-0 border-noite-fio ${
                  i > 0 ? 'md:border-l' : 'md:pl-0'
                } ${i === eixos.length - 1 ? 'md:pr-0' : ''}`}
              >
                {/* Fio laranja que acende sobre a régua ao passar o mouse */}
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 right-0 h-px bg-laranja origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-saida)] group-hover:scale-x-100 group-focus-within:scale-x-100"
                />
                <h3 className="font-serif text-[1.75rem] leading-tight text-white mb-3">
                  <a href={eixo.href} className="hover:text-laranja-palido transition-colors">
                    {eixo.label}
                  </a>
                </h3>
                <p className="font-sans text-[0.9375rem] font-semibold text-laranja-claro mb-4">{eixo.publico}</p>
                <p className="font-sans text-nevoa leading-relaxed mb-8 flex-grow">{eixo.descricao}</p>

                {destaque && (
                  <p className="mb-7">
                    <span className="rotulo block text-nevoa-2 mb-2">Mais recente</span>
                    <a
                      href={destaque.href}
                      className="font-serif text-lg leading-snug text-white underline decoration-noite-fio-forte underline-offset-[0.22em] hover:decoration-laranja transition-colors"
                    >
                      {destaque.title}
                    </a>
                  </p>
                )}

                <a
                  href={destaque ? eixo.href : projeto?.href ?? eixo.href}
                  className="acao mt-auto self-start text-laranja decoration-laranja/50 hover:decoration-laranja"
                >
                  {destaque ? `Ler ${eixo.shortLabel}` : projeto?.label ?? `Ver ${eixo.shortLabel}`}
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
