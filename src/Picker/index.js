import React from "react";
import { Link } from 'react-router-dom';
import { blogdata } from '../blogdata';
import { ModalHelp } from '../Modal';
import museolili from '../InputCodigo/resources/museolili.png';
import './picker.css';

import { useMyContext } from '../SeleccionCargando/MyContext';


import logoGuia from './logos/logoGuia.png';
import logoHuaquero from './logos/logoHuaquero.png';
import logoInterprete from './logos/logoInterprete.png';
import logoAntropologo from './logos/logoAntropologo.png';
import logoGuiaBN from '../SeleccionCargando/logos/logoGuiaBN.png';
import logoHuaqueroBN from '../SeleccionCargando/logos/logoHuaqueroBN.png';
import logoInterpreteBN from '../SeleccionCargando/logos/logoInterpreteBN.png';
import logoAntropologoBN from '../SeleccionCargando/logos/logoAntropologoBN.png';

function Picker() {
    const {
        esGuia,
        setEsGuia,
        esHuaquero,
        setEsHuaquero,
        esInterprete,
        setEsInterprete,
        esAntropologo,
        setEsAntropologo,
    } = useMyContext();

    return (
        <>
            <div className="divPicker">
                <h1>Escoge tu rol</h1>
                <ul>
                    {blogdata.map(post => (
                        <IntroduccionRol post={post} key={post.slug} />
                    ))}
                </ul>
                <img className="imglogo" src={museolili} alt="Logo del museo lili" />
            </div>
        </>
    );
}

function IntroduccionRol({ post }) {

    const {
        esGuia,
        setEsGuia,
        esHuaquero,
        setEsHuaquero,
        esInterprete,
        setEsInterprete,
        esAntropologo,
        setEsAntropologo,
    } = useMyContext();
    // Define the logo variable based on the role
    let logo;


    if (post.rol === "Guía") {
        logo = !esGuia ? logoGuia : logoGuiaBN;

    } else if (post.rol === "Huaquero") {
        logo = !esHuaquero ? logoHuaquero : logoHuaqueroBN;

    } else if (post.rol === "Intérprete") {
        logo = !esInterprete ? logoInterprete : logoInterpreteBN;

    } else if (post.rol === "Antropólogo") {
        logo = !esAntropologo ? logoAntropologo : logoAntropologoBN;

    } else {
        // Proporciona un logotipo predeterminado en caso de que el rol no coincida con ninguno de los anteriores
        logo = logoInterprete;
    }

    console.log(`post.rol: ${post.rol}`); // Add this line for debugging purposes


    return (
        <>
            <li>
                {/* Use the selected logo */}
                <Link className={`txtRoles linkRoles `}
                    to={`/introduccion/${post.slug}`}
                >
                    <img className="logos" src={logo} alt={`Logo ${post.rol}`} />
                    {post.rol}
                </Link>
            </li>
        </>
    );
}

export { Picker };


