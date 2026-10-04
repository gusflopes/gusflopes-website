import { ArrowRight } from 'lucide-react';
import { site } from '../config/site';

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

  return (
    <section id="consulting" aria-labelledby="consulting-title" className="campo-azul py-20 md:py-28 relative">
      <div id="courses" className="absolute top-0" />
      <div className="moldura">
        <h2 id="consulting-title" className="display uppercase text-[2.5rem] md:text-[4.5rem] text-papel mb-10 md:mb-14">
          Como posso <span className="text-laranja">ajudar</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t-2 border-papel">
          {services.map((service, i) => (
            <article
              key={service.title}
              className={`group flex flex-col pt-6 pb-8 md:pb-2 md:pr-8 ${i > 0 ? 'border-t md:border-t-0 md:border-l md:pl-8' : ''} border-azul-3`}
            >
              <h3 className="display uppercase text-[1.625rem] leading-none text-papel mb-4">{service.title}</h3>
              <p className="font-serif text-[1.0625rem] leading-relaxed text-ceu-claro mb-7 flex-grow">{service.description}</p>
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
