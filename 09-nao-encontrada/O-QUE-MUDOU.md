# Etapa 9 · a página não encontrada

**Arquivos modificados**

- `src/pages/PaginaNaoEncontrada.vue`: **novo**.
- `src/router.js`: a rota `/:pathMatch(.*)*`, no fim da lista.

**Como fica:** qualquer endereço que não existe (`#/qualquer/coisa`)
mostra "Página não encontrada", com um link para o resumo.

**O que explicar** (slide 27): é uma receita da documentação. O `(.*)*`
aceita qualquer caminho, e o Router só usa essa rota quando nenhuma outra
combina. Não vale gastar tempo com a expressão regular.
