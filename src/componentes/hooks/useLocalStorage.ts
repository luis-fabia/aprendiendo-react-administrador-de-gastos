import { useEffect, useState } from "react"

export function useLocalStorage<T>(clave: string, valorInicial: T) {

    const [valor, setValor] = useState<T>(() => {

        const guardado = localStorage.getItem(clave)

        if (guardado) {
            return JSON.parse(guardado)
        }

        return valorInicial
    })

    useEffect(() => {
        localStorage.setItem(clave, JSON.stringify(valor))
    }, [valor])

    return [valor, setValor]
}

