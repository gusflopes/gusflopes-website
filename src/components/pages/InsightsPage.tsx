import { useState, type ReactNode } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { EIXOS, EIXO_LIST, EIXO_COR, type EixoId } from '../../lib/eixos';
import { Amp } from '../Amp';
import { PlacaEixo } from '../PlacaEixo';
import { RecorteQuadro } from '../RecorteQuadro';
import type { FundoResponsivo } from '../../lib/imagens';

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
  /** O quadro, para o recorte na base da moldura escura (passagem noite → claro). */
  fundo: FundoResponsivo;
}

/**
 * Hub de leitura (Insights e páginas de eixo): moldura em azul-escuro que termina num recorte do
 * quadro, a régua de busca no creme e o índice no papel — data, título, resumo e miniatura em
 * linhas separadas por um fio neutro de 1px, com a marca laranja de 5px sobre a data. O eixo
 * aparece como placa chapada na sua cor do quadro (na moldura do hub e em cada linha do geral).
 */
export function InsightsPage({
  articles,
  heading = 'Insights',
  subheading = 'Textos autorais sobre engenharia, negócio e IA aplicada — organizados em três eixos.',
  eixo,
  aside,
  fundo,
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
      <div className={`bg-noite pt-32 md:pt-40 ${eixo ? 'pb-10 md:pb-12' : 'pb-12 md:pb-14'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="display-opsz font-serif font-semibold text-5xl md:text-[4.5rem] leading-[1] text-white">
            <Amp>{heading}</Amp>
          </h1>
          <p className="mt-6 font-serif text-xl md:text-[1.375rem] leading-[1.5] text-nevoa max-w-[42rem]">{subheading}</p>
          {eixo && <PlacaEixo eixo={eixo} texto={EIXOS[eixo].publico} tamanho="m" className="mt-6" />}

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

      <RecorteQuadro fundo={fundo} eager />

      {/* Régua de busca e temas no creme: a caixa de ferramentas entre o quadro e o índice */}
      {articles.length > 0 && (
        <div className="bg-creme">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-7 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
            <label className="relative flex items-center md:w-72 shrink-0">
              <Search size={16} aria-hidden="true" className="absolute left-0 text-tinta-3" />
              <input
                aria-label="Buscar artigos"
                className="w-full bg-transparent pl-7 pr-2 py-2 border-b border-creme-fio focus:border-tinta outline-none text-[0.9375rem] text-tinta placeholder:text-tinta-3 font-sans transition-colors"
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
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 md:pt-10 pb-24 md:pb-32">
        {aside && <div className="mb-14 empty:hidden">{aside}</div>}

        {/* Índice */}
        <ul>
          {filteredArticles.map((article) => (
            <li key={article.id} className="indice-linha">
              <a
                href={article.href}
                className="group grid grid-cols-[minmax(0,1fr)_5.5rem] sm:grid-cols-[minmax(0,1fr)_10rem] md:grid-cols-[8.5rem_minmax(0,1fr)_12rem] gap-x-5 md:gap-x-10 py-7 md:py-10"
              >
                <p className="hidden md:block num font-sans text-sm font-medium text-petroleo-fundo pt-2.5">
                  {article.date}
                  <span className="block text-tinta-3">{article.duration}</span>
                </p>
                <div className="min-w-0">
                  <h2 className="font-serif text-[1.3125rem] sm:text-[1.75rem] font-semibold leading-[1.2] text-tinta group-hover:text-laranja-fundo transition-colors">
                    {article.title}
                  </h2>
                  <p className="meta mt-2.5">
                    <span className="so-movel">{article.date}</span>
                    {!eixo && (
                      <span>
                        <PlacaEixo eixo={article.eixo} />
                      </span>
                    )}
                    <span>{article.category}</span>
                  </p>
                  <p className="hidden sm:block mt-3 font-sans text-[1.0625rem] leading-relaxed text-tinta-2 max-w-[40rem]">
                    {article.excerpt}
                  </p>
                  <span className="acao mt-4 hidden sm:inline-flex text-laranja-fundo">
                    Ler Artigo
                    <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </div>
                <div className={`capa-duotone capa-${EIXO_COR[article.eixo]} aspect-square sm:aspect-[4/3] overflow-hidden rounded-[3px] self-start`}>
                  <ImageWithFallback
                    src={article.image}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover"
                    fallbackClassName="bg-transparent"
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
