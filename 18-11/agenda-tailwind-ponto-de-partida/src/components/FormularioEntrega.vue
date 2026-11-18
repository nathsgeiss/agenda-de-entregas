<!--
    O formulário de nova entrega. Os campos moram aqui; quando a
    entrega está pronta, o formulário avisa o App com o evento
    adicionar, levando a entrega junto.
-->
<script setup>
import { ref } from 'vue';

const emit = defineEmits(['adicionar']);

const materia = ref('');
const tipo = ref('');
const data = ref('');

function enviarEntrega(evento) {
    const entrega = {
        id: Date.now(),
        materia: materia.value.trim(),
        tipo: tipo.value,
        data: data.value,
        feita: false
    };

    // O required já barra o campo vazio. Só espaços, não.
    if (entrega.materia === '') {
        return;
    }

    emit('adicionar', entrega);
    limparFormulario(evento.target);
}

function limparFormulario(formulario) {
    materia.value = '';
    tipo.value = '';
    data.value = '';
    formulario.reset();
}
</script>

<template>
    <form class="formulario" @submit.prevent="enviarEntrega">
        <fieldset>
            <legend>Nova entrega</legend>

            <p>
                <label for="materia">Matéria</label>
                <input type="text" id="materia" class="campo-materia" v-model="materia" placeholder="Ex.: Matemática" required>
            </p>

            <p>
                <label for="tipo">Tipo</label>
                <select id="tipo" class="campo-tipo" v-model="tipo" required>
                    <option value="">Escolha o tipo</option>
                    <option value="prova">Prova</option>
                    <option value="trabalho">Trabalho</option>
                    <option value="apresentacao">Apresentação</option>
                </select>
            </p>

            <p>
                <label for="data">Data</label>
                <input type="date" id="data" class="campo-data" v-model="data" required>
            </p>

            <button type="submit" class="botao-adicionar">Adicionar</button>
        </fieldset>
    </form>
</template>
