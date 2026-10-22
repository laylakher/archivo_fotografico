document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Icons
    lucide.createIcons();

    // 2. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 3. Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // Update ScrollTrigger on lenis scroll
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Fade loader out
    window.onload = () => {
        gsap.to("#loader", { opacity: 0, duration: 0.5, onComplete: () => {
            document.getElementById("loader").style.display = "none";
            initAnimations();
        }});
    }

    function initAnimations() {
        // --- FADE IN ---
        gsap.utils.toArray('.fade-in').forEach(element => {
            const delay = parseFloat(element.getAttribute('data-delay')) || 0;
            const y = parseFloat(element.getAttribute('data-y')) || 0;
            gsap.fromTo(element,
                { opacity: 0, y: y },
                { opacity: 1, y: 0, duration: 0.9, delay: delay, ease: "power3.out" }
            );
        });

        // --- ABOUT ICONS FADE IN ---
        gsap.utils.toArray('.fade-in-icon').forEach(icon => {
            const delay = parseFloat(icon.getAttribute('data-delay')) || 0;
            const x = parseFloat(icon.getAttribute('data-x')) || 0;
            
            ScrollTrigger.create({
                trigger: icon,
                start: "top 80%",
                once: true,
                animation: gsap.fromTo(icon, 
                    { opacity: 0, x: x },
                    { opacity: 0.6, x: 0, duration: 0.9, delay: delay, ease: "power3.out" }
                )
            });
        });

        // --- ABOUT TEXT REVEAL ---
        const textElement = document.getElementById('about-text');
        if (textElement) {
            const text = textElement.innerText;
            textElement.innerHTML = '';
            // Split text into spans
            text.split('').forEach(char => {
                const span = document.createElement('span');
                span.innerText = char;
                span.style.opacity = 0.2;
                textElement.appendChild(span);
            });

            gsap.to(textElement.children, {
                opacity: 1,
                stagger: 0.05,
                ease: "none",
                scrollTrigger: {
                    trigger: textElement,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: true
                }
            });
        }

        // --- EXPLORE ITEMS ---
        gsap.utils.toArray('.explore-item').forEach((item, i) => {
            ScrollTrigger.create({
                trigger: item,
                start: "top 85%",
                once: true,
                animation: gsap.fromTo(item, 
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, delay: i * 0.1, ease: "power2.out" }
                )
            });
        });

        // --- COLLECTIONS STACKING CARDS ---
        const cards = gsap.utils.toArray('.collection-card');
        const totalCards = cards.length;
        
        cards.forEach((card, i) => {
            // Setup scale down effect as you scroll past them
            const targetScale = 1 - (totalCards - 1 - i) * 0.03;
            
            gsap.to(card, {
                scale: targetScale,
                transformOrigin: "top center",
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "top 120px", // When card hits sticky position
                    endTrigger: "#collections-container",
                    end: "bottom bottom", // Until container ends
                    scrub: true,
                    invalidateOnRefresh: true
                }
            });
        });
    }
});
