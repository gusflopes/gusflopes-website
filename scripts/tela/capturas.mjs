// Capturas de revisão (Playwright): pnpm build && pnpm astro preview --port 4424, depois node scripts/tela/capturas.mjs [pasta]
// Antes de cada página inteira: todas as <img> viram loading="eager", rola até o fim e espera img.complete
// (sem isso as imagens lazy saem em branco).
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const out = process.argv[2] || 'docs/design-review';
const base = process.env.BASE || 'http://127.0.0.1:4424';
const so = process.env.ROTAS?.split(',');
const rotas = [['/', 'home'], ['/insights/', 'insights'], ['/engenharia/', 'engenharia'], ['/insights/article/agent-skills-pacotes-de-contexto/', 'artigo'], ['/radar/', 'radar'], ['/newsletter/', 'newsletter'], ['/newsletter/radar-semanal-01/', 'edicao'], ['/pagina-que-nao-existe/', 'notfound']].filter(([, n]) => !so || so.includes(n));
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
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
      window.scrollTo(0, document.body.scrollHeight);
      await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 6000); }))));
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${out}/${nome}-${vp}-inteira.png`, fullPage: true });
    const ov = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (ov > 0) console.log('overflow', nome, vp, ov);
  }
  await ctx.close();
}
await browser.close();
console.log('ok');
