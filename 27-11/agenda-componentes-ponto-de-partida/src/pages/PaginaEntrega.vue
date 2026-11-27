<!--
    A página de uma entrega, no endereço /entrega/2 (ou /entrega/4...).
    O :id do endereço chega em route.params.id, como texto.

    Dá para chegar aqui pela lista ou pela próxima entrega do resumo:
    por isso o Voltar usa o router.back().
-->
<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatarData, nomearTipo } from '../agenda.js';
import { useEntregasStore } from '../stores/entregas.js';
import ModalConfirmacao from '../components/ModalConfirmacao.vue';

const route = useRoute();
const router = useRouter();
const entregasStore = useEntregasStore();
const modalAberto = ref(false);

const entrega = computed(() =>
    entregasStore.entregas.find((cadaEntrega) => cadaEntrega.id === Number(route.params.id)));

function voltarPagina() {
    router.back();
}

// replace: a página da entrega apagada sai do histórico do navegador.
function apagarEstaEntrega() {
    if (!entrega.value) return;
    entregasStore.apagarEntrega(entrega.value);
    modalAberto.value = false;
    router.replace('/');
}
</script>

<template>
    <main class="painel">

        <section v-if="entrega" class="cartao detalhe-cartao" :data-tipo="entrega.tipo">
            <h2>Detalhes da entrega</h2>
            <p class="detalhe-materia">{{ entrega.materia }}</p>
            <p><span class="etiqueta">{{ nomearTipo(entrega.tipo) }}</span></p>
            <p>Para o dia <strong>{{ formatarData(entrega.data) }}</strong>.</p>
            <p v-if="entrega.feita">Já foi feita.</p>
            <p v-else>Ainda está pendente.</p>

            <div class="detalhe-acoes">
                <button type="button" class="botao-voltar" @click="voltarPagina">Voltar</button>
                <button v-if="entrega.feita" type="button" class="botao-feita" @click="entregasStore.alternarFeita(entrega)">Reabrir</button>
                <button v-else type="button" class="botao-feita" @click="entregasStore.alternarFeita(entrega)">Marcar como feita</button>
                <button type="button" class="botao-apagar" @click="modalAberto = true">Apagar</button>
            </div>
        </section>

        <section v-else class="cartao detalhe-cartao">
            <h2>Entrega não encontrada</h2>
            <p>Essa entrega não existe, ou já foi apagada.</p>
            <div class="detalhe-acoes">
                <RouterLink to="/" class="botao-voltar">Ir para a agenda</RouterLink>
            </div>
        </section>

        <ModalConfirmacao v-model="modalAberto" titulo="Apagar entrega?">
            <p>Depois de apagar, você volta para a agenda.</p>
            <template #botoes>
                <button type="button" class="botao-apagar-confirmacao" @click="apagarEstaEntrega">Apagar</button>
            </template>
        </ModalConfirmacao>

    </main>
</template>
