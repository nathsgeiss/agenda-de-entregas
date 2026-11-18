# Etapa 5 · as contas: `computed`, `:class` e `v-if`

**Arquivos modificados**

- `src/App.vue`:
  - `total`, `media`, `estourou` e `mensagemDoOrcamento` viraram `computed`;
  - o `<template>` usa esses nomes no lugar das contas;
  - `:class="{ estourado: estourou }"` no total e no restante;
  - o maior e o menor com `v-if` / `v-else`, para a lista vazia.

**Como fica:** igual à etapa 4, mas agora, passando dos R$ 50,00, o total e
o restante ficam vermelhos. Ao adicionar o quarto gasto de exemplo, a cor
muda na hora.

**No JavaScript antigo, era assim**

```js
if (passouDoOrcamento(total, ORCAMENTO)) {
    telaTotal.classList.add('estourado');
    telaRestante.classList.add('estourado');
} else {
    telaTotal.classList.remove('estourado');
    telaRestante.classList.remove('estourado');
}
```

**No Vue**

```js
const estourou = computed(() => passouDoOrcamento(total.value, ORCAMENTO));
```

```html
<strong class="total" :class="{ estourado: estourou }">{{ formatarReais(total) }}</strong>
```

**O que explicar**

- `computed`: um valor calculado a partir de outros. O Vue refaz a conta
  quando o que ela usa muda. Dentro do `computed`, é `gastos.value` e
  `total.value` (estamos no `<script>`).
- `:class="{ estourado: estourou }"`: a classe entra quando o valor é
  `true` e sai quando é `false`. Funciona junto com o `class` fixo.
- `v-if` / `v-else`: só um dos dois existe na página. Sem ele, com a lista
  vazia, a `calcularMaiorGasto` devolveria `undefined`, e a página
  quebraria (aparece na etapa 6, ao apagar tudo).
