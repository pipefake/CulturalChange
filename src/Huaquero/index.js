import React, { useState, useEffect } from "react";
import "./Huaquero.css";
import simbolo1 from "../Traductor/simbolos/simbolo1.png";
import simbolo2 from "../Traductor/simbolos/simbolo2.png";
import simbolo3 from "../Traductor/simbolos/simbolo3.png";
import simbolo4 from "../Traductor/simbolos/simbolo4.png";
import simbolo5 from "../Traductor/simbolos/simbolo5.png";
import simbolo6 from "../Traductor/simbolos/simbolo6.png";
import simbolo7 from "../Traductor/simbolos/simbolo7.png";
import simbolo8 from "../Traductor/simbolos/simbolo8.png";
import simbolo9 from "../Traductor/simbolos/simbolo9.png";
import simbolo10 from "../Traductor/simbolos/simbolo10.png";
import simbolo11 from "../Traductor/simbolos/simbolo11.png";
import simbolo12 from "../Traductor/simbolos/simbolo12.png";
import simbolo13 from "../Traductor/simbolos/simbolo13.png";
import simbolo14 from "../Traductor/simbolos/simbolo14.png";
import simbolo15 from "../Traductor/simbolos/simbolo15.png";
import simbolo16 from "../Traductor/simbolos/simbolo16.png";

function Huaquero(props) {
    const [buttonStates, setButtonStates] = useState(Array(16).fill(false));
    const [simbolos, setSimbolos] = useState([]);

    const handleButtonClick = (index) => {
        const newButtonStates = [...buttonStates];
        newButtonStates[index] = !newButtonStates[index];
        setButtonStates(newButtonStates);
    };

    useEffect(() => {
        buscarUbicaciones(props.historia);
    }, [props.historia]);

    function buscarUbicaciones(aux) {
        let newImageList = [];

        if (aux === 1) {
            newImageList = [
                simbolo1,
                simbolo2,
                simbolo3,
                simbolo4,
            ];
        } else if (aux === 2) {
            newImageList = [
                simbolo13,
                simbolo14,
                simbolo15,
                simbolo16,

            ];
        } else if (aux === 3) {
            newImageList = [
                simbolo9,
                simbolo10,
                simbolo11,
                simbolo12,

            ];
        } else if (aux === 4) {
            newImageList = [
                simbolo5,
                simbolo6,
                simbolo7,
                simbolo8,

            ];
        }

        setSimbolos([...newImageList]);
    }

    return (
        <div>

            <p className="parrafoInferior">
                Toca los simbolos, tendrás que tener cuidado, si los símbolo no coinciden con la historia perderas x cantidad de tiempo.
            </p>
            <div className="fondoAmarillo">

                <div className="image-container ">
                    {Array.from({ length: 16 }, (_, index) => (
                        <button
                            key={index}
                            className={`image-button ${buttonStates[index] ? "active" : ""}`}
                            onClick={() => handleButtonClick(index)}
                        >
                            <img src={getSymbolImage(index + 1)} alt={`Simbolo ${index + 1}`} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

const getSymbolImage = (symbolNumber) => {
    switch (symbolNumber) {
        case 1:
            return simbolo1;
        case 2:
            return simbolo2;
        case 3:
            return simbolo3;
        case 4:
            return simbolo4;
        case 5:
            return simbolo5;
        case 6:
            return simbolo6;
        case 7:
            return simbolo7;
        case 8:
            return simbolo8;
        case 9:
            return simbolo9;
        case 10:
            return simbolo10;
        case 11:
            return simbolo11;
        case 12:
            return simbolo12;
        case 13:
            return simbolo13;
        case 14:
            return simbolo14;
        case 15:
            return simbolo15;
        case 16:
            return simbolo16;
        default:
            return null;
    }
};

export { Huaquero };
