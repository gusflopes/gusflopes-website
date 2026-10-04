const sharp=require('sharp');
const S='/tmp/claude-0/-home-user-gusflopes-website/3585d3d5-9874-53ce-a9d0-733568287c59/scratchpad/eval/shots3/pincelada/';
const jobs=[
 ['quadro','/home/user/gusflopes-website/src/assets/326189a758fea0fe0e2da42349b6da943b29ba51.png',null],
 ['v3 hero',S+'home-desktop.png',{left:0,top:74,width:1366,height:425}],
 ['v3 eixos col',S+'home-desktop-full.png',{left:40,top:1110,width:420,height:900}],
 ['v3 video',S+'home-desktop-full.png',{left:610,top:2330,width:750,height:560}],
 ['v3 close',S+'home-desktop-full.png',{left:0,top:3000,width:620,height:620}],
 ['v3 home inteira',S+'home-desktop-full.png',null],
 ['v3 insights inteira',S+'insights-desktop-full.png',null],
 ['v2 home inteira',__dirname+'/v2home.png',null],
 ['v2 insights inteira',__dirname+'/v2ins.png',null],
];
(async()=>{for(const [n,f,r] of jobs){let im=sharp(f).removeAlpha(); if(r) im=im.extract(r);
 const {data,info}=await im.raw().toBuffer({resolveWithObject:true});
 const c={warmAny:0,orange:0,sand:0,rustBrown:0,teal:0,blue:0,paleBlue:0,neutralLight:0,dark:0}; let N=0;
 for(let i=0;i<data.length;i+=3){N++;const R=data[i]/255,G=data[i+1]/255,B=data[i+2]/255;const mx=Math.max(R,G,B),mn=Math.min(R,G,B),v=mx,s=mx?(mx-mn)/mx:0;let h=0;const d=mx-mn;
  if(d){if(mx===R)h=60*(((G-B)/d)%6);else if(mx===G)h=60*((B-R)/d+2);else h=60*((R-G)/d+4);} if(h<0)h+=360;
  if(v<0.32){c.dark++;continue}
  const warm=(h>=8&&h<=55)&&s>0.15;
  if(warm){c.warmAny++; if(s>0.55&&v>0.55)c.orange++; else if(v>=0.5&&s<=0.55)c.sand++; else c.rustBrown++; continue}
  if(v>0.85&&s<0.15){c.neutralLight++;continue}
  if(h>=165&&h<200&&s>0.15){c.teal++;continue}
  if(h>=200&&h<260){ if(v>0.7&&s<0.4)c.paleBlue++; else c.blue++; continue}
 }
 console.log(n.padEnd(20),Object.entries(c).map(([k,x])=>k+'='+(100*x/N).toFixed(1)).join(' '));}})();
