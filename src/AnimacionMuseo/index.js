import React from "react";
import { useNavigate } from "react-router-dom";
import "./AnimacionMuseo.css";
import video from "./resources/Contextualizacin.mp4";

function AnimacionMuseo() {
  const navigate = useNavigate();

  const handleVideoEnd = () => {
    navigate("/qrMuseo"); // Ruta de pagina
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

export { AnimacionMuseo };
