import type { EstadisticasGastosProps } from "../types/gasto";

export function EstadisticasGastos({ gastos, totalGastos }: EstadisticasGastosProps) {


    const mayorGasto = gastos.length > 0 ?
        gastos.reduce((acumulador, valorActual) => {
            if (acumulador.valor > valorActual.valor) {
                return acumulador
            }
            return valorActual

        }, gastos[0])
        : null

    const menorGasto = gastos.length > 0 ? 
         gastos.reduce((acumulador, valorActual) => {
        if (acumulador.valor < valorActual.valor) {
            return acumulador
        }

        return valorActual

    }, gastos[0])  
    : null


    const gastoPromedio = gastos.length > 0 ? totalGastos / gastos.length : 0


    return (
        <>
            <h2>Estadisticas</h2>
            <p>Cantidad de Gatos: {gastos.length}</p>
            <p>Gasto promedio: ${gastoPromedio}</p>
            {mayorGasto && (
                <p>
                    Mayor gasto: {mayorGasto.descripcion} - ${mayorGasto.valor}
                </p>
            )}

            { menorGasto && (
                <p>
                    Meno Gasto: {menorGasto.descripcion} - ${menorGasto.valor}
                </p>

            )}

        </>
    );
}