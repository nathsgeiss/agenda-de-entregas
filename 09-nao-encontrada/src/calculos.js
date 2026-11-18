/* ===========================================================
   As funções que só devolvem, com o JavaScript de hoje.

   O calcularTotal trocou o for pelo reduce. A filtrarGastos e a
   calcularTotalDaCategoria saíram: quem precisa filtra com o
   filter, usando a passaNoFiltro como regra, e soma com o
   calcularTotal.
   =========================================================== */

export function formatarReais(valor) {
    return 'R$ ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function calcularMedia(total, quantidade) {
    if (quantidade === 0) {
        return 0;
    }
    return total / quantidade;
}

export function montarTextoDoGasto(gasto) {
    return gasto.descricao + ' — ' + formatarReais(gasto.valor);
}

export function montarMensagemDoOrcamento(restante) {
    if (restante >= 0) {
        return formatarReais(restante) + ' disponíveis';
    }
    return 'Passou ' + formatarReais(-restante) + ' do orçamento';
}

export function passouDoOrcamento(total, orcamento) {
    return total > orcamento;
}

// calcularTotal([{ valor: 12.5 }, { valor: 30 }]) → 42.5
// O reduce passa por cada gasto levando uma soma, que começa em 0.
export function calcularTotal(gastos) {
    return gastos.reduce((soma, gasto) => soma + gasto.valor, 0);
}

export function calcularMaiorGasto(gastos) {
    let maior = gastos[0];
    for (let i = 1; i < gastos.length; i++) {
        if (gastos[i].valor > maior.valor) {
            maior = gastos[i];
        }
    }
    return maior;
}

export function calcularMenorGasto(gastos) {
    let menor = gastos[0];
    for (let i = 1; i < gastos.length; i++) {
        if (gastos[i].valor < menor.valor) {
            menor = gastos[i];
        }
    }
    return menor;
}

// Quanto a parte é do total, de 0 a 100.
// calcularPorcentagem(25, 50) → 50
// calcularPorcentagem(0, 0)   → 0   (sem isso, 0 / 0 dá NaN)
export function calcularPorcentagem(parte, total) {
    if (total === 0) {
        return 0;
    }
    return parte / total * 100;
}

// O gasto aparece com este filtro?
// passaNoFiltro({ descricao: 'lanche', valor: 12.5, categoria: 'Alimentação' }, 'Lazer') → false
// Usada com o filter: gastos.filter((gasto) => passaNoFiltro(gasto, 'Lazer'))
export function passaNoFiltro(gasto, categoria) {
    return categoria === 'Todas' || gasto.categoria === categoria;
}

// montarTextoDoFiltro(0, 0) → 'Nenhum gasto ainda'
// montarTextoDoFiltro(4, 4) → 'Todos os 4 gastos'
// montarTextoDoFiltro(2, 4) → 'Mostrando 2 de 4 gastos'
export function montarTextoDoFiltro(mostrados, total) {
    if (total === 0) {
        return 'Nenhum gasto ainda';
    }
    if (total === 1 && mostrados === 1) {
        return '1 gasto';
    }
    if (mostrados === total) {
        return 'Todos os ' + total + ' gastos';
    }
    return 'Mostrando ' + mostrados + ' de ' + total + ' gastos';
}

// O required e o min já barram o campo vazio e o valor zero
// ou negativo. Sobrou só uma descrição feita só de espaços.
export function montarErroDoGasto(gasto) {
    if (gasto.descricao === '') {
        return 'Só espaços não vale.';
    }
    return '';
}
