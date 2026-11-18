<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { filtrarPendentes, ordenarPorData } from '../agenda.js';
import { entregas } from '../entregas.js';
import CartaoTipo from '../components/CartaoTipo.vue';

const TIPOS = [
    { tipo: 'prova', titulo: 'Provas' },
    { tipo: 'trabalho', titulo: 'Trabalhos' },
    { tipo: 'apresentacao', titulo: 'Apresentações' }
];

const resumos = computed(() => {
    return TIPOS.map(({ tipo, titulo }) => {
        const entregasDoTipo = entregas.value.filter(entrega => entrega.tipo === tipo);

        return {
            tipo,
            titulo,
            total: entregasDoTipo.length,
            feitas: entregasDoTipo.filter(entrega => entrega.feita).length,
            pendentes: ordenarPorData(filtrarPendentes(entregasDoTipo))
        };
    });
});
</script>

<template>
    <main class="mx-auto max-w-5xl px-4 py-8">
        <div class="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 class="m-0 text-2xl font-bold">Por tipo</h2>

            <RouterLink
                to="/nova"
                class="inline-block rounded-lg bg-[#ff7a59] px-4 py-2 font-semibold text-slate-900 no-underline hover:bg-[#e8603e] focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2"
            >
                Nova entrega
            </RouterLink>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
            <CartaoTipo
                v-for="resumo in resumos"
                :key="resumo.tipo"
                :resumo="resumo"
            />
        </div>
    </main>
</template>