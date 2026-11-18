// O mapa do app: qual página aparece em qual endereço.
import { createRouter, createWebHashHistory } from 'vue-router';
import PaginaResumo from './pages/PaginaResumo.vue';
import PaginaHistorico from './pages/PaginaHistorico.vue';
import PaginaNovoGasto from './pages/PaginaNovoGasto.vue';
import PaginaGasto from './pages/PaginaGasto.vue';
import PaginaEscolherCategoria from './pages/PaginaEscolherCategoria.vue';
import PaginaConfirmarGasto from './pages/PaginaConfirmarGasto.vue';
import PaginaNaoEncontrada from './pages/PaginaNaoEncontrada.vue';

// Cada rota liga um caminho (path) a um componente de página.
const rotas = [
    { path: '/', component: PaginaResumo },
    { path: '/historico', component: PaginaHistorico },
    // O Novo gasto em três etapas
    { path: '/novo', component: PaginaNovoGasto },
    { path: '/novo/categoria', component: PaginaEscolherCategoria },
    { path: '/novo/confirmar', component: PaginaConfirmarGasto },
    // :id é um parâmetro: /gasto/1, /gasto/2... todos abrem a PaginaGasto
    { path: '/gasto/:id', component: PaginaGasto },
    // Qualquer outro endereço. O Router testa primeiro as rotas mais
    // específicas; por costume, a que pega tudo fica no fim da lista.
    { path: '/:pathMatch(.*)*', component: PaginaNaoEncontrada }
];

// createWebHashHistory: os endereços ficam com # (index.html#/historico).
// Assim, o app funciona em qualquer servidor, inclusive no GitHub Pages.
export const router = createRouter({
    history: createWebHashHistory(),
    routes: rotas
});
