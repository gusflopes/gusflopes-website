import { useState, type ReactNode } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { EIXOS, EIXO_LIST, type EixoId } from '../../lib/eixos';

export interface InsightArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  eixo: EixoId;
  /** Rota do artigo (insights ou radar local). */
  href: string;
  /** Data já formatada para exibição pt-BR (ex: "10 Jun, 2026"). */
  date: string;
  /** Data ISO (YYYY-MM-DD), para ordenação e metadados. */
  isoDate: string;
  duration: string;
  image: string;
}

interface InsightsPageProps {
  articles: InsightArticle[];
  /** Título da página (default: "Insights"). Usado pelas páginas de eixo. */
  heading?: string;
  subheading?: string;
  /** Quando definido, a página é o hub de um eixo: some o filtro de eixo e aparece a linha de público. */
  eixo?: EixoId;
  /** Conteúdo extra abaixo do cabeçalho (ex.: destaque de projeto no eixo Bastidores). */
  aside?: ReactNode;
}

/**
 * Hub de leitura (Insights e páginas de eixo): cabeçalho em azul-escuro e um índice em papel
 * frio — data, título, resumo e miniatura em linhas separadas por fio, fácil de varrer.
 */
export function InsightsPage({
  articles,
  heading = 'Insights',
  subheading = 'Textos autorais sobre engenharia, negócio e IA aplicada — organizados em três eixos.',
  eixo,
  aside,
}: InsightsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedEixo, setSelectedEixo] = useState<EixoId | 'todos'>('todos');

  const eixoFilter = eixo ?? selectedEixo;
  const inEixo = articles.filter((a) => eixoFilter === 'todos' || a.eixo === eixoFilter);
  // Categorias derivadas do conteúdo visível no eixo — nunca um pill que leve a lista vazia.
  const categories = ['Todos', ...Array.from(new Set(inEixo.map((a) => a.category)))];

  const term = searchTerm.toLowerCase();
  const filteredArticles = inEixo.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(term) || article.excerpt.toLowerCase().includes(term);
    const matchesCategory = selectedCategory === 'Todos' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectEixo = (id: EixoId | 'todos') => {
    setSelectedEixo(id);
    setSelectedCategory('Todos');
  };

  return (
    <main className="claro min-h-screen bg-papel text-tinta">
      {/* Moldura: cabeçalho em azul-escuro */}
      <div className="bg-noite pt-32 md:pt-40 pb-12 md:pb-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="font-serif font-semibold text-5xl md:text-[4.25rem] leading-[1.02] tracking-[-0.018em] text-white">
            {heading}
          </h1>
          <p className="mt-6 font-serif text-xl md:text-[1.375rem] leading-[1.5] text-nevoa max-w-[42rem]">{subheading}</p>
          {eixo && <p className="mt-4 font-sans text-[0.9375rem] font-semibold text-laranja-claro">{EIXOS[eixo].publico}</p>}

          {/* Eixos — só na listagem geral; nos hubs o eixo já está fixo */}
          {!eixo && (
            <nav aria-label="Filtrar por eixo" className="mt-10 -mb-12 md:-mb-14 flex gap-x-7 overflow-x-auto">
              {[{ id: 'todos' as const, label: 'Todos os eixos' }, ...EIXO_LIST].map((e) => {
                const ativo = selectedEixo === e.id;
                return (
                  <button
                    key={e.id}
                    type="button"
                    aria-pressed={ativo}
                    onClick={() => selectEixo(e.id)}
                    className={`shrink-0 pb-4 border-b-2 text-[0.9375rem] font-semibold transition-colors ${
                      ativo ? 'border-laranja text-white' : 'border-transparent text-nevoa-2 hover:text-white'
                    }`}
                  >
                    {e.label}
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 md:pt-12 pb-24 md:pb-32">
        {aside && <div className="mb-14">{aside}</div>}

        {/* Busca e temas */}
        {articles.length > 0 && (
          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8 pb-6 border-b border-tinta">
            <label className="relative flex items-center md:w-72 shrink-0">
              <Search size={16} aria-hidden="true" className="absolute left-0 text-tinta-3" />
              <input
                aria-label="Buscar artigos"
                className="w-full bg-transparent pl-7 pr-2 py-2 border-b border-papel-fio focus:border-tinta outline-none text-[0.9375rem] text-tinta placeholder:text-tinta-3 font-sans transition-colors"
                placeholder="Filtrar ideias..."
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
                        ? 'bg-tinta border-tinta text-papel'
                        : 'border-papel-fio text-tinta-2 hover:border-tinta-3 hover:text-tinta'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Índice */}
        <ul>
          {filteredArticles.map((article) => (
            <li key={article.id} className="border-b border-papel-fio">
              <a
                href={article.href}
                className="group grid grid-cols-[minmax(0,1fr)_5.5rem] sm:grid-cols-[minmax(0,1fr)_10rem] md:grid-cols-[8.5rem_minmax(0,1fr)_12rem] gap-x-5 md:gap-x-10 gap-y-3 py-8 md:py-10"
              >
                <p className="num col-span-2 md:col-span-1 font-sans text-sm text-tinta-3 md:pt-2">
                  {article.date}
                  <span className="md:block">
                    <span className="md:hidden"> · </span>
                    {article.duration}
                  </span>
                </p>
                <div className="min-w-0">
                  <p className="rotulo text-laranja-fundo mb-3">
                    {eixo ? article.category : `${EIXOS[article.eixo].shortLabel} · ${article.category}`}
                  </p>
                  <h2 className="font-serif text-[1.375rem] sm:text-[1.75rem] font-semibold leading-[1.22] text-tinta group-hover:text-laranja-fundo transition-colors">
                    {article.title}
                  </h2>
                  <p className="hidden sm:block mt-3 font-sans text-[1.0625rem] leading-relaxed text-tinta-2 max-w-[40rem]">
                    {article.excerpt}
                  </p>
                  <span className="mt-4 hidden sm:inline-flex items-center gap-2 font-sans text-sm font-semibold text-tinta">
                    Ler Artigo
                    <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
                <div className="aspect-square sm:aspect-[4/3] overflow-hidden rounded-[3px] bg-papel-2 self-start">
                  <ImageWithFallback
                    src={article.image}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>
            </li>
          ))}
        </ul>

        {/* Estado vazio */}
        {filteredArticles.length === 0 && (
          <div className="py-24 md:py-32 max-w-xl">
            <p className="font-serif text-2xl md:text-3xl italic text-tinta">O silêncio faz parte da música.</p>
            <p className="font-sans text-[0.9375rem] text-tinta-2 mt-3">
              {articles.length === 0 ? 'Os primeiros textos deste eixo estão a caminho.' : 'Nenhum artigo encontrado.'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
