export interface Gasto {
    id: string,
    descripcion: string,
    valor: number,
    categoria: string
}

export interface GastoProps {
    gasto: Gasto
    eliminarGastos: (id: string,) => void
    editar: (gasto: Gasto) => void
}

export interface ResumenGastosProps {
    presupuesto: number,
    totalGastos: number,
    totalDisponible: number,
    filtroCategoria: string,
    totalFiltrado: number,
    mensaje: string
    reiniciar: () => void
}

export interface filtroCategoriaProps {
    filtroCategoria: string
    setFiltroCategoria: (valor: string) => void
}

export interface FormularioGastosProps {
    inputPresupuesto: string
    setInputPresupuesto: (valor: string) => void
    manejarPresupuesto: () => void
    agregarGasto: (
        descripcion: string,
        valor: number,
        categoria: string
    ) => void
}

export interface ResumenPorCategoriaProps {
    gastos: Gasto[]
}