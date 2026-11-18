# Etapa 1 · a página parada

**Arquivos modificados**

- `src/components/` e `src/assets/`: **apagadas**, junto com o
  `public/icons.svg` e o `README.md`. Eram só do exemplo.
- `src/App.vue`: **reescrito**. O `<template>` recebe tudo o que estava
  dentro do `<body>` do `index.html` antigo, sem mudar nada. Sem
  `<script>` nem `<style>` por enquanto.
- `src/style.css`: **trocado** pelo `style.css` antigo, inteiro.
- `index.html`: `lang="pt-BR"` e o título "Pra onde foi meu dinheiro?".

O `src/main.js` fica igual: ele já importa o `style.css`.

**Como fica:** a página aparece igual à antiga, mas parada. O select de
categoria e a tabela estão vazios, e os números não mudam: o
JavaScript ainda não veio.

**O ponto:** o HTML e o CSS que a turma escreveu servem no Vue sem mudar.
O Vue muda o jeito de fazer o JavaScript.
