import type { FormularioGastosProps } from '../types/gasto'
import { useState } from 'react'

export function FormularioGastos({
    inputPresupuesto, setInputPresupuesto, manejarPresupuesto, agregarGasto }: FormularioGastosProps) {

    const [descripcion, setDescripcion] = useState("")
    const [valor, setValor] = useState("")
    const [categoria, setCategoria] = useState("")


    const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        if (!descripcion.trim()) {
            console.log("descripcion")
            return
        }

        if (!valor.trim()) {
            console.log("valor")
            return
        }

        if (Number(valor) <= 0) {
            console.log("valor-Numero")
            return
        }

        if (!categoria.trim()) {
            console.log("categoria")
            return
        }

        const gasto = {
            descripcion: descripcion.trim(),
            valor: Number(valor),
            categoria: categoria.trim()
        }

        agregarGasto(gasto.descripcion, gasto.valor, gasto.categoria)

        setDescripcion("")
        setValor("")
        setCategoria("")
    }


    return (
        <>
            <label htmlFor="pres"></label>
            <input id="pres" type="number" value={inputPresupuesto} placeholder="presupuesto"
                onChange={(e) => setInputPresupuesto((e.target.value))} />
            <button onClick={manejarPresupuesto}>Establecer</button>
            <form onSubmit={manejarEnvio}>


                <label htmlFor="descripcion">Descripcion</label>
                <input type="text" id="descripcion" placeholder="Descripcion del producto"
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

                <button type="submit">Agregar Gasto</button>
            </form>

        </>
    );
}