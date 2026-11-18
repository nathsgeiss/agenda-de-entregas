<!--
    O gráfico de barras. Recebe os gastos e as categorias, e faz
    as contas aqui dentro: quem usa o gráfico não precisa saber
    como as porcentagens são calculadas.

    No <template>, as props são usadas pelo nome (gastos). No
    <script>, elas ficam dentro de props (props.gastos).
-->
<script setup>
import { computed } from 'vue';
import {
    formatarReais,
    calcularTotal,
    calcularPorcentagem,
    passaNoFiltro
} from '../calculos.js';

const props = defineProps({
    gastos: Array,
    categorias: Array
});

// Uma barra para cada categoria: o nome, o total e a porcentagem.
const barras = computed(() => props.categorias.map((cadaCategoria) => {
    const gastosDaCategoria = props.gastos.filter((gasto) => passaNoFiltro(gasto, cadaCategoria.nome));
    const totalDaCategoria = calcularTotal(gastosDaCategoria);
    return {
        nome: cadaCategoria.nome,
        total: totalDaCategoria,
        porcentagem: calcularPorcentagem(totalDaCategoria, calcularTotal(props.gastos))
    };
}));
</script>

<template>
    <ul class="categorias">
        <li v-for="barra in barras" :key="barra.nome" :data-categoria="barra.nome">
            <div class="legenda-da-barra">
                <span>{{ barra.nome }}</span>
                <strong>{{ formatarReais(barra.total) }} ({{ Math.round(barra.porcentagem) }}%)</strong>
            </div>
            <!-- O trilho é só desenho: o número já está na legenda. -->
            <div class="trilho" aria-hidden="true">
                <div class="barra" :style="{ width: barra.porcentagem + '%' }"></div>
            </div>
        </li>
    </ul>
</template>
