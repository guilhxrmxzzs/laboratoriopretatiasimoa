const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');
const conteudoEquipe = document.getElementById('conteudoEquipe');
const btnAcervo = document.querySelector('.btn-acervo');

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${current}`) {
            a.classList.add('active');
        }
    });

    const scroll = window.scrollY;
    const heroTitle = document.querySelector('.hero-title-container');
    if (heroTitle) {
        heroTitle.style.transform = `translateY(${scroll * 0.4}px)`;
        heroTitle.style.opacity = 1 - (scroll / 800);
    }
});
document.querySelectorAll('.accordion-trigger').forEach(item => {
    item.addEventListener('click', () => {
        const content = item.nextElementSibling;
        const icon = item.querySelector('i');
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            if (icon) icon.classList.replace('fa-minus', 'fa-plus');
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            if (icon) icon.classList.replace('fa-plus', 'fa-minus');
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const btnVerMais = document.getElementById("btnVerMais");
    const cardsOcultos = document.querySelectorAll(".card-aluno.oculto");

    if (btnVerMais) {
        btnVerMais.addEventListener("click", function () {
            // Verifica se os cards já estão visíveis
            const estaAberto = btnVerMais.classList.contains("ativo");

            cardsOcultos.forEach((card, index) => {
                if (!estaAberto) {
                    // Adiciona um pequeno atraso em cascata para cada card aparecer individualmente
                    setTimeout(() => {
                        card.classList.add("mostrar-card");
                    }, index * 100); 
                } else {
                    card.classList.remove("mostrar-card");
                }
            });

            // Altera o texto e o estado do botão
            if (!estaAberto) {
                btnVerMais.classList.add("ativo");
                btnVerMais.innerHTML = 'Ver Menos <span class="seta-btn">▼</span>';
            } else {
                btnVerMais.classList.remove("ativo");
                btnVerMais.innerHTML = 'Ver Todos <span class="seta-btn">▼</span>';
                
                // Rola a tela suavemente de volta para o topo da seção se o usuário fechar
                document.getElementById("equipe").scrollIntoView({ behavior: "smooth" });
            }
        });
    }
});

btnAcervo.addEventListener('click', () => {
    window.location.href = 'acervo.html';
});