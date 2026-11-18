# Etapa 0 · o projeto novo

O que o comando cria, sem mexer em nada:

```
npm create vite@latest gastos-vue -- --template vue
cd gastos-vue
npm install
npm run dev
```

É o mesmo Vite do quiz, com o template `vue` em vez de `vanilla`.

**O que olhar com a turma**

- `index.html`: só tem uma `<div id="app"></div>`. O Vue desenha tudo
  dentro dela.
- `src/main.js`: `createApp(App).mount('#app')` quer dizer "crie o app a
  partir do `App.vue` e coloque dentro da `#app`".
- `src/App.vue`: um arquivo com três partes, `<script setup>`, `<template>`
  e `<style>`. Ele usa o `HelloWorld.vue`, da pasta `components`.
- No `package.json`, uma dependência nova: `vue`. E, nas de
  desenvolvimento, o `@vitejs/plugin-vue`, que ensina o Vite a ler
  arquivos `.vue`.

**O contador do modelo**

O `HelloWorld.vue` tem um botão "Count is 0". Clique: o número sobe. Abra
o arquivo e mostre o código inteiro do contador:

```js
const count = ref(0)
```

```html
<button type="button" class="counter" @click="count++">
  Count is {{ count }}
</button>
```

Não tem `querySelector`, nem `addEventListener`, nem `textContent`. O
`count` mudou, e a tela mudou junto. Essa é a ideia do Vue inteiro.
