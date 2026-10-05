
export function TermsOfUsePage() {
  return (
    <main id="conteudo" tabIndex={-1} className="min-h-screen bg-papel">
      <article>
        <header className="bg-noite px-4 md:px-6 pt-10 md:pt-16 pb-10 md:pb-12 border-b-[3px] border-laranja">
          <div className="max-w-[40rem] mx-auto">
          <h1 className="font-serif text-[2.4rem] md:text-6xl leading-[1.04] text-white mb-4">
            Termos de Uso
          </h1>
          <p className="font-sans text-sm text-bruma">
            Última atualização: Dezembro/2025
          </p>
          </div>
        </header>

        <div className="papel px-4 md:px-6 pt-12 md:pt-16 pb-20"><div className="leitura mx-auto">
          <section>
            <h2>1. Aceitação</h2>
            <p>
              Ao acessar e utilizar o site <strong>Gusflopes.dev</strong>, você concorda com estes termos. O conteúdo deste site tem caráter educacional e informativo, focado em Engenharia de Software, Arquitetura e Liderança Técnica.
            </p>
          </section>

          <section>
            <h2>2. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo original (textos, artigos, design, logotipos e vídeos) é de propriedade exclusiva de Gustavo Lopes, salvo indicação em contrário.
            </p>
            <ul>
              <li>
                <strong>Compartilhamento:</strong> Você é encorajado a compartilhar os links dos artigos e insights, desde que dê os devidos créditos (atribuição) ao autor e ao site original.
              </li>
              <li>
                <strong>Reprodução:</strong> É proibida a cópia integral ou reprodução dos artigos em outros sites sem prévia autorização por escrito.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Uso de Código e Exemplos Técnicos (Isenção de Responsabilidade)</h2>
            <p>
              Este site frequentemente compartilha snippets de código, diagramas de arquitetura (DDD, C4 Model) e exemplos de implementação.
            </p>
            <ul>
              <li>
                <strong>"As Is":</strong> Todo o código e informação técnica são fornecidos "como estão", para fins puramente educacionais.
              </li>
              <li>
                <strong>Responsabilidade:</strong> Embora eu me esforce para garantir a precisão e segurança das informações, não me responsabilizo por eventuais danos, bugs ou perdas de dados decorrentes do uso direto desses códigos em seus ambientes de produção. Cabe a você, como engenheiro, validar e testar qualquer solução antes de implementá-la.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Links Externos</h2>
            <p>
              O site pode conter links para sites de terceiros (ferramentas, documentações oficiais, etc.). Não possuo controle sobre o conteúdo ou políticas de privacidade desses sites externos.
            </p>
          </section>

          <section>
            <h2>5. Alterações</h2>
            <p>
              Estes termos podem ser atualizados a qualquer momento para refletir mudanças na legislação ou no conteúdo do site.
            </p>
          </section>

          <section>
            <h2>6. Foro</h2>
            <p>
              Fica eleito o foro da comarca de São Paulo, Brasil, para dirimir quaisquer dúvidas oriundas destes termos.
            </p>
          </section>
        </div></div>
      </article>
    </main>
  );
}
