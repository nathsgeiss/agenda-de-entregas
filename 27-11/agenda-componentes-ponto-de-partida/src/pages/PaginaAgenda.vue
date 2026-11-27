<!--
    A página da agenda: tudo o que o App.vue mostrava, menos o
    cabeçalho, o rodapé e o formulário (que foi para a página
    Nova entrega). A próxima entrega do resumo leva para a página dela.
-->
<script setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import {
    ordenarPorData,
    montarTextoDaProxima,
    passaNoFiltro, formatarData, nomearTipo
} from '../agenda.js';
import ResumoAgenda from '../components/ResumoAgenda.vue';
import ItemEntrega from '../components/ItemEntrega.vue';
import ModalConfirmacao from '../components/ModalConfirmacao.vue';
import SeletorOpcoes from '../components/SeletorOpcoes.vue';
import { useEntregasStore } from '../stores/entregas.js';
import { useLocalStorage } from '../composables/useLocalStorage.js';

const entregasStore = useEntregasStore();

// O estado com storeToRefs, para continuar reativo.
const { entregas } = storeToRefs(entregasStore);

// As ações são funções: saem direto da store.
const { alternarFeita, apagarEntrega } = entregasStore;

// O filtro é lembrado ao recarregar a página.
const tipoEscolhido = useLocalStorage('filtro-agenda', 'todos');
const modalAberto = ref(false);
const entregaEscolhida = ref(null);
const OPCOES_FILTRO = [
    { valor: 'todos', nome: 'Tudo' },
    { valor: 'prova', nome: 'Provas' },
    { valor: 'trabalho', nome: 'Trabalhos' },
    { valor: 'apresentacao', nome: 'Apresentações' }
];

function pedirConfirmacao(entrega) {
    entregaEscolhida.value = entrega;
    modalAberto.value = true;
}

function confirmarExclusao() {
    if (entregaEscolhida.value) apagarEntrega(entregaEscolhida.value);
    modalAberto.value = false;
    entregaEscolhida.value = null;
}

// As pendentes e a próxima vêm prontas da store (getters).
const pendentes = computed(() => entregasStore.pendentes.length);
const proxima = computed(() => montarTextoDaProxima(entregas.value));
const destinoDaProxima = computed(() => montarDestinoDaEntrega(entregasStore.proxima));
const mostradas = computed(() => ordenarPorData(entregas.value.filter((entrega) => passaNoFiltro(entrega, tipoEscolhido.value))));

// Sem nada pendente, não tem para onde ir: a próxima fica sem link.
function montarDestinoDaEntrega(entrega) {
    if (entrega === undefined) {
        return '';
    }
    return `/entrega/${entrega.id}`;
}
</script>

<template>
    <main class="painel">

        <ResumoAgenda :pendentes="pendentes" :proxima="proxima" :destino="destinoDaProxima" />

        <section class="cartao entregas">
            <h2>Próximas entregas</h2>

            <div class="filtro">
                <label>Mostrar</label>
                <SeletorOpcoes v-model="tipoEscolhido" :opcoes="OPCOES_FILTRO" rotulo="Filtrar entregas" />
            </div>

            <ul class="lista">
                <ItemEntrega
                    v-for="entrega in mostradas"
                    :key="entrega.id"
                    :entrega="entrega"
                    @alternar="alternarFeita"
                    @apagar="pedirConfirmacao"
                />
            </ul>
        </section>

        <ModalConfirmacao v-model="modalAberto" titulo="Apagar entrega?">
            <p v-if="entregaEscolhida">
                <strong>{{ entregaEscolhida.materia }}</strong>
                ({{ nomearTipo(entregaEscolhida.tipo) }}, {{ formatarData(entregaEscolhida.data) }})
                vai sumir da agenda.
            </p>
            <template #botoes>
                <button type="button" class="botao-apagar-confirmacao" @click="confirmarExclusao">Apagar</button>
            </template>
        </ModalConfirmacao>

    </main>
</template>
