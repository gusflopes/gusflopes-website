import type { FundoResponsivo } from '../lib/imagens';

/**
 * "Confiar em quem escreve": a revelação da fonte — o quadro original da marca na largura da janela
 * (a única aparição), costurado pelo fio à faixa do texto (nunca atrás dele). O texto e as cinco
 * áreas ficam no campo claro quente (areia acinzentada do quadro): a noite do quadro desemboca
 * num campo de luz, como o céu claro do alto-esquerdo dele. Cada área abre com uma marca laranja.
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
    <section id="about" aria-labelledby="about-title" className="bg-campo">
      {/* A revelação da fonte: o quadro original, inteiro na largura da janela (a única vez que ele
          aparece), com o fio por baixo. Todas as telas do site nascem da amplitude dele. */}
      <figure className="h-[42vw] min-h-[220px] max-h-[600px] overflow-hidden">
        <picture>
          <source type="image/avif" srcSet={fundo.avif} sizes="100vw" />
          <source type="image/webp" srcSet={fundo.webp} sizes="100vw" />
          <img
            src={fundo.src}
            alt=""
            width={fundo.width}
            height={fundo.height}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-[50%_40%]"
          />
        </picture>
      </figure>
      <div className="fio papel bg-campo px-4 md:px-6 py-14 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 mb-14 md:mb-20">
            <h2 id="about-title" className="capitulo lg:col-span-5 font-serif text-3xl md:text-5xl leading-[1.08] tracking-[-0.01em] text-tinta">
              Engenharia é mais do que código
            </h2>
            <div className="lg:col-span-7">
              <p className="font-sans text-lg text-tinta leading-relaxed max-w-[60ch]">
                Minha trajetória entre <strong className="font-semibold text-tinta underline decoration-laranja decoration-[3px] underline-offset-[5px]">Direito, Contabilidade, gestão e tecnologia</strong> moldou uma visão sistêmica da engenharia de software.
                Analiso domínio, arquitetura, times e fluxo de entrega como partes do mesmo problema: criar capacidade para o negócio evoluir.
              </p>
              <p className="font-sans text-base text-tinta-2 leading-relaxed mt-5 max-w-[60ch]">
                Hoje, aplico essa perspectiva como líder técnico no sistema de precificação de locação veicular de uma plataforma de mobilidade do Grupo Volkswagen.
              </p>
            </div>
          </div>

          <dl className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10">
            {themes.map((theme) => (
              <div key={theme.title} className="border-t border-ardosia pb-6 md:pb-8">
                <span className="block h-1 w-1/2 bg-laranja -mt-px mb-5 md:mb-6" aria-hidden="true" />
                <dt className="font-serif text-xl md:text-[1.4rem] text-tinta mb-3 leading-tight">{theme.title}</dt>
                <dd className="font-sans text-base text-tinta-2 leading-relaxed">{theme.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
