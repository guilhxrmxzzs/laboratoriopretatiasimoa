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
// ==========================================
// CAÇA AOS ADESIVOS & SISTEMA DE PROGRESSÃO
// ==========================================

const BUCKET_URL = "https://hcebjldgynjivmktkkwf.supabase.co/storage/v1/object/public/adesivos";

// Os 12 níveis de progressão
const RANKS = [
    { nivel: 1, nome: "Explorador Iniciante", img: `${BUCKET_URL}/1.png`, desc: "Primeiro passo dado na investigação histórica!" },
    { nivel: 2, nome: "Explorador Intermediário", img: `${BUCKET_URL}/2.png`, desc: "Aprofundando os conhecimentos pelo site." },
    { nivel: 3, nome: "Explorador Avançado", img: `${BUCKET_URL}/3.png`, desc: "Dominando os caminhos da plataforma." },
    { nivel: 4, nome: "Pesquisador Iniciante", img: `${BUCKET_URL}/4.png`, desc: "Iniciando as buscas ativas." },
    { nivel: 5, nome: "Pesquisador Intermediário", img: `${BUCKET_URL}/5.png`, desc: "Conectando pistas e descobrindo a história." },
    { nivel: 6, nome: "Pesquisador Avançado", img: `${BUCKET_URL}/6.png`, desc: "Investigador atento aos detalhes." },
    { nivel: 7, nome: "Historiador Iniciante", img: `${BUCKET_URL}/7.png`, desc: "Compreendendo o legado." },
    { nivel: 8, nome: "Historiador Intermediário", img: `${BUCKET_URL}/8.png`, desc: "Valorizando a memória." },
    { nivel: 9, nome: "Historiador Avançado", img: `${BUCKET_URL}/9.png`, desc: "Guardião dos princípios fundamentais." },
    { nivel: 10, nome: "Curador da Memória Iniciante", img: `${BUCKET_URL}/10.png`, desc: "Preservando as memórias e conexões." }, 
    { nivel: 11, nome: "Curador da Memória Intermediário", img: `${BUCKET_URL}/11.png`, desc: "Consolidando a curadoria." },
    { nivel: 12, nome: "Viajante do Tempo", img: `${BUCKET_URL}/12.png`, desc: "Lendário! Mestre absoluto de toda a jornada." }
];

function getAcoesConcluidas() {
    return JSON.parse(localStorage.getItem('missoes_simoa') || '[]');
}

// Lógica do Mestre Final com tempo salvo no localStorage (não zera com F5)
const TEMPO_NECESSARIO = 5 * 60 * 1000; // 5 minutos

function getTempoInicio() {
    let inicio = localStorage.getItem('inicio_jornada_simoa');
    if (!inicio) {
        inicio = Date.now();
        localStorage.setItem('inicio_jornada_simoa', inicio);
    }
    return parseInt(inicio);
}

function verificarMestreFinal() {
    const concluidas = getAcoesConcluidas();
    const tempoDecorrido = Date.now() - getTempoInicio();
    const tempoMinimoAtingido = tempoDecorrido >= TEMPO_NECESSARIO;

    if (tempoMinimoAtingido && concluidas.length >= 11 && !concluidas.includes('mestre_final')) {
        concluidas.push('mestre_final');
        localStorage.setItem('missoes_simoa', JSON.stringify(concluidas));
        mostrarToastConquista(RANKS[11]);
        atualizarPainelInsignias();
    }
}

// Verifica o tempo periodicamente em segundo plano
setInterval(() => {
    verificarMestreFinal();
}, 5000);

function registrarMissao(idMissao) {
    const concluidas = getAcoesConcluidas();
    if (concluidas.includes(idMissao)) return;

    concluidas.push(idMissao);
    localStorage.setItem('missoes_simoa', JSON.stringify(concluidas));

    const rankAtual = RANKS[concluidas.length - 1];
    if (rankAtual) {
        mostrarToastConquista(rankAtual);
    }
    atualizarPainelInsignias();
    verificarMestreFinal();
}

// Criação e Atualização do Painel Flutuante e Modal de Zoom
function criarPainelInsignias() {
    if (document.getElementById('painelInsignias')) return;

    const painelDiv = document.createElement('div');
    painelDiv.id = 'painelInsignias';
    painelDiv.className = 'painel-insignias-container';

    painelDiv.innerHTML = `
        <button class="btn-abrir-painel" id="btnTogglePainel">
            <i class="fa-solid fa-medal"></i> Minhas Insígnias (<span id="contadorInsignias">0</span>/12)
        </button>
        <div class="modal-insignias" id="modalInsignias">
            <div class="modal-header-insignias">
                <h3>Sua Jornada</h3>
                <button class="btn-fechar-modal" id="btnFecharModal">&times;</button>
            </div>
            <div class="grid-insignias" id="gridInsigniasSlots">
                <!-- Preenchido via JavaScript -->
            </div>
        </div>
    `;

    document.body.appendChild(painelDiv);

    // Criação do Modal de Zoom (Inspeção individual)
    const zoomModal = document.createElement('div');
    zoomModal.id = 'zoomModalInsignia';
    zoomModal.className = 'insignia-zoom-modal';
    zoomModal.innerHTML = `
        <div class="insignia-zoom-conteudo" id="zoomConteudoBox">
            <img id="zoomImg" src="" alt="Insígnia">
            <h3 id="zoomTitulo">Título</h3>
            <div class="insignia-zoom-status" id="zoomStatus">Status</div>
            <p id="zoomDesc">Descrição da insígnia...</p>
            <button class="btn-fechar-zoom" id="btnFecharZoom">Fechar</button>
        </div>
    `;
    document.body.appendChild(zoomModal);

    const btnToggle = document.getElementById('btnTogglePainel');
    const modalInsignias = document.getElementById('modalInsignias');

    // Eventos de abrir/fechar estojo
    btnToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que o clique feche imediatamente pelo listener global
        modalInsignias.classList.toggle('ativo');
    });

    document.getElementById('btnFecharModal').addEventListener('click', () => {
        modalInsignias.classList.remove('ativo');
    });

    // Fecha automaticamente se clicar fora do painel de insígnias
    document.addEventListener('click', (e) => {
        if (modalInsignias.classList.contains('ativo')) {
            if (!painelDiv.contains(e.target)) {
                modalInsignias.classList.remove('ativo');
            }
        }
    });

    // Eventos de fechar o zoom
    document.getElementById('btnFecharZoom').addEventListener('click', () => {
        document.getElementById('zoomModalInsignia').classList.remove('ativo');
    });

    zoomModal.addEventListener('click', (e) => {
        if (e.target === zoomModal) zoomModal.classList.remove('ativo');
    });
}

function atualizarPainelInsignias() {
    const concluidas = getAcoesConcluidas();
    const qtd = concluidas.length;

    const painel = document.getElementById('painelInsignias');
    if (qtd > 0) {
        if (!painel) criarPainelInsignias();
        document.getElementById('painelInsignias').classList.add('visivel');
        const contador = document.getElementById('contadorInsignias');
        if (contador) contador.innerText = qtd;
    } else {
        if (painel) painel.classList.remove('visivel');
        return;
    }

    const grid = document.getElementById('gridInsigniasSlots');
    if (!grid) return;

    grid.innerHTML = '';

    RANKS.forEach((rank, index) => {
        const desbloqueada = index < qtd;
        const slot = document.createElement('div');
        slot.className = `insignia-slot ${desbloqueada ? 'desbloqueada' : 'bloqueada'}`;
        
        slot.innerHTML = `
            <img src="${rank.img}" alt="${rank.nome}" onerror="this.src='assets/images/logoProjeto.png'">
            <span>${rank.nome}</span>
        `;

        slot.addEventListener('click', () => {
            abrirZoomInsignia(rank, desbloqueada);
        });

        grid.appendChild(slot);
    });
}

function abrirZoomInsignia(rank, desbloqueada) {
    const modal = document.getElementById('zoomModalInsignia');
    const box = document.getElementById('zoomConteudoBox');
    const img = document.getElementById('zoomImg');
    const titulo = document.getElementById('zoomTitulo');
    const status = document.getElementById('zoomStatus');
    const desc = document.getElementById('zoomDesc');

    if (!modal) return;

    img.src = rank.img;
    titulo.innerText = rank.nome;
    
    if (desbloqueada) {
        box.className = "insignia-zoom-conteudo desbloqueada";
        status.innerText = "✓ Conquistada";
        desc.innerText = rank.desc;
    } else {
        box.className = "insignia-zoom-conteudo bloqueada";
        status.innerText = "🔒 Bloqueada";
        desc.innerText = "Continue explorando o site, interagindo com os elementos e encontrando os segredos para desbloquear este nível!";
    }

    modal.classList.add('ativo');
}

// Interface (Pop-up Toast)
function mostrarToastConquista(rank) {
    let toast = document.getElementById('adesivo-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'adesivo-toast';
        toast.className = 'adesivo-toast';
        document.body.appendChild(toast);
    }

    toast.innerHTML = `
        <img src="${rank.img}" alt="${rank.nome}" onerror="this.src='assets/images/logoProjeto.png'">
        <div class="adesivo-toast-info">
            <h4>Nível Alcançado!</h4>
            <p>${rank.nome}</p>
        </div>
    `;

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => toast.classList.remove('show'), 4000);
}

// --------------------------------------------------
// GATILHOS (TRIGGERS)
// --------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    
    atualizarPainelInsignias();
    verificarMestreFinal(); // Checa ao carregar a página também

    // 1. Botões
    const btnTiaSimoa = document.getElementById('btnTiaSimoa');
    if (btnTiaSimoa) btnTiaSimoa.addEventListener('click', () => registrarMissao('btn_tia_simoa'));

    const btnCoordenacao = document.getElementById('btnCoordenacao');
    if (btnCoordenacao) btnCoordenacao.addEventListener('click', () => registrarMissao('btn_coordenacao'));

    const btnInsta = document.getElementById('btnInsta');
    if (btnInsta) btnInsta.addEventListener('click', () => registrarMissao('btn_insta'));

    const btnAcervo = document.querySelector('.btn-acervo');
    if (btnAcervo) btnAcervo.addEventListener('click', () => registrarMissao('btn_acervo'));

    // 2. Clicar em 3 pilares
    let principiosClicados = new Set();
    document.querySelectorAll('.pilar-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            principiosClicados.add(index);
            if (principiosClicados.size >= 3) {
                registrarMissao('clicou_pilares');
            }
        });
    });

    // 3. Núcleo Discente
    let alunosClicados = new Set();
    const todosCardsAlunos = document.querySelectorAll('.card-aluno');
    
    todosCardsAlunos.forEach(card => {
        card.addEventListener('click', () => {
            const nome = card.getAttribute('data-aluno');
            
            if (nome === 'luis') registrarMissao('aluno_luis');
            if (nome === 'kaue') registrarMissao('aluno_kaue');
            if (nome === 'keirryson') registrarMissao('aluno_keirryson');
            if (nome === 'elanny') registrarMissao('aluno_elanny');

            alunosClicados.add(card);
            if (alunosClicados.size === todosCardsAlunos.length) {
                registrarMissao('alunos_todos');
            }
        });
    });

    // 4. Scroll até o fim
    let scrollDisparado = false;
    window.addEventListener('scroll', () => {
        if (scrollDisparado) return;
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            registrarMissao('scroll_final');
            scrollDisparado = true;
        }
    });
}); 