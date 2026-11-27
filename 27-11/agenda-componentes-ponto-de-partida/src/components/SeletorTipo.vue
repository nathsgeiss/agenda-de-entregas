<script setup>
import SeletorOpcoes from './SeletorOpcoes.vue';

const tipo = defineModel();
const TIPOS = [
    { valor: 'prova', nome: 'Prova' },
    { valor: 'trabalho', nome: 'Trabalho' },
    { valor: 'apresentacao', nome: 'Apresentação' }
];
</script>

<template>
    <SeletorOpcoes v-model="tipo" :opcoes="TIPOS" rotulo="Tipo de entrega" />
</template>
