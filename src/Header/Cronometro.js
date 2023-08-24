import react from "react";
import './Cronometro.css';
import cronometro from './Reloj/Reloj15.png'

function Cronometro() {
    return (
        <>
            <img className="animacionCronometro" src={cronometro}></img>
        </>
    );

}

export { Cronometro };