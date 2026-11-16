// Sección 3: el alumno escucha dos audios (A y B) y clasifica sus cualidades.
(function(){const M=window.Musica=window.Musica||{};M.secciones=M.secciones||{};
const Q={timbre:['Timbre','¿Qué instrumento (o sonido) es cada uno?'],
 duracion:['Duración','¿Cuál dura poco (corto) y cuál dura mucho (largo)?'],
 intensidad:['Intensidad','¿Cuál suena fuerte y cuál suave?'],
 altura:['Altura','¿Cuál es el sonido grave y cuál el agudo?']};
const S=(f,d,g,tipo)=>({sint:{f,d,g,tipo:tipo||'sine'}});
const DEMOS=[
 {a:S(147,1.2,.4),b:S(660,1.2,.4),altura:{a:'grave',b:'agudo'}},
 {a:S(330,.25,.4),b:S(330,2,.4),duracion:{a:'corto',b:'largo'}},
 {a:S(330,1,.6),b:S(330,1,.07),intensidad:{a:'fuerte',b:'suave'}},
 {a:S(262,1.2,.35),b:S(262,1.2,.2,'sawtooth'),timbre:{a:'Onda seno',b:'Onda sierra'}},
 {a:S(165,2,.5,'sawtooth'),b:S(784,.3,.08),timbre:{a:'Onda sierra',b:'Onda seno'},duracion:{a:'largo',b:'corto'},intensidad:{a:'fuerte',b:'suave'},altura:{a:'grave',b:'agudo'}}];
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const esc=s=>String(s).replace(/"/g,'&quot;');

M.secciones.cualidades={titulo:'Cualidades del sonido',
 montar(raiz){
  const cfg=(M.cualidadesConfig||{}).ejercicios||[],demo=!cfg.length,lista=demo?DEMOS:cfg;
  let i=0,e,preg,resp,ver,intentos,hecho,jug=null,pts=0,tot=0,msg='';

  function nuevo(){e=JSON.parse(JSON.stringify(lista[i]));
   if(Math.random()<.5){[e.a,e.b]=[e.b,e.a];Object.keys(Q).forEach(q=>{if(e[q]){[e[q].a,e[q].b]=[e[q].b,e[q].a];}});} // A y B al azar
   preg=Object.keys(Q).filter(q=>e[q]);tot+=preg.length;resp={};ver={};intentos=0;hecho=false;jug=null;
   msg='Escuchá los dos audios (podés repetirlos) y completá cada cualidad.';pintar();}
  function fila(q){
   const ops=[e[q].a,e[q].b].sort((x,y)=>x.localeCompare(y,'es')),rA=resp[q],rB=rA?ops.find(o=>o!==rA):null;
   const est=ver[q]===undefined?'':ver[q]?'ok':'mal';
   return `<section class="fila ${est}"><h3>${Q[q][0]}</h3><p>${Q[q][1]}</p><div class="op"><span>Audio A es…</span>${
    ops.map(o=>`<button class="opc${rA===o?' sel':''}" data-q="${q}" data-v="${esc(o)}" ${hecho?'disabled':''}>${cap(o)}</button>`).join('')
   }<span>→ Audio B es: <b>${rB?cap(rB):'—'}</b></span></div></section>`;}
  function pintar(){
   const play=k=>`<button class="btn grande" data-play="${k}">${jug===k?'■ Detener':'▶ Audio '+k.toUpperCase()}</button>`;
   raiz.innerHTML=`<h2>Sección 3 · Cualidades del sonido</h2>
   ${demo?'<p class="aviso">Ejercicios de demostración con sonidos sintetizados. Cuando se carguen los audios del docente, aparecerán acá.</p>':''}
   <p class="prog">Ejercicio ${i+1} de ${lista.length}</p>
   <div class="audios">${play('a')}${play('b')}</div>
   ${preg.map(fila).join('')}
   <p id="msg" class="msg" aria-live="polite">${msg}</p>
   <div class="barra">${hecho
    ?`<button class="btn grande" data-acc="sig">${i+1<lista.length?'Siguiente ➜':'Ver resultado'}</button>`
    :`<button class="btn grande" data-acc="comprobar">Comprobar</button>${intentos>=2?'<button class="btn" data-acc="mostrar">Ver respuestas</button>':''}`}</div>`;}
  function final(){raiz.innerHTML=`<h2>¡Terminaste!</h2><p class="grande">Acertaste ${pts} de ${tot} cualidades a la primera.</p>
   <div class="barra"><button class="btn grande" data-acc="reiniciar">Volver a empezar</button></div>`;}
  function accion(a){
   if(a==='comprobar'){const falta=preg.filter(q=>!resp[q]);
    if(falta.length){msg='Falta responder: '+falta.map(q=>Q[q][0]).join(', ')+'.';return pintar();}
    preg.forEach(q=>{ver[q]=resp[q]===e[q].a;});intentos++;
    const bien=preg.filter(q=>ver[q]).length;if(intentos===1)pts+=bien;
    if(bien===preg.length){hecho=true;msg='¡Muy bien! Todo correcto.';}
    else msg=`Tenés ${preg.length-bien} para revisar (en rojo). Volvé a escuchar y probá de nuevo.`;
    return pintar();}
   if(a==='mostrar'){preg.forEach(q=>{resp[q]=e[q].a;ver[q]=true;});hecho=true;msg='Estas eran las respuestas. Escuchá otra vez los audios.';return pintar();}
   if(a==='sig'){i++;return i<lista.length?nuevo():final();}
   if(a==='reiniciar'){i=0;pts=0;tot=0;return nuevo();}}
  raiz.onclick=ev=>{
   const p=ev.target.closest('[data-play]');
   if(p){const k=p.dataset.play;
    if(jug===k){M.audio.parar();jug=null;return pintar();}
    jug=k;pintar();
    return M.audio.reproducir(e[k],()=>{jug=null;pintar();},()=>{jug=null;msg='⚠️ No se pudo cargar el audio '+(e[k].archivo||'')+'. Revisá que el archivo esté en la carpeta y que el nombre coincida.';pintar();});}
   const o=ev.target.closest('[data-q]');
   if(o&&!hecho){resp[o.dataset.q]=o.dataset.v;delete ver[o.dataset.q];return pintar();}
   const a=ev.target.closest('[data-acc]');
   if(a){M.audio.parar();jug=null;accion(a.dataset.acc);}};
  nuevo();},
 destruir(){M.audio.parar();const a=document.getElementById('app');a.onclick=null;a.onchange=null;}};
})();
