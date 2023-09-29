import React, { useState } from "react";
import "./EstadoMuseo.css";
import fondo from "./resources/Estado.png";
import GuiaLogo from "./resources/GuiaLogo.png";
import HuaqueroLogo from "./resources/HuaqueroLogo.png";
import InterpreteLogo from "./resources/InterpreteLogo.png";
import AntropologoLogo from "./resources/AntropologoLogo.png";
import GuiaLogoNo from "./resources/GuiaNo.png";
import HuaqueroLogoNo from "./resources/HuaqueroNo.png";
import InterpreteLogoNo from "./resources/InterpreteNo.png";
import AntropologoLogoNo from "./resources/AntropologoNo.png";

function EstadoMuseo() {
  // Define el estado para cada logo y nombre.
  const [guia, setGuia] = useState(false);
  const [huaquero, setHuaquero] = useState(false);
  const [interprete, setInterprete] = useState(false);
  const [antropologo, setAntropologo] = useState(false);

  return (
    <div
      className="container-estado-museo"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="container-roles">
        <h2 className="titulo-roles">Roles seleccionados</h2>
        <div className="grid-logos">
          <div className="logo-container" onClick={() => setGuia(!guia)}>
            <img src={guia ? GuiaLogo : GuiaLogoNo} alt="Logo Guia" />
            <p>{guia ? "Luis" : "?"}</p>
          </div>
          <div
            className="logo-container"
            onClick={() => setHuaquero(!huaquero)}
          >
            <img
              src={huaquero ? HuaqueroLogo : HuaqueroLogoNo}
              alt="Logo Huaquero"
            />
            <p>{huaquero ? "Ana" : "?"}</p>
          </div>
          <div
            className="logo-container"
            onClick={() => setInterprete(!interprete)}
          >
            <img
              src={interprete ? InterpreteLogo : InterpreteLogoNo}
              alt="Logo Interprete"
            />
            <p>{interprete ? "Juan" : "?"}</p>
          </div>
          <div
            className="logo-container"
            onClick={() => setAntropologo(!antropologo)}
          >
            <img
              src={antropologo ? AntropologoLogo : AntropologoLogoNo}
              alt="Logo Antropologo"
            />
            <p>{antropologo ? "María" : "?"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { EstadoMuseo };
