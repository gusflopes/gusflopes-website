import { ArrowRight } from 'lucide-react';
import { site } from '../config/site';
import { Amp } from './Amp';

const services = [
  {
    title: 'Consultoria Estratégica',
    description:
      'Diagnóstico de arquitetura, fluxo de entrega e desenho organizacional para transformar desafios de negócio em decisões técnicas claras e executáveis.',
    action: 'Agendar diagnóstico',
    link: `mailto:${site.email}?subject=${encodeURIComponent('Consultoria Estratégica — Agendar diagnóstico')}`,
  },
  {
    title: 'Mentoria & Formação',
    description:
      'Desenvolvimento de engenheiros e lideranças técnicas por meio de discussões práticas sobre arquitetura, DDD, plataformas e tomada de decisão.',
    action: 'Ver programas',
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
    action: 'Acessar o Radar',
    link: '/radar',
  },
];

/**
 * "Como posso ajudar": entender o que contratar e como começar. Página do pedido, no campo escuro
 * do fim (o mesmo do rodapé), com contraste de densidade: a Consultoria Estratégica é a oferta
 * principal, em escala de abertura (descrição em Literata grande e o botão sólido); Mentoria e
 * Conteúdo vêm como notas de pé, compactas, lado a lado. O título fica pendurado à esquerda.
 */
export function Services() {
  const [principal, ...demais] = services;
  return (
    <section id="consulting" aria-labelledby="consulting-title" className="relative bg-noite-fundo pt-16 md:pt-24 pb-16 md:pb-20 px-4 sm:px-6">
      <div id="courses" className="absolute top-0" />
      <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-12 lg:gap-x-10">
        <h2 id="consulting-title" className="h-secao text-white lg:col-span-4 max-w-[10ch]">
          Como posso ajudar
        </h2>

        <div className="lg:col-span-8">
          <article className="fio-capa text-nevoa/80 pt-9 md:pt-11">
            <h3 className="font-serif text-white text-[1.75rem] md:text-[2.25rem] leading-[1.08] tracking-[-0.018em]">
              {principal.title}
            </h3>
            <p className="mt-5 font-serif text-[1.1875rem] md:text-[1.5rem] leading-[1.42] tracking-[-0.006em] text-nevoa max-w-[36ch]">
              {principal.description}
            </p>
            <a href={principal.link} className="botao mt-8">
              {principal.action} <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
            </a>
          </article>

          <div className="mt-14 md:mt-16 grid gap-px bg-noite-fio border-t border-noite-fio sm:grid-cols-2">
            {demais.map((service) => (
              <article key={service.title} className="bg-noite-fundo pt-7 pb-2 sm:[&:nth-child(even)]:pl-8 sm:[&:nth-child(odd)]:pr-8 flex flex-col">
                <h3 className="font-serif text-[1.3125rem] md:text-[1.375rem] leading-[1.15] tracking-[-0.01em] text-white">
                  <Amp>{service.title}</Amp>
                </h3>
                <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-nevoa-2">{service.description}</p>
                <a href={service.link} className="acao mt-5 self-start text-laranja">
                  {service.action} <ArrowRight size={16} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
