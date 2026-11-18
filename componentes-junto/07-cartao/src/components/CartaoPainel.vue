<!--
    A moldura de um cartão do painel: a caixa branca e o título.

    O <slot> é um buraco no template: tudo o que for escrito entre
    <CartaoPainel> e </CartaoPainel>, lá no App, aparece no lugar
    dele.

    E a class que o App coloca no <CartaoPainel> (class="resumo",
    por exemplo) vai parar sozinha na <section>, junto com a
    class="cartao". O CSS do grid continua funcionando.
-->
<script setup>
defineProps({
    titulo: String
});
</script>

<template>
    <section class="cartao">
        <h2>{{ titulo }}</h2>
        <slot></slot>
    </section>
</template>
