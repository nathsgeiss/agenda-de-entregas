/* ===========================================================
   A store das entregas: os dados da agenda inteira, com o Pinia.
   =========================================================== */
import { computed } from 'vue';
import { defineStore } from 'pinia';
import { ordenarPorData, filtrarPendentes } from '../agenda.js';
import { useLocalStorage } from '../composables/useLocalStorage.js';

const CHAVE = 'agenda-de-entregas-vue';

// As entregas de exemplo, para a primeira vez que a página abre.
const ENTREGAS_INICIAIS = [
    { id: 1, materia: 'Matemática', tipo: 'prova', data: '2026-11-18', feita: false },
    { id: 2, materia: 'História', tipo: 'trabalho', data: '2026-11-25', feita: false },
    { id: 3, materia: 'Português', tipo: 'trabalho', data: '2026-11-10', feita: true },
    { id: 4, materia: 'Inglês', tipo: 'apresentacao', data: '2026-11-20', feita: false }
];

export const useEntregasStore = defineStore('entregas', () => {
    // O estado.
    const entregas = useLocalStorage(CHAVE, ENTREGAS_INICIAIS);

    // Os getters.
    // As pendentes, da mais próxima para a mais distante.
    const pendentes = computed(() => ordenarPorData(filtrarPendentes(entregas.value)));

    // A primeira das pendentes, ou undefined se não houver nenhuma.
    const proxima = computed(() => pendentes.value[0]);

    // Um getter que precisa de um dado (o tipo) é uma função.
    function filtrarEntregasDoTipo(tipo) {
        return entregas.value.filter((entrega) => entrega.tipo === tipo);
    }

    // As ações.
    function adicionarEntrega(entrega) {
        entregas.value.push(entrega);
    }

    // O ! inverte: true vira false, e false vira true.
    function alternarFeita(entrega) {
        entrega.feita = !entrega.feita;
    }

    // Uma lista nova, com todas as entregas menos a apagada.
    function apagarEntrega(entregaApagada) {
        entregas.value = entregas.value.filter((entrega) => entrega.id !== entregaApagada.id);
    }

    return { entregas, pendentes, proxima, filtrarEntregasDoTipo, adicionarEntrega, alternarFeita, apagarEntrega };
});
