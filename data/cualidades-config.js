// ============================================================
//  AUDIOS DE LA SECCIÓN 3 (Cualidades del sonido)
//  Los archivos de audio van en la carpeta  assets/audio/cualidades/
//  con estos nombres exactos (todo en minúscula, sin tildes ni espacios):
//    piano.mp3  flauta.mp3  trompeta.mp3  bajo.mp3
//    bombo.mp3  triangulo.mp3  guitarra.mp3  violin.mp3
//  Si tus archivos son .wav u .ogg, cambiá solamente la terminación acá abajo.
//
//  Valores posibles (siempre en minúscula):
//    duracion: corto / largo      intensidad: fuerte / suave      altura: grave / agudo
//  Los nombres de timbre (Piano, Flauta...) sí pueden llevar mayúscula y tilde.
// ============================================================
window.Musica=window.Musica||{};
window.Musica.cualidadesConfig={
 ejercicios:[
  {
   a:{archivo:'assets/audio/cualidades/piano.mp3'},
   b:{archivo:'assets/audio/cualidades/flauta.mp3'},
   timbre:{a:'Piano',b:'Flauta'},
   duracion:{a:'largo',b:'corto'},
   intensidad:{a:'fuerte',b:'suave'},
   altura:{a:'grave',b:'agudo'}
  },
  {
   a:{archivo:'assets/audio/cualidades/trompeta.mp3'},
   b:{archivo:'assets/audio/cualidades/bajo.mp3'},
   timbre:{a:'Trompeta',b:'Bajo'},
   duracion:{a:'largo',b:'corto'},
   intensidad:{a:'suave',b:'fuerte'},
   altura:{a:'agudo',b:'grave'}
  },
  {
   a:{archivo:'assets/audio/cualidades/triangulo.mp3'},
   b:{archivo:'assets/audio/cualidades/bombo.mp3'},
   timbre:{a:'Triángulo',b:'Bombo'},
   duracion:{a:'largo',b:'corto'},
   intensidad:{a:'suave',b:'fuerte'},
   altura:{a:'agudo',b:'grave'}
  },
  {
   a:{archivo:'assets/audio/cualidades/guitarra.mp3'},
   b:{archivo:'assets/audio/cualidades/violin.mp3'},
   timbre:{a:'Guitarra',b:'Violín'},
   duracion:{a:'corto',b:'largo'},
   intensidad:{a:'fuerte',b:'suave'},
   altura:{a:'grave',b:'agudo'}
  }
 ]
};
