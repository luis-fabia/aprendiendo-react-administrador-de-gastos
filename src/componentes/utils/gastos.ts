import type { Gasto } from '../types/gasto'

export function calcularTotalGastos(gastos: Gasto[]): number {
    return gastos.reduce((acumulador, valorActual) => {
        return acumulador + valorActual.valor
    }, 0)
}