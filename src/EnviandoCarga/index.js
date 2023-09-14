// EnviandoCarga.js
import React from "react";
import './EnviandoCarga.css';
import cargando from './cargando.png';

function EnviandoCarga() {
    return (
        <>
            <div className="modalcarga">
                <h2 className='modaltitulo'>Enviando Datos...</h2>
                <img className="rotating-image" src={cargando} alt="Logo de enviado" />
                {/* Aquí puedes agregar un indicador de carga si lo deseas */}
            </div>
        </>
    );
}

export { EnviandoCarga };
