// Lista inicial de entregas da Etapa 3
const entregas = [
    { materia: 'Matemática', tipo: 'Prova', data: '2026-10-28', feita: false },
    { materia: 'História', tipo: 'Trabalho', data: '2026-11-04', feita: false },
    { materia: 'Português', tipo: 'Trabalho', data: '2026-10-20', feita: true },
    { materia: 'Inglês', tipo: 'Apresentação', data: '2026-10-30', feita: false }
];

// Função auxiliar para formatar a data de 'AAAA-MM-DD' para 'DD/MM'
function formatarData(dataIso) {
    const partes = dataIso.split('-');
    return `${partes[2]}/${partes[1]}`;
}

// Função para renderizar a lista na tela
function renderizar() {
    const ul = document.querySelector('.secao-proximas ul');
    ul.innerHTML = '';

    // Cria uma cópia da lista ordenada por data (da mais próxima para a mais distante)
    const entregasOrdenadas = [...entregas].sort((a, b) => new Date(a.data) - new Date(b.data));

    entregasOrdenadas.forEach((entrega) => {
        // Encontra o índice real no array original para facilitar a remoção correta
        const realIndex = entregas.indexOf(entrega);

        const li = document.createElement('li');
        li.className = 'entrega';
        if (entrega.feita) {
            li.classList.add('feita');
        }
        // O CSS usa exatamente o tipo com a primeira letra maiúscula para definir as cores
        li.setAttribute('data-tipo', entrega.tipo);

        // Estrutura interna exata esperada pelo CSS original
        li.innerHTML = `
            <div class="entrega-info">
                <span class="entrega-data">${formatarData(entrega.data)}</span>
                <span class="entrega-materia">${entrega.materia}</span>
                <span class="entrega-etiqueta">${entrega.tipo}</span>
            </div>
            <div class="entrega-acoes">
                <button type="button" class="btn-acao">${entrega.feita ? 'Reabrir' : 'Feita'}</button>
                <button type="button" class="btn-apagar">Apagar</button>
            </div>
        `;

        // Evento do botão Apagar
        li.querySelector('.btn-apagar').addEventListener('click', () => {
            entregas.splice(realIndex, 1);
            renderizar();
            atualizarResumo();
        });

        ul.appendChild(li);
    });

    atualizarResumo();
}

// Atualiza os indicadores do resumo
function atualizarResumo() {
    const pendentes = entregas.filter(e => !e.feita);
    
    // Atualiza o contador de pendentes
    document.querySelector('.secao-resumo .indicador:nth-child(1) .valor').textContent = pendentes.length;

    // Ordena as pendentes para achar a mais próxima
    const pendentesOrdenadas = [...pendentes].sort((a, b) => new Date(a.data) - new Date(b.data));

    const spanProxima = document.querySelector('.secao-resumo .indicador:nth-child(2) .valor');
    if (pendentesOrdenadas.length > 0) {
        spanProxima.textContent = `${pendentesOrdenadas[0].materia} — ${formatarData(pendentesOrdenadas[0].data)}`;
    } else {
        spanProxima.textContent = 'Nada pendente';
    }
}

// Evento do formulário para adicionar nova entrega
document.querySelector('.secao-nova-entrega form').addEventListener('submit', (e) => {
    e.preventDefault();

    const inputMateria = document.getElementById('materia');
    const selectTipo = document.getElementById('tipo');
    const inputData = document.getElementById('data');

    const materiaVal = inputMateria.value.trim();
    if (materiaVal === '') return; // Validação: matéria só de espaços não entra

    // Converte o valor do select (ex: 'prova') para o formato com maiúscula ('Prova')
    const tipoValor = selectTipo.value;
    let tipoFormatado = 'Prova';
    if (tipoValor === 'trabalho') tipoFormatado = 'Trabalho';
    if (tipoValor === 'apresentacao') tipoFormatado = 'Apresentação';

    const novaEntrega = {
        materia: materiaVal,
        tipo: tipoFormatado,
        data: inputData.value,
        feita: false
    };

    entregas.push(novaEntrega);
    renderizar();

    // Limpa o formulário voltando ao começo
    e.target.reset();
});

// Executa a renderização inicial ao carregar a página
renderizar();