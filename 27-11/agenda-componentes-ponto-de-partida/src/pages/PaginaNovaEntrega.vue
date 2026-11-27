<!--
    A página Nova entrega, no endereço /nova.
    Depois de adicionar, volta para a agenda.
-->
<script setup>
import { useRouter } from 'vue-router';
import FormularioEntrega from '../components/FormularioEntrega.vue';
import { useEntregasStore } from '../stores/entregas.js';

const router = useRouter();
const entregasStore = useEntregasStore();

function registrarEntrega(entrega) {
    entregasStore.adicionarEntrega(entrega);
    router.push('/');
}
</script>

<template>
    <main class="painel">
        <section class="cartao nova-entrega">
            <FormularioEntrega @adicionar="registrarEntrega" />
        </section>
    </main>
</template>
