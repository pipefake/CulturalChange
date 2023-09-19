import React from "react";
import "./AnimacionMuseo.css";
import fondo from "./resources/Animacion.png"; // Sustituye NOMBRE_DE_TU_IMAGEN.png con el nombre real de tu imagen.

function AnimacionMuseo() {
  return (
    <div
      className="container-animacion-museo"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <h1>Bienvenido a AnimacionMuseo</h1>
    </div>
  );
}

export { AnimacionMuseo };
