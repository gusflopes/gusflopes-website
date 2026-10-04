import { NewsletterForm } from './NewsletterForm';
import { SocialLinks } from './SocialLinks';
import { site, newsletter, projetos, comUtm } from '../config/site';
import { EIXO_LIST } from '../lib/eixos';
import logoLight from '../assets/cfa6876664fcc921be5a7c0a58c353ea12577968.png?url';

const link = 'text-ceu-claro hover:text-papel transition-colors';

/**
 * Rodapé: grade de células azul com filetes azul-3 (o fundo nos vãos de 2px); a coluna da
 * newsletter é uma célula de creme com filete laranja de 6px no topo, e o laranja chapado fica
 * só no botão (o hero e a caixa do autor já têm o plano laranja da newsletter; aqui ele não se
 * repete). No celular a célula de creme abre o rodapé: a passagem do claro para o azul é um
 * gesto (claro → creme com filete → azul), não um corte seco.
 */
export function Footer({ newsletterPrimeiro = true }: { newsletterPrimeiro?: boolean }) {
  return (
    <footer className="campo-azul pb-8">
      <div className={`moldura !px-0 md:!px-[var(--gutter)] pt-14 md:pt-20 ${newsletterPrimeiro ? 'max-md:!pt-0' : ''}`}>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[2px] bg-azul-3 border-y-2 border-azul-3 mb-8 ${newsletterPrimeiro ? 'max-md:border-t-0' : ''}`}>
          <div className="bg-azul lg:col-span-4 px-[var(--gutter)] md:px-0 md:pr-8 py-8">
            <img src={logoLight} alt="Gusflopes.dev" width={1028} height={556} loading="lazy" className="h-14 w-auto mb-6" />
            <p className="font-serif text-[1rem] leading-relaxed text-ceu-claro max-w-[36ch]">
              Tecnologia e negócio, partes do mesmo sistema. Arquitetura, plataformas e IA aplicada para sistemas que evoluem.
            </p>
          </div>

          <div className="bg-azul lg:col-span-3 px-[var(--gutter)] md:px-6 py-8">
            <h2 className="rotulo text-papel mb-5">Navegação</h2>
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

          <div className="bg-azul lg:col-span-2 px-[var(--gutter)] md:px-6 py-8">
            <h2 className="rotulo text-papel mb-5">Contato</h2>
            <ul className="space-y-2.5 font-sans [font-stretch:87%] text-[0.9375rem]">
              <li><a href={`mailto:${site.email}`} className={`${link} break-all`}>{site.email}</a></li>
              <li className="text-ceu-claro">Brasil | Global</li>
            </ul>
            <SocialLinks className="mt-5" linkClassName="text-ceu-claro hover:text-laranja" />
          </div>

          <div className={`campo-creme border-t-[6px] border-laranja lg:col-span-3 ${newsletterPrimeiro ? 'max-md:order-first' : ''} px-[var(--gutter)] md:px-6 pt-7 pb-8 flex flex-col justify-between gap-6`}>
            <div>
              <h2 className="rotulo text-laranja-fundo mb-5">{newsletter.name}</h2>
              <p className="font-sans font-medium [font-stretch:87%] text-[1rem] leading-relaxed text-azul">{newsletter.pitch}</p>
            </div>
            <NewsletterForm variant="footer" />
          </div>
        </div>

        <div className="px-[var(--gutter)] md:px-0 flex flex-col md:flex-row justify-between gap-4">
          <p className="font-sans [font-stretch:87%] text-[0.8125rem] text-ceu">
            © {new Date().getFullYear()} Gusflopes.dev. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 font-sans [font-stretch:87%] text-[0.8125rem]">
            <a href="/privacy" className="text-ceu hover:text-papel">Política de Privacidade</a>
            <a href="/terms" className="text-ceu hover:text-papel">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
