import { useCallback, useState, useEffect, useMemo, useRef } from "react";
import type { Gasto } from "../types/gasto";
import { GatosItem } from "./GastoItem";
import { ResumenGastos } from "./ResumenGastos";
import { FiltroPorCategoria } from './FiltroCategoria.js'
import { FormularioGastos } from './FormularioGasto.js'
import { v4 as uuidv4 } from 'uuid'
import { GuardarGastos, RecuperarGastos, GuardarPresupuesto, RecuperarPresupuesto } from './utils/storage.js'
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { EstadisticasGastos } from "./EstadisticasGastos.js"
import { FiltroPorValor } from "./FiltroPorValor.js";
import { OrdenarGastos } from "./OrdenarGastos.js"
import {calcularTotalGastos} from './utils/gastos.js'

export function ListaDeGastos() {

    const [gastos, setGastos] = useLocalStorage<Gasto[]>("Gastos", [])

    const [filtroCategoria, setFiltroCategoria] = useState("")
    const [presupuesto, setPresupuesto] = useLocalStorage<number>("Presupuesto", 0)
    const [inputPresupuesto, setInputPresupuesto] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [valorMaximo, setValorMaximo] = useState("")
    const [valorMinimo, setValorMinimo] = useState("")
    const [orden, setOrden] = useState("")

    const contador = useRef(0)

    const aumentar = () => {
        contador.current++
            console.log(contador.current)

    }


    const gastosFiltrados = useMemo(() => {
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
    }, [gastos, filtroCategoria, valorMinimo, valorMaximo])


    console.log("ListaDeGastos renderizó")


    const gastosOrdenados = useMemo(() => {
        return [...gastosFiltrados].sort((a, b) => {

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
    }, [gastosFiltrados, orden])



    const agregarGasto = (descripcion: string, valor: number, categoria: string) => {

        if (presupuesto <= 0) {
            setMensaje("establezca un presupuesto primero")
            return false
        }

        if (totalGastos + valor > presupuesto) {
            setMensaje("presupesto superado")
            return false
        }



        const gasto: Gasto = {
            id: uuidv4(),
            descripcion: descripcion,
            valor: valor,
            categoria: categoria,
            fecha: new Date().toISOString()
        }
        const actualizarGasto = [gasto, ...gastos]
        setGastos(actualizarGasto)
        setMensaje("")
        return true
    }



    const eliminarGasto = useCallback((id: string) => {
        const actualizarGastos = gastos.filter((gasto) => gasto.id !== id)
        setGastos(actualizarGastos)
        console.log("Hola")
    }, [gastos])

    const totalGastos = calcularTotalGastos(gastos)


    const totalFiltrado = gastosFiltrados.reduce((acumulador, valorActual) => {
        return acumulador + valorActual.valor
    }, 0)


    const editar = useCallback(({ id, descripcion, valor, categoria, fecha }: Gasto) => {

        const gastoAnterior = gastos.find(gasto => gasto.id === id)

        if (!gastoAnterior) {
            return
        }

        const nuevoTotal = totalGastos - gastoAnterior.valor + valor

        if (nuevoTotal > presupuesto) {
            setMensaje("Prespuesto Superado")
            return
        }

        const editarValor = gastos.map(edicion => {
            if (edicion.id === id) {
                return { ...edicion, descripcion, valor, categoria, fecha }
            }

            return edicion
        })

        setGastos(editarValor)

    }, [gastos, totalGastos, presupuesto])



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
            <FiltroPorValor
                valorMinimo={valorMinimo}
                valorMaximo={valorMaximo}
                setValorMinimo={setValorMinimo}
                setValorMaximo={setValorMaximo}

            />

            <OrdenarGastos
                orden={orden}
                setOrden={setOrden}

            />

            {gastosOrdenados.map((valor) => (
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

            <EstadisticasGastos

                totalGastos={totalGastos}
                gastos={gastos}
            />

            <button onClick={aumentar}>
                Aumentar
            </button>
            <p>Contador: {contador.current}</p>


        </>
    );


}