import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function TestFinalizada() {
  const [activeRoomCode, setActiveRoomCode] = useState("");
  const [antropologo, setAntropologo] = useState(false);
  const [antropologoName, setAntropologoName] = useState("");
  const navigate = useNavigate();


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
            if (numOfUsers >= 2) clearInterval(intervalId);
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
        const user = response.data;
        const matchedUsers = user.filter((u) => u.codigoSala === roomCode);

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

                if (user.rol === "Antropólogo") {
                    console.log("El usuario antropologo existe.")
                    setAntropologo(true);
                    setAntropologoName(user.name);

                    if (user.finalizadaTarea === true) {
                        console.log(`El usuario ${user.name} ha terminado su tarea.`);
                        navigate('/qrMuseo')
                    }
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

  return <h1>Página de espera de prueba</h1>;
}
export { TestFinalizada };
