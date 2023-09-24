import React from "react";
import { Link } from 'react-router-dom';
import { blogdata } from '../blogdata';
import { ModalHelp } from '../Modal';
import museolili from '../InputCodigo/resources/museolili.png';
import './picker.css';

import logoGuia from './logos/logoGuia.png';
import logoHuaquero from './logos/logoHuaquero.png';
import LogoInterprete from './logos/logoInterprete.png';
import logoAntropologo from './logos/logoAntropologo.png';

function Picker() {
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
    // Define the logo variable based on the role
    let logo;
    if (post.rol === "Guía") {
        logo = logoGuia;
    } else if (post.rol === "Huaquero") {
        logo = logoHuaquero;
    } else if (post.rol === "Interprete") {
        logo = LogoInterprete;
    } else if (post.rol === "Antropólogo") {
        logo = logoAntropologo;
    } else {

        // Provide a default logo in case the role doesn't match any of the above
        logo = LogoInterprete;
    }

    console.log(`post.rol: ${post.rol}`); // Add this line for debugging purposes

    return (
        <>
            <li>
                {/* Use the selected logo */}

                <Link className="txtRoles linkRoles" to={`/introduccion/${post.slug}`}>
                    <img className="logos" src={logo} alt={`Logo ${post.rol}`} />
                    {post.rol}
                </Link>
            </li>
        </>
    )
}

export { Picker };
