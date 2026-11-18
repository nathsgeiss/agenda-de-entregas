<!--
    A página Histórico, no endereço /historico.
    O filtro, a tabela e o desfazer.
-->
<script setup>
import { ref, computed } from 'vue';
import { formatarReais, calcularTotal, montarTextoDoFiltro, passaNoFiltro } from '../calculos.js';
import LinhaGasto from '../components/LinhaGasto.vue';
import CartaoPainel from '../components/CartaoPainel.vue';
import { gastos, apagarGasto, desfazerUltimoGasto } from '../gastos.js';

// A categoria escolhida no filtro, ligada com v-model.
const categoriaEscolhida = ref('Todas');

// Os gastos que aparecem na tabela.
const mostrados = computed(() =>
    gastos.value.filter((gasto) => passaNoFiltro(gasto, categoriaEscolhida.value)));
</script>

<template>
    <main class="painel">

        <CartaoPainel titulo="Histórico" class="historico-cartao">
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
                    <LinhaGasto
                        v-for="(gasto, posicao) in mostrados"
                        :key="gasto.id"
                        :gasto="gasto"
                        :numero="posicao + 1"
                        @apagar="apagarGasto"
                    />
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
        </CartaoPainel>

    </main>
</template>
