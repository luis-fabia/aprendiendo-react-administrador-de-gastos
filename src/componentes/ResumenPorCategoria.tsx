import type { ResumenPorCategoriaProps } from '../types/gasto';

export function ResumenPorCategoria({ gastos }: ResumenPorCategoriaProps) {

    const totalPorCategoria = gastos.reduce((acumulador, valorActual) => {

        if (!acumulador[valorActual.categoria]) {
            acumulador[valorActual.categoria] = valorActual.valor
        }
        else {
            acumulador[valorActual.categoria] += valorActual.valor
        }

        return acumulador

    }, {})
    return (
        <>
            <h1>Resumen Por Categoría</h1>

            {Object.entries(totalPorCategoria).map(([categoria, total]) => (
                <h2 key={categoria}>
                    {categoria}: {total}
                </h2>
            ))}
        </>
    );
}