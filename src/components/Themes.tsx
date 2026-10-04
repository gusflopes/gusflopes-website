import { Abertura } from './Abertura';

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

/** "Sobre": trajetória em coluna de leitura e os cinco temas como tabela de grade, sem cards. */
export function Themes() {
  return (
    <section id="about" aria-labelledby="about-title" className="campo-papel py-20 md:py-28">
      <div className="moldura grid gap-12 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Abertura id="about-title" as="h2" titulo="Engenharia é mais do que código" eixo="engenharia" teto={6.5} />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="max-w-[62ch] font-serif text-[1.1875rem] leading-relaxed text-tinta">
            <p>
              Minha trajetória entre <strong className="font-semibold text-laranja-fundo">Direito, Contabilidade, gestão e tecnologia</strong> moldou uma visão sistêmica da engenharia de software.
              Analiso domínio, arquitetura, times e fluxo de entrega como partes do mesmo problema: criar capacidade para o negócio evoluir.
            </p>
            <p className="mt-5 text-tinta-2">
              Hoje, aplico essa perspectiva como líder técnico no sistema de precificação de locação veicular de uma plataforma de mobilidade do Grupo Volkswagen.
            </p>
          </div>

          <dl className="mt-14 border-t-2 border-azul">
            {themes.map((theme) => (
              <div key={theme.title} className="grid gap-2 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-8 py-5 border-b border-filete">
                <dt className="display text-[1.25rem] uppercase leading-[1.02] text-azul">{theme.title}</dt>
                <dd className="font-serif text-[1.0625rem] leading-relaxed text-tinta">{theme.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
