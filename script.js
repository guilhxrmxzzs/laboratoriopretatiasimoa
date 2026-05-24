// =============================================
// LISTA DE ALUNOS
// =============================================
const listaAlunos = [
    { nome: "Guilherme M.", curso: "Redes de Computadores", bio: "Responsável pelo desenvolvimento da arquitetura e interface do site, especialista em front-end e UX/UI.", foto: "assets/images/guilherme.png" },
    { nome: "Luis Guilherme", curso: "Desenvolvimento de Sistemas", bio: "Co-desenvolvedor, focado em back-end e integração de dados históricos.", foto: "assets/images/luis.png" },
    { nome: "Isabelle", curso: "Administração", bio: "Especialista em digitalização de fontes primárias e documentos raros, gestão de acervo.", foto: "" },
    { nome: "Thays Alves", curso: "Escrita", bio: "Redatora das narrativas de resistência e biografia da Tia Simoa, especialista em literatura afro-brasileira.", foto: "" },
    { nome: "João Pedro", curso: "História", bio: "Pesquisador sênior, especialista em história afro-cearense e abolicionismo.", foto: "" },
    { nome: "Ana Clara", curso: "Artes Visuais", bio: "Designer gráfica, responsável pela identidade visual e ilustrações históricas.", foto: "" },
    { nome: "Rafael Silva", curso: "Tecnologia da Informação", bio: "Desenvolvedor de software, implementação de sistemas de catalogação digital.", foto: "" },
    { nome: "Beatriz Lima", curso: "Sociologia", bio: "Analista social, estudos sobre impacto cultural da escravidão no Ceará.", foto: "" },
    { nome: "Carlos Eduardo", curso: "Fotografia", bio: "Fotógrafo documental, registro de sítios históricos e eventos culturais.", foto: "" },
    { nome: "Fernanda Alves", curso: "Jornalismo", bio: "Jornalista investigativa, produção de conteúdo sobre resistência negra.", foto: "" },
    { nome: "Pedro Henrique", curso: "Engenharia Civil", bio: "Especialista em preservação de patrimônio histórico, restauração de documentos.", foto: "" },
    { nome: "Gabriela Santos", curso: "Psicologia", bio: "Psicóloga social, estudos sobre trauma coletivo e memória afrodescendente.", foto: "" },
    { nome: "Lucas Oliveira", curso: "Ciência da Computação", bio: "Programador, desenvolvimento de algoritmos para análise de dados históricos.", foto: "" },
    { nome: "Juliana Pereira", curso: "Educação", bio: "Educadora, coordenação de workshops e palestras sobre história negra.", foto: "" },
    { nome: "Thiago Rodrigues", curso: "Música", bio: "Compositor e músico, criação de trilhas sonoras para exposições virtuais.", foto: "" },
    { nome: "Camila Ferreira", curso: "Antropologia", bio: "Antropóloga, pesquisa de campo sobre tradições afro-cearenses.", foto: "" },
    { nome: "Diego Costa", curso: "Design Gráfico", bio: "Designer, criação de materiais visuais para campanhas de conscientização.", foto: "" },
    { nome: "Larissa Gomes", curso: "Direito", bio: "Advogada, assessoria jurídica em questões de patrimônio cultural.", foto: "" },
    { nome: "Matheus Barbosa", curso: "Geografia", bio: "Geógrafo, mapeamento de rotas históricas da resistência negra.", foto: "" },
    { nome: "Sofia Carvalho", curso: "Linguística", bio: "Linguista, estudo de dialetos e expressões afro-brasileiras.", foto: "" },
    { nome: "Vinícius Almeida", curso: "Engenharia Elétrica", bio: "Especialista em tecnologia, implementação de realidade virtual para museus digitais.", foto: "" },
    { nome: "Alice Nunes", curso: "Teatro", bio: "Atriz e diretora, produção de peças teatrais sobre figuras históricas negras.", foto: "" },
    { nome: "Bruno Mendes", curso: "Economia", bio: "Economista, análise do impacto econômico da escravidão e abolição.", foto: "" },
    { nome: "Carolina Rocha", curso: "Nutrição", bio: "Nutricionista, estudos sobre alimentação tradicional afro-brasileira.", foto: "" },
    { nome: "Eduardo Pinto", curso: "Física", bio: "Físico, aplicação de tecnologia em preservação de artefatos.", foto: "" },
    { nome: "Helena Vasconcelos", curso: "Filosofia", bio: "Filósofa, reflexões sobre ética e justiça racial.", foto: "" },
    { nome: "Igor Fernandes", curso: "Química", bio: "Químico, análise de materiais históricos para datação.", foto: "" },
    { nome: "Júlia Marques", curso: "Biologia", bio: "Bióloga, estudos genéticos sobre ancestralidade africana.", foto: "" },
    { nome: "Kleber Santos", curso: "Matemática", bio: "Matemático, modelagem estatística de dados demográficos históricos.", foto: "" },
    { nome: "Letícia Araújo", curso: "Enfermagem", bio: "Enfermeira, cuidados em comunidades afrodescendentes.", foto: "" },
    { nome: "Marcos Vinícius", curso: "Veterinária", bio: "Veterinário, preservação de fauna em contextos históricos.", foto: "" },
    { nome: "Natália Borges", curso: "Odontologia", bio: "Odontóloga, estudos antropológicos sobre saúde bucal ancestral.", foto: "" },
    { nome: "Otávio Lima", curso: "Farmácia", bio: "Farmacêutico, pesquisa de plantas medicinais afro-brasileiras.", foto: "" },
    { nome: "Patrícia Dias", curso: "Arquitetura", bio: "Arquiteta, design de espaços museológicos virtuais.", foto: "" },
    { nome: "Roberto Cardoso", curso: "Engenharia Mecânica", bio: "Engenheiro, construção de protótipos para exposições.", foto: "" },
    { nome: "Silvana Teixeira", curso: "Medicina", bio: "Médica, estudos sobre saúde pública em comunidades negras.", foto: "" },
    { nome: "Túlio Ferreira", curso: "Engenharia Ambiental", bio: "Ambientalista, preservação de ecossistemas históricos.", foto: "" },
    { nome: "Valéria Sousa", curso: "Psicopedagogia", bio: "Especialista em educação inclusiva para história negra.", foto: "" },
    { nome: "Wagner Lopes", curso: "Engenharia de Produção", bio: "Gestão de projetos de pesquisa e desenvolvimento.", foto: "" },
    { nome: "Yasmin Castro", curso: "Relações Internacionais", bio: "Especialista em diáspora africana e conexões globais.", foto: "" },
    { nome: "Zé Roberto", curso: "Agronomia", bio: "Agrônomo, estudos sobre agricultura tradicional africana no Brasil.", foto: "" },
];

// =============================================
// RENDERIZAR ALUNOS
// =============================================
const containerAlunos = document.getElementById('containerAlunos');
const inputBusca = document.getElementById('searchAlunos');

function renderizarAlunos(dados) {
    containerAlunos.innerHTML = "";
    dados.forEach((aluno, i) => {
        const card = document.createElement('div');
        card.className = "card-pro span-4";
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (i % 3) * 100);

        card.innerHTML = `
            <div class="card-content">
                <span class="card-tag">${aluno.curso}</span>
                <h3 style="font-size: 1.8rem;">${aluno.nome}</h3>
                <p style="font-size: 1.1rem;">${aluno.bio}</p>
            </div>
        `;

        if (aluno.foto) {
            card.style.backgroundImage = `url(${aluno.foto})`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
            card.classList.add('has-image');
        }

        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const modal = document.getElementById('modal');
            const modalPhoto = document.getElementById('modal-photo');
            if (aluno.foto) {
                modalPhoto.style.backgroundImage = `url(${aluno.foto})`;
                modalPhoto.style.display = 'block';
            } else {
                modalPhoto.style.display = 'none';
            }
            document.getElementById('modal-name').textContent = aluno.nome;
            document.getElementById('modal-course').textContent = aluno.curso;
            document.getElementById('modal-bio').textContent = aluno.bio;
            modal.style.display = 'block';
        });

        containerAlunos.appendChild(card);
    });
    AOS.refresh();
}

// =============================================
// MODAL — FECHAR
// =============================================
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});
window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// =============================================
// BUSCA DE ALUNOS
// =============================================
inputBusca.addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    const filtrados = listaAlunos.filter(aluno =>
        aluno.nome.toLowerCase().includes(termo) ||
        aluno.curso.toLowerCase().includes(termo)
    );
    renderizarAlunos(filtrados);
});

// =============================================
// TOGGLE EQUIPE
// =============================================
const toggleBtn = document.getElementById('toggleEquipe');
const conteudoEquipe = document.getElementById('conteudoEquipe');
const toggleIcon = toggleBtn ? toggleBtn.querySelector('.toggle-icon') : null;

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        const aberto = conteudoEquipe.style.display === 'block';
        conteudoEquipe.style.display = aberto ? 'none' : 'block';
        if (toggleIcon) toggleIcon.textContent = aberto ? '▼' : '▲';
    });
}

// =============================================
// SCROLL — HEADER + PARALLAX + NAV ATIVA
// =============================================
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

// =============================================
// RELÓGIO
// =============================================
function updateTopClock() {
    const now = new Date();
    const date = now.toLocaleDateString('pt-BR');
    const time =
        now.getHours().toString().padStart(2, '0') + ":" +
        now.getMinutes().toString().padStart(2, '0') + ":" +
        now.getSeconds().toString().padStart(2, '0');
    document.getElementById('live-date').innerText = date;
    document.getElementById('live-time').innerText = time;
}
setInterval(updateTopClock, 1000);
updateTopClock();

// =============================================
// WINDOW LOAD — preloader, AOS, particles, alunos
// =============================================
window.addEventListener('load', () => {
    // 1. Inicia AOS primeiro para as animações funcionarem nos cards
    AOS.init({ duration: 1000, once: false, mirror: true });

    // 2. Renderiza os cards depois do AOS estar pronto
    renderizarAlunos(listaAlunos);

    // 3. Preloader
    let progress = 0;
    const bar = document.getElementById('bar');
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('preloader').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('preloader').style.display = 'none';
                }, 600);
            }, 500);
        }
        bar.style.width = progress + '%';
    }, 200);

    // 4. Particles (dentro do load para garantir que o script já carregou)
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
});