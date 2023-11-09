import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto
const MyContext = createContext();

// Creamos un componente proveedor para envolver la aplicación
export function MyContextProvider({ children }) {
    const [esGuia, setEsGuia] = useState(true);
    const [esHuaquero, setEsHuaquero] = useState(true);
    const [esInterprete, setEsInterprete] = useState(true);
    const [esAntropologo, setEsAntropologo] = useState(true);
    const [esinterpretado1, setEsInterpretado1] = useState(false);
    const [esinterpretado2, setEsInterpretado2] = useState(false);
    const [esinterpretado3, setEsInterpretado3] = useState(false);
    const [esinterpretado4, setEsInterpretado4] = useState(false);
    const [tiempoInicial, setTiempoInicial,] = useState("");
    return (
        <MyContext.Provider
            value={{
                esGuia,
                setEsGuia,
                esHuaquero,
                setEsHuaquero,
                esInterprete,
                setEsInterprete,
                esAntropologo,
                setEsAntropologo,
                esinterpretado1,
                setEsInterpretado1,
                esinterpretado2,
                setEsInterpretado2,
                esinterpretado3,
                setEsInterpretado3,
                esinterpretado4,
                setEsInterpretado4,
                tiempoInicial,
                setTiempoInicial,
            }}
        >
            {children}
        </MyContext.Provider>
    );
}

// Creamos un hook personalizado para acceder al contexto
export function useMyContext() {
    return useContext(MyContext);
}
