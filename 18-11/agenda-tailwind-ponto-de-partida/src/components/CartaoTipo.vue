<script setup>
import { RouterLink } from 'vue-router';
import { formatarData } from '../agenda.js';

defineProps({
    resumo: {
        type: Object,
        required: true
    }
});

function escolherCorDoTipo(tipo) {
    const cores = {
        prova: 'bg-red-600',
        trabalho: 'bg-blue-600',
        apresentacao: 'bg-purple-600'
    };

    return cores[tipo];
}

function calcularPorcentagemFeita(feitas, total) {
    return total === 0 ? 0 : (feitas / total) * 100;
}

function escolherBordaDoCartao(pendentes) {
    return pendentes.length === 0 ? 'border-emerald-400' : 'border-gray-200';
}
</script>

<template>
    <section
        class="rounded-xl border border-solid bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        :class="escolherBordaDoCartao(resumo.pendentes)"
    >
        <div class="flex flex-wrap items-center justify-between gap-2">
            <h3 class="m-0 text-lg font-bold">{{ resumo.titulo }}</h3>

            <span
                class="rounded-full px-3 py-1 text-sm font-semibold text-white"
                :class="escolherCorDoTipo(resumo.tipo)"
            >
                Pendentes: {{ resumo.pendentes.length }}
            </span>
        </div>

        <p class="mt-3 mb-1 text-sm text-gray-700">
            {{ resumo.feitas }} de {{ resumo.total }} feitas
        </p>

        <div class="h-2 overflow-hidden rounded-full bg-gray-200" aria-hidden="true">
            <div
                class="h-full rounded-full"
                :class="escolherCorDoTipo(resumo.tipo)"
                :style="{ width: `${calcularPorcentagemFeita(resumo.feitas, resumo.total)}%` }"
            ></div>
        </div>

        <ul v-if="resumo.pendentes.length > 0" class="mt-4 mb-0 list-none space-y-2 p-0">
            <li
                v-for="entrega in resumo.pendentes"
                :key="entrega.id"
                class="flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-3 py-2"
            >
                <RouterLink
                    :to="`/entrega/${entrega.id}`"
                    class="min-w-0 wrap-break-word font-semibold text-slate-900 no-underline hover:underline"
                >
                    {{ entrega.materia }}
                </RouterLink>

                <time :datetime="entrega.data" class="shrink-0 text-sm text-gray-600">
                    {{ formatarData(entrega.data) }}
                </time>
            </li>
        </ul>

        <p v-else class="mt-4 mb-0 text-sm text-gray-600">
            Nada pendente.
        </p>
    </section>
</template>