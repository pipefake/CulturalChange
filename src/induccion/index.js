import React from "react";
import { useNavigate } from "react-router-dom";
import "./resources/induccion.css";
import video from "./resources/induccion.mp4";

function Induccion() {
  const navigate = useNavigate();

  const handleVideoEnd = () => {
    navigate("/animacionMuseo"); // Ruta de pagina
  };

  return (
    <div className="container-animacion-museo">
      <video
        className="video-content"
        controls // Controles ya que no deja reproducir sin una interaccion
        autoPlay
        onEnded={handleVideoEnd}
        src={video}
        type="/animacionMuseo"
      />
    </div>
  );
}

export { Induccion };
