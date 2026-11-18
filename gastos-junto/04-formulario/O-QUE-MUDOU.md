# Etapa 4 · o formulário: `v-model` e `@submit`

**Arquivos modificados**

- `src/App.vue`:
  - quatro `ref` novos: `descricao`, `valor`, `categoria` e `erro`;
  - `v-model` nos três campos;
  - `@submit.prevent="adicionarGasto"` no `<form>`;
  - `{{ erro }}` no parágrafo do erro;
  - as funções `adicionarGasto` e `limparFormulario`.

**Como fica:** adicione "pipoca", 12,50, Alimentação. A linha aparece na
tabela, e o resumo muda sozinho: total R$ 59,35, 4 gastos, "Passou R$ 9,35
do orçamento".

**O momento da aula:** abra a `adicionarGasto`. Ela faz o `push` e limpa o
formulário. **Não chama nenhuma `renderizar()`.** No código antigo, todo
ouvinte terminava em `renderizar()`; se alguém esquecesse, a tela ficava
desatualizada. Aqui, a tabela, o resumo e o orçamento dependem de
`gastos`: mudou a lista, o Vue redesenha.

**O que explicar**

- `v-model="descricao"`: o que se digita vai para o `ref`, e o que o
  código põe no `ref` aparece no campo. Some o `campoDescricao.value`.
- `@submit.prevent`: o `@` é o `addEventListener`; o `.prevent` é o
  `evento.preventDefault()`.
- O `id: Date.now()`: os milissegundos desde 1970, um número que não se
  repete entre dois cliques.
- O `formulario.reset()` continua só por causa do `:user-invalid`: sem ele,
  os campos ficariam vermelhos depois de limpos.

**Teste:** uma descrição só com espaços mostra "Só espaços não vale.". O
estourado ainda não fica vermelho: é a etapa 5.
