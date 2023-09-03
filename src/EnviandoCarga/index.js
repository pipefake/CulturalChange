import react from "react";
import './EnviandoCarga.css';


function EnviandoCarga() {
    return (
        <>
            <div className="modalcarga">
                <h2 className='modaltitulo'>Enviando Datos...</h2>
                {/* Aquí puedes agregar un indicador de carga si lo deseas */}
            </div>
        </>
    );
}

export { EnviandoCarga };