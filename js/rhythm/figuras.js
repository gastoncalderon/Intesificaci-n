// Dibujos (SVG): palitos para la notación analógica y figuras sobre pentagrama de una línea.
(function(){const M=window.Musica=window.Musica||{};
const svg=c=>`<svg class="fig-svg" viewBox="0 0 100 110" aria-hidden="true">${c}</svg>`;
const palitos=n=>{let s='';for(let i=0;i<n;i++){const x=(i+.5)*100/n;s+=`<rect x="${x-4}" y="17" width="8" height="76" rx="4"/>`;}return s;};
const cab=x=>`<ellipse cx="${x}" cy="70" rx="9" ry="6.5" transform="rotate(-20 ${x} 70)"/>`;
const pal=(x,y)=>`<rect x="${x+6.3}" y="${y}" width="2.6" height="${70-y}"/>`;
const viga=(x1,x2,y)=>`<rect x="${x1+6.3}" y="${y}" width="${x2-x1+2.6}" height="5"/>`;
const NOTA={
 negra:cab(50)+pal(50,24),
 corcheas:cab(30)+cab(70)+pal(30,26)+pal(70,26)+viga(30,70,26),
 semicorcheas:[14,38,62,86].map(x=>cab(x)+pal(x,26)).join('')+viga(14,86,26)+viga(14,86,35),
 silencio:'<path d="M44 42 L57 57 L45 71 L57 86 C48 85 43 91 47 98" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'};
const LINEA='<line x1="0" x2="100" y1="70" y2="70" stroke="currentColor" stroke-width="2"/>';
M.figuras={
 // celda: lo que se ve dentro del rectángulo; ficha: lo que se ve en la paleta
 analogica:{
  celda:t=>t&&M.NOTAS[t]?svg(palitos(M.NOTAS[t])):'',
  ficha:t=>t==='silencio'?svg('<rect x="22" y="40" width="56" height="26" rx="6" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="8 6"/>'):svg(palitos(M.NOTAS[t]))},
 pentagrama:{
  celda:t=>svg(LINEA+(t?NOTA[t]:'')),
  ficha:t=>svg(NOTA[t])}};
})();
