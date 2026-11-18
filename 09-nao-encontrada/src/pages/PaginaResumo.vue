<!--
    A página Resumo, no endereço /.
    O resumo e o gráfico. (O formulário foi para a página Novo gasto.)
    O maior e o menor gasto são links para a página de cada um.
-->
<script setup>
import { computed } from 'vue';
import {
    formatarReais,
    calcularMedia,
    montarTextoDoGasto,
    montarMensagemDoOrcamento,
    passouDoOrcamento,
    calcularTotal,
    calcularMaiorGasto,
    calcularMenorGasto
} from '../calculos.js';
import IndicadorResumo from '../components/IndicadorResumo.vue';
import GraficoCategorias from '../components/GraficoCategorias.vue';
import CartaoPainel from '../components/CartaoPainel.vue';
import { ORCAMENTO, CATEGORIAS, gastos } from '../gastos.js';

// Calculados a partir de gastos. Mudou a lista, o Vue refaz.
const total = computed(() => calcularTotal(gastos.value));
const media = computed(() => calcularMedia(total.value, gastos.value.length));
const estourou = computed(() => passouDoOrcamento(total.value, ORCAMENTO));
const mensagemDoOrcamento = computed(() => montarMensagemDoOrcamento(ORCAMENTO - total.value));

// O maior e o menor viram texto aqui, para o indicador só mostrar.
const textoDoMaior = computed(() => {
    if (gastos.value.length === 0) {
        return '—';
    }
    return montarTextoDoGasto(calcularMaiorGasto(gastos.value));
});
const textoDoMenor = computed(() => {
    if (gastos.value.length === 0) {
        return '—';
    }
    return montarTextoDoGasto(calcularMenorGasto(gastos.value));
});

// O maior e o menor também levam para a página do gasto.
const destinoDoMaior = computed(() => montarDestinoDoGasto(calcularMaiorGasto(gastos.value)));
const destinoDoMenor = computed(() => montarDestinoDoGasto(calcularMenorGasto(gastos.value)));

// Sem gastos, não tem para onde ir: o indicador fica sem link.
function montarDestinoDoGasto(gasto) {
    if (gasto === undefined) {
        return '';
    }
    return `/gasto/${gasto.id}`;
}
</script>

<template>
    <main class="painel">

        <CartaoPainel titulo="Resumo" class="resumo">
            <div class="indicadores">
                <IndicadorResumo rotulo="Total gasto" :valor="formatarReais(total)" :estourado="estourou" />
                <IndicadorResumo rotulo="Gastos registrados" :valor="gastos.length" />
                <IndicadorResumo rotulo="Média por gasto" :valor="formatarReais(media)" />
                <IndicadorResumo rotulo="Maior gasto" :valor="textoDoMaior" :destino="destinoDoMaior" />
                <IndicadorResumo rotulo="Menor gasto" :valor="textoDoMenor" :destino="destinoDoMenor" />
            </div>

            <div class="orcamento">
                <span class="rotulo">Orçamento da semana: {{ formatarReais(ORCAMENTO) }}</span>
                <strong class="restante" :class="{ estourado: estourou }">{{ mensagemDoOrcamento }}</strong>
            </div>
        </CartaoPainel>

        <CartaoPainel titulo="Por categoria" class="categorias-cartao">
            <GraficoCategorias :gastos="gastos" :categorias="CATEGORIAS" />
        </CartaoPainel>

    </main>
</template>
