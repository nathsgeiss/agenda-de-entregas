import { ref, watch } from 'vue';

export function useLocalStorage(chave, valorInicial) {
    const valor = ref(valorInicial);

    try {
        const salvo = localStorage.getItem(chave);
        if (salvo !== null) valor.value = JSON.parse(salvo);
    } catch (erro) {
        console.warn(`Não foi possível carregar ${chave}:`, erro);
    }

    watch(valor, (novoValor) => {
        try {
            localStorage.setItem(chave, JSON.stringify(novoValor));
        } catch (erro) {
            console.warn(`Não foi possível salvar ${chave}:`, erro);
        }
    }, { deep: true });

    return valor;
}
