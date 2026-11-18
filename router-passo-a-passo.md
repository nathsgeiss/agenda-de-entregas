# Pra onde foi meu dinheiro? — em páginas

O controle de gastos está todo numa página só: o formulário, o resumo, o
gráfico e o histórico, um embaixo do outro. Hoje ele vai ganhar **páginas**,
cada uma com o seu endereço, com o **Vue Router**:

| endereço | a página |
|---|---|
| `#/` | o resumo e o gráfico |
| `#/novo` | o formulário (no fim, em três etapas) |
| `#/historico` | a tabela |
| `#/gasto/3` | um gasto só |

**Ponto de partida:** o seu `gastos-vue` de sexta ou, se você não tiver, a
pasta `gastos-vue-ponto-de-partida` (`npm install` e `npm run dev` dentro
dela).

As páginas vão morar numa pasta nova: `src/pages`.

---

## Pedaço 1 — O Router instalado

1. No terminal, dentro da pasta do projeto:

   ```
   npm install vue-router
   ```

2. Crie o `src/router.js`, o mapa do app:

   ```js
   import { createRouter, createWebHashHistory } from 'vue-router';
   import PaginaPainel from './pages/PaginaPainel.vue';

   const rotas = [
       { path: '/', component: PaginaPainel }
   ];

   export const router = createRouter({
       history: createWebHashHistory(),
       routes: rotas
   });
   ```

3. Crie a pasta `src/pages` e, nela, o `PaginaPainel.vue`. Mova para ele
   **tudo o que está no `App.vue`, menos o cabeçalho**: o `<script setup>`
   inteiro e o `<main>`. Os imports ganham um `../`, porque a página está
   numa pasta: `'../calculos.js'`, `'../components/LinhaGasto.vue'`...
4. O `App.vue` fica só com isto:

   ```html
   <script setup>
   import CabecalhoApp from './components/CabecalhoApp.vue';
   </script>

   <template>
       <CabecalhoApp />
       <RouterView />
   </template>
   ```

5. No `src/main.js`, ligue o Router ao app:

   ```js
   import { router } from './router.js';

   createApp(App).use(router).mount('#app');
   ```

**O que é cada coisa**

- **Uma rota:** `{ path: '/', component: PaginaPainel }`, um endereço e a
  página que aparece nele.
- **`createWebHashHistory()`:** os endereços ficam com `#` (`#/historico`).
  Tudo o que vem depois do `#` fica no navegador, e é o Router que lê.
- **`.use(router)`:** liga o Router ao app. A partir daí, o `<RouterView>` e
  o `<RouterLink>` funcionam em qualquer componente, sem import.
- **`<RouterView />`:** o lugar onde a página do endereço atual aparece. O
  que fica fora dele (o cabeçalho) aparece em toda página.

**Funcionou se:** o app continua igual, e o endereço termina em `#/`.

---

## Pedaço 2 — Os dados compartilhados

No pedaço 3, o painel vai virar duas páginas, e as duas precisam da
**mesma** lista de gastos. Então a lista sai da página e vai para um módulo.

1. Crie o `src/gastos.js` e mova para ele, da `PaginaPainel.vue`:
   - o `ORCAMENTO` e as `CATEGORIAS`;
   - a `CHAVE`, os `GASTOS_DE_EXEMPLO`, a `carregarGastos` e a
     `salvarGastos`;
   - o `ref` dos gastos e o `watch`;
   - a `adicionarGasto`, a `apagarGasto` e a `desfazerUltimoGasto`.
2. Coloque `export` no que as páginas usam:

   ```js
   export const ORCAMENTO = 50;
   export const CATEGORIAS = [ ... ];
   export const gastos = ref(carregarGastos());
   export function adicionarGasto(gasto) { ... }
   ```

   (o `gastos.js` precisa do `import { ref, watch } from 'vue';`)
3. Na `PaginaPainel.vue`, importe:

   ```js
   import {
       ORCAMENTO,
       CATEGORIAS,
       gastos,
       adicionarGasto,
       apagarGasto,
       desfazerUltimoGasto
   } from '../gastos.js';
   ```

**Por que funciona?** Um módulo é executado uma vez só. Todo mundo que
importa o `gastos` recebe **o mesmo `ref`**: uma página adiciona, e a outra
já vê.

**Funcionou se:** o app continua igual.

---

## Pedaço 3 — Duas páginas

1. Crie a `src/pages/PaginaResumo.vue`, com o formulário, o resumo e o
   gráfico (e só o que eles usam: os `computed` do resumo, os imports...).
2. Crie a `src/pages/PaginaHistorico.vue`, com o cartão do histórico (o
   filtro, a tabela e o desfazer), a `categoriaEscolhida` e o `mostrados`.
3. Apague a `PaginaPainel.vue`.
4. No `router.js`, as duas rotas:

   ```js
   import PaginaResumo from './pages/PaginaResumo.vue';
   import PaginaHistorico from './pages/PaginaHistorico.vue';

   const rotas = [
       { path: '/', component: PaginaResumo },
       { path: '/historico', component: PaginaHistorico }
   ];
   ```

5. No fim do `style.css`, para o grid não deixar buracos (cada página
   mostra só alguns cartões):

   ```css
   .painel {
       grid-template-areas: none;
   }

   .novo-gasto,
   .resumo,
   .categorias-cartao,
   .historico-cartao {
       grid-area: auto;
   }

   @media (min-width: 800px) {
       .painel {
           grid-template-areas: none;
       }

       .historico-cartao {
           grid-column: 1 / -1;
       }
   }
   ```

**Funcionou se:** `#/` mostra o resumo, e `#/historico` (digitado no
endereço) mostra a tabela. Adicione um gasto no resumo e vá para o
histórico: ele está lá.

---

## Pedaço 4 — O menu: `RouterLink`

1. No `App.vue`, entre o cabeçalho e o `<RouterView />`:

   ```html
   <nav class="menu">
       <RouterLink to="/">Resumo</RouterLink>
       <RouterLink to="/historico">Histórico</RouterLink>
   </nav>
   ```

2. No fim do `style.css`:

   ```css
   .menu {
       display: flex;
       flex-wrap: wrap;
       justify-content: center;
       gap: 8px;
       padding: 10px 20px;
       background-color: #16291f;
   }

   .menu a {
       padding: 8px 16px;
       border-radius: 6px;
       color: #b9d3c4;
       font-weight: bold;
       text-decoration: none;
   }

   .menu a:hover {
       background-color: #24402f;
       color: #ffffff;
   }

   .menu a.router-link-active {
       background-color: #ffffff;
       color: var(--cor-principal);
   }
   ```

**O que é cada coisa**

- **`<RouterLink to="/historico">`:** vira um `<a href="#/historico">` na
  página (confira no inspetor). Mas o clique **não recarrega** o app: o
  Router só troca a página no `<RouterView>`.
- **`router-link-active`:** a classe que o Router coloca sozinho no link da
  página atual. O CSS só diz como ela fica.

**Funcionou se:** o menu troca de página, o link da página atual fica
branco, e o voltar do navegador volta para a página anterior.

> **Prova de que não recarrega:** no console, `window.teste = 1`. Clique no
> outro link do menu e digite `window.teste` de novo: continua `1`.

---

## Pedaço 5 — A página Novo gasto: `router.push`

1. Crie a `src/pages/PaginaNovoGasto.vue`:

   ```html
   <script setup>
   import { useRouter } from 'vue-router';
   import FormularioGasto from '../components/FormularioGasto.vue';
   import { CATEGORIAS, adicionarGasto } from '../gastos.js';

   const router = useRouter();

   function registrarGasto(gasto) {
       adicionarGasto(gasto);
       router.push('/historico');
   }
   </script>

   <template>
       <main class="painel">
           <section class="cartao novo-gasto">
               <FormularioGasto :categorias="CATEGORIAS" @adicionar="registrarGasto" />
           </section>
       </main>
   </template>
   ```

2. Tire o formulário da `PaginaResumo.vue`.
3. No `router.js`: `{ path: '/novo', component: PaginaNovoGasto }`.
4. No menu, entre os dois links: `<RouterLink to="/novo">Novo gasto</RouterLink>`.
5. No `style.css`, para o formulário ficar centralizado:

   ```css
   .novo-gasto {
       width: 100%;
       max-width: 460px;
       justify-self: center;
   }

   @media (min-width: 800px) {
       .novo-gasto {
           grid-column: 1 / -1;
       }
   }
   ```

**O que é cada coisa**

- **`useRouter()`:** devolve o router, o mesmo do `router.js`.
- **`router.push('/historico')`:** muda de página pelo código, como se
  alguém clicasse num `RouterLink`. O `RouterLink` é para quando a pessoa
  clica; o `push`, para quando o código decide.
- As funções `use...` ficam no começo do `<script setup>`, fora das outras
  funções.

**Funcionou se:** adicionando um gasto, o app vai para o histórico, com o
gasto novo na tabela.

---

## Pedaço 6 — Voltar e avançar: `router.back` e `router.forward`

Em tela cheia (F11), num app instalado ou num totem, os botões do navegador
não aparecem. O app vai ter os seus.

1. No `App.vue`, o `<script setup>` ganha o router e duas funções:

   ```js
   import { useRouter } from 'vue-router';
   import CabecalhoApp from './components/CabecalhoApp.vue';

   const router = useRouter();

   function voltarPagina() {
       router.back();
   }

   function avancarPagina() {
       router.forward();
   }
   ```

2. No menu, um botão em cada ponta:

   ```html
   <nav class="menu">
       <button type="button" class="botao-navegar" aria-label="Voltar" @click="voltarPagina">←</button>
       <RouterLink to="/">Resumo</RouterLink>
       <RouterLink to="/novo">Novo gasto</RouterLink>
       <RouterLink to="/historico">Histórico</RouterLink>
       <button type="button" class="botao-navegar" aria-label="Avançar" @click="avancarPagina">→</button>
   </nav>
   ```

3. No fim do `style.css`:

   ```css
   .botao-navegar {
       width: auto;
       padding: 8px 14px;
       background-color: transparent;
       color: #b9d3c4;
       font-size: 18px;
       line-height: 1;
   }

   .botao-navegar:hover {
       background-color: #24402f;
       color: #ffffff;
   }
   ```

**O que é cada coisa**

- **O histórico do navegador:** uma lista das páginas visitadas, com a
  marca de onde estamos. O `push` (e o `RouterLink`) põe uma página no fim.
- **`router.back()`:** anda uma para trás, como a seta de voltar do
  navegador. A página da frente continua guardada.
- **`router.forward()`:** anda uma para a frente, se existir uma. Sem página
  à frente, não faz nada.

**Funcionou se:** com F11, navegando Resumo → Histórico → Novo gasto, o ←
volta duas vezes e o → avança de novo.

---

## Pedaço 7 — A página de um gasto: parâmetros, `back` e `replace`

1. No `router.js`, uma rota com parâmetro:

   ```js
   { path: '/gasto/:id', component: PaginaGasto }
   ```

2. Na `LinhaGasto.vue`, a descrição vira um link para a página do gasto:

   ```html
   <td><RouterLink :to="`/gasto/${gasto.id}`">{{ gasto.descricao }}</RouterLink></td>
   ```

3. Crie a `src/pages/PaginaGasto.vue`. A parte nova é o `<script setup>`:

   ```js
   import { computed } from 'vue';
   import { useRoute, useRouter } from 'vue-router';
   import { formatarReais, calcularTotal, calcularPorcentagem } from '../calculos.js';
   import CartaoPainel from '../components/CartaoPainel.vue';
   import { gastos, apagarGasto } from '../gastos.js';

   const route = useRoute();
   const router = useRouter();

   const gasto = computed(() =>
       gastos.value.find((cadaGasto) => cadaGasto.id === Number(route.params.id)));

   const porcentagem = computed(() => calcularPorcentagem(gasto.value.valor, calcularTotal(gastos.value)));

   function voltarPagina() {
       router.back();
   }

   function apagarEsteGasto() {
       apagarGasto(gasto.value);
       router.replace('/historico');
   }
   ```

   E o `<template>`: um `<CartaoPainel v-if="gasto">` com a descrição, o
   valor, a etiqueta da categoria, a porcentagem e dois botões ("Voltar" e
   "Apagar este gasto"), e um `<CartaoPainel v-else>` com "Gasto não
   encontrado". O professor mostra o arquivo completo, e o CSS dele, no
   projetor.

4. O maior e o menor gasto do resumo também viram links. No
   `IndicadorResumo.vue`, uma prop nova:

   ```js
   defineProps({
       rotulo: String,
       valor: [String, Number],
       estourado: { type: Boolean, default: false },
       destino: { type: String, default: '' }
   });
   ```

   ```html
   <strong :class="{ estourado: estourado }">
       <RouterLink v-if="destino" :to="destino">{{ valor }}</RouterLink>
       <span v-else>{{ valor }}</span>
   </strong>
   ```

5. Na `PaginaResumo.vue`, o destino de cada um:

   ```js
   const destinoDoMaior = computed(() => montarDestinoDoGasto(calcularMaiorGasto(gastos.value)));
   const destinoDoMenor = computed(() => montarDestinoDoGasto(calcularMenorGasto(gastos.value)));

   function montarDestinoDoGasto(gasto) {
       if (gasto === undefined) {
           return '';
       }
       return `/gasto/${gasto.id}`;
   }
   ```

   ```html
   <IndicadorResumo rotulo="Maior gasto" :valor="textoDoMaior" :destino="destinoDoMaior" />
   <IndicadorResumo rotulo="Menor gasto" :valor="textoDoMenor" :destino="destinoDoMenor" />
   ```

**O que é cada coisa**

- **`:id`:** um parâmetro, um pedaço do endereço que muda. `/gasto/1`,
  `/gasto/3`... todos abrem a `PaginaGasto`.
- **`useRoute()`:** o endereço atual. Em `#/gasto/3`, `route.params.id` é o
  texto `'3'`. Por isso o `Number(...)`: o id dos gastos é número.
- **`find`:** como o `filter`, mas devolve só o **primeiro** item que passa
  no teste, ou `undefined` se nenhum passar.
- **`:to`:** com os dois-pontos, o caminho é montado com JavaScript. A
  template string (com crase) junta `/gasto/` e o id.
- **`router.back()` no Voltar:** a página tem duas portas de entrada (o
  histórico e o resumo). O `back` volta para a porta por onde a pessoa
  entrou.
- **`router.replace()` no Apagar:** vai para o histórico **trocando** a
  página atual, em vez de pôr uma nova no fim. Com `push`, o voltar do
  navegador cairia na página do gasto apagado: "Gasto não encontrado".
- **`useRoute` × `useRouter`:** o `route` é onde estou (para ler); o
  `router` é quem muda de página.

**Funcionou se:** clicando em "cinema" no histórico (ou no maior gasto do
resumo), o endereço vira `#/gasto/3`, e o Voltar leva de volta para onde
você estava. Apagando ali, o app vai para o histórico, e o voltar do
navegador não cai mais no gasto apagado. `#/gasto/999` mostra "Gasto não
encontrado".

---

## Pedaço 8 — O Novo gasto em três etapas: `router.go`

O formulário vira um assistente: uma coisa por vez, em três páginas.

| endereço | a etapa |
|---|---|
| `#/novo` | descrição e valor |
| `#/novo/categoria` | a categoria |
| `#/novo/confirmar` | confirmar, ou corrigir |

1. Crie o `src/rascunho.js`, com o gasto pela metade, que as três páginas
   compartilham:

   ```js
   import { ref } from 'vue';

   function criarRascunhoVazio() {
       return { descricao: '', valor: '', categoria: '' };
   }

   export const rascunho = ref(criarRascunhoVazio());

   export function limparRascunho() {
       rascunho.value = criarRascunhoVazio();
   }
   ```

2. Troque todo o `src/pages/PaginaNovoGasto.vue` (a etapa 1):

   ```html
   <script setup>
   import { useRouter } from 'vue-router';
   import { rascunho } from '../rascunho.js';

   const router = useRouter();

   function irParaCategoria() {
       router.push('/novo/categoria');
   }
   </script>

   <template>
       <main class="painel">
           <section class="cartao novo-gasto">
               <form class="formulario" @submit.prevent="irParaCategoria">
                   <fieldset>
                       <legend>Novo gasto · 1 de 3</legend>

                       <p>
                           <label for="descricao">Descrição</label>
                           <input type="text" id="descricao" class="campo-descricao" v-model="rascunho.descricao" placeholder="Ex.: lanche" required>
                       </p>

                       <p>
                           <label for="valor">Valor (R$)</label>
                           <input type="number" id="valor" class="campo-valor" v-model="rascunho.valor" step="0.01" min="0.01" placeholder="Ex.: 12.50" required>
                       </p>

                       <button type="submit">Próximo</button>
                   </fieldset>
               </form>
           </section>
       </main>
   </template>
   ```

3. Crie o `src/pages/PaginaEscolherCategoria.vue` (a etapa 2):

   ```html
   <script setup>
   import { useRouter } from 'vue-router';
   import { CATEGORIAS } from '../gastos.js';
   import { rascunho } from '../rascunho.js';

   const router = useRouter();

   function voltarPagina() {
       router.back();
   }

   function irParaConfirmacao() {
       router.push('/novo/confirmar');
   }
   </script>

   <template>
       <main class="painel">
           <section v-if="rascunho.descricao" class="cartao novo-gasto">
               <form class="formulario" @submit.prevent="irParaConfirmacao">
                   <fieldset>
                       <legend>Novo gasto · 2 de 3</legend>

                       <p>
                           <label for="categoria">Categoria de "{{ rascunho.descricao }}"</label>
                           <select id="categoria" class="campo-categoria" v-model="rascunho.categoria" required>
                               <option value="">Escolha a categoria</option>
                               <option v-for="cadaCategoria in CATEGORIAS" :key="cadaCategoria.nome" :value="cadaCategoria.nome">
                                   {{ cadaCategoria.nome }}
                               </option>
                           </select>
                       </p>

                       <div class="assistente-acoes">
                           <button type="button" class="botao-voltar" @click="voltarPagina">Voltar</button>
                           <button type="submit">Próximo</button>
                       </div>
                   </fieldset>
               </form>
           </section>

           <section v-else class="cartao novo-gasto">
               <h2>Nenhum gasto em andamento</h2>
               <p>Comece pela primeira etapa.</p>
               <div class="detalhe-acoes">
                   <RouterLink to="/novo" class="botao-voltar">Começar um gasto</RouterLink>
               </div>
           </section>
       </main>
   </template>
   ```

4. Crie o `src/pages/PaginaConfirmarGasto.vue` (a etapa 3):

   ```html
   <script setup>
   import { useRouter } from 'vue-router';
   import { formatarReais } from '../calculos.js';
   import { adicionarGasto } from '../gastos.js';
   import { rascunho, limparRascunho } from '../rascunho.js';

   const router = useRouter();

   function corrigirDescricaoEValor() {
       router.go(-2);
   }

   function corrigirCategoria() {
       router.go(-1);
   }

   function confirmarGasto() {
       adicionarGasto({
           id: Date.now(),
           descricao: rascunho.value.descricao.trim(),
           valor: Number(rascunho.value.valor),
           categoria: rascunho.value.categoria
       });
       limparRascunho();
       router.push('/historico');
   }
   </script>

   <template>
       <main class="painel">
           <section v-if="rascunho.descricao && rascunho.categoria" class="cartao novo-gasto" :data-categoria="rascunho.categoria">
               <h2>Novo gasto · 3 de 3</h2>

               <p class="detalhe-descricao">{{ rascunho.descricao }}</p>
               <p class="detalhe-valor">{{ formatarReais(Number(rascunho.valor)) }}</p>
               <p><span class="etiqueta">{{ rascunho.categoria }}</span></p>

               <div class="assistente-acoes">
                   <button type="button" class="botao-voltar" @click="corrigirDescricaoEValor">Corrigir descrição e valor</button>
                   <button type="button" class="botao-voltar" @click="corrigirCategoria">Corrigir categoria</button>
               </div>
               <button type="button" class="botao-confirmar" @click="confirmarGasto">Adicionar</button>
           </section>

           <section v-else class="cartao novo-gasto">
               <h2>Nenhum gasto em andamento</h2>
               <p>Comece pela primeira etapa.</p>
               <div class="detalhe-acoes">
                   <RouterLink to="/novo" class="botao-voltar">Começar um gasto</RouterLink>
               </div>
           </section>
       </main>
   </template>
   ```

5. Apague o `src/components/FormularioGasto.vue`: o formulário foi dividido
   entre as etapas.
6. No `router.js`, as duas rotas novas, logo depois da `/novo`:

   ```js
   { path: '/novo/categoria', component: PaginaEscolherCategoria },
   { path: '/novo/confirmar', component: PaginaConfirmarGasto },
   ```

7. No fim do `style.css`:

   ```css
   .assistente-acoes {
       display: flex;
       flex-wrap: wrap;
       gap: 12px;
       margin-top: 12px;
   }

   .assistente-acoes button[type="submit"] {
       flex: 1;
   }

   .botao-confirmar {
       margin-top: 20px;
   }
   ```

**O que é cada coisa**

- **O `rascunho.js`:** a mesma ideia do `gastos.js`. As três páginas
  importam o mesmo `ref`. Ele não é salvo: recarregou, some.
- **`v-model="rascunho.descricao"`:** o `v-model` funciona com o campo de um
  objeto.
- **`router.go(-2)`:** anda duas páginas para trás de uma vez, direto para a
  etapa 1. `go(-1)` é o mesmo que `back()`; `go(1)`, o mesmo que
  `forward()`.
- **O limite do `go`:** ele não sabe o que tem no histórico. Quem abre
  `#/novo/confirmar` direto não tem duas etapas para trás. Por isso as
  etapas 2 e 3 conferem o rascunho e, vazio, mandam começar pela etapa 1.

**Funcionou se:** o Novo gasto pede uma coisa por vez; na confirmação,
"Corrigir descrição e valor" volta para a etapa 1 com os campos
preenchidos; Adicionar leva ao histórico, com o gasto novo.
`#/novo/confirmar`, digitado direto, mostra "Nenhum gasto em andamento".

---

## Pedaço 9 — Página não encontrada

1. Crie a `src/pages/PaginaNaoEncontrada.vue`, com um cartão "Página não
   encontrada" e um `<RouterLink to="/">` para o resumo.
2. No `router.js`, no fim da lista:

   ```js
   { path: '/:pathMatch(.*)*', component: PaginaNaoEncontrada }
   ```

O `(.*)*` quer dizer "qualquer caminho". É uma receita da documentação do
Vue Router: não precisa decorar. O Router só usa essa rota quando nenhuma
outra combina.

**Funcionou se:** `#/qualquer/coisa` mostra "Página não encontrada".

---

## Os comandos para mudar de página

| comando | o que faz |
|---|---|
| `<RouterLink to="/x">` | a pessoa clica e vai para a página |
| `router.push('/x')` | vai para a página pelo código, pondo ela no fim do histórico |
| `router.replace('/x')` | vai para a página pelo código, trocando a atual no histórico |
| `router.back()` | volta uma página |
| `router.forward()` | avança uma página |
| `router.go(n)` | anda `n` páginas: `go(-2)` volta duas |

## O que mudou, no fim

| arquivo | o que faz |
|---|---|
| `router.js` | o mapa: cada endereço e a sua página |
| `main.js` | liga o Router ao app (`.use(router)`) |
| `App.vue` | a moldura: o cabeçalho, o menu (com ← e →) e o `<RouterView>` |
| `gastos.js` | os dados de todas as páginas |
| `rascunho.js` | o gasto pela metade, das três etapas do Novo gasto |
| `pages/` | uma página para cada rota |
| `components/` | as peças de sexta, usadas dentro das páginas |
