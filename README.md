# Música en casa

App web para que los alumnos practiquen en sus casas. No necesita instalar nada ni registrarse, y no guarda datos personales (solo las estrellas de cada nivel, en el propio navegador).

## Secciones
1. **Ritmos con palitos**: se escucha un ritmo de percusión seca y se arma con palitos (1 = negra, 2 = corcheas, 4 = semicorcheas; vacío = silencio). 8 rectángulos en 2 compases. 5 niveles de 5 ejercicios.
2. **Ritmos con figuras**: lo mismo, pero con figuras sobre un pentagrama de una línea (negra, corcheas, semicorcheas, silencio).
3. **Cualidades del sonido**: se comparan dos audios y se clasifican por timbre, duración, intensidad y altura.

La percusión de las secciones 1 y 2 se genera en el navegador: **no hace falta subir audios ni imágenes** para esas secciones.

## Carpetas
| Carpeta / archivo | Qué contiene |
|---|---|
| `index.html` | Página principal |
| `css/estilos.css` | Colores y diseño |
| `js/rhythm/modelo.js` | Niveles y reglas de los ritmos |
| `js/rhythm/figuras.js` | Dibujos de palitos y figuras |
| `js/rhythm/entrenador.js` | Pantalla y funcionamiento de las secciones 1 y 2 |
| `js/core/audio.js` | Sonidos |
| `js/core/arrastrar.js` | Arrastrar y soltar (mouse y táctil) |
| `js/qualities/cualidades.js` | Sección 3 |
| `data/cualidades-config.js` | **Acá se cargan tus audios de la Sección 3** |
| `assets/audio/cualidades/` | **Acá se suben los archivos de audio** |
| `js/main.js` | Navegación |

## Publicar en GitHub (sin programar)
1. En github.com creá un repositorio nuevo (botón **New**), público.
2. Entrá al repositorio y elegí **Add file → Upload files**. Descomprimí el ZIP y arrastrá **todo el contenido** de la carpeta (index.html, css, js, data, assets, README.md). Después **Commit changes**.
3. Andá a **Settings → Pages**. En *Branch* elegí `main` y la carpeta `/ (root)`, y guardá.
4. A los pocos minutos GitHub te da el link de la app para compartir con los alumnos.

## Cargar los audios de la Sección 3
1. Subí los audios a `assets/audio/cualidades/` (Add file → Upload files).
2. Editá `data/cualidades-config.js` (ícono del lápiz en GitHub) siguiendo el ejemplo que trae.
3. Mientras no cargues nada, la sección muestra 5 ejercicios de demostración con sonidos sintetizados.

Si me pasás los nombres de tus audios y qué es cada uno, te devuelvo el archivo `cualidades-config.js` completo, listo para reemplazar.
