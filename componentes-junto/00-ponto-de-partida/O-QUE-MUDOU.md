# Etapa 0 · o ponto de partida

O controle de gastos em Vue, como terminou em 11/11: tudo funcionando, mas
tudo num `App.vue` só, com quase 270 linhas. O `<template>` sozinho tem umas 150.

**Ele ainda usa o `calculos.js` antigo**, com os `for` de setembro e
outubro: é o mesmo arquivo do projeto em JavaScript, só com `export`. Isso
deixa o comparativo justo. A etapa 1 moderniza o `calculos.js`.

**O que mostrar:** role o `App.vue` no projetor. Para achar a linha da
tabela, ou o gráfico, é preciso procurar. É o mesmo problema do `script.js`
de 290 linhas do quiz, agora na tela: na segunda, a resposta foi separar o
código em módulos; hoje, a resposta é separar a tela em **componentes**.
