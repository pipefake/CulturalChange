import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import bloqueo from "./simbolos/Candado.png";

import palabra from "./simbolos/palabra.png";
import "font-awesome/css/font-awesome.css";
import "./Traductor.css";
import imgSwitcher from "./simbolos/palabra.png";
import on from "./switch/on.png";
import { Link } from "react-router-dom";
import { Header } from "../Header";

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
import { Contexto } from "../Contexto";
import { Acumulador } from "./Acumulador";
import { BtnContinuar } from "../BtnContinuar";
import { simbolos } from "../rolesdata";
import { useMyContext } from "../SeleccionCargando/MyContext";

function Traductor(props) {
  const [cambiar, setCambiar] = React.useState(true);
  const [turner, setTurner] = React.useState(false);
  const valid = props.valid;
  const image = props.img;
  const anagrama = props.anagrama;
  const [symbols, setSymbols] = useState([]);
  const [roomCode, setRoomCode] = useState(""); // State to store the room code

  useEffect(() => {
    const sendSymbols = async () => {
      try {
        // After sending all symbols, fetch the room code and symbols
        fetchRoomCode();
        fetchSymbols();
      } catch (error) {
        console.error("Error sending symbols:", error);
      }
    };
    // Call the function to send symbols
    sendSymbols();
  }, []);

  const fetchRoomCode = async () => {
    try {
      const response = await axios.get("https://testdeploy-production-9d97.up.railway.app/roomCode");
      console.log("Code: ", response.data[0].code); // Log entire response
      if (response.data.length > 0 && response.data[0].code) {
        setRoomCode(response.data[0].code); // Set the room code state
      }
    } catch (error) {
      console.error("Error fetching room code:", error);
    }
  };

  const addSymbol = async (symbolName) => {
    try {
      const response = await axios.post("https://testdeploy-production-9d97.up.railway.app/roomCode", {
        huaqueroSymbols: {
          name: symbolName,
          found: false,
        },
      });
      console.log(`${symbolName} posted successfully`);
      setSymbols([...symbols, response.data]); // Update the symbols array with the newly added symbol
    } catch (error) {
      console.error(`Error posting ${symbolName}:`, error);
    }
  };

  const fetchSymbols = async () => {
    try {
      const response = await axios.get("https://testdeploy-production-9d97.up.railway.app/roomCode");
      setSymbols(response.data[0].huaqueroSymbols); // Assuming the symbols are stored in an array inside the response
    } catch (error) {
      console.error("Error fetching symbols:", error);
    }
  };

  const updateSymbol = async (symbolName) => {
    try {
      const response = await axios.patch("https://testdeploy-production-9d97.up.railway.app/roomCode", {
        symbolName,
        found: true,
      });
      console.log(`Symbol ${symbolName} updated successfully`);
    } catch (error) {
      console.error(`Error updating symbol ${symbolName}:`, error);
    }
  };

  const onSwitch = (event) => {
    setCambiar(!cambiar);
    const symbolName = props.imgSimbolo
      .split("/") // Split the URL by slashes
      .pop() // Get the last part of the URL (the file name)
      .split(".")[0]; // Remove the file extension (e.g., '.png')
    // Now symbolName contains the extracted symbol name
    console.log(symbolName);
    updateSymbol(symbolName);
  };

  const onLock = (event) => {
    setCambiar(!cambiar);
  };

  const onTurn = (event) => {
    setTurner(!turner);
  };
  return (
    <div>
      {!valid ? (
        <img
          className="imgAnagramaBlock"
          onClick={onLock}
          src={bloqueo}
          alt="Logo alusivo de las culturas"
        />
      ) : (
        <img
          className="imgAnagramaBlock"
          onClick={onSwitch}
          src={cambiar ? props.imgSimbolo : props.imgAnagrama}
          alt="Logo alusivo de las culturas"
        />
      )}
    </div>
  );
}

export { Traductor };
