import React, { useState, useEffect } from "react";
import "./QrMuseo.css";
import fondo from "./resources/QrMuseo.png";
import refresh from "./resources/Refresh.png";
import QRCode from 'qrcode.react';
import axios from 'axios';

function QrMuseo() {

  const [roomCode, setRoomCode] = useState('');

  useEffect(() => {
      // Fetch the room code immediately when the component is mounted
      fetchRoomCode();

      // Set an interval to fetch the room code every 10 minutes
      const interval = setInterval(fetchRoomCode, 30 * 1000);

      // Clear the interval when the component is unmounted
      return () => clearInterval(interval);
  }, []);

  const fetchRoomCode = async () => {
      try {
          const response = await axios.get('/api/roomCode');
          setRoomCode(response.data.roomCode);
      } catch (error) {
          console.error('Error fetching room code:', error);
      }
  };

  return (
    <div
      className="container-qr-museo"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="texto-contenedor">
        <div className="texto-informacion">
          <div className="linea-texto">Lee el código QR o</div>
          <div className="linea-texto">ingresa el código de</div>
          <div className="linea-texto">la sala.</div>
        </div>

        <div className="imagenes-contenedor">
            {roomCode ? (
                <>
                    <h2>Your Room Code:</h2>
                    <p>{roomCode}</p>
                    <h3>Scan the QR Code:</h3>
                    <QRCode value={roomCode} />
                </>
            ) : (
                <p>Loading room code...</p>
            )}
        </div>
        <img
          src={refresh}
          alt="Descripción del botón"
          className="imagen-boton"
        />
        <div className="texto-informacion contador">0/4</div>
      </div>
    </div>
  );
}

export { QrMuseo };
