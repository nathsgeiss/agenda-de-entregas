# Etapa 9 · salvar no navegador: `watch`

**Arquivos modificados**

- `src/App.vue`:
  - `CHAVE` e `GASTOS_DE_EXEMPLO`;
  - as funções `carregarGastos` e `salvarGastos`;
  - `gastos` começa com `carregarGastos()`;
  - `watch(gastos, salvarGastos, { deep: true })`.

**Como fica:** adicione um gasto e recarregue a página: ele continua lá.

**No JavaScript antigo, era assim:** na agenda, a `renderizar()` chamava a
`salvarEntregas()`, porque toda mudança passava por ela.

**No Vue:** não existe `renderizar()`. O lugar de salvar é o `watch`, que
chama uma função toda vez que `gastos` muda.

**O que explicar**

- `watch(o que observar, o que fazer)`.
- `{ deep: true }`: sem ele, o `watch` só perceberia se a lista inteira
  fosse trocada. Com ele, percebe também um `push`, um `splice` ou um
  `pop`.
- Para voltar aos exemplos: no console, `localStorage.clear()` e recarregar.
