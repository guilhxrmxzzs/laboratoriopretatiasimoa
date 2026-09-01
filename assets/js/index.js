const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');
const btnAcervo = document.querySelector('.btn-acervo');

// Controle do Scroll (Header, Menu Ativo e Efeito Parallax)
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    
    if (header) {
        if (window.scrollY > 100) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    }

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

// Controle do Accordion (Sanfonas)
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

// Redirecionamento do Botão Acervo
if (btnAcervo) {
    btnAcervo.addEventListener('click', () => {
        window.location.href = 'acervo.html';
    });
}

// Funções executadas após o carregamento da página
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Menu Mobile (Responsivo)
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            if (nav.classList.contains('active')) {
                menuToggle.textContent = '✕';
            } else {
                menuToggle.textContent = '☰';
            }
        });
    }

    // 2. Carrossel da Equipe
    const containerEquipe = document.getElementById("containerAlunos");
    const btnPrev = document.getElementById("btnPrevEquipe");
    const btnNext = document.getElementById("btnNextEquipe");

    if (containerEquipe && btnPrev && btnNext) {
        // Define a quantidade de rolagem por clique (largura do card 280px + gap 24px)
        const scrollAmount = 304; 

        btnPrev.addEventListener("click", () => {
            containerEquipe.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });

        btnNext.addEventListener("click", () => {
            containerEquipe.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const pilares = document.querySelectorAll('.pilar-card');

    pilares.forEach(pilar => {
        pilar.addEventListener('click', function() {
            // Verifica se o card atual já está ativo
            const isActive = this.classList.contains('ativo');

            // Remove a classe 'ativo' de todos os cards
            pilares.forEach(p => p.classList.remove('ativo'));

            // Se o card não estava ativo antes do clique, adiciona a classe
            if (!isActive) {
                this.classList.add('ativo');
            }
        });
    });
});