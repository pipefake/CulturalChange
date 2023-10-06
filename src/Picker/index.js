import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogdata } from "../blogdata";
import { ModalHelp } from "../Modal";
import museolili from "../InputCodigo/resources/museolili.png";
import "./picker.css";
import axios from "axios";
import { useMyContext } from "../SeleccionCargando/MyContext";

import logoGuia from "./logos/logoGuia.png";
import logoHuaquero from "./logos/logoHuaquero.png";
import logoInterprete from "./logos/logoInterprete.png";
import logoAntropologo from "./logos/logoAntropologo.png";
import logoGuiaBN from "../SeleccionCargando/logos/logoGuiaBN.png";
import logoHuaqueroBN from "../SeleccionCargando/logos/logoHuaqueroBN.png";
import logoInterpreteBN from "../SeleccionCargando/logos/logoInterpreteBN.png";
import logoAntropologoBN from "../SeleccionCargando/logos/logoAntropologoBN.png";

function Picker() {
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
  const {
    esGuia,
    setEsGuia,
    esHuaquero,
    setEsHuaquero,
    esInterprete,
    setEsInterprete,
    esAntropologo,
    setEsAntropologo,
  } = useMyContext();

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
    <>
      <div className="divPicker">
        <h1>Escoge tu rol</h1>
        <ul>
          {blogdata.map((post) => (
            <IntroduccionRol
              post={post}
              esGuia={guia}
              esHuaquero={huaquero}
              esInterprete={interprete}
              esAntropologo={antropologo}
              key={post.slug}
            />
          ))}
        </ul>
        <img className="imglogo" src={museolili} alt="Logo del museo lili" />
      </div>
    </>
  );
}

function IntroduccionRol(props) {
  const esGuia = props.esGuia;
  const esHuaquero = props.esHuaquero;
  const esInterprete = props.esInterprete;
  const esAntropologo = props.esAntropologo;
  const post = props.post;

  // Define the logo variable based on the role
  let logo;

  let isDisabled = false;

  if (post.rol === "Guía") {
    logo = !esGuia ? logoGuia : logoGuiaBN;
    if (logo === logoGuiaBN) {
      isDisabled = true;
    }
  } else if (post.rol === "Huaquero") {
    logo = !esHuaquero ? logoHuaquero : logoHuaqueroBN;
    if (logo === logoHuaqueroBN) {
      isDisabled = true;
    }
  } else if (post.rol === "Intérprete") {
    logo = !esInterprete ? logoInterprete : logoInterpreteBN;
    if (logo === logoInterpreteBN) {
      isDisabled = true;
    }
  } else if (post.rol === "Antropólogo") {
    logo = !esAntropologo ? logoAntropologo : logoAntropologoBN;
    if (logo === logoAntropologoBN) {
      isDisabled = true;
    }
  } else {
    // Proporciona un logotipo predeterminado en caso de que el rol no coincida con ninguno de los anteriores
    logo = logoInterprete;
  }

  const handleRoleSelection = (selectedRole) => {

    localStorage.setItem("selectedRole", selectedRole);

  }

  return (
    <>
      <li>
        {/* Use the selected logo */}
        {isDisabled ? (
          <a className={`txtRoles linkRoles disabled-link`} disabled>
            <img className="logos" src={logo} alt={`Logo ${post.rol}`} />
            {post.rol}
          </a>
        ) : (
          <Link
            className={`txtRoles linkRoles`}
            to={`/introduccion/${post.slug}`}
            onClick={() => handleRoleSelection(post.rol)}
          >
            <img className="logos" src={logo} alt={`Logo ${post.rol}`} />
            {post.rol}
          </Link>
        )}
      </li>
    </>
  );
}

export { Picker };
