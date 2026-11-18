<!--
    Um quadradinho do resumo: um rótulo e um valor.

    As props são os dados que o componente recebe de quem o usa,
    como os parâmetros de uma função. Elas são só para leitura:
    o componente mostra o que recebeu, mas não muda.
-->
<script setup>
defineProps({
    rotulo: String,
    valor: [String, Number],
    estourado: { type: Boolean, default: false }
});
</script>

<template>
    <div class="indicador">
        <span class="rotulo">{{ rotulo }}</span>
        <strong :class="{ estourado: estourado }">{{ valor }}</strong>
    </div>
</template>
