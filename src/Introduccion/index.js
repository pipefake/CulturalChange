import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { blogdata } from '../blogdata';
import logoGuia from '../Picker/logos/logoGuia.png';
import logoInterprete from '../Picker/logos/logoInterprete.png';
import logoHuaquero from '../Picker/logos/logoHuaquero.png';
import logoAntropologo from '../Picker/logos/logoAntropologo.png';
import './Introduccion.css';
import { BtnContinuar } from '../BtnContinuar';
import back from '../Header/resources/Back-Button.png';

function Introduccion() {
    const { slug } = useParams();
    const blogpost = blogdata.find(post => post.slug === slug);
    const rol = blogpost.rol;
    console.log(rol);

    // Función para obtener la etiqueta src de la imagen
    const getImgSrc = (img) => {
        switch (img) {
            case 'logoGuia':
                return logoGuia; // Ruta a la imagen '../Picker/logos/logoGuia.png'
            case 'logoInterprete':
                return logoInterprete; // Ruta a la imagen '../Picker/logos/logoInterprete.png'
            case 'logoHuaquero':
                return logoHuaquero; // Ruta a la imagen '../Picker/logos/logoHuaquero.png'
            case 'logoAntropologo':
                return logoAntropologo; // Ruta a la imagen '../Picker/logos/logoAntropologo.png'
            default:
                return img; // Devuelve el valor original si no coincide con los casos anteriores
        }
    };

    // Función para obtener el className de la animación
    const getAnimacionClassName = (rol) => {
        switch (rol) {
            case 'Guia':
                return 'animacionmapa';
            case 'Intérprete':
                return 'animacionInterprete';
            case 'Huaquero':
                return 'animacionHuaquero';
            case 'Antropologo':
                return 'animacionAntropologo';
            default:
                return 'animacionmapa'; // Por defecto, si no coincide con los casos anteriores, aplicamos 'animacionmapa'
        }
    };

    return (
        <>
            <Link to="/introduccion">
                <img className="img_header" src={back} alt="botón para retroceder" />
            </Link>
            <div className="contenedor_info_rol">
                <div className="div_logo_rol">
                    <img src={getImgSrc(blogpost.img)} alt={rol} />
                    <h3>{rol}</h3>
                </div>
                <p>{blogpost.texto}</p>
                <div className={getAnimacionClassName(rol)}>
                    <img className="estiloanimacionmapa" alt="Animación de mapa"></img>
                </div>
                <BtnContinuar></BtnContinuar>
            </div>
        </>
    );
}

export { Introduccion };
