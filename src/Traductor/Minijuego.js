import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Board from "./Board/Board.js";
import { Link } from "react-router-dom";
import { Header } from "../Header";
import on from "./switch/on.png";
import { AxesHelper } from "three";
import simbolo1 from "./simbolos/simbolo1.png";
import simbolo2 from "./simbolos/simbolo2.png";
import simbolo3 from "./simbolos/simbolo3.png";
import simbolo4 from "./simbolos/simbolo4.png";
import simbolo5 from "./simbolos/simbolo5.png";
import simbolo6 from "./simbolos/simbolo6.png";
import simbolo7 from "./simbolos/simbolo7.png";
import simbolo8 from "./simbolos/simbolo8.png";
import simbolo9 from "./simbolos/simbolo9.png";
import simbolo10 from "./simbolos/simbolo10.png";
import simbolo11 from "./simbolos/simbolo11.png";
import simbolo12 from "./simbolos/simbolo12.png";
import simbolo13 from "./simbolos/simbolo13.png";
import simbolo14 from "./simbolos/simbolo14.png";
import simbolo15 from "./simbolos/simbolo15.png";
import simbolo16 from "./simbolos/simbolo16.png";

import tuariles from "./anagramas/tuariles.png";
import tear from "./anagramas/tear.png";
import alfarosre from "./anagramas/alfarosre.png";
import potiem from "./anagramas/potiem.png";
import turascul from "./anagramas/turascul.png";
import masfor from "./anagramas/masfor.png";
import blospue from "./anagramas/blospue.png";
import gadole from "./anagramas/gadole.png";
import braso from "./anagramas/braso.png";
import loshi from "./anagramas/loshi.png";
import toriahis from "./anagramas/toriahis.png";
import tefuen from "./anagramas/tefuen.png";
import naur from "./anagramas/naur.png";
import incianfa from "./anagramas/incianfan.png";
import zacru from "./anagramas/zacru.png";
import dosniso from "./anagramas/dosniso.png";
import zaspie from "./anagramas/zaspie.png";
import batosil from "./anagramas/batosil.png";

import { Traductor } from "./index.js";

import off from "./switch/off.png";
import { simbolos } from "../rolesdata.js";

import { Contexto } from "../Contexto";
import { Acumulador } from "./Acumulador";

import useSound from 'use-sound';
import tap from './audios/sonidotab.mp3';
import pierdenSonido from './audios/sonidoincorrecto.mp3';
import gananSonido from './audios/sonido.exito.pares2.mp3';

// Agrega más imágenes según la cantidad de elementos en tu array original

const Minijuego = (props) => {
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = React.useState([]);
  const [selectedMemoBlock, setselectedMemoBlock] = React.useState(null);
  const [animating, setAnimating] = React.useState(false);
  const [btnSlide, setBtnSlide] = React.useState(false);

  const [encontrados, setEncontrados] = useState([false, false, false, false]);

  const [symbols, setSymbols] = useState([]);

  const [imageList, setImageList] = useState([]); // Initialize imageList as an empty array

  const [esinterpretado1, setEsInterpretado1] = useState(false);
  const [esinterpretado2, setEsInterpretado2] = useState(false);
  const [esinterpretado3, setEsInterpretado3] = useState(false);
  const [esinterpretado4, setEsInterpretado4] = useState(false);
  const [activeRoomCode, setActiveRoomCode] = useState("");
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    identification: "",
    email: "",
    rol: "",
    finalizadaTarea: "",
    tipoUsuario: "",
  });

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

  const getCurrentRoom = async () => {
    try {
      const response = await axios.get(
        "https://testdeploy-production-9d97.up.railway.app/roomCode"
      );
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
        navigate("/ganan");
      }, 3000); // Espera 5 segundos (5000 ms) antes de redirigir
    }
  }, [userDataG, userDataG, userDataG, userDataG]);

  const findNFilterUsers = async (roomCode) => {
    try {
      const response = await axios.get(
        "https://testdeploy-production-9d97.up.railway.app/users"
      );
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchSymbols();
      console.log(encontrados);
    }, 10000); // Check every 10 seconds

    return () => clearInterval(intervalId); // Clear the interval on unmount
  }, []);

  const fetchSymbols = async () => {
    try {
      const response = await axios.get("/roomCode"); // Replace with the correct API endpoint
      console.log("Full Response:", response.data); // Log entire response
      const symbols = response.data[0].huaqueroSymbols; // Assuming the symbols are stored in an array inside the response
      const newEncontrados = [false, false, false, false];
      symbols.forEach((symbol, index) => {
        if (symbol.found) {
          newEncontrados[index] = true;
        }
      });
      setEncontrados(newEncontrados);
    } catch (error) {
      console.error("Error fetching symbols:", error);
      return [];
    }
  };

  useEffect(() => {
    buscarUbicaciones(props.historia); // Update imageList based on props.historia
  }, [props.historia]);

  function buscarUbicaciones(aux) {
    let newImageList = [];

    if (aux === 1) {
      newImageList = [
        simbolo1,
        simbolo2,
        simbolo3,
        simbolo4,
        simbolo5,
        simbolo6,
        simbolo7,
        simbolo8 /* Add more images */,
      ];
    } else if (aux === 2) {
      newImageList = [
        simbolo13,
        simbolo14,
        simbolo15,
        simbolo16,
        simbolo8,
        simbolo1,
        simbolo2,
        simbolo9,
      ];
    } else if (aux === 3) {
      newImageList = [
        simbolo9,
        simbolo10,
        simbolo11,
        simbolo12,
        simbolo3,
        simbolo15,
        simbolo14,
        simbolo7,
      ];
    } else if (aux === 4) {
      newImageList = [
        simbolo5,
        simbolo6,
        simbolo7,
        simbolo8,
        simbolo3,
        simbolo14,
        simbolo12,
        simbolo2,
      ];
    }

    setImageList([...newImageList]);
  }

  useEffect(() => {
    const shuffledImageList = shuffleArray([...imageList, ...imageList]);
    setShuffledMemoBlocks(
      shuffledImageList.map((image, i) => ({
        codigo: 1000 + i,
        index: i,
        image,
        flipped: false,
      }))
    );
  }, [imageList]); // Update shuffledMemoBlocks when imageList changes

  const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const cambiarComponenteInterprete = () => {
    setBtnSlide(!btnSlide);
  };
  const [anagramas, setAnagramas] = useState([]);

  useEffect(() => {
    buscarAnagramas(props.historia);
  }, [props.historia]);

  function buscarAnagramas(historia) {
    let nuevosAnagramas = [];

    if (historia === 1) {
      nuevosAnagramas = [tuariles, tear, alfarosre, potiem];
    } else if (historia === 2) {
      nuevosAnagramas = [turascul, masfor, blospue, gadole];
    } else if (historia === 3) {
      nuevosAnagramas = [braso, loshi, toriahis, tefuen];
    } else if (historia === 4) {
      nuevosAnagramas = [tuariles, naur, incianfa, zacru];
    } else if (historia === 5) {
      nuevosAnagramas = [dosniso, zaspie, toriahis, batosil];
    } else {
      console.warn("Unhandled history case: ", historia);
    }
    setAnagramas(nuevosAnagramas);
  }
  const cambiarEstados = (positionInImageList) => {
    if (positionInImageList < 4) {
      switch (positionInImageList) {
        case 0:
          setEsInterpretado1(true);
          break;
        case 1:
          setEsInterpretado2(true);
          break;
        case 2:
          setEsInterpretado3(true);
          break;
        case 3:
          setEsInterpretado4(true);
          break;
        default:
          break;
      }
    }
  };

  const handleMemoClick = (memoBlock) => {
    const flippedMemoBlock = { ...memoBlock, flipped: true };
    let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
    setShuffledMemoBlocks(shuffledMemoBlocksCopy);

    if (selectedMemoBlock === null) {
      setselectedMemoBlock(memoBlock);
    } else if (selectedMemoBlock.image === memoBlock.image) {
      console.log(
        `¡Las parejas coinciden! Son: ${JSON.stringify(
          selectedMemoBlock
        )} y ${JSON.stringify(memoBlock)}`
      );

      const positionInImageList = imageList.indexOf(selectedMemoBlock.image);

      console.log(positionInImageList);

      if (positionInImageList < 4 && encontrados[positionInImageList]) {
        cambiarEstados(positionInImageList);
        sonidoGanan();
      }

      if (positionInImageList === 0 && encontrados[positionInImageList]) {
        setselectedMemoBlock(null);
      } else if (
        !imageList.slice(0, 4).includes(selectedMemoBlock.image) ||
        !encontrados[positionInImageList]
      ) {
        // audio.play();
        setAnimating(true);
        setTimeout(() => {
          shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
          shuffledMemoBlocksCopy.splice(
            selectedMemoBlock.index,
            1,
            selectedMemoBlock
          );
          setShuffledMemoBlocks(shuffledMemoBlocksCopy);
          setselectedMemoBlock(null);
          setAnimating(false);
        }, 1000);
      } else {
        setselectedMemoBlock(null);
      }
    } else {
      setAnimating(true);

      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        shuffledMemoBlocksCopy.splice(
          selectedMemoBlock.index,
          1,
          selectedMemoBlock
        );
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);
        setselectedMemoBlock(null);
        setAnimating(false);
        sonidoPierden();
      }, 1000);
    }
  };

  const validardor = (index) => {
    let aux;

    if (index === 0) {
      aux = esinterpretado1;
    } else if (index === 1) {
      aux = esinterpretado2;
    } else if (index === 2) {
      aux = esinterpretado3;
    } else if (index === 3) {
      aux = esinterpretado4;
    }
    return aux;
  };


  const [playSound] = useSound(tap);
  const [sonidoPierden] = useSound(pierdenSonido);
  const [sonidoGanan] = useSound(gananSonido);


  return (
    <>
      <Contexto
        titulo="Descubre los símbolos"
        parrafo="Ten cuidado, si descubres símbolos diferentes a los que el Huaquero te mostró, perderás los que has descubierto"
      ></Contexto>
      <div className="fondoAmarillo">
        <div className="contentMinijuego">
          <button
            className="btnInterpreteSlide"
            onClick={cambiarComponenteInterprete}
          >
            {!btnSlide ? (
              <img src={off} alt="logo de Guia" />
            ) : (
              <img src={on} alt="logo de Guia" />
            )}
          </button>
          <button className="ContTraduccion sonido" onClick={playSound}>
            {btnSlide ? (
              anagramas.map((simbolo, index) => (
                <Traductor
                  key={index}
                  historia={props.historia}
                  imgAnagrama={anagramas[index]}
                  imgSimbolo={imageList[index]}
                  valid={validardor(index)}
                />
              ))
            ) : (
              <Board
                memoBlocks={shuffledMemoBlocks}
                animating={animating}
                handleMemoClick={handleMemoClick}
              />
            )}
          </button>
        </div>
      </div>

      <Acumulador
        historia={props.historia}
        encontrado1={encontrados[0]}
        encontrado2={encontrados[1]}
        encontrado3={encontrados[2]}
        encontrado4={encontrados[3]}
      />
    </>
  );
};

export { Minijuego };
