import React, { useEffect, useState } from 'react';
import axios from 'axios';
const CryptoJS = require('crypto-js');

function TablaPuntuacion() {
  const [objects, setObjects] = useState([]);
  const [sortedObjects, setSortedObjects] = useState([]);
  const [orderBy, setOrderBy] = useState('asc'); // Puedes usar 'asc' o 'desc' para ordenar

  useEffect(() => {
    // Hacer una petición HTTP a la API para obtener los objetos desde MongoDB
    axios.get("/users")
      .then(response => {
        console.log("conectado");
        setObjects(response.data); // Establecer los objetos en el estado
        console.log("Mis datos:" + response.data)
      })
      .catch(error => {
        console.error('Error al obtener los objetos:', error);
      });
  }, 10000);

  useEffect(() => {
    // Agrupar los objetos por codigoSala
    const groupedObjects = objects.reduce((groups, object) => {
      const codigoSala = desencriptador(object.codigoSala);
      if (!groups[codigoSala]) {
        groups[codigoSala] = [];
      }
      groups[codigoSala].push(object);
      return groups;
    }, {});

    // Ordenar los grupos en el orden deseado
    const sortedGroups = Object.keys(groupedObjects).sort((a, b) => {
      if (orderBy === 'asc') {
        return a.localeCompare(b);
      } else {
        return b.localeCompare(a);
      }
    });

    // Crear la lista de objetos ordenados
    const sortedList = sortedGroups.map(codigoSala => ({
      codigoSala,
      usuarios: groupedObjects[codigoSala],
    }));

    setSortedObjects(sortedList);
  }, [objects, orderBy]);

  const desencriptador = (datos) => {
    const secretKey = '$2b$10$tV5AHXrk3pZymfGihPI4T.S8Sxx12aWfNpyQTAt.QA029.HQqJMcy';

  // Verificar si los datos son nulos o indefinidos
  if (!datos) {
    return "Datos no disponibles";
  }

  try {
    const bytes = CryptoJS.AES.decrypt(datos, secretKey);
    const encryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return encryptedData;
  } catch (error) {
    console.error('Error al desencriptar datos:', error);
    return "Error en desencriptación";
  }
  };

  return (
    <div>
      <h1>Lista de Objetos</h1>
      <label>
        Ordenar por:
        <select onChange={(e) => setOrderBy(e.target.value)}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </label>
      <ul>
        {sortedObjects.map((group, index) => (
          <li key={index}>
            <h2>Código Sala: {group.codigoSala}</h2>
            <ul>
              {group.usuarios.map((user) => (
                <li key={user._id}>
                  {(user.name)} - {(user.rol)} - {(user.codigoSala)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export {TablaPuntuacion};
