import react from "react";
import './Bloqueo.css';
import bloqueoIMG from './resources/Bloqueo_IMG.png';
import { BtnContinuar } from '../BtnContinuar';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../Header';


import { Contexto } from '../Contexto';
function Bloqueo(props) {
    const valid = props.valid;

    return (
        <>
            <Header></Header>
            <Contexto titulo="Descubre los símbolos" parrafo="Ten cuidado, si descubres símbolos diferentes a los que el Huaquero te mostró, perderás los que has descubierto
"></Contexto>
            <div className="contentMinijuego">
                <Anagrama valid={true} palabra={"latnesvo"}></Anagrama>
                <Anagrama valid={false} palabra={"ouhs"}></Anagrama>
                <Anagrama valid={true} palabra={"clanóv"}></Anagrama>
                <Anagrama valid={false} palabra={"mrafo"}></Anagrama>
            </div>
            <button className="btnContinuar">

                <Link to={`/juego/`}>
                    Continuar
                </Link>
            </button>

        </>
    );
}

function Anagrama(props) {
    const valid = props.valid;
    return (<>
        <div className="contenedorAcronimo">

            <div>

                {valid ? (
                    <h4 className="textoAcronimo">{props.palabra}</h4>
                ) : (
                    <img src={bloqueoIMG} alt="Imagen" />
                )}
            </div>

            <input className="input_acronimo">
            </input>
        </div>
    </>);
}



export { Bloqueo };