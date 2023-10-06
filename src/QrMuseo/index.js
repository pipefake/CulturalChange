import React, { useState, useEffect } from "react";
import "./QrMuseo.css";
import fondo from "./resources/QrMuseo.png";
import refresh from "./resources/Refresh.png";
import QRCode from "qrcode.react";
import axios from "axios";

function QrMuseo() {
  const [roomCode, setRoomCode] = useState("");
  const [userCount, setUserCount] = useState(0);

  const fetchRoomData = async () => {
    try {
      // Fetch the room code
      const roomResponse = await axios.get("/roomCode");
      setRoomCode(roomResponse.data[0].code);

      // Fetch the user count
      const userResponse = await axios.get("/users");
      const users = userResponse.data;
      const count = users.filter((user) => user.codigoSala === roomCode).length;
      setUserCount(count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch room data immediately when the component mounts
    fetchRoomData();

    // Set an interval to fetch room data every 10 seconds
    const interval = setInterval(fetchRoomData, 10 * 1000);

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(interval);
    };
  }, [roomCode]);
  
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
