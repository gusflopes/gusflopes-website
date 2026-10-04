import type { FundoResponsivo } from '../lib/imagens';

/**
 * "Sobre": o quadro original da marca entra aqui como referência, emoldurado ao lado do texto
 * (nunca atrás dele). As cinco áreas viram um índice com réguas, não cards.
 */
export function Themes({ fundo }: { fundo: FundoResponsivo }) {
  const themes = [
    {
      title: "Domínio & Arquitetura",
      description: "DDD, arquitetura de software e .NET para traduzir regras de negócio complexas em sistemas claros, resilientes e preparados para evoluir."
    },
    {
      title: "Dados & IA Aplicada",
      description: "Data Mesh, agentes e IA aplicada com contexto, governança e propósito. Tecnologia emergente tratada como capacidade de negócio, não como demonstração."
    },
    {
      title: "Fluxo & Entrega",
      description: "DevOps e DORA Metrics para tornar o trabalho visível, reduzir atritos e melhorar continuamente a capacidade de entregar software com qualidade."
    },
    {
      title: "Estratégia & Governança",
      description: "Decisões tecnológicas conectadas a valor, risco e sustentabilidade. Uma perspectiva formada também por Direito, Contabilidade e Gestão Financeira."
    },
    {
      title: "Times & Plataformas",
      description: "Team Topologies e Platform Engineering para criar limites claros, reduzir carga cognitiva e dar mais autonomia aos times de produto."
    }
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="bg-noite px-4 md:px-6 py-16 md:py-24 border-t border-linha">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16 md:mb-20">
          <figure className="lg:col-span-6 lg:order-last">
            <div className="aspect-[16/10] overflow-hidden">
              <picture>
                <source type="image/avif" srcSet={fundo.avif} sizes="(min-width: 1024px) 50vw, 100vw" />
                <source type="image/webp" srcSet={fundo.webp} sizes="(min-width: 1024px) 50vw, 100vw" />
                <img
                  src={fundo.src}
                  alt=""
                  width={fundo.width}
                  height={fundo.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>
            <span className="fio block" aria-hidden="true" />
          </figure>

          <div className="lg:col-span-6">
            <h2 id="about-title" className="font-serif text-3xl md:text-5xl leading-[1.1] text-white mb-6">
              Engenharia é mais do que código
            </h2>
            <p className="font-sans text-lg text-white/90 leading-relaxed max-w-[60ch]">
              Minha trajetória entre <strong className="font-semibold text-pessego">Direito, Contabilidade, gestão e tecnologia</strong> moldou uma visão sistêmica da engenharia de software.
              Analiso domínio, arquitetura, times e fluxo de entrega como partes do mesmo problema: criar capacidade para o negócio evoluir.
            </p>
            <p className="font-sans text-base text-nevoa leading-relaxed mt-5 max-w-[60ch]">
              Hoje, aplico essa perspectiva como líder técnico no sistema de precificação de locação veicular de uma plataforma de mobilidade do Grupo Volkswagen.
            </p>
          </div>
        </div>

        <dl className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10">
          {themes.map((theme) => (
            <div key={theme.title} className="border-t border-linha py-6 md:py-8">
              <dt className="font-serif text-xl md:text-[1.4rem] text-white mb-3 leading-tight">{theme.title}</dt>
              <dd className="font-sans text-base text-nevoa leading-relaxed">{theme.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
