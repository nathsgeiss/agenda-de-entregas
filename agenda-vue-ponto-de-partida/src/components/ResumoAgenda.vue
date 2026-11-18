<!--
    O cartão do resumo: quantas entregas pendentes e qual é a
    próxima. Recebe os dois valores prontos, por props.
-->
<script setup>
defineProps({
    pendentes: Number,
    proxima: String
});
</script>

<template>
    <section class="cartao resumo">
        <h2>Resumo</h2>

        <div class="indicadores">
            <p class="indicador">
                <span class="rotulo">Pendentes</span>
                <strong class="pendentes">{{ pendentes }}</strong>
            </p>

            <p class="indicador">
                <span class="rotulo">Próxima entrega</span>
                <strong class="proxima">{{ proxima }}</strong>
            </p>
        </div>
    </section>
</template>
