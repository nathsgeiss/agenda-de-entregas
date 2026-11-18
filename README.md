# Agenda de entregas

Atividade acadêmica de migração da agenda JavaScript para Vue 3, conforme `atividade-agenda-vue.md`. Usa o HTML e o CSS de `agenda-vue-ponto-de-partida` e as ideias de reatividade do exemplo `gastos-vue`.

## Tecnologias e funcionalidades

Vue 3 (Composition API e `<script setup>`), JavaScript, HTML, CSS e Vite. Playwright é usado somente nos testes de desenvolvimento.

- Cadastro com matéria, tipo e data obrigatórios; rejeição de matéria só com espaços.
- Lista ordenada por data, cores por tipo e filtros de provas, trabalhos e apresentações.
- Marcar como feita, reabrir, apagar uma entrega e apagar todas as feitas.
- Resumo global com pendentes, próxima entrega e feitas, independente do filtro.
- Mensagem “Nada por aqui.” quando a lista ou o filtro estiver vazio.
- Salvamento automático com `watch` profundo e recuperação no `localStorage`.
- Tratamento de dados inválidos e falhas de armazenamento; recuperação de registros da agenda JavaScript anterior.

## Executar no PowerShell

Abra esta pasta no VS Code. Nesta máquina foi baixado o Node.js LTS v26.13.1 em `.tools`, sem modificar o PATH permanente do Windows.

```powershell
.\iniciar.cmd
```

Abra o endereço exibido no terminal, normalmente http://127.0.0.1:5173. Para encerrar, pressione Ctrl+C. Também há a tarefa **Iniciar agenda** no VS Code. Use o servidor Vite, em vez de Live Server ou abrir o HTML diretamente.

Para executar os comandos npm com o Node local, prepare o terminal:

```powershell
$env:Path = "$PWD\.tools\node-v26.13.1-win-x64;$env:Path"
npm.cmd install
npm.cmd run dev
```

Em outro computador, instale o Node.js LTS pelo [site oficial](https://nodejs.org/). Vue e Vite são dependências locais; não precisam de instalação global. A pasta `.tools` não vai para o Git.

## Produção

```powershell
npm.cmd run build
npm.cmd run preview
```

O build é gerado em `dist/`, ignorado pelo Git. Prepare o PATH acima se estiver usando o Node local.

## Testes

```powershell
$env:Path = "$PWD\.tools\node-v26.13.1-win-x64;$env:Path"
$env:PLAYWRIGHT_BROWSERS_PATH = "$PWD\.tools\browsers"
npx.cmd playwright install chromium
npm.cmd test
```

Os testes abrem um navegador isolado e verificam cadastro, validação de espaços, ordenação, resumo, filtros, Feita/Reabrir, exclusões, recarga, lista vazia persistente, dados inválidos, compatibilidade com dados antigos e largura de celular. Não alteram os dados do seu navegador pessoal.

## Armazenamento e organização

Os dados ficam na chave `agenda-de-entregas` do `localStorage`, por navegador e origem (endereço e porta). A lista vazia é preservada após recarregar. Os quatro exemplos só são usados quando não existe estado salvo ou quando ele não pode ser recuperado. Dados inválidos geram um aviso; uma alteração posterior tenta gravar a lista atual. Limpar os dados do site remove os registros. Não há backend, conta nem sincronização entre dispositivos.

`src/agenda.js` reúne as seis funções auxiliares do exercício e a validação de data. `src/armazenamento.js` concentra leitura e validação do armazenamento. `src/App.vue` contém formulário, lista, resumo e reatividade. `src/style.css` mantém os estilos do ponto de partida com pequenos ajustes para os extras e telas estreitas.

Os projetos fornecidos estão preservados nas pastas originais. A versão JavaScript anterior foi copiada para `legado/` antes da troca do `index.html` da raiz. O `script.js` e o `style.css` antigos da raiz foram preservados, mas a aplicação Vue usa somente os arquivos de `src/`.

## Commit e GitHub

Revise os arquivos no controle de versão do VS Code antes do commit. `node_modules/`, `dist/`, `.tools/`, resultados dos testes, `.env` e logs estão ignorados. Não foi feito commit nem push automático.

```powershell
git status
git add .
git commit -m "Implementa agenda de entregas completa em Vue"
git remote -v
git branch -vv
git push
```

O `git push` depende de remoto e branch de acompanhamento configurados. Confira com os dois comandos anteriores. Se a branch `main` ainda não tiver acompanhamento e o remoto `origin` estiver correto, use `git push -u origin main`.
