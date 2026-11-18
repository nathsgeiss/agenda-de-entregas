/* ===========================================================
   As funções que só devolvem, vindas do script.js antigo.

   Elas não mexem na tela: recebem valores e devolvem um
   resultado. Por isso vieram para o Vue sem mudar uma linha.
   A única diferença é o export na frente de cada uma.
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
export function calcularTotal(gastos) {
    let total = 0;
    for (let i = 0; i < gastos.length; i++) {
        total = total + gastos[i].valor;
    }
    return total;
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

export function calcularTotalDaCategoria(gastos, nomeDaCategoria) {
    let total = 0;
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].categoria === nomeDaCategoria) {
            total = total + gastos[i].valor;
        }
    }
    return total;
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
export function passaNoFiltro(gasto, categoria) {
    return categoria === 'Todas' || gasto.categoria === categoria;
}

// Uma lista NOVA, só com os gastos que passam no filtro.
export function filtrarGastos(gastos, categoria) {
    const filtrados = [];
    for (let i = 0; i < gastos.length; i++) {
        if (passaNoFiltro(gastos[i], categoria)) {
            filtrados.push(gastos[i]);
        }
    }
    return filtrados;
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
