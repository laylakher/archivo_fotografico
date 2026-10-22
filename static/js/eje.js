// Página de un eje temático: toma el id de la URL (/ejes/{id}) y lo busca en EJES (ejes.js).
// Aquí es donde se cargará la información del eje (fichas, fotografías) desde la API.
const ejeId = Number(window.location.pathname.split("/").filter(Boolean).pop());
const eje = EJES.find((e) => e.id === ejeId);

if (!eje) {
    window.location.replace("/#galeria");
} else {
    const total = EJES.length;
    const imagen = document.getElementById("eje-imagen");

    document.title = `${eje.titulo} · Fondo Fotográfico MNA`;
    imagen.src = eje.imagen;
    imagen.alt = eje.titulo;
    document.getElementById("eje-numero").textContent = String(eje.id).padStart(2, "0");
    document.getElementById("eje-titulo").textContent = eje.titulo;
    document.getElementById("eje-anterior").href = `/ejes/${((ejeId - 2 + total) % total) + 1}`;
    document.getElementById("eje-siguiente").href = `/ejes/${(ejeId % total) + 1}`;

    // Si se llegó desde la órbita, la imagen ya cubría la pantalla: se muestra sin fundido
    let desdeOrbita = false;
    try {
        desdeOrbita = sessionStorage.getItem("eje-transicion") === String(ejeId);
        sessionStorage.removeItem("eje-transicion");
    } catch (_) { /* sin storage: entrada normal */ }
    document.body.classList.add(desdeOrbita ? "desde-orbita" : "entrada-normal");

    // Volver con history.back() cuando se vino de la portada, para regresar a la misma posición
    document.getElementById("eje-volver").addEventListener("click", (e) => {
        let vieneDePortada = false;
        try {
            const anterior = new URL(document.referrer);
            vieneDePortada = anterior.origin === window.location.origin && anterior.pathname === "/";
        } catch (_) { /* sin referrer */ }
        if (vieneDePortada && window.history.length > 1) {
            e.preventDefault();
            window.history.back();
        }
    });
}
