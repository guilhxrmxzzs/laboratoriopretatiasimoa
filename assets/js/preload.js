// Alterado de 'load' para 'DOMContentLoaded' para a animação começar mais rápido e fluida
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inicia AOS (com tratamento para não travar se não encontrar a biblioteca)
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: false, mirror: true });
    }

    // 2. Renderiza os cards (Verifica se a função e a lista existem)
    if (typeof renderizarAlunos === 'function' && typeof listaAlunos !== 'undefined') {
        renderizarAlunos(listaAlunos);
    } else {
        console.warn("Função renderizarAlunos ou listaAlunos não foram encontradas.");
    }

    // 3. Preloader
    let progress = 0;
    const bar = document.getElementById('bar');
    
    if (bar) {
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    const preloader = document.getElementById('preloader');
                    if (preloader) {
                        preloader.style.transition = 'opacity 0.6s ease'; 
                        preloader.style.opacity = '0';
                        setTimeout(() => {
                            preloader.style.display = 'none';
                        }, 600);
                    }
                }, 500);
            }
            bar.style.width = progress + '%';
        }, 200);
    }

    // 4. Particles 
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 120, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#c5a059" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true },
                "size": { "value": 2, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#c5a059", "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
            },
            "interactivity": {
                "events": {
                    "onhover": { "enable": true, "mode": "repulse" },
                    "onclick": { "enable": true, "mode": "push" }
                }
            },
            "retina_detect": true
        });
    }
});