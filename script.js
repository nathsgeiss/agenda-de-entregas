// Chave usada para salvar no localStorage conforme o enunciado
const CHAVE_STORAGE = 'agenda-de-entregas';

// Dados padrão iniciais caso o localStorage esteja vazio
const entregasPadrao = [
    { materia: 'Matemática', tipo: 'Prova', data: '2026-10-28', feita: false },
    { materia: 'História', tipo: 'Trabalho', data: '2026-11-04', feita: false },
    { materia: 'Português', tipo: 'Trabalho', data: '2026-10-20', feita: true },
    { materia: 'Inglês', tipo: 'Apresentação', data: '2026-10-30', feita: false }
];

// Carrega as entregas do localStorage ou usa as padrão se for a primeira vez
let entregas = carregarEntregas();

function carregarEntregas() {
    const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);
    if (dadosSalvos) {
        try {
            return JSON.parse(dadosSalvos);
        } catch (e) {
            console.error('Erro ao ler do localStorage', e);
        }
    }
    return [...entregasPadrao];
}

function salvarEntregas() {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(entregas));
}

// Função auxiliar para formatar a data de 'AAAA-MM-DD' para 'DD/MM'
function formatarData(dataIso) {
    if (!dataIso) return '';
    const partes = dataIso.split('-');
    return `${partes[2]}/${partes[1]}`;
}

// Função para renderizar a lista na tela considerando o filtro escolhido
function renderizar() {
    const ul = document.querySelector('.secao-proximas ul');
    ul.innerHTML = '';

    const filtroSelecionado = document.getElementById('mostrar').value;

    // Cria uma cópia da lista ordenada por data (da mais próxima para a mais distante)
    const entregasOrdenadas = [...entregas].sort((a, b) => new Date(a.data) - new Date(b.data));

    entregasOrdenadas.forEach((entrega) => {
        // Encontra o índice real no array original
        const realIndex = entregas.indexOf(entrega);

        // Aplica o filtro (se diferente de 'todos', verifica se o tipo bate)
        if (filtroSelecionado !== 'todos' && entrega.tipo !== filtroSelecionado) {
            return;
        }

        const li = document.createElement('li');
        li.className = 'entrega';
        if (entrega.feita) {
            li.classList.add('feita');
        }
        li.setAttribute('data-tipo', entrega.tipo);

        // Estrutura HTML do item da lista
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

        // Evento do botão Feita / Reabrir
        li.querySelector('.btn-acao').addEventListener('click', () => {
            entregas[realIndex].feita = !entregas[realIndex].feita;
            salvarEntregas();
            renderizar();
        });

        // Evento do botão Apagar
        li.querySelector('.btn-apagar').addEventListener('click', () => {
            entregas.splice(realIndex, 1);
            salvarEntregas();
            renderizar();
        });

        ul.appendChild(li);
    });

    atualizarResumo();
}

// Atualiza os indicadores do resumo (contabiliza sempre o total, independente do filtro)
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

    const novaEntrega = {
        materia: materiaVal,
        tipo: selectTipo.value,
        data: inputData.value,
        feita: false
    };

    entregas.push(novaEntrega);
    salvarEntregas();
    renderizar();

    // Limpa o formulário voltando ao começo
    e.target.reset();
});

// Evento para reagir à mudança no select de filtro ("Mostrar")
document.getElementById('mostrar').addEventListener('change', () => {
    renderizar();
});

// Executa a renderização inicial ao carregar a página
renderizar();