# Etapa 5 · emits: a LinhaGasto

**Arquivos modificados**

- `src/components/LinhaGasto.vue`: **novo**. Uma linha da tabela, com as
  props `gasto` e `numero`, e o evento `apagar`.
- `src/App.vue`: o `<tr v-for>` virou um `<LinhaGasto v-for>`, que escuta
  `@apagar="apagarGasto"`.

**Como fica:** igual. O X continua apagando a linha certa, inclusive com o
filtro ligado.

**O que explicar (o ponto mais difícil da aula)**

- A lista `gastos` é do `App`. A linha não pode apagar nada da lista: ela
  nem tem a lista, só um gasto.
- Então a linha **avisa**: `emit('apagar', gasto)`. É como o
  `addEventListener` ao contrário: o componente cria o próprio evento.
- Quem usa a linha escuta com `@apagar`, como escutaria um `@click`, e
  decide o que fazer. A `apagarGasto` recebe o gasto que veio no aviso.
- **Os dados descem pelas props; os avisos sobem pelos eventos.**

**Erre ao vivo:** troque o `emit('apagar', gasto)` por
`gastos.value = gastos.value.filter(...)` dentro da `LinhaGasto`. Não existe `gastos` ali: é o
erro que mostra por que o aviso é necessário.
