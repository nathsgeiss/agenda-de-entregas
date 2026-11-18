# Etapa 4 · um componente com contas próprias: o gráfico

**Arquivos modificados**

- `src/components/GraficoCategorias.vue`: **novo**. Recebe `gastos` e
  `categorias` por props, e o `computed` das barras veio junto.
- `src/App.vue`:
  - o `<ul class="categorias">` virou
    `<GraficoCategorias :gastos="gastos" :categorias="CATEGORIAS" />`;
  - saíram o `computed` `barras` e o import da `calcularPorcentagem`, que só
    o gráfico usa.

**Como fica:** igual. Adicione um gasto: as barras mudam, porque o gráfico
recebe a mesma lista `gastos`.

**O que explicar**

- No `<script>` do componente, as props ficam dentro de `props`
  (`props.gastos`), por isso o `const props = defineProps(...)`. No
  `<template>`, é só o nome.
- O componente importa de `'../calculos.js'`: os `..` sobem da pasta
  `components` para a `src`.
- O ganho: o `App.vue` não sabe mais como as porcentagens são calculadas.
  Cada um cuida do seu (a ideia do "bom módulo" de segunda).
