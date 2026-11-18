<script setup>
import { ref, computed } from 'vue';
import { 
    ordenarPorData, 
    filtrarPendentes, 
    passaNoFiltro, 
    encontrarProxima 
} from '../agenda.js';
import { entregas, alternarFeita, apagarEntrega, apagarFeitas } from '../entregas.js';

import ResumoAgenda from '../components/ResumoAgenda.vue';
import ItemEntrega from '../components/ItemEntrega.vue';

const filtroEscolhido = ref('todos');

const totalPendentes = computed(() => filtrarPendentes(entregas.value).length);
const totalFeitas = computed(() => entregas.value.filter(e => e.feita).length);
const objetoProxima = computed(() => encontrarProxima(entregas.value));

const entregasFiltradasEOrdenadas = computed(() => {
    const filtradas = entregas.value.filter(entrega => passaNoFiltro(entrega, filtroEscolhido.value));
    return ordenarPorData(filtradas);
});
</script>

<template>
    <div class="painel">
        <ResumoAgenda 
            :pendentes="totalPendentes"
            :feitas="totalFeitas"
            :proxima="objetoProxima"
            @limpar-feitas="apagarFeitas"
        />

        <section class="cartao entregas">
            <h2>Próximas entregas</h2>

            <p class="filtro">
                <label for="filtro">Mostrar</label>
                <select id="filtro" class="campo-filtro" v-model="filtroEscolhido">
                    <option value="todos">Tudo</option>
                    <option value="prova">Só provas</option>
                    <option value="trabalho">Só trabalhos</option>
                    <option value="apresentacao">Só apresentações</option>
                </select>
            </p>

            <ul class="lista" v-if="entregasFiltradasEOrdenadas.length > 0">
                <ItemEntrega 
                    v-for="entrega in entregasFiltradasEOrdenadas" 
                    :key="entrega.id"
                    :entrega="entrega"
                    @alternar="alternarFeita"
                    @apagar="apagarEntrega"
                />
            </ul>

            <p v-else style="text-align: center; color: var(--cor-suave); padding: 20px 0;">
                Nada por aqui.
            </p>
        </section>
    </div>
</template>