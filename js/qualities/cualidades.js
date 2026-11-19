// Sección 3: el alumno escucha dos audios (A y B) y arrastra palabras a una tabla.
(function(){const M=window.Musica=window.Musica||{};M.secciones=M.secciones||{};
const Q={timbre:['Timbre','Es la fuente sonora: nos dice qué instrumento u objeto produce el sonido.'],
 intensidad:['Intensidad','Qué tan fuerte o suave suena un sonido.'],
 duracion:['Duración','Cuánto dura el sonido: más corto o más largo.'],
 altura:['Altura','Qué tan grave o agudo es un sonido.']};
const ORDEN=['timbre','intensidad','duracion','altura'];
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
  // col: palabra puesta en cada casillero ("timbre|a" = fila Timbre, columna A); ver: true/false por casillero
  let i=0,e,preg,orden,col,ver,intentos,hecho,sel=null,jug=null,pts=0,tot=0,msg='';
  const ids=()=>{const r=[];preg.forEach(q=>r.push(q+'|a',q+'|b'));return r;};

  function nuevo(){e=JSON.parse(JSON.stringify(lista[i]));
   if(Math.random()<.5){[e.a,e.b]=[e.b,e.a];Object.keys(Q).forEach(q=>{if(e[q]){[e[q].a,e[q].b]=[e[q].b,e[q].a];}});} // A y B al azar
   preg=ORDEN.filter(q=>e[q]);tot+=preg.length;
   orden=[];preg.forEach(q=>orden.push(e[q].a,e[q].b));orden=[...new Set(orden)].sort(()=>Math.random()-.5);
   col={};ver={};sel=null;intentos=0;hecho=false;jug=null;
   msg='Escuchá los dos audios (podés repetirlos) y arrastrá cada palabra a la tabla.';pintar();}
  function pintar(){
   const play=k=>`<button class="btn grande" data-play="${k}">${jug===k?'■ Detener':'▶ Audio '+k.toUpperCase()}</button>`;
   const hueco=(q,l)=>{const id=q+'|'+l,w=col[id],est=ver[id]===undefined?'':ver[id]?'ok':'mal';
    return `<td><div class="hueco ${est}" data-celda="${id}">${w!==undefined?`<span class="chip" data-arr data-tipo="${esc(w)}" data-desde="${id}">${cap(w)}</span>`:''}</div></td>`;};
   const usadas=Object.values(col),banco=orden.filter(w=>!usadas.includes(w));
   raiz.innerHTML=`<h2>Sección 3 · Cualidades del sonido</h2>
   <p class="aviso">🎧 Para una buena escucha, usá auriculares o un buen parlante.</p>
   ${demo?'<p class="aviso">Ejercicios de demostración con sonidos sintetizados. Cuando se carguen los audios del docente, aparecerán acá.</p>':''}
   <p class="prog">Ejercicio ${i+1} de ${lista.length}</p>
   <table class="tabla"><thead><tr><th></th><th>${play('a')}</th><th>${play('b')}</th></tr></thead><tbody>${
    preg.map(q=>`<tr><th class="cual" scope="row">${Q[q][0]}<small>${Q[q][1]}</small></th>${hueco(q,'a')}${hueco(q,'b')}</tr>`).join('')}</tbody></table>
   <p class="consigna">Arrastrá cada palabra al casillero que corresponda (también podés tocar la palabra y después tocar el casillero).</p>
   <div class="banco${hecho?' bloq':''}">${banco.map(w=>`<button class="chip${sel===w?' sel':''}" data-arr data-tipo="${esc(w)}">${cap(w)}</button>`).join('')}</div>
   <p id="msg" class="msg" aria-live="polite">${msg}</p>
   <div class="barra">${hecho
    ?`<button class="btn grande" data-acc="sig">${i+1<lista.length?'Siguiente ➜':'Ver resultado'}</button>`
    :`<button class="btn grande" data-acc="comprobar">Comprobar</button><button class="btn" data-acc="borrar">Borrar todo</button>${intentos>=3?'<button class="btn" data-acc="mostrar">Ver respuestas</button>':''}`}</div>`;}
  function final(){raiz.innerHTML=`<h2>¡Terminaste!</h2><p class="grande">Acertaste ${pts} de ${tot} cualidades a la primera.</p>
   <div class="barra"><button class="btn grande" data-acc="reiniciar">Volver a empezar</button></div>`;}
  function accion(a){
   if(a==='comprobar'){
    if(ids().some(id=>col[id]===undefined)){msg='Faltan palabras por colocar en la tabla.';return pintar();}
    ids().forEach(id=>{const [q,l]=id.split('|');ver[id]=col[id]===e[q][l];});intentos++;
    const bien=preg.filter(q=>ver[q+'|a']&&ver[q+'|b']).length;if(intentos===1)pts+=bien;
    if(bien===preg.length){hecho=true;msg='¡Muy bien! Todo correcto.';}
    else msg=`Hay ${preg.length-bien} fila(s) para revisar (en rojo). Volvé a escuchar y probá de nuevo.`;
    return pintar();}
   if(a==='borrar'){col={};ver={};sel=null;msg='';return pintar();}
   if(a==='mostrar'){ids().forEach(id=>{const [q,l]=id.split('|');col[id]=e[q][l];ver[id]=true;});hecho=true;
    msg='Estas eran las respuestas. Escuchá otra vez los audios.';return pintar();}
   if(a==='sig'){i++;return i<lista.length?nuevo():final();}
   if(a==='reiniciar'){i=0;pts=0;tot=0;return nuevo();}}
  raiz.onclick=ev=>{
   const p=ev.target.closest('[data-play]');
   if(p){const k=p.dataset.play;
    if(jug===k){M.audio.parar();jug=null;return pintar();}
    jug=k;pintar();
    return M.audio.reproducir(e[k],()=>{jug=null;pintar();},()=>{jug=null;msg='⚠️ No se pudo cargar el audio '+(e[k].archivo||'')+'. Revisá que el archivo esté en la carpeta y que el nombre coincida.';pintar();});}
   const a=ev.target.closest('[data-acc]');
   if(a){M.audio.parar();jug=null;return accion(a.dataset.acc);}
   const h=ev.target.closest('[data-celda]');
   if(h&&!ev.target.closest('[data-arr]')&&sel&&!hecho){col[h.dataset.celda]=sel;sel=null;ver={};pintar();}};
  this.q=M.arrastrar(raiz,{
   alSoltar:(w,c,o)=>{if(hecho)return;const d=o.dataset.desde,id=c&&c.dataset.celda,prev=id?col[id]:undefined;
    if(d!==undefined)delete col[d];
    if(id){col[id]=w;if(d!==undefined&&prev!==undefined&&id!==d)col[d]=prev;} // si el casillero estaba ocupado, se intercambian
    ver={};sel=null;pintar();},
   alToque:o=>{if(hecho)return;const d=o.dataset.desde;
    if(d!==undefined){if(sel){col[d]=sel;sel=null;}else delete col[d];ver={};}
    else sel=sel===o.dataset.tipo?null:o.dataset.tipo;
    pintar();}});
  nuevo();},
 destruir(){M.audio.parar();if(this.q)this.q();this.q=null;const a=document.getElementById('app');a.onclick=null;a.onchange=null;}};
})();
