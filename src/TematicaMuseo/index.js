import React from "react";
import { useNavigate } from "react-router-dom";
import "./TematicaMuseo.css";
import video from "./resources/Cuencos1.mp4";

function TematicaMuseo() {
  const navigate = useNavigate();

  const handleVideoEnd = () => {
    navigate("/rolesMuseo"); // Ruta de pagina
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

export { TematicaMuseo };
