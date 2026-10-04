import { useState } from 'react';
import { Search, Calendar, Clock, ArrowRight, ExternalLink, PlayCircle } from 'lucide-react';
import { EIXOS, EIXO_LIST, type EixoId } from '../../lib/eixos';
import { COR_LINHA } from '../../lib/linhas';

export interface RadarItem {
  id: string;
  title: string;
  excerpt: string;
  /** Data já formatada para exibição pt-BR (ex: "10 Jun, 2026"). */
  date: string;
  duration: string;
  category: string;
  eixo: EixoId;
  type: 'article' | 'video';
  isExternal: boolean;
  link: string;
  source: string;
  image: string;
}

interface RadarPageProps {
  items: RadarItem[];
}

export function RadarPage({ items }: RadarPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedEixo, setSelectedEixo] = useState<EixoId | 'todos'>('todos');

  const inEixo = items.filter((item) => selectedEixo === 'todos' || item.eixo === selectedEixo);
  // Categorias derivadas do conteúdo do eixo selecionado.
  const categories = ['Todos', ...Array.from(new Set(inEixo.map((item) => item.category)))];
  // Só mostra o filtro de eixo quando há conteúdo em mais de um eixo.
  const eixosComConteudo = EIXO_LIST.filter((e) => items.some((item) => item.eixo === e.id));

  const term = searchTerm.toLowerCase();
  const filteredItems = inEixo.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(term) || item.excerpt.toLowerCase().includes(term);
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const limpar = () => {
    setSearchTerm('');
    setSelectedCategory('Todos');
    setSelectedEixo('todos');
  };

  return (
    <main className="min-h-screen bg-noite text-luz">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 md:pt-16 pb-24">
        <header className="mb-10 md:mb-12 max-w-3xl">
          <h1 className="text-5xl md:text-7xl leading-none font-extrabold tracking-[-0.035em] text-white">
            Radar
          </h1>
          <p className="mt-5 font-serif text-lg md:text-xl leading-relaxed text-nevoa">
            Curadoria comentada: o que mudou em IA, engenharia e negócios — e por que importa.
          </p>
        </header>

        {eixosComConteudo.length > 1 && (
          <nav aria-label="Filtrar por eixo" className="flex flex-wrap gap-2 mb-6">
            {[{ id: 'todos' as const, label: 'Todos os eixos' }, ...eixosComConteudo].map((e) => {
              const ativo = selectedEixo === e.id;
              const cor = e.id === 'todos' ? undefined : COR_LINHA[e.id];
              return (
                <button
                  key={e.id}
                  type="button"
                  aria-pressed={ativo}
                  onClick={() => {
                    setSelectedEixo(e.id);
                    setSelectedCategory('Todos');
                  }}
                  style={cor ? ({ '--linha': cor } as React.CSSProperties) : undefined}
                  className={`inline-flex items-center gap-2.5 min-h-10 px-4 rounded-full border text-sm font-bold transition-colors ${
                    ativo ? 'bg-luz border-luz text-noite' : 'border-trilho text-nevoa hover:border-nevoa hover:text-white'
                  }`}
                >
                  {cor && <span className="linha-roundel" aria-hidden="true" />}
                  {e.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* Busca e temas */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 pb-6 mb-10 border-b border-trilho">
          <label className="relative flex items-center md:w-80 shrink-0">
            <Search size={16} aria-hidden="true" className="absolute left-3.5 text-nevoa pointer-events-none" />
            <input
              type="search"
              placeholder="Buscar no radar..."
              aria-label="Buscar no radar"
              className="w-full h-11 pl-10 pr-3 rounded-md bg-noite-2 border border-trilho text-[0.95rem] text-luz placeholder:text-nevoa/80 focus:outline-none focus:border-laranja-claro"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-9 px-3 rounded-md text-[0.8rem] font-bold uppercase tracking-[0.06em] transition-colors whitespace-nowrap ${
                  selectedCategory === cat ? 'bg-laranja text-brasa' : 'text-nevoa hover:text-white hover:bg-noite-2'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Serviço expresso: trilho tracejado; textos autorais são estações, links externos são paradas de passagem */}
        {filteredItems.length > 0 ? (
          <ol className="list-none m-0 p-0 max-w-3xl">
            {filteredItems.map((item, idx) => {
              const ultimo = idx === filteredItems.length - 1;
              return (
                <li key={item.id} className="flex gap-5">
                  <div
                    aria-hidden="true"
                    className={`trilhos ${idx === 0 ? 'trilhos-inicio' : ''} ${ultimo ? 'trilhos-fim' : ''}`}
                  >
                    <span data-tracejado style={{ '--linha': 'var(--color-trilho)' } as React.CSSProperties}>
                      {item.isExternal ? (
                        <span className="block mt-[0.6rem] w-2.5 h-2.5 rounded-full relative z-[1]" style={{ background: COR_LINHA[item.eixo] }} />
                      ) : (
                        <span className="estacao-ponto" style={{ borderColor: COR_LINHA[item.eixo] }} />
                      )}
                    </span>
                  </div>
                  <article className="min-w-0 flex-1 pb-12 flex flex-col">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8rem] font-semibold text-nevoa">
                      <span className="inline-flex items-center gap-1.5 tabular-nums"><Calendar size={12} aria-hidden="true" /> {item.date}</span>
                      <span className="inline-flex items-center gap-1.5"><Clock size={12} aria-hidden="true" /> {item.duration}</span>
                      {item.isExternal && (
                        <span className="px-2 py-0.5 rounded-sm border border-trilho text-[0.72rem] text-nevoa">{item.source}</span>
                      )}
                    </p>
                    <p className="mt-2 text-[0.75rem] font-bold uppercase tracking-[0.1em]" style={{ color: COR_LINHA[item.eixo] }}>
                      {selectedEixo === 'todos' && eixosComConteudo.length > 1
                        ? `${EIXOS[item.eixo].shortLabel} · ${item.category}`
                        : item.category}
                    </p>
                    <h2 className="mt-1.5 text-xl md:text-[1.4rem] leading-snug font-extrabold tracking-[-0.015em] text-white">
                      {item.type === 'video' && <PlayCircle size={20} aria-hidden="true" className="inline -mt-1 mr-2 text-laranja-claro" />}
                      {item.title}
                    </h2>
                    <p className="mt-2 font-serif text-[1.02rem] leading-relaxed text-nevoa line-clamp-3">
                      {item.excerpt}
                    </p>
                    {item.isExternal ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-4 inline-flex items-center gap-2 self-start min-h-8 text-xs font-bold uppercase tracking-[0.1em] text-laranja-claro hover:text-white"
                      >
                        {item.type === 'video' ? 'Assistir Agora' : 'Ler na Fonte'}
                        <ExternalLink size={14} aria-hidden="true" />
                      </a>
                    ) : (
                      <a
                        href={item.link}
                        className="group mt-4 inline-flex items-center gap-2 self-start min-h-8 text-xs font-bold uppercase tracking-[0.1em] text-laranja-claro hover:text-white"
                      >
                        {item.type === 'video' ? 'Assistir Vídeo' : 'Ler Artigo'}
                        <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                      </a>
                    )}
                  </article>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="py-20 border-t border-trilho">
            <p className="text-nevoa">Nenhum item encontrado para sua busca.</p>
            <button type="button" className="mt-3 min-h-10 text-sm font-bold text-laranja-claro hover:text-white" onClick={limpar}>
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
