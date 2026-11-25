# Agenda de entregas com Pinia — passo a passo

Este projeto foi preparado a partir da pasta `agenda-pinia-ponto-de-partida` do exercício de 23/11. Os quatro passos obrigatórios do enunciado estão implementados. As duas sugestões em **Se sobrar tempo** são opcionais e não foram incluídas.

## Abrir no VS Code

1. Extraia o ZIP.
2. No VS Code, selecione **Arquivo > Abrir Pasta** e escolha `agenda-pinia-ponto-de-partida` (não a pasta `06-cambio`).
3. Abra **Terminal > Novo Terminal**.
4. Execute, nesta ordem:

   ```powershell
   npm install
   npm run dev
   ```

5. Abra no navegador o endereço `http://localhost:5173/` (ou o endereço mostrado no terminal).

Se já estiver com a pasta original aberta, copie os arquivos deste projeto para a pasta correspondente, mantendo os nomes e subpastas. Exclua `src/entregas.js` se ele ainda existir. Não é preciso copiar `node_modules`.

## O que foi alterado, conforme o enunciado

### Passo 1 — Pinia instalado

- `package.json`: dependência `pinia`.
- `src/main.js`: `createPinia()` registrado com `.use(createPinia())`.

### Passo 2 — Store das entregas

- Novo `src/stores/entregas.js`: `defineStore('entregas', ...)`, lista com `ref`, persistência com `watch`/`localStorage` e três ações (`adicionarEntrega`, `alternarFeita` e `apagarEntrega`).
- Antigo `src/entregas.js` removido.
- As quatro páginas usam `useEntregasStore()`.

### Passo 3 — Getters

- `pendentes`: filtra e ordena por data.
- `proxima`: primeira entrega pendente.
- `filtrarEntregasDoTipo(tipo)`: devolve as entregas do tipo solicitado.
- A agenda usa `pendentes` e `proxima`, e a página Por tipo usa `filtrarEntregasDoTipo`.

### Passo 4 — storeToRefs

- Na `PaginaAgenda.vue`, `const { entregas } = storeToRefs(entregasStore)` mantém a lista reativa.
- As ações são desestruturadas diretamente da store.

## Como testar

1. Na agenda inicial, confira 3 pendentes e **Matemática — 18/11** como próxima entrega, se não houver dados salvos anteriormente no navegador.
2. Crie uma entrega em **Nova entrega** e confira se aparece na agenda.
3. Marque uma entrega como feita e veja se o total de pendentes muda.
4. Acesse o detalhe de uma entrega e apague-a.
5. Use o filtro **Mostrar** e abra a página **Por tipo**.
6. Atualize a página (F5) e confirme que as alterações continuam salvas.

**Importante:** o projeto usa a mesma chave de `localStorage` da agenda anterior. Se já tiver usado a agenda no mesmo navegador, os dados antigos continuarão aparecendo. Para testar os exemplos iniciais, use uma janela anônima ou limpe apenas os dados locais desse site.

## Commits por passo

O professor pede **um commit por passo**. Como o ZIP contém a solução pronta, para registrar fielmente quatro commits é necessário aplicar cada passo separadamente na sua cópia original e fazer o commit depois de cada etapa. Os arquivos alterados de cada passo estão descritos acima. Se optar por copiar tudo de uma vez, não diga que foram quatro commits separados; faça um commit único com o trabalho final:

```powershell
git add .
git commit -m "Implementa agenda de entregas com Pinia"
git push
```

Para quatro commits reais, a ordem sugerida de mensagens é:

1. `Instala e configura Pinia`
2. `Migra entregas para store Pinia`
3. `Adiciona getters de entregas`
4. `Usa storeToRefs na agenda`

Execute `git push` somente depois de verificar que está no repositório e na branch corretos.
