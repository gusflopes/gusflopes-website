import { ArrowRight } from 'lucide-react';
import { EIXOS, type EixoId } from '../lib/eixos';
import { telaFaixa } from '../lib/telas';
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
 * Seção da home que apresenta os eixos editoriais — cada coluna abre com a tela do eixo
 * (semente = nome do eixo), diz para quem é e aponta para o texto mais recente
 * (ou para um projeto, no caso de Bastidores). A página só recebe eixos com algo para mostrar.
 */
export function Eixos({ eixos }: EixosProps) {
  if (eixos.length === 0) return null;

  const cols = eixos.length === 3 ? 'md:grid-cols-3' : eixos.length === 2 ? 'md:grid-cols-2' : '';

  return (
    <section aria-labelledby="eixos-title" className="bg-noite px-4 md:px-6 py-16 md:py-24 border-t border-linha">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-14 max-w-2xl">
          <h2 id="eixos-title" className="font-serif text-3xl md:text-[2.6rem] leading-tight text-white mb-4">
            O que eu escrevo, e para quem
          </h2>
          <p className="font-sans text-lg text-nevoa leading-relaxed">
            Tecnologia e negócio são partes do mesmo sistema — mas cada leitor entra por uma porta.
          </p>
        </div>

        <div className={`grid grid-cols-1 ${cols} gap-x-8 gap-y-14`}>
          {eixos.map(({ id, destaque, projeto }) => {
            const eixo = EIXOS[id];
            return (
              <article key={id} className="cartao flex flex-col">
                <a href={eixo.href} tabIndex={-1} aria-hidden="true" className="block aspect-[4/1] overflow-hidden">
                  <TelaPicture tela={telaFaixa(id)} sizes="(min-width: 768px) 33vw, 100vw" />
                </a>
                <span className="fio-vivo" />
                <h3 className="font-serif text-2xl md:text-[1.7rem] text-white mt-5 mb-2">
                  <a href={eixo.href} className="hover:text-pessego transition-colors">
                    {eixo.label}
                  </a>
                </h3>
                <p className="font-sans text-sm font-semibold text-laranja-claro mb-3">{eixo.publico}</p>
                <p className="font-sans text-nevoa leading-relaxed mb-6 flex-grow">{eixo.descricao}</p>

                {destaque && (
                  <p className="font-sans text-sm mb-6 border-t border-linha pt-4">
                    <span className="block rotulo text-bruma mb-2">Mais recente</span>
                    <a href={destaque.href} className="font-serif text-lg leading-snug text-white hover:text-pessego transition-colors">
                      {destaque.title}
                    </a>
                  </p>
                )}

                <a href={destaque ? eixo.href : projeto?.href ?? eixo.href} className="acao mt-auto text-laranja-claro">
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
