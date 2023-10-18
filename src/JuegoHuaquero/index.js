import React, { useState, useEffect } from "react";
import "./JuegoHuaquero.css";
import TopNavegation from "./resources/TopNavigation.png";
import SimboloSi from "./resources/SimboloSi.png";
import SimboloNo from "./resources/SimboloNo.png";
import Cargando from "./resources/Cargando.png";
import { Cronometro } from "../Header/Cronometro";

function JuegoHuaquero() {
  // Estados para manejar imágenes, acceso a cámara y visualización de aviso.
  const isImage1Loading = false;
  const isImage2Loading = false;
  const isImage3Loading = false;
  const isImage4Loading = false;
  const [showCameraPrompt, setShowCameraPrompt] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraAccess, setCameraAccess] = useState(false);

  // Esta función maneja el acceso a la cámara.
  const handleCameraAccess = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setCameraStream(stream);
        setCameraAccess(true);
        setShowCameraPrompt(false); // ¡Agrega esta línea!
      })
      .catch((err) => {
        console.log("Error al acceder a la cámara:", err);
        setShowCameraPrompt(false); // ¡Agrega esta línea también por si hay un error!
      });
  };

  // Este efecto ajusta el stream de la cámara al elemento de video.
  useEffect(() => {
    if (cameraStream) {
      const videoElement = document.getElementById("camera-preview");
      videoElement.srcObject = cameraStream;
      videoElement.play();
    }
  }, [cameraStream]);

  // Este efecto muestra el aviso de cámara después de un delay de 4 segundos.
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCameraPrompt(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container">
      {/* Sección superior con navegación y cronómetro */}
      <div className="top-section">
        <img className="button-image" src={TopNavegation} alt="Botón" />
        <h1 className="huaquero-text">Huaquero</h1>
        <Cronometro />
      </div>

      {/* Sección central con animación de carga y vista de cámara */}
      <div className="center-section">
        {!cameraAccess && <h2 className="camara-text">Abriendo la Cámara</h2>}
        {!cameraAccess && (
          <img className="loading-animation" src={Cargando} alt="Cargando..." />
        )}
        <video
          id="camera-preview"
          className={cameraAccess ? "full-screen-video" : ""}
        ></video>
      </div>

      {/* Aviso de solicitud de acceso a la cámara */}
      {showCameraPrompt && (
        <div className="camera-alert">
          <p>
            Museo Lili quiere acceder a la cámara. Necesitamos acceso para
            utilizar la cámara de tu dispositivo.
          </p>
          <button onClick={() => setShowCameraPrompt(false)}>
            No permitir
          </button>
          <button onClick={handleCameraAccess}>Ok</button>
        </div>
      )}

      {/* Sección inferior con las imágenes de símbolos */}
      <div className="bottom-section">
        <img src={isImage1Loading ? SimboloSi : SimboloNo} alt="Imagen 1" />
        <img src={isImage2Loading ? SimboloSi : SimboloNo} alt="Imagen 2" />
        <img src={isImage3Loading ? SimboloSi : SimboloNo} alt="Imagen 3" />
        <img src={isImage4Loading ? SimboloSi : SimboloNo} alt="Imagen 4" />
      </div>
    </div>
  );
}

export { JuegoHuaquero };
