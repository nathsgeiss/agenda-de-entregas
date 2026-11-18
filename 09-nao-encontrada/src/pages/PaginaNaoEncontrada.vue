<!--
    A página de qualquer endereço que não existe: /#/qualquer-coisa.
    A rota dela, /:pathMatch(.*)*, aceita qualquer caminho. O Router
    só a usa quando nenhuma outra rota serve.
-->
<script setup>
import CartaoPainel from '../components/CartaoPainel.vue';
</script>

<template>
    <main class="painel">
        <CartaoPainel titulo="Página não encontrada" class="detalhe-cartao">
            <p>Não existe nenhuma página neste endereço.</p>
            <div class="detalhe-acoes">
                <RouterLink to="/" class="botao-voltar">Ir para o resumo</RouterLink>
            </div>
        </CartaoPainel>
    </main>
</template>
