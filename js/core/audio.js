// Motor de sonido: percusión seca sintetizada, pulso, tonos y archivos de audio.
(function(){const M=window.Musica=window.Musica||{};
let ctx=null,timers=[],fuentes=[],actual=null;
const ac=()=>{if(!ctx)ctx=new(window.AudioContext||window.webkitAudioContext)();if(ctx.state==='suspended')ctx.resume();return ctx;};
function osc(t,{f,d,g,tipo='sine',caida=0}){const c=ac(),o=c.createOscillator(),a=c.createGain();
 o.type=tipo;o.frequency.setValueAtTime(f,t);if(caida)o.frequency.exponentialRampToValueAtTime(f*caida,t+d);
 a.gain.setValueAtTime(0,t);a.gain.linearRampToValueAtTime(g,t+.004);a.gain.exponentialRampToValueAtTime(.001,t+d);
 o.connect(a);a.connect(c.destination);o.start(t);o.stop(t+d+.02);fuentes.push(o);}
const clic=t=>{osc(t,{f:1900,d:.09,g:.9,caida:.55});osc(t,{f:950,d:.05,g:.4,tipo:'triangle'});}; // percusión seca
const tic=(t,acento)=>osc(t,{f:acento?520:420,d:.07,g:.3}); // pulso suave
function tono(t,{f=440,d=1,g=.4,tipo='sine'}){const c=ac(),o=c.createOscillator(),a=c.createGain();
 o.type=tipo;o.frequency.value=f;a.gain.setValueAtTime(0,t);a.gain.linearRampToValueAtTime(g,t+.01);
 a.gain.setValueAtTime(g,t+Math.max(.02,d-.05));a.gain.linearRampToValueAtTime(0,t+d);
 o.connect(a);a.connect(c.destination);o.start(t);o.stop(t+d+.02);fuentes.push(o);}
function parar(){timers.forEach(clearTimeout);timers=[];
 fuentes.forEach(o=>{try{o.stop()}catch(e){}});fuentes=[];
 if(actual){actual.pause();actual=null;}}
const av=(t,fn)=>timers.push(setTimeout(fn,Math.max(0,(t-ctx.currentTime)*1000)));
// Toca 4 pulsos de preparación y luego los 8 pulsos del ritmo.
function tocarRitmo(p,{bpm=80,pulso=true,alBeat=()=>{},alFin=()=>{}}={}){
 parar();const c=ac(),b=60/bpm,t0=c.currentTime+.2;
 for(let k=0;k<4;k++){tic(t0+k*b,k===0);av(t0+k*b,()=>alBeat(k-4));}
 p.forEach((tp,i)=>{const t=t0+(4+i)*b,n=M.NOTAS[tp];
  if(pulso)tic(t,i%4===0);
  for(let k=0;k<n;k++)clic(t+k*b/n);
  av(t,()=>alBeat(i));});
 av(t0+12*b,alFin);}
// Reproduce un audio subido (archivo) o un sonido sintetizado (sint).
function reproducir(s,alFin,alError){parar();
 if(s.archivo){let u=false;const er=()=>{if(!u){u=true;alError();}};
  const a=new Audio(s.archivo);actual=a;a.onended=alFin;a.onerror=er;a.play().catch(er);}
 else{tono(ac().currentTime+.05,s.sint);timers.push(setTimeout(alFin,(s.sint.d+.15)*1000));}}
M.audio={tocarRitmo,reproducir,parar};
})();
