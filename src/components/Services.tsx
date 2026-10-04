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

  // Degraus de cada coluna no desktop: a escada da abertura continua nas ofertas.
  const degrau = ['lg:mt-0', 'lg:mt-44', 'lg:mt-[22rem]'];

  return (
    <section id="consulting" aria-labelledby="consulting-title" className="campo-papel pt-20 md:pt-28 pb-20 md:pb-28 relative">
      <div id="courses" className="absolute top-0" />
      <div className="moldura">
        <div className="lg:w-[66%] lg:ml-auto">
          <Abertura id="consulting-title" as="h2" titulo="Como posso ajudar" eixo="negocios" teto={11} />
        </div>

        <div className="mt-12 lg:-mt-36 grid grid-cols-1 md:grid-cols-3 gap-x-[var(--gutter)] gap-y-12 items-start">
          {services.map((service, i) => (
            <article key={service.title} className={`flex flex-col border-t-[6px] border-azul pt-5 ${degrau[i]}`}>
              <NomeCelula titulo={service.title} className="text-azul mb-5" />
              <p className="font-serif text-[1.0625rem] leading-relaxed text-tinta mb-7 max-w-[40ch]">{service.description}</p>
              <a href={service.link} className="acao self-start">
                {service.action} <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
