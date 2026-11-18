import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { router } from './router.js';

// .use(router) liga o Router ao app: a partir daqui, o <RouterView>
// e o <RouterLink> funcionam em qualquer componente.
createApp(App).use(router).mount('#app');
