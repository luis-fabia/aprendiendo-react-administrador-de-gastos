import type { ResumenGastosProps } from '../types/gasto';


export function ResumenGastos({ presupuesto, totalGastos, totalDisponible, filtroCategoria, mensaje, totalFiltrado, reiniciar }: ResumenGastosProps) {

    let porcentaje = 0

    if (presupuesto > 0) {
        porcentaje = (totalGastos / presupuesto) * 100
    }

    let estado = ""

    if (presupuesto <= 0) {
        estado = "Sin presupuesto"
    } else if (porcentaje <= 49) {
        estado = "Normal"
    } else if (porcentaje <= 79) {
        estado = "Advertencia"
    } else if (porcentaje <= 100) {
        estado = "Peligro"
    } else {
        estado = "Superado"
    }




    return (
        <>
            <h2>Presupuesto: {presupuesto}</h2>
            <h2>Total Gastado: {totalGastos}</h2>
            <h2>Estado: {estado}</h2>
            <h2>Porcentaje utilizado: {porcentaje.toFixed(2)}%</h2>
            <h2>Disponible: {totalDisponible}</h2>
            {filtroCategoria ? (
                <h2>Total {filtroCategoria}: {totalFiltrado}</h2>
            ) : (
                <h2>Total General: {totalGastos}</h2>
            )}
            {totalDisponible < 0 && (
                <p>⚠️ Has superado tu presupuesto</p>
            )}
            {mensaje && (
                <p>{mensaje}</p>
            )}

            <button onClick={reiniciar}>Reiniciar</button>

        </>
    );
}