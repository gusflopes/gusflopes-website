// Capturas de revisão (Playwright): pnpm build && pnpm astro preview --port 4434, depois node scripts/tela/capturas.mjs [pasta]
// Página inteira válida: todas as <img> viram loading="eager", rola devagar (400px a cada 150ms) até o
// fim, espera naturalWidth > 0 em toda imagem local e confere que nenhuma saiu como retângulo liso.
// A rede não é bloqueada (o bloqueio quebrou capturas antes).
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const out = process.argv[2] || 'docs/design-review';
const base = process.env.BASE || 'http://127.0.0.1:4434';
const so = process.env.ROTAS?.split(',');
const rotas = [['/', 'home'], ['/insights/', 'insights'], ['/engenharia/', 'engenharia'], ['/insights/article/agent-skills-pacotes-de-contexto/', 'artigo'], ['/radar/', 'radar'], ['/newsletter/', 'newsletter'], ['/newsletter/radar-semanal-01/', 'edicao'], ['/nao-existe/', 'notfound']].filter(([, n]) => !so || so.includes(n));
const vps = [['desktop', 1366, 900], ['mobile', 390, 844]];
const browser = await chromium.launch();
for (const [vp, w, h] of vps) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const [rota, nome] of rotas) {
    await page.goto(base + rota, { waitUntil: 'networkidle' }).catch(() => {});
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => [...document.images].filter((i) => i.loading !== 'lazy').every((i) => i.complete), null, { timeout: 8000 }).catch(() => {});
    await page.screenshot({ path: `${out}/${nome}-${vp}.png` });
    await page.evaluate(async () => {
      document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'));
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 150));
      }
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForFunction(() => [...document.images].filter((i) => new URL(i.currentSrc || i.src, location.href).origin === location.origin).every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 15000 }).catch(() => console.log('imagem local sem carregar', nome, vp));
    // retângulo liso: amostra a imagem num canvas e mede a variação
    const lisas = await page.evaluate(() => {
      const r = [];
      for (const i of document.images) {
        if (new URL(i.currentSrc || i.src, location.href).origin !== location.origin || !i.naturalWidth) continue;
        const c = document.createElement('canvas');
        c.width = 32; c.height = 32;
        const g = c.getContext('2d');
        g.drawImage(i, 0, 0, 32, 32);
        const d = g.getImageData(0, 0, 32, 32).data;
        let mn = 255, mx = 0;
        for (let k = 0; k < d.length; k += 4) { const v = d[k] + d[k + 1] + d[k + 2]; mn = Math.min(mn, v); mx = Math.max(mx, v); }
        if (mx - mn < 12) r.push(i.currentSrc || i.src);
      }
      return r;
    });
    if (lisas.length) console.log('imagem lisa', nome, vp, lisas);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${out}/${nome}-${vp}-full.png`, fullPage: true });
    const ov = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (ov > 0) console.log('overflow', nome, vp, ov);
  }
  await ctx.close();
}
await browser.close();
console.log('ok');
