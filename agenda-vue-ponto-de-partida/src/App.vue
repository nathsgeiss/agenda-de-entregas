<script setup>
import { ref, computed, watch } from 'vue';
import {
    ordenarPorData,
    filtrarPendentes,
    montarTextoDaProxima,
    passaNoFiltro
} from './agenda.js';
import ResumoAgenda from './components/ResumoAgenda.vue';
import ItemEntrega from './components/ItemEntrega.vue';
import FormularioEntrega from './components/FormularioEntrega.vue';

const CHAVE = 'agenda-de-entregas-vue';

// As entregas de exemplo, para a primeira vez que a página abre.
const ENTREGAS_INICIAIS = [
    { id: 1, materia: 'Matemática', tipo: 'prova', data: '2026-11-18', feita: false },
    { id: 2, materia: 'História', tipo: 'trabalho', data: '2026-11-25', feita: false },
    { id: 3, materia: 'Português', tipo: 'trabalho', data: '2026-11-10', feita: true },
    { id: 4, materia: 'Inglês', tipo: 'apresentacao', data: '2026-11-20', feita: false }
];

function carregarEntregas() {
    const salvas = localStorage.getItem(CHAVE);
    if (salvas === null) {
        return ENTREGAS_INICIAIS;
    }
    return JSON.parse(salvas);
}

function salvarEntregas(lista) {
    localStorage.setItem(CHAVE, JSON.stringify(lista));
}

const entregas = ref(carregarEntregas());

// Toda mudança na lista é salva.
watch(entregas, salvarEntregas, { deep: true });

const tipoEscolhido = ref('todos');

const pendentes = computed(() => filtrarPendentes(entregas.value).length);
const proxima = computed(() => montarTextoDaProxima(entregas.value));
const mostradas = computed(() => ordenarPorData(entregas.value.filter((entrega) => passaNoFiltro(entrega, tipoEscolhido.value))));

// A entrega chega pronta do FormularioEntrega.
function adicionarEntrega(entrega) {
    entregas.value.push(entrega);
}

// O ! inverte: true vira false, e false vira true.
function alternarFeita(entrega) {
    entrega.feita = !entrega.feita;
}

// A lista da tela está ordenada: procura a entrega na lista de verdade.
function apagarEntrega(entrega) {
    entregas.value.splice(entregas.value.indexOf(entrega), 1);
}
</script>

<template>
    <header class="topo">
        <h1>Agenda de entregas</h1>
        <p>Provas, trabalhos e apresentações em um só lugar.</p>
    </header>

    <main class="painel">

        <ResumoAgenda :pendentes="pendentes" :proxima="proxima" />

        <section class="cartao nova-entrega">
            <FormularioEntrega @adicionar="adicionarEntrega" />
        </section>

        <section class="cartao entregas">
            <h2>Próximas entregas</h2>

            <p class="filtro">
                <label for="filtro">Mostrar</label>
                <select id="filtro" class="campo-filtro" v-model="tipoEscolhido">
                    <option value="todos">Tudo</option>
                    <option value="prova">Só provas</option>
                    <option value="trabalho">Só trabalhos</option>
                    <option value="apresentacao">Só apresentações</option>
                </select>
            </p>

            <ul class="lista">
                <ItemEntrega
                    v-for="entrega in mostradas"
                    :key="entrega.id"
                    :entrega="entrega"
                    @alternar="alternarFeita"
                    @apagar="apagarEntrega"
                />
            </ul>
        </section>

    </main>

    <footer class="rodape">
        <p>Feito por Gui</p>
    </footer>
</template>
