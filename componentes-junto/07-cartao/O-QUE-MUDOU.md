# Etapa 7 · slot: o CartaoPainel

**Arquivos modificados**

- `src/components/CartaoPainel.vue`: **novo**. A moldura do cartão: a
  `<section class="cartao">` e o `<h2>` com a prop `titulo`, e um `<slot>`
  no lugar do conteúdo.
- `src/App.vue`: os cartões Resumo, Por categoria e Histórico usam
  `<CartaoPainel titulo="..." class="...">`.

**Como fica:** igual.

**O que explicar**

- O `<slot>` é um buraco no template do componente. O que se escreve entre
  `<CartaoPainel>` e `</CartaoPainel>` aparece no lugar dele.
- A `class="resumo"` escrita no `<CartaoPainel>` vai sozinha para a
  `<section>` de dentro, junto com a `class="cartao"`. Por isso o grid do
  CSS continua funcionando. (Confira no inspetor: `class="cartao resumo"`.)
- O cartão Novo gasto ficou de fora: ele usa a `<legend>` do formulário no
  lugar do `<h2>`.

**No fim:** o `App.vue` tem 177 linhas, e cada pedaço da tela tem o seu
arquivo, num total de seis componentes.
