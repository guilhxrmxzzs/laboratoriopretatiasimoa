const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

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

// ==========================================================================
// CONFIGURAÇÃO E INTEGRAÇÃO COM O SUPABASE
// ==========================================================================
let companyData = []; 
let currentGallery = [];
let currentImageIndex = 0;

const SUPABASE_URL = "https://nfbmnxdekqdfcxuqzetk.supabase.co"; 
const SUPABASE_ANON_KEY = "sb_publishable_-TJLUtO4VHDUAoq7fLkbvA_sdy-5eBe";

// Função auxiliar para formatar a string de data (Ex: "210526" vira "21/05/26")
function formatarDataComBarras(dataBruta) {
    if (!dataBruta || dataBruta.length !== 6) return dataBruta;
    const dia = dataBruta.substring(0, 2);
    const mes = dataBruta.substring(2, 4);
    const ano = dataBruta.substring(4, 6);
    return `${dia}/${mes}/${ano}`;
}

// Buscar os dados direto da tabela LabHistoriaAcervo
async function carregarDadosDoBanco() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/LabHistoriaAcervo?select=*`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });

        if (!response.ok) throw new Error("Erro ao carregar dados do acervo.");

        const dadosDoBanco = await response.json();
        console.log("Dados brutos carregados do banco:", dadosDoBanco);
        
        companyData = dadosDoBanco
            .filter(item => {
                // FILTRO DE SEGURANÇA: Ignora dados de testes lixo (Como o teste "DAMLN")
                const titulo = item.nome || item.name;
                if (!titulo || titulo === "DAMLN" || titulo.includes("lnknafl")) return false;
                return true;
            })
            .map(item => {
                // Mapeamento dos campos baseado exatamente nas colunas em português do banco
                let listaMidias = [];
                if (item["mídia midiática"]) {
                    listaMidias = Array.isArray(item["mídia midiática"]) ? item["mídia midiática"] : JSON.parse(item["mídia midiática"] || "[]");
                } else if (item.media) {
                    listaMidias = Array.isArray(item.media) ? item.media : JSON.parse(item.media || "[]");
                }

                // CORREÇÃO DINÂMICA DE URLS COM ESPAÇO / TRAÇO
                listaMidias = listaMidias.map(url => {
                    if (typeof url === 'string') {
                        if (url.includes('letramento-racial')) {
                            return url.replace(/letramento-racial/g, 'Letramento%20Racial');
                        }
                    }
                    return url;
                });

                return {
                    name: item.nome || item.name || "Sem título",
                    description: item.description || item.descricao || "Sem descrição",
                    category: item.categoria || item.category || "Geral",
                    type: item["tipo tipo"] || item.type || 'gallery',
                    date: item.data || item.date || "",
                    media: listaMidias
                };
            });

        createFilterButtons();
        buildCompanyShowcase();

    } catch (error) {
        console.error("Erro na integração com o banco:", error);
    }
}

// Criar Botões de Filtro Baseados nas Categorias Existentes
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

// Filtrar os Registros no Ecrã
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

// Abrir Modal da Galeria de Imagens
function openGallery(images, startIndex = 0) {
    currentGallery = images;
    currentImageIndex = startIndex;
    showModalImage();
    document.getElementById('gallery-modal').style.display = 'flex';
}

// Exibir Imagem ou Vídeo no Modal Ativo
function showModalImage() {
    const modalImage = document.getElementById('modal-image');
    const modalVideo = document.getElementById('modal-video');
    const counter = document.getElementById('modal-counter');

    if (!currentGallery || currentGallery.length === 0) return;
    const currentItem = currentGallery[currentImageIndex];

    if (typeof currentItem === 'string' && (currentItem.endsWith('.mp4') || currentItem.includes('video'))) {
        modalImage.style.display = 'none';
        modalVideo.style.display = 'flex';
        modalVideo.src = currentItem;
        modalVideo.load();
        modalVideo.play();
        counter.textContent = 'Vídeo';
    } else {
        modalImage.style.display = 'flex';
        modalVideo.style.display = 'none';
        if(modalVideo.pause) modalVideo.pause();
        modalImage.src = currentItem;
        counter.textContent = `${currentImageIndex + 1} / ${currentGallery.length}`;
    }
}

// Navegar pelas fotos na Galeria Expandida
function navigateGallery(direction) {
    if (direction === 'next') {
        currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
    } else {
        currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
    }
    showModalImage();
}

// Renderizar os Cards Dinamicamente na Página
function buildCompanyShowcase() {
    const companyContainer = document.getElementById('company-container');
    if (!companyContainer) return;
    
    companyContainer.innerHTML = '';

    if (companyData.length === 0) {
        companyContainer.innerHTML = `<div class="no-media-placeholder" style="grid-column: 1/-1; padding: 40px;">Nenhum evento registrado encontrado no acervo.</div>`;
        return;
    }

    companyData.forEach((record, index) => {
        const companyElement = document.createElement('div');
        companyElement.className = 'company-card';
        companyElement.setAttribute('data-category', record.category);
        companyElement.setAttribute('data-index', index);

        let mediaContent = '';
        const primeiraMidia = record.media && record.media[0];
        const ehVideo = record.type === 'video' || (typeof primeiraMidia === 'string' && primeiraMidia.endsWith('.mp4'));

        if (ehVideo) {
            // Layout corrigido com overlay e preview funcional para o vídeo
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

        // Aplicação das barras na data visual
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

// Inicializar Ouvintes de Eventos dos Modais
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('gallery-modal');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            modal.style.display = 'none';
            document.getElementById('modal-video').pause();
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
            document.getElementById('modal-video').pause();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (modal && modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') navigateGallery('prev');
            if (e.key === 'ArrowRight') navigateGallery('next');
            if (e.key === 'Escape') {
                modal.style.display = 'none';
                document.getElementById('modal-video').pause();
            }
        }
    });

    carregarDadosDoBanco();
});