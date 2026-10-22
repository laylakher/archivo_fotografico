// Galería en órbita: los 13 ejes giran sobre una trayectoria circular, se detienen cuando
// el cursor se acerca a uno y, al hacer clic, la imagen se expande hasta cubrir la pantalla
// antes de llevar a la página del eje (/ejes/{id}).
document.addEventListener("DOMContentLoaded", () => {
    const orbita = document.getElementById("orbita");
    if (!orbita) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SEGUNDOS_POR_VUELTA = 80;
    const VELOCIDAD_BASE = reduceMotion ? 0 : (Math.PI * 2) / SEGUNDOS_POR_VUELTA;
    const PROPORCION_ITEM = 0.4; // diámetro de cada círculo respecto al radio de la órbita
    const ESCALA_ACTIVO = 1.22;  // debe coincidir con .orbita-item.is-active .orbita-marco en style.css

    const kickerEl = document.getElementById("orbita-kicker");
    const numeroEl = document.getElementById("orbita-numero");
    const tituloEl = document.getElementById("orbita-titulo");
    const textoCentro = orbita.querySelector(".orbita-centro-texto");
    const textoInicial = [kickerEl.textContent, numeroEl.textContent, tituloEl.textContent];

    const items = EJES.map((eje, i) => {
        const el = document.createElement("a");
        el.className = "orbita-item";
        el.href = `/ejes/${eje.id}`;
        el.setAttribute("aria-label", `Eje ${eje.id}: ${eje.titulo}`);

        const marco = document.createElement("span");
        marco.className = "orbita-marco";
        const img = document.createElement("img");
        img.src = eje.imagen;
        img.alt = "";
        img.loading = "lazy";
        img.decoding = "async";
        img.draggable = false;
        marco.appendChild(img);
        el.appendChild(marco);
        orbita.appendChild(el);

        return { eje, el, marco, fase: (i / EJES.length) * Math.PI * 2, x: 0, y: 0, dx: 0, dy: 0 };
    });

    let centro = 0, radio = 0, diametro = 0;
    let angulo = 0, velocidad = VELOCIDAD_BASE;
    let activo = null, enfocado = null, puntero = null, saliendo = false;

    function medir() {
        const lado = orbita.clientWidth;
        centro = lado / 2;
        // El círculo activo (ya escalado) tiene que caber en el contenedor, con margen para su anillo
        radio = (lado / 2 - 12) / (1 + (PROPORCION_ITEM * ESCALA_ACTIVO) / 2);
        diametro = radio * PROPORCION_ITEM;
        orbita.style.setProperty("--radio", `${radio}px`);
        orbita.style.setProperty("--item", `${diametro}px`);
    }

    function calcularPosiciones() {
        items.forEach((it) => {
            const a = angulo + it.fase - Math.PI / 2; // el eje 1 arranca arriba
            it.x = centro + radio * Math.cos(a);
            it.y = centro + radio * Math.sin(a);
        });
    }

    function pintar() {
        items.forEach((it) => {
            it.el.style.transform = `translate3d(${it.x + it.dx - diametro / 2}px, ${it.y + it.dy - diametro / 2}px, 0)`;
        });
    }

    function mostrarEnCentro(kicker, numero, titulo) {
        const escribir = () => {
            kickerEl.textContent = kicker;
            numeroEl.textContent = numero;
            tituloEl.textContent = titulo;
        };
        if (reduceMotion) return escribir();
        gsap.to(textoCentro, {
            opacity: 0, y: 8, duration: 0.15, ease: "power1.in", overwrite: true,
            onComplete: () => {
                escribir();
                gsap.to(textoCentro, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
            }
        });
    }

    function activar(it) {
        if (it === activo) return;
        if (activo) activo.el.classList.remove("is-active");
        activo = it;
        orbita.classList.toggle("has-active", Boolean(it));
        if (it) {
            it.el.classList.add("is-active");
            mostrarEnCentro("Eje temático", String(it.eje.id).padStart(2, "0"), it.eje.titulo);
        } else {
            mostrarEnCentro(...textoInicial);
        }
    }

    // Se activa el círculo al que se acerca el cursor, no solo el que está justo debajo.
    // Se calcula en cada cuadro porque los círculos se mueven aunque el cursor esté quieto.
    function elegirPorCercania(rect) {
        if (!puntero || !rect) return null;
        const px = puntero.x - rect.left;
        const py = puntero.y - rect.top;
        const r = diametro / 2;
        let cercano = null, distancia = Infinity;
        items.forEach((it) => {
            const d = Math.hypot(px - it.x, py - it.y);
            if (d < distancia) { cercano = it; distancia = d; }
        });
        if (distancia < r * 1.35) return cercano;
        // Histéresis: el activo se suelta un poco más lejos de donde se tomó, para que no parpadee
        if (activo && Math.hypot(px - activo.x, py - activo.y) < r * 1.7) return activo;
        return null;
    }

    let ultimo = 0, rafId = null;
    function frame(ahora) {
        const dt = Math.min((ahora - ultimo) / 1000, 0.05);
        ultimo = ahora;
        const rect = puntero ? orbita.getBoundingClientRect() : null;

        // Al acercarse a un círculo la órbita frena en ~0.1 s, y retoma igual de suave al alejarse
        const objetivo = activo || saliendo ? 0 : VELOCIDAD_BASE;
        velocidad += (objetivo - velocidad) * Math.min(1, dt * 10);
        angulo += velocidad * dt;
        calcularPosiciones();

        if (!saliendo) activar(elegirPorCercania(rect) || enfocado);

        // Efecto imán: el círculo activo se inclina un poco hacia el cursor
        const suavizado = Math.min(1, dt * 12);
        items.forEach((it) => {
            let tx = 0, ty = 0;
            if (it === activo && rect && !saliendo && !reduceMotion) {
                tx = (puntero.x - rect.left - it.x) * 0.2;
                ty = (puntero.y - rect.top - it.y) * 0.2;
            }
            it.dx += (tx - it.dx) * suavizado;
            it.dy += (ty - it.dy) * suavizado;
        });
        pintar();
        rafId = requestAnimationFrame(frame);
    }

    function abrir(it) {
        if (saliendo) return;
        saliendo = true;
        activar(it);
        const destino = it.el.href;
        try { sessionStorage.setItem("eje-transicion", String(it.eje.id)); } catch (_) { /* sin storage: solo se pierde la continuidad */ }

        if (reduceMotion) {
            window.location.href = destino;
            return;
        }

        // Copia de la imagen en position: fixed que crece desde el círculo hasta cubrir la ventana,
        // así la página del eje arranca con la misma imagen a pantalla completa
        const rect = it.marco.getBoundingClientRect();
        const capa = document.createElement("div");
        capa.className = "orbita-expansion";
        Object.assign(capa.style, {
            left: `${rect.left}px`,
            top: `${rect.top}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`
        });
        const img = document.createElement("img");
        img.src = it.eje.imagen;
        img.alt = "";
        capa.appendChild(img);
        document.body.appendChild(capa);

        gsap.fromTo(img, { scale: 1.08 }, { scale: 1, duration: 0.9, ease: "expo.inOut" });
        gsap.to(capa, {
            left: 0,
            top: 0,
            width: window.innerWidth,
            height: window.innerHeight,
            borderRadius: "0%",
            duration: 0.9,
            ease: "expo.inOut",
            onComplete: () => { window.location.href = destino; }
        });
    }

    window.addEventListener("pointermove", (e) => {
        if (e.pointerType === "touch") return;
        puntero = { x: e.clientX, y: e.clientY };
    }, { passive: true });
    document.addEventListener("mouseout", (e) => {
        if (!e.relatedTarget) puntero = null; // el cursor salió de la ventana
    });

    // Con teclado, el círculo enfocado también detiene la órbita
    orbita.addEventListener("focusin", (e) => {
        enfocado = e.target.matches(":focus-visible") ? items.find((it) => it.el === e.target) || null : null;
    });
    orbita.addEventListener("focusout", () => { enfocado = null; });

    orbita.addEventListener("click", (e) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // abrir en otra pestaña, etc.
        const el = e.target.closest(".orbita-item");
        // Si el clic cae cerca de un círculo activo (no exactamente encima), también lo abre
        const it = el ? items.find((i) => i.el === el) : activo;
        if (!it) return;
        e.preventDefault();
        abrir(it);
    });

    // Al volver con el botón "atrás" el navegador puede restaurar la página tal cual quedó (bfcache)
    window.addEventListener("pageshow", (e) => {
        if (!e.persisted) return;
        document.querySelectorAll(".orbita-expansion").forEach((capa) => capa.remove());
        saliendo = false;
        puntero = null;
        activar(null);
    });

    new ResizeObserver(() => {
        medir();
        calcularPosiciones();
        pintar();
    }).observe(orbita);

    // Solo se anima mientras la galería está en pantalla
    new IntersectionObserver(([entrada]) => {
        if (entrada.isIntersecting && rafId === null) {
            ultimo = performance.now();
            rafId = requestAnimationFrame(frame);
        } else if (!entrada.isIntersecting && rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    }).observe(orbita);

    medir();
    calcularPosiciones();
    pintar();
});
