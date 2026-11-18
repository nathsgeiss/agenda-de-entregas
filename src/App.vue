<script setup>
import { ref, computed, watch } from 'vue';
import { 
    formatarData, 
    ordenarPorData, 
    filtrarPendentes, 
    passaNoFiltro, 
    montarTextoDaProxima 
} from './agenda.js';

// Chave do localStorage conforme o padrão do script antigo
const CHAVE_STORAGE = 'agenda-de-entregas';

// Dados padrão iniciais
const entregasPadrao = [
    { id: 1, materia: 'Matemática', tipo: 'prova', data: '2026-11-18', feita: false },
    { id: 2, materia: 'História', tipo: 'trabalho', data: '2026-11-25', feita: false },
    { id: 3, materia: 'Português', tipo: 'trabalho', data: '2026-11-10', feita: true },
    { id: 4, materia: 'Inglês', tipo: 'apresentacao', data: '2026-11-20', feita: false }
];

// Carregar dados salvos ou usar os padrões
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

// Estados reativos
const entregas = ref(carregarEntregas());
const filtroEscolhido = ref('todos');

// Campos do formulário de nova entrega
const novaMateria = ref('');
const novoTipo = ref('');
const novaData = ref('');

// Computed properties para o resumo e listagem filtrada/ordenada
const totalPendentes = computed(() => filtrarPendentes(entregas.value).length);

const totalFeitas = computed(() => entregas.value.filter(e => e.feita).length);

const textoProximaEntrega = computed(() => montarTextoDaProxima(entregas.value));

const entregasFiltradasEOrdenadas = computed(() => {
    const filtradas = entregas.value.filter(entrega => passaNoFiltro(entrega, filtroEscolhido.value));
    return ordenarPorData(filtradas);
});

// Funções de Ação
function adicionarEntrega() {
    const materiaVal = novaMateria.value.trim();
    if (!materiaVal || !novoTipo.value || !novaData.value) return;

    const nova = {
        id: Date.now(),
        materia: materiaVal,
        tipo: novoTipo.value,
        data: novaData.value,
        feita: false
    };

    entregas.value.push(nova);

    // Limpar formulário
    novaMateria.value = '';
    novoTipo.value = '';
    novaData.value = '';
}

function alternarFeita(id) {
    const entrega = entregas.value.find(e => e.id === id);
    if (entrega) {
        entrega.feita = !entrega.feita;
    }
}

function apagarEntrega(id) {
    const indice = entregas.value.findIndex(e => e.id === id);
    if (indice !== -1) {
        entregas.value.splice(indice, 1);
    }
}

function apagarFeitas() {
    entregas.value = entregas.value.filter(e => !e.feita);
}

// Watcher para salvar no localStorage automaticamente
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

        <!-- Resumo -->
        <section class="cartao resumo">
            <h2>Resumo</h2>

            <div class="indicadores" style="grid-template-columns: 1fr 1fr 1fr;">
                <p class="indicador">
                    <span class="rotulo">Pendentes</span>
                    <strong class="pendentes">{{ totalPendentes }}</strong>
                </p>

                <p class="indicador">
                    <span class="rotulo">Feitas</span>
                    <strong class="feitas">{{ totalFeitas }}</strong>
                </p>

                <p class="indicador" style="grid-column: span 2;">
                    <span class="rotulo">Próxima entrega</span>
                    <strong class="proxima">{{ textoProximaEntrega }}</strong>
                </p>
            </div>

            <div v-if="totalFeitas > 0" style="margin-top: 14px;">
                <button type="button" @click="apagarFeitas" class="botao-adicionar" style="background-color: var(--cor-suave); font-size: 14px; padding: 8px;">
                    Limpar entregas feitas
                </button>
            </div>
        </section>

        <!-- Formulário Nova Entrega -->
        <section class="cartao nova-entrega">
            <form class="formulario" @submit.prevent="adicionarEntrega">
                <fieldset>
                    <legend>Nova entrega</legend>

                    <p>
                        <label for="materia">Matéria</label>
                        <input 
                            type="text" 
                            id="materia" 
                            class="campo-materia" 
                            placeholder="Ex.: Matemática" 
                            v-model="novaMateria"
                            required
                        >
                    </p>

                    <p>
                        <label for="tipo">Tipo</label>
                        <select id="tipo" class="campo-tipo" v-model="novoTipo" required>
                            <option value="">Escolha o tipo</option>
                            <option value="prova">Prova</option>
                            <option value="trabalho">Trabalho</option>
                            <option value="apresentacao">Apresentação</option>
                        </select>
                    </p>

                    <p>
                        <label for="data">Data</label>
                        <input type="date" id="data" class="campo-data" v-model="novaData" required>
                    </p>

                    <button type="submit" class="botao-adicionar">Adicionar</button>
                </fieldset>
            </form>
        </section>

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
                <li 
                    v-for="entrega in entregasFiltradasEOrdenadas" 
                    :key="entrega.id" 
                    class="entrega"
                    :class="{ feita: entrega.feita }"
                    :data-tipo="entrega.tipo"
                >
                    <span class="data">{{ formatarData(entrega.data) }}</span>
                    
                    <div class="info">
                        <span class="materia">{{ entrega.materia }}</span>
                        <span class="etiqueta">{{ entrega.tipo }}</span>
                    </div>

                    <div class="acoes">
                        <button 
                            type="button" 
                            class="btn-acao" 
                            @click="alternarFeita(entrega.id)"
                        >
                            {{ entrega.feita ? 'Reabrir' : 'Feita' }}
                        </button>
                        <button 
                            type="button" 
                            class="botao-apagar" 
                            @click="apagarEntrega(entrega.id)"
                        >
                            Apagar
                        </button>
                    </div>
                </li>
            </ul>

            <!-- Estado de lista vazia (Desafio opcional) -->
            <p v-else style="text-align: center; color: var(--cor-suave); padding: 20px 0;">
                Nada por aqui.
            </p>
        </section>

    </main>

    <footer class="rodape">
        <p>Feito por Gui</p>
    </footer>
</template>