# Agenda de entregas — com composables

A agenda vai ganhar os mesmos composables do controle de gastos. O mais
legal: os arquivos da pasta `composables` servem do jeito que estão. É só
copiar.

**Ponto de partida:** a sua agenda da aula passada (com Pinia) ou, se você
não tiver, a pasta `agenda-composables-ponto-de-partida` (`npm install` e
`npm run dev` dentro dela).

O `composables-passo-a-passo.md` continua valendo como consulta: cada passo
daqui tem um pedaço parecido lá.

---

## Passo 1 — useLocalStorage na store

- Crie a pasta `src/composables` e copie para ela o `useLocalStorage.js`
  dos gastos (ou escreva de novo, olhando o passo a passo).
- Na store das entregas (`src/stores/entregas.js`), troque o `ref` e o
  `watch` por uma linha:
  `const entregas = useLocalStorage(CHAVE, ENTREGAS_INICIAIS);`
- Agora a `carregarEntregas` e a `salvarEntregas` não são mais usadas:
  apague as duas. Tire também o `ref` e o `watch` do import do `vue`.

> **Dicas**
>
> - É o pedaço 1 dos gastos.
> - O import, na store: `'../composables/useLocalStorage.js'`.
> - Use a **mesma** `CHAVE` de antes. Com outra, a agenda volta às entregas
>   de exemplo.

**Funcionou se:** tudo funciona como antes, e as suas entregas continuam
lá depois de recarregar.

---

## Passo 2 — O filtro lembrado

- Na `PaginaAgenda`, o filtro (`tipoEscolhido`) é um `ref('todos')`.
  Troque por `useLocalStorage('filtro-agenda', 'todos')`.

> **Dica:** é o pedaço 2 dos gastos. No navegador, na aba Application
> (Armazenamento), dá para ver a chave `filtro-agenda` aparecer.

**Funcionou se:** escolha "Só trabalhos", recarregue a página: o filtro
continua em "Só trabalhos".

---

## Passo 3 — Ver as feitas

- Copie o `useAbreFecha.js` dos gastos para a pasta `composables`.
- No `CartaoTipo`, chame o composable:
  `const { aberto, alternar } = useAbreFecha(false);`.
- Embaixo das pendentes, um botão que mostra "Ver feitas (1)" (a
  quantidade de feitas daquele tipo) e, quando está aberto, "Esconder
  feitas". Clicar nele chama o `alternar`.
- Com `v-if="aberto"`, a lista das feitas daquele tipo. Elas podem vir da
  store:
  `entregasStore.filtrarEntregasDoTipo(props.resumo.tipo)`, só as que têm
  `feita` igual a `true`. Que tal riscadas (`line-through`)?

> **Dicas**
>
> - É o pedaço 3 dos gastos (o `CartaoMeta`).
> - Para usar a prop no script: `const props = defineProps(...)`, e depois
>   `props.resumo`.
> - O `useAbreFecha` vai **dentro do `CartaoTipo`**, não na `PaginaTipos`.
>   Por quê? Teste abrir um cartão e veja o que acontece com os outros.

**Funcionou se:** abrir as feitas de Trabalhos não abre as de Provas, nem
as de Apresentações.

---

## Se sobrar tempo

**Quantos dias faltam.** Na página de uma entrega pendente, mostre
"Ainda está pendente: faltam 3 dias" (ou "falta 1 dia", "é hoje", "passou
há 2 dias").

- Copie o `useAgora.js` dos gastos. Na `PaginaEntrega`:
  `const agora = useAgora(60000);` (a cada minuto basta: o que importa é o
  dia).
- No `agenda.js`, uma função `calcularDiasAte(data, agora)`, que devolve
  quantos dias faltam. Uma ajuda para a conta:

  ```js
  const dia = new Date(data + 'T00:00');   // meia-noite do dia da entrega
  const hoje = new Date(agora);
  hoje.setHours(0, 0, 0, 0);               // meia-noite de hoje
  // dia - hoje dá a diferença em milissegundos; um dia tem 86400000
  ```

- E uma `montarTextoDosDias(dias)`, que transforma o número no texto.

> **Dica:** sem o `'T00:00'`, o JavaScript entende a data como meia-noite
> em Londres (21h do dia anterior aqui), e a conta sai com um dia a menos.

---

## Para entregar

Faça o commit e envie para o GitHub, mesmo que incompleto. Um commit por
passo.
