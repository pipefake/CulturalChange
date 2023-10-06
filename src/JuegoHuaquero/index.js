import React, { useState, useEffect } from "react";
import "./JuegoHuaquero.css";

function JuegoHuaquero() {
  const [arEnabled, setArEnabled] = useState(false);

  useEffect(() => {
    if (arEnabled) {
      const scene = new window.THREE.Scene();
      const camera = new window.THREE.Camera();

      const renderer = new window.THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById("ar-container").appendChild(renderer.domElement);

      // Configurar el marcador como una imagen
      const markerControls = new window.ARMarkerControls(
        window.ARController.getUserMediaThreeScene({
          cameraParametersUrl: "data/camera_para.dat",
          maxARVideoSize: 640,
        }),
        "./resources/marker.png", // Ruta a tu imagen de marcador
        {
          type: "pattern",
          patternUrl: "./resources/marker.png", // Ruta a tu archivo .patt (para patrones)
        }
      );

      // Cargar objetos virtuales (imágenes en este caso)
      const loader = new window.THREE.TextureLoader();
      loader.load("./resources/pruebaRA.png", (texture) => {
        const geometry = new window.THREE.PlaneGeometry(1, 1);
        const material = new window.THREE.MeshBasicMaterial({ map: texture });
        const mesh = new window.THREE.Mesh(geometry, material);
        scene.add(mesh);
      });

      // Configurar la cámara
      const arCamera = markerControls.getCamera();
      arCamera.position.z = 1;

      // Iniciar renderizado
      const animate = () => {
        if (markerControls.isVisible) {
          renderer.render(scene, arCamera);
        }
        requestAnimationFrame(animate);
      };
      animate();
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
