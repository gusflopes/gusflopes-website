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
    {
      title: "Conteúdo & Insights",
      description: "Artigos e análises sobre arquitetura, engenharia de software e IA aplicada para quem busca profundidade, contexto e ideias úteis além do hype.",
      action: "ACESSAR O RADAR",
      link: "/radar"
    }
  ];

  return (
    <section id="consulting" aria-labelledby="consulting-title" className="bg-papel text-tinta papel px-4 md:px-6 py-16 md:py-24 relative">
      <div id="courses" className="absolute top-0"></div>
      <div className="max-w-7xl mx-auto">
        <h2 id="consulting-title" className="font-serif text-3xl md:text-[2.6rem] leading-tight text-tinta mb-10 md:mb-14">
          Como posso ajudar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12">
          {services.map((service) => (
            <article key={service.title} className="cartao flex flex-col">
              <span className="fio-vivo" />
              <h3 className="font-serif text-2xl text-tinta mt-5 mb-3">{service.title}</h3>
              <p className="font-sans text-tinta-2 leading-relaxed mb-6 flex-grow">{service.description}</p>
              <a href={service.link} className="acao text-laranja-fundo text-sm tracking-[0.08em]">
                {service.action} <ArrowRight size={16} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
