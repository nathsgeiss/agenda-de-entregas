<!--
    Um quadradinho do resumo: um rótulo e um valor.

    As props são os dados que o componente recebe de quem o usa,
    como os parâmetros de uma função. Elas são só para leitura:
    o componente mostra o que recebeu, mas não muda.

    Com a prop destino, o valor vira um link para outra página.
-->
<script setup>
defineProps({
    rotulo: String,
    valor: [String, Number],
    estourado: { type: Boolean, default: false },
    destino: { type: String, default: '' }
});
</script>

<template>
    <div class="indicador">
        <span class="rotulo">{{ rotulo }}</span>
        <strong :class="{ estourado: estourado }">
            <RouterLink v-if="destino" :to="destino">{{ valor }}</RouterLink>
            <span v-else>{{ valor }}</span>
        </strong>
    </div>
</template>
