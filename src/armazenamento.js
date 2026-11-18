import { dataValida } from './agenda.js';

export const CHAVE_STORAGE = 'agenda-de-entregas';
export const entregasPadrao = [
  { id: 1, materia: 'Matemática', tipo: 'prova', data: '2026-11-18', feita: false },
  { id: 2, materia: 'História', tipo: 'trabalho', data: '2026-11-25', feita: false },
  { id: 3, materia: 'Português', tipo: 'trabalho', data: '2026-11-10', feita: true },
  { id: 4, materia: 'Inglês', tipo: 'apresentacao', data: '2026-11-20', feita: false },
];

export function carregarEntregas(storage) {
  const salvo = storage.getItem(CHAVE_STORAGE);
  if (salvo === null) return entregasPadrao.map(entrega => ({ ...entrega }));
  const lista = JSON.parse(salvo);
  if (!Array.isArray(lista)) throw new Error('Lista inválida');
  const ids = new Set();
  // Também aceita os tipos e a ausência de id da agenda JavaScript anterior.
  return lista.map((entrega, indice) => {
    if (!entrega || typeof entrega !== 'object') throw new Error('Entrega inválida');
    const tipo = { Prova: 'prova', Trabalho: 'trabalho', 'Apresentação': 'apresentacao' }[entrega.tipo] || entrega.tipo;
    const id = entrega.id ?? `legado-${indice}`;
    if (!['string', 'number'].includes(typeof id) || !String(id).trim() || ids.has(String(id)) ||
        typeof entrega.materia !== 'string' || !entrega.materia.trim() ||
        !['prova', 'trabalho', 'apresentacao'].includes(tipo) ||
        !dataValida(entrega.data) || typeof entrega.feita !== 'boolean') {
      throw new Error('Entrega inválida');
    }
    ids.add(String(id));
    return { id, materia: entrega.materia.trim(), tipo, data: entrega.data, feita: entrega.feita };
  });
}
