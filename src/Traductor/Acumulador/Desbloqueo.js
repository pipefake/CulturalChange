import react from "react";
import iconoBloqueo from "./Iconos/iconoBloqueo.png";
import iconoSimbolo from "./Iconos/iconoSimbolo.png";


function Desbloqueo(props) {
    const valid = props.valid;
    const image = props.img;
    return (
        <>
            {!valid ? (
                <img src={iconoBloqueo} alt="Imagen" />
            ) : (
                <img className="imgBloqueo" src={image} alt="Imagen" />
            )}
        </>
    );
}

export { Desbloqueo };