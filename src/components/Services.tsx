import { ArrowRight } from 'lucide-react';
import { site } from '../config/site';
import { Amp } from './Amp';

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

/**
 * "Como posso ajudar": o trabalho é entender o que contratar e como começar. Abre o campo
 * escuro do fim da página (o mesmo do rodapé) como um livro-razão de ofertas: cada linha tem o
 * nome, o que é, e a ação na ponta direita — lê-se da esquerda para a direita como uma decisão.
 */
export function Services() {
  return (
    <section id="consulting" aria-labelledby="consulting-title" className="relative bg-noite-fundo pt-20 md:pt-28 pb-16 md:pb-24 px-4 sm:px-6">
      <div id="courses" className="absolute top-0" />
      <div className="max-w-7xl mx-auto">
        <h2 id="consulting-title" className="h-secao text-white mb-10 md:mb-14">
          Como posso <span className="acento">ajudar</span>
        </h2>

        <ul className="border-t border-noite-fio-forte">
          {services.map((service) => (
            <li key={service.title} className="group relative border-b border-noite-fio">
              <span
                aria-hidden="true"
                className="absolute -bottom-px left-0 right-0 h-px bg-laranja origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-saida)] group-hover:scale-x-100 group-focus-within:scale-x-100"
              />
              <div className="grid gap-3 py-8 md:py-10 lg:grid-cols-12 lg:gap-x-10 lg:items-baseline">
                <h3 className="lg:col-span-4 font-serif text-[1.625rem] md:text-[2rem] leading-[1.1] tracking-[-0.012em] text-white">
                  <Amp>{service.title}</Amp>
                </h3>
                <p className="lg:col-span-5 font-sans text-[1rem] md:text-[1.0625rem] leading-relaxed text-nevoa max-w-[38rem]">
                  {service.description}
                </p>
                <a href={service.link} className="acao mt-2 lg:mt-0 lg:col-span-3 lg:justify-self-end text-laranja">
                  {service.action} <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
