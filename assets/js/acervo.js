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

document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            // Altera o ícone de hambúrguer para um 'X' quando aberto
            if (nav.classList.contains('active')) {
                menuToggle.textContent = '✕';
            } else {
                menuToggle.textContent = '☰';
            }
        });
    }
});


       const companyData = [
            {
                name: "Ceará Cientifíco 2025 - Fase Regional ",
                type: "gallery",
                category: "Evento",
                media: [
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536764/C%C3%B3pia_de_20251009_170025_ifraz1.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536775/C%C3%B3pia_de_20251009_160332_xnqkyb.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536772/C%C3%B3pia_de_20251009_171112_b2god4.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536768/C%C3%B3pia_de_20251009_085341_ud3klg.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536761/C%C3%B3pia_de_20251009_150706_hbgl8c.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536758/C%C3%B3pia_de_20251009_155823_mfv7w2.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536751/C%C3%B3pia_de_20251009_163230_x027em.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536749/C%C3%B3pia_de_20251009_163437_noby00.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536756/C%C3%B3pia_de_20251009_165542_jnkzd6.jpg"
],
                description: "Nossa participação no Ceará Cientifico - Fase Regional Crede 7 no IFCE de Canide, onde Levamos o 1º Lugar na Pesquisa Junior na Area de Ciencias da Natureza"
            },
            {
                name: "1º Visita ao Laboratorio de Quimica da EEEP Deputado Roberto Mesquita",
                type: "image",
                category: "Visita",
                media: "https://res.cloudinary.com/drphhzupu/image/upload/v1760536809/drmaula_kgpug9.jpg",
                description: "Registro fotográfico da Nossa Primeira Visita a EEEP Deputado Roberto Mesquita para Aprender a produção de sabão ecologico."
            },
            {
                name: "2º Visita ao Laboratorio de Quimica Da EEEP Deputado Roberto Mesquita",
                type: "gallery",
                category: "Visita",
                media: [
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536825/C%C3%B3pia_de_IMG-20250917-WA0088_i2obv3.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536827/C%C3%B3pia_de_IMG-20250917-WA0122_gl6dvf.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536819/C%C3%B3pia_de_IMG-20250917-WA0087_efovc5.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536811/C%C3%B3pia_de_IMG-20250917-WA0104_rfahk6.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536814/C%C3%B3pia_de_IMG-20250917-WA0106_ntnbxb.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536822/C%C3%B3pia_de_IMG-20250917-WA0118_gp41t2.jpg"
],
                description: "Retorno a EEEP Deputado Roberto Mesquita Para aperfeiçoamento da tecnica de Produção de sabão Ecologico" 
            },
            {
                name: "Primeira Oficina do Sabão Ecologico na EMEF Santa Lucia",
                type: "video",
                category: "Oficina",
                media: "https://res.cloudinary.com/drphhzupu/video/upload/v1760536831/VID-20250919-WA0081_b9ozaf.mp4",
                description: "Relalizamos nossa Primeira Oficina de sabão Eco na Escola de Zona Rural EMEF Santa Lucia na comunidade Pinda que se localiza a 23km da sede do municipio."
            },
            {
                name: "Palestra sobre Consumo Consciente na EMEF Maria Arinda Lobo de Mesquita",
                type: "gallery",
                category: "Palestra",
                media: [
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536809/arindaPalestra_3_kg8xpm.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536803/arindaPalestra_2_tscgyz.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536801/arindaPalestra_1_myxraz.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536797/arindaPalestra_4_juobhj.jpg"
],
                description: "Palestra sobre consumo consciente na turma de 5º e dinamica do torta na cara com perguntas sobre o assunto tratado no dia."
            },
            {
                name: "Oficina de Sabão Ecologico na EMEF Messias Delfino",
                type: "gallery",
                category: "Oficina",
                media: [
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536859/C%C3%B3pia_de_20250924_125137_ldqpuu.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536850/C%C3%B3pia_de_20250924_124007_u7yfrq.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536848/C%C3%B3pia_de_20250924_142216_bf9le8.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536842/C%C3%B3pia_de_20250924_125706_m3wx1r.jpg"
],
                description: "Relalizamos nossa Primeira Oficina de sabão Eco na Escola de Zona Rural EMEF Messias Delfino na comunidade São João."
            },
            {
                name: "Oficina de Sabão Ecologico na EMEF Paschoal de Almeida",
                type: "gallery",
                category: "Oficina",
               media: [
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536839/C%C3%B3pia_de_20250924_104413_nljrdl.jpg",
    "https://res.cloudinary.com/drphhzupu/video/upload/v1760536839/C%C3%B3pia_de_20250924_103359_zydsl4.mp4",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536833/C%C3%B3pia_de_20250924_092335_tlowaw.jpg"
],
                description: "Relalizamos nossa Primeira Oficina de sabão Eco na Escola de Zona Rural EMEF Paschoal de Almeida na Comunidade Cangati"
            },
            {
                name: "Visita ao Viveiro Regional do Vale do Curu sediado em General Sampaio",
                type: "gallery",
                category: "Visita",
               media: [
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536789/viveiro_1_carkz9.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536790/viveiro_2_zsgllm.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536795/viveiro_3_vfoxmw.jpg"
],
                description: "O viveiro esta localizado na comunidade de cajazeiras e é mantido e administrado pela PMGS, tendo como objetvo produzir mudas nativas e frutiferas e fornecer gratuitamente a população para projetos de reflorestamento e fruticultura, recuperação de mata ciliar, recomposição de reserva legal, arborização urbana e educação ambiental."
            },
              {
                name: "Horta Escolar da EMEF José Bezerra Filho",
                type: "gallery",
                category: "Horta",
              media: [
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536866/1760536142911_jjpzpe.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536869/1760536142833_ckmdnl.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536871/1760536142745_zfvlb5.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536875/1760536142659_i0uwr0.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536878/1760536142579_nsydaq.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536880/1760536142511_yzgz7h.jpg"
],
                description: "Plantio na Horta escolar da EMEF José Bezerra Filho com Alunos das Turmas de 8º Ano"
            },
                 {
                name: "Reunião com o Secretario e Equipe da SEDAMA de General Sampaio",
                type: "gallery",
                category: "Reuniões",
              media: [
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536725/C%C3%B3pia_de_20250930_165049_dqqfiz.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536728/C%C3%B3pia_de_20250930_153918_zxy90x.jpg"
],
                description: "Reunião para alinhamento de ideias e metas junto da equipe da Secretaria de Desenvolvimento Agrario, Pesca e Meio Ambiente."
            },
                 {
                name: "Reunião com a Equipe da Secretaria Municipal de Educação",
                type: "gallery",
                category: "Reuniões",
            media: [
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536742/C%C3%B3pia_de_20251013_174336_rbpduo.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536736/C%C3%B3pia_de_20251013_165549_zimzo5.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536734/C%C3%B3pia_de_20251013_174348_lilycn.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760536744/C%C3%B3pia_de_20251013_180530_zioo2v.jpg"
],
                description: "Reunião para alinhamento de ideias e metas junto da equipe da SME de General Sampaio para alinhamento de metas e objetivos do projeto para fase estadual e posteriomente a ela."
            },
         {
                name: "Oficina de Reaproveitamento de Restos de Alimentos",
                type: "gallery",
                category: "Oficina",
            media: [
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760549388/1760548869305_q7ankk.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760549524/1760548785170_lh5wl8.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760549377/1760548913917_xjmfad.jpg",
    "https://res.cloudinary.com/drphhzupu/image/upload/v1760549383/1760548899025_mpejdn.jpg"
],
                description: "Oficina De Reaproveitamento de Restos de Alimentos com as mães de estudantes da EMEF José Bezerra Filho."
            },
         {
                name: "Oficina de Sabão Ecologico na EMEF Raimundo Lessa dos Santos ",
                type: "gallery",
                category: "Oficina",
          media: [
  "https://res.cloudinary.com/drphhzupu/image/upload/v1760536861/Cópia_de_IMG-20250930-WA0144_rrunf7.jpg",
  "https://res.cloudinary.com/drphhzupu/image/upload/v1760536856/Cópia_de_IMG-20250930-WA0127_rdkgun.jpg",
  "https://res.cloudinary.com/drphhzupu/image/upload/v1760536853/Cópia_de_IMG-20250930-WA0122_unf9a2.jpg",
  "https://res.cloudinary.com/drphhzupu/image/upload/v1760536859/Cópia_de_IMG-20250930-WA0156_ycq5oj.jpg"
],
                description: "Relalizamos nossa Primeira Oficina de sabão Eco na Escola de Zona Rural EMEF Raimundo Lessa dos Santos."
            },
         {
                name: "Oficina Reaproveita+: EEMTI EDITE ALCANTÂRA MOTA - General Sampaio, CE",
                type: "gallery",
                category: "Oficina",
          media: [
  "https://res.cloudinary.com/drphhzupu/image/upload/v1764696138/WhatsApp_Image_2025-12-02_at_14.19.30_pepwqk.jpg",
  "https://res.cloudinary.com/drphhzupu/image/upload/v1764696138/WhatsApp_Image_2025-12-02_at_14.19.30_1_h7l8mb.jpg",
  "https://res.cloudinary.com/drphhzupu/image/upload/v1764696138/WhatsApp_Image_2025-12-02_at_14.19.27_whvfon.jpg",
  "https://res.cloudinary.com/drphhzupu/image/upload/v1764696138/WhatsApp_Image_2025-12-02_at_14.19.28_eklk57.jpg"
],
                description: "No dia 30 de outubro, a equipe do Sustenta+: Pequenas Ações, Grandes Mudanças realizou uma oficina prática de reaproveitamento de alimentos na Escola de Ensino Médio em Tempo Integral Edith Alcântara Mota, envolvendo um grupo de alunos da instituição."
            },
         {
                name: "Identificação nas Arvores do Complexo Turistico Bica",
                type: "gallery",
                category: "Ação",
          media: [
  "https://res.cloudinary.com/drphhzupu/image/upload/v1764696567/WhatsApp_Image_2025-12-02_at_14.18.18_1_lmcoav.jpg",
  "https://res.cloudinary.com/drphhzupu/image/upload/v1764696568/WhatsApp_Image_2025-12-02_at_14.18.18_cnzwyw.jpg",
  "https://res.cloudinary.com/drphhzupu/image/upload/v1764696567/WhatsApp_Image_2025-12-02_at_14.18.18_2_elxxlr.jpg",
  "https://res.cloudinary.com/drphhzupu/image/upload/v1764696567/WhatsApp_Image_2025-12-02_at_14.18.17_s7zl2v.jpg"
],
                description: "No dia 20 de novembro de 2025, realizamos a instalação das identificações nas árvores do Complexo Turístico da Bica, dando continuidade ao trabalho iniciado em parceria com a SEDAMA, o programa AJA e a Secretaria de Educação. As placas foram desenvolvidas pelo Sustenta+ e incluem informações essenciais sobre cada espécie — como nome comum, nome científico e características gerais — além de um QR Code, que direciona o visitante para o site criado especialmente para o projeto, onde é possível acessar descrições detalhadas e conteúdos educativos sobre a flora local. "
            },
         {
                name: "Oficina Reaproveita+ na EMEIF Santa Lucia, Comunidade Pinda - General Sampaio CE",
                type: "gallery",
                category: "Oficina",
          media: [
  "https://res.cloudinary.com/drphhzupu/image/upload/v1764697389/20251104_080820_wui3ti.jpg",
  "https://res.cloudinary.com/drphhzupu/image/upload/v1764697391/20251104_082834_i8cbux.jpg",
  "https://res.cloudinary.com/drphhzupu/image/upload/v1764697390/20251104_082803_k2x7xf.jpg",
  "https://res.cloudinary.com/drphhzupu/image/upload/v1764697414/IMG_1360_navjil.jpg"
],
                description: "No dia 04 de novembro de 2025, o projeto Sustenta+: Pequenas Ações, Grandes Mudanças realizou mais uma edição da oficina Reaproveita+ na EMEF Santa Lúcia, localizada na Comunidade Pinda, zona rural de General Sampaio. A oficina teve o mesmo formato da vivência realizada na escola de ensino médio, apresentando aos estudantes técnicas de aproveitamento integral de alimentos, com foco em práticas simples, econômicas e sustentáveis, capazes de transformar o cotidiano das famílias da comunidade."
            }
            ,
         {
                name: "Treinamento para as Oficinas do Oficina Reaproveita+",
                type: "gallery",
                category: "Ação",
          media: [
  "https://res.cloudinary.com/drphhzupu/image/upload/v1764698037/20251024_141431_bcdvn9.jpg",
  "https://res.cloudinary.com/drphhzupu/image/upload/v1764697984/20251024_140919_upyxgc.jpg",
  "https://res.cloudinary.com/drphhzupu/image/upload/v1764697978/20251024_100623_xg8xex.jpg",
  "https://res.cloudinary.com/drphhzupu/image/upload/v1764697977/20251024_095454_qhbddd.jpg",
  "https://res.cloudinary.com/drphhzupu/image/upload/v1764698261/20251024_102636_vnky7i.jpg",
  "https://res.cloudinary.com/drphhzupu/image/upload/v1764698427/20251024_095912_hq8dnh.jpg",
  "https://res.cloudinary.com/drphhzupu/image/upload/v1764698419/20251024_095809_nxpjoh.jpg"

],
                description: "Foi realizado a preparação para as oficinas Reaproveita+ nas escolas de zona rural com a Coorientadora Lioiza Freitas com os alunos da equipe Sustenta+. No final o que foi preparado foi entregue a dois dos nossos parceiros a Secretaria Municipal de Educação e Secretaria de Desenvolvimento Agrario, Pesca e Meio Ambiente"
            },
         {
                name: "Acolhida e Comemoração Apos A vitoria da Etapa Regional do Ceara Cientifico 2025",
                type: "gallery",
                category: "Ação",
          media: [
  "https://res.cloudinary.com/drphhzupu/video/upload/v1764698739/20251013_093505_hthsbd.mp4",
  "https://res.cloudinary.com/drphhzupu/image/upload/v1764698732/20251013_100459_sktqqf.jpg"    

],
                description: "Foi realizado a preparação para as oficinas Reaproveita+ nas escolas de zona rural com a Coorientadora Lioiza Freitas com os alunos da equipe Sustenta+. No final o que foi preparado foi entregue a dois dos nossos parceiros a Secretaria Municipal de Educação e Secretaria de Desenvolvimento Agrario, Pesca e Meio Ambiente"
            }
            
        ];
        
let currentGallery = [];
let currentImageIndex = 0;
let activeFilter = 'Todos';

// Create Filter Buttons
function createFilterButtons() {
    const filterContainer = document.getElementById('filter-buttons');
    const categories = ['Todos', ...new Set(companyData.map(item => item.category))];

    filterContainer.innerHTML = '';
    categories.forEach(category => {
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

// Filter Records
function filterRecords(category) {
    activeFilter = category;

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === category) {
            btn.classList.add('active');
        }
    });

    document.querySelectorAll('.company-card').forEach((card, index) => {
        const record = companyData[index];
        if (category === 'Todos' || record.category === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Open Gallery Modal
function openGallery(images, startIndex = 0) {
    currentGallery = images;
    currentImageIndex = startIndex;
    showModalImage();
    document.getElementById('gallery-modal').style.display = 'flex';
}

// Open Video Modal
function openVideo(videoSrc) {
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalVideo = document.getElementById('modal-video');
    const counter = document.getElementById('modal-counter');

    modalImage.style.display = 'none';
    modalVideo.style.display = 'flex';
    modalVideo.src = videoSrc;
    counter.textContent = 'Vídeo';

    document.querySelector('.prev').style.display = 'flex';
    document.querySelector('.next').style.display = 'flex';

    modal.style.display = 'flex';
}

// Show Modal Image or Video
function showModalImage() {
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalVideo = document.getElementById('modal-video');
    const counter = document.getElementById('modal-counter');

    const currentItem = currentGallery[currentImageIndex];

    if (currentItem.endsWith('.mp4')) {
        modalImage.style.display = 'none';
        modalVideo.style.display = 'flex';
        modalVideo.src = currentItem;
        modalVideo.load();
        modalVideo.play();
        counter.textContent = 'Vídeo';
    } else {
        modalImage.style.display = 'flex';
        modalVideo.style.display = 'none';
        modalVideo.pause();
        modalImage.src = currentItem;
        counter.textContent = `${currentImageIndex + 1} / ${currentGallery.length}`;
    }

    document.querySelector('.prev').style.display = 'flex';
    document.querySelector('.next').style.display = 'flex';

    modal.style.display = 'flex';
}

// Navigate Gallery
function navigateGallery(direction) {
    if (direction === 'next') {
        currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
    } else {
        currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
    }
    showModalImage();
}

// Build Company Showcase
function buildCompanyShowcase() {
    const companyContainer = document.getElementById('company-container');
    companyContainer.innerHTML = '';

    companyData.forEach((record, index) => {
        const companyElement = document.createElement('div');
        companyElement.className = 'company-card';
        companyElement.style.animationDelay = `${index * 0.1}s`;

        let mediaContent = '';

        if (record.type === 'video') {
            mediaContent = `<video src="${record.media}" class="record-video" controls preload="none"></video>`;
        } else if (record.type === 'gallery') {
            mediaContent = `<div class="record-gallery">`;
            record.media.slice(0, 3).forEach(item => {
                if (item.endsWith('.mp4')) {
                    mediaContent += `<div class="video-thumb"><span>🎬</span></div>`;
                } else {
                    mediaContent += `<img src="${item}" alt="Galeria" class="gallery-image">`;
                }
            });
            if (record.media.length > 3) {
                mediaContent += `<div class="gallery-counter">+${record.media.length - 3}</div>`;
            }
            mediaContent += `</div>`;
        } else if (record.type === 'image') {
            mediaContent = `<img src="${record.media}" alt="${record.name}" class="company-logo">`;
        }

        companyElement.innerHTML = `
            <div class="media-container">
                ${mediaContent}
            </div>
            <div class="content-container">
                <div class="category-tag">${record.category}</div>
                <h1 class="company-title">${record.name}</h1>
                <p class="company-info">${record.description}</p>
            </div>
        `;

        companyElement.setAttribute('data-type', record.type);
        companyElement.setAttribute('data-index', index);

        companyElement.addEventListener('click', function (e) {
            const type = this.getAttribute('data-type');
            const idx = parseInt(this.getAttribute('data-index'));
            const recordData = companyData[idx];

            if (type === 'gallery') {
                openGallery(recordData.media, 0);
            } else if (type === 'image') {
                openGallery([recordData.media], 0);
            } else if (type === 'video') {
                if (!e.target.closest('video')) {
                    openVideo(recordData.media);
                }
            }
        });

        companyContainer.appendChild(companyElement);
    });
}

// Modal Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('gallery-modal');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        document.getElementById('modal-video').pause();
    });
    prevBtn.addEventListener('click', function () {
        navigateGallery('prev');
    });
    nextBtn.addEventListener('click', function () {
        navigateGallery('next');
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.getElementById('modal-video').pause();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') navigateGallery('prev');
            if (e.key === 'ArrowRight') navigateGallery('next');
            if (e.key === 'Escape') {
                modal.style.display = 'none';
                document.getElementById('modal-video').pause();
            }
        }
    });

    createFilterButtons();
    buildCompanyShowcase();
});