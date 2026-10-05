import { ArrowRight } from 'lucide-react';
import { site } from '../config/site';

export function Services() {
  const services = [
    {
      title: "Consultoria Estratégica",
      description: "Diagnóstico de arquitetura, fluxo de entrega e desenho organizacional para transformar desafios de negócio em decisões técnicas claras e executáveis.",
      action: "Agendar diagnóstico",
      link: `mailto:${site.email}?subject=${encodeURIComponent('Consultoria Estratégica — Agendar diagnóstico')}`
    },
    {
      title: "Mentoria & Formação",
      description: "Desenvolvimento de engenheiros e lideranças técnicas por meio de discussões práticas sobre arquitetura, DDD, plataformas e tomada de decisão.",
      action: "Ver programas",
      link: `mailto:${site.email}?subject=${encodeURIComponent('Mentoria & Cursos')}`
    },
    {
      title: "Conteúdo & Insights",
      description: "Artigos e análises sobre arquitetura, engenharia de software e IA aplicada para quem busca profundidade, contexto e ideias úteis além do hype.",
      action: "Acessar o Radar",
      link: "/radar"
    }
  ];

  // "Entender o que contratar": um cardápio em linhas largas sobre papel — o serviço em Literata,
  // o que ele resolve e a ação alinhada à direita. O título vive numa célula chapada de petróleo
  // (a cor-irmã do laranja no quadro); o fio laranja de cada linha se estende no hover/foco.
  return (
    <section id="consulting" aria-labelledby="consulting-title" className="bg-papel text-tinta papel px-4 md:px-6 py-16 md:py-24 relative">
      <div id="courses" className="absolute top-0"></div>
      <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4 self-start bg-petroleo px-6 py-8 md:px-8 md:py-10 lg:sticky lg:top-24">
          <h2 id="consulting-title" className="font-serif text-[2.1rem] md:text-5xl leading-[1.08] tracking-[-0.01em] text-white">
            Como posso ajudar
          </h2>
          <span className="block h-1 w-14 bg-laranja mt-6" aria-hidden="true" />
        </div>

        <ol className="lg:col-span-8 border-t border-regua border-l-[3px] border-l-laranja">
          {services.map((service, i) => (
            <li key={service.title} className="cartao border-b border-regua">
              <span className="fio-vivo -mt-px" />
              <div className="grid gap-x-10 gap-y-3 py-7 md:py-9 pl-5 md:pl-8 md:grid-cols-[minmax(0,4fr)_minmax(0,6fr)]">
                <h3 className="font-serif text-2xl md:text-[1.75rem] leading-tight text-tinta">{service.title}</h3>
                <div className="flex flex-col gap-4">
                  <p className="font-sans text-tinta-2 leading-relaxed">{service.description}</p>
                  {/* uma só ação chapada na região (a primeira); as outras são links com seta */}
                  <a href={service.link} className={i === 0 ? 'botao self-start min-h-11 px-5 text-[0.9375rem]' : 'acao self-start text-laranja-fundo'}>
                    {service.action} <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
