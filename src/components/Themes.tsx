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
 * "Sobre": mostrar quem escreve e por que a visão é sistêmica. Em papel frio, como a abertura de
 * um ensaio de revista: o título e a trajetória no alto; a frase-tese (a segunda do parágrafo,
 * sem mudar uma vírgula) vira a citação que domina a página; embaixo, as cinco áreas formam um
 * QUADRO de fios — partes do mesmo problema — e a sexta casa, em azul-noite, é onde tudo isso
 * se aplica hoje.
 */
export function Themes() {
  return (
    <section id="about" aria-labelledby="about-title" className="claro bg-papel text-tinta px-4 sm:px-6 pt-16 md:pt-24 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-10 lg:items-end">
          <h2 id="about-title" className="h-secao text-tinta lg:col-span-6">
            Engenharia é <span className="acento">mais do que código</span>
          </h2>
          <p className="font-sans text-[1.0625rem] leading-relaxed text-tinta-2 lg:col-span-5 lg:col-start-8 lg:pb-1.5 max-w-[34rem]">
            Minha trajetória entre <strong className="font-semibold text-tinta">Direito, Contabilidade, gestão e tecnologia</strong> moldou uma visão sistêmica da engenharia de software.
          </p>
        </div>

        {/* A frase-tese, em escala de citação: é ela que a seção quer que fique */}
        <p className="mt-12 md:mt-16 pt-9 md:pt-12 border-t border-tinta font-serif font-normal text-tinta text-[1.5rem] leading-[1.25] md:text-[2.25rem] md:leading-[1.16] tracking-[-0.016em] max-w-[34ch] [text-wrap:balance] lg:ml-[calc((100%+2.5rem)/12)]">
          Analiso domínio, arquitetura, times e fluxo de entrega como partes do mesmo problema: <em className="italic">criar capacidade para o negócio evoluir.</em>
        </p>

        {/* O quadro das cinco áreas: uma grade de fios (não cartões) — e a sexta casa, o hoje */}
        <div role="list" className="mt-12 md:mt-16 grid gap-px bg-papel-fio border-y border-papel-fio md:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme, i) => (
            <div key={theme.title} role="listitem" className="bg-papel py-7 md:py-8 md:px-7 lg:px-8">
              <h3 className="font-serif font-medium text-tinta text-[1.375rem] md:text-[1.5rem] leading-[1.12] tracking-[-0.014em]">
                <Amp ponte={i === 0}>{theme.title}</Amp>
              </h3>
              <p className="mt-3 font-sans text-[0.9375rem] md:text-[1rem] leading-relaxed text-tinta-2">
                {theme.description}
              </p>
            </div>
          ))}
          <div role="listitem" className="bg-noite text-nevoa px-6 py-7 md:px-7 md:py-8 lg:px-8 flex items-end">
            <p className="font-serif text-[1.125rem] md:text-[1.1875rem] leading-[1.5]">
              Hoje, aplico essa perspectiva como líder técnico no sistema de precificação de locação veicular de uma plataforma de mobilidade do Grupo Volkswagen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
