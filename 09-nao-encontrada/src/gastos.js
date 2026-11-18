/* ===========================================================
   Os dados do app inteiro.

   A lista de gastos saiu de dentro da página e veio para cá.
   Quem importa o gastos recebe ESTE ref, o mesmo para todas as
   páginas: uma página adiciona, e a outra já vê.
   =========================================================== */
import { ref, watch } from 'vue';

export const ORCAMENTO = 50;

export const CATEGORIAS = [
    { nome: 'Alimentação' },
    { nome: 'Transporte' },
    { nome: 'Lazer' }
];

const CHAVE = 'pra-onde-foi-meu-dinheiro';

// Os gastos de exemplo, para a primeira vez que a página abre.
const GASTOS_DE_EXEMPLO = [
    { id: 1, descricao: 'lanche', valor: 12.5, categoria: 'Alimentação' },
    { id: 2, descricao: 'ônibus', valor: 4.35, categoria: 'Transporte' },
    { id: 3, descricao: 'cinema', valor: 30, categoria: 'Lazer' }
];

function carregarGastos() {
    const salvos = localStorage.getItem(CHAVE);
    if (salvos === null) {
        return GASTOS_DE_EXEMPLO;
    }
    return JSON.parse(salvos);
}

function salvarGastos(lista) {
    localStorage.setItem(CHAVE, JSON.stringify(lista));
}

// A única coisa que o programa lembra, agora para o app inteiro.
export const gastos = ref(carregarGastos());

// Toda mudança na lista é salva.
watch(gastos, salvarGastos, { deep: true });

export function adicionarGasto(gasto) {
    gastos.value.push(gasto);
}

// Uma lista nova, com todos os gastos menos o apagado.
export function apagarGasto(gastoApagado) {
    gastos.value = gastos.value.filter((gasto) => gasto.id !== gastoApagado.id);
}

export function desfazerUltimoGasto() {
    gastos.value.pop();
}
