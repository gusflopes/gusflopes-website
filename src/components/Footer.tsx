import { NewsletterForm } from './NewsletterForm';
import { SocialLinks } from './SocialLinks';
import { site, newsletter, projetos, comUtm } from '../config/site';
import { EIXO_LIST } from '../lib/eixos';
import logoLight from '../assets/cfa6876664fcc921be5a7c0a58c353ea12577968.png?url';

const link = 'text-ceu-claro hover:text-papel transition-colors';

export function Footer() {
  return (
    <footer className="campo-azul border-t-4 border-laranja pt-14 pb-8">
      <div className="moldura">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-[var(--gutter)] gap-y-12 mb-14">
          <div className="lg:col-span-4">
            <img src={logoLight} alt="Gusflopes.dev" width={1028} height={556} loading="lazy" className="h-14 w-auto mb-6" />
            <p className="font-serif text-[1rem] leading-relaxed text-ceu-claro max-w-[36ch]">
              Tecnologia e negócio, partes do mesmo sistema. Arquitetura, plataformas e IA aplicada para sistemas que evoluem.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="rotulo text-papel pb-3 mb-4 border-b-2 border-papel">Navegação</h2>
            <ul className="space-y-2.5 font-sans [font-stretch:87%] text-[0.9375rem]">
              {EIXO_LIST.map((eixo) => (
                <li key={eixo.id}>
                  <a href={eixo.href} className={link}>{eixo.label}</a>
                </li>
              ))}
              <li><a href="/radar" className={link}>Radar</a></li>
              <li><a href="/insights" className={link}>Insights</a></li>
              <li><a href="/newsletter" className={link}>Newsletter</a></li>
              <li><a href="/#about" className={link}>Sobre</a></li>
              <li>
                <a href={comUtm(projetos.reforma.url, projetos.reforma.campanha, 'footer')} className={link}>
                  {projetos.reforma.nome}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="rotulo text-papel pb-3 mb-4 border-b-2 border-papel">Contato</h2>
            <ul className="space-y-2.5 font-sans [font-stretch:87%] text-[0.9375rem]">
              <li><a href={`mailto:${site.email}`} className={`${link} break-all`}>{site.email}</a></li>
              <li className="text-ceu-claro">Brasil | Global</li>
            </ul>
            <SocialLinks className="mt-5" linkClassName="text-ceu-claro hover:text-laranja" />
          </div>

          <div className="lg:col-span-3">
            <h2 className="rotulo text-papel pb-3 mb-4 border-b-2 border-papel">{newsletter.name}</h2>
            <p className="font-sans [font-stretch:87%] text-[0.9375rem] leading-relaxed text-ceu-claro mb-5">{newsletter.pitch}</p>
            <NewsletterForm variant="footer" />
          </div>
        </div>

        <div className="border-t border-azul-3 pt-6 flex flex-col md:flex-row justify-between gap-4">
          <p className="rotulo !tracking-[0.08em] text-ceu">
            © {new Date().getFullYear()} Gusflopes.dev. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 rotulo !tracking-[0.08em]">
            <a href="/privacy" className="text-ceu hover:text-papel">Política de Privacidade</a>
            <a href="/terms" className="text-ceu hover:text-papel">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
