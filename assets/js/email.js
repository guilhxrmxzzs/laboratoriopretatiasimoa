document.addEventListener('DOMContentLoaded', () => {
    const formAgendamento = document.getElementById('formAgendamento');
    const msgAgendamento = document.getElementById('msgAgendamento');

    if (formAgendamento) {
        formAgendamento.addEventListener('submit', async function (e) {
            e.preventDefault();
            e.stopPropagation();

            const btnSubmit = formAgendamento.querySelector('button[type="submit"]');

            // Mapeamento idêntico aos IDs do seu HTML
            const nome = document.getElementById('nomeAgendamento').value.trim();
            const email = document.getElementById('emailAgendamento').value.trim();
            const tipoAtividade = document.getElementById('tipoAtividade').value;
            const dataAgendamento = document.getElementById('dataAgendamento').value;
            const horaAgendamento = document.getElementById('horaAgendamento').value;
            const observacoes = document.getElementById('observacoes').value.trim() || null;

            if (btnSubmit) btnSubmit.disabled = true;

            if (msgAgendamento) {
                msgAgendamento.style.display = 'block';
                msgAgendamento.style.color = '#d4af37';
                msgAgendamento.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registrando seu agendamento...';
            }

            try {
                if (typeof supabase === 'undefined') {
                    throw new Error('A biblioteca do Supabase não foi carregada no HTML.');
                }

                const SUPABASE_URL = 'https://hcebjldgynjivmktkkwf.supabase.co';
                const SUPABASE_KEY = 'sb_publishable_30HxPG9n5fu-xGag_qoA3A_DsRGgF6z';
                const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

                // Envio para o Supabase combinando com a nova estrutura das colunas
                const { error } = await supabaseClient
                    .from('agendamentos')
                    .insert([{
                        nome: nome,
                        email: email,
                        tipo_atividade: tipoAtividade,
                        data_agendamento: dataAgendamento,
                        hora_agendamento: horaAgendamento,
                        observacoes: observacoes
                    }]);

                if (error) throw error;

                if (msgAgendamento) {
                    msgAgendamento.style.color = '#28a745';
                    msgAgendamento.innerText = 'Agendamento realizado com sucesso! Em breve entraremos em contato.';
                }

                formAgendamento.reset();

                setTimeout(() => {
                    if (msgAgendamento) msgAgendamento.style.display = 'none';
                }, 6000);

            } catch (err) {
                console.error('Erro ao agendar:', err);
                if (msgAgendamento) {
                    msgAgendamento.style.color = '#dc3545';
                    msgAgendamento.innerText = `Erro ao agendar: ${err.message || 'Tente novamente.'}`;
                }
            } finally {
                if (btnSubmit) btnSubmit.disabled = false;
            }
        });
    }
});