import React from "react";
import "./GananMuseo.css";
import { Link, useParams } from "react-router-dom";
import { blogdata } from "../blogdata";
import superder from "../FraseMuseo/resource/supder.png";
import infeizq from "../FraseMuseo/resource/infeizq.png";

import simbolo1 from "../Traductor/simbolos/simbolo1.png";
import simbolo2 from "../Traductor/simbolos/simbolo2.png";
import simbolo3 from "../Traductor/simbolos/simbolo3.png";
import simbolo4 from "../Traductor/simbolos/simbolo4.png";
import simbolo5 from "../Traductor/simbolos/simbolo5.png";
import simbolo6 from "../Traductor/simbolos/simbolo6.png";
import simbolo7 from "../Traductor/simbolos/simbolo7.png";
import simbolo8 from "../Traductor/simbolos/simbolo8.png";
import simbolo9 from "../Traductor/simbolos/simbolo9.png";
import simbolo10 from "../Traductor/simbolos/simbolo10.png";
import simbolo11 from "../Traductor/simbolos/simbolo11.png";
import simbolo12 from "../Traductor/simbolos/simbolo12.png";
import simbolo13 from "../Traductor/simbolos/simbolo13.png";
import simbolo14 from "../Traductor/simbolos/simbolo14.png";
import simbolo15 from "../Traductor/simbolos/simbolo15.png";
import simbolo16 from "../Traductor/simbolos/simbolo16.png";

function GananMuseo({ historia }) {
  const asignarSrcImagenes = (historia) => {
    if (historia === 1) {
      return [simbolo1, simbolo2, simbolo3, simbolo4];
    } else if (historia === 2) {
      return [simbolo5, simbolo6, simbolo7, simbolo8];
    } else if (historia === 3) {
      return [simbolo9, simbolo10, simbolo11, simbolo12];
    } else if (historia === 4) {
      return [simbolo13, simbolo14, simbolo15, simbolo16];
    } else if (historia === 5) {
      // Ajusta esta lógica según tus necesidades
      return [simbolo1, simbolo2, simbolo3, simbolo4];
    } else {
      return []; // Si la historia no coincide con ningún caso, devuelve un array vacío
    }
  };

  const imagenes = asignarSrcImagenes(historia);

  return (
    <>
      <div className="contGanan">
        <div className="containersuperder">
          <img className="image" src={superder} alt="Super" />
        </div>
        <div className="containerinfeizq">
          <img className="image" src={infeizq} alt="Super" />
        </div>
        <h1>¡Felicitaciones!</h1>
        <p>Se han ganado estas insignias por su valentía</p>
        <div className="divsimbolos">
          {imagenes.map((imagen, index) => (
            <img key={index} src={imagen} alt={`Simbolo ${index + 1}`} />
          ))}
        </div>
        <button className="btnContinuar btnSize">Continuar</button>
      </div>
    </>
  );
}

export { GananMuseo };
