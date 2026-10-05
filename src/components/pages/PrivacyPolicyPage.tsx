
export function PrivacyPolicyPage() {
  return (
    <main id="conteudo" tabIndex={-1} className="min-h-screen bg-papel">
      <article>
        <header className="bg-noite px-4 md:px-6 pt-10 md:pt-16 pb-10 md:pb-12 border-b-[3px] border-laranja">
          <div className="max-w-[40rem] mx-auto">
          <h1 className="font-serif text-[2.4rem] md:text-6xl leading-[1.04] text-white mb-4">
            Política de Privacidade
          </h1>
          <p className="font-sans text-sm text-bruma">
            Última atualização: Outubro/2026
          </p>
          </div>
        </header>

        <div className="papel px-4 md:px-6 pt-12 md:pt-16 pb-20"><div className="leitura mx-auto">
          <p className="text-xl text-tinta italic">
            Esta política descreve, de forma direta, o que o gusflopes.dev faz (e o que não faz) com dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
          </p>

          <section>
            <h2>1. Quem controla seus dados</h2>
            <p>
              O controlador dos dados coletados neste site é Gustavo Lopes. Para dúvidas relacionadas a dados, entre em contato pelo e-mail: <a href="mailto:gustavo@gusflopes.dev" >gustavo@gusflopes.dev</a>.
            </p>
          </section>

          <section>
            <h2>2. Quais dados este site coleta</h2>
            <ul>
              <li>
                <strong>Um único formulário, o da newsletter:</strong> o gusflopes.dev só pede o seu e-mail para a inscrição na newsletter (seção 3). Não há formulário de contato: o contato é feito por e-mail, e você decide o que enviar.
              </li>
              <li>
                <strong>Sem cookies de rastreamento:</strong> o site não usa Google Analytics, pixels de anúncio nem cookies de rastreamento ou de publicidade.
              </li>
              <li>
                <strong>Estatística de visitas sem cookies:</strong> uso o Cloudflare Web Analytics para contar visitas, páginas mais lidas e de onde os leitores chegam. Ele não usa cookies nem identifica você individualmente.
              </li>
              <li>
                <strong>Registros técnicos da hospedagem:</strong> o site é servido pela Cloudflare, que processa dados técnicos de cada acesso (como endereço IP, navegador e página solicitada) para entregar as páginas e proteger contra abuso.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Newsletter</h2>
            <p>
              A inscrição acontece aqui mesmo, no formulário do fim dos textos e do rodapé. Guardo o seu e-mail, a data e o texto do consentimento que você viu, a página em que se inscreveu e de onde chegou ao site (link de origem e parâmetros de campanha, quando houver). Para isso, o site guarda na sessão do navegador (sessionStorage, não é cookie) a página de entrada e a origem da visita, apagadas ao fechar a aba. A verificação anti-robô é feita pelo Cloudflare Turnstile.
            </p>
            <p>
              A inscrição só vale depois que você confirma pelo link enviado ao seu e-mail. Sem confirmação, nada é enviado. Os dados ficam em banco de dados da Cloudflare, que atua como operadora.
            </p>
            <p>
              Com a inscrição confirmada, você recebe a newsletter e avisos de textos novos do site. As edições são enviadas pelo <a href="https://substack.com" >Substack</a>, para onde o seu e-mail é copiado com esse fim, conforme a <a href="https://substack.com/privacy" >política de privacidade do Substack</a>. Todo envio traz o link de descadastro; ao cancelar, você sai da lista e deixa de receber os e-mails.
            </p>
            <p>
              Quem se inscreveu pela página <a href="https://reforma-tributaria.gusflopes.dev" >reforma-tributaria.gusflopes.dev</a> tem os dados, os consentimentos e a forma de cancelar descritos na <a href="https://reforma-tributaria.gusflopes.dev/privacidade" >política de privacidade daquela página</a>.
            </p>
          </section>

          <section>
            <h2>4. Contato por e-mail</h2>
            <p>
              Se você escrever para <a href="mailto:gustavo@gusflopes.dev" >gustavo@gusflopes.dev</a>, uso seu nome, e-mail e o conteúdo da mensagem só para responder ao que foi pedido (consultoria, palestra, parceria ou dúvida).
            </p>
          </section>

          <section>
            <h2>5. Conteúdo de terceiros</h2>
            <p>
              Algumas imagens de artigos são carregadas de serviços externos (como o Unsplash), e alguns textos têm links para outros sites. Ao carregar ou clicar nesses conteúdos, o seu navegador se conecta a esses serviços, que seguem as próprias políticas de privacidade.
            </p>
          </section>

          <section>
            <h2>6. Seus direitos</h2>
            <p>
              Pela LGPD, você pode pedir confirmação de tratamento, acesso, correção ou exclusão dos seus dados pessoais a qualquer momento. Basta enviar um e-mail para <a href="mailto:gustavo@gusflopes.dev" >gustavo@gusflopes.dev</a>.
            </p>
          </section>

          <section>
            <h2>7. Transferência internacional</h2>
            <p>
              A Cloudflare e o Substack operam redes globais, então os dados técnicos de acesso e os da newsletter podem ser processados em servidores fora do Brasil, sob as garantias contratuais e de segurança de cada provedor.
            </p>
          </section>
        </div></div>
      </article>
    </main>
  );
}
