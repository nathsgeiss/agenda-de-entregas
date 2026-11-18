/* ===========================================================
   O rascunho do gasto que está sendo preenchido.

   O Novo gasto virou três páginas: descrição e valor, categoria
   e confirmação. As três precisam do mesmo gasto pela metade,
   então ele mora num módulo, como a lista do gastos.js.

   Ele não é salvo no localStorage: recarregou, o rascunho some.
   =========================================================== */
import { ref } from 'vue';

function criarRascunhoVazio() {
    return { descricao: '', valor: '', categoria: '' };
}

export const rascunho = ref(criarRascunhoVazio());

export function limparRascunho() {
    rascunho.value = criarRascunhoVazio();
}
