
export interface Gasto {
    id: string,
    descripcion: string,
    valor: number,
    categoria: string
    fecha: string
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

export interface EstadisticasGastosProps {
    gasto: Gasto[]
    totalGastos: number
}

export interface FiltroPorValorProps {
    valorMinimo: string
    setValorMinimo: (valor: string) => void
    valorMaximo: string
    setValorMaximo: (valor: string) => void
}

export interface OrdenarGastosProps {
    orden: string
    setOrden: (valor: string) => void
}

export interface TotalGastosProps {
    gastos: Gasto
}

export interface FiltrosGastos {
    gastos: Gasto[]
    filtroCategoria: string
    valorMinimo: string
    valorMaximo: string
}

export type OrdenGastos =
    | ""
    | "Mas Caro"
    | "Mas Barato"
    | "Mas Reciente"
    | "Mas Antiguo"

export type CategoriaGasto =
    | "Vivienda"
    | "Educación"
    | "Transporte" 
    | "Suscripciones" 
    | "Gustos" 
    | "Otro" 