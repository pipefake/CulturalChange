import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { blogdata } from '../blogdata';
import museolili from '../InputCodigo/resources/museolili.png';
import './seleccionCargando.css';

import cargando from './cargando.png';

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

    const roles = ["guía", "intérprete", "huaquero"];

    const tamañoArreglo = roles.length;

    const [esGuia, setEsGuia] = useState(true);
    const [esHuaquero, setEsHuaquero] = useState(true);
    const [esInterprete, setEsInterprete] = useState(true);
    const [esAntropologo, setEsAntropologo] = useState(true);
    const [esLoanding, setEsLoading] = useState(true);

    const verificarEstados = () => {
        if (esGuia && esHuaquero && esInterprete && esAntropologo) {
            setEsLoading(false);
        } else {
            setEsLoading(true);
        }
    };

    return (
        <>

            <div className="divPicker">


                <h1>Esperando viajeros</h1>
                {esLoanding ? (
                    <img className="rotating-image animacioncarga" src={cargando} alt="Logo de enviando" />
                ) : (
                    <img className="listo_img" src={ready} alt="Logo de enviado" />
                )}


                <div className="cont_logos">
                    {esGuia ? (
                        <img className="logosSeleccion" src={logoGuia} />
                    ) : (
                        <img className="logosSeleccion" src={logoGuiaBN} />
                    )}
                    {esHuaquero ? (
                        <img className="logosSeleccion" src={logoHuaquero} />
                    ) : (
                        <img className="logosSeleccion" src={logoHuaqueroBN} />
                    )}
                    {esInterprete ? (
                        <img className="logosSeleccion" src={LogoInterprete} />
                    ) : (
                        <img className="logosSeleccion" src={LogoInterpreteBN} />
                    )}
                    {esAntropologo ? (
                        <img className="logosSeleccion" src={logoAntropologo} />
                    ) : (
                        <img className="logosSeleccion" src={logoAntropologoBN} />
                    )}
                </div>
                <p>{tamañoArreglo}/4</p>

                <img className="imglogo" src={museolili} alt="Logo del museo lili" />
            </div>
        </>
    );
}

export { SeleccionCargando };
