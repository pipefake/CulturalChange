import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RolesMuseo.css";
import GuiaLogo from "./resources/GuiaLogo.png";
import HuaqueroLogo from "./resources/HuaqueroLogo.png";
import InterpreteLogo from "./resources/InterpreteLogo.png";
import AntropologoLogo from "./resources/AntropologoLogo.png";
import FondoRoles from "./resources/FondoRoles.png";
import NarracionGuia from "./resources/NarracionGuia.mp3";
import NarracionHuaquero from "./resources/NarracionHuaquero.mp3";
import NarracionInterprete from "./resources/NarracionInterprete.mp3";
import NarracionAntropologo from "./resources/NarracionAntro.mp3";

const roles = [
  {
    titulo: "Guía",
    descripcion:
      "Deberás observar detalladamente el mapa e indicarle al Huaquero, dónde debe buscar los misteriosos símbolos que aparecen en el mapa.",
    logo: GuiaLogo,
    audio: NarracionGuia,
  },
  {
    titulo: "Huaquero",
    descripcion:
      "Con ayuda de la cámara de tu dispositivo, escanea las esculturas y descubre los símbolos misteriosos.",
    logo: HuaqueroLogo,
    audio: NarracionHuaquero,
  },
  {
    titulo: "Intérprete",
    descripcion:
      "Utiliza los símbolos que el Huaquero encuentre para traducirlos. Encuentra sus pares para revelar su significado.",
    logo: InterpreteLogo,
    audio: NarracionInterprete,
  },
  {
    titulo: "Antropólogo",
    descripcion:
      "Resuelve el anagrama, ordena las palabras para desbloquear el código secreto.",
    logo: AntropologoLogo,
    audio: NarracionAntropologo,
  },
];

function RolesMuseo() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [audioCounter, setAudioCounter] = useState(0);

  const playAudioInSequence = async () => {
    for (const role of roles) {
      const audio = new Audio(role.audio);
      setActiveRole(role.titulo);
      await new Promise((resolve) => {
        audio.onended = () => {
          resolve();
          setAudioCounter((prevCounter) => prevCounter + 1);
        };
        audio.play();
      });
    }
    setActiveRole("");
  };

  const startSequence = () => {
    setIsStarted(true);
    playAudioInSequence();
  };

  useEffect(() => {
    if (audioCounter === roles.length) {
      navigate("/estadoMuseo");
    }
  }, [audioCounter, navigate]);

  return (
    <div className="roles-section">
      <div
        className="fondo"
        style={{ backgroundImage: `url(${FondoRoles})` }}
      ></div>
      <h1>¡Seleccionen sus roles, viajeros!</h1>
      <h3>Estamos a punto de comenzar.</h3>
      <div className="roles-container">
        {roles.map((rol, index) => (
          <div key={index} className="role">
            <h2>{rol.titulo}</h2>
            <div className="role-content">
              <img
                src={rol.logo}
                alt={rol.titulo}
                className={activeRole === rol.titulo ? "rotating" : ""}
              />
              <p>{rol.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
      {!isStarted && (
        <button className="start-button" onClick={startSequence}>
          Comenzar
        </button>
      )}
    </div>
  );
}

export { RolesMuseo };
