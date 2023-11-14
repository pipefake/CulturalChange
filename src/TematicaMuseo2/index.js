import React from "react";
import { useNavigate } from "react-router-dom";
import "./TematicaMuseo2.css";
import video from "./resources/Cuencos2.mp4";

function TematicaMuseo2() {
  const navigate = useNavigate();

  const handleVideoEnd = () => {
    navigate("/museoTabla"); // Ruta de pagina
  };

  return (
    <div className="container-animacion-museo">
      <video
        className="video-content"
        controls // Controles ya que no deja reproducir sin una interaccion
        autoPlay
        onEnded={handleVideoEnd}
        src={video}
        type="video/mp4"
      />
    </div>
  );
}

export { TematicaMuseo2 };
