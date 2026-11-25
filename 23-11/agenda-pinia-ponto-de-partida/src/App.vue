<!--
    A moldura: o cabeçalho, o menu e o rodapé ficam; a página aparece
    no RouterView. O menu tem as setas de voltar e avançar, para quando
    os botões do navegador não estão à vista (tela cheia, app instalado).
-->
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function voltarPagina() {
    router.back();
}

function avancarPagina() {
    router.forward();
}
</script>

<template>
    <header class="topo">
        <h1>Agenda de entregas</h1>
        <p>Provas, trabalhos e apresentações em um só lugar.</p>
    </header>

    <nav class="menu">
        <button type="button" class="botao-navegar" aria-label="Voltar" @click="voltarPagina">←</button>
        <RouterLink to="/">Agenda</RouterLink>
        <RouterLink to="/nova">Nova entrega</RouterLink>
        <RouterLink to="/tipos">Por tipo</RouterLink>
        <button type="button" class="botao-navegar" aria-label="Avançar" @click="avancarPagina">→</button>
    </nav>

    <RouterView />

    <footer class="rodape">
        <p>Feito por Gui</p>
    </footer>
</template>
