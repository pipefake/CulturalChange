import React from "react";
import { Desbloqueo } from './Desbloqueo';
import "./Acumulador.css";
import { simbolos } from "../../rolesdata";

function Acumulador() {

    const aux = simbolos;

    return (
        <>
            <div className="acumulador">
                {/* Mapea el array de símbolos y renderiza componentes Desbloqueo */}
                {aux.map((simbolo, index) => (
                    <Desbloqueo key={index} valid={simbolo.interpretado} img={simbolo.image} />
                ))}
            </div>
        </>
    );
}

export { Acumulador };
