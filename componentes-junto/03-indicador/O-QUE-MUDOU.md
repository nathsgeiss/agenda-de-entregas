# Etapa 3 · props: o IndicadorResumo

**Arquivos modificados**

- `src/components/IndicadorResumo.vue`: **novo**. Um quadradinho do resumo,
  com três props: `rotulo`, `valor` e `estourado`.
- `src/App.vue`:
  - os cinco `<div class="indicador">` viraram cinco `<IndicadorResumo>`;
  - dois `computed` novos, `textoDoMaior` e `textoDoMenor`, que fazem o que
    o `v-if` / `v-else` fazia (o traço com a lista vazia).

**Como fica:** igual, com o total vermelho quando estoura.

**Antes**

```html
<div class="indicador">
    <span class="rotulo">Total gasto</span>
    <strong class="total" :class="{ estourado: estourou }">{{ formatarReais(total) }}</strong>
</div>
```

(e mais quatro iguais, mudando o rótulo e o valor)

**Agora**

```html
<IndicadorResumo rotulo="Total gasto" :valor="formatarReais(total)" :estourado="estourou" />
```

**O que explicar**

- `defineProps` declara o que o componente recebe, como os parâmetros de
  uma função. Quem usa passa os valores como atributos.
- `rotulo="Total gasto"`, sem `:`, passa o texto. `:valor="..."`, com `:`,
  passa o resultado do JavaScript: a mesma regra do `:data-categoria`.
- O `estourado` tem `default: false`: quem não passa, recebe `false`. Por
  isso só o total passa essa prop.
- As props são só para leitura: o componente mostra, não muda.
