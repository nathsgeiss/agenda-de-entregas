<!--
    Etapa 2 — os dados na tela: ref e {{ }}

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
    calcularMenorGasto
} from './calculos.js';

const ORCAMENTO = 50;

// A única coisa que o programa lembra. O ref avisa o Vue: quando
// esta lista mudar, a tela que depende dela é desenhada de novo.
// Por enquanto, com três gastos de exemplo.
const gastos = ref([
    { descricao: 'lanche', valor: 12.5, categoria: 'Alimentação' },
    { descricao: 'ônibus', valor: 4.35, categoria: 'Transporte' },
    { descricao: 'cinema', valor: 30, categoria: 'Lazer' }
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
                        <select id="categoria" class="campo-categoria" required></select>
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
                <caption class="legenda-historico"></caption>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Valor</th>
                        <th>Apagar</th>
                    </tr>
                </thead>
                <tbody class="historico"></tbody>
                <tfoot>
                    <tr>
                        <th colspan="3">Total</th>
                        <td class="total-rodape">R$ 0,00</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
            <button type="button" class="botao-desfazer">Desfazer último gasto</button>
        </section>

    </main>
</template>
