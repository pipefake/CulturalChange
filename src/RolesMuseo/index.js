import React from "react";
import "./RolesMuseo.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import GuiaLogo from "./resources/GuiaLogo.png";
import HuaqueroLogo from "./resources/HuaqueroLogo.png";
import InterpreteLogo from "./resources/InterpreteLogo.png";
import AntropologoLogo from "./resources/AntropologoLogo.png";

const roles = [
  {
    titulo: "Guía",
    color: "#A6DD03",
    descripcion:
      "Deberás observar detalladamente el mapa e indicarle al Huaquero, dónde debe buscar los misteriosos símbolos que aparecen en el mapa.",
    logo: GuiaLogo,
  },
  {
    titulo: "Huaquero",
    color: "#9A0000",
    descripcion:
      "Con ayuda de la cámara de tu dispositivo, escanea las esculturas y descubre los símbolos misteriosos.",
    logo: HuaqueroLogo,
  },
  {
    titulo: "Intérprete",
    color: "#2C53A2",
    descripcion:
      "Utiliza los símbolos que el Huaquero encuentre para traducirlos. Encuentra sus pares para revelar su significado.",
    logo: InterpreteLogo,
  },
  {
    titulo: "Antropólogo",
    color: "#D9771E",
    descripcion:
      "Resuelve el anagrama, ordena las palabras para desbloquear el código secreto.",
    logo: AntropologoLogo,
  },
];

function RolesMuseo() {
  return (
    <Slider className="roles-slider">
      {roles.map((rol, index) => (
        <div
          key={index}
          className="role-slide"
          style={{ backgroundImage: `url(${rol.fondo})` }}
        >
          <h1>¡Seleccionen sus roles, viajeros!</h1>
          <h2>{rol.titulo}</h2>
          <div className="role-content">
            <img src={rol.logo} alt={rol.titulo} />
            <p>{rol.descripcion}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export { RolesMuseo };
