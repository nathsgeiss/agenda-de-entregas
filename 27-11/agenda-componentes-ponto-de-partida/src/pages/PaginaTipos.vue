<!--
    A página Por tipo, no endereço /tipos.
    O cartão virou o componente CartaoTipo.
-->
<script setup>
import { computed } from 'vue';
import { ordenarPorData, filtrarPendentes } from '../agenda.js';
import CartaoTipo from '../components/CartaoTipo.vue';
import { useEntregasStore } from '../stores/entregas.js';

const entregasStore = useEntregasStore();

const TIPOS = [
    { tipo: 'prova', titulo: 'Provas' },
    { tipo: 'trabalho', titulo: 'Trabalhos' },
    { tipo: 'apresentacao', titulo: 'Apresentações' }
];

// Um resumo para cada tipo: as pendentes (por data) e quantas já foram feitas.
const resumos = computed(() => TIPOS.map((item) => montarResumo(item)));

function montarResumo(item) {
    const doTipo = entregasStore.filtrarEntregasDoTipo(item.tipo);
    const pendentes = ordenarPorData(filtrarPendentes(doTipo));
    return {
        tipo: item.tipo,
        titulo: item.titulo,
        total: doTipo.length,
        feitas: doTipo.length - pendentes.length,
        pendentes: pendentes
    };
}
</script>

<template>
    <main class="mx-auto max-w-5xl px-5 py-8">
        <h2 class="m-0 text-2xl font-bold">Por tipo</h2>
        <p class="mt-1 text-gray-600">As entregas pendentes de cada tipo, da mais próxima para a mais distante.</p>

        <div class="mt-6 grid gap-6 md:grid-cols-3">
            <CartaoTipo v-for="resumo in resumos" :key="resumo.tipo" :resumo="resumo" />
        </div>
    </main>
</template>
