import { useState } from 'react';
import { Search, ArrowRight, ExternalLink, Play } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { EIXO_LIST, EIXO_COR, type EixoId } from '../../lib/eixos';
import { PlacaEixo } from '../PlacaEixo';
import { RecorteQuadro } from '../RecorteQuadro';
import type { FundoResponsivo } from '../../lib/imagens';

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
  /** O quadro, para o recorte na base da moldura escura. */
  fundo: FundoResponsivo;
}

/**
 * Radar: moldura em azul-escuro com o recorte do quadro na base, régua de busca no creme e o
 * índice no papel, como os outros hubs. Mesmo índice em linhas; a fonte externa (a voz de outro,
 * que é o que a curadoria comenta) leva o filete ardósia.
 */
export function RadarPage({ items, fundo }: RadarPageProps) {
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
    <main className="claro min-h-screen bg-papel text-tinta">
      <div className="bg-noite pt-32 md:pt-40">
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
            <div className="h-10 md:h-12" />
          )}
        </div>
      </div>

      <RecorteQuadro fundo={fundo} eager />

      {/* Régua de busca e temas no creme */}
      <div className="bg-creme">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-7 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
          <label className="relative flex items-center md:w-72 shrink-0">
            <Search size={16} aria-hidden="true" className="absolute left-0 text-tinta-3" />
            <input
              placeholder="Buscar no radar..."
              aria-label="Buscar no radar"
              className="w-full bg-transparent pl-7 pr-2 py-2 border-b border-creme-fio focus:border-tinta outline-none text-[0.9375rem] text-tinta placeholder:text-tinta-3 font-sans transition-colors"
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
                      : 'border-creme-fio text-tinta-2 hover:border-tinta-3 hover:text-tinta'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 md:pt-10 pb-24 md:pb-32">

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
                <li key={item.id} className="indice-linha">
                  <a
                    href={item.link}
                    {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group grid grid-cols-[minmax(0,1fr)_5.5rem] sm:grid-cols-[minmax(0,1fr)_10rem] md:grid-cols-[8.5rem_minmax(0,1fr)_12rem] gap-x-5 md:gap-x-10 py-7 md:py-10"
                  >
                    <div className="hidden md:flex num font-sans text-sm font-medium text-petroleo-fundo pt-2.5 flex-col gap-y-1">
                      <span>{item.date}</span>
                      <span className="font-normal text-tinta-3">{item.duration}</span>
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-serif text-[1.3125rem] sm:text-[1.75rem] font-semibold leading-[1.2] text-tinta group-hover:text-laranja-fundo transition-colors">
                        {item.title}
                      </h2>
                      <p className="meta mt-2.5">
                        <span className="so-movel">{item.date}</span>
                        {selectedEixo === 'todos' && eixosComConteudo.length > 1 && (
                          <span>
                            <PlacaEixo eixo={item.eixo} />
                          </span>
                        )}
                        <span>{item.category}</span>
                        {externo && <span className="fonte-externa text-tinta-2">{item.source}</span>}
                      </p>
                      <p className="hidden sm:block mt-3 font-sans text-[1.0625rem] leading-relaxed text-tinta-2 max-w-[40rem] line-clamp-3">
                        {item.excerpt}
                      </p>
                      <span className="acao mt-4 hidden sm:inline-flex text-laranja-fundo">
                        {acao}
                        {externo ? <ExternalLink size={14} aria-hidden="true" /> : <ArrowRight size={15} aria-hidden="true" />}
                      </span>
                    </div>
                    <div className={`capa-duotone capa-${EIXO_COR[item.eixo]} relative aspect-square sm:aspect-[4/3] overflow-hidden rounded-[3px] self-start`}>
                      <ImageWithFallback
                        src={item.image}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover"
                        fallbackClassName="bg-transparent"
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
            <p className="font-sans text-tinta-2">Nenhum item encontrado para sua busca.</p>
            <button
              type="button"
              className="acao mt-3 text-laranja-fundo"
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
