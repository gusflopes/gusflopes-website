import type { CSSProperties } from 'react';
import { abertura, type EixoAbertura, type InstanciaAbertura } from '../lib/abertura';

interface AberturaProps {
  titulo: string;
  eixo?: EixoAbertura;
  /** "larga" (900/100) para textos e tese; "estreita" (850/62) para seções e listas. */
  instancia?: InstanciaAbertura;
  /** Nível do heading (h1 nas páginas de texto, h2 em listas e seções). */
  as?: 'h1' | 'h2' | 'h3';
  /** Teto do corpo em rem — limita a escala em colunas largas. */
  teto?: number;
  /** Esconde a linha-fina (cauda) — quando o contexto já mostra o título inteiro em outro lugar. */
  semCauda?: boolean;
  /** Linha marcada só no contorno em vez de leve (peso 100). Na home, só o Simulador. */
  vazado?: boolean;
  id?: string;
  className?: string;
}

/**
 * Título montado como bloco de tipo (regras em src/lib/abertura.ts). O texto do heading
 * continua sendo o título completo, na ordem original — só a forma muda.
 */
export function Abertura({
  titulo,
  eixo = 'engenharia',
  instancia = 'larga',
  as: Tag = 'h1',
  teto = 8,
  semCauda = false,
  vazado = false,
  id,
  className = '',
}: AberturaProps) {
  const a = abertura(titulo, eixo, instancia, { vazado });
  const ultima = a.linhas.length - 1;
  return (
    <Tag
      id={id}
      className={`abertura ${className}`}
      data-forma={a.forma}
      data-instancia={a.instancia}
      data-alinhamento={a.alinhamento}
      style={{ '--teto': `${teto}rem` } as CSSProperties}
    >
      {a.linhas.map((l, i) => (
        <span key={i}>
          <span
            className="abertura-linha"
            data-estilo={l.estilo}
            data-acento={i > 0 && /[ÁÉÍÓÚÂÊÔÃÕÀ]/i.test(l.texto) ? '' : undefined}
            style={{ '--fit': l.fit, '--recuo': l.recuo } as CSSProperties}
          >
            {l.texto}
            {i === ultima && a.sep && <span className="abertura-sep">{a.sep}</span>}
          </span>
          {i < ultima || (a.cauda && !semCauda) ? ' ' : null}
        </span>
      ))}
      {a.cauda && !semCauda && <span className="abertura-cauda">{a.cauda}</span>}
    </Tag>
  );
}

/**
 * Nome curto de célula (temas, serviços, eixos): Archivo estreita 780 em caixa mista — volume
 * abaixo da abertura da seção, que é a única em caixa-alta 900. Quebra no " & " (o "&" fica no
 * fim da primeira linha). O "&" vai na cor do texto em todo o site (rodada 5): pintá-lo só aqui e
 * não nas aberturas, nos hubs e nos campos do quadro era inconsistente.
 */
export function NomeCelula({
  titulo,
  as: Tag = 'h3',
  className = '',
  inteiro = false,
  ampClassName = '',
}: {
  titulo: string;
  as?: 'h2' | 'h3' | 'dt' | 'p';
  className?: string;
  /** Não quebra no " & " (nomes de eixo: "Engenharia & IA" fica numa linha). */
  inteiro?: boolean;
  /** Classe opcional do "&" (por padrão, a cor do texto). */
  ampClassName?: string;
}) {
  const amp = titulo.includes(' & ');
  if (amp && inteiro) {
    const [x, y] = titulo.split(' & ');
    return (
      <Tag className={`nome-celula ${className}`}>
        {x} <span className={ampClassName}>&amp;</span> {y}
      </Tag>
    );
  }
  const [a, b] = amp ? titulo.split(' & ') : [titulo, ''];
  return (
    <Tag className={`nome-celula ${className}`}>
      {amp ? (
        <>
          <span className="block">
            {a} <span className={ampClassName}>&amp;</span>
          </span>{' '}
          <span className="block">{b}</span>
        </>
      ) : (
        titulo
      )}
    </Tag>
  );
}
