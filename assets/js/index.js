const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

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

// =============================================
// ACCORDION
// =============================================
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
