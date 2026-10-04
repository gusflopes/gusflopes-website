import { ImageWithFallback } from './figma/ImageWithFallback';
import { NewsletterForm } from './NewsletterForm';
import { SocialLinks } from './SocialLinks';
import { site, newsletter, projetos, comUtm } from '../config/site';
import { EIXO_LIST } from '../lib/eixos';
import logoLight from '../assets/cfa6876664fcc921be5a7c0a58c353ea12577968.png?url';

export function Footer() {
  return (
    <footer className="bg-noite border-t border-linha pt-14 md:pt-16 pb-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <ImageWithFallback
                src={logoLight}
                alt="Gusflopes.dev"
                width={1028}
                height={556}
                loading="lazy"
                className="h-14 w-auto"
              />
            </div>
            <p className="font-serif text-nevoa text-base leading-relaxed max-w-xs">
              Tecnologia e negócio, partes do mesmo sistema. Arquitetura, plataformas e IA aplicada para sistemas que evoluem.
            </p>
          </div>

          {/* Links */}
          <div>
            <h2 className="rotulo text-bruma mb-4">Navegação</h2>
            <ul className="space-y-2.5 text-[0.9375rem]">
              {EIXO_LIST.map((eixo) => (
                <li key={eixo.id}>
                  <a href={eixo.href} className="text-nevoa hover:text-white underline decoration-transparent hover:decoration-laranja transition-colors">{eixo.label}</a>
                </li>
              ))}
              <li><a href="/radar" className="text-nevoa hover:text-white underline decoration-transparent hover:decoration-laranja transition-colors">Radar</a></li>
              <li><a href="/insights" className="text-nevoa hover:text-white underline decoration-transparent hover:decoration-laranja transition-colors">Insights</a></li>
              <li><a href="/newsletter" className="text-nevoa hover:text-white underline decoration-transparent hover:decoration-laranja transition-colors">Newsletter</a></li>
              <li><a href="/#about" className="text-nevoa hover:text-white underline decoration-transparent hover:decoration-laranja transition-colors">Sobre</a></li>
              <li>
                <a
                  href={comUtm(projetos.reforma.url, projetos.reforma.campanha, 'footer')}
                  className="text-nevoa hover:text-white underline decoration-transparent hover:decoration-laranja transition-colors"
                >
                  {projetos.reforma.nome}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="rotulo text-bruma mb-4">Contato</h2>
            <ul className="space-y-2.5 text-[0.9375rem]">
              <li><a href={`mailto:${site.email}`} className="text-nevoa hover:text-white underline decoration-transparent hover:decoration-laranja transition-colors">{site.email}</a></li>
              <li className="text-bruma">Brasil | Global</li>
            </ul>
            <SocialLinks className="mt-4" linkClassName="text-nevoa hover:text-laranja-claro" />
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="rotulo text-bruma mb-4">{newsletter.name}</h2>
            <p className="text-nevoa text-sm leading-relaxed mb-4">{newsletter.pitch}</p>
            <NewsletterForm variant="footer" />
          </div>
        </div>

        <div className="border-t border-linha pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-bruma text-xs">
            © {new Date().getFullYear()} Gusflopes.dev. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-xs text-bruma">
            <a href="/privacy" className="hover:text-white">Política de Privacidade</a>
            <a href="/terms" className="hover:text-white">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
