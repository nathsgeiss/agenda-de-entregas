# Etapa 2 · os dados na tela: `ref` e `{{ }}`

**Arquivos modificados**

- `src/calculos.js`: **novo**. As funções que só devolvem, copiadas do
  `script.js` antigo **sem mudar uma linha**, só com `export` na frente.
  (Ficou de fora a `montarOpcoesDeCategorias`: na etapa 3, o `v-for` faz o
  trabalho dela.)
- `src/App.vue`: ganhou o `<script setup>`, com:
  - os imports das funções;
  - `const ORCAMENTO = 50`;
  - `const gastos = ref([...])`, com três gastos de exemplo.
- No `<template>`: o resumo e o orçamento mostram as contas com `{{ }}`.

**Como fica:** total R$ 46,85, 3 gastos, média R$ 15,62, maior "cinema —
R$ 30,00", menor "ônibus — R$ 4,35", e R$ 3,15 disponíveis.

**No JavaScript antigo, era assim**

```js
const telaTotal = document.querySelector('.total');
telaTotal.textContent = formatarReais(total);
```

**No Vue**

```html
<strong class="total">{{ formatarReais(calcularTotal(gastos)) }}</strong>
```

**O que explicar**

- O `<script setup>`: tudo o que ele cria pode ser usado no `<template>`.
- O `ref`: uma caixa que o Vue observa. No `<script>`, o conteúdo está em
  `gastos.value`; no `<template>`, é só `gastos` (o Vue abre a caixa
  sozinho).
- Os módulos de segunda-feira de novo: `calculos.js` exporta, `App.vue`
  importa.
