import React, { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:3500";

function Test() {
  const [usuarios, setUsuarios] = useState([]); // Estado para almacenar los usuarios
  
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    
    socket.on('connect', () => {
      console.log('Conectado al servidor');
    });

    socket.on('connect_error', (error) => {
      console.error('Error de conexión:', error);
    });
    
    socket.on('cambioEnLaColeccion', (datos) => { // Escuchar los eventos emitidos por el servidor
      console.log('Datos recibidos:', datos);
      setUsuarios(datos); // Actualizar el estado con los nuevos datos recibidos
    });

    return () => {
      console.log('Desconectando el socket...');
      socket.disconnect(); // Desconectar cuando el componente se desmonte
    };
  }, []);

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {
          usuarios.map((usuario, index) => (
            <li key={index}>
              <p><strong>Email:</strong> {usuario.email}</p>
              <p><strong>Name:</strong> {usuario.name}</p>
              {/* Renderizar los demás campos de la misma manera */}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Test;
