import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto
const MyContext = createContext();

// Creamos un componente proveedor para envolver la aplicación
export function MyContextProvider({ children }) {
    const [esGuia, setEsGuia] = useState(true);
    const [esHuaquero, setEsHuaquero] = useState(true);
    const [esInterprete, setEsInterprete] = useState(true);
    const [esAntropologo, setEsAntropologo] = useState(true);

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
