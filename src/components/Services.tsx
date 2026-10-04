import { ArrowRight } from 'lucide-react';
import { site } from '../config/site';
import { Abertura, NomeCelula } from './Abertura';

export function Services() {
  const services = [
    {
      title: 'Consultoria Estratégica',
      description:
        'Diagnóstico de arquitetura, fluxo de entrega e desenho organizacional para transformar desafios de negócio em decisões técnicas claras e executáveis.',
      action: 'AGENDAR DIAGNÓSTICO',
      link: `mailto:${site.email}?subject=${encodeURIComponent('Consultoria Estratégica — Agendar diagnóstico')}`,
    },
    {
      title: 'Mentoria & Formação',
      description:
        'Desenvolvimento de engenheiros e lideranças técnicas por meio de discussões práticas sobre arquitetura, DDD, plataformas e tomada de decisão.',
      action: 'VER PROGRAMAS',
      link: `mailto:${site.email}?subject=${encodeURIComponent('Mentoria & Cursos')}`,
    },
    {
      title: 'Conteúdo & Insights',
      description:
        'Artigos e análises sobre arquitetura, engenharia de software e IA aplicada para quem busca profundidade, contexto e ideias úteis além do hype.',
      action: 'ACESSAR O RADAR',
      link: '/radar',
    },
  ];

  // Degraus de cada coluna no desktop: a escada da abertura continua nas ofertas. Sem o campo de
  // enchimento embaixo da primeira, o último degrau fica mais curto para o vão não sobrar.
  const degrau = ['lg:mt-0', 'lg:mt-60', 'lg:mt-[23rem]'];

  return (
    <section id="consulting" aria-labelledby="consulting-title" className="campo-papel pt-10 md:pt-14 pb-20 md:pb-28 relative">
      <div id="courses" className="absolute top-0" />
      <div className="moldura">
        {/* Costura entre temas (creme) e serviços (papel): filete laranja de 2px na largura da grade. */}
        <div className="border-t-2 border-laranja mb-12 md:mb-10" aria-hidden="true" />
        <div className="lg:w-[66%] lg:ml-auto">
          <Abertura id="consulting-title" as="h2" titulo="Como posso ajudar" eixo="negocios" teto={11} />
        </div>

        <div className="mt-12 lg:-mt-52 grid grid-cols-1 md:grid-cols-3 gap-x-[var(--gutter)] gap-y-12 items-start">
          {services.map((service, i) => (
            <div key={service.title} className={degrau[i]}>
              <article className="flex flex-col border-t-2 border-laranja pt-6 relative">
                {/* Filete laranja de 2px (presença) com o começo marcado em azul de 6px: a escada continua. */}
                <span className="absolute -top-[2px] left-0 w-24 h-[6px] bg-azul" aria-hidden="true" />
                <NomeCelula titulo={service.title} className="text-azul mb-5" />
                <p className="font-serif text-[1.0625rem] leading-relaxed text-tinta mb-7 max-w-[40ch]">{service.description}</p>
                {/* Uma ação chapada na região: a primeira oferta (o diagnóstico). As outras são links. */}
                <a href={service.link} className={`acao self-start ${i === 0 ? 'acao-chapada' : ''}`}>
                  {service.action} <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
                </a>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
