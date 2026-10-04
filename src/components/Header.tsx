import { useState, useEffect } from 'react';
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

export function Header({ pathname: rawPathname, eixosAtivos = [] }: HeaderProps) {
  const pathname = normalizePath(rawPathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHome = pathname === '/';
  // Páginas de artigo escondem o Header — match por prefixo para cobrir
  // tanto /insights/article (legado) quanto /insights/article/<id> e /radar/article/<id>.
  const isArticlePage =
    pathname.startsWith('/insights/article') || pathname.startsWith('/radar/article/');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Na home o header nasce transparente sobre o quadro e vira azul sólido ao rolar.
  const solido = isScrolled || !isHome || isMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-300 border-b ${
        solido ? 'bg-noite border-noite-fio' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-6">
        <a href="/" onClick={(e) => handleClick(e, '/')} className="shrink-0">
          <img src={logo} alt="Gusflopes.dev" width={1028} height={556} className="h-11 w-auto" />
        </a>

        <nav aria-label="Principal" className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => {
            const ativo = isActive(item.href);
            return (
              <a
                key={item.label}
                aria-current={ativo ? 'page' : undefined}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`relative py-2 text-[0.9375rem] font-medium transition-colors after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:origin-left after:transition-transform after:duration-300 ${
                  ativo
                    ? 'text-white after:bg-laranja after:scale-x-100'
                    : 'text-nevoa hover:text-white after:bg-nevoa after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center h-9 px-4 rounded-[3px] border border-laranja text-laranja text-[0.9375rem] font-semibold transition-colors hover:bg-laranja hover:text-brasa"
          >
            Contato
          </a>
        </nav>

        <button
          type="button"
          className="lg:hidden -mr-2 p-2 text-white rounded-[3px]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="menu-movel"
        >
          {isMenuOpen ? <X size={24} strokeWidth={1.75} /> : <Menu size={24} strokeWidth={1.75} />}
        </button>
      </div>

      {isMenuOpen && (
        <div id="menu-movel" className="lg:hidden bg-noite border-t border-noite-fio px-4 sm:px-6 pb-6">
          <nav aria-label="Principal" className="flex flex-col">
            {navItems.map((item) => {
              const ativo = isActive(item.href);
              return (
                <a
                  key={item.label}
                  aria-current={ativo ? 'page' : undefined}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`py-3.5 border-b border-noite-fio font-serif text-xl ${
                    ativo ? 'text-laranja' : 'text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a href={`mailto:${site.email}`} className="botao mt-6 w-full">
              Contato
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
