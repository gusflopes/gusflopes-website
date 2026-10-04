import { ArrowRight } from 'lucide-react';
import { EIXOS, type EixoId } from '../lib/eixos';
import { Amp } from './Amp';

export interface EixoResumo {
  id: EixoId;
  /** Texto mais recente do eixo, se houver. */
  destaque?: { title: string; href: string; date?: string; duration?: string };
  /** Link alternativo quando o eixo ainda não tem texto (ex.: projeto em produção). */
  projeto?: { label: string; href: string };
}

interface EixosProps {
  eixos: EixoResumo[];
}

/**
 * Eixos editoriais: três portas de entrada DESIGUAIS. A primeira (Engenharia & IA, o eixo com
 * mais textos) é a porta larga, à esquerda; as outras duas se empilham à direita, separadas por
 * fio. Cada porta diz para quem é e mostra o texto mais recente, com a data logo abaixo.
 */
export function Eixos({ eixos }: EixosProps) {
  if (eixos.length === 0) return null;
  const [principal, ...demais] = eixos;

  return (
    <section aria-labelledby="eixos-title" className="bg-noite pt-20 md:pt-28 pb-20 md:pb-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end mb-12 md:mb-16">
          <h2 id="eixos-title" className="h-secao text-white lg:col-span-6">
            O que eu escrevo, <span className="acento">e para quem</span>
          </h2>
          <p className="font-sans text-[1.0625rem] leading-relaxed text-nevoa max-w-[30rem] lg:col-span-5 lg:col-start-8">
            Tecnologia e negócio são partes do mesmo sistema — mas cada leitor entra por uma porta.
          </p>
        </div>

        <div className={`grid border-t border-noite-fio-forte ${demais.length ? 'lg:grid-cols-12' : ''}`}>
          <Porta resumo={principal} larga className={demais.length ? 'lg:col-span-7 lg:pr-14 lg:border-r lg:border-noite-fio' : ''} />
          {demais.length > 0 && (
            <div className="lg:col-span-5 lg:pl-14">
              {demais.map((resumo, i) => (
                <Porta key={resumo.id} resumo={resumo} className={i > 0 ? 'border-t border-noite-fio' : 'border-t border-noite-fio lg:border-t-0'} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Porta({ resumo, larga = false, className = '' }: { resumo: EixoResumo; larga?: boolean; className?: string }) {
  const { id, destaque, projeto } = resumo;
  const eixo = EIXOS[id];
  return (
    <article className={`group relative flex flex-col ${larga ? 'pt-9 pb-12 lg:pt-12 lg:pb-12' : 'pt-8 pb-10 lg:pb-12'} ${className}`}>
      {/* Fio laranja que acende sobre a régua ao passar o mouse */}
      <span
        aria-hidden="true"
        className="absolute -top-px left-0 right-0 h-px bg-laranja origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-saida)] group-hover:scale-x-100 group-focus-within:scale-x-100"
      />
      <h3
        className={`font-serif text-white leading-[1.05] tracking-[-0.015em] ${
          larga ? 'text-[2.25rem] md:text-[3.25rem]' : 'text-[1.75rem] md:text-[2rem]'
        }`}
      >
        <a href={eixo.href} className="hover:text-laranja-palido transition-colors">
          <Amp>{eixo.label}</Amp>
        </a>
      </h3>
      <p className={`mt-3 font-sans font-semibold text-ceu ${larga ? 'text-base' : 'text-[0.9375rem]'}`}>{eixo.publico}</p>
      <p className={`mt-4 font-sans leading-relaxed text-nevoa ${larga ? 'text-[1.0625rem] max-w-[34rem]' : 'text-[0.9375rem] max-w-[30rem]'}`}>
        {eixo.descricao}
      </p>

      {destaque && (
        <div className={`${larga ? 'mt-10 lg:mt-auto pt-7' : 'mt-6 pt-5'} border-t border-noite-fio`}>
          <a
            href={destaque.href}
            className={`block font-serif text-white leading-snug underline decoration-transparent underline-offset-[0.2em] decoration-1 hover:decoration-laranja transition-colors ${
              larga ? 'text-[1.5rem] md:text-[2.25rem] leading-[1.14] tracking-[-0.012em] max-w-[24ch]' : 'text-[1.1875rem]'
            }`}
          >
            {destaque.title}
          </a>
          <p className="meta mt-3">
            <span>Mais recente</span>
            {destaque.date && <span>{destaque.date}</span>}
            {larga && destaque.duration && <span>{destaque.duration}</span>}
          </p>
        </div>
      )}

      <a
        href={destaque ? eixo.href : projeto?.href ?? eixo.href}
        className={`acao self-start text-laranja ${larga ? 'mt-9' : 'mt-6'}`}
      >
        {destaque ? `Ler ${eixo.shortLabel}` : projeto?.label ?? `Ver ${eixo.shortLabel}`}
        <ArrowRight size={16} aria-hidden="true" />
      </a>
    </article>
  );
}
