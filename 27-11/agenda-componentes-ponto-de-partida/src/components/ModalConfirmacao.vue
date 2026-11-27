<script setup>
import { onMounted, onUnmounted, watch } from 'vue';

defineProps({ titulo: { type: String, default: 'Confirmar ação' } });
const aberto = defineModel({ type: Boolean, default: false });

function fechar() {
    aberto.value = false;
}

function aoTeclar(evento) {
    if (evento.key === 'Escape' && aberto.value) fechar();
}

watch(aberto, (estaAberto) => {
    if (estaAberto) document.addEventListener('keydown', aoTeclar);
    else document.removeEventListener('keydown', aoTeclar);
});

onMounted(() => {
    if (aberto.value) document.addEventListener('keydown', aoTeclar);
});
onUnmounted(() => document.removeEventListener('keydown', aoTeclar));
</script>

<template>
    <Teleport to="body">
        <div v-if="aberto" class="modal-fundo" @click.self="fechar">
            <section class="modal-caixa" role="dialog" aria-modal="true" aria-labelledby="titulo-confirmacao">
                <h2 id="titulo-confirmacao">{{ titulo }}</h2>
                <div class="modal-mensagem"><slot /></div>
                <div class="modal-botoes">
                    <button type="button" class="botao-cancelar" @click="fechar">Cancelar</button>
                    <slot name="botoes" />
                </div>
            </section>
        </div>
    </Teleport>
</template>
