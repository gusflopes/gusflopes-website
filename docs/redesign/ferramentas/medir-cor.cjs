// Uso: node medir-cor.cjs <pagina-inteira.png> [--recorte x,y,w,h]
// Mede a página inteira (ou um recorte) por famílias de cor e janelas de 900px.
const sharp=require('sharp');
const f=process.argv[2]; const ri=process.argv.indexOf('--recorte');
const rc=ri>0?process.argv[ri+1].split(',').map(Number):null;
function cls(r,g,b){r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn,v=mx,s=mx?d/mx:0;let h=0;
 if(d){if(mx===r)h=60*(((g-b)/d)%6);else if(mx===g)h=60*((b-r)/d+2);else h=60*((r-g)/d+4)}if(h<0)h+=360;
 if(h>=12&&h<=42&&s>0.55&&v>0.55)return'laranja';
 if(v>0.85&&s<0.15)return'claro';
 if(v>=0.6&&s<=0.35&&h>=20&&h<=55)return'claro'; // areia clara conta como claro
 if(v<0.32)return'escuro';
 if(h>=8&&h<=55&&s>0.15)return'quente'; // areia, ferrugem, marrom
 if(h>=165&&h<200&&s>0.15)return'petroleo';
 if(h>=200&&h<260)return(v>0.7&&s<0.4)?'azulclaro':'azul';
 return'neutro';}
(async()=>{let im=sharp(f).removeAlpha();if(rc)im=im.extract({left:rc[0],top:rc[1],width:rc[2],height:rc[3]});
 const {data,info}=await im.raw().toBuffer({resolveWithObject:true});const W=info.width,H=info.height;
 const tot={},row=[];for(let y=0;y<H;y++){const rr={};for(let x=0;x<W;x+=2){const i=(y*W+x)*3;const c=cls(data[i],data[i+1],data[i+2]);rr[c]=(rr[c]||0)+1;tot[c]=(tot[c]||0)+1}row.push(rr)}
 const N=Object.values(tot).reduce((a,b)=>a+b,0);const pct=k=>((tot[k]||0)/N*100).toFixed(1)+'%';
 console.log('arquivo',f,W+'x'+H);
 console.log('escuro',pct('escuro'),'| claro',pct('claro'),'| laranja',pct('laranja'),'| quente(areia/ferrugem/marrom)',pct('quente'),'| petroleo',pct('petroleo'),'| azul medio',pct('azul'),'| azul claro',pct('azulclaro'));
 const win=900,step=450,per=Math.ceil(W/2);const ws=[];
 for(let y=0;y+Math.min(win,H)<=H;y+=step){let o=0,l=0,q=0,n=0;for(let k=y;k<Math.min(y+win,H);k++){const r=row[k];o+=r.laranja||0;l+=r.claro||0;q+=(r.quente||0)+(r.petroleo||0);n+=per}ws.push({y,o:o/n,l:l/n,q:q/n});if(H<=win)break}
 const fr=(fn)=>Math.round(ws.filter(fn).length/ws.length*100)+'%';
 console.log('janelas de 900px:',ws.length,'| com laranja>=0.2%:',fr(w=>w.o>=0.002),'| com laranja>=0.5%:',fr(w=>w.o>=0.005),'| com claro>=15%:',fr(w=>w.l>=0.15),'| com cor do quadro (quente+petroleo)>=3%:',fr(w=>w.q>=0.03));
 let run=0,best=0,bestY=0;for(let y=0;y<H;y++){const r=row[y];if((r.escuro||0)/per>0.7){run++;if(run>best){best=run;bestY=y-run+1}}else run=0}
 console.log('maior trecho escuro contínuo:',best+'px (a partir de y='+bestY+')');
 const lo=ws.filter(w=>w.o<0.005).map(w=>w.y);if(lo.length)console.log('janelas com laranja <0.5% começam em y=',lo.join(', '));
})();
