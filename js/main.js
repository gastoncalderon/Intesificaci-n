// Navegación entre secciones (por la dirección #/ritmos, #/pentagrama, #/cualidades).
(function(){const M=window.Musica;
const SEC=[['ritmos','1 · Ritmos con palitos','Escuchá un ritmo y armalo con palitos.'],
 ['pentagrama','2 · Ritmos con figuras','Escuchá un ritmo y escribilo con figuras musicales.'],
 ['cualidades','3 · Cualidades del sonido','Compará dos sonidos: timbre, duración, intensidad y altura.']];
const app=document.getElementById('app'),nav=document.getElementById('nav');
const inicio={montar(r){r.innerHTML=`<h2>¡Bienvenido/a!</h2><p>Practicá música en casa. Usá auriculares o subí el volumen y elegí una sección:</p>
 <div class="niveles">${SEC.map(([id,t,d])=>`<a class="nivel" href="#/${id}"><b>${t}</b><span>${d}</span></a>`).join('')}</div>`;},destruir(){}};
let act=null;
function ir(){const id=location.hash.replace('#/','');
 if(act&&act.destruir)act.destruir();
 app.onclick=null;app.onchange=null;
 act=M.secciones[id]||inicio;act.montar(app);
 nav.innerHTML=`<a href="#/" class="${M.secciones[id]?'':'act'}">Inicio</a>`+SEC.map(([i,t])=>`<a href="#/${i}" class="${i===id?'act':''}">${t}</a>`).join('');
 window.scrollTo(0,0);}
window.addEventListener('hashchange',ir);ir();
})();
