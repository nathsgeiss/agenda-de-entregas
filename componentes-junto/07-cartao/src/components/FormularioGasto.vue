<!--
    O formulário de novo gasto.

    Os campos são assunto só do formulário: os refs dos campos e
    do erro moraram aqui dentro. Quando o gasto está pronto e
    válido, o formulário avisa o App com o evento adicionar,
    levando o gasto junto. Quem guarda o gasto na lista é o App.
-->
<script setup>
import { ref } from 'vue';
import { montarErroDoGasto } from '../calculos.js';

defineProps({
    categorias: Array
});

const emit = defineEmits(['adicionar']);

const descricao = ref('');
const valor = ref('');
const categoria = ref('');
const erro = ref('');

function enviarGasto(evento) {
    const gasto = {
        id: Date.now(),
        descricao: descricao.value.trim(),
        valor: Number(valor.value),
        categoria: categoria.value
    };

    erro.value = montarErroDoGasto(gasto);

    if (erro.value === '') {
        emit('adicionar', gasto);
        limparFormulario(evento.target);
    }
}

// O reset() é só para o :user-invalid não deixar os campos vazios em vermelho.
function limparFormulario(formulario) {
    descricao.value = '';
    valor.value = '';
    categoria.value = '';
    formulario.reset();
}
</script>

<template>
    <form class="formulario" @submit.prevent="enviarGasto">
        <fieldset>
            <legend>Novo gasto</legend>

            <p>
                <label for="descricao">Descrição</label>
                <input type="text" id="descricao" class="campo-descricao" v-model="descricao" placeholder="Ex.: lanche" required>
            </p>

            <p>
                <label for="valor">Valor (R$)</label>
                <input type="number" id="valor" class="campo-valor" v-model="valor" step="0.01" min="0.01" placeholder="Ex.: 12.50" required>
            </p>

            <p>
                <label for="categoria">Categoria</label>
                <select id="categoria" class="campo-categoria" v-model="categoria" required>
                    <option value="">Escolha a categoria</option>
                    <option v-for="cadaCategoria in categorias" :key="cadaCategoria.nome" :value="cadaCategoria.nome">
                        {{ cadaCategoria.nome }}
                    </option>
                </select>
            </p>

            <button type="submit">Adicionar</button>

            <p class="erro">{{ erro }}</p>
        </fieldset>
    </form>
</template>
