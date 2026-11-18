# Agenda de entregas — em componentes

Agora é a vez da agenda. Ela funciona, mas está toda num `App.vue` só.
Vamos separá-la em três componentes, do mesmo jeito que fizemos com o
controle de gastos. Por fora, nada muda.

**Ponto de partida:** a sua agenda em Vue de quarta ou, se você não
tiver, a pasta `agenda-vue-ponto-de-partida` (`npm install` e
`npm run dev` dentro dela).

O `componentes-passo-a-passo.md` continua valendo como consulta.

---

## Passo 1 — `ResumoAgenda` (props)

O cartão do resumo, com os pendentes e a próxima entrega.

- Crie o `src/components/ResumoAgenda.vue` com a `<section class="cartao
  resumo">` inteira.
- Ele recebe **duas props**: `pendentes` (um número) e `proxima` (um texto).
  Quem calcula os dois continua sendo o `App`.

> **Dica:** é o mesmo jeito do `IndicadorResumo` dos gastos. No `App.vue`, o
> resumo vira uma linha: `<ResumoAgenda :pendentes="..." :proxima="..." />`.

**Funcionou se:** o resumo continua mostrando 3 pendentes e "Matemática —
18/11", e muda quando você marca uma entrega como feita.

---

## Passo 2 — `ItemEntrega` (props e emits)

Uma entrega da lista: o `<li>` com a data, a matéria, a etiqueta e os
botões.

- Crie o `src/components/ItemEntrega.vue`. Ele recebe a `entrega` por
  prop.
- Os botões ficam no item, mas a lista é do `App`. Então o item **avisa**,
  com **dois eventos**:
  - `alternar`, quando clicam em Feita ou Reabrir;
  - `apagar`, quando clicam em Apagar.

  Os dois levam a entrega junto.
- O `App` escuta os dois avisos e chama a `alternarFeita` e a
  `apagarEntrega`, que continuam lá.

> **Dicas**
>
> - O `v-for` e o `:key` ficam no `App`, no `<ItemEntrega>`. No componente,
>   o `<li>` fica sem eles.
> - Dois eventos: `defineEmits(['alternar', 'apagar'])`.
> - O item usa a `formatarData` e a `nomearTipo`: importe de `'../agenda.js'`.
>   Se o `App.vue` não usar mais nenhuma das duas, tire do import dele.
> - O item **não** faz `entrega.feita = !entrega.feita`: a entrega também é
>   do `App`. O item só avisa.

**Funcionou se:** Feita, Reabrir e Apagar funcionam como antes, inclusive
com o filtro ligado.

---

## Passo 3 — `FormularioEntrega` (emits)

- Crie o `src/components/FormularioEntrega.vue` com o `<form>` inteiro, os
  três `ref` dos campos e a função de adicionar (com o nome
  `enviarEntrega`) e a `limparFormulario`.
- Quando a entrega estiver pronta, o formulário avisa com o evento
  `adicionar`, levando a entrega junto.
- No `App`, a `adicionarEntrega` recebe a entrega e só faz o `push`.

**Funcionou se:** adicionar continua funcionando, a entrega nova aparece no
lugar certo da lista, e os campos limpam.

---

## Se sobrar tempo

- **Um indicador reaproveitado.** Dentro do `ResumoAgenda`, os dois
  `<p class="indicador">` são iguais. Crie um `IndicadorAgenda.vue` com as
  props `rotulo` e `valor`, e use-o duas vezes **dentro** do
  `ResumoAgenda`. Um componente dentro do outro!
- **O cabeçalho.** Um `CabecalhoAgenda.vue` com o `<header>`. Bônus: as
  props `titulo` e `subtitulo`, para o mesmo componente servir em outro
  projeto.
- **A moldura.** Um `CartaoPainel.vue` com `<slot>`, como o dos gastos,
  usado no cartão Próximas entregas.

---

## Para entregar

Faça o commit e envie para o GitHub, mesmo que incompleto. Um commit por
passo.
