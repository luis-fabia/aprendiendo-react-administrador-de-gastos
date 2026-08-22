import { useState } from "react";
import type { GastoProps } from "../types/gasto";

export function GatosItem({ gasto, eliminarGastos, editar }: GastoProps) {


    const [editado, setEditado] = useState(false)

    const [descripcionEditada, setDescripcionEditada] = useState(gasto.descripcion)
    const [valorEditado, setValorEditado] = useState(gasto.valor)
    const [categoriaEditada, setCategoriaEditada] = useState(gasto.categoria)


    const cancelar = () => {
    setDescripcionEditada(gasto.descripcion)
    setValorEditado(gasto.valor)
    setCategoriaEditada(gasto.categoria)

    setEditado(false)
    }

    return (
        <>
            {
                editado ? (

                    <ul>
                        <li>ID: {gasto.id}</li>
                        <input
                            value={descripcionEditada}
                            onChange={(e) => setDescripcionEditada(e.target.value)}
                        />
                        <input
                            type="number"
                            value={valorEditado}
                            onChange={(e) => setValorEditado(Number(e.target.value))}
                        />
                        <select
                            value={categoriaEditada}
                            onChange={(e) => setCategoriaEditada(e.target.value)}
                        >
                            <option value="Vivienda">Vivienda</option>
                            <option value="Educacion">Educación</option>
                            <option value="Transporte">Transporte</option>
                            <option value="Suscripciones">Suscripciones</option>
                            <option value="Gustos">Gustos</option>
                            <option value="Otro">Otro</option>
                        </select>

                        <button onClick={() => { setEditado(false), editar({id: gasto.id, descripcion: descripcionEditada, valor: valorEditado, categoria:categoriaEditada}) }}>Guardar</button>
                        <button onClick={() => cancelar()}>Cancelar</button>

                    </ul >



                ) : (

                    <ul>
                        <li>ID: {gasto.id}</li>
                        <li>Descripcion: {gasto.descripcion}</li>
                        <li>Valor: {gasto.valor}</li>
                        <li>Categoria: {gasto.categoria}</li>
                        <button onClick={() => eliminarGastos(gasto.id)}>Eliminar Gasto</button>
                        <button onClick={() => setEditado(true)}>Editar</button>
                    </ul >

                )

            }
        </>)

}


