import type { FormularioGastosProps } from '../types/gasto'
import { useEffect, useRef, useState } from 'react'

export function FormularioGastos({
    inputPresupuesto, setInputPresupuesto, manejarPresupuesto, agregarGasto }: FormularioGastosProps) {

    const [descripcion, setDescripcion] = useState("")
    const [valor, setValor] = useState("")
    const [categoria, setCategoria] = useState("")
    const [errorMensaje, setErrorMensaje] = useState("")


    const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorMensaje("")

        if (!descripcion.trim()) {
            setErrorMensaje("La descripcion es obligatoria")
            return
        }

        if (!valor.trim()) {
            setErrorMensaje("El valor  es obligatoria")
            return
        }

        if (isNaN(Number(valor))) {
            setErrorMensaje("El valor debe ser un número")
            return
        }


        if (Number(valor) <= 0 ) {
            setErrorMensaje("El valor debe ser mayor a 0 ")
            return
        }

        if (!categoria.trim()) {
            setErrorMensaje(" La categoria es Obligatoria")
            return
        }

        const gasto = {
            descripcion: descripcion.trim(),
            valor: Number(valor),
            categoria: categoria.trim()
        }

        const resultado =  agregarGasto(gasto.descripcion, gasto.valor, gasto.categoria)

       if (resultado) {
        setDescripcion("")
        setValor("")
        setCategoria("")
        inputref.current?.focus()
       }

        

    }

    const inputref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputref.current?.focus()
    }, [])

    return (
        <>
            <label htmlFor="pres"></label>
            <input id="pres" type="number" value={inputPresupuesto} placeholder="presupuesto"
                onChange={(e) => setInputPresupuesto((e.target.value))} />
            <button onClick={manejarPresupuesto}>Establecer</button>
            <form onSubmit={manejarEnvio}>


                <label htmlFor="descripcion">Descripcion</label>
                <input type="text" id="descripcion" placeholder="Descripcion del producto" ref={inputref}
                    onChange={(e) => setDescripcion(e.target.value)} value={descripcion} />

                <label htmlFor="valor">Valor</label>
                <input type="text" id="valor" placeholder="Valor"
                    onChange={(e) => setValor(e.target.value)} value={valor} />

                <label htmlFor="categoria">Categoria</label>

                <select
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                >
                    <option value="">Seleccione una categoría</option>
                    <option value="Vivienda">Vivienda</option>
                    <option value="Educacion">Educación</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Suscripciones">Suscripciones</option>
                    <option value="Gustos">Gustos</option>
                    <option value="Otro">Otro</option>
                </select>

                {errorMensaje && <p>{errorMensaje}</p>} 

                <button type="submit">Agregar Gasto</button>
            </form>

        </>
    );
}