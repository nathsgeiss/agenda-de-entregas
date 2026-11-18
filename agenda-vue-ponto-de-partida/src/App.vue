<template>
    <header class="topo">
        <h1>Agenda de entregas</h1>
        <p>Provas, trabalhos e apresentações em um só lugar.</p>
    </header>

    <main class="painel">

        <section class="cartao resumo">
            <h2>Resumo</h2>

            <div class="indicadores">
                <p class="indicador">
                    <span class="rotulo">Pendentes</span>
                    <strong class="pendentes">0</strong>
                </p>

                <p class="indicador">
                    <span class="rotulo">Próxima entrega</span>
                    <strong class="proxima">—</strong>
                </p>
            </div>
        </section>

        <section class="cartao nova-entrega">
            <form class="formulario">
                <fieldset>
                    <legend>Nova entrega</legend>

                    <p>
                        <label for="materia">Matéria</label>
                        <input type="text" id="materia" class="campo-materia" placeholder="Ex.: Matemática" required>
                    </p>

                    <p>
                        <label for="tipo">Tipo</label>
                        <select id="tipo" class="campo-tipo" required>
                            <option value="">Escolha o tipo</option>
                            <option value="prova">Prova</option>
                            <option value="trabalho">Trabalho</option>
                            <option value="apresentacao">Apresentação</option>
                        </select>
                    </p>

                    <p>
                        <label for="data">Data</label>
                        <input type="date" id="data" class="campo-data" required>
                    </p>

                    <button type="submit" class="botao-adicionar">Adicionar</button>
                </fieldset>
            </form>
        </section>

        <section class="cartao entregas">
            <h2>Próximas entregas</h2>

            <p class="filtro">
                <label for="filtro">Mostrar</label>
                <select id="filtro" class="campo-filtro">
                    <option value="todos">Tudo</option>
                    <option value="prova">Só provas</option>
                    <option value="trabalho">Só trabalhos</option>
                    <option value="apresentacao">Só apresentações</option>
                </select>
            </p>

            <ul class="lista"></ul>
        </section>

    </main>

    <footer class="rodape">
        <p>Feito por Gui</p>
    </footer>
</template>
