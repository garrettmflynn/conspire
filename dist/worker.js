(()=>{var E=(s,e)=>Math.sqrt(s*s+e*e),A=s=>s.reduce((e,a)=>e+a,0)/s.length,x=(s,e,a="euclidean")=>A(s.map((r,p)=>A(r.map((c,n)=>E(c,e[p][n])))));var b=(s,e)=>W(s,e,(a,r)=>(a+r)/2),W=(s,e,a)=>s.map((r,p)=>r.map((c,n)=>a(c,e[p][n])));onmessage=async function(s){let[e,...a]=s.data,r;e==="process"?r=await _(...a):console.error("Unrecognized message in worker",e),postMessage(["done",r])};async function _(s,e){e.startTime||(e.startTime=Date.now()),e.changed=!1;let a=s.length,r=0;!!s[0].frequencies[0]?.length||s.forEach(m=>m.frequencies=[m.frequencies]);let c=s[0].frequencies;e.frequencies=c[0].length;let n=[];c.forEach((m,u)=>{e.history[0].length===e.duration&&(n.push(Object.assign({},e.history)),e.history=e.history.map(l=>[])),s.map(l=>l.frequencies[u]).forEach((l,f)=>{e.history[f]||(e.history[f]=[]),e.history[f].push(l)})});let D=n.forEach(async(m,u)=>{let l=performance.now(),k=Array.from({length:Math.ceil(e.frequencies/e.freqWindow)},(y,o)=>o*e.freqWindow).forEach(async y=>{let o=y,v=y+e.freqWindow;e.patterns[o]||(e.patterns[o]=[]);let w=e.patterns[o];if(v<e.frequencies){let i=[];for(let t=0;t<a;t++){let g=m[t].map(d=>Array.from(d).slice(o,v));i.push(g)}let M=(Date.now()-e.startTime)/1e3,h=!1;if(w.forEach(t=>{let g=t.average,d=x(i[0],g[0]),q=x(i[1],g[1]);(d+q)/2<e.distanceMax&&(h?h.push(t):h=[t])}),!h){let t={id:Math.floor(1e5*Math.random()),times:[{t:M,i:u}],bin:y,average:i};h=[t],w.push(t)}else h.forEach(t=>{t.times.push({t:M,i:u,original:i}),t.average[0]=b(t.average[0],i[0]),t.average[1]=b(t.average[1],i[1])});h.forEach(t=>{let g=t.times.length,d=!0,q=!0;g>1&&(d||q)&&(e.alphabet.has(t.id)||r++,e.alphabet.set(t.id,g),e.alphabetData.set(t.id,{average:t.average,start:o,end:v,times:t.times,bin:t.bin}),e.changed=!0)})}}),T=performance.now(),P=(u+1)/n.length;postMessage(["progress",P,T-l,r])});return console.log("outer promises",D),e}})();