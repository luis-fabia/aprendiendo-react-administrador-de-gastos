import type { Gasto } from "../../types/gasto"

export const GuardarGastos = (gastos: Gasto[])  => {
    const gastosGuardado = JSON.stringify(gastos)
    localStorage.setItem("Gastos", gastosGuardado)
}

export const RecuperarGastos = (): Gasto[] => {
    const gastosRecuperados = localStorage.getItem("Gastos")

    if (gastosRecuperados) {
        return JSON.parse(gastosRecuperados)
    }

    return []
}


export const GuardarPresupuesto = (presupuesto: number): void => {
    localStorage.setItem("Presupuesto", String(presupuesto))
}

export const RecuperarPresupuesto = () =>{
    const presupuestoRecuperados = localStorage.getItem("Presupuesto")
    if(presupuestoRecuperados) {
        return Number(presupuestoRecuperados)
    }
    return 0
}