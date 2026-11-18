/* ===========================================================
   As entregas do app inteiro: quem importa recebe o mesmo ref.
   =========================================================== */
import { ref, watch } from 'vue';

const CHAVE = 'agenda-de-entregas-vue';

// As entregas de exemplo, para a primeira vez que a página abre.
const ENTREGAS_INICIAIS = [
    { id: 1, materia: 'Matemática', tipo: 'prova', data: '2026-11-18', feita: false },
    { id: 2, materia: 'História', tipo: 'trabalho', data: '2026-11-25', feita: false },
    { id: 3, materia: 'Português', tipo: 'trabalho', data: '2026-11-10', feita: true },
    { id: 4, materia: 'Inglês', tipo: 'apresentacao', data: '2026-11-20', feita: false }
];

function carregarEntregas() {
    const salvas = localStorage.getItem(CHAVE);
    if (salvas === null) {
        return ENTREGAS_INICIAIS;
    }
    return JSON.parse(salvas);
}

function salvarEntregas(lista) {
    localStorage.setItem(CHAVE, JSON.stringify(lista));
}

export const entregas = ref(carregarEntregas());

// Toda mudança na lista é salva.
watch(entregas, salvarEntregas, { deep: true });

export function adicionarEntrega(entrega) {
    entregas.value.push(entrega);
}

// O ! inverte: true vira false, e false vira true.
export function alternarFeita(entrega) {
    entrega.feita = !entrega.feita;
}

// Uma lista nova, com todas as entregas menos a apagada.
export function apagarEntrega(entregaApagada) {
    entregas.value = entregas.value.filter((entrega) => entrega.id !== entregaApagada.id);
}
