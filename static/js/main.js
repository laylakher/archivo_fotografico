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
        // --- HERO FADE IN ---
        gsap.utils.toArray('.fade-in').forEach(element => {
            const delay = parseFloat(element.getAttribute('data-delay')) || 0;
            const y = parseFloat(element.getAttribute('data-y')) || 0;
            gsap.fromTo(element, 
                { opacity: 0, y: y },
                { opacity: 1, y: 0, duration: 0.9, delay: delay, ease: "power3.out" }
            );
        });

        // --- MAGNET EFFECT ---
        const magnets = document.querySelectorAll('.magnet-container');
        magnets.forEach(magnet => {
            const target = magnet.querySelector('.magnet-target');
            const padding = parseFloat(magnet.getAttribute('data-padding')) || 100;
            const strength = parseFloat(magnet.getAttribute('data-strength')) || 3;

            magnet.addEventListener('mousemove', (e) => {
                const rect = magnet.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Calculate distance from center
                const distanceX = e.clientX - centerX;
                const distanceY = e.clientY - centerY;

                target.style.transition = 'transform 0.3s ease-out';
                target.style.transform = `translate3d(${distanceX / strength}px, ${distanceY / strength}px, 0)`;
            });

            magnet.addEventListener('mouseleave', () => {
                target.style.transition = 'transform 0.6s ease-in-out';
                target.style.transform = 'translate3d(0px, 0px, 0)';
            });
        });

        // --- MARQUEE SCROLL ---
        const marquee1 = document.getElementById('marquee-1');
        const marquee2 = document.getElementById('marquee-2');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const offset = scrollY * 0.3;
            if(marquee1) marquee1.style.transform = `translate3d(${offset - 200}px, 0, 0)`;
            if(marquee2) marquee2.style.transform = `translate3d(${-(offset - 200)}px, 0, 0)`;
        }, { passive: true });

        // --- NARRATIVE CANVAS ---
        initCanvasSequence();

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

    function initCanvasSequence() {
        const canvas = document.getElementById("narrative-canvas");
        const context = canvas.getContext("2d");
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const frameCount = 56; // Total frames we generated
        const currentFrame = index => `/static/frame/${(index + 1).toString().padStart(4, '0')}.jpg`;

        const images = [];
        const airpods = { frame: 0 }; // object to animate

        // Preload images
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        images[0].onload = render;

        function render() {
            if(!images[airpods.frame]) return;
            // Draw image covering the canvas (object-fit: cover equivalent)
            const img = images[airpods.frame];
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;
            
            let drawWidth = canvas.width;
            let drawHeight = canvas.height;
            let drawX = 0;
            let drawY = 0;

            if (canvasRatio > imgRatio) {
                drawHeight = canvas.width / imgRatio;
                drawY = (canvas.height - drawHeight) / 2;
            } else {
                drawWidth = canvas.height * imgRatio;
                drawX = (canvas.width - drawWidth) / 2;
            }

            // Clear canvas with base color
            context.fillStyle = '#16241C';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        }

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render();
        });

        // Create ScrollTrigger to animate frame property
        gsap.to(airpods, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: "#canvas-section",
                start: "top top",
                end: "+=300%",
                scrub: 0.5
            },
            onUpdate: render
        });

        // Sync Text Phases opacities with scroll
        const phases = [
            { id: "#phase-1", start: 0, end: 0.2 },
            { id: "#phase-2", start: 0.2, end: 0.55 },
            { id: "#phase-3", start: 0.55, end: 0.85 },
            { id: "#phase-4", start: 0.85, end: 1.0 }
        ];

        phases.forEach(phase => {
            const el = document.querySelector(phase.id);
            if(!el) return;
            
            // Map timeline to scroll range
            gsap.to(el, {
                scrollTrigger: {
                    trigger: "#canvas-section",
                    start: `top+=${phase.start * 300}% top`,
                    end: `top+=${phase.end * 300}% top`,
                    scrub: true,
                    onUpdate: self => {
                        // Fade in first 20% of its active range, fade out last 20%
                        const p = self.progress;
                        let opacity = 0;
                        if(p > 0 && p < 1) {
                            if(p < 0.2) opacity = p / 0.2;
                            else if(p > 0.8) opacity = (1 - p) / 0.2;
                            else opacity = 1;
                        }
                        // Phase 4 stays visible at the end
                        if(phase.id === "#phase-4" && p > 0.8) opacity = 1;
                        
                        el.style.opacity = opacity;
                    }
                }
            });
        });
    }
});
