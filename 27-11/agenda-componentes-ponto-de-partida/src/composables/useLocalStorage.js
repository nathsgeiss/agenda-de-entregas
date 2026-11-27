/* ===========================================================
   useLocalStorage: um ref que se salva sozinho no localStorage.

   É um composable: uma função que usa os recursos do Vue (aqui,
   ref e watch) e devolve algo reativo. Quem chama recebe um ref
   comum; a diferença é que ele já começa com o valor salvo, e
   toda mudança nele é salva.

   useLocalStorage('chave', valorInicial) → um ref
   =========================================================== */
import { ref, watch } from 'vue';

// O valor salvo na chave, ou o valor inicial se ainda não houver.
function lerDoLocalStorage(chave, valorInicial) {
    const salvo = localStorage.getItem(chave);
    if (salvo === null) {
        return valorInicial;
    }
    return JSON.parse(salvo);
}

export function useLocalStorage(chave, valorInicial) {
    const valor = ref(lerDoLocalStorage(chave, valorInicial));

    // Toda mudança é salva (o deep: true vale também para listas e objetos).
    watch(valor, (novoValor) => {
        localStorage.setItem(chave, JSON.stringify(novoValor));
    }, { deep: true });

    return valor;
}
