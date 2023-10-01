import React, { useState, useEffect } from "react";
import "./Acumulador.css";
import { simbolos } from "../../rolesdata";
import iconoBloqueo from "./Iconos/iconoBloqueo.png";
import simbolo1 from "../simbolos/simbolo1.jpg";
import simbolo2 from "../simbolos/simbolo2.jpg";
import simbolo3 from "../simbolos/simbolo3.jpg";
import simbolo4 from "../simbolos/simbolo4.jpg";



function Acumulador(props) {

    const [encontrado1, setEncontrado1] = useState(true);
    const [encontrado2, setEncontrado2] = useState(true);
    const [encontrado3, setEncontrado3] = useState(false);
    const [encontrado4, setEncontrado4] = useState(false);

    const [lugares, setLugares] = useState([]);

    const historia = props.historia;
    console.log('Historia:', historia);

    useEffect(() => {
        console.log('Historia:', historia);
        buscarUbicaciones(historia);
    }, [historia]);

    function buscarUbicaciones(historia) {
        let nuevosLugares = [];

        if (historia === 1) {
            nuevosLugares = [simbolo1, simbolo2, simbolo3, simbolo4];
        } else if (historia === 2) {
            nuevosLugares = [simbolo1, simbolo4, simbolo3, simbolo1];
        } else if (historia === 3) {
            nuevosLugares = [simbolo3, simbolo1, simbolo2, simbolo4];
        } else if (historia === 4) {
            nuevosLugares = [simbolo4, simbolo1, simbolo2, simbolo3];
        } else if (historia === 5) {
            nuevosLugares = [simbolo3, simbolo4, simbolo1, simbolo1];
        } else {
            console.warn("Unhandled history case: ", historia);
        }

        console.log('Nuevos lugares:', nuevosLugares);
        setLugares(nuevosLugares);
    }

    const getImageForEncontrado = (index) => {
        if (index === 0) {
            return encontrado1 ? lugares[0] : iconoBloqueo;
        } else if (index === 1) {
            return encontrado2 ? lugares[1] : iconoBloqueo;
        } else if (index === 2) {
            return encontrado3 ? lugares[2] : iconoBloqueo;
        } else if (index === 3) {
            return encontrado4 ? lugares[3] : iconoBloqueo;
        } else {
            return iconoBloqueo;
        }
    };


    console.log('Lugares:', lugares);

    return (
        <div className="acumulador">
            {lugares.map((lugar, index) => (
                <img
                    key={index}
                    className="imgBloqueo"
                    src={getImageForEncontrado(index)}
                    alt={`Imagen ${index + 1}`}
                />
            ))}
        </div>
    );

}


export { Acumulador };
