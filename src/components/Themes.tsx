import { Amp } from './Amp';

const themes = [
  {
    title: 'Domínio & Arquitetura',
    description:
      'DDD, arquitetura de software e .NET para traduzir regras de negócio complexas em sistemas claros, resilientes e preparados para evoluir.',
  },
  {
    title: 'Dados & IA Aplicada',
    description:
      'Data Mesh, agentes e IA aplicada com contexto, governança e propósito. Tecnologia emergente tratada como capacidade de negócio, não como demonstração.',
  },
  {
    title: 'Fluxo & Entrega',
    description:
      'DevOps e DORA Metrics para tornar o trabalho visível, reduzir atritos e melhorar continuamente a capacidade de entregar software com qualidade.',
  },
  {
    title: 'Estratégia & Governança',
    description:
      'Decisões tecnológicas conectadas a valor, risco e sustentabilidade. Uma perspectiva formada também por Direito, Contabilidade e Gestão Financeira.',
  },
  {
    title: 'Times & Plataformas',
    description:
      'Team Topologies e Platform Engineering para criar limites claros, reduzir carga cognitiva e dar mais autonomia aos times de produto.',
  },
];

/**
 * "Sobre": o trabalho é mostrar quem escreve e por que a visão é sistêmica. Em papel frio, como
 * a página de um livro: o argumento fica preso à esquerda e as cinco áreas viram um índice
 * tipográfico — o nome grande pendurado na margem, a explicação recuada à direita, embaixo.
 */
export function Themes() {
  return (
    <section id="about" aria-labelledby="about-title" className="claro bg-papel text-tinta px-4 sm:px-6 pt-20 md:pt-28 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <h2 id="about-title" className="h-secao text-tinta mb-7">
            Engenharia é <span className="acento">mais do que código</span>
          </h2>
          <p className="font-sans text-[1.0625rem] leading-relaxed text-tinta-2">
            Minha trajetória entre <strong className="font-semibold text-tinta">Direito, Contabilidade, gestão e tecnologia</strong> moldou uma visão sistêmica da engenharia de software.
            Analiso domínio, arquitetura, times e fluxo de entrega como partes do mesmo problema: criar capacidade para o negócio evoluir.
          </p>
          <p className="font-sans text-[0.9375rem] leading-relaxed text-tinta-3 mt-5">
            Hoje, aplico essa perspectiva como líder técnico no sistema de precificação de locação veicular de uma plataforma de mobilidade do Grupo Volkswagen.
          </p>
        </div>

        <dl className="lg:col-span-7 lg:col-start-6 border-t border-tinta">
          {themes.map((theme) => (
            <div key={theme.title} className="py-7 md:py-9 border-b border-papel-fio">
              <dt className="font-serif font-medium text-tinta text-[1.75rem] md:text-[2.5rem] leading-[1.05] tracking-[-0.02em]">
                <Amp>{theme.title}</Amp>
              </dt>
              <dd className="mt-3 md:mt-4 md:ml-[38%] font-sans text-[1rem] md:text-[1.0625rem] leading-relaxed text-tinta-2">
                {theme.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
