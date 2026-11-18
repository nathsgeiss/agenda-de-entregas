# Agenda de entregas — agora com Vue

Lembram da agenda de entregas? Provas, trabalhos e apresentações, com o
botão Feita, o filtro e tudo salvo no navegador. Agora é a sua vez de
fazer **o clone dela em Vue**, sozinho, do mesmo jeito que fizemos o
controle de gastos.

O HTML e o CSS são os da agenda antiga (na pasta `agenda-js`, se você não
tiver mais o seu). O que você vai reescrever é o JavaScript, com as ideias
do Vue que vimos hoje. O `gastos-vue-passo-a-passo.md` continua valendo
como consulta: cada passo daqui tem um pedaço parecido lá.

![A agenda em Vue, no fim](imagens/agenda-vue.png)

---

## Passo 1 — O projeto e a página parada

1. Crie o projeto e rode:

   ```
   npm create vite@latest agenda-vue -- --template vue
   cd agenda-vue
   npm install
   npm run dev
   ```

2. Faça a mesma limpeza do pedaço 1 do controle de gastos:
   - apague as pastas `src/components` e `src/assets`;
   - o `App.vue` fica só com um `<template>`, e dentro dele vai o que estava
     no `<body>` do `index.html` da agenda (o `<header>`, o `<main>` e o
     `<footer>`);
   - o `src/style.css` vira o `style.css` da agenda;
   - o `index.html` ganha o `lang="pt-BR"` e o título "Agenda de entregas".

**Funcionou se:** a agenda aparece com o visual de sempre, mas com a lista
vazia e parada.

> Travou na criação do projeto? Use a pasta `agenda-vue-ponto-de-partida`,
> que é este passo pronto (`npm install` e `npm run dev` dentro dela).

---

## Passo 2 — A lista e o resumo

1. Crie o `src/agenda.js` com as funções que só devolvem, do `script.js`
   da agenda: `formatarData`, `nomearTipo`, `ordenarPorData`,
   `filtrarPendentes`, `passaNoFiltro` e `montarTextoDaProxima`. Iguais,
   só com `export`.
2. No `App.vue`, um `<script setup>` que importa o `ref` e as funções, e
   cria a lista com as entregas de exemplo. Cada uma ganha um `id`:

   ```js
   const entregas = ref([
       { id: 1, materia: 'Matemática', tipo: 'prova', data: '2026-11-18', feita: false },
       { id: 2, materia: 'História', tipo: 'trabalho', data: '2026-11-25', feita: false },
       { id: 3, materia: 'Português', tipo: 'trabalho', data: '2026-11-10', feita: true },
       { id: 4, materia: 'Inglês', tipo: 'apresentacao', data: '2026-11-20', feita: false }
   ]);
   ```

3. Dentro do `<ul class="lista">`, um `<li>` por entrega, com `v-for`, na
   ordem das datas. Use a `criarItemDaEntrega` antiga como mapa: cada
   `createElement` dela vira uma tag, e cada `textContent` vira um `{{ }}`.
   Por enquanto, os botões Feita e Apagar não fazem nada.
4. No resumo, os pendentes e a próxima entrega, com `{{ }}`.

> **Dicas**
>
> - `v-for="entrega in ordenarPorData(entregas)"`: o `v-for` pode percorrer
>   o resultado de uma função.
> - O `<li>` precisa da `class="entrega"`, de um `:key` e do
>   `:data-tipo` (é ele que dá a cor de cada tipo, como o `:data-categoria`
>   dos gastos).
> - Quantos pendentes? `filtrarPendentes(entregas).length`.

**Funcionou se:** as quatro entregas aparecem, da data mais próxima para a
mais distante, cada uma com a cor do seu tipo; o resumo mostra 3
pendentes e "Matemática — 18/11".

---

## Passo 3 — Adicionar uma entrega

O formulário com `v-model` e `@submit.prevent`, como no pedaço 4 dos
gastos.

- Um `ref` para cada campo: matéria, tipo e data.
- Uma função `adicionarEntrega`: monta a entrega (com `id: Date.now()` e
  `feita: false`), não deixa passar matéria só com espaços, faz o `push` e
  limpa o formulário.

**Funcionou se:** uma entrega nova aparece no lugar certo da lista (pela
data), e o resumo muda sozinho. Os campos ficam vazios depois de
adicionar, sem ficar vermelhos.

---

## Passo 4 — Feita e Apagar

- **Feita:** o botão troca a entrega entre feita e pendente
  (`entrega.feita = !entrega.feita`). Uma entrega feita ganha a classe
  `feita`, e o botão passa a dizer **Reabrir**.
- **Apagar:** tira a entrega da lista.

> **Dicas**
>
> - A classe: `:class="{ feita: entrega.feita }"`, junto com o
>   `class="entrega"`.
> - O texto do botão: dois botões, um com `v-if="entrega.feita"` (Reabrir) e
>   outro com `v-else` (Feita). Os dois chamam a mesma função.
> - A lista da tela está ordenada, então a posição dela não serve para
>   apagar. Procure a entrega na lista de verdade, com `indexOf`, como no
>   pedaço 6 dos gastos.

**Funcionou se:** Feita risca a entrega e diminui os pendentes; Reabrir
desfaz; Apagar tira a entrega certa.

---

## Passo 5 — O filtro

O select **Mostrar** mostra só um tipo de entrega.

- Um `ref` para o tipo escolhido, ligado ao select com `v-model`.
- Um `computed` com as entregas que aparecem: filtradas **e** ordenadas.
  O `v-for` passa a percorrer esse `computed`.
- Aproveite e transforme também os pendentes e a próxima entrega em
  `computed`: o `<template>` fica mais limpo.

> **Dica:** o filtro antigo era
> `entregas.filter(entrega => passaNoFiltro(entrega, tipoEscolhido))`.
> Dentro do `computed`, lembre do `.value` nos dois `ref`.

**Funcionou se:** "Só provas" mostra só as provas, e o resumo continua
contando todas. Com o filtro ligado, adicione uma prova: ela aparece na
hora.

---

## Passo 6 — Salvar no navegador

Com `watch`, como no pedaço 9 dos gastos:

- a lista começa com o que estiver salvo, ou com as entregas de exemplo;
- toda mudança na lista é salva (adicionar, Feita, Apagar).

> **Dica:** marcar como feita muda uma entrega **dentro** da lista. Sem o
> `{ deep: true }`, o `watch` não percebe.

**Funcionou se:** adicione uma entrega, marque outra como feita e recarregue
a página: as duas mudanças continuam lá.

---

## Se sobrar tempo

- **Feitas no resumo.** Um terceiro indicador, "Feitas", com quantas
  entregas já foram feitas. (Você vai precisar de um `<p class="indicador">`
  novo no HTML.)
- **Lista vazia.** Quando o filtro não encontra nada, mostre um "Nada por
  aqui." no lugar da lista, com `v-if`.
- **Apagar as feitas.** Um botão que tira da lista todas as entregas
  feitas de uma vez. Dica: `entregas.value = ...` com um `filter`.

---

## Para entregar

Faça o commit e envie para o GitHub, mesmo que incompleto. Um commit por
passo ajuda a ver o caminho.
