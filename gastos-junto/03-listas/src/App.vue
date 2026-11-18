<!--
    Etapa 3 — as listas: v-for e :

    v-for repete o elemento uma vez para cada item da lista. É o
    for + createElement + appendChild do código antigo, escrito
    direto no HTML.

    O : na frente de um atributo (:value, :key, :data-categoria)
    quer dizer: o valor é JavaScript, e não um texto fixo.

    (Da etapa 2: {{ }} mostra o resultado de uma expressão, e o
    ref guarda um dado que a tela acompanha.)

    O <script setup> é o JavaScript do app. Tudo o que ele cria
    (constantes, variáveis, funções importadas) pode ser usado
    direto no <template>.

    {{ }} mostra o resultado de uma expressão no meio do HTML.
    Faz o papel do textContent: em vez de procurar o elemento e
    trocar o texto, escrevemos a conta no lugar do texto.
-->
<script setup>
import { ref } from 'vue';
import {
    formatarReais,
    calcularMedia,
    montarTextoDoGasto,
    montarMensagemDoOrcamento,
    calcularTotal,
    calcularMaiorGasto,
    calcularMenorGasto,
    montarTextoDoFiltro
} from './calculos.js';

const ORCAMENTO = 50;

const CATEGORIAS = [
    { nome: 'Alimentação' },
    { nome: 'Transporte' },
    { nome: 'Lazer' }
];

// A única coisa que o programa lembra. O ref avisa o Vue: quando
// esta lista mudar, a tela que depende dela é desenhada de novo.
// Por enquanto, com três gastos de exemplo. O id é um número
// diferente para cada gasto: é ele que vai no :key.
const gastos = ref([
    { id: 1, descricao: 'lanche', valor: 12.5, categoria: 'Alimentação' },
    { id: 2, descricao: 'ônibus', valor: 4.35, categoria: 'Transporte' },
    { id: 3, descricao: 'cinema', valor: 30, categoria: 'Lazer' }
]);
</script>

<template>
    <header class="topo">
        <h1>Pra onde foi meu dinheiro?</h1>
        <p>Registre seus gastos e descubra.</p>
    </header>

    <main class="painel">

        <section class="cartao novo-gasto">
            <form class="formulario">
                <fieldset>
                    <legend>Novo gasto</legend>

                    <p>
                        <label for="descricao">Descrição</label>
                        <input type="text" id="descricao" class="campo-descricao" placeholder="Ex.: lanche" required>
                    </p>

                    <p>
                        <label for="valor">Valor (R$)</label>
                        <input type="number" id="valor" class="campo-valor" step="0.01" min="0.01" placeholder="Ex.: 12.50" required>
                    </p>

                    <p>
                        <label for="categoria">Categoria</label>
                        <select id="categoria" class="campo-categoria" required>
                            <option value="">Escolha a categoria</option>
                            <option v-for="categoria in CATEGORIAS" :key="categoria.nome" :value="categoria.nome">
                                {{ categoria.nome }}
                            </option>
                        </select>
                    </p>

                    <button type="submit">Adicionar</button>

                    <p class="erro"></p>
                </fieldset>
            </form>
        </section>

        <section class="cartao resumo">
            <h2>Resumo</h2>

            <div class="indicadores">
                <div class="indicador">
                    <span class="rotulo">Total gasto</span>
                    <strong class="total">{{ formatarReais(calcularTotal(gastos)) }}</strong>
                </div>

                <div class="indicador">
                    <span class="rotulo">Gastos registrados</span>
                    <strong class="quantidade">{{ gastos.length }}</strong>
                </div>

                <div class="indicador">
                    <span class="rotulo">Média por gasto</span>
                    <strong class="media">{{ formatarReais(calcularMedia(calcularTotal(gastos), gastos.length)) }}</strong>
                </div>

                <div class="indicador">
                    <span class="rotulo">Maior gasto</span>
                    <strong class="maior">{{ montarTextoDoGasto(calcularMaiorGasto(gastos)) }}</strong>
                </div>

                <div class="indicador">
                    <span class="rotulo">Menor gasto</span>
                    <strong class="menor">{{ montarTextoDoGasto(calcularMenorGasto(gastos)) }}</strong>
                </div>
            </div>

            <div class="orcamento">
                <span class="rotulo">Orçamento da semana: {{ formatarReais(ORCAMENTO) }}</span>
                <strong class="restante">{{ montarMensagemDoOrcamento(ORCAMENTO - calcularTotal(gastos)) }}</strong>
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
                        <td class="total-rodape">{{ formatarReais(calcularTotal(gastos)) }}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
            <button type="button" class="botao-desfazer">Desfazer último gasto</button>
        </section>

    </main>
</template>
