import { useState } from 'react';
import { Search, ArrowRight, ExternalLink, Play } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { EIXOS, EIXO_LIST, type EixoId } from '../../lib/eixos';
import { Amp } from '../Amp';

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

/**
 * Radar: a curadoria fica no azul-escuro (o formato rápido); a leitura dos textos próprios
 * abre em papel. Mesmo índice em linhas dos hubs, com a fonte externa marcada.
 */
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

  return (
    <main className="min-h-screen bg-noite text-nevoa">
      <div className="pt-32 md:pt-40 border-b border-noite-fio">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="display-opsz font-serif font-semibold text-5xl md:text-[4.5rem] leading-[1] text-white">
            Radar
          </h1>
          <p className="mt-6 font-serif text-xl md:text-[1.375rem] leading-[1.5] text-nevoa max-w-[42rem]">
            Curadoria comentada: o que mudou em IA, engenharia e negócios — e por que importa.
          </p>

          {eixosComConteudo.length > 1 ? (
            <nav aria-label="Filtrar por eixo" className="mt-10 flex gap-x-7 overflow-x-auto">
              {[{ id: 'todos' as const, label: 'Todos os eixos' }, ...eixosComConteudo].map((e) => {
                const ativo = selectedEixo === e.id;
                return (
                  <button
                    key={e.id}
                    type="button"
                    aria-pressed={ativo}
                    onClick={() => {
                      setSelectedEixo(e.id);
                      setSelectedCategory('Todos');
                    }}
                    className={`shrink-0 pb-4 border-b-2 -mb-px text-[0.9375rem] font-semibold transition-colors ${
                      ativo ? 'border-laranja text-white' : 'border-transparent text-nevoa-2 hover:text-white'
                    }`}
                  >
                    {e.label}
                  </button>
                );
              })}
            </nav>
          ) : (
            <div className="h-12 md:h-14" />
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 md:pt-12 pb-24 md:pb-32">
        {/* Busca e temas */}
        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8 pb-6 border-b border-noite-fio-forte">
          <label className="relative flex items-center md:w-72 shrink-0">
            <Search size={16} aria-hidden="true" className="absolute left-0 text-nevoa-2" />
            <input
              placeholder="Buscar no radar..."
              aria-label="Buscar no radar"
              className="w-full bg-transparent pl-7 pr-2 py-2 border-b border-noite-fio-forte focus:border-nevoa outline-none text-[0.9375rem] text-white placeholder:text-nevoa-2 font-sans transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const ativo = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={ativo}
                  onClick={() => setSelectedCategory(cat)}
                  className={`h-8 px-3 rounded-[3px] border text-[0.8125rem] font-semibold transition-colors whitespace-nowrap ${
                    ativo
                      ? 'bg-laranja border-laranja text-laranja-tinta'
                      : 'border-noite-fio-forte text-nevoa hover:border-nevoa-2 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <ul>
            {filteredItems.map((item) => {
              const externo = item.isExternal;
              const acao = externo
                ? item.type === 'video'
                  ? 'Assistir Agora'
                  : 'Ler na Fonte'
                : item.type === 'video'
                  ? 'Assistir Vídeo'
                  : 'Ler Artigo';
              return (
                <li key={item.id} className="border-b border-noite-fio">
                  <a
                    href={item.link}
                    {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group grid grid-cols-[minmax(0,1fr)_5.5rem] sm:grid-cols-[minmax(0,1fr)_10rem] md:grid-cols-[8.5rem_minmax(0,1fr)_12rem] gap-x-5 md:gap-x-10 py-7 md:py-10"
                  >
                    <div className="hidden md:flex num font-sans text-sm text-ceu pt-2.5 flex-col gap-y-1">
                      <span>{item.date}</span>
                      <span className="text-nevoa-2">{item.duration}</span>
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-serif text-[1.3125rem] sm:text-[1.75rem] font-semibold leading-[1.2] text-white group-hover:text-laranja-palido transition-colors">
                        {item.title}
                      </h2>
                      <p className="meta mt-2.5">
                        <span className="so-movel">{item.date}</span>
                        {selectedEixo === 'todos' && eixosComConteudo.length > 1 && (
                          <span><Amp>{EIXOS[item.eixo].shortLabel}</Amp></span>
                        )}
                        <span>{item.category}</span>
                        {externo && <span className="text-nevoa">{item.source}</span>}
                      </p>
                      <p className="hidden sm:block mt-3 font-sans text-[1.0625rem] leading-relaxed text-nevoa max-w-[40rem] line-clamp-3">
                        {item.excerpt}
                      </p>
                      <span className="acao mt-4 hidden sm:inline-flex text-laranja">
                        {acao}
                        {externo ? <ExternalLink size={14} aria-hidden="true" /> : <ArrowRight size={15} aria-hidden="true" />}
                      </span>
                    </div>
                    <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden rounded-[3px] bg-noite-2 self-start">
                      <ImageWithFallback
                        src={item.image}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      {item.type === 'video' && (
                        <span className="absolute left-2.5 bottom-2.5 w-9 h-9 rounded-full bg-laranja text-laranja-tinta flex items-center justify-center">
                          <Play size={15} fill="currentColor" className="ml-0.5" aria-hidden="true" />
                        </span>
                      )}
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="py-24 md:py-32 max-w-xl">
            <p className="font-sans text-nevoa">Nenhum item encontrado para sua busca.</p>
            <button
              type="button"
              className="acao mt-3 text-laranja"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Todos');
                setSelectedEixo('todos');
              }}
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
