// Capturas de revisão (Playwright): pnpm build && pnpm astro preview --port 4404, depois node scripts/tela/capturas.mjs
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const out = process.argv[2] || 'docs/design-review';
const base = 'http://127.0.0.1:4404';
const rotas = [['/', 'home'], ['/insights/', 'insights'], ['/engenharia/', 'engenharia'], ['/insights/article/agent-skills-pacotes-de-contexto/', 'artigo'], ['/radar/', 'radar'], ['/newsletter/', 'newsletter']];
const vps = [['desktop', 1366, 900], ['mobile', 390, 844]];
const browser = await chromium.launch();
for (const [vp, w, h] of vps) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const [rota, nome] of rotas) {
    await page.goto(base + rota, { waitUntil: 'networkidle' }).catch(() => {});
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${out}/${nome}-${vp}.png` });
    // força lazy-load antes da página inteira
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${out}/${nome}-${vp}-inteira.png`, fullPage: true });
    const ov = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (ov > 0) console.log('overflow', nome, vp, ov);
  }
  await ctx.close();
}
await browser.close();
console.log('ok');
