import type {filtroCategoriaProps} from '../types/gasto';


export function FiltroPorCategoria( {filtroCategoria, setFiltroCategoria } : filtroCategoriaProps) {
    return (
        <>
            <label htmlFor="filtro">Filtrar por categoría</label>

            <select
                id="filtro"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
            >
                <option value="">Todas</option>
                <option value="Vivienda">Vivienda</option>
                <option value="Educacion">Educación</option>
                <option value="Transporte">Transporte</option>
                <option value="Suscripciones">Suscripciones</option>
                <option value="Gustos">Gustos</option>
                <option value="Otro">Otro</option>
            </select>

        </>
    );
}