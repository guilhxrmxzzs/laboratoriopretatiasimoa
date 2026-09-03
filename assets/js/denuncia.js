// Função de alternância do campo de nome
function toggleNomeInput() {
    const checkAnonimo = document.getElementById('anonimo');
    const grupoNome = document.getElementById('grupoNome');
    const inputNome = document.getElementById('nomeDenuncia');

    if (!checkAnonimo || !grupoNome) return;

    if (checkAnonimo.checked) {
        grupoNome.style.display = 'none';
        if (inputNome) inputNome.value = '';
    } else {
        grupoNome.style.display = 'flex';
    }
}

// Auxiliar para tratar nomes de arquivos
function sanitizarString(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
}

document.addEventListener('DOMContentLoaded', () => {
    // Aplica visibilidade inicial do campo de nome ao carregar
    toggleNomeInput();

    const formDenuncia = document.getElementById('formDenuncia');
    const msgDenuncia = document.getElementById('msgDenuncia');

    if (formDenuncia) {
        formDenuncia.addEventListener('submit', async function (e) {
            // Intercepta e impede a atualização da página imediatamente
            e.preventDefault();
            e.stopPropagation();

            const btnSubmit = formDenuncia.querySelector('button[type="submit"]');
            const checkAnonimo = document.getElementById('anonimo');
            const inputNome = document.getElementById('nomeDenuncia');

            if (btnSubmit) btnSubmit.disabled = true;

            if (msgDenuncia) {
                msgDenuncia.style.display = 'block';
                msgDenuncia.style.color = '#d4af37';
                msgDenuncia.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando e enviando denúncia...';
            }

            try {
                // Verifica se a biblioteca foi carregada corretamente pelo HTML
                if (typeof supabase === 'undefined') {
                    throw new Error('A biblioteca do Supabase não foi carregada. Verifique se adicionou a tag <script> no HTML.');
                }

                // Conexão Supabase
                const SUPABASE_URL = 'https://hcebjldgynjivmktkkwf.supabase.co';
                const SUPABASE_KEY = 'sb_publishable_30HxPG9n5fu-xGag_qoA3A_DsRGgF6z';
                const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

                const eAnonimo = checkAnonimo ? checkAnonimo.checked : false;
                const nomeFinal = eAnonimo ? 'Denúncia Anônima' : (inputNome ? inputNome.value.trim() : '') || 'Não informado';
                
                const tipoInfracao = document.getElementById('tipoInfracao').value;
                const descricao = document.getElementById('descricaoDenuncia').value.trim();
                const arquivoInput = document.getElementById('provasDenuncia')?.files[0];

                let arquivoUrl = null;

                // Envio do arquivo para o bucket
                if (arquivoInput) {
                    const extensao = arquivoInput.name.split('.').pop();
                    const nomeLimpo = sanitizarString(arquivoInput.name.split('.')[0]);
                    const caminhoArquivo = `provas/${Date.now()}-${nomeLimpo}.${extensao}`;

                    const { error: uploadError } = await supabaseClient.storage
                        .from('denuncias')
                        .upload(caminhoArquivo, arquivoInput, { cacheControl: '3600', upsert: false });

                    if (uploadError) throw new Error(`Falha ao anexar prova: ${uploadError.message}`);

                    const { data: urlData } = supabaseClient.storage
                        .from('denuncias')
                        .getPublicUrl(caminhoArquivo);

                    arquivoUrl = urlData.publicUrl;
                }

                // Inserção no banco de dados
                const { error: dbError } = await supabaseClient
                    .from('denuncias')
                    .insert([{
                        nome: nomeFinal,
                        tipo_infracao: tipoInfracao,
                        descricao: descricao,
                        arquivo_url: arquivoUrl
                    }]);

                if (dbError) throw dbError;

                // Retorno visual de sucesso
                if (msgDenuncia) {
                    msgDenuncia.style.color = '#28a745';
                    msgDenuncia.innerText = 'Denúncia registrada com sucesso! O Laboratório Preta Tia Simoa acolhe seu relato.';
                }
                
                formDenuncia.reset();
                toggleNomeInput();

                setTimeout(() => {
                    if (msgDenuncia) msgDenuncia.style.display = 'none';
                }, 6000);

            } catch (err) {
                console.error('Erro ao enviar denúncia:', err);
                if (msgDenuncia) {
                    msgDenuncia.style.color = '#dc3545';
                    msgDenuncia.innerText = `Erro ao enviar: ${err.message || 'Tente novamente.'}`;
                }
            } finally {
                if (btnSubmit) btnSubmit.disabled = false;
            }
        });
    }
});