import type { FiltroPorValorProps } from '../types/gasto'

export function FiltroPorValor({ valorMinimo,valorMaximo,setValorMinimo,setValorMaximo}: FiltroPorValorProps) {

    return (
        <>
            <label htmlFor="">Filtro por Valor</label>
            <label htmlFor="vMinimo">Valor Minimo</label>
            <input type="number" id="vMinimo" value={valorMinimo}
                onChange={(e) => setValorMinimo(e.target.value)} />
            <label htmlFor="vMaximo">Valor Maximo</label>
            <input type="number" id="vMaximo" value={valorMaximo}
                onChange={(e) => setValorMaximo(e.target.value)} />

        </>

    );

}