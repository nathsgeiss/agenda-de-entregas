<!--
    Etapa 6 — o formulário

    Os campos, o erro e a validação foram para o FormularioGasto.
    Quando o gasto está pronto, ele avisa com o evento adicionar,
    e a adicionarGasto daqui só faz o push.
-->
<script setup>
import { ref, computed, watch } from 'vue';
import {
    formatarReais,
    calcularMedia,
    montarTextoDoGasto,
    montarMensagemDoOrcamento,
    passouDoOrcamento,
    calcularTotal,
    calcularMaiorGasto,
    calcularMenorGasto,
    montarTextoDoFiltro,
    passaNoFiltro
} from './calculos.js';
import CabecalhoApp from './components/CabecalhoApp.vue';
import IndicadorResumo from './components/IndicadorResumo.vue';
import GraficoCategorias from './components/GraficoCategorias.vue';
import LinhaGasto from './components/LinhaGasto.vue';
import FormularioGasto from './components/FormularioGasto.vue';

const ORCAMENTO = 50;

const CATEGORIAS = [
    { nome: 'Alimentação' },
    { nome: 'Transporte' },
    { nome: 'Lazer' }
];

const CHAVE = 'pra-onde-foi-meu-dinheiro';

// Os gastos de exemplo, para a primeira vez que a página abre.
const GASTOS_DE_EXEMPLO = [
    { id: 1, descricao: 'lanche', valor: 12.5, categoria: 'Alimentação' },
    { id: 2, descricao: 'ônibus', valor: 4.35, categoria: 'Transporte' },
    { id: 3, descricao: 'cinema', valor: 30, categoria: 'Lazer' }
];

function carregarGastos() {
    const salvos = localStorage.getItem(CHAVE);
    if (salvos === null) {
        return GASTOS_DE_EXEMPLO;
    }
    return JSON.parse(salvos);
}

function salvarGastos(lista) {
    localStorage.setItem(CHAVE, JSON.stringify(lista));
}

// A única coisa que o programa lembra.
const gastos = ref(carregarGastos());

// Toda mudança na lista é salva.
watch(gastos, salvarGastos, { deep: true });

// A categoria escolhida no filtro, ligada com v-model.
const categoriaEscolhida = ref('Todas');

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

// Os gastos que aparecem na tabela.
const mostrados = computed(() =>
    gastos.value.filter((gasto) => passaNoFiltro(gasto, categoriaEscolhida.value)));

// O gasto chega pronto e válido do FormularioGasto.
function adicionarGasto(gasto) {
    gastos.value.push(gasto);
}

// Uma lista nova, com todos os gastos menos o apagado. O id
// diz qual é qual, mesmo com a tabela filtrada.
function apagarGasto(gastoApagado) {
    gastos.value = gastos.value.filter((gasto) => gasto.id !== gastoApagado.id);
}

function desfazerUltimoGasto() {
    gastos.value.pop();
}
</script>

<template>
    <CabecalhoApp />

    <main class="painel">

        <section class="cartao novo-gasto">
            <FormularioGasto :categorias="CATEGORIAS" @adicionar="adicionarGasto" />
        </section>

        <section class="cartao resumo">
            <h2>Resumo</h2>

            <div class="indicadores">
                <IndicadorResumo rotulo="Total gasto" :valor="formatarReais(total)" :estourado="estourou" />
                <IndicadorResumo rotulo="Gastos registrados" :valor="gastos.length" />
                <IndicadorResumo rotulo="Média por gasto" :valor="formatarReais(media)" />
                <IndicadorResumo rotulo="Maior gasto" :valor="textoDoMaior" />
                <IndicadorResumo rotulo="Menor gasto" :valor="textoDoMenor" />
            </div>

            <div class="orcamento">
                <span class="rotulo">Orçamento da semana: {{ formatarReais(ORCAMENTO) }}</span>
                <strong class="restante" :class="{ estourado: estourou }">{{ mensagemDoOrcamento }}</strong>
            </div>
        </section>

        <section class="cartao categorias-cartao">
            <h2>Por categoria</h2>
            <GraficoCategorias :gastos="gastos" :categorias="CATEGORIAS" />
        </section>

        <section class="cartao historico-cartao">
            <h2>Histórico</h2>

            <p class="filtro">
                <label for="filtro">Mostrar</label>
                <select id="filtro" class="campo-filtro" v-model="categoriaEscolhida">
                    <option value="Todas">Todas as categorias</option>
                    <option value="Alimentação">Só Alimentação</option>
                    <option value="Transporte">Só Transporte</option>
                    <option value="Lazer">Só Lazer</option>
                </select>
            </p>
            <table class="tabela-historico">
                <caption class="legenda-historico">{{ montarTextoDoFiltro(mostrados.length, gastos.length) }}</caption>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Valor</th>
                        <th>Apagar</th>
                    </tr>
                </thead>
                <tbody class="historico">
                    <LinhaGasto
                        v-for="(gasto, posicao) in mostrados"
                        :key="gasto.id"
                        :gasto="gasto"
                        :numero="posicao + 1"
                        @apagar="apagarGasto"
                    />
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="3">Total</th>
                        <td class="total-rodape">{{ formatarReais(calcularTotal(mostrados)) }}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
            <button type="button" class="botao-desfazer" :disabled="gastos.length === 0" @click="desfazerUltimoGasto">Desfazer último gasto</button>
        </section>

    </main>
</template>
