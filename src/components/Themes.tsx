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
/** A célula em tom de papel #EEE7E1 com faixa grossa de areia no topo (a mais larga da partição). */
const CAMPO = 3;

/**
 * Trabalho da seção: entender quem escreve e em que áreas atua.
 * Composição: abertura em bloco ocupando 7 colunas, trajetória em serifa alinhada pela base;
 * embaixo, os cinco temas como partição de grade (3 + 2) desenhada pelo próprio fundo azul
 * nos vãos de 2px (no celular, só o filete de topo de cada tema). O nome de cada tema é
 * estreita 780 em caixa mista, com o "&" na cor do texto (regra única do site) — a caixa-alta
 * 900 fica só para a abertura da seção.
 */
export function Themes() {
  return (
    <section id="about" aria-labelledby="about-title" className="campo-papel campo-creme pt-20 md:pt-28 pb-6 md:pb-10">
      <div className="moldura">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-[var(--gutter)] items-end">
          <div className="lg:col-span-7">
            <Abertura id="about-title" as="h2" titulo="Engenharia é mais do que código" eixo="engenharia" teto={10} />
          </div>
          <div className="lg:col-span-5 font-serif text-[1.125rem] leading-relaxed text-tinta border-t-2 border-laranja pt-5">
            <p>
              Minha trajetória entre <strong className="font-semibold text-laranja-fundo">Direito, Contabilidade, gestão e tecnologia</strong> moldou uma visão sistêmica da engenharia de software.
              Analiso domínio, arquitetura, times e fluxo de entrega como partes do mesmo problema: criar capacidade para o negócio evoluir.
            </p>
            <p className="mt-5 text-tinta-2">
              Hoje, aplico essa perspectiva como líder técnico no sistema de precificação de locação veicular de uma plataforma de mobilidade do Grupo Volkswagen.
            </p>
          </div>
        </div>

        {/*
          Celular: só o filete de topo de cada tema, em laranja (presença), sem caixas fechadas.
          Desktop: partição 3 + 2 desenhada pelo fundo azul nos vãos de 2px (sem marca de canto: era confete), com os
          filetes de cima e de baixo em laranja;
          a célula mais larga fica em #EEE7E1 com faixa de areia de 12px no topo (areia não é fundo de leitura).
        */}
        <dl className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 md:gap-[2px] md:bg-azul md:border-2 md:border-azul md:border-y-laranja">
          {themes.map((theme, i) => {
            const campo = i === CAMPO;
            return (
              <div
                key={theme.title}
                className={`relative ${campo ? 'bg-papel-2 text-azul' : 'campo-papel'} ${SPAN[i]} ${i === 4 ? 'md:col-span-2' : ''} max-md:border-t-2 max-md:border-laranja ${campo ? 'max-md:px-5' : ''} ${campo ? 'pt-8 md:pt-11' : 'pt-5 md:pt-8'} pb-10 md:px-7 md:pb-7 flex flex-col gap-4 md:gap-5`}
              >
                {campo && <span className="absolute inset-x-0 top-0 h-3 bg-areia max-md:top-[2px]" aria-hidden="true" />}
                <NomeCelula titulo={theme.title} as="dt" className="text-azul" />
                <dd className={`font-serif text-[1.0625rem] leading-relaxed max-w-[46ch] ${campo ? 'text-azul' : 'text-tinta'}`}>{theme.description}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
