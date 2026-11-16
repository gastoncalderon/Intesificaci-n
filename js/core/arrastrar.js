// Arrastrar y soltar que funciona con mouse y con pantallas táctiles.
// Arrastrables: elementos con [data-arr] y data-tipo. Destinos: elementos con [data-celda].
(function(){const M=window.Musica=window.Musica||{};
M.arrastrar=function(raiz,{alSoltar,alToque}){
 let st=null;
 const limpiar=()=>document.querySelectorAll('.sobre').forEach(x=>x.classList.remove('sobre'));
 const dest=e=>{const el=document.elementFromPoint(e.clientX,e.clientY);return el&&el.closest('[data-celda]');};
 function abajo(e){const o=e.target.closest('[data-arr]');if(!o||e.button>0)return;st={o,x:e.clientX,y:e.clientY,id:e.pointerId,f:null};}
 function mover(e){if(!st||e.pointerId!==st.id)return;
  if(!st.f&&Math.hypot(e.clientX-st.x,e.clientY-st.y)>8){
   st.f=st.o.cloneNode(true);st.f.removeAttribute('data-arr');st.f.classList.add('fantasma');document.body.appendChild(st.f);}
  if(st.f){st.f.style.left=e.clientX+'px';st.f.style.top=e.clientY+'px';limpiar();const d=dest(e);if(d)d.classList.add('sobre');}}
 function arriba(e){if(!st||e.pointerId!==st.id)return;const s=st;st=null;limpiar();
  if(s.f){s.f.remove();alSoltar(s.o.dataset.tipo,dest(e),s.o);}else alToque(s.o);}
 function cancelar(){if(st&&st.f)st.f.remove();st=null;limpiar();}
 function teclado(e){if(e.detail===0){const o=e.target.closest('[data-arr]');if(o)alToque(o);}}
 raiz.addEventListener('pointerdown',abajo);raiz.addEventListener('click',teclado);
 window.addEventListener('pointermove',mover);window.addEventListener('pointerup',arriba);window.addEventListener('pointercancel',cancelar);
 return()=>{raiz.removeEventListener('pointerdown',abajo);raiz.removeEventListener('click',teclado);
  window.removeEventListener('pointermove',mover);window.removeEventListener('pointerup',arriba);window.removeEventListener('pointercancel',cancelar);cancelar();};
};
})();
