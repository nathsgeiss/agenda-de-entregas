<!--
    Novo gasto, etapa 1 de 3, no endereço /novo: descrição e valor.

    Os campos escrevem direto no rascunho (rascunho.js). O Próximo
    só avança com os campos válidos: o @submit não acontece se o
    required ou o min não deixarem.
-->
<script setup>
import { useRouter } from 'vue-router';
import { rascunho } from '../rascunho.js';

const router = useRouter();

function irParaCategoria() {
    router.push('/novo/categoria');
}
</script>

<template>
    <main class="painel">
        <section class="cartao novo-gasto">
            <form class="formulario" @submit.prevent="irParaCategoria">
                <fieldset>
                    <legend>Novo gasto · 1 de 3</legend>

                    <p>
                        <label for="descricao">Descrição</label>
                        <input type="text" id="descricao" class="campo-descricao" v-model="rascunho.descricao" placeholder="Ex.: lanche" required>
                    </p>

                    <p>
                        <label for="valor">Valor (R$)</label>
                        <input type="number" id="valor" class="campo-valor" v-model="rascunho.valor" step="0.01" min="0.01" placeholder="Ex.: 12.50" required>
                    </p>

                    <button type="submit">Próximo</button>
                </fieldset>
            </form>
        </section>
    </main>
</template>
