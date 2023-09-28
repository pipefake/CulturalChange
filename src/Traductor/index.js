import React from "react";
import bloqueo from './simbolos/Candado.png';
import simbolo1 from './simbolos/simbolo1.jpg';
import palabra from './simbolos/palabra.png';
import 'font-awesome/css/font-awesome.css';
import './Traductor.css';
import imgSwitcher from './simbolos/palabra.png';
import on from './switch/on.png';
import { Link } from 'react-router-dom';
import { Header } from '../Header';


import { Contexto } from '../Contexto';
import { Acumulador } from './Acumulador';
import { BtnContinuar } from "../BtnContinuar";
import { simbolos } from "../rolesdata";


function Traductor(props) {


    const aux = simbolos;

    return (

        <>
            <Header></Header>
            <Contexto titulo="Descubre los símbolos" parrafo="Ten cuidado, si descubres símbolos diferentes a los que el Huaquero te mostró, perderás los que has descubierto
"></Contexto>
            <div className="fondoAmarillo">
                <div className='contentMinijuego '>
                    <Link to="/juego/interprete/parejas">
                        <img src={on} alt="botón para retroceder" />

                    </Link>
                </div>
                <div className="ContTraduccion">
                    {aux.map((simbolo, index) => (
                        <Casilla img={simbolo.image} valid={simbolo.interpretado} anagrama={simbolo.anagrama}></Casilla>
                    ))}
                </div>
            </div>
            <Acumulador />
        </>
    );


}
function Casilla(props) {
    const [firstSimboloEncontrado, setFirstSimboloEncontrado] = React.useState(false);
    const [secoundSimboloEncontrado, setsecoundSimboloEncontrado] = React.useState(false);
    const [thirdSimboloEncontrado, setthirdSimboloEncontrado] = React.useState(false);
    const [fourthSimboloEncontrado, setfourthSimboloEncontrado] = React.useState(true);
    const [cambiar, setCambiar] = React.useState(true);
    const [turner, setTurner] = React.useState(false);
    const valid = props.valid;
    const image = props.img;
    const anagrama = props.anagrama;
    const onSwitch = (event) => {
        setCambiar(!cambiar);
    };

    const onLock = (event) => {
        setCambiar(!cambiar);
    };

    const onTurn = (event) => {
        setTurner(!turner);
    };

    return (
        <div>
            {!valid ? (
                <img className="imgAnagramaBlock" onClick={onLock} src={bloqueo} alt="Logo alusivo de las culturas" />
            ) : (
                <img className="imgAnagramaBlock"
                    onClick={onSwitch}
                    src={cambiar ? image : anagrama}
                    alt="Logo alusivo de las culturas"
                />
            )}
        </div>
    );
}

export { Traductor };