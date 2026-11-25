<!--
    O cartão do resumo: quantas entregas pendentes e qual é a
    próxima. Recebe os valores prontos, por props. Com o destino,
    a próxima entrega vira um link para a página dela.
-->
<script setup>
defineProps({
    pendentes: Number,
    proxima: String,
    destino: { type: String, default: '' }
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
                <strong class="proxima">
                    <RouterLink v-if="destino" :to="destino">{{ proxima }}</RouterLink>
                    <span v-else>{{ proxima }}</span>
                </strong>
            </p>
        </div>
    </section>
</template>
