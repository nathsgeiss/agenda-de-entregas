<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function irParaTras() {
    router.back();
}

function irParaFrente() {
    router.forward();
}
</script>

<template>
    <header class="topo">
        <h1>Agenda de entregas</h1>
        <p>Provas, trabalhos e apresentações em um só lugar.</p>

        <!-- Menu de Navegação e Setas (Passo 3 e 4) -->
        <nav class="menu" style="margin-top: 16px; display: flex; justify-content: center; align-items: center; gap: 16px;">
            <button type="button" @click="irParaTras" style="background: transparent; border: none; color: #ffffff; font-size: 18px; cursor: pointer;" title="Voltar">
                ←
            </button>

            <div style="display: flex; gap: 12px;">
                <RouterLink to="/" class="link-menu" style="color: #ffffff; text-decoration: none; padding: 6px 12px; border-radius: 6px;">
                    Agenda
                </RouterLink>
                <RouterLink to="/nova" class="link-menu" style="color: #ffffff; text-decoration: none; padding: 6px 12px; border-radius: 6px;">
                    Nova entrega
                </RouterLink>
            </div>

            <button type="button" @click="irParaFrente" style="background: transparent; border: none; color: #ffffff; font-size: 18px; cursor: pointer;" title="Avançar">
                →
            </button>
        </nav>
    </header>

    <main>
        <RouterView />
    </main>

    <footer class="rodape">
        <p>Feito por Nathália</p>
    </footer>
</template>

<style scoped>
/* Estilo ativo do menu RouterLink inspirado no guia de gastos */
.router-link-exact-active {
    background-color: rgba(255, 255, 255, 0.2);
    font-weight: bold;
}
</style>