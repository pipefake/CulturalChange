import React, { useState, useEffect, useCallback, useRef } from "react";
import "./Bloqueo.css";
import bloqueoIMG from "./resources/Bloqueo_IMG.png";
import { Link } from "react-router-dom";
import { Header } from "../Header";
import axios from "axios";

function Bloqueo(props) {
  const historia = props.historia;

  const [encontrados, setEncontrados] = useState([false, false, false, false]);

  const [anagramas, setAnagramas] = useState([]);

  const [descifrados, setDescifrado1] = useState([false, false, false, false]);

  const [areAllInputsCorrect, setAreAllInputsCorrect] = useState(false);
  const validitiesRef = useRef([]); // Ref to keep track of the validity of each Anagrama

  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    identification: "",
    email: "",
    rol: "",
    finalizadaTarea: "",
    tipoUsuario: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData(); // asssuming this function fetches user data
        if (data) {
          setUserData(data);
          console.log("User data set:", data);
        } else {
          console.error("No user data received");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData(); // invoke the function to fetch and set user data
  }, []); // empty dependency array to run only once after component mount
  const userId = localStorage.getItem("userId"); // ID from local storage

  const fetchSymbols = async () => {
    try {
      const response = await axios.get("/roomCode"); // Replace with the correct API endpoint
      const huaqueroSymbols = response.data[0].huaqueroSymbols;

      console.log("Full Response:", response.data); // Log entire response

      const last4Symbols = huaqueroSymbols.slice(-4);

      const newDescifrados = last4Symbols.map((symbol) => symbol.found);

      setDescifrado1(newDescifrados);
    } catch (error) {
      console.error("Error fetching symbols:", error);
      return [];
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchSymbols();
      console.log(encontrados);
    }, 10000); // Check every 10 seconds

    return () => clearInterval(intervalId); // Clear the interval on unmount
  }, []);

  useEffect(() => {
    buscarAnagramas(props.historia);
  }, [props.historia]);

  function buscarAnagramas(historia) {
    let nuevosAnagramas = [];

    if (historia === 1) {
      nuevosAnagramas = ["tuariles", "tear", "alfarosre", "potiem"];
    } else if (historia === 2) {
      nuevosAnagramas = ["turascul", "masfor", "blospue", "gadole"];
    } else if (historia === 3) {
      nuevosAnagramas = ["braso", "loshi", "toriahis", "tefuen"];
    } else if (historia === 4) {
      nuevosAnagramas = ["tuariles", "naur", "incianfa", "zacru"];
    } else if (historia === 5) {
      nuevosAnagramas = ["dosniso", "zaspie", "toriahis", "batosil"];
    } else {
      console.warn("Unhandled history case: ", historia);
    }
    setAnagramas(nuevosAnagramas);
  }

  const handleAnagramaValidity = useCallback((index, isValid) => {
    validitiesRef.current[index] = isValid;
    setAreAllInputsCorrect(validitiesRef.current.every(Boolean));
  }, []);

  const getUserData = async () => {
    try {
      const response = await axios.get("/users"); // Adjusted the endpoint
      const users = response.data;
      const user = users.find((u) => u._id === userId); // Assuming each user object has an _id field

      if (user) {
        return user;
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateState = async () => {
    console.log(userData._id);
    console.log("UserData before axios call:", userData);

    if (userData) {
      try {
        const response = await axios.patch(
          "http://localhost:3500/users",
          {
            _id: userId,
            name: userData.name,
            identification: userData.identification,
            email: userData.email,
            rol: userData.rol,
            finalizadaTarea: "true",
            tipoUsuario: userData.tipoUsuario,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("User updated:", response.data);

        // localStorage.clear();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const handleClick = () => {
    updateState();
  };

  return (
    <>
      <div className="info_juegoAntropologo">
        <h1 className="info_juegoAntropologoTitulo">Descifra las palabras</h1>
        <p className="centrarParrafo">
          Solicita al intérprete las palabras claves
        </p>
      </div>    
      <div className="fondoAmarillo">
        <div className="contentMinijuego">
          {anagramas.map((palabra, index) => (
            <Anagrama
              isLock={descifrados[index]}
              key={index}
              palabra={palabra}
              onValidityChange={(isValid) =>
                handleAnagramaValidity(index, isValid)
              }
            />
          ))}
        </div>
        {!areAllInputsCorrect ? (
          <button
            className="btnContinuar btnContinuarBlock btnAntropologo"
            disabled
            
          >
            Continuar
          </button>
        ) : (
          <Link to={`/juego/`} className="btnContinuar btnAntropologo" onClick={handleClick}>
            Continuar
          </Link>
        )}
      </div>
    </>
  );
}

function Anagrama(props) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false); // Estado para controlar si se muestra el mensaje de error

  const luckimg = props.isLock;

  function resolverAnagrama(anagrama) {
    let aux;

    if (anagrama === "tuariles") {
      aux = "rituales";
    } else if (anagrama === "tear") {
      aux = "arte";
    } else if (anagrama === "alfarosre") {
      aux = "alfareros";
    } else if (anagrama === "potiem") {
      aux = "tiempo";
    } else if (anagrama === "braso") {
      aux = "braso";
    } else if (anagrama === "loshi") {
      aux = "hilos";
    } else if (anagrama === "toriahis") {
      aux = "historia";
    } else if (anagrama === "tefuen") {
      aux = "fuente";
    } else if (anagrama === "naur") {
      aux = "urna";
    } else if (anagrama === "incianfa") {
      aux = "infancia";
    } else if (anagrama === "zacru") {
      aux = "cruza";
    } else if (anagrama === "dosniso") {
      aux = "sonidos";
    } else if (anagrama === "zaspie") {
      aux = "piezas";
    } else if (anagrama === "toriahis") {
      aux = "historia";
    } else if (anagrama === "batosil") {
      aux = "silbato";
    } else if (anagrama === "turascul") {
      aux = "culturas";
    } else if (anagrama === "masfor") {
      aux = "formas";
    } else if (anagrama === "blospue") {
      aux = "pueblos";
    } else if (anagrama === "gadole") {
      aux = "legado";
    } else {
      aux = "Anagrama no reconocido";
    }

    return aux;
  }

  const isInputCorrect = inputValue === resolverAnagrama(props.palabra);

  useEffect(() => {
    props.onValidityChange(isInputCorrect); // Notify the parent component about the validity
  }, [isInputCorrect]);

    const handleChange = (event) => {
        setInputValue(event.target.value);
        const userInput = event.target.value;
        const validChars = resolverAnagrama(props.palabra);
        const tamaño = validChars.length === userInput.length;

        // Verificar si userInput contiene caracteres no válidos
        if (userInput.split('').every(char => validChars.includes(char))) {
            setInputValue(userInput);
            setError(false); // No hay error, así que establecemos el estado de error en falso
            if (tamaño && validChars === userInput) {
                event.target.classList.add('input-success');
                // Remover la clase después de un tiempo para que el efecto se repita
                setTimeout(() => {
                    event.target.classList.remove('input-success');
                }, 2000); // 2 segundos

            } else if (tamaño) {
                event.target.classList.add('error-animation');
                setTimeout(() => {
                    event.target.classList.remove('error-animation');
                    event.target.value = "";
                }, 600); // 0.5 segundos

            }
        } else {
            setError(true); // Hay caracteres no válidos, establecemos el estado de error en verdadero
            // Agregar clase para la animación de error

        }
    };





    return (
        <div className="contenedorAcronimo">
            <div>
                {!luckimg ? (
                    <h4 className={error ? 'textoAcronimo rojo' : 'textoAcronimo verde'}>
                        {props.palabra}
                    </h4>
                ) : (
                    <img src={bloqueoIMG} alt="Imagen" />
                )}
            </div>
            <input className="input_acronimo" value={inputValue} onChange={handleChange} />
            {error && <p className="mensajeError">Ingresa solo los caracteres del anagrama.</p>}
        </div>
    );
}

export { Bloqueo };
