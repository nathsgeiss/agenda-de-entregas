/* ===========================================================
   useAbreFecha: um "aberto ou fechado" e a função que alterna.

   Cada chamada cria o seu próprio ref. Por isso, cada cartão que
   usa o useAbreFecha abre e fecha sozinho, sem mexer nos outros.
   (Uma store é o contrário: todos que a usam veem a mesma.)

   const { aberto, alternar } = useAbreFecha(false);
   =========================================================== */
import { ref } from 'vue';

export function useAbreFecha(inicial) {
    const aberto = ref(inicial);

    function alternar() {
        aberto.value = !aberto.value;
    }

    // Devolve um objeto com refs e funções: dá para desestruturar
    // sem perder a reatividade.
    return { aberto, alternar };
}
