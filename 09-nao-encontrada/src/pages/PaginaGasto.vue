<!--
    A página de um gasto, no endereço /gasto/3 (ou /gasto/7...).

    A rota é /gasto/:id. O :id é um pedaço do endereço que muda,
    e o useRoute() o entrega em route.params.id. Com ele, a página
    procura o gasto na lista.

    Dá para chegar aqui por dois caminhos: pela tabela do histórico
    ou pelo maior e menor gasto do resumo. Por isso o Voltar usa o
    router.back(): ele volta para onde a pessoa estava.
-->
<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatarReais, calcularTotal, calcularPorcentagem } from '../calculos.js';
import CartaoPainel from '../components/CartaoPainel.vue';
import { gastos, apagarGasto } from '../gastos.js';

// useRoute(): o endereço atual. useRouter(): o router, para mudar de página.
const route = useRoute();
const router = useRouter();

// O :id chega como texto ('3'), e o id dos gastos é número (3).
// O find devolve o primeiro gasto que passa no teste, ou undefined.
const gasto = computed(() =>
    gastos.value.find((cadaGasto) => cadaGasto.id === Number(route.params.id)));

const porcentagem = computed(() => calcularPorcentagem(gasto.value.valor, calcularTotal(gastos.value)));

function voltarPagina() {
    router.back();
}

// O replace TROCA a página atual no histórico do navegador, em vez de
// empilhar uma nova. Assim, o voltar não cai na página de um gasto
// que não existe mais.
function apagarEsteGasto() {
    apagarGasto(gasto.value);
    router.replace('/historico');
}
</script>

<template>
    <main class="painel">

        <CartaoPainel v-if="gasto" titulo="Detalhes do gasto" class="detalhe-cartao" :data-categoria="gasto.categoria">
            <p class="detalhe-descricao">{{ gasto.descricao }}</p>
            <p class="detalhe-valor">{{ formatarReais(gasto.valor) }}</p>
            <p><span class="etiqueta">{{ gasto.categoria }}</span></p>
            <p>{{ Math.round(porcentagem) }}% de tudo o que foi gasto.</p>

            <div class="detalhe-acoes">
                <button type="button" class="botao-voltar" @click="voltarPagina">Voltar</button>
                <button type="button" class="botao-apagar-gasto" @click="apagarEsteGasto">Apagar este gasto</button>
            </div>
        </CartaoPainel>

        <!-- Um endereço com um id que não existe: /gasto/999 -->
        <CartaoPainel v-else titulo="Gasto não encontrado" class="detalhe-cartao">
            <p>Esse gasto não existe, ou já foi apagado.</p>
            <div class="detalhe-acoes">
                <RouterLink to="/historico" class="botao-voltar">Ir para o histórico</RouterLink>
            </div>
        </CartaoPainel>

    </main>
</template>
