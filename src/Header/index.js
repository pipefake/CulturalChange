import React from "react";
import './Header.css';
import back from './resources/Back-Button.png';
import { Cronometro } from './Cronometro';
import { Link, useParams } from 'react-router-dom';
import { blogdata } from '../blogdata';


function Header(props) {

    return (
        <>
            <div className="header">
                <Link to="/introduccion">
                    <img className="img_header" src={back} alt="botón para retroceder" />

                </Link>


                <Cronometro />
            </div>
        </>
    );
}



export { Header };