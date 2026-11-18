<script setup>
import { ref, computed, watch } from 'vue';
import { 
    ordenarPorData, 
    filtrarPendentes, 
    passaNoFiltro, 
    montarTextoDaProxima 
} from './agenda.js';

import ResumoAgenda from './components/ResumoAgenda.vue';
import FormularioEntrega from './components/FormularioEntrega.vue';
import ItemEntrega from './components/ItemEntrega.vue';

const CHAVE_STORAGE = 'agenda-de-entregas';

const entregasPadrao = [
    { id: 1, materia: 'Matemática', tipo: 'prova', data: '2026-11-18', feita: false },
    { id: 2, materia: 'História', tipo: 'trabalho', data: '2026-11-25', feita: false },
    { id: 3, materia: 'Português', tipo: 'trabalho', data: '2026-11-10', feita: true },
    { id: 4, materia: 'Inglês', tipo: 'apresentacao', data: '2026-11-20', feita: false }
];

function carregarEntregas() {
    const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);
    if (dadosSalvos) {
        try {
            return JSON.parse(dadosSalvos);
        } catch (e) {
            console.error('Erro ao ler do localStorage', e);
        }
    }
    return [...entregasPadrao];
}

const entregas = ref(carregarEntregas());
const filtroEscolhido = ref('todos');

// Computed properties
const totalPendentes = computed(() => filtrarPendentes(entregas.value).length);
const totalFeitas = computed(() => entregas.value.filter(e => e.feita).length);
const textoProximaEntrega = computed(() => montarTextoDaProxima(entregas.value));

const entregasFiltradasEOrdenadas = computed(() => {
    const filtradas = entregas.value.filter(entrega => passaNoFiltro(entrega, filtroEscolhido.value));
    return ordenarPorData(filtradas);
});

// Ações
function adicionarEntrega(nova) {
    entregas.value.push(nova);
}

function alternarFeita(entregaAlvo) {
    const entrega = entregas.value.find(e => e.id === entregaAlvo.id);
    if (entrega) {
        entrega.feita = !entrega.feita;
    }
}

function apagarEntrega(entregaAlvo) {
    const indice = entregas.value.findIndex(e => e.id === entregaAlvo.id);
    if (indice !== -1) {
        entregas.value.splice(indice, 1);
    }
}

function apagarFeitas() {
    entregas.value = entregas.value.filter(e => !e.feita);
}

// Watcher
watch(
    entregas,
    (novasEntregas) => {
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(novasEntregas));
    },
    { deep: true }
);
</script>

<template>
    <header class="topo">
        <h1>Agenda de entregas</h1>
        <p>Provas, trabalhos e apresentações em um só lugar.</p>
    </header>

    <main class="painel">

        <!-- Passo 1: Resumo em Componente -->
        <ResumoAgenda 
            :pendentes="totalPendentes"
            :feitas="totalFeitas"
            :proxima="textoProximaEntrega"
            @limpar-feitas="apagarFeitas"
        />

        <!-- Passo 3: Formulário em Componente -->
        <FormularioEntrega @adicionar="adicionarEntrega" />

        <!-- Lista de Entregas -->
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
                <!-- Passo 2: Item da Lista em Componente com v-for e emits -->
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

    </main>

    <footer class="rodape">
        <p>Feito por Gui</p>
    </footer>
</template>