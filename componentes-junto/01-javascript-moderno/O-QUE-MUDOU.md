# Etapa 1 · o JavaScript que o Vue usa

Depois do comparativo, e antes dos componentes: o `calculos.js` ainda tem
os `for` do projeto antigo. Agora vamos escrever esse código com os métodos
de lista que todo código Vue usa.

**Arquivos modificados**

- `src/calculos.js` (124 → 102 linhas):
  - `calcularTotal` troca o `for` pelo `reduce`;
  - **saem** a `filtrarGastos` e a `calcularTotalDaCategoria`.
- `src/App.vue`:
  - `mostrados` usa o `filter` direto, com a `passaNoFiltro` como regra;
  - no `computed` das barras, o total de cada categoria é
    `calcularTotal(gastosDaCategoria)`, depois de um `filter`;
  - `apagarGasto` troca o `indexOf` + `splice` por um `filter` pelo `id`.

**Como fica:** igual.

**Antes**

```js
export function calcularTotal(gastos) {
    let total = 0;
    for (let i = 0; i < gastos.length; i++) {
        total = total + gastos[i].valor;
    }
    return total;
}
```

**Agora**

```js
export function calcularTotal(gastos) {
    return gastos.reduce((soma, gasto) => soma + gasto.valor, 0);
}
```

**O que explicar**

- **Nada disso é do Vue.** `filter`, `map` e `reduce` são do JavaScript, e
  funcionariam no `script.js` antigo. Por isso esta etapa vem **depois** do
  comparativo: lá, só o Vue mudou.
- **O `reduce`:** passa por cada item levando um valor acumulado. Recebe uma
  função com dois parâmetros (o acumulado até agora e o item da vez), e o
  valor de começo (`0`). O que a função devolve vira o acumulado da próxima
  volta. Mostre a tabela da conta, volta a volta, com os três gastos de
  exemplo: 0 → 12,50 → 16,85 → 46,85.
- **Por que a `calcularTotalDaCategoria` saiu:** ela fazia duas coisas,
  filtrar e somar. Com `filter` e `calcularTotal`, o total de uma categoria é
  a soma de duas peças prontas.
- **Por que a `filtrarGastos` saiu:** com o `filter`, ela só embrulharia o
  `filter`. Quem guarda a regra do "Todas" é a `passaNoFiltro`, que continua.
- **O `apagarGasto` com `filter`:** cria uma lista nova, sem o gasto apagado,
  e troca a lista inteira (`gastos.value = ...`). O `watch` com `deep: true`
  percebe a troca e salva.
