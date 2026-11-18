import { ref, watch } from 'vue';

const CHAVE_STORAGE = 'agenda-de-entregas';

const entregasPadrao = [
    { id: 1, materia: 'Matemática', tipo: 'prova', data: '2026-11-18', feita: false },
    { id: 2, materia: 'História', tipo: 'trabalho', data: '2026-11-25', feita: false },
    { id: 3, materia: 'Português', tipo: 'trabalho', data: '2026-11-10', feita: true },
    { id: 4, materia: 'Inglês', tipo: 'apresentacao', data: '2026-11-20', feita: false }
];

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

export const entregas = ref(carregarEntregas());

watch(
    entregas,
    (novasEntregas) => {
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(novasEntregas));
    },
    { deep: true }
);

export function adicionarEntrega(nova) {
    entregas.value.push(nova);
}

export function alternarFeita(id) {
    const entrega = entregas.value.find(e => e.id === Number(id));
    if (entrega) {
        entrega.feita = !entrega.feita;
    }
}

export function apagarEntrega(id) {
    const indice = entregas.value.findIndex(e => e.id === Number(id));
    if (indice !== -1) {
        entregas.value.splice(indice, 1);
    }
}

export function apagarFeitas() {
    entregas.value = entregas.value.filter(e => !e.feita);
}