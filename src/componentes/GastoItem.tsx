import { useState, memo } from "react";
import type { GastoProps } from "../types/gasto";

export const  GatosItem = memo (function GatosItem({ gasto, eliminarGastos, editar }: GastoProps) {
    


console.log("GastoItem renderizó:", gasto.descripcion)

const [editado, setEditado] = useState(false)

    const [descripcionEditada, setDescripcionEditada] = useState(gasto.descripcion)
    const [valorEditado, setValorEditado] = useState(gasto.valor)
    const [categoriaEditada, setCategoriaEditada] = useState(gasto.categoria)
    const [fechaEditada, setFechaEditada] = useState(gasto.fecha)

    console.log("GastoItem renderizó:", gasto.descripcion)
    const cancelar = () => {
    setDescripcionEditada(gasto.descripcion)
    setValorEditado(gasto.valor)
    setCategoriaEditada(gasto.categoria)
    setFechaEditada(gasto.fecha)

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

                        <input type="text" value={fechaEditada} 
                        onChange={(e) => setFechaEditada(e.target.value)} />

                        <button onClick={() => { setEditado(false), editar({id: gasto.id, descripcion: descripcionEditada, valor: valorEditado, categoria:categoriaEditada, fecha: fechaEditada}) }}>Guardar</button>
                        <button onClick={() => cancelar()}>Cancelar</button>

                    </ul >



                ) : (

                    <ul>
                        <li>ID: {gasto.id}</li>
                        <li>Descripcion: {gasto.descripcion}</li>
                        <li>Valor: {gasto.valor}</li>
                        <li>Categoria: {gasto.categoria}</li>
                        <li>Fecha: {gasto.fecha}</li>
                        <button onClick={() => eliminarGastos(gasto.id)}>Eliminar Gasto</button>
                        <button onClick={() => setEditado(true)}>Editar</button>
                    </ul >

                )

            }
        </>)

})
