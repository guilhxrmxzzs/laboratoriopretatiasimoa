// ==========================================================================
// CONFIGURAÇÃO DO SUPABASE
// ==========================================================================
const SUPABASE_URL = "https://nfbmnxdekqdfcxuqzetk.supabase.co"; 
const SUPABASE_ANON_KEY = "sb_publishable_-TJLUtO4VHDUAoq7fLkbvA_sdy-5eBe";

// Elementos da Interface
const selectCategoria = document.getElementById('categoria');
const inputNovaCategoria = document.getElementById('nova-categoria');

// 1. FUNÇÃO PARA BUSCAR AS PASTAS REAIS DIRETO DO STORAGE
async function carregarCategoriasExistentes() {
    try {
        // Faz uma requisição para listar o conteúdo da raiz do bucket "Acervo"
        const response = await fetch(`${SUPABASE_URL}/storage/v1/object/list/Acervo`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prefix: "",
                sortBy: { column: "name", order: "asc" }
            })
        });

        if (!response.ok) throw new Error("Falha ao buscar pastas do Storage.");

        const objetos = await response.json();
        
        // Filtra apenas o que for pasta (geralmente objetos sem id ou metadados de arquivo, ou checando se não têm extensão)
        // No Supabase Storage API, pastas vêm listadas como objetos de metadados específicos ou criadas implicitamente.
        // Vamos pegar os nomes únicos de "pastas" simuladas pelos caminhos existentes.
        const pastasUnicas = objetos
            .map(item => item.name)
            .filter(name => name && !name.includes('.')); // Remove arquivos com extensão (ex: .png, .jpg)

        // Limpa o select e adiciona a opção padrão
        selectCategoria.innerHTML = '<option value="" disabled selected>Selecione uma categoria (Pasta)</option>';

        // Adiciona as pastas encontradas como opções
        pastasUnicas.forEach(pasta => {
            const option = document.createElement('option');
            // O valor e o texto serão o próprio nome da pasta do storage (ex: letramento-racial)
            option.value = pasta;
            option.textContent = pasta;
            selectCategoria.appendChild(option);
        });

        // Adiciona SEMPRE a opção "Outra..." no final de tudo
        const optionOutra = document.createElement('option');
        optionOutra.value = "OUTRA";
        optionOutra.textContent = "Outra... (Criar nova pasta/categoria)";
        selectCategoria.appendChild(optionOutra);

    } catch (error) {
        console.error("Erro ao listar pastas do Storage:", error);
        // Fallback usando o banco de dados caso a listagem do Storage falhe por falta de permissão
        fallbackComBanco();
    }
}

// Fallback caso a política de listagem do Storage esteja restrita
async function fallbackComBanco() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/LabHistoriaAcervo?select=category`, {
            method: 'GET',
            headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
        });
        if (!response.ok) throw new Error();
        const dados = await response.json();
        const categoriasUnicas = [...new Set(dados.map(item => item.category))].filter(Boolean);
        
        selectCategoria.innerHTML = '<option value="" disabled selected>Selecione uma categoria</option>';
        categoriasUnicas.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            selectCategoria.appendChild(option);
        });
        const optionOutra = document.createElement('option');
        optionOutra.value = "OUTRA";
        optionOutra.textContent = "Outra... (Criar nova categoria)";
        selectCategoria.appendChild(optionOutra);
    } catch (e) {
        selectCategoria.innerHTML = `
            <option value="" disabled selected>Selecione uma categoria</option>
            <option value="OUTRA">Outra... (Criar nova categoria)</option>
        `;
    }
}

// 2. MONITORAR MUDANÇA NO SELECT PARA MOSTRAR/OCULTAR O CAMPO DE TEXTO
selectCategoria.addEventListener('change', function() {
    if (this.value === "OUTRA") {
        inputNovaCategoria.style.display = "block";
        inputNovaCategoria.required = true;
        inputNovaCategoria.focus();
    } else {
        inputNovaCategoria.style.display = "none";
        inputNovaCategoria.required = false;
        inputNovaCategoria.value = ""; 
    }
});

// 3. EVENTO DE SUBMIT DO FORMULÁRIO
document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const statusDiv = document.getElementById('status-mensagem');
    statusDiv.textContent = "A processar o envio dos ficheiros... Por favor, aguarde.";
    statusDiv.className = "status-loading";

    // Obter valores do formulário
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const dataInput = document.getElementById('data').value; 
    const arquivosSelecionados = document.getElementById('arquivo').files;

    let categoriaBruta = selectCategoria.value;
    let pastaCategoriaStorage = "";

    if (categoriaBruta === "OUTRA") {
        const valorDigitado = inputNovaCategoria.value.trim();
        categoriaBruta = valorDigitado;
        // Se for nova, limpa o texto para virar nome de pasta válido (Letramento Racial -> letramento-racial)
        pastaCategoriaStorage = valorDigitado.toLowerCase().replace(/[^a-z0-9]/g, '-');
    } else {
        // Se já existia, o próprio valor do select já é o nome correto da pasta
        pastaCategoriaStorage = categoriaBruta;
    }

    if (!pastaCategoriaStorage) {
        statusDiv.textContent = "Por favor, selecione ou digite uma categoria válida.";
        statusDiv.className = "status-erro";
        return;
    }

    if (arquivosSelecionados.length === 0) {
        statusDiv.textContent = "Por favor, selecione pelo menos um ficheiro.";
        statusDiv.className = "status-erro";
        return;
    }

    // Formatar a data (Ex: "2026-05-25" vira "250526")
    const partesData = dataInput.split('-'); 
    const anoDoisDigitos = partesData[0].substring(2); 
    const mes = partesData[1]; 
    const dia = partesData[2]; 
    const dataPastaFormatada = `${dia}${mes}${anoDoisDigitos}`; 
    
    let urlsPublicasDasMidias = [];

    try {
        // ==================================================================
        // PARTE A: ENVIAR PARA O STORAGE (Bucket: Acervo)
        // ==================================================================
        for (let i = 0; i < arquivosSelecionados.length; i++) {
            const arquivoItem = arquivosSelecionados[i];
            
            const nomeLimpo = arquivoItem.name.replace(/[^a-zA-Z0-9.]/g, '_');
            const nomeUnicoFicheiro = `${Date.now()}_${i}_${nomeLimpo}`;
            
            // Usa o nome exato da pasta
            const caminhoStorage = `${pastaCategoriaStorage}/${dataPastaFormatada}/${nomeUnicoFicheiro}`;
            
            const uploadUrl = `${SUPABASE_URL}/storage/v1/object/Acervo/${caminhoStorage}`;
            const contentType = arquivoItem.type || 'application/octet-stream';

            const uploadResponse = await fetch(uploadUrl, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': contentType
                },
                body: arquivoItem
            });

            if (!uploadResponse.ok) {
                throw new Error(`Falha ao enviar o ficheiro: ${arquivoItem.name}`);
            }

            const urlPublica = `${SUPABASE_URL}/storage/v1/object/public/Acervo/${caminhoStorage}`;
            urlsPublicasDasMidias.push(urlPublica);
        }

        // ==================================================================
        // PARTE B: SALVAR NO BANCO DE DADOS (Tabela: LabHistoriaAcervo)
        // ==================================================================
        const bancoUrl = `${SUPABASE_URL}/rest/v1/LabHistoriaAcervo`;
        
        const dadosParaSalvar = {
            name: titulo,
            description: descricao,
            category: pastaCategoriaStorage, // Salva o nome da pasta também no banco para alinhar tudo!
            type: "gallery", 
            date: dataPastaFormatada,
            media: urlsPublicasDasMidias 
        };

        const bancoResponse = await fetch(bancoUrl, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(dadosParaSalvar)
        });

        if (bancoResponse.ok) {
            statusDiv.textContent = `Sucesso! Evento publicado com ${arquivosSelecionados.length} ficheiro(s).`;
            statusDiv.className = "status-sucesso";
            document.getElementById('upload-form').reset();
            inputNovaCategoria.style.display = "none";
            
            // Recarrega o select
            carregarCategoriasExistentes();
        } else {
            throw new Error("Erro ao registar as informações textuais no banco de dados.");
        }

    } catch (error) {
        console.error(error);
        statusDiv.textContent = `Erro no processo: ${error.message}`;
        statusDiv.className = "status-erro";
    }
});

// Executa automaticamente ao carregar
carregarCategoriasExistentes();