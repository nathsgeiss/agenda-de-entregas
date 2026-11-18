<!--
    Etapa 5 — as contas: computed, :class e v-if

    computed é um valor calculado a partir de outros. O Vue
    guarda o resultado e só refaz a conta quando gastos muda.
    O template fica mais curto: {{ total }} no lugar da conta.

    :class="{ estourado: estourou }" coloca a classe quando
    estourou é true e tira quando é false. Some o par
    classList.add / classList.remove.

    v-if / v-else: só um dos dois elementos existe na página.
    Com a lista vazia, aparece o traço; com gastos, o texto.
-->
<script setup>
import { ref, computed } from 'vue';
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
    montarErroDoGasto
} from './calculos.js';

const ORCAMENTO = 50;

const CATEGORIAS = [
    { nome: 'Alimentação' },
    { nome: 'Transporte' },
    { nome: 'Lazer' }
];

// A única coisa que o programa lembra.
const gastos = ref([
    { id: 1, descricao: 'lanche', valor: 12.5, categoria: 'Alimentação' },
    { id: 2, descricao: 'ônibus', valor: 4.35, categoria: 'Transporte' },
    { id: 3, descricao: 'cinema', valor: 30, categoria: 'Lazer' }
]);

// Os campos do formulário, ligados com v-model.
const descricao = ref('');
const valor = ref('');
const categoria = ref('');
const erro = ref('');

// Calculados a partir de gastos. Mudou a lista, o Vue refaz.
const total = computed(() => calcularTotal(gastos.value));
const media = computed(() => calcularMedia(total.value, gastos.value.length));
const estourou = computed(() => passouDoOrcamento(total.value, ORCAMENTO));
const mensagemDoOrcamento = computed(() => montarMensagemDoOrcamento(ORCAMENTO - total.value));

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
            <ul class="categorias"></ul>
        </section>

        <section class="cartao historico-cartao">
            <h2>Histórico</h2>

            <p class="filtro">
                <label for="filtro">Mostrar</label>
                <select id="filtro" class="campo-filtro">
                    <option value="Todas">Todas as categorias</option>
                    <option value="Alimentação">Só Alimentação</option>
                    <option value="Transporte">Só Transporte</option>
                    <option value="Lazer">Só Lazer</option>
                </select>
            </p>
            <table class="tabela-historico">
                <caption class="legenda-historico">{{ montarTextoDoFiltro(gastos.length, gastos.length) }}</caption>
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
                    <tr v-for="(gasto, posicao) in gastos" :key="gasto.id" :data-categoria="gasto.categoria">
                        <td>{{ posicao + 1 }}</td>
                        <td>{{ gasto.descricao }}</td>
                        <td><span class="etiqueta">{{ gasto.categoria }}</span></td>
                        <td>{{ formatarReais(gasto.valor) }}</td>
                        <td>
                            <button type="button" class="botao-apagar" :aria-label="'Apagar ' + gasto.descricao">
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
                        <td class="total-rodape">{{ formatarReais(total) }}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
            <button type="button" class="botao-desfazer">Desfazer último gasto</button>
        </section>

    </main>
</template>
