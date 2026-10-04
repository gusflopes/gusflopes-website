import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const V = {base:4500, evolucao:4501, concretismo:4503, pincelada:4504};
const P = {home:'/', insights:'/insights/', engenharia:'/engenharia/', artigo:'/insights/article/agent-skills-pacotes-de-contexto/', radar:'/radar/', newsletter:'/newsletter/', edicao:'/newsletter/radar-semanal-01/', notfound:'/nao-existe/'};
const b = await chromium.launch();
for (const [v,port] of Object.entries(V)) for (const [n,u] of Object.entries(P)) for (const [vp,size] of [['desktop',{width:1366,height:900}],['mobile',{width:390,height:844}]]) {
  const ctx = await b.newContext({viewport:size, isMobile: vp==='mobile', hasTouch: vp==='mobile'});
  const p = await ctx.newPage(); await p.route(/^https?:\/\/(?!localhost)/, rt=>rt.abort());
  await p.goto(`http://localhost:${port}${u}`,{waitUntil:'networkidle'}).catch(()=>{});
  await p.screenshot({path:`shots3/${v}/${n}-${vp}.png`});
  await p.evaluate(()=>document.querySelectorAll('img[loading="lazy"]').forEach(i=>i.loading='eager'));
  await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){scrollTo(0,y);await new Promise(r=>setTimeout(r,150))}scrollTo(0,0)});
  await p.waitForFunction(()=>[...document.images].every(i=>i.complete&&(i.naturalWidth>0||!i.currentSrc||!i.currentSrc.startsWith(location.origin))),null,{timeout:15000}).catch(()=>{});
  await p.waitForTimeout(500);
  if (n!=='notfound') await p.screenshot({path:`shots3/${v}/${n}-${vp}-full.png`, fullPage:true});
  await ctx.close();
}
await b.close(); console.log('ok');
