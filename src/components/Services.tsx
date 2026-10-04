import { ArrowRight } from 'lucide-react';
import { site } from '../config/site';

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
  /*
  {
    icon: <Mic className="w-10 h-10 text-orange-400 mb-4" />,
    title: "Speaking & Palestras",
    description: "Compartilhando visão de futuro em conferências e eventos corporativos. Keynotes sobre Inovação, Cultura DevOps e o impacto real da IA na Engenharia de Software.",
    action: "CONVIDAR PARA EVENTO"
  },
  */
  /*
  {
    icon: <Users className="w-10 h-10 text-orange-400 mb-4" />, // Usar um ícone diferente se quiser, ex: Presentation ou Easel
    title: "Workshops In-Company",
    description: "Treinamentos práticos e imersivos para elevar a régua técnica do seu time. Sessões focadas em DDD, Event Storming e modernização de legado.",
    action: "VER TEMAS"
  },
  */
  {
    title: 'Conteúdo & Insights',
    description:
      'Artigos e análises sobre arquitetura, engenharia de software e IA aplicada para quem busca profundidade, contexto e ideias úteis além do hype.',
    action: 'ACESSAR O RADAR',
    link: '/radar',
  },
];

export function Services() {
  return (
    <section id="consulting" className="relative bg-noite-2 py-20 md:py-28 px-4 sm:px-6">
      <div id="courses" className="absolute top-0" />
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-[2.125rem] md:text-5xl leading-[1.08] tracking-[-0.012em] text-white mb-14 md:mb-16">
          Como posso ajudar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12">
          {services.map((service) => (
            <article key={service.title} className="group flex flex-col pt-7 border-t border-noite-fio-forte">
              <h3 className="font-serif text-2xl md:text-[1.75rem] leading-tight text-white mb-4">{service.title}</h3>
              <p className="font-sans text-[1.0625rem] leading-relaxed text-nevoa mb-8 flex-grow">{service.description}</p>
              <a
                href={service.link}
                className="acao self-start text-sm tracking-[0.08em] text-laranja decoration-laranja/50 hover:decoration-laranja"
              >
                {service.action} <ArrowRight size={16} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
