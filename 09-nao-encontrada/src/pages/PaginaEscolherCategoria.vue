<!--
    Novo gasto, etapa 2 de 3, no endereço /novo/categoria.

    Se alguém abrir este endereço direto (ou recarregar a página),
    o rascunho está vazio: a página manda começar pela etapa 1.
-->
<script setup>
import { useRouter } from 'vue-router';
import { CATEGORIAS } from '../gastos.js';
import { rascunho } from '../rascunho.js';

const router = useRouter();

function voltarPagina() {
    router.back();
}

function irParaConfirmacao() {
    router.push('/novo/confirmar');
}
</script>

<template>
    <main class="painel">
        <section v-if="rascunho.descricao" class="cartao novo-gasto">
            <form class="formulario" @submit.prevent="irParaConfirmacao">
                <fieldset>
                    <legend>Novo gasto · 2 de 3</legend>

                    <p>
                        <label for="categoria">Categoria de "{{ rascunho.descricao }}"</label>
                        <select id="categoria" class="campo-categoria" v-model="rascunho.categoria" required>
                            <option value="">Escolha a categoria</option>
                            <option v-for="cadaCategoria in CATEGORIAS" :key="cadaCategoria.nome" :value="cadaCategoria.nome">
                                {{ cadaCategoria.nome }}
                            </option>
                        </select>
                    </p>

                    <div class="assistente-acoes">
                        <button type="button" class="botao-voltar" @click="voltarPagina">Voltar</button>
                        <button type="submit">Próximo</button>
                    </div>
                </fieldset>
            </form>
        </section>

        <section v-else class="cartao novo-gasto">
            <h2>Nenhum gasto em andamento</h2>
            <p>Comece pela primeira etapa.</p>
            <div class="detalhe-acoes">
                <RouterLink to="/novo" class="botao-voltar">Começar um gasto</RouterLink>
            </div>
        </section>
    </main>
</template>
