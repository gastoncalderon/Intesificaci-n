// Datos y lógica pura de los ejercicios de ritmo (sin pantalla ni sonido).
(function(){const M=window.Musica=window.Musica||{};M.secciones=M.secciones||{};
// Cantidad de sonidos que tiene cada figura dentro de un pulso (una negra).
M.NOTAS={silencio:0,negra:1,corcheas:2,semicorcheas:4};
M.EJ=5; // ejercicios por nivel
M.NIVELES=[
 {n:1,titulo:'Negras y silencios',neutro:'Un sonido y silencios',tipos:['negra','silencio'],exigir:'silencio',bpm:70},
 {n:2,titulo:'Aparecen las corcheas',neutro:'Aparecen los 2 sonidos',tipos:['negra','corcheas','silencio'],exigir:'corcheas',bpm:76},
 {n:3,titulo:'Aparecen las semicorcheas',neutro:'Aparecen los 4 sonidos',tipos:['negra','corcheas','semicorcheas'],exigir:'semicorcheas',bpm:76},
 {n:4,titulo:'Todas las figuras',neutro:'Todas las combinaciones',tipos:['negra','corcheas','semicorcheas','silencio'],exigir:'silencio',bpm:80},
 {n:5,titulo:'Desafío',neutro:'Desafío',tipos:['negra','corcheas','semicorcheas','silencio'],exigir:'semicorcheas',veces:2,bpm:88}];
// Genera 8 pulsos (2 compases de 4) al azar respetando las reglas del nivel.
M.generar=function(n){let p;
 do{p=Array.from({length:8},()=>n.tipos[Math.floor(Math.random()*n.tipos.length)]);}
 while(p.filter(t=>t!=='silencio').length<4||p.filter(t=>t===n.exigir).length<(n.veces||1)||
  new Set(p).size<Math.min(3,n.tipos.length)||p.slice(0,4).join()===p.slice(4).join());
 return p;};
// Devuelve una lista de true/false: ¿cada rectángulo está bien?
M.comparar=(meta,resp,vacioEsSilencio)=>meta.map((t,i)=>(resp[i]??(vacioEsSilencio?'silencio':null))===t);
// Progreso guardado en el navegador (sin datos personales).
M.leer=c=>{try{return JSON.parse(localStorage.getItem('musica-en-casa:'+c))||{}}catch(e){return{}}};
M.guardar=(c,v)=>{try{localStorage.setItem('musica-en-casa:'+c,JSON.stringify(v))}catch(e){}};
})();
