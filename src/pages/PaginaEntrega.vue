<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { entregas, alternarFeita, apagarEntrega } from '../entregas.js';
import { formatarData } from '../agenda.js';

const route = useRoute();
const router = useRouter();

const entrega = computed(() => {
    const id = Number(route.params.id);
    return entregas.value.find(e => e.id === id);
});

function voltar() {
    router.back();
}

function alternarStatus() {
    if (entrega.value) {
        alternarFeita(entrega.value.id);
    }
}

function apagarEvoltar() {
    if (entrega.value) {
        apagarEntrega(entrega.value.id);
        router.replace('/');
    }
}
</script>

<template>
    <div class="painel" style="max-width: 600px;">
        <section class="cartao" v-if="entrega" :data-tipo="entrega.tipo">
            <h2>Detalhes da Entrega</h2>

            <p style="margin-bottom: 12px;">
                <span class="rotulo">Matéria</span>
                <strong style="font-size: 20px;" :style="{ textDecoration: entrega.feita ? 'line-through' : 'none' }">
                    {{ entrega.materia }}
                </strong>
            </p>

            <p style="margin-bottom: 12px;">
                <span class="rotulo">Tipo</span>
                <span class="etiqueta">{{ entrega.tipo }}</span>
            </p>

            <p style="margin-bottom: 20px;">
                <span class="rotulo">Data</span>
                <strong>{{ formatarData(entrega.data) }}</strong>
            </p>

            <p style="margin-bottom: 20px;">
                <span class="rotulo">Status</span>
                <strong>{{ entrega.feita ? 'Feita' : 'Pendente' }}</strong>
            </p>

            <div class="acoes" style="display: flex; gap: 10px;">
                <button type="button" class="btn-acao" @click="voltar" style="padding: 10px 16px;">
                    Voltar
                </button>
                <button type="button" class="btn-acao" @click="alternarStatus" style="padding: 10px 16px;">
                    {{ entrega.feita ? 'Reabrir' : 'Marcar como feita' }}
                </button>
                <button type="button" class="botao-apagar" @click="apagarEvoltar" style="padding: 10px 16px;">
                    Apagar
                </button>
            </div>
        </section>

        <section class="cartao" v-else>
            <h2>Entrega não encontrada</h2>
            <p style="color: var(--cor-suave); margin-bottom: 20px;">O ID informado não corresponde a nenhuma entrega existente.</p>
            <button type="button" class="botao-adicionar" @click="router.replace('/')">Voltar para a agenda</button>
        </section>
    </div>
</template>