import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
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
    <header className="sticky top-0 z-50 bg-noite border-b border-linha">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-[72px] flex items-center justify-between gap-6">
        <a href="/" onClick={(e) => handleClick(e, '/')} className="shrink-0">
          <ImageWithFallback src={logo} alt="Gusflopes.dev" width={1028} height={556} className="h-10 md:h-11 w-auto" />
        </a>

        <nav aria-label="Principal" className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <a
              key={item.label}
              aria-current={isActive(item.href) ? 'page' : undefined}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`relative py-2 font-sans text-[0.9375rem] font-medium transition-colors after:absolute after:left-0 after:-bottom-px after:h-[2px] after:bg-laranja after:transition-[width] after:duration-300 ${
                isActive(item.href) ? 'text-white after:w-full' : 'text-nevoa hover:text-white after:w-0 hover:after:w-full'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="font-sans text-[0.9375rem] font-bold text-laranja-claro border border-laranja/70 px-4 h-10 inline-flex items-center hover:bg-laranja hover:text-brasa hover:border-laranja transition-colors"
          >
            Contato
          </a>
        </nav>

        <button
          type="button"
          className="lg:hidden -mr-2 p-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="menu-movel"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div id="menu-movel" className="lg:hidden absolute top-full left-0 right-0 bg-noite border-b border-linha fio">
          <nav aria-label="Principal" className="flex flex-col px-4 py-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                aria-current={isActive(item.href) ? 'page' : undefined}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`font-serif text-xl py-3 border-b border-linha/70 ${
                  isActive(item.href) ? 'text-laranja-claro' : 'text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a href={`mailto:${site.email}`} className="botao mt-5 w-full">
              Contato
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
