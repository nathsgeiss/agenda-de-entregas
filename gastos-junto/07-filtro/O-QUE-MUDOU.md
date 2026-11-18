# Etapa 7 · o filtro

**Arquivos modificados**

- `src/App.vue`:
  - `categoriaEscolhida = ref('Todas')` e `v-model` no select do filtro;
  - `mostrados`, um `computed` com `filtrarGastos`;
  - a tabela faz o `v-for` em `mostrados`;
  - a legenda e o rodapé usam `mostrados`.

**Como fica:** "Só Lazer" mostra só o cinema; a legenda diz "Mostrando 1 de
3 gastos", e o rodapé soma só o que aparece. O resumo continua contando
todos.

**No JavaScript antigo, era assim**

```js
let categoriaEscolhida = 'Todas';

campoFiltro.addEventListener('change', function () {
    categoriaEscolhida = campoFiltro.value;
    renderizar();
});
```

E a `renderizarHistorico` percorria todos os gastos com `if`, para manter a
posição certa no apagar.

**No Vue**

```js
const categoriaEscolhida = ref('Todas');
const mostrados = computed(() => filtrarGastos(gastos.value, categoriaEscolhida.value));
```

**O que explicar:** o `computed` depende de duas coisas, `gastos` e
`categoriaEscolhida`. Qualquer uma que mude, o Vue refaz a lista. Teste:
com "Só Lazer", adicione um gasto de Lazer, e ele aparece na hora.
