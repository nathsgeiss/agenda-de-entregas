<script setup>
import { ref, computed, watch } from 'vue';
import {
    formatarData,
    nomearTipo,
    ordenarPorData,
    filtrarPendentes,
    montarTextoDaProxima,
    passaNoFiltro
} from './agenda.js';

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

const materia = ref('');
const tipo = ref('');
const data = ref('');

function adicionarEntrega(evento) {
    const entrega = {
        id: Date.now(),
        materia: materia.value.trim(),
        tipo: tipo.value,
        data: data.value,
        feita: false
    };

    // O required já barra o campo vazio. Só espaços, não.
    if (entrega.materia === '') {
        return;
    }

    entregas.value.push(entrega);
    limparFormulario(evento.target);
}

function limparFormulario(formulario) {
    materia.value = '';
    tipo.value = '';
    data.value = '';
    formulario.reset();
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

        <section class="cartao resumo">
            <h2>Resumo</h2>

            <div class="indicadores">
                <p class="indicador">
                    <span class="rotulo">Pendentes</span>
                    <strong class="pendentes">{{ pendentes }}</strong>
                </p>

                <p class="indicador">
                    <span class="rotulo">Próxima entrega</span>
                    <strong class="proxima">{{ proxima }}</strong>
                </p>
            </div>
        </section>

        <section class="cartao nova-entrega">
            <form class="formulario" @submit.prevent="adicionarEntrega">
                <fieldset>
                    <legend>Nova entrega</legend>

                    <p>
                        <label for="materia">Matéria</label>
                        <input type="text" id="materia" class="campo-materia" v-model="materia" placeholder="Ex.: Matemática" required>
                    </p>

                    <p>
                        <label for="tipo">Tipo</label>
                        <select id="tipo" class="campo-tipo" v-model="tipo" required>
                            <option value="">Escolha o tipo</option>
                            <option value="prova">Prova</option>
                            <option value="trabalho">Trabalho</option>
                            <option value="apresentacao">Apresentação</option>
                        </select>
                    </p>

                    <p>
                        <label for="data">Data</label>
                        <input type="date" id="data" class="campo-data" v-model="data" required>
                    </p>

                    <button type="submit" class="botao-adicionar">Adicionar</button>
                </fieldset>
            </form>
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
                <li v-for="entrega in mostradas" :key="entrega.id" class="entrega" :class="{ feita: entrega.feita }" :data-tipo="entrega.tipo">
                    <span class="data">{{ formatarData(entrega.data) }}</span>
                    <div class="info">
                        <strong class="materia">{{ entrega.materia }}</strong>
                        <span class="etiqueta">{{ nomearTipo(entrega.tipo) }}</span>
                    </div>
                    <div class="acoes">
                        <button v-if="entrega.feita" type="button" class="botao-feita" @click="alternarFeita(entrega)">Reabrir</button>
                        <button v-else type="button" class="botao-feita" @click="alternarFeita(entrega)">Feita</button>
                        <button type="button" class="botao-apagar" @click="apagarEntrega(entrega)">Apagar</button>
                    </div>
                </li>
            </ul>
        </section>

    </main>

    <footer class="rodape">
        <p>Feito por Gui</p>
    </footer>
</template>
