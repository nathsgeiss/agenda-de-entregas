<script setup>
import { useRouter } from 'vue-router';
import FormularioEntrega from '../components/FormularioEntrega.vue';
import { adicionarEntrega } from '../entregas.js';

const router = useRouter();

function lidarComAdicao(nova) {
    adicionarEntrega(nova);
    router.push('/');
}
</script>

<template>
    <div class="painel" style="max-width: 600px;">
        <FormularioEntrega @adicionar="lidarComAdicao" />
    </div>
</template>