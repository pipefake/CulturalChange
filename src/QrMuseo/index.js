import React from "react";
import "./QrMuseo.css";
import fondo from "./resources/QrMuseo.png";
import imagenQR from "./resources/QR.png";
import refresh from "./resources/Refresh.png";

function QrMuseo() {
  return (
    <div
      className="container-qr-museo"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="texto-contenedor">
        <div className="texto-informacion">
          <div className="linea-texto">Lee el código QR o</div>
          <div className="linea-texto">ingresa el código de</div>
          <div className="linea-texto">la sala.</div>
        </div>

        <div className="imagenes-contenedor">
          <img
            src={imagenQR}
            alt="Descripción de la imagen QR"
            className="imagen-qr"
          />
        </div>
        <img
          src={refresh}
          alt="Descripción del botón"
          className="imagen-boton"
        />

        <div className="texto-informacion contador">0/4</div>
      </div>
    </div>
  );
}

export { QrMuseo };
