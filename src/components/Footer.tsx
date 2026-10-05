import { ImageWithFallback } from './figma/ImageWithFallback';
import { NewsletterForm } from './NewsletterForm';
import { SocialLinks } from './SocialLinks';
import { site, newsletter, projetos, comUtm } from '../config/site';
import { EIXO_LIST } from '../lib/eixos';
import { telaRodape } from '../lib/telas';
import { TelaPicture } from './TelaPicture';
import logoLight from '../assets/logo.webp?url';

export function Footer({ rodape = 'padrao' }: { rodape?: string }) {
  return (
    <footer>
      {/* A passagem: toda página termina num campo claro, e o rodapé chega por esta fita pintada
          (semente própria por página), do claro à noite. A borda de cima é pintada e irregular, e o
          que fica atrás dela é papel (o claro em que toda página termina): sem emenda reta e sem fio. */}
      <div className="h-[110px] md:h-[150px] overflow-hidden bg-papel" aria-hidden="true">
        <TelaPicture tela={telaRodape(rodape)} sizes="100vw" className="bg-transparent" />
      </div>
      <div className="bg-noite">
      <div className="max-w-7xl mx-auto pt-12 md:pt-14 pb-8 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <ImageWithFallback
                src={logoLight}
                alt="Gusflopes.dev"
                width={311}
                height={168}
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
            <h2 className="rotulo text-areia mb-4 flex items-center gap-2.5"><span className="marca" aria-hidden="true" />Navegação</h2>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-2.5 text-[0.9375rem]">
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
            <h2 className="rotulo text-areia mb-4 flex items-center gap-2.5"><span className="marca" aria-hidden="true" />Contato</h2>
            <ul className="space-y-2.5 text-[0.9375rem]">
              <li><a href={`mailto:${site.email}`} className="text-nevoa hover:text-white underline decoration-transparent hover:decoration-laranja transition-colors">{site.email}</a></li>
              <li className="text-bruma">Brasil | Global</li>
            </ul>
            <SocialLinks className="mt-4" linkClassName="text-nevoa hover:text-laranja-claro" />
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="rotulo text-areia mb-4 flex items-center gap-2.5"><span className="marca" aria-hidden="true" />{newsletter.name}</h2>
            <p className="text-nevoa text-sm leading-relaxed mb-4">{newsletter.pitch}</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-linha pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-bruma text-xs">
            © {new Date().getFullYear()} Gusflopes.dev. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-xs text-bruma">
            <a href="/privacy" className="inline-flex items-center min-h-11 hover:text-white">Política de Privacidade</a>
            <a href="/terms" className="inline-flex items-center min-h-11 hover:text-white">Termos de Uso</a>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
