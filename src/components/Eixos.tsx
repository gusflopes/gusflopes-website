import { ArrowRight, Play } from 'lucide-react';
import { EIXOS, EIXO_COR, type EixoId } from '../lib/eixos';
import { Amp } from './Amp';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface TextoResumo {
  title: string;
  href: string;
  date?: string;
  duration?: string;
}

export interface EixoResumo {
  id: EixoId;
  /** Texto mais recente do eixo, se houver (a manchete da porta). */
  destaque?: TextoResumo;
  /** Os textos seguintes do eixo, em ordem (a "Ideias recentes" fundida nas portas). */
  outros?: TextoResumo[];
  /** Link alternativo quando o eixo ainda não tem texto (ex.: projeto em produção). */
  projeto?: { label: string; href: string };
}

export interface FeaturedVideo {
  title: string;
  excerpt: string;
  image: string;
  link: string;
  isExternal: boolean;
}

interface EixosProps {
  eixos: EixoResumo[];
  video?: FeaturedVideo;
}

/**
 * Eixos editoriais como PRIMEIRA PÁGINA de jornal, em papel (é leitura): fio de capa laranja no alto, colunas desiguais
 * separadas por fio vertical, uma manchete por porta. Engenharia & IA é a coluna larga (manchete
 * em Literata grande e mais dois textos com a data na margem); Negócios e Bastidores dividem a
 * coluna estreita. "Ideias recentes" deixou de existir: os textos mais recentes moram aqui.
 * O vídeo em destaque é a única imagem da página, como a foto de uma primeira página. Cada porta
 * abre com uma placa na cor do eixo (petróleo, areia, ferrugem: cores do quadro com função).
 */
export function Eixos({ eixos, video }: EixosProps) {
  if (eixos.length === 0) return null;
  const [principal, ...demais] = eixos;

  return (
    <section aria-labelledby="eixos-title" className="claro bg-papel text-tinta pt-14 md:pt-20 pb-16 md:pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end mb-10 md:mb-12">
          <h2 id="eixos-title" className="h-secao text-tinta lg:col-span-7">
            O que eu escrevo, <span className="acento">e para quem</span>
          </h2>
          <p className="font-sans text-[1.0625rem] leading-relaxed text-tinta-2 max-w-[26rem] lg:col-span-4 lg:col-start-9 lg:pb-1.5">
            Tecnologia e negócio são partes do mesmo sistema — mas cada leitor entra por uma porta.
          </p>
        </div>

        <div className={`fio-capa grid ${demais.length ? 'lg:grid-cols-12' : ''}`}>
          <div className={demais.length ? 'lg:col-span-7 lg:pr-12' : ''}>
            <Porta resumo={principal} larga />
          </div>
          {demais.length > 0 && (
            <div className="lg:col-span-5 lg:row-span-2 lg:pl-12 lg:border-l lg:border-papel-fio">
              {demais.map((resumo, i) => (
                <Porta
                  key={resumo.id}
                  resumo={resumo}
                  className={i > 0 ? 'border-t border-papel-fio' : 'border-t border-papel-fio lg:border-t-0'}
                />
              ))}
            </div>
          )}
          {/* A foto da primeira página: no desktop fecha a coluna larga; no celular, a capa inteira */}
          {video && (
            <div className={demais.length ? 'lg:col-span-7 lg:pr-12' : ''}>
              <Video video={video} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Porta({ resumo, larga = false, className = '' }: { resumo: EixoResumo; larga?: boolean; className?: string }) {
  const { id, destaque, outros = [], projeto } = resumo;
  const eixo = EIXOS[id];
  return (
    <article className={`flex flex-col ${larga ? 'pt-9 md:pt-11 pb-10' : 'pt-8 md:pt-10 pb-9'} ${className}`}>
      {/* Cabeça de coluna: placa na cor do eixo (tirada do quadro), com o nome e para quem é */}
      <div className={`placa-${EIXO_COR[id]} rounded-[3px] ${larga ? 'px-5 py-4 md:px-6 md:py-5' : 'px-5 py-4'}`}>
        <h3
          className={`font-serif leading-[1.08] tracking-[-0.015em] ${
            larga ? 'text-[1.625rem] md:text-[2rem]' : 'text-[1.5rem] md:text-[1.625rem]'
          }`}
        >
          <a href={eixo.href} className="underline decoration-transparent decoration-1 underline-offset-[0.16em] hover:decoration-current transition-colors">
            <Amp>{eixo.label}</Amp>
          </a>
        </h3>
        <p className="mt-1.5 font-sans font-semibold text-[0.9375rem]">{eixo.publico}</p>
      </div>
      <p className={`mt-4 font-sans leading-relaxed text-tinta-2 ${larga ? 'text-[1rem] max-w-[36rem]' : 'text-[0.9375rem] max-w-[30rem]'}`}>
        {eixo.descricao}
      </p>

      {destaque && (
        <div className={`${larga ? 'mt-9 pt-8' : 'mt-6 pt-6'} border-t border-papel-fio`}>
          {/* A manchete da porta */}
          <a
            href={destaque.href}
            className={`block font-serif text-tinta underline decoration-transparent underline-offset-[0.18em] decoration-1 hover:decoration-laranja transition-colors ${
              larga
                ? 'text-[1.75rem] md:text-[2.25rem] font-medium leading-[1.1] tracking-[-0.018em] max-w-[22ch]'
                : 'text-[1.25rem] md:text-[1.3125rem] leading-[1.25] tracking-[-0.008em]'
            }`}
          >
            {destaque.title}
          </a>
          <p className="meta mt-3">
            <span className="selo">Mais recente</span>
            {destaque.date && <span>{destaque.date}</span>}
            {larga && destaque.duration && <span>{destaque.duration}</span>}
          </p>
        </div>
      )}

      {outros.length > 0 && (
        <ul className={larga ? 'mt-8' : 'mt-5'}>
          {outros.map((texto) => (
            <li key={texto.href} className="relative border-t border-papel-fio">
              {/* A marca da data na margem: filete laranja sobre o fio do índice */}
              <span aria-hidden="true" className={`absolute -top-px left-0 h-[2px] bg-laranja w-6 ${larga ? 'md:w-[6.5rem]' : 'md:w-[5.5rem]'}`} />
              <a
                href={texto.href}
                className={`group grid gap-x-6 py-4 ${larga ? 'md:grid-cols-[6.5rem_minmax(0,1fr)]' : 'md:grid-cols-[5.5rem_minmax(0,1fr)]'}`}
              >
                {texto.date && <span className="num font-sans font-medium text-[0.8125rem] text-petroleo-fundo pt-1 order-2 md:order-none mt-1 md:mt-0">{texto.date}</span>}
                <span
                  className={`font-serif text-tinta leading-[1.3] group-hover:text-laranja-fundo transition-colors ${
                    larga ? 'text-[1.125rem] md:text-[1.1875rem]' : 'text-[1.0625rem]'
                  }`}
                >
                  {texto.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <a
        href={destaque ? eixo.href : projeto?.href ?? eixo.href}
        className={`acao self-start text-laranja-fundo ${larga ? 'mt-7' : 'mt-5'}`}
      >
        {destaque ? `Ler ${eixo.shortLabel}` : projeto?.label ?? `Ver ${eixo.shortLabel}`}
        <ArrowRight size={16} aria-hidden="true" />
      </a>
    </article>
  );
}

/** A foto da primeira página: o vídeo em destaque, com a legenda embaixo. */
function Video({ video }: { video: FeaturedVideo }) {
  return (
    <a
      href={video.link}
      {...(video.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group grid gap-6 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] sm:gap-8 border-t border-papel-fio pt-8 pb-10 lg:pb-2"
    >
      <div className="relative aspect-video overflow-hidden rounded-[3px] bg-papel-2">
        <ImageWithFallback
          src={video.image}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
        />
        <span className="absolute left-3 bottom-3 w-11 h-11 rounded-full bg-laranja text-laranja-tinta flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <Play size={17} fill="currentColor" className="ml-0.5" aria-hidden="true" />
        </span>
      </div>
      <div>
        <h3 className="font-serif font-normal text-[1.25rem] md:text-[1.3125rem] leading-[1.25] text-tinta group-hover:text-laranja-fundo transition-colors">
          {video.title}
        </h3>
        <p className="meta mt-2">
          <span>Vídeo em Destaque</span>
        </p>
        <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-tinta-2">{video.excerpt}</p>
      </div>
    </a>
  );
}
