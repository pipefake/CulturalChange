import React, { useState, useEffect } from "react";
import "aframe";
import "aframe-ar";
import "./JuegoHuaquero.css";
import markerURL from "./resources/marker.png"; // Importa el marcador
import imageUrl from "./resources/pruebaRA.png"; // Importa la imagen

function JuegoHuaquero() {
  const [arEnabled, setArEnabled] = useState(false);

  useEffect(() => {
    if (arEnabled) {
      // Configura la escena de A-Frame
      const scene = document.createElement("a-scene");
      scene.setAttribute("embedded", "");

      // Crea un marcador
      const marker = document.createElement("a-marker");
      marker.setAttribute("type", "pattern");
      marker.setAttribute("url", markerURL); // Utiliza el marcador importado

      // Crea una imagen en realidad aumentada
      const arImage = document.createElement("a-image");
      arImage.setAttribute("src", imageUrl); // Utiliza la imagen importada
      arImage.setAttribute("width", "2"); // Configura el ancho de la imagen
      arImage.setAttribute("height", "2"); // Configura la altura de la imagen

      // Agrega la imagen al marcador
      marker.appendChild(arImage);

      // Agrega el marcador a la escena
      scene.appendChild(marker);

      // Agrega la escena al DOM
      document.getElementById("ar-container").appendChild(scene);
    }
  }, [arEnabled]);

  return (
    <div className="container">
      <div className="top-section">{/* ... (tu contenido actual) */}</div>
      <div className="center-section">
        <div
          id="ar-container"
          style={{ display: arEnabled ? "block" : "none" }}
        ></div>
      </div>
      <div className="bottom-section">{/* ... (tu contenido actual) */}</div>
      <button onClick={() => setArEnabled(!arEnabled)}>
        {arEnabled ? "Desactivar AR" : "Activar AR"}
      </button>
    </div>
  );
}

export { JuegoHuaquero };
