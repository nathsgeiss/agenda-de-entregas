<!--
    Novo gasto, etapa 3 de 3, no endereço /novo/confirmar.

    O router.go(n) anda n páginas no histórico do navegador:
    go(-1) é o mesmo que back(), e go(-2) volta duas de uma vez,
    direto para a etapa 1.
-->
<script setup>
import { useRouter } from 'vue-router';
import { formatarReais } from '../calculos.js';
import { adicionarGasto } from '../gastos.js';
import { rascunho, limparRascunho } from '../rascunho.js';

const router = useRouter();

function corrigirDescricaoEValor() {
    router.go(-2);
}

function corrigirCategoria() {
    router.go(-1);
}

function confirmarGasto() {
    adicionarGasto({
        id: Date.now(),
        descricao: rascunho.value.descricao.trim(),
        valor: Number(rascunho.value.valor),
        categoria: rascunho.value.categoria
    });
    limparRascunho();
    router.push('/historico');
}
</script>

<template>
    <main class="painel">
        <section v-if="rascunho.descricao && rascunho.categoria" class="cartao novo-gasto" :data-categoria="rascunho.categoria">
            <h2>Novo gasto · 3 de 3</h2>

            <p class="detalhe-descricao">{{ rascunho.descricao }}</p>
            <p class="detalhe-valor">{{ formatarReais(Number(rascunho.valor)) }}</p>
            <p><span class="etiqueta">{{ rascunho.categoria }}</span></p>

            <div class="assistente-acoes">
                <button type="button" class="botao-voltar" @click="corrigirDescricaoEValor">Corrigir descrição e valor</button>
                <button type="button" class="botao-voltar" @click="corrigirCategoria">Corrigir categoria</button>
            </div>
            <button type="button" class="botao-confirmar" @click="confirmarGasto">Adicionar</button>
        </section>

        <section v-else class="cartao novo-gasto">
            <h2>Nenhum gasto em andamento</h2>
            <p>Comece pela primeira etapa.</p>
            <div class="detalhe-acoes">
                <RouterLink to="/novo" class="botao-voltar">Começar um gasto</RouterLink>
            </div>
        </section>
    </main>
</template>
