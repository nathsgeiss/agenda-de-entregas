# Etapa 2 · o primeiro componente: o cabeçalho

**Arquivos modificados**

- `src/components/CabecalhoApp.vue`: **novo**. Só um `<template>`, com o
  `<header>` que estava no `App.vue`.
- `src/App.vue`:
  - `import CabecalhoApp from './components/CabecalhoApp.vue';`
  - no lugar do `<header>`: `<CabecalhoApp />`.

**Como fica:** igual. O topo continua lá, agora vindo de outro arquivo.

**O que explicar**

- Um componente é um arquivo `.vue` com um pedaço da tela.
- Para usar: importar, e escrever o nome como se fosse uma tag. A `/` no fim
  (`<CabecalhoApp />`) fecha a tag, porque não vai nada dentro dela.
- O nome começa com letra maiúscula e tem duas palavras: é o combinado do
  Vue, para não confundir com as tags do HTML (`<header>`, `<table>`...).
- A pasta `components` é onde eles moram, como no projeto que o Vite cria.
