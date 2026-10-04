import { FundoPicture } from './FundoPicture';
import type { FundoResponsivo } from '../lib/imagens';

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
 * "Sobre": o quadro já apareceu inteiro no hero; aqui volta só como recorte, uma faixa dos
 * reflexos na água que abre a seção. O conteúdo é tipografia e fio, sem cartões.
 */
export function Themes({ fundo }: { fundo: FundoResponsivo }) {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-noite">
      {/* Recorte do quadro: mesma imagem do hero (mesmo srcset, já em cache) */}
      <div className="relative h-24 md:h-36 overflow-hidden">
        <FundoPicture fundo={fundo} className="object-[50%_88%]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-20 md:pb-28 grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="about-title" className="font-serif text-[2.125rem] md:text-5xl leading-[1.08] tracking-[-0.012em] text-white mb-8">
            Engenharia é mais do que código
          </h2>
          <p className="font-sans text-lg leading-relaxed text-nevoa">
            Minha trajetória entre <strong className="font-semibold text-laranja-claro">Direito, Contabilidade, gestão e tecnologia</strong> moldou uma visão sistêmica da engenharia de software.
            Analiso domínio, arquitetura, times e fluxo de entrega como partes do mesmo problema: criar capacidade para o negócio evoluir.
          </p>
          <p className="font-sans text-base leading-relaxed text-nevoa-2 mt-5">
            Hoje, aplico essa perspectiva como líder técnico no sistema de precificação de locação veicular de uma plataforma de mobilidade do Grupo Volkswagen.
          </p>
        </div>

        <dl className="border-t border-noite-fio-forte">
          {themes.map((theme) => (
            <div
              key={theme.title}
              className="grid gap-2 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10 py-7 md:py-8 border-b border-noite-fio"
            >
              <dt className="font-serif text-[1.375rem] md:text-2xl leading-snug text-white">{theme.title}</dt>
              <dd className="font-sans text-[1.0625rem] leading-relaxed text-nevoa">{theme.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
