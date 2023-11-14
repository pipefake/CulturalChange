import React from "react";
import "./MuseoTabla.css";
import { useNavigate } from "react-router-dom";
import logoInterprete from "./resources/logoInterprete.png";
import logoGuia from "./resources/logoGuia.png";
import logoHuaquero from "./resources/logoHuaquero.png";
import logoAntropologo from "./resources/logoAntropologo.png";

function MuseoTabla() {
  const navigate = useNavigate();

  // Datos quemados
  const datos = [
    { nombre: "Luis", tiempo: "9:40 minutos", rol: logoGuia },
    { nombre: "Carla", tiempo: "9:50 minutos", rol: logoInterprete },
    { nombre: "Estiven", tiempo: "01:40 minutos", rol: logoHuaquero },
    { nombre: "Lentejo", tiempo: "90:40 minutos", rol: logoAntropologo },
  ];

  const handleContinuarClick = () => {
    // Redirigir a la página /museoTablaMejorT al hacer clic en el botón "Continuar"
    navigate("/museoTablaMejorT");
  };

  return (
    <div className="container-museo-tabla">
      <h1 className="titulo">Tiempo del recorrido</h1>
      <table>
        <thead>
          <tr className="encabezado">
            <th>Nombre</th>
            <th>Tiempo</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody className="contenido">
          {datos.map((dato) => (
            <tr key={dato.nombre}>
              <td>{dato.nombre}</td>
              <td>{dato.tiempo}</td>
              <td>
                <img className="imagen" src={dato.rol} alt="Icono de Rol" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="boton-continuar" onClick={handleContinuarClick}>
        Continuar
      </button>
    </div>
  );
}

export { MuseoTabla };
