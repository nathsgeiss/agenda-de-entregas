# Agenda de entregas — em páginas

Agora é a vez da agenda. Ela vai ganhar páginas e os comandos de navegação,
do mesmo jeito que o controle de gastos:

| endereço | a página |
|---|---|
| `#/` | o resumo e a lista de entregas |
| `#/nova` | o formulário de nova entrega |
| `#/entrega/2` | uma entrega só |

**Ponto de partida:** a sua agenda em componentes de sexta ou, se você não
tiver, a pasta `agenda-vue-ponto-de-partida` (`npm install` e
`npm run dev` dentro dela).

O `router-passo-a-passo.md` continua valendo como consulta: cada passo
daqui tem um pedaço parecido lá.

---

## Passo 1 — O Router instalado

- `npm install vue-router`.
- Um `src/router.js` com uma rota só: `/` mostra a `PaginaAgenda`.
- A `src/pages/PaginaAgenda.vue` recebe tudo o que está no `App.vue`, menos
  o cabeçalho e o rodapé.
- O `App.vue` fica com o `<header>`, o `<RouterView />` e o `<footer>`.
- O `main.js` faz `.use(router)`.

> **Dica:** é o pedaço 1 dos gastos. Lembre do `../` nos imports da página.

**Funcionou se:** a agenda continua igual, com o endereço terminando em
`#/`.

---

## Passo 2 — Os dados compartilhados

- Crie o `src/entregas.js` com a lista de entregas (o `ref`), o `watch` que
  salva, e as funções que mexem nela: `adicionarEntrega`, `alternarFeita` e
  `apagarEntrega`.
- A `PaginaAgenda.vue` importa tudo de lá.

> **Dica:** o que fica escondido no `entregas.js` (sem `export`)? A `CHAVE`,
> as entregas de exemplo, a `carregarEntregas` e a `salvarEntregas`. Só o
> próprio módulo as usa.

**Funcionou se:** a agenda continua igual, e as entregas continuam salvas ao
recarregar.

---

## Passo 3 — A página Nova entrega e o menu

- Uma página nova, `PaginaNovaEntrega.vue`, no endereço `/nova`, só com o
  formulário. O formulário sai da `PaginaAgenda`.
- Depois de adicionar, o app volta para a agenda (`/`).
- Um menu no `App.vue`, com dois `RouterLink`: Agenda e Nova entrega. O link
  da página atual fica destacado.
- O CSS do menu e do grid: o mesmo dos gastos (pedaços 3 e 4). Troque o
  `#16291f` do fundo do menu por `var(--cor-principal)`, para combinar com a
  agenda.

> **Dicas**
>
> - Voltar para a agenda pelo código: `useRouter()` e `router.push('/')`.
> - No grid, os cartões da agenda são `.resumo`, `.nova-entrega` e
>   `.entregas`.

**Funcionou se:** o menu troca de página; adicionando uma entrega, o app
volta para a agenda, com a entrega nova na lista.

---

## Passo 4 — Voltar e avançar

- No menu do `App.vue`, uma seta em cada ponta: **←** com `router.back()` e
  **→** com `router.forward()`.
- Cada seta chama uma função com nome de verbo, como nos gastos.

> **Dicas**
>
> - É o pedaço 6 dos gastos. O `App.vue` da agenda ainda não tem
>   `<script setup>`: ele precisa de um, com o `useRouter()`.
> - Os botões são `<button type="button">`. No CSS, tire a borda e o fundo
>   (`border: none` e `background-color: transparent`) e use a mesma cor dos
>   links do menu.

**Funcionou se:** com F11 (tela cheia), indo Agenda → Nova entrega →
Agenda, o ← volta duas vezes e o → avança de novo.

---

## Passo 5 — A página de uma entrega

- Uma rota com parâmetro: `/entrega/:id`, com a página `PaginaEntrega.vue`.
- No `ItemEntrega.vue`, a matéria vira um link para a página da entrega.
- A página mostra a matéria, a etiqueta do tipo, a data e se já foi feita
  ou não. E tem três botões:
  - **Voltar**, com `router.back()`;
  - **Marcar como feita** / **Reabrir** (a `alternarFeita`);
  - **Apagar**, que apaga e vai para a agenda com `router.replace('/')`,
    para a página da entrega apagada não ficar no voltar do navegador.
- Com um id que não existe (`#/entrega/999`), aparece "Entrega não
  encontrada".
- No resumo, a **próxima entrega** também vira um link para a página dela.
  Assim, a página da entrega tem duas portas de entrada, e o Voltar volta
  para a certa.

> **Dicas**
>
> - É o pedaço 7 dos gastos: `useRoute()`, `route.params.id`, `Number(...)`
>   e o `find`.
> - O link da matéria: ``<RouterLink :to="`/entrega/${entrega.id}`" class="materia">``.
>   Mantenha a `class="materia"`, que o CSS da lista usa (e o risco da
>   entrega feita também).
> - Para a etiqueta ganhar a cor do tipo, a `<section>` da página precisa do
>   `:data-tipo="entrega.tipo"`.
> - A próxima entrega: no `agenda.js`, uma função `encontrarProxima` que
>   devolve a primeira das pendentes ordenadas por data (ou `undefined`). O
>   `ResumoAgenda.vue` ganha uma prop `destino`, como o `IndicadorResumo`
>   dos gastos.

**Funcionou se:** clicando numa matéria, a página dela abre; marcando como
feita ali e clicando em Voltar, a entrega aparece riscada na lista; a
próxima entrega do resumo abre a página dela, e o Voltar leva de volta ao
resumo; apagando, o app vai para a agenda sem ela, e o voltar do navegador
não cai na entrega apagada.

---

## Se sobrar tempo

- **A Nova entrega em etapas.** Divida o formulário em três páginas, como o
  pedaço 8 dos gastos:

  | endereço | a etapa |
  |---|---|
  | `#/nova` | matéria e tipo |
  | `#/nova/data` | a data, com um Voltar (`back`) |
  | `#/nova/confirmar` | a entrega pronta, com "Corrigir matéria e tipo" (`go(-2)`), "Corrigir data" (`go(-1)`) e Adicionar |

  A entrega pela metade mora num `rascunho.js`. Aberta direto pelo
  endereço, a etapa 2 ou 3 deve mostrar "Nenhuma entrega em andamento".

- **Página não encontrada.** Uma página para qualquer endereço que não
  existe, com um link para a agenda (o pedaço 9 dos gastos).
- **Um link a mais no menu.** Uma página Feitas (`/feitas`), só com as
  entregas já feitas. Quantos arquivos você precisou criar ou mudar?
- **O título da página.** Na `PaginaEntrega`, mostre a matéria também na
  aba do navegador: um `watch` no `entrega` que muda o `document.title`.

---

## Para entregar

Faça o commit e envie para o GitHub, mesmo que incompleto. Um commit por
passo.
