<script setup>
import { ref } from 'vue';

const emit = defineEmits(['adicionar']);

const materia = ref('');
const tipo = ref('');
const data = ref('');

function enviarEntrega() {
    const materiaVal = materia.value.trim();
    if (!materiaVal || !tipo.value || !data.value) return;

    const novaEntrega = {
        id: Date.now(),
        materia: materiaVal,
        tipo: tipo.value,
        data: data.value,
        feita: false
    };

    emit('adicionar', novaEntrega);
    limparFormulario();
}

function limparFormulario() {
    materia.value = '';
    tipo.value = '';
    data.value = '';
}
</script>

<template>
    <section class="cartao nova-entrega">
        <form class="formulario" @submit.prevent="enviarEntrega">
            <fieldset>
                <legend>Nova entrega</legend>

                <p>
                    <label for="materia">Matéria</label>
                    <input 
                        type="text" 
                        id="materia" 
                        class="campo-materia" 
                        placeholder="Ex.: Matemática" 
                        v-model="materia"
                        required
                    >
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
    </section>
</template>