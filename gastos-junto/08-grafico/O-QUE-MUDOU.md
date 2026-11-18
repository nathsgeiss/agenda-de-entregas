# Etapa 8 · o gráfico: `:style`

**Arquivos modificados**

- `src/App.vue`:
  - `barras`, um `computed` que monta, com `map`, um objeto por categoria:
    o nome, o total e a porcentagem;
  - o cartão "Por categoria" repete um `<li>` por barra, com `v-for`;
  - a largura de cada barra vem de `:style`.

**Como fica:** com os três gastos de exemplo, Alimentação 27%, Transporte
9% e Lazer 64%. A barra cresce ao adicionar um gasto.

**No JavaScript antigo, era assim:** a `criarBarraDaCategoria`, com nove
elementos criados à mão, e `barra.style.width = porcentagem + '%'`.

**No Vue**

```html
<div class="barra" :style="{ width: barra.porcentagem + '%' }"></div>
```

**O que explicar:** o `:style` recebe um objeto com as propriedades do CSS.
O `map` (visto em 19/10) transforma a lista de categorias numa lista de
barras.
