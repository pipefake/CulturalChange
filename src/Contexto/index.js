import react from "react";
import './Contexto.css';

function Contexto(props) {
    return (
        <>
            <div>
                <h1 className="subtitulo">
                    {props.titulo}
                </h1>
                <p className="centrarParrafo">
                    {props.parrafo}

                </p>
            </div>
        </>
    );
}

export { Contexto };