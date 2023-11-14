import React from "react";
import './Header.css';
import back from './resources/Back-Button.png';
import { Cronometro } from './Cronometro';
import { Link, useParams } from 'react-router-dom';
import { blogdata } from '../blogdata';
import cronometro from "./Reloj/Reloj15.png";

function Header(props) {

    return (
        <>
            <div className="header">
                <img className="animacionCronometroCelular" src={cronometro} alt="Cronometro" />


                <Cronometro />
            </div>
        </>
    );
}



export { Header };