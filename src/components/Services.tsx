import { ArrowRight } from 'lucide-react';
import { site } from '../config/site';

export function Services() {
  const services = [
    {
      title: "Consultoria Estratégica",
      description: "Diagnóstico de arquitetura, fluxo de entrega e desenho organizacional para transformar desafios de negócio em decisões técnicas claras e executáveis.",
      action: "AGENDAR DIAGNÓSTICO",
      link: `mailto:${site.email}?subject=${encodeURIComponent('Consultoria Estratégica — Agendar diagnóstico')}`
    },
    {
      title: "Mentoria & Formação",
      description: "Desenvolvimento de engenheiros e lideranças técnicas por meio de discussões práticas sobre arquitetura, DDD, plataformas e tomada de decisão.",
      action: "VER PROGRAMAS",
      link: `mailto:${site.email}?subject=${encodeURIComponent('Mentoria & Cursos')}`
    },
    /* 
    {
      title: "Speaking & Palestras",
      description: "Compartilhando visão de futuro em conferências e eventos corporativos. Keynotes sobre Inovação, Cultura DevOps e o impacto real da IA na Engenharia de Software.",
      action: "CONVIDAR PARA EVENTO"
    },
    */
    /*
    {
      title: "Workshops In-Company",
      description: "Treinamentos práticos e imersivos para elevar a régua técnica do seu time. Sessões focadas em DDD, Event Storming e modernização de legado.",
      action: "VER TEMAS"
    },
    */
    {
      title: "Conteúdo & Insights",
      description: "Artigos e análises sobre arquitetura, engenharia de software e IA aplicada para quem busca profundidade, contexto e ideias úteis além do hype.",
      action: "ACESSAR O RADAR",
      link: "/radar"
    }
  ];

  return (
    <section id="consulting" aria-labelledby="consulting-title" className="bg-noite py-20 md:py-28 px-4 sm:px-6 relative">
      <div id="courses" className="absolute top-0"></div>
      <div className="max-w-6xl mx-auto">
        <h2 id="consulting-title" className="text-3xl md:text-[2.6rem] leading-[1.08] font-extrabold tracking-[-0.02em] text-white mb-12 md:mb-16">
          Como posso ajudar
        </h2>

        <div className="relative">
          {/* a linha de serviço atravessa as três estações (horizontal no desktop, vertical no mobile) */}
          <span aria-hidden="true" className="absolute hidden md:block left-0 right-0 top-[calc(0.5rem-3px)] h-1.5 rounded-full bg-laranja" />
          <span aria-hidden="true" className="absolute md:hidden left-[calc(0.5rem-3px)] top-2 bottom-2 w-1.5 rounded-full bg-laranja" />
        <ol className="relative list-none m-0 p-0 grid md:grid-cols-3 gap-x-10 gap-y-12">
          {services.map((service) => (
            <li key={service.title} className="relative pl-9 md:pl-0 md:pt-10 flex flex-col">
              <span aria-hidden="true" className="absolute left-0 top-0 w-4 h-4 rounded-full bg-noite border-[3px] border-luz" />
              <h3 className="text-2xl font-extrabold tracking-[-0.015em] text-white leading-tight">{service.title}</h3>
              <p className="mt-3 font-serif text-[1.05rem] leading-relaxed text-nevoa flex-grow">
                {service.description}
              </p>
              <a
                href={service.link || "#"}
                className="group mt-6 inline-flex items-center gap-2 self-start text-sm font-bold uppercase tracking-[0.06em] text-laranja-claro hover:text-white transition-colors"
              >
                {service.action}
                <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </a>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}
