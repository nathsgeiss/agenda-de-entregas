# Etapa 6 · apagar e desfazer: `@click`

**Arquivos modificados**

- `src/App.vue`:
  - `@click="apagarGasto(gasto)"` no botão de cada linha;
  - `@click="desfazerUltimoGasto"` e `:disabled="gastos.length === 0"` no
    desfazer;
  - as funções `apagarGasto` e `desfazerUltimoGasto`.

**Como fica:** o X apaga a linha, o desfazer tira o último, e, com a lista
vazia, o desfazer fica desabilitado e o maior e o menor mostram "—".

**No JavaScript antigo, era assim:** cada linha criava o seu botão, com
`createElement`, e o seu `addEventListener`, que guardava a posição. E o
desfazer tinha o ouvinte dele, mais a linha
`botaoDesfazer.disabled = gastos.length === 0` dentro da `renderizar()`.

**O que explicar**

- `@click="apagarGasto(gasto)"`: dentro do `v-for`, cada botão chama a
  função com o gasto da sua linha.
- `apagarGasto` procura o gasto com `indexOf`, e não usa a posição da
  tabela: na etapa 7, a tabela vai estar filtrada, e a posição dela não é a
  mesma da lista de verdade. (A turma fez igual na agenda.)
- `:disabled`: qualquer atributo pode receber `:`. O botão habilita e
  desabilita sozinho.
