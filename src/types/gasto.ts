
export interface Gasto {
    id: string,
    descripcion: string,
    valor: number,
    categoria: CategoriaGasto
    fecha: string
}

export type GastoEditable = Pick<
    Gasto,
    "descripcion" | "valor" | "categoria"
>

export interface GastoProps {
    gasto: Gasto
    eliminarGastos: (id: string,) => void
    editar: (id: string, cambios: GastoEditable) => void
}

export type FiltroCategoria = "" | CategoriaGasto

export interface ResumenGastosProps {
    presupuesto: number,
    totalGastos: number,
    totalDisponible: number,
    filtroCategoria: FiltroCategoria,
    totalFiltrado: number,
    mensaje: string
    reiniciar: () => void
}

export interface filtroCategoriaProps {
    filtroCategoria: FiltroCategoria
    setFiltroCategoria: (valor: FiltroCategoria) => void
}

export interface FormularioGastosProps {
    inputPresupuesto: string
    setInputPresupuesto: (valor: string) => void
    manejarPresupuesto: () => void
    agregarGasto: (
    descripcion: string,
    valor: number,
    categoria: CategoriaGasto
) => boolean
}

export interface ResumenPorCategoriaProps {
    gastos: Gasto[]
}

export interface EstadisticasGastosProps {
    gastos: Gasto[]
    totalGastos: number
}

export interface FiltroPorValorProps {
    valorMinimo: string
    setValorMinimo: (valor: string) => void
    valorMaximo: string
    setValorMaximo: (valor: string) => void
}

export interface OrdenarGastosProps {
    orden: OrdenGastos
    setOrden: (valor: OrdenGastos) => void
}

export interface TotalGastosProps {
    gastos: Gasto[]
}

export interface FiltrosGastos {
    gastos: Gasto[]
    filtroCategoria: FiltroCategoria    
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