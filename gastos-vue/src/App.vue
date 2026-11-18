<script setup>
import { computed, ref, watch } from 'vue';

const orcamento = 500;

const gastos = ref([]);

function salvarGastos() {
  localStorage.setItem('gastos', JSON.stringify(gastos.value));
}

watch(gastos, salvarGastos, { deep: true });

function calcularTotal(gastos) {
  const somenteValoresGastos = gastos.map((gasto) => gasto.valor);
  // console.log(`[calcularTotal] somenteValoresGastos: ${somenteValoresGastos}`);
  return somenteValoresGastos.reduce((total, num) => total + num, 0);
}

const total = computed(
  () => calcularTotal(gastos.value),
);
const ultrapassouOrcamento = computed(()=> total.value >= orcamento);
const categoriasGasto = ['Alimentacao', 'Lazer', 'Transporte', 'Saude'];

// function adicionarGasto() {
//   const identificadorGasto = Math.floor(Math.random() * 1000);
//   const indexCategoria = Math.floor(Math.random() * 4);
//   console.log(`indexCategoria: ${indexCategoria}`);
//   const gasto = {
//     id: identificadorGasto, 
//     descricao: `gasto ${identificadorGasto}`, 
//     valor: identificadorGasto,
//     categoria: categoriasGasto[indexCategoria]
//   }
//   gastos.value.push(gasto);
// }

// function removerGasto() {
//   if (gastos.value.length > 0) {
//     gastos.value.pop();
//   }
// }

const descricao = ref('');
const valor = ref(0.0);
const categoria = ref('Alimentacao');
function adicionarGasto() {
  // console.log(`descricao: ${descricao.value}, valor: ${valor.value}, categoria: ${categoria.value}`);
  const identificadorGasto = Math.floor(Math.random() * 1000);
  gastos.value.push({
    'id': identificadorGasto,
    'descricao': descricao.value,
    'valor': valor.value,
    'categoria': categoria.value,
  });
}
</script>

<template>
  <strong>{{ gastos.length }} gastos — total: {{ total }}</strong>
  <!-- <button @click="adicionarGasto()">Adicionar gasto</button>
  <button @click="removerGasto()">Remover gasto</button> -->
  <form @submit.prevent="adicionarGasto">
    <input type="text" v-model="descricao">
    <input type="number" v-model="valor">
    <select name="categorias" id="categorias" v-model="categoria">
      <option value="Alimentacao">Alimentacao</option>
      <option value="Lazer">Lazer</option>
      <option value="Transporte">Transporte</option>
      <option value="Saude">Saude</option>
    </select>
    <input type="submit">
  </form>

  <p v-if="gastos.length === 0">Nenhum gasto cadastrado</p>
  <table v-else :class="{ estourado: ultrapassouOrcamento }">
    <tr v-for="(gasto, index) in gastos" :key="gasto.id" :data-categoria="gasto.categoria">
      <td>{{ index }}</td>
      <td>{{ gasto.descricao }}</td>
      <td>{{ gasto.valor }}</td>
      <td>{{ gasto.categoria }}</td>
    </tr>
  </table>
</template>

<style scoped>
tr[data-categoria="Alimentacao"] { background-color: red;}
tr[data-categoria="Lazer"] { background-color: blue; }
tr[data-categoria="Transporte"] {background-color: orange;}
tr[data-categoria="Saude"] {background-color: green;}

table, tr, td .estourado {
  background-color: purple;
}
</style>
