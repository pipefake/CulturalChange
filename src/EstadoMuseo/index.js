import React, { useState, useEffect } from "react";
import "./EstadoMuseo.css";
import fondo from "./resources/Estado.png";
import GuiaLogo from "./resources/GuiaLogo.png";
import HuaqueroLogo from "./resources/HuaqueroLogo.png";
import InterpreteLogo from "./resources/InterpreteLogo.png";
import AntropologoLogo from "./resources/AntropologoLogo.png";
import GuiaLogoNo from "./resources/GuiaNo.png";
import HuaqueroLogoNo from "./resources/HuaqueroNo.png";
import InterpreteLogoNo from "./resources/InterpreteNo.png";
import AntropologoLogoNo from "./resources/AntropologoNo.png";
import axios from "axios";

function EstadoMuseo() {
  // Define el estado para cada logo y nombre.
  const [guia, setGuia] = useState(false);
  const [huaquero, setHuaquero] = useState(false);
  const [interprete, setInterprete] = useState(false);
  const [antropologo, setAntropologo] = useState(false);

  const [guiaName, setGuiaName] = useState("");
  const [huaqueroName, setHuaqueroName] = useState("");
  const [interpreteName, setInterpreteName] = useState("");
  const [antropologoName, setAntropologoName] = useState("");

  const [activeRoomCode, setActiveRoomCode] = useState("");

  useEffect(() => {
    let intervalId;

    const fetchData = async () => {
      try {
        const data = await getCurrentRoom();
        if (data) {
          setActiveRoomCode(data);
          console.log("Room data set:", data);

          // Start the interval only after the activeRoomCode has been set.
          intervalId = setInterval(async () => {
            const numOfUsers = await findNFilterUsers(data); // pass the fetched room code directly

            // Clear the interval if 4 users are found
            if (numOfUsers >= 4) clearInterval(intervalId);
          }, 3000);
        } else {
          console.error("No room data received");
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchData();

    // Clear the interval when the component is unmounted.
    return () => clearInterval(intervalId);
  }, []);

  const getCurrentRoom = async () => {
    try {
      const response = await axios.get("/roomCode");
      const currentRoomArray = response.data;

      if (currentRoomArray && currentRoomArray.length > 0) {
        const currentRoomCode = currentRoomArray[0].code;
        return currentRoomCode; // returns only the room code string
      } else {
        console.error("Room not found");
      }
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  };

  const findNFilterUsers = async (roomCode) => {
    console.log("Looking for users with roomCode: ", roomCode);
    try {
      const response = await axios.get("/users");
      const users = response.data;
      const matchedUsers = users.filter((u) => u.codigoSala === roomCode);

      if (matchedUsers && matchedUsers.length > 0) {
        console.log("Found users: ");
        matchedUsers.forEach((user) => {
          console.log(
            "Name:",
            user.name,
            "Room Code:",
            user.codigoSala,
            "User Role: ",
            user.rol
          );

          // Check user's role, update state, and set name accordingly
          switch (user.rol) {
            case "Guía":
              setGuia(true);
              setGuiaName(user.name); // Set the name of the user who selected 'guia'
              break;
            case "Huaquero":
              setHuaquero(true);
              setHuaqueroName(user.name); // Set the name of the user who selected 'huaquero'
              break;
            case "Intérprete":
              setInterprete(true);
              setInterpreteName(user.name); // Set the name of the user who selected 'interprete'
              break;
            case "Antropólogo":
              setAntropologo(true);
              setAntropologoName(user.name); // Set the name of the user who selected 'antropologo'
              break;
            default:
              console.error("Unknown user role:", user.rol);
          }
        });
      } else {
        console.log("No users found with room code", roomCode);
      }

      return matchedUsers.length;
    } catch (error) {
      console.error("Error fetching and filtering users:", error);
    }
  };

  return (
    <div
      className="container-estado-museo"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="container-roles">
        <h2 className="titulo-roles">Roles seleccionados</h2>
        <button onClick={() => findNFilterUsers()}>Check Users</button>
        <div className="grid-logos">
          <div className="logo-container" onClick={() => setGuia(!guia)}>
            <img src={guia ? GuiaLogo : GuiaLogoNo} alt="Logo Guia" />
            <p>{guia ? guiaName : "?"}</p>
          </div>
          <div
            className="logo-container"
            onClick={() => setHuaquero(!huaquero)}
          >
            <img
              src={huaquero ? HuaqueroLogo : HuaqueroLogoNo}
              alt="Logo Huaquero"
            />
            <p>{huaquero ? huaqueroName : "?"}</p>
          </div>
          <div
            className="logo-container"
            onClick={() => setInterprete(!interprete)}
          >
            <img
              src={interprete ? InterpreteLogo : InterpreteLogoNo}
              alt="Logo Interprete"
            />
            <p>{interprete ? interpreteName : "?"}</p>
          </div>
          <div
            className="logo-container"
            onClick={() => setAntropologo(!antropologo)}
          >
            <img
              src={antropologo ? AntropologoLogo : AntropologoLogoNo}
              alt="Logo Antropologo"
            />
            <p>{antropologo ? antropologoName : "?"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { EstadoMuseo };
