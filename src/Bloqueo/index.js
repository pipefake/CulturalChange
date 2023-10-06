import React, { useState, useEffect, useCallback, useRef } from "react";
import './Bloqueo.css';
import bloqueoIMG from './resources/Bloqueo_IMG.png';
import { Link } from 'react-router-dom';
import { Header } from '../Header';

function Bloqueo(props) {


    const historia = props.historia;


    const [anagramas, setAnagramas] = useState([]);

    const [descifrados, setDescifrado1] = useState([true, false, true, true]);

    const [areAllInputsCorrect, setAreAllInputsCorrect] = useState(false);
    const validitiesRef = useRef([]); // Ref to keep track of the validity of each Anagrama

    useEffect(() => {
        buscarAnagramas(props.historia);
    }, [props.historia]);

    function buscarAnagramas(historia) {
        let nuevosAnagramas = [];

        if (historia === 1) {
            nuevosAnagramas = ["tuariles", "tear", "alfarosre", "potiem"];
        } else if (historia === 2) {
            nuevosAnagramas = ["turascul", "masfor", "blospue", "gadole"];
        } else if (historia === 3) {
            nuevosAnagramas = ["braso", "loshi", "toriahis", "tefuen"];
        } else if (historia === 4) {
            nuevosAnagramas = ["tuariles", "naur", "incianfa", "zacru"];
        } else if (historia === 5) {
            nuevosAnagramas = ["dosniso", "zaspie", "toriahis", "batosil"];
        }

        else {
            console.warn("Unhandled history case: ", historia);
        }

        setAnagramas(nuevosAnagramas);
    }

    const handleAnagramaValidity = useCallback((index, isValid) => {
        validitiesRef.current[index] = isValid;
        setAreAllInputsCorrect(validitiesRef.current.every(Boolean));
    }, []);


    return (
        <>
            <Header />
            <div className="info_juegoAntropologo">
                <h1 className="info_juegoAntropologoTitulo">
                    Descifra las palabras
                </h1>
                <p className="centrarParrafo">
                    Solicita al intérprete las palabras claves

                </p>
            </div>
            <div className="fondoAmarillo">
                <div className="contentMinijuego">
                    {anagramas.map((palabra, index) => (
                        <Anagrama
                            isLock={descifrados[index]}
                            key={index}
                            palabra={palabra}
                            onValidityChange={(isValid) => handleAnagramaValidity(index, isValid)}
                        />
                    ))}
                </div>
                {!areAllInputsCorrect ? (
                    <button className="btnContinuar btnContinuarBlock btnAntropologo" disabled>
                        Continuar
                    </button>
                ) : (
                    <Link to={`/juego/`} className="btnContinuar btnAntropologo">Continuar</Link>
                )}
            </div>
        </>
    );
}

function Anagrama(props) {
    const [inputValue, setInputValue] = useState('');

    const luckimg = props.isLock;

    function resolverAnagrama(anagrama) {
        let aux;

        if (anagrama === "tuariles") {
            aux = "rituales";
        } else if (anagrama === "tear") {
            aux = "arte";
        } else if (anagrama === "alfarosre") {
            aux = "alfareros";
        } else if (anagrama === "potiem") {
            aux = "tiempo";
        } else if (anagrama === "braso") {
            aux = "braso";
        } else if (anagrama === "loshi") {
            aux = "hilos";
        } else if (anagrama === "toriahis") {
            aux = "historia";
        } else if (anagrama === "tefuen") {
            aux = "fuente";
        } else if (anagrama === "naur") {
            aux = "urna";
        } else if (anagrama === "incianfa") {
            aux = "infancia";
        } else if (anagrama === "zacru") {
            aux = "cruza";
        } else if (anagrama === "dosniso") {
            aux = "sonidos";
        } else if (anagrama === "zaspie") {
            aux = "piezas";
        } else if (anagrama === "toriahis") {
            aux = "historia";
        } else if (anagrama === "batosil") {
            aux = "silbato";
        } else if (anagrama === "turascul") {
            aux = "culturas";
        } else if (anagrama === "masfor") {
            aux = "formas";
        } else if (anagrama === "blospue") {
            aux = "pueblos";
        } else if (anagrama === "gadole") {
            aux = "legado";
        } else {
            aux = "Anagrama no reconocido";
        }

        return aux;
    }

    const isInputCorrect = inputValue === resolverAnagrama(props.palabra);

    useEffect(() => {
        props.onValidityChange(isInputCorrect); // Notify the parent component about the validity
    }, [isInputCorrect]);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="contenedorAcronimo">
            <div>
                {luckimg ? (
                    <h4 className={isInputCorrect ? 'textoAcronimo verde' : 'textoAcronimo rojo'}>
                        {props.palabra}
                    </h4>
                ) : (
                    <img src={bloqueoIMG} alt="Imagen" />
                )}


            </div>
            <input className="input_acronimo" value={inputValue} onChange={handleChange} />
        </div>
    );
}

export { Bloqueo };
