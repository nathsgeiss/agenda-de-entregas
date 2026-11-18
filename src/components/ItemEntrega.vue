<script setup>
import { formatarData } from '../agenda.js';

defineProps({
    entrega: Object
});

defineEmits(['alternar', 'apagar']);
</script>

<template>
    <li 
        class="entrega"
        :class="{ feita: entrega.feita }"
        :data-tipo="entrega.tipo"
    >
        <span class="data">{{ formatarData(entrega.data) }}</span>
        
        <div class="info">
            <RouterLink :to="`/entrega/${entrega.id}`" class="materia">
                {{ entrega.materia }}
            </RouterLink>
            <span class="etiqueta">{{ entrega.tipo }}</span>
        </div>

        <div class="acoes">
            <button 
                type="button" 
                class="btn-acao" 
                @click="$emit('alternar', entrega.id)"
            >
                {{ entrega.feita ? 'Reabrir' : 'Feita' }}
            </button>
            <button 
                type="button" 
                class="botao-apagar" 
                @click="$emit('apagar', entrega.id)"
            >
                Apagar
            </button>
        </div>
    </li>
</template>