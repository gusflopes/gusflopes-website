import { ArrowRight } from 'lucide-react';
import { EIXOS, type EixoId } from '../lib/eixos';
import { telaPortas } from '../lib/telas';
import { TelaPicture } from './TelaPicture';

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
 * "Escolher por onde entrar": uma tela alta (plano aberto vertical, semente própria) ao lado de
 * três portas em lista. Cada porta é uma linha: o eixo em Literata grande e, ao lado, para quem é,
 * o que tem e o texto mais recente. A página só recebe eixos com algo para mostrar.
 */
export function Eixos({ eixos }: EixosProps) {
  if (eixos.length === 0) return null;

  return (
    <section aria-labelledby="eixos-title" className="bg-noite px-4 md:px-6 pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-12 lg:gap-14">
        <figure className="lg:col-span-5 lg:order-last" aria-hidden="true">
          <div className="lg:sticky lg:top-24">
            <div className="h-40 md:h-56 lg:h-auto lg:aspect-[11/17] overflow-hidden">
              <TelaPicture tela={telaPortas()} sizes="(min-width: 1024px) 36vw, 100vw" />
            </div>
            <span className="fio block" />
          </div>
        </figure>

        <div className="lg:col-span-7">
          <h2 id="eixos-title" className="font-serif text-[2.1rem] md:text-5xl leading-[1.08] tracking-[-0.01em] text-white mb-4">
            O que eu escrevo, e para quem
          </h2>
          <p className="font-sans text-lg text-nevoa leading-relaxed max-w-[52ch] mb-10 md:mb-14">
            Tecnologia e negócio são partes do mesmo sistema — mas cada leitor entra por uma porta.
          </p>

          <ol className="border-t border-linha">
            {eixos.map(({ id, destaque, projeto }) => {
              const eixo = EIXOS[id];
              return (
                <li key={id} className="cartao border-b border-linha py-8 md:py-10 grid gap-x-10 gap-y-4 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                  <div>
                    <h3 className="font-serif text-3xl md:text-[2.25rem] leading-[1.05] text-white mb-3">
                      <a href={eixo.href} className="hover:text-pessego transition-colors">
                        {eixo.label}
                      </a>
                    </h3>
                    <p className="font-sans text-sm font-semibold leading-snug text-ceu">{eixo.publico}</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <p className="font-sans text-nevoa leading-relaxed">{eixo.descricao}</p>
                    {destaque && (
                      <p className="font-sans text-sm">
                        <a href={destaque.href} className="font-serif text-lg leading-snug text-white hover:text-pessego transition-colors">
                          {destaque.title}
                        </a>
                        <span className="block rotulo text-bruma mt-2">Mais recente</span>
                      </p>
                    )}
                    <a href={destaque ? eixo.href : projeto?.href ?? eixo.href} className="acao text-laranja-claro">
                      {destaque ? `Ler ${eixo.shortLabel}` : projeto?.label ?? `Ver ${eixo.shortLabel}`}
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
