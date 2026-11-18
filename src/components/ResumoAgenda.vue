<script setup>
import { formatarData } from '../agenda.js';

defineProps({
    pendentes: Number,
    feitas: Number,
    proxima: Object // Agora recebe o objeto da próxima entrega (ou undefined)
});

defineEmits(['limpar-feitas']);
</script>

<template>
    <section class="cartao resumo">
        <h2>Resumo</h2>

        <div class="indicadores" style="grid-template-columns: 1fr 1fr 1fr;">
            <p class="indicador">
                <span class="rotulo">Pendentes</span>
                <strong class="pendentes">{{ pendentes }}</strong>
            </p>

            <p class="indicador">
                <span class="rotulo">Feitas</span>
                <strong class="feitas">{{ feitas }}</strong>
            </p>

            <p class="indicador" style="grid-column: span 2;">
                <span class="rotulo">Próxima entrega</span>
                <strong class="proxima">
                    <RouterLink 
                        v-if="proxima" 
                        :to="`/entrega/${proxima.id}`" 
                        class="materia"
                        style="color: var(--cor-principal); text-decoration: none;"
                    >
                        {{ proxima.materia }} — {{ formatarData(proxima.data) }}
                    </RouterLink>
                    <span v-else>—</span>
                </strong>
            </p>
        </div>

        <div v-if="feitas > 0" style="margin-top: 14px;">
            <button 
                type="button" 
                @click="$emit('limpar-feitas')" 
                class="botao-adicionar" 
                style="background-color: var(--cor-suave); font-size: 14px; padding: 8px;"
            >
                Limpar entregas feitas
            </button>
        </div>
    </section>
</template>