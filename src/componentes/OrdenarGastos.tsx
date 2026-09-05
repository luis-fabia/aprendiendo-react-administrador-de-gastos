import type {OrdenarGastosProps, OrdenGastos} from '../types/gasto'

export function OrdenarGastos({orden, setOrden}:OrdenarGastosProps) {

    return(
        <>  
            <label htmlFor="orden"> Ordenar </label>
            <select value={orden} id="orden"
            onChange={(e) => setOrden(e.target.value as OrdenGastos)}
            >
                <option value="">Todas</option>
                <option value="Mas Caro">Mas Caro</option>
                <option value="Mas Barato">Mas Barato</option>
                <option value="Mas Reciente">Mas Reciente</option>
                <option value="Mas Antiguo">Mas Antiguo</option>
            </select>

        </>

    );
}