import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import "./ganan.css";
import museolili from "../InputCodigo/resources/museolili.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function FeedbackPositivo() {
    
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [ganan, setGanan] = useState(false); // Cambiar este
  const [activeRoomCode, setActiveRoomCode] = useState("");

  const [userDataG, setUserDataG] = useState({
    _id: "",
    name: "",
    identification: "",
    email: "",
    rol: "",
    finalizadaTarea: "",
    tipoUsuario: "",
  });

  const [userDataH, setUserDataH] = useState({
    _id: "",
    name: "",
    identification: "",
    email: "",
    rol: "",
    finalizadaTarea: "",
    tipoUsuario: "",
  });

  const [userDataI, setUserDataI] = useState({
    _id: "",
    name: "",
    identification: "",
    email: "",
    rol: "",
    finalizadaTarea: "",
    tipoUsuario: "",
  });
  const [userDataA, setUserDataA] = useState({
    _id: "",
    name: "",
    identification: "",
    email: "",
    rol: "",
    finalizadaTarea: "",
    tipoUsuario: "",
  });

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
            if (numOfUsers >= 5) clearInterval(intervalId);
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

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    navigate("/");
  };

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

  useEffect(() => {
    if (
      userDataG.finalizadaTarea == true &&
      userDataH.finalizadaTarea == true &&
      userDataI.finalizadaTarea == true &&
      userDataA.finalizadaTarea == true
    ) {
      setTimeout(() => {
        setGanan(true);
      }, 3000); // Espera 5 segundos (5000 ms) antes de redirigir
    }
  }, [userDataG, userDataG, userDataG, userDataG]);

  const findNFilterUsers = async (roomCode) => {
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
              setUserDataG(user);
              break;
            case "Huaquero":
              setUserDataH(user);
              break;
            case "Intérprete":
              setUserDataI(user);
              break;
            case "Antropólogo":
              setUserDataA(user);
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
    <div className="contenedorGanan">
      {ganan ? (
        <div className="contenedorExito">
          <h1>¡Felicitaciones la misión ha sido completada con éxito!</h1>
          <p>
            ¡Viajeros!, han encontrado la historia de los pueblos amerindios.
            ¡Los han salvado del olvido!
          </p>
        </div>
      ) : (
        <div className="contenedorExito">
          <h1>La misión no ha sido completada con éxito</h1>
          <p>Espera n minutos para participar nuevamente</p>
        </div>
      )}
      <form className="formularioFeedback">
        <h2>Califica tu experiencia</h2>
        <StarRatings
          className="estrellas"
          rating={rating}
          starRatedColor="gold"
          changeRating={handleRatingChange}
          numberOfStars={5}
          starDimension="30px"
          name="rating"
        />
        <h2>Deja un comentario:</h2>
        <textarea
          placeholder="Escribe tu comentario..."
          value={comment}
          onChange={handleCommentChange}
        />
        <button className="buttonEnviarForm" onClick={handleSubmit}>
          Enviar
        </button>
      </form>
      <img className="logoImg" src={museolili} alt="Logo del museo lili" />
    </div>
  );
}

export { FeedbackPositivo };
