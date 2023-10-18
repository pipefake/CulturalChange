import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PantallaMuseo.css";
import fondo from "./resources/Bienvenida.png";
import BotonImagen from "./resources/BotonImagen.png";
import BotonImagen2 from "./resources/BotonImagen2.png";
import BotonImagen3 from "./resources/BotonImagen3.png";
import BotonImagen4 from "./resources/BotonImagen4.png";
import BotonImagen5 from "./resources/BotonImagen5.png";
import BotonImagen6 from "./resources/BotonImagen6.png";
import BotonImagen7 from "./resources/BotonImagen7.png";
import BotonImagen8 from "./resources/BotonImagen8.png";

function PantallaMuseo() {
  const navigate = useNavigate();
  const [imagenActual, setImagenActual] = useState(0);
  const [animacionActiva, setAnimacionActiva] = useState(false);
  
//Se cargan todas las imagenes antes de iniciar la animacion
  useEffect(() => {
      imagenes.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }, []);

  useEffect(() => {
    if (animacionActiva) {
      const interval = setInterval(() => {
        if (imagenActual < 6) {
          setImagenActual((prev) => prev + 1);
        } else {
          setImagenActual(3);
          setAnimacionActiva(false); // Detener la animación
          navigate("/induccion"); // Navegar a la nueva página
        }
      }, 400);

      return () => clearInterval(interval);
    }
  }, [imagenActual, animacionActiva, navigate]);

  const iniciarAnimacion = () => {
    setImagenActual(0);
    setAnimacionActiva(true);
  };

  const imagenes = [
    BotonImagen,
    BotonImagen2,
    BotonImagen3,
    BotonImagen4,
    BotonImagen5,
    BotonImagen6,
    BotonImagen7,
    BotonImagen8,
  ];

  return (
    <div
      className="container-pantalla-museo"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="texto-bienvenida">
        Bienvenidos a una nueva experiencia
      </div>
      <div className="texto-inicio">Museo Interactivo Lilí</div>

      <img
        src={imagenes[imagenActual]}
        alt="Animación"
        onClick={iniciarAnimacion}
        className="boton-animacion"
      />
    </div>
  );
}

export { PantallaMuseo };
