import React, { useState, useEffect } from "react";
import "./QrMuseo.css";
import fondo from "./resources/QrMuseo.png";
import refresh from "./resources/Refresh.png";
import QRCode from "qrcode.react";
import axios from "axios";

function QrMuseo() {
  const [roomCode, setRoomCode] = useState("");
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Fetch the room code immediately when the component is mounted
    fetchRoomCode();

    // Set an interval to fetch the room code and user count every 10 seconds
    const interval = setInterval(() => {
      fetchRoomCode();
      fetchUserCount();
    }, 30 * 1000);

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchRoomCode = async () => {
    try {
      const response = await axios.get("/roomCode");
      setRoomCode(response.data[0].code);
    } catch (error) {
      console.error("Error fetching room code:", error);
    }
  };

  const fetchUserCount = async () => {
    try {
      const response = await axios.get("/users");
      const users = response.data;
      const count = users.filter((user) => user.codigoSala === roomCode).length;
      setUserCount(count);
    } catch (error) {
      console.error("Error fetching user count:", error);
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
          <div className="cuadro-contenedor">
            {roomCode && (
              <>
                <QRCode
                  value={roomCode}
                  size={300} // Tamaño Qr
                  bgColor="#c98686" // Color fondo
                  fgColor="#000" // Color QR
                />
                <div className="room-code">{roomCode}</div>
              </>
            )}
          </div>
          <img
            src={refresh}
            alt="Descripción del botón"
            className="imagen-boton"
          />
        </div>
        <div className="texto-informacion contador">{userCount}/4</div>
      </div>
    </div>
  );
}

export { QrMuseo };
