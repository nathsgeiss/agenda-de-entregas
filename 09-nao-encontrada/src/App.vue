<!--
    Etapa 6 — os botões de voltar e avançar do próprio app

    Em tela cheia (F11), num app instalado ou num totem, não existem
    os botões do navegador. Por isso o app tem os seus: o
    router.back() faz o mesmo que a seta de voltar do navegador, e o
    router.forward(), o mesmo que a de avançar.
-->
<script setup>
import { useRouter } from 'vue-router';
import CabecalhoApp from './components/CabecalhoApp.vue';

const router = useRouter();

function voltarPagina() {
    router.back();
}

function avancarPagina() {
    router.forward();
}
</script>

<template>
    <CabecalhoApp />

    <nav class="menu">
        <button type="button" class="botao-navegar" aria-label="Voltar" @click="voltarPagina">←</button>
        <RouterLink to="/">Resumo</RouterLink>
        <RouterLink to="/novo">Novo gasto</RouterLink>
        <RouterLink to="/historico">Histórico</RouterLink>
        <button type="button" class="botao-navegar" aria-label="Avançar" @click="avancarPagina">→</button>
    </nav>

    <RouterView />
</template>
