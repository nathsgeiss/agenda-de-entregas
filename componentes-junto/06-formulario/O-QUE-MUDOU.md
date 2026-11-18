# Etapa 6 · o formulário

**Arquivos modificados**

- `src/components/FormularioGasto.vue`: **novo**. Os quatro `ref`
  (descrição, valor, categoria e erro), a validação e o
  `limparFormulario` foram para lá. Recebe `categorias` por prop e emite
  `adicionar` com o gasto pronto.
- `src/App.vue`:
  - o `<form>` inteiro virou
    `<FormularioGasto :categorias="CATEGORIAS" @adicionar="adicionarGasto" />`;
  - a `adicionarGasto` agora recebe o gasto e só faz o `push`;
  - saíram os `ref` dos campos e o import da `montarErroDoGasto`.

**Como fica:** igual. Só espaços continua mostrando "Só espaços não vale.".

**O que explicar**

- Os campos são assunto só do formulário: o `App` não precisa saber o que
  está sendo digitado, só quando um gasto novo fica pronto.
- O `App.vue` caiu de 237 para 181 linhas nesta etapa.
- A função dentro do formulário se chama `enviarGasto`, e não
  `adicionarGasto`: o formulário não adiciona nada, ele envia o aviso.
