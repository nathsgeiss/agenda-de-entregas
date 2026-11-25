import { ref } from 'vue';

export function useAbreFecha(valorInicial = false) {
    const aberto = ref(valorInicial);

    function alternar() {
        aberto.value = !aberto.value;
    }

    return { aberto, alternar };
}
