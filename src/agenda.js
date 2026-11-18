// Funções auxiliares para a Agenda de Entregas

export function formatarData(dataIso) {
    if (!dataIso) return '';
    const partes = dataIso.split('-');
    return `${partes[2]}/${partes[1]}`;
}

export function nomearTipo(tipo) {
    const nomes = {
        prova: 'Prova',
        trabalho: 'Trabalho',
        apresentacao: 'Apresentação'
    };
    return nomes[tipo] || tipo;
}

export function ordenarPorData(lista) {
    return [...lista].sort((a, b) => new Date(a.data) - new Date(b.data));
}

export function filtrarPendentes(lista) {
    return lista.filter(e => !e.feita);
}

export function passaNoFiltro(entrega, filtro) {
    if (filtro === 'todos') return true;
    return entrega.tipo === filtro;
}

export function montarTextoDaProxima(lista) {
    const pendentes = ordenarPorData(filtrarPendentes(lista));
    if (pendentes.length === 0) {
        return 'Nada pendente';
    }
    const proxima = pendentes[0];
    return `${proxima.materia} — ${formatarData(proxima.data)}`;
}