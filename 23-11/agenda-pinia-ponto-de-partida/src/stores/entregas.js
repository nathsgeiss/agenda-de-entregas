import { ref, watch, computed } from 'vue';
import { defineStore } from 'pinia';
import { filtrarPendentes, ordenarPorData } from '../agenda.js';

const CHAVE = 'agenda-de-entregas-vue';

const ENTREGAS_INICIAIS = [
    { id: 1, materia: 'Matemática', tipo: 'prova', data: '2026-11-18', feita: false },
    { id: 2, materia: 'História', tipo: 'trabalho', data: '2026-11-25', feita: false },
    { id: 3, materia: 'Português', tipo: 'trabalho', data: '2026-11-10', feita: true },
    { id: 4, materia: 'Inglês', tipo: 'apresentacao', data: '2026-11-20', feita: false }
];

function carregarEntregas() {
    const salvas = localStorage.getItem(CHAVE);
    return salvas === null ? ENTREGAS_INICIAIS.map((item) => ({ ...item })) : JSON.parse(salvas);
}

function salvarEntregas(lista) {
    localStorage.setItem(CHAVE, JSON.stringify(lista));
}

export const useEntregasStore = defineStore('entregas', () => {
    const entregas = ref(carregarEntregas());

    watch(entregas, salvarEntregas, { deep: true });

    function adicionarEntrega(entrega) {
        entregas.value.push(entrega);
    }

    function alternarFeita(entrega) {
        entrega.feita = !entrega.feita;
    }

    function apagarEntrega(entregaApagada) {
        entregas.value = entregas.value.filter((entrega) => entrega.id !== entregaApagada.id);
    }

    const pendentes = computed(() => ordenarPorData(filtrarPendentes(entregas.value)));
    const proxima = computed(() => pendentes.value[0]);

    function filtrarEntregasDoTipo(tipo) {
        return entregas.value.filter((entrega) => entrega.tipo === tipo);
    }

    return {
        entregas, adicionarEntrega, alternarFeita, apagarEntrega,
        pendentes, proxima, filtrarEntregasDoTipo
    };
});
