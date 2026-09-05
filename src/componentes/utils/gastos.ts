import type { Gasto } from '../types/gasto'
import type { FiltrosGastos, OrdenGastos } from '../types/gasto'


export function calcularTotalGastos(gastos: Gasto[]): number {
    return gastos.reduce((acumulador, valorActual) => {
        return acumulador + valorActual.valor
    }, 0)
}


export function filtrarGastos({ gastos, filtroCategoria, valorMinimo, valorMaximo }: FiltrosGastos): Gasto[] {
    return gastos.filter((gasto) => {

        const categoriaValida =
            filtroCategoria === "" ||
            gasto.categoria === filtroCategoria

        const minimoValido =
            valorMinimo === "" ||
            gasto.valor >= Number(valorMinimo)

        const maximoValido =
            valorMaximo === "" ||
            gasto.valor <= Number(valorMaximo)

        return categoriaValida && minimoValido && maximoValido
    })

}


export function ordenarGastos(calcularGastosFiltrados: Gasto [], orden: OrdenGastos): Gasto [] {
    return [...calcularGastosFiltrados].sort((a, b) => {

        if (orden === "Mas Caro") {
            return b.valor - a.valor
        }

        if (orden === "Mas Barato") {
            return a.valor - b.valor
        }

        if (orden === "Mas Reciente") {
            return new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        }

        if (orden === "Mas Antiguo") {
            return new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
        }

        return 0
    })
}


export function FiltrarTotal(gastosFiltrados: Gasto[]) {
   return gastosFiltrados.reduce((acumulador, valorActual) => {
        return acumulador + valorActual.valor
    }, 0)

}