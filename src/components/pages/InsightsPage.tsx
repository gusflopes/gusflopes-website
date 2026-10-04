import { useState, type ReactNode } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { EIXOS, EIXO_LIST, type EixoId } from '../../lib/eixos';
import { telaFaixa, type Tela } from '../../lib/telas';
import { TelaPicture } from '../TelaPicture';
import { AberturaHub } from '../AberturaHub';

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
  /** Capa: tela gerada do slug no build (recorte 16:9). */
  tela: Tela;
  /** Retrato 4:5 da capa (destaque do hub), com recorte 16:9 no celular. */
  retrato?: Tela;
  /** Margem pintada do texto (variáveis CSS da classe `.margem`): a lombada no índice. */
  margem?: Record<string, string>;
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

  const [primeiro, ...demais] = filteredArticles;

  return (
    <main className="bg-noite min-h-screen">
      <AberturaHub
        tela={telaFaixa(eixo ?? 'insights')}
        titulo={heading}
        deck={subheading}
        nota={eixo ? <p className="font-sans text-sm font-semibold text-areia">{EIXOS[eixo].publico}</p> : undefined}
      />

      {/* O corpo do hub é papel, como a coluna do artigo: o índice se lê de dia; a noite fica na
          abertura e no rodapé, que chega pela fita depois deste campo claro. */}
      <div className="bg-papel papel">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-8 pb-20 md:pb-28">
        {/* Eixos — só na listagem geral; nos hubs o eixo já está fixo */}
        {!eixo && (
          <nav aria-label="Filtrar por eixo" className="flex flex-wrap gap-x-6 gap-y-1 border-b border-regua">
            {[{ id: 'todos' as const, label: 'Todos os eixos' }, ...EIXO_LIST].map((e) => (
              <button
                key={e.id}
                type="button"
                aria-pressed={selectedEixo === e.id}
                onClick={() => selectEixo(e.id)}
                className={`relative py-3 font-sans text-[0.9375rem] font-semibold transition-colors after:absolute after:left-0 after:-bottom-px after:h-[3px] after:bg-laranja after:w-full after:origin-left after:transition-transform after:duration-300 ${
                  selectedEixo === e.id ? 'text-tinta after:scale-x-100' : 'text-tinta-2 hover:text-tinta after:scale-x-0'
                }`}
              >
                {e.label}
              </button>
            ))}
          </nav>
        )}

        {aside && <div className="mt-10">{aside}</div>}

        {articles.length > 0 && (
          <div className="mt-8 mb-12 md:mb-16 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <label className="flex items-center gap-3 border-b border-ardosia focus-within:border-laranja md:w-72 shrink-0 transition-colors">
              <Search size={16} className="text-tinta-2" aria-hidden="true" />
              <input
                aria-label="Buscar artigos"
                className="bg-transparent border-none outline-none focus-visible:outline-none w-full py-2.5 text-[0.9375rem] text-tinta placeholder:text-tinta-2 font-sans"
                placeholder="Filtrar ideias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 h-8 border font-sans text-[0.8125rem] font-semibold transition-colors whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-laranja border-laranja text-noite'
                      : 'border-regua text-tinta-2 hover:border-petroleo hover:text-tinta'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Destaque: a capa do texto mais recente em retrato (nunca a panorâmica da faixa), o título ao lado. */}
        {primeiro && (
          <article className="cartao mb-14 md:mb-20 grid md:grid-cols-12 md:gap-0">
            <a
              href={primeiro.href}
              tabIndex={-1}
              aria-hidden="true"
              className="block md:col-span-4 h-[200px] sm:h-auto sm:aspect-[16/9] md:aspect-[4/5] overflow-hidden border-b-4 md:border-b-0 md:border-r-4 border-laranja"
            >
              <TelaPicture tela={primeiro.retrato ?? primeiro.tela} sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 100vw" />
            </a>
            <div className="md:col-span-8 flex flex-col justify-end gap-5 pt-7 md:pt-0 md:pl-10 lg:pl-14 md:pb-2">
              <h2 className="font-serif text-3xl md:text-[2.6rem] lg:text-[3rem] leading-[1.06] tracking-[-0.01em] text-tinta max-w-[22ch]">
                <a href={primeiro.href} className="hover:text-laranja-fundo transition-colors">
                  {primeiro.title}
                </a>
              </h2>
              <p className="font-sans text-lg text-tinta-2 leading-relaxed max-w-[60ch]">{primeiro.excerpt}</p>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-regua pt-5">
                <p className="font-sans text-sm text-tinta-2 flex flex-wrap items-center gap-x-1.5">
                  <span className="marca mr-1" aria-hidden="true" />
                  <span className="font-bold text-petroleo">{eixo ? primeiro.category : `${EIXOS[primeiro.eixo].shortLabel} · ${primeiro.category}`}</span>
                  <span aria-hidden="true"> · </span>
                  {primeiro.date} · {primeiro.duration}
                </p>
                <a href={primeiro.href} className="acao text-laranja-fundo">
                  Ler Artigo <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        )}

        {/* Os demais: um índice de leitura em lombadas — cada texto entra com a tira da sua margem
            pintada (a mesma que corre ao lado da coluna dele), uma estante de cores do quadro. */}
        {demais.length > 0 && (
          <ol className="border-t-2 border-t-laranja">
            {demais.map((article) => (
              <li key={article.id} className="relative border-b-2 border-laranja">
                {article.margem && <span aria-hidden="true" className="margem absolute left-0 top-0 bottom-0 w-5 md:w-14" style={article.margem} />}
                <a href={article.href} className={`cartao group grid gap-x-10 gap-y-2 py-7 md:grid-cols-12 ${article.margem ? 'pl-9 md:pl-[5.5rem]' : 'pl-5 lg:pl-8'}`}>
                  <span className="md:col-span-8 flex flex-col gap-2">
                    <span className="font-serif text-[1.4rem] md:text-[1.6rem] leading-snug text-tinta group-hover:text-laranja-fundo transition-colors">
                      {article.title}
                    </span>
                    <span className="font-sans text-tinta-2 leading-relaxed line-clamp-2 max-w-[68ch]">{article.excerpt}</span>
                  </span>
                  <span className="md:col-span-4 flex flex-col gap-1 md:items-end md:text-right md:pt-1.5 font-sans text-sm">
                    <span className="font-bold text-petroleo inline-flex items-center gap-2"><span className="marca" aria-hidden="true" />{eixo ? article.category : `${EIXOS[article.eixo].shortLabel} · ${article.category}`}</span>
                    <span className="text-tinta-2">
                      {article.date} · {article.duration}
                    </span>
                    <span className="acao text-laranja-fundo mt-2">
                      Ler Artigo <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        )}

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="py-24 md:py-32 max-w-xl">
            <p className="font-serif text-2xl md:text-3xl italic text-tinta">O silêncio faz parte da música.</p>
            <p className="font-sans text-tinta-2 mt-3">
              {articles.length === 0 ? 'Os primeiros textos deste eixo estão a caminho.' : 'Nenhum artigo encontrado.'}
            </p>
          </div>
        )}
      </div>
      </div>
    </main>
  );
}
