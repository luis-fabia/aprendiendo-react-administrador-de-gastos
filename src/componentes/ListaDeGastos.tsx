import { useCallback, useState, useEffect } from "react";
import type { Gasto } from "../types/gasto";
import { GatosItem } from "./GastoItem";
import { ResumenGastos } from "./ResumenGastos";
import { FiltroPorCategoria } from './FiltroCategoria.js'
import { FormularioGastos } from './FormularioGasto.js'
import { v4 as uuidv4 } from 'uuid'
import { GuardarGastos, RecuperarGastos, GuardarPresupuesto, RecuperarPresupuesto } from './utils/storage.js'
import { useLocalStorage } from "./hooks/useLocalStorage.js";

export function ListaDeGastos() {

    const [gastos, setGastos] = useLocalStorage<Gasto[]>("Gastos", [])

    const [filtroCategoria, setFiltroCategoria] = useState("")
    const [presupuesto, setPresupuesto] = useLocalStorage<number>("Presupuesto", 0)
    const [inputPresupuesto, setInputPresupuesto] = useState("")
    const [mensaje, setMensaje] = useState("")


    const gastosFiltrados = gastos.filter((gasto) => {
        if (filtroCategoria === "") {
            return true
        }

        return gasto.categoria === filtroCategoria
    })







    const agregarGasto = (descripcion: string, valor: number, categoria: string) => {

        if (presupuesto <= 0) {
            setMensaje("establezca un presupuesto primero")
            return
        }

        if (totalGastos + valor > presupuesto) {
            setMensaje("presupesto superado")
            return
        }



        const gasto: Gasto = {
            id: uuidv4(),
            descripcion: descripcion,
            valor: valor,
            categoria: categoria
        }
        const actualizarGasto = [gasto, ...gastos]
        setGastos(actualizarGasto)

        setMensaje("")
    }



    const eliminarGasto = (id: string) => {
        const actualizarGastos = gastos.filter((gasto) => gasto.id !== id)
        setGastos(actualizarGastos)
    }

    const totalGastos = gastos.reduce((acumulador, valorActual) => {
        return acumulador + valorActual.valor
    }, 0)



    const totalFiltrado = gastosFiltrados.reduce((acumulador, valorActual) => {
        return acumulador + valorActual.valor
    }, 0)

    const editar = ({ id, descripcion, valor, categoria }: Gasto) => {
        const editarValor = gastos.map(edicion => {
            if (edicion.id === id) {
                return { ...edicion, descripcion, valor, categoria }
            }

            return edicion
        })

        setGastos(editarValor)


    }

    const manejarPresupuesto = () => {
        setPresupuesto(Number(inputPresupuesto))
        setInputPresupuesto("")
    }


    const totalDisponible = presupuesto - totalGastos


    useEffect(() => {
        GuardarGastos(gastos)
    }, [gastos])

    useEffect(() => {
        const gastosGuardados = RecuperarGastos()
        setGastos(gastosGuardados)
    }, [])

    useEffect(() => {
        GuardarPresupuesto(presupuesto)
    }, [presupuesto])

    useEffect(() => {
        const presupuestoGuardado = RecuperarPresupuesto()
        setPresupuesto(presupuestoGuardado)
    }, [])

    const reiniciar = () => {
        const confirmar = window.confirm("Estas seguro que desar Eliminar")
        if (confirmar) {
            setGastos([])
            setPresupuesto(0)
            setFiltroCategoria("")
            localStorage.removeItem("gastos")
            localStorage.removeItem("presupuesto")
        }
    }


    return (
        <>
            <FormularioGastos
                inputPresupuesto={inputPresupuesto}
                setInputPresupuesto={setInputPresupuesto}
                manejarPresupuesto={manejarPresupuesto}
                agregarGasto={agregarGasto}
            />

            <FiltroPorCategoria
                filtroCategoria={filtroCategoria}
                setFiltroCategoria={setFiltroCategoria}
            />

            {gastosFiltrados.map((valor) => (
                <GatosItem
                    key={valor.id}
                    gasto={valor}
                    eliminarGastos={eliminarGasto}
                    editar={editar}
                />
            ))};

            <ResumenGastos
                presupuesto={presupuesto}
                totalGastos={totalGastos}
                totalDisponible={totalDisponible}
                filtroCategoria={filtroCategoria}
                mensaje={mensaje}
                totalFiltrado={totalFiltrado}
                reiniciar={reiniciar}
            />

        </>
    );


}