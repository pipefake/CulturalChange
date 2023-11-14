import React, { useState, useEffect } from "react";
import "./intentaloDenuevo.css";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import superder from "../FraseMuseo/resource/supder.png";
import infeizq from "../FraseMuseo/resource/infeizq.png";
import cronometro from "../Header/Reloj/Reloj15.png";
import { useNavigate } from "react-router-dom";

function IntentaloDenuevo({ historia }) {
  const navigate = useNavigate();

  const handleContinuarClick = () => {
    // Redirigir a la página /museo al hacer clic en el botón "Salir"
    navigate("/museoTablaMejorT");
  };
  return (
    <div className="contIntentalo">
      <div className="containersuperder">
        <img className="image" src={superder} alt="Super" />
      </div>
      <div className="containerinfeizq">
        <img className="image" src={infeizq} alt="Super" />
      </div>
      <div className="divIntentalo">
        <h1>Inténtalo de nuevo</h1>
        <button className="btnContinuar btnSize" onClick={handleContinuarClick}>
          Continuar
        </button>
      </div>
    </div>
  );
}

export { IntentaloDenuevo };
