import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { site } from '../config/site';
import { EIXOS, type EixoId } from '../lib/eixos';
import logo from '../assets/cfa6876664fcc921be5a7c0a58c353ea12577968.png?url';

interface HeaderProps {
  pathname: string;
  /** Eixos com ao menos um texto publicado — eixo vazio não entra no menu. */
  eixosAtivos?: EixoId[];
}

/** Normaliza paths para comparação: remove barras finais ('/radar/' → '/radar'). */
const normalizePath = (p: string) => p.replace(/\/+$/, '') || '/';

/**
 * Barra fixa azul-escuro, chapada (sem vidro). Itens em rótulo estreito; o item ativo ganha
 * um bloco laranja embaixo. "Contato" é o único bloco laranja da barra.
 */
export function Header({ pathname: rawPathname, eixosAtivos = [] }: HeaderProps) {
  const pathname = normalizePath(rawPathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHome = pathname === '/';
  // Páginas de artigo escondem o Header — match por prefixo para cobrir
  // tanto /insights/article (legado) quanto /insights/article/<id> e /radar/article/<id>.
  const isArticlePage =
    pathname.startsWith('/insights/article') || pathname.startsWith('/radar/article/');

  if (isArticlePage) return null;

  // Eixos primeiro (o "para quem"), depois os formatos e a oferta.
  const navItems = [
    ...eixosAtivos.map((id) => ({ label: EIXOS[id].label, href: EIXOS[id].href })),
    { label: 'Radar', href: '/radar' },
    { label: 'Insights', href: '/insights' },
    { label: 'Trabalhe Comigo', href: '/#consulting' },
  ];
  const isActive = (href: string) => href !== '/' && !href.includes('#') && pathname.startsWith(href);

  const handleClick = (e: React.MouseEvent, href: string) => {
    setIsMenuOpen(false);
    if (href === '/' && isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 campo-azul border-b border-azul-3">
      <div className="moldura flex items-center justify-between h-[72px] gap-6">
        <a href="/" onClick={(e) => handleClick(e, '/')} className="shrink-0 py-2">
          <img src={logo} alt="Gusflopes.dev" width={1028} height={556} className="h-11 w-auto" />
        </a>

        <nav aria-label="Principal" className="hidden lg:flex items-stretch h-full">
          {navItems.map((item) => {
            const ativo = isActive(item.href);
            return (
              <a
                key={item.label}
                aria-current={ativo ? 'page' : undefined}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`rotulo relative flex items-center px-3.5 transition-colors ${
                  ativo ? 'text-papel' : 'text-ceu-claro hover:text-papel'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-3.5 right-3.5 bottom-0 h-1 bg-laranja origin-left transition-transform duration-200 ${
                    ativo ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
          <a href={`mailto:${site.email}`} className="botao self-center ml-4 !min-h-10 !px-5 !text-sm">
            Contato
          </a>
        </nav>

        <button
          type="button"
          className="lg:hidden grid place-items-center w-11 h-11 -mr-2 text-papel"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="menu-movel"
        >
          {isMenuOpen ? <X size={26} strokeWidth={2.25} /> : <Menu size={26} strokeWidth={2.25} />}
        </button>
      </div>

      {isMenuOpen && (
        <div id="menu-movel" className="lg:hidden absolute top-full inset-x-0 campo-azul border-b-2 border-laranja">
          <nav aria-label="Principal" className="moldura flex flex-col py-2">
            {navItems.map((item) => {
              const ativo = isActive(item.href);
              return (
                <a
                  key={item.label}
                  aria-current={ativo ? 'page' : undefined}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`display text-[1.75rem] uppercase py-3 border-b border-azul-3 ${
                    ativo ? 'text-laranja' : 'text-papel'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a href={`mailto:${site.email}`} className="botao w-full my-4">
              Contato
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
