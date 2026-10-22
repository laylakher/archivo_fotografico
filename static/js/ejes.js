// Los 13 ejes temáticos del Fondo Fotográfico. Lo usan la órbita de la galería (orbita.js)
// y la página de cada eje (eje.js), que se sirve en /ejes/{id}.
// `imagen` es provisional: reemplazar por la fotografía representativa de cada eje
// (idealmente una miniatura de ~400px, porque se muestra en un círculo pequeño).
const EJES = [
    { id: 1, titulo: "[Moneda, n. 13] [El museo antecesor]", imagen: "/static/colecciones/F1_1.JPG" },
    { id: 2, titulo: "Planeación e instalación del Museo Nacional de Antropología", imagen: "/static/marquee/thumb_01.jpg" },
    { id: 3, titulo: "Visitantes y servicios", imagen: "/static/marquee/thumb_02.jpg" },
    { id: 4, titulo: "Piezas arqueológicas", imagen: "/static/marquee/thumb_03.jpg" },
    { id: 5, titulo: "Etnografía: fotografía, expediciones y ofrendas", imagen: "/static/marquee/thumb_04.jpg" },
    { id: 6, titulo: "Antropología física", imagen: "/static/marquee/thumb_05.jpg" },
    { id: 7, titulo: "Donaciones: especímenes fotográficos donados al AHMNA", imagen: "/static/marquee/thumb_06.jpg" },
    { id: 8, titulo: "Museografía y reestructuraciones", imagen: "/static/marquee/thumb_07.jpg" },
    { id: 9, titulo: "Obra contemporánea", imagen: "/static/marquee/thumb_08.jpg" },
    { id: 10, titulo: "Exposiciones", imagen: "/static/marquee/thumb_09.jpg" },
    { id: 11, titulo: "Ventanas históricas de sitios arqueológicos", imagen: "/static/marquee/thumb_10.jpg" },
    { id: 12, titulo: "Artífices y personalidades distinguidas en la historia del museo", imagen: "/static/colecciones/F1_2.JPG" },
    { id: 13, titulo: "Eventualidades e incidentes en la historia del museo", imagen: "/static/colecciones/F1_3.JPG" },
];
