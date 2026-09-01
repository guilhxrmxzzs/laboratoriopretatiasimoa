function toggleNomeInput() {
    const isAnonimo = document.getElementById('anonimo').checked;
    const grupoNome = document.getElementById('grupoNome');
    const inputNome = document.getElementById('nomeDenuncia');

    if (isAnonimo) {
        grupoNome.style.display = 'none';
        inputNome.value = '';
    } else {
        grupoNome.style.display = 'flex';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const formDenuncia = document.getElementById('formDenuncia');
    const msgDenuncia = document.getElementById('msgDenuncia');

    if (formDenuncia) {
        formDenuncia.addEventListener('submit', function(e) {
            e.preventDefault();

            msgDenuncia.style.display = 'block';
            msgDenuncia.style.color = '#d4af37';
            msgDenuncia.innerText = 'Processando e enviando denúncia...';

            setTimeout(() => {
                msgDenuncia.style.color = '#28a745';
                msgDenuncia.innerText = 'Denúncia registrada com sucesso! O Laboratório Preta Tia Simoa acolhe seu relato.';
                
                formDenuncia.reset();
                toggleNomeInput();

                setTimeout(() => {
                    msgDenuncia.style.display = 'none';
                }, 6000);
            }, 1500);
        });
    }
});