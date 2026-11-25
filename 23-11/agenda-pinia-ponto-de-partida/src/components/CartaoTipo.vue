<!--
    O cartão de um tipo: o título, as pendentes, a barra das feitas e
    a lista. As classes do Tailwind moram aqui; quem usa escreve só
    <CartaoTipo :resumo="resumo" />.
-->
<script setup>
import { formatarData } from '../agenda.js';

defineProps({
    resumo: Object
});

// calcularPorcentagemFeita({ feitas: 1, total: 2 }) → 50
function calcularPorcentagemFeita(resumo) {
    if (resumo.total === 0) {
        return 0;
    }
    return resumo.feitas / resumo.total * 100;
}

// O nome da classe vai inteiro: o Tailwind só cria as classes
// que encontra escritas nos arquivos.
function escolherCorDoTipo(tipo) {
    if (tipo === 'prova') {
        return 'bg-red-600';
    }
    if (tipo === 'trabalho') {
        return 'bg-blue-600';
    }
    return 'bg-purple-600';
}
</script>

<template>
    <section class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <div class="flex items-center justify-between">
            <h3 class="m-0 text-lg font-bold">{{ resumo.titulo }}</h3>
            <span class="rounded-full px-3 py-1 text-sm font-bold text-white" :class="escolherCorDoTipo(resumo.tipo)">Pendentes: {{ resumo.pendentes.length }}</span>
        </div>
        <p class="mt-2 mb-0 text-sm text-gray-500">{{ resumo.feitas }} de {{ resumo.total }} feitas</p>

        <!-- O trilho cinza e, dentro dele, a barra na cor do tipo -->
        <div class="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
            <div class="h-full rounded-full" :class="escolherCorDoTipo(resumo.tipo)" :style="{ width: calcularPorcentagemFeita(resumo) + '%' }"></div>
        </div>
        <ul class="mt-4 mb-0 list-none space-y-2 p-0">
            <li v-for="entrega in resumo.pendentes" :key="entrega.id" class="flex justify-between rounded-lg bg-gray-50 px-3 py-2">
                <span class="font-bold">{{ entrega.materia }}</span>
                <span class="text-gray-500">{{ formatarData(entrega.data) }}</span>
            </li>
        </ul>
        <p v-if="resumo.pendentes.length === 0" class="mt-4 mb-0 text-gray-500 italic">Nada pendente.</p>
    </section>
</template>
