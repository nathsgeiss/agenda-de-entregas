import { ref, onMounted, onUnmounted } from 'vue';

export function useAgora(intervalo = 60000) {
    const agora = ref(new Date());
    let temporizador;

    onMounted(() => {
        temporizador = setInterval(() => {
            agora.value = new Date();
        }, intervalo);
    });

    onUnmounted(() => clearInterval(temporizador));

    return agora;
}
