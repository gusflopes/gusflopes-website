import { Fragment } from 'react';

/**
 * Escreve um nome com o "&" em itálico da Literata (classe `.amp`). O texto não muda: só o "&"
 * ganha o desenho. Com `ponte`, o "&" fica azul-céu: reservado ao par negócio/tecnologia.
 */
export function Amp({ children, ponte = false }: { children: string; ponte?: boolean }) {
  const partes = children.split('&');
  if (partes.length === 1) return <>{children}</>;
  return (
    <>
      {partes.map((parte, i) => (
        <Fragment key={i}>
          {i > 0 && <span className={ponte ? 'amp amp-ponte' : 'amp'}>&amp;</span>}
          {parte}
        </Fragment>
      ))}
    </>
  );
}
