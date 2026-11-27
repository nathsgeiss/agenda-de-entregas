<script setup>
defineProps({
    opcoes: { type: Array, required: true },
    rotulo: { type: String, default: 'Escolher opção' }
});

const escolhido = defineModel();
</script>

<template>
    <div class="seletor-opcoes" role="group" :aria-label="rotulo">
        <button
            v-for="opcao in opcoes"
            :key="opcao.valor"
            type="button"
            class="seletor-botao"
            :class="{ selecionado: escolhido === opcao.valor }"
            :aria-pressed="escolhido === opcao.valor"
            @click="escolhido = opcao.valor"
        >{{ opcao.nome }}</button>
    </div>
</template>
