<!--
    Uma entrega da lista.

    A lista de entregas é do App: o item não muda nada nela, nem a
    própria entrega. Ele só avisa: emit('alternar', entrega) quando
    clicam em Feita ou Reabrir, e emit('apagar', entrega) quando
    clicam em Apagar.
-->
<script setup>
import { formatarData, nomearTipo } from '../agenda.js';

defineProps({
    entrega: Object
});

const emit = defineEmits(['alternar', 'apagar']);
</script>

<template>
    <li class="entrega" :class="{ feita: entrega.feita }" :data-tipo="entrega.tipo">
        <span class="data">{{ formatarData(entrega.data) }}</span>
        <div class="info">
            <!-- A matéria leva para a página da entrega: /entrega/2 -->
            <RouterLink :to="`/entrega/${entrega.id}`" class="materia">{{ entrega.materia }}</RouterLink>
            <span class="etiqueta">{{ nomearTipo(entrega.tipo) }}</span>
        </div>
        <div class="acoes">
            <button v-if="entrega.feita" type="button" class="botao-feita" @click="emit('alternar', entrega)">Reabrir</button>
            <button v-else type="button" class="botao-feita" @click="emit('alternar', entrega)">Feita</button>
            <button type="button" class="botao-apagar" @click="emit('apagar', entrega)">Apagar</button>
        </div>
    </li>
</template>
