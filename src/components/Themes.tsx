import { Abertura, NomeCelula } from './Abertura';

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

/** Posição de cada tema na partição 3 + 2 da grade de 12 colunas (desktop). */
const SPAN = ['lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-7', 'lg:col-span-5'];

/**
 * Trabalho da seção: entender quem escreve e em que áreas atua.
 * Composição: abertura em bloco ocupando 7 colunas, trajetória em serifa alinhada pela base;
 * embaixo, os cinco temas como partição de grade (3 + 2) desenhada pelo próprio fundo azul
 * nos vãos de 2px (no celular, só o filete de topo de cada tema). O nome de cada tema é
 * estreita 780 em caixa mista, com o "&" em laranja: a ponte entre os dois termos — a caixa-alta
 * 900 fica só para a abertura da seção.
 */
export function Themes() {
  return (
    <section id="about" aria-labelledby="about-title" className="campo-papel pt-20 md:pt-28 pb-6 md:pb-10">
      <div className="moldura">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-[var(--gutter)] items-end">
          <div className="lg:col-span-7">
            <Abertura id="about-title" as="h2" titulo="Engenharia é mais do que código" eixo="engenharia" teto={10} />
          </div>
          <div className="lg:col-span-5 font-serif text-[1.125rem] leading-relaxed text-tinta border-t-2 border-azul pt-5">
            <p>
              Minha trajetória entre <strong className="font-semibold text-laranja-fundo">Direito, Contabilidade, gestão e tecnologia</strong> moldou uma visão sistêmica da engenharia de software.
              Analiso domínio, arquitetura, times e fluxo de entrega como partes do mesmo problema: criar capacidade para o negócio evoluir.
            </p>
            <p className="mt-5 text-tinta-2">
              Hoje, aplico essa perspectiva como líder técnico no sistema de precificação de locação veicular de uma plataforma de mobilidade do Grupo Volkswagen.
            </p>
          </div>
        </div>

        {/* Celular: só o filete de topo de cada tema, sem caixas fechadas. */}
        <dl className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 md:gap-[2px] md:bg-azul md:border-2 md:border-azul">
          {themes.map((theme, i) => (
            <div key={theme.title} className={`campo-papel ${SPAN[i]} ${i === 4 ? 'md:col-span-2' : ''} max-md:border-t-2 max-md:border-azul pt-5 pb-10 md:p-7 flex flex-col gap-4 md:gap-5`}>
              <NomeCelula titulo={theme.title} as="dt" className="text-azul" />
              <dd className="font-serif text-[1.0625rem] leading-relaxed text-tinta max-w-[46ch]">{theme.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
