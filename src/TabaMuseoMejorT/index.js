import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import './TablaMuseoMejorT.css';
import logoInterprete from '../MuseoTabla/resources/logoInterprete.png';
import logoGuia from '../MuseoTabla/resources/logoGuia.png';
import logoHuaquero from '../MuseoTabla/resources/logoHuaquero.png';
import logoAntropologo from '../MuseoTabla/resources/logoAntropologo.png';

function TablaMuseoMejorT() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    axios.get("http://testdeploy-production-9d97.up.railway.app/users")
      .then(response => {
        console.log("conectado");
        setDatos(response.data);
        console.log("Mis datos:" + response.data);
      })
      .catch(error => {
        console.error('Error al obtener los objetos:', error);
      });
  }, []);

  //funcion para retornar imagenes
  const getLogoByRol = (rol) => {
  switch (rol) {
    case 'guia':
      return require('../MuseoTabla/resources/logoGuia.png');
    case 'interprete':
      return require('../MuseoTabla/resources/logoInterprete.png');
    case 'huaquero':
      return require('../MuseoTabla/resources/logoHuaquero.png');
    case 'antropologo':
      return require('../MuseoTabla/resources/logoAntropologo.png');
    default:
      return null; // Otra lógica en caso de roles no reconocidos
  }
};

  return (
    <div className="container-museo-tabla">
      <h1 className="titulo">Mejor Tiempo</h1>
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
            <tr key={dato._id}>
              <td>{dato.name}</td>
              <td>{dato.codigoSala}</td>
              <td>
                {['guia', 'interprete', 'huaquero', 'antropologo'].includes(dato.rol) && (
                <img className="imagen" src={getLogoByRol(dato.rol)} alt="Icono de Rol" />
              )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="boton-continuar">Salir</button>
    </div>
  );
}

export { TablaMuseoMejorT };
