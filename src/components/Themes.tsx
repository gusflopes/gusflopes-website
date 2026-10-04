/**
 * "Sobre": a trajetória à esquerda e os cinco temas como uma linha com cinco estações
 * à direita — a mesma gramática do mapa, em tinta sobre o papel.
 */
export function Themes() {
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
    <section id="about" aria-labelledby="about-title" className="papel bg-papel text-tinta py-20 md:py-28 px-4 sm:px-6 border-t border-fio">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-x-14 gap-y-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 id="about-title" className="text-3xl md:text-[2.6rem] leading-[1.08] font-extrabold tracking-[-0.02em] text-noite mb-6">
              Engenharia é mais do que código
            </h2>
            <p className="font-serif text-lg leading-relaxed text-tinta">
              Minha trajetória entre <strong className="font-semibold text-laranja-fundo">Direito, Contabilidade, gestão e tecnologia</strong> moldou uma visão sistêmica da engenharia de software.
              Analiso domínio, arquitetura, times e fluxo de entrega como partes do mesmo problema: criar capacidade para o negócio evoluir.
            </p>
            <p className="font-serif text-base leading-relaxed text-tinta-2 mt-5">
              Hoje, aplico essa perspectiva como líder técnico no sistema de precificação de locação veicular de uma plataforma de mobilidade do Grupo Volkswagen.
            </p>
          </div>
        </div>

        <ol className="lg:col-span-7 list-none m-0 p-0">
          {themes.map((theme, i) => (
            <li key={theme.title} className="relative flex gap-5 pb-10 last:pb-0">
              {/* trilho: começa na primeira estação e termina na última */}
              <span
                aria-hidden="true"
                className={`absolute left-[calc(0.5rem-2.5px)] w-[5px] bg-noite ${i === 0 ? 'top-2' : 'top-0'} ${i === themes.length - 1 ? 'h-2' : 'bottom-0'}`}
              />
              <span aria-hidden="true" className="relative z-[1] mt-1 w-4 h-4 shrink-0 rounded-full bg-papel border-[3px] border-noite" />
              <div>
                <h3 className="text-xl md:text-[1.35rem] font-extrabold tracking-[-0.01em] text-noite leading-tight">
                  {theme.title}
                </h3>
                <p className="mt-2 font-serif text-[1.05rem] leading-relaxed text-tinta-2 max-w-[56ch]">
                  {theme.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
