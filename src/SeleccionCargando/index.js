import React, { useState, useEffect } from "react";
import { blogdata } from '../blogdata';
import museolili from '../InputCodigo/resources/museolili.png';
import './seleccionCargando.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import cargando from './cargando.png';
import { useMyContext } from './MyContext';

import logoGuia from './logos/logoGuia.png';
import logoHuaquero from './logos/logoHuaquero.png';
import LogoInterprete from './logos/logoInterprete.png';
import logoAntropologo from './logos/logoAntropologo.png';
import logoGuiaBN from './logos/logoGuiaBN.png';
import logoHuaqueroBN from './logos/logoHuaqueroBN.png';
import LogoInterpreteBN from './logos/logoInterpreteBN.png';
import logoAntropologoBN from './logos/logoAntropologoBN.png';
import ready from './listo.png';

function SeleccionCargando() {

    const { slug } = useParams();
    const blogpost = blogdata.find(post => post.slug === slug);
    const navigate = useNavigate();

    const redirectGame = (e) => {
        navigate(enlace);
    }

    const rol = "guia";



    const enlace = (`/juego/${rol}`);

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

    const roles = ["guía", "intérprete", "huaquero"];

    const estadosVerdaderos = [esGuia, esHuaquero, esInterprete, esAntropologo].filter((estado) => estado).length;


    const [esLoanding, setEsLoading] = useState(true);

    const verificarEstados = () => {
        if (esGuia && esHuaquero && esInterprete && esAntropologo) {
            setEsLoading(false);
            redirectGame();
        } else {
            setEsLoading(true);

        }
    };

    useEffect(() => {
        verificarEstados();
    }, [esGuia, esHuaquero, esInterprete, esAntropologo]);

    return (
        <>

            <div className="divPicker">


                <h1 className="centrarTitulo">Esperando viajeros</h1>
                {esLoanding ? (
                    <img className="rotating-image animacioncarga" src={cargando} alt="Logo de enviando" />
                ) : (
                    <img className="listo_img" src={ready} alt="Logo de enviado" />
                )}


                <div className="cont_logos">
                    {!esGuia ? (
                        <img className="logosSeleccion" src={logoGuia} />
                    ) : (
                        <img className="logosSeleccion" src={logoGuiaBN} />
                    )}
                    {!esHuaquero ? (
                        <img className="logosSeleccion" src={logoHuaquero} />
                    ) : (
                        <img className="logosSeleccion" src={logoHuaqueroBN} />
                    )}
                    {!esInterprete ? (
                        <img className="logosSeleccion" src={LogoInterprete} />
                    ) : (
                        <img className="logosSeleccion" src={LogoInterpreteBN} />
                    )}
                    {!esAntropologo ? (
                        <img className="logosSeleccion" src={logoAntropologo} />
                    ) : (
                        <img className="logosSeleccion" src={logoAntropologoBN} />
                    )}
                </div>
                <p>{estadosVerdaderos}/4</p>

                <img className="imglogo" src={museolili} alt="Logo del museo lili" />
            </div>
        </>
    );
}

export { SeleccionCargando };
