// --- NAVEGAÇÃO E HEADER ---
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 100) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });

    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
    });
});

// --- VARIÁVEIS GLOBAIS ---
let companyData = []; 
let currentGallery = [];
let currentImageIndex = 0;

// Credenciais ativas do Supabase
const SUPABASE_URL = "https://hcebjldgynjivmktkkwf.supabase.co"; 
const SUPABASE_ANON_KEY = "sb_publishable_30HxPG9n5fu-xGag_qoA3A_DsRGgF6z";
const NOME_TABELA = "acervo";

// Função para formatar datas (YYYY-MM-DD -> DD/MM/YYYY)
function formatarDataComBarras(dataBruta) {
    if (!dataBruta) return '';
    
    // Formato de input do formulário (2023-10-15)
    if (dataBruta.includes('-')) {
        const [ano, mes, dia] = dataBruta.split('-');
        return `${dia}/${mes}/${ano}`;
    }
    
    // Formato legado de 6 dígitos (DDMMYY)
    if (dataBruta.length === 6) {
        const dia = dataBruta.substring(0, 2);
        const mes = dataBruta.substring(2, 4);
        const ano = dataBruta.substring(4, 6);
        return `${dia}/${mes}/${ano}`;
    }

    return dataBruta;
}

// --- BUSCA DE DADOS NO SUPABASE ---
async function carregarDadosDoBanco() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/${NOME_TABELA}?select=*&order=data_acao.desc`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        const dadosDoBanco = await response.json();
        
        companyData = dadosDoBanco.map(item => {
            let listaMidias = [];

            // Suporta o novo campo 'arquivos' e retrocompatibilidade
            const midiaBruta = item.arquivos || item["mídia midiática"] || item.media;

            if (midiaBruta) {
                listaMidias = Array.isArray(midiaBruta) ? midiaBruta : JSON.parse(midiaBruta || "[]");
            }

            return {
                name: item.titulo || item.nome || item.name || "Sem título",
                description: item.descricao || item.description || "Sem descrição",
                category: item.categoria || item.category || "Geral",
                type: item.tipo || item.type || 'gallery',
                date: item.data_acao || item.data || item.date || "",
                media: listaMidias
            };
        });

        createFilterButtons();
        buildCompanyShowcase();

    } catch (error) {
        console.error("Erro na integração com o banco:", error);
    }
}

// --- CRIAÇÃO DOS BOTÕES DE FILTRO ---
function createFilterButtons() {
    const filterContainer = document.getElementById('filter-buttons');
    if (!filterContainer) return;

    const categories = ['Todos', ...new Set(companyData.map(item => item.category))];

    filterContainer.innerHTML = '';
    categories.forEach(category => {
        if(!category) return;
        const button = document.createElement('button');
        button.className = `filter-btn ${category === 'Todos' ? 'active' : ''}`;
        button.textContent = category;
        button.setAttribute('data-category', category);
        button.addEventListener('click', function () {
            filterRecords(this.getAttribute('data-category'));
        });
        filterContainer.appendChild(button);
    });
}

function filterRecords(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });

    document.querySelectorAll('.company-card').forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'Todos' || cardCategory === category) {
            card.style.display = "flex"; 
        } else {
            card.style.display = "none";
        }
    });
}

// --- MODAL DE GALERIA ---
function openGallery(images, startIndex = 0) {
    currentGallery = images;
    currentImageIndex = startIndex;
    showModalImage();
    const modal = document.getElementById('gallery-modal');
    if (modal) modal.style.display = 'flex';
}

function showModalImage() {
    const modalImage = document.getElementById('modal-image');
    const modalVideo = document.getElementById('modal-video');
    const counter = document.getElementById('modal-counter');

    if (!currentGallery || currentGallery.length === 0) return;
    const currentItem = currentGallery[currentImageIndex];

    const ehVideo = typeof currentItem === 'string' && 
        (currentItem.endsWith('.mp4') || currentItem.endsWith('.webm') || currentItem.includes('video'));

    if (ehVideo) {
        modalImage.style.display = 'none';
        modalVideo.style.display = 'flex';
        modalVideo.src = currentItem;
        modalVideo.load();
        modalVideo.play();
        counter.textContent = `Vídeo ${currentImageIndex + 1} / ${currentGallery.length}`;
    } else {
        modalImage.style.display = 'flex';
        modalVideo.style.display = 'none';
        if (modalVideo.pause) modalVideo.pause();
        modalImage.src = currentItem;
        counter.textContent = `${currentImageIndex + 1} / ${currentGallery.length}`;
    }
}

function navigateGallery(direction) {
    if (direction === 'next') {
        currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
    } else {
        currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
    }
    showModalImage();
}

// --- RENDERIZAÇÃO DOS CARDS NO GRID ---
function buildCompanyShowcase() {
    const companyContainer = document.getElementById('company-container');
    if (!companyContainer) return;
    
    companyContainer.innerHTML = '';

    if (companyData.length === 0) {
        companyContainer.innerHTML = `<div class="no-media-placeholder" style="grid-column: 1/-1; padding: 40px; text-align: center;">Nenhum evento registrado no acervo.</div>`;
        return;
    }

    companyData.forEach((record, index) => {
        const companyElement = document.createElement('div');
        companyElement.className = 'company-card';
        companyElement.setAttribute('data-category', record.category);
        companyElement.setAttribute('data-index', index);

        let mediaContent = '';
        const primeiraMidia = record.media && record.media[0];
        const ehVideo = record.type === 'video' || 
            (typeof primeiraMidia === 'string' && (primeiraMidia.endsWith('.mp4') || primeiraMidia.endsWith('.webm')));

        if (ehVideo) {
            mediaContent = `
                <div class="video-preview-wrapper" style="position: relative; width: 100%; height: 100%; min-height: 200px; background: #000;">
                    <video src="${primeiraMidia}" class="record-video" preload="metadata" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px; display: block;"></video>
                    <div class="video-play-overlay" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(197, 160, 89, 0.8); color: #000; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; pointer-events: none; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">▶</div>
                </div>
            `;
        } else if (record.media && record.media.length > 0) {
            mediaContent = `<div class="record-gallery">`;
            record.media.slice(0, 3).forEach(item => {
                mediaContent += `<img src="${item}" alt="Mídia do Acervo" class="gallery-image" onerror="this.src='https://placehold.co/300x200/141414/c5a059?text=Mídia'">`;
            });
            if (record.media.length > 3) {
                mediaContent += `<div class="gallery-counter">+${record.media.length - 3}</div>`;
            }
            mediaContent += `</div>`;
        } else {
            mediaContent = `<div class="no-media-placeholder">📁 Sem Mídias</div>`;
        }

        const dataFormatada = formatarDataComBarras(record.date);

        companyElement.innerHTML = `
            <div class="media-container">
                ${mediaContent}
            </div>
            <div class="content-container">
                <div class="category-tag">${record.category}</div>
                <h1 class="company-title">${record.name}</h1>
                <p class="company-info">${record.description}</p>
                <span class="date-tag"><i class="fa-regular fa-calendar"></i> ${dataFormatada}</span>
            </div>
        `;

        companyElement.addEventListener('click', function () {
            const idx = parseInt(this.getAttribute('data-index'));
            const recordData = companyData[idx];

            if (recordData.media && recordData.media.length > 0) {
                openGallery(recordData.media, 0);
            }
        });

        companyContainer.appendChild(companyElement);
    });
}

// --- EVENTOS INICIAIS ---
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('gallery-modal');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            if (modal) modal.style.display = 'none';
            const vid = document.getElementById('modal-video');
            if (vid) vid.pause();
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            navigateGallery('prev');
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            navigateGallery('next');
        });
    }

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            const vid = document.getElementById('modal-video');
            if (vid) vid.pause();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (modal && modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') navigateGallery('prev');
            if (e.key === 'ArrowRight') navigateGallery('next');
            if (e.key === 'Escape') {
                modal.style.display = 'none';
                const vid = document.getElementById('modal-video');
                if (vid) vid.pause();
            }
        }
    });

    carregarDadosDoBanco();
});