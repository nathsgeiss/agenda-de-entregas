<!--
    Etapa 9 — salvar no navegador: watch

    watch(gastos, ...) chama uma função toda vez que a lista
    muda: adicionar, apagar, desfazer. É ali que salvamos no
    localStorage. O deep: true faz o watch perceber também as
    mudanças DENTRO da lista (um push, um splice).

    Ao abrir a página, a lista começa com o que estava salvo.
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
    montarErroDoGasto,
    filtrarGastos,
    calcularTotalDaCategoria,
    calcularPorcentagem
} from './calculos.js';

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

// Os campos do formulário, ligados com v-model.
const descricao = ref('');
const valor = ref('');
const categoria = ref('');
const erro = ref('');

// A categoria escolhida no filtro, ligada com v-model.
const categoriaEscolhida = ref('Todas');

// Calculados a partir de gastos. Mudou a lista, o Vue refaz.
const total = computed(() => calcularTotal(gastos.value));
const media = computed(() => calcularMedia(total.value, gastos.value.length));
const estourou = computed(() => passouDoOrcamento(total.value, ORCAMENTO));
const mensagemDoOrcamento = computed(() => montarMensagemDoOrcamento(ORCAMENTO - total.value));

// Os gastos que aparecem na tabela.
const mostrados = computed(() => filtrarGastos(gastos.value, categoriaEscolhida.value));

// Uma barra para cada categoria: o nome, o total e a porcentagem.
const barras = computed(() => CATEGORIAS.map((cadaCategoria) => {
    const totalDaCategoria = calcularTotalDaCategoria(gastos.value, cadaCategoria.nome);
    return {
        nome: cadaCategoria.nome,
        total: totalDaCategoria,
        porcentagem: calcularPorcentagem(totalDaCategoria, total.value)
    };
}));

function adicionarGasto(evento) {
    const gasto = {
        id: Date.now(),   // os milissegundos desde 1970: um número que não se repete
        descricao: descricao.value.trim(),
        valor: Number(valor.value),
        categoria: categoria.value
    };

    erro.value = montarErroDoGasto(gasto);

    if (erro.value === '') {
        gastos.value.push(gasto);
        limparFormulario(evento.target);
    }
}

// Esvazia os refs (e, com eles, os campos). O reset() é só
// para o :user-invalid não deixar os campos vazios em vermelho.
function limparFormulario(formulario) {
    descricao.value = '';
    valor.value = '';
    categoria.value = '';
    formulario.reset();
}

// A tabela pode estar filtrada: procura o gasto na lista de
// verdade, como fazíamos na agenda.
function apagarGasto(gasto) {
    gastos.value.splice(gastos.value.indexOf(gasto), 1);
}

function desfazerUltimoGasto() {
    gastos.value.pop();
}
</script>

<template>
    <header class="topo">
        <h1>Pra onde foi meu dinheiro?</h1>
        <p>Registre seus gastos e descubra.</p>
    </header>

    <main class="painel">

        <section class="cartao novo-gasto">
            <form class="formulario" @submit.prevent="adicionarGasto">
                <fieldset>
                    <legend>Novo gasto</legend>

                    <p>
                        <label for="descricao">Descrição</label>
                        <input type="text" id="descricao" class="campo-descricao" v-model="descricao" placeholder="Ex.: lanche" required>
                    </p>

                    <p>
                        <label for="valor">Valor (R$)</label>
                        <input type="number" id="valor" class="campo-valor" v-model="valor" step="0.01" min="0.01" placeholder="Ex.: 12.50" required>
                    </p>

                    <p>
                        <label for="categoria">Categoria</label>
                        <select id="categoria" class="campo-categoria" v-model="categoria" required>
                            <option value="">Escolha a categoria</option>
                            <option v-for="categoria in CATEGORIAS" :key="categoria.nome" :value="categoria.nome">
                                {{ categoria.nome }}
                            </option>
                        </select>
                    </p>

                    <button type="submit">Adicionar</button>

                    <p class="erro">{{ erro }}</p>
                </fieldset>
            </form>
        </section>

        <section class="cartao resumo">
            <h2>Resumo</h2>

            <div class="indicadores">
                <div class="indicador">
                    <span class="rotulo">Total gasto</span>
                    <strong class="total" :class="{ estourado: estourou }">{{ formatarReais(total) }}</strong>
                </div>

                <div class="indicador">
                    <span class="rotulo">Gastos registrados</span>
                    <strong class="quantidade">{{ gastos.length }}</strong>
                </div>

                <div class="indicador">
                    <span class="rotulo">Média por gasto</span>
                    <strong class="media">{{ formatarReais(media) }}</strong>
                </div>

                <div class="indicador">
                    <span class="rotulo">Maior gasto</span>
                    <strong v-if="gastos.length === 0" class="maior">—</strong>
                    <strong v-else class="maior">{{ montarTextoDoGasto(calcularMaiorGasto(gastos)) }}</strong>
                </div>

                <div class="indicador">
                    <span class="rotulo">Menor gasto</span>
                    <strong v-if="gastos.length === 0" class="menor">—</strong>
                    <strong v-else class="menor">{{ montarTextoDoGasto(calcularMenorGasto(gastos)) }}</strong>
                </div>
            </div>

            <div class="orcamento">
                <span class="rotulo">Orçamento da semana: {{ formatarReais(ORCAMENTO) }}</span>
                <strong class="restante" :class="{ estourado: estourou }">{{ mensagemDoOrcamento }}</strong>
            </div>
        </section>

        <section class="cartao categorias-cartao">
            <h2>Por categoria</h2>
            <ul class="categorias">
                <li v-for="barra in barras" :key="barra.nome" :data-categoria="barra.nome">
                    <div class="legenda-da-barra">
                        <span>{{ barra.nome }}</span>
                        <strong>{{ formatarReais(barra.total) }} ({{ Math.round(barra.porcentagem) }}%)</strong>
                    </div>
                    <!-- O trilho é só desenho: o número já está na legenda. -->
                    <div class="trilho" aria-hidden="true">
                        <div class="barra" :style="{ width: barra.porcentagem + '%' }"></div>
                    </div>
                </li>
            </ul>
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
                    <!-- Uma linha para cada gasto. O :key ajuda o Vue a
                         saber qual linha é de qual gasto. -->
                    <tr v-for="(gasto, posicao) in mostrados" :key="gasto.id" :data-categoria="gasto.categoria">
                        <td>{{ posicao + 1 }}</td>
                        <td>{{ gasto.descricao }}</td>
                        <td><span class="etiqueta">{{ gasto.categoria }}</span></td>
                        <td>{{ formatarReais(gasto.valor) }}</td>
                        <td>
                            <button type="button" class="botao-apagar" :aria-label="'Apagar ' + gasto.descricao" @click="apagarGasto(gasto)">
                                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                                    <path d="M6 6 L18 18 M18 6 L6 18"
                                          stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                                </svg>
                            </button>
                        </td>
                    </tr>
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
