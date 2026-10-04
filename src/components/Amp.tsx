import { Fragment } from 'react';

/**
 * Escreve um nome com o "&" em itálico da Literata (classe `.amp`, azul-céu). O texto não muda:
 * só o "&" ganha o desenho. É o sinal tipográfico da tese (tecnologia e negócio, uma ponte).
 */
export function Amp({ children }: { children: string }) {
  const partes = children.split('&');
  if (partes.length === 1) return <>{children}</>;
  return (
    <>
      {partes.map((parte, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="amp">&amp;</span>}
          {parte}
        </Fragment>
      ))}
    </>
  );
}
