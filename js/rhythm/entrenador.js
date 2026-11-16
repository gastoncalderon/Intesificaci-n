// Entrenador de ritmos: lo usan la Sección 1 (palitos) y la Sección 2 (figuras).
(function(){const M=window.Musica=window.Musica||{};M.secciones=M.secciones||{};
M.crearEntrenador=function(raiz,cfg){
 let niv=null,ej=0,pts=0,meta=[],resp=[],ver=[],intentos=0,hecho=false,sel=null,msg='',lento=false;
 const prog=M.leer(cfg.clave),NOM=cfg.nombres;
 const estrellas=n=>'★'.repeat(n)+'☆'.repeat(M.EJ-n);
 const msg2=t=>{const m=raiz.querySelector('#msg');if(m)m.textContent=t;};
 const marcar=i=>raiz.querySelectorAll('.celda').forEach((c,j)=>c.classList.toggle('suena',j===i));

 function menu(){niv=null;
  raiz.innerHTML=`<h2>${cfg.titulo}</h2><p class="consigna">${cfg.consigna}</p><div class="niveles">${
   M.NIVELES.map(n=>`<button class="nivel" data-nivel="${n.n}"><b>Nivel ${n.n}</b><span>${n.titulo}</span><em>${estrellas(prog[n.n]||0)}</em></button>`).join('')}</div>`;}
 function celda(i){const t=resp[i];
  return `<div class="celda ${ver[i]===undefined?'':ver[i]?'ok':'mal'}" data-celda="${i}">${
   t?`<div class="fig" data-arr data-tipo="${t}" data-desde="${i}">${cfg.fig.celda(t)}</div>`:cfg.fig.celda(null)}</div>`;}
 function tablero(){const pal=cfg.paleta.filter(t=>niv.tipos.includes(t));
  raiz.innerHTML=`<h2>${cfg.titulo}</h2>
  <p class="prog">Nivel ${niv.n}: ${niv.titulo} · Ejercicio ${ej+1} de ${M.EJ} · Aciertos a la primera: ${pts}</p>
  <div class="barra"><button class="btn grande" data-acc="oir">▶ Escuchar el ritmo</button>
   <label><input type="checkbox" data-opt="lento" ${lento?'checked':''}> Más lento</label></div>
  <div class="tablero ${cfg.clase}">${[0,1].map(c=>`<div class="compas">${[0,1,2,3].map(k=>celda(c*4+k)).join('')}</div>`).join('')}</div>
  <div class="paleta">${pal.map(t=>`<button class="ficha${sel===t?' sel':''}" data-arr data-tipo="${t}">${cfg.fig.ficha(t)}<span>${NOM[t]}</span></button>`).join('')}</div>
  <p id="msg" class="msg" aria-live="polite">${msg}</p>
  <div class="barra">${hecho
   ?`<button class="btn grande" data-acc="sig">${ej+1<M.EJ?'Siguiente ➜':'Ver resultado'}</button>`
   :`<button class="btn grande" data-acc="comprobar">Comprobar</button><button class="btn" data-acc="borrar">Borrar todo</button>${intentos>=2?'<button class="btn" data-acc="mostrar">Ver respuesta</button>':''}`}
   <button class="btn" data-acc="menu">Niveles</button></div>`;}
 function fin(){prog[niv.n]=Math.max(prog[niv.n]||0,pts);M.guardar(cfg.clave,prog);
  raiz.innerHTML=`<h2>Nivel ${niv.n} terminado</h2><p class="grande">Acertaste ${pts} de ${M.EJ} a la primera<br>${estrellas(pts)}</p>
  <div class="barra"><button class="btn grande" data-acc="repetir">Repetir nivel</button>${niv.n<M.NIVELES.length?'<button class="btn grande" data-acc="proximo">Siguiente nivel ➜</button>':''}<button class="btn" data-acc="menu">Niveles</button></div>`;}

 function empezar(n){niv=M.NIVELES[n-1];ej=0;pts=0;sel=null;nuevo();}
 function nuevo(){meta=M.generar(niv);resp=Array(8).fill(null);ver=[];intentos=0;hecho=false;
  msg='Escuchá el ritmo y completá los 8 rectángulos.';tablero();}
 function colocar(i,t){if(hecho)return;resp[i]=(t==='silencio'&&cfg.vacioEsSilencio)?null:t;ver=[];msg='';tablero();}
 function oir(){M.audio.tocarRitmo(meta,{bpm:niv.bpm*(lento?.7:1),
  alBeat:i=>{if(i<0)msg2('Preparate… '+(i+5));else{msg2('Escuchá…');marcar(i);}},
  alFin:()=>{marcar(-1);msg2(msg);}});}
 function comprobar(){ver=M.comparar(meta,resp,cfg.vacioEsSilencio);intentos++;
  if(ver.every(Boolean)){hecho=true;if(intentos===1)pts++;msg=intentos===1?'¡Perfecto! Acertaste a la primera.':'¡Correcto! Lo lograste corrigiendo.';}
  else msg=`Revisá los ${ver.filter(x=>!x).length} rectángulos en rojo. Escuchá de nuevo y probá otra vez.`;
  tablero();}
 function accion(a){M.audio.parar();
  if(a==='oir')return oir();
  if(a==='borrar'){resp.fill(null);ver=[];msg='';return tablero();}
  if(a==='comprobar')return comprobar();
  if(a==='mostrar'){resp=meta.map(t=>t==='silencio'&&cfg.vacioEsSilencio?null:t);ver=resp.map(()=>true);hecho=true;
   msg='Esta era la respuesta. Escuchala de nuevo mirando el tablero.';return tablero();}
  if(a==='sig'){ej++;return ej<M.EJ?nuevo():fin();}
  if(a==='repetir')return empezar(niv.n);
  if(a==='proximo')return empezar(niv.n+1);
  if(a==='menu')return menu();}

 raiz.onclick=e=>{
  const nv=e.target.closest('[data-nivel]');if(nv)return empezar(+nv.dataset.nivel);
  const a=e.target.closest('[data-acc]');if(a)return accion(a.dataset.acc);
  const c=e.target.closest('[data-celda]');
  if(c&&!e.target.closest('[data-arr]')&&sel&&niv&&!hecho)colocar(+c.dataset.celda,sel);};
 raiz.onchange=e=>{if(e.target.dataset.opt==='lento')lento=e.target.checked;};
 const quitar=M.arrastrar(raiz,{
  alSoltar:(t,c,o)=>{if(hecho||!niv)return;
   if(o.dataset.desde!==undefined)resp[+o.dataset.desde]=null;
   if(c)colocar(+c.dataset.celda,t);else{ver=[];tablero();}},
  alToque:o=>{if(hecho||!niv)return;
   if(o.dataset.desde!==undefined)colocar(+o.dataset.desde,sel);
   else{sel=sel===o.dataset.tipo?null:o.dataset.tipo;tablero();}}});
 menu();
 return{destruir(){quitar();M.audio.parar();raiz.onclick=null;raiz.onchange=null;}};
};

const conf={
 ritmos:{clave:'ritmos',titulo:'Sección 1 · Ritmo con partitura analógica',clase:'',vacioEsSilencio:true,fig:M.figuras.analogica,
  paleta:['negra','corcheas','semicorcheas','silencio'],
  nombres:{negra:'Negra · 1 palito',corcheas:'Corcheas · 2 palitos',semicorcheas:'Semicorcheas · 4 palitos',silencio:'Silencio · vacío'},
  consigna:'Escuchá el ritmo de percusión. Cada rectángulo es un pulso (una negra). Arrastrá los palitos al rectángulo que corresponda: 1 palito = negra, 2 = corcheas, 4 = semicorcheas. Si en ese pulso no suena nada, dejá el rectángulo vacío (silencio). También podés tocar una ficha y después tocar el rectángulo.'},
 pentagrama:{clave:'pentagrama',titulo:'Sección 2 · Ritmos con figuras',clase:'pent',vacioEsSilencio:false,fig:M.figuras.pentagrama,
  paleta:['negra','corcheas','semicorcheas','silencio'],
  nombres:{negra:'Negra',corcheas:'Corcheas',semicorcheas:'Semicorcheas',silencio:'Silencio de negra'},
  consigna:'Escuchá el ritmo de percusión. Cada casillero del pentagrama de una línea es un pulso. Arrastrá la figura musical correcta a cada casillero (si no suena nada, usá el silencio). También podés tocar una ficha y después tocar el casillero.'}};
Object.keys(conf).forEach(id=>{M.secciones[id]={titulo:conf[id].titulo,
 montar(r){this.t=M.crearEntrenador(r,conf[id]);},
 destruir(){if(this.t)this.t.destruir();this.t=null;}};});
})();
