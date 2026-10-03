import React from 'react';
import { NewsletterForm } from './NewsletterForm';
import { newsletter } from '../config/site';
import { FundoPicture } from './FundoPicture';
import type { FundoResponsivo } from '../lib/imagens';

export function Hero({ fundo }: { fundo: FundoResponsivo }) {
  return (
    <section className="relative w-full min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Imagem de fundo responsiva (AVIF/WebP); parallax só a partir de md */}
      <div className="absolute inset-0 z-0 [clip-path:inset(0)]">
        <FundoPicture fundo={fundo} priority />
        {/* Overlay Gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl space-y-6">
          <p className="font-sans text-sm md:text-base font-bold uppercase tracking-[0.2em] text-orange-400 drop-shadow-md">
            Estratégia · Arquitetura · Fluxo · IA aplicada
          </p>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight drop-shadow-lg">
            Tecnologia e negócio, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">
              partes do mesmo sistema
            </span>
          </h1>

          <p className="font-sans text-xl md:text-2xl text-orange-100 font-medium max-w-2xl drop-shadow-md">
            Arquitetura, plataformas e IA aplicada para transformar complexidade em sistemas que evoluem.
          </p>

          <p className="font-sans text-lg text-gray-300 max-w-xl leading-relaxed">
            Conecto decisões técnicas aos objetivos da organização para ampliar autonomia, melhorar o fluxo de entrega e gerar valor continuamente.
          </p>

          <div className="pt-4 w-full max-w-lg">
            <p className="font-sans text-sm text-slate-300 mb-3">
              {newsletter.pitch}
            </p>
            <NewsletterForm variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
