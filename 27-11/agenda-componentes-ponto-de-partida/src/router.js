import { createRouter, createWebHashHistory } from 'vue-router';
import PaginaAgenda from './pages/PaginaAgenda.vue';
import PaginaNovaEntrega from './pages/PaginaNovaEntrega.vue';
import PaginaEntrega from './pages/PaginaEntrega.vue';
import PaginaTipos from './pages/PaginaTipos.vue';

const rotas = [
    { path: '/', component: PaginaAgenda },
    { path: '/nova', component: PaginaNovaEntrega },
    { path: '/entrega/:id', component: PaginaEntrega },
    { path: '/tipos', component: PaginaTipos }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes: rotas
});
