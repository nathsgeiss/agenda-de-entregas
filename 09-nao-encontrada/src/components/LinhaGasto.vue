<!--
    Uma linha da tabela do histórico.

    O botão de apagar fica aqui, mas a lista de gastos é do App.
    O componente não mexe nela: ele só AVISA que alguém clicou,
    com um evento (emit). Quem usa o componente decide o que
    fazer, escutando com @apagar.
-->
<script setup>
import { formatarReais } from '../calculos.js';

defineProps({
    gasto: Object,
    numero: Number
});

// Os eventos que este componente pode avisar a quem o usa.
const emit = defineEmits(['apagar']);
</script>

<template>
    <tr :data-categoria="gasto.categoria">
        <td>{{ numero }}</td>
        <!-- A descrição leva para a página do gasto: /gasto/3 -->
        <td><RouterLink :to="`/gasto/${gasto.id}`">{{ gasto.descricao }}</RouterLink></td>
        <td><span class="etiqueta">{{ gasto.categoria }}</span></td>
        <td>{{ formatarReais(gasto.valor) }}</td>
        <td>
            <button type="button" class="botao-apagar" :aria-label="'Apagar ' + gasto.descricao" @click="emit('apagar', gasto)">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path d="M6 6 L18 18 M18 6 L6 18"
                          stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                </svg>
            </button>
        </td>
    </tr>
</template>
