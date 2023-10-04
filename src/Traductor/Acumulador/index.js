import React, { useState, useEffect } from "react";
import "./Acumulador.css";
import { simbolos } from "../../rolesdata";
import iconoBloqueo from "./Iconos/iconoBloqueo.png";
import simbolo1 from '../simbolos/simbolo1.png';
import simbolo2 from '../simbolos/simbolo2.png';
import simbolo3 from '../simbolos/simbolo3.png';
import simbolo4 from '../simbolos/simbolo4.png';
import simbolo5 from '../simbolos/simbolo5.png';
import simbolo6 from '../simbolos/simbolo6.png';
import simbolo7 from '../simbolos/simbolo7.png';
import simbolo8 from '../simbolos/simbolo8.png';
import simbolo9 from '../simbolos/simbolo9.png';
import simbolo10 from '../simbolos/simbolo10.png';
import simbolo11 from '../simbolos/simbolo11.png';
import simbolo12 from '../simbolos/simbolo12.png';
import simbolo13 from '../simbolos/simbolo13.png';
import simbolo14 from '../simbolos/simbolo14.png';
import simbolo15 from '../simbolos/simbolo15.png';
import simbolo16 from '../simbolos/simbolo16.png';




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
            nuevosLugares = [simbolo13, simbolo14, simbolo15, simbolo16];
        } else if (historia === 3) {
            nuevosLugares = [simbolo9, simbolo10, simbolo11, simbolo12];
        } else if (historia === 4) {
            nuevosLugares = [simbolo5, simbolo6, simbolo7, simbolo8, simbolo3];
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
