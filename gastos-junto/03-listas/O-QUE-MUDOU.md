# Etapa 3 · as listas: `v-for` e `:`

**Arquivos modificados**

- `src/App.vue`:
  - `CATEGORIAS`, igual à do código antigo;
  - cada gasto de exemplo ganhou um `id`;
  - o select de categoria monta as opções com `v-for`;
  - a tabela monta uma linha por gasto com `v-for`;
  - a legenda e o rodapé da tabela usam `{{ }}`.

**Como fica:** a tabela mostra os três gastos, com a faixa e a etiqueta da
cor da categoria. O select tem as três categorias.

**No JavaScript antigo, era assim:** `criarLinhaDoHistorico`, com
`createElement`, `setAttribute`, `textContent` e `appendChild`, umas 35
linhas; mais um `for` dentro da `renderizarHistorico`.

**No Vue**

```html
<tr v-for="(gasto, posicao) in gastos" :key="gasto.id" :data-categoria="gasto.categoria">
    <td>{{ posicao + 1 }}</td>
    <td>{{ gasto.descricao }}</td>
    ...
</tr>
```

**O que explicar**

- `v-for="gasto in gastos"`: repete o elemento para cada item. O
  `(gasto, posicao)` dá também a posição, como o `i` do `for`.
- O `:` antes do atributo: o valor é JavaScript. `:data-categoria` é o
  `setAttribute('data-categoria', ...)`. Sem o `:`, o atributo teria o
  texto "gasto.categoria" escrito.
- O `:key`: um valor diferente para cada item, para o Vue saber qual linha
  é de qual gasto. Por isso o `id`.
