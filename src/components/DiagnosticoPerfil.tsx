import { useState } from 'react';
import { VISAO_IDS, VISOES, type VisaoId } from '../lib/temas';

/**
 * Etapa 1 do Radar: diagnóstico do perfil da empresa. Cinco perguntas, cada uma uma lente (o que o cliente compra,
 * DDD, Team Topologies, DevOps, orçamento); cada resposta pontua um ou mais perfis e o maior total vence. No empate,
 * decide a resposta de quem é acionado às 3 da manhã, depois a de quem constrói o software.
 */

type Pontos = Partial<Record<VisaoId, number>>;
interface Pergunta {
  id: string;
  texto: string;
  /** Lente de onde vem a pergunta (aparece pequeno, acima do enunciado). */
  lente: string;
  opcoes: { texto: string; pontos: Pontos }[];
}

const PERGUNTAS: Pergunta[] = [
  {
    id: 'cliente',
    lente: 'O que gera valor',
    texto: 'O que o seu cliente compra?',
    opcoes: [
      { texto: 'Um produto digital: app, plataforma, software.', pontos: { nativa: 2 } },
      {
        texto: 'Um produto ou serviço físico ou financeiro, e a experiência digital pesa na escolha (app, portal, preço, crédito).',
        pontos: { diferencial: 2 },
      },
      { texto: 'Um produto ou serviço em que o digital só apoia: venda, cobrança, nota fiscal.', pontos: { suporte: 1, contratada: 1 } },
    ],
  },
  {
    id: 'dominio',
    lente: 'DDD: domínio central ou subdomínio',
    texto: 'Se o seu principal sistema virasse um pronto de mercado, igual ao do concorrente, o que aconteceria?',
    opcoes: [
      { texto: 'A empresa deixaria de existir como é: o sistema é o negócio.', pontos: { nativa: 2 } },
      { texto: 'Perderíamos o que nos diferencia, mesmo com o negócio de pé.', pontos: { diferencial: 2 } },
      { texto: 'Daria trabalho, mas o negócio seguiria igual.', pontos: { suporte: 1, contratada: 1 } },
    ],
  },
  {
    id: 'constroi',
    lente: 'Wardley Map e Team Topologies: construir ou comprar',
    texto: 'Quem constrói e muda o software da empresa?',
    opcoes: [
      { texto: 'Times próprios de produto e engenharia, o tempo todo.', pontos: { nativa: 2, diferencial: 1 } },
      { texto: 'Times próprios nos produtos digitais; o sistema central (ERP, core) é de fornecedor.', pontos: { diferencial: 2 } },
      { texto: 'Uma TI interna, mais configurando e integrando do que desenvolvendo.', pontos: { suporte: 2 } },
      { texto: 'Fornecedores e prestadores.', pontos: { contratada: 2 } },
    ],
  },
  {
    id: 'opera',
    lente: 'DevOps: quem opera',
    texto: 'O sistema que traz receita parou às 3 da manhã. Quem é acionado?',
    opcoes: [
      { texto: 'O time que escreveu o código.', pontos: { nativa: 2 } },
      { texto: 'Depende: o time de produto, se for no digital; a TI ou o fornecedor, se for no sistema central.', pontos: { diferencial: 2 } },
      { texto: 'A TI, que abre chamado com o fornecedor.', pontos: { suporte: 2 } },
      { texto: 'O fornecedor, se o contrato prever.', pontos: { contratada: 2 } },
    ],
  },
  {
    id: 'orcamento',
    lente: 'Centro de custo ou unidade de negócio',
    texto: 'Como a tecnologia entra no orçamento?',
    opcoes: [
      { texto: 'É o maior investimento, ligado direto à receita.', pontos: { nativa: 2 } },
      { texto: 'Tem linha de investimento própria, com produtos e roadmap.', pontos: { diferencial: 2 } },
      { texto: 'Centro de custo, medido por custo e disponibilidade.', pontos: { suporte: 2 } },
      { texto: 'Mensalidades de fornecedores.', pontos: { contratada: 2 } },
    ],
  },
];

const maiorDe = (p: Pontos) => VISAO_IDS.filter((v) => (p[v] ?? 0) === Math.max(...VISAO_IDS.map((x) => p[x] ?? 0)));

/** Perfil vencedor e, se algum ficou a um ponto, o vizinho. */
function resultado(respostas: Record<string, number>): { perfil: VisaoId; vizinho?: VisaoId } {
  const total: Record<VisaoId, number> = { nativa: 0, diferencial: 0, suporte: 0, contratada: 0 };
  for (const q of PERGUNTAS) for (const [v, n] of Object.entries(q.opcoes[respostas[q.id]].pontos)) total[v as VisaoId] += n;
  let empatados = maiorDe(total);
  for (const id of ['opera', 'constroi']) {
    if (empatados.length === 1) break;
    const preferidos = maiorDe(PERGUNTAS.find((q) => q.id === id)!.opcoes[respostas[id]].pontos);
    const corte = empatados.filter((v) => preferidos.includes(v));
    if (corte.length) empatados = corte;
  }
  const perfil = empatados[0];
  const vizinho = VISAO_IDS.filter((v) => v !== perfil).sort((a, b) => total[b] - total[a])[0];
  return { perfil, vizinho: total[perfil] - total[vizinho] <= 1 ? vizinho : undefined };
}

export function DiagnosticoPerfil({ onPerfil }: { onPerfil: (v: VisaoId) => void }) {
  const [respostas, setRespostas] = useState<Record<string, number>>({});
  const completo = PERGUNTAS.every((q) => respostas[q.id] !== undefined);
  const r = completo ? resultado(respostas) : undefined;

  return (
    <div>
      <ol className="grid gap-8">
        {PERGUNTAS.map((q, i) => (
          <li key={q.id}>
            <fieldset>
              <legend className="font-sans">
                <span className="block text-xs font-bold uppercase tracking-wider text-petroleo">{q.lente}</span>
                <span className="mt-1 block font-serif text-[1.2rem] leading-snug text-tinta">
                  {i + 1}. {q.texto}
                </span>
              </legend>
              <div className="mt-3 grid gap-2">
                {q.opcoes.map((o, k) => {
                  const marcado = respostas[q.id] === k;
                  return (
                    <label
                      key={k}
                      className={`flex cursor-pointer items-start gap-3 border px-4 py-3 font-sans text-[0.9375rem] leading-relaxed transition-colors ${
                        marcado ? 'border-laranja bg-white text-tinta' : 'border-regua text-tinta-2 hover:border-tinta-2 hover:text-tinta'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`diagnostico-${q.id}`}
                        checked={marcado}
                        onChange={() => setRespostas((s) => ({ ...s, [q.id]: k }))}
                        className="mt-1.5 accent-[#F97316]"
                      />
                      <span>{o.texto}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      <div aria-live="polite" className="mt-10">
        {r ? (
          <div className="border-t-2 border-t-laranja bg-white px-5 py-6 md:px-8">
            <p className="text-xs font-bold uppercase tracking-wider text-petroleo font-sans">Perfil da sua empresa</p>
            <p className="mt-2 font-serif text-[1.75rem] leading-tight text-tinta">{VISOES[r.perfil].label}</p>
            <p className="mt-2 font-sans text-tinta-2 leading-relaxed max-w-[68ch]">{VISOES[r.perfil].tese}</p>
            <p className="mt-4 font-sans text-tinta leading-relaxed max-w-[68ch]">
              <strong>Com IA:</strong> {VISOES[r.perfil].ia}
            </p>
            {r.vizinho && (
              <p className="mt-3 font-sans text-sm text-tinta-2 max-w-[68ch]">
                Ficou perto de <strong className="text-tinta">{VISOES[r.vizinho].label}</strong>: vale ler também essa leitura do radar.
              </p>
            )}
            <button
              type="button"
              onClick={() => onPerfil(r.perfil)}
              className="mt-6 inline-flex items-center bg-laranja px-5 py-3 font-sans text-[0.9375rem] font-semibold text-tinta hover:bg-laranja-fundo hover:text-white transition-colors"
            >
              Ver o radar para {VISOES[r.perfil].label}
            </button>
          </div>
        ) : (
          <p className="font-sans text-sm text-tinta-2">
            Responda as {PERGUNTAS.length} perguntas para ver o perfil ({Object.keys(respostas).length} de {PERGUNTAS.length}).
          </p>
        )}
      </div>
    </div>
  );
}
