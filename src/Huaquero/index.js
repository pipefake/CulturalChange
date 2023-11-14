import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Huaquero.css";
import simbolo1 from "../Traductor/simbolos/simbolo1.png";
import simbolo2 from "../Traductor/simbolos/simbolo2.png";
import simbolo3 from "../Traductor/simbolos/simbolo3.png";
import simbolo4 from "../Traductor/simbolos/simbolo4.png";
import simbolo5 from "../Traductor/simbolos/simbolo5.png";
import simbolo6 from "../Traductor/simbolos/simbolo6.png";
import simbolo7 from "../Traductor/simbolos/simbolo7.png";
import simbolo8 from "../Traductor/simbolos/simbolo8.png";
import simbolo9 from "../Traductor/simbolos/simbolo9.png";
import simbolo10 from "../Traductor/simbolos/simbolo10.png";
import simbolo11 from "../Traductor/simbolos/simbolo11.png";
import simbolo12 from "../Traductor/simbolos/simbolo12.png";
import simbolo13 from "../Traductor/simbolos/simbolo13.png";
import simbolo14 from "../Traductor/simbolos/simbolo14.png";
import simbolo15 from "../Traductor/simbolos/simbolo15.png";
import simbolo16 from "../Traductor/simbolos/simbolo16.png";
import simbolo17 from "../Traductor/simbolos/simbolo17.png";
import simbolo18 from "../Traductor/simbolos/simbolo18.png";
import simbolo19 from "../Traductor/simbolos/simbolo19.png";
import simbolo20 from "../Traductor/simbolos/simbolo20.png";
import { Header } from "../Header";
import { useNavigate } from "react-router-dom";

function Huaquero(props) {
    const navigate = useNavigate();

    const [buttonStates, setButtonStates] = useState(Array(20).fill(false));
    const [symbols, setSymbols] = useState([]);
    const [roomCode, setRoomCode] = useState(""); // State to store the room code
    const [activeRoomCode, setActiveRoomCode] = useState("");

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
            const response = await axios.get("https://testdeploy-production-9d97.up.railway.app/roomCode");
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
            const response = await axios.get("https://testdeploy-production-9d97.up.railway.app/users");
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
        const sendSymbols = async () => {
            try {
                await addSymbol("Symbol1");
                await addSymbol("Symbol2");
                await addSymbol("Symbol3");
                await addSymbol("Symbol4");
                await addSymbol("simbolo1");
                await addSymbol("simbolo2");
                await addSymbol("simbolo3");
                await addSymbol("simbolo4");

                // After sending all symbols, fetch the room code and symbols
                fetchRoomCode();
                fetchSymbols();
            } catch (error) {
                console.error('Error sending symbols:', error);
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
            const response = await axios.patch('https://testdeploy-production-9d97.up.railway.app/roomCode', { symbolName, found: true });
            console.log(`Symbol ${symbolName} updated successfully`);
        } catch (error) {
            console.error(`Error updating symbol ${symbolName}:`, error);
        }
    };


    const handleClick = (event) => {
        // Verificar si userInput contiene caracteres no válidos
        event.target.classList.add('error-animatin');
        setTimeout(() => {
            event.target.classList.remove('error-animatin');
            // event.target.value = ""; // No es necesario para un botón
        }, 600); // 0.5 segundos
    };


    return (
        <div>
            <Header></Header>
            <p className="parrafoInferior margen">
                Toca los símbolos, tendrás que tener cuidado; si los símbolos no coinciden con la historia perderás x cantidad de tiempo.
            </p>
            <div className="fondoAmarillo">
                <div className="image-container">
                    <button key={8} className="image-button" onClick={handleClick}>
                        <img src={getSymbolImage(9)} alt={`Simbolo ${9}`} />
                    </button>
                    <button key={14} className="image-button" onClick={handleClick}>
                        <img src={getSymbolImage(15)} alt={`Simbolo ${15}`} />
                    </button>
                    <button key={11} className="image-button" onClick={handleClick}>
                        <img src={getSymbolImage(12)} alt={`Simbolo ${12}`} />
                    </button>
                    <button key={2} className="image-button" onClick={() => updateSymbol("Symbol1")}>
                        <img src={getSymbolImage(3)} alt={`Simbolo ${3}`} />
                    </button>
                    <button key={10} className="image-button" onClick={handleClick}>
                        <img src={getSymbolImage(11)} alt={`Simbolo ${11}`} />
                    </button>
                    <button key={5} className="image-button" onClick={handleClick}>
                        <img src={getSymbolImage(6)} alt={`Simbolo ${6}`} />
                    </button>
                    <button key={19} className="image-button" onClick={handleClick}>
                        <img src={getSymbolImage(20)} alt={`Simbolo ${20}`} />
                    </button>
                    <button key={4} className="image-button" onClick={handleClick} >
                        <img src={getSymbolImage(5)} alt={`Simbolo ${5}`} />
                    </button>
                    <button key={0} className="image-button" onClick={() => updateSymbol("Symbol2")}>
                        <img src={getSymbolImage(1)} alt={`Simbolo ${1}`} />
                    </button>

                    <button key={13} className="image-button" onClick={handleClick}>
                        <img src={getSymbolImage(14)} alt={`Simbolo ${14}`} />
                    </button>
                    <button key={3} className="image-button" onClick={() => updateSymbol("Symbol3")}>
                        <img src={getSymbolImage(4)} alt={`Simbolo ${4}`} />
                    </button>
                    <button key={18} className="image-button" onClick={handleClick}>
                        <img src={getSymbolImage(19)} alt={`Simbolo ${19}`} />
                    </button>
                    <button key={6} className="image-button" onClick={handleClick}>
                        <img src={getSymbolImage(7)} alt={`Simbolo ${7}`} />
                    </button>
                    <button key={15} className="image-button" onClick={handleClick}>
                        <img src={getSymbolImage(16)} alt={`Simbolo ${16}`} />
                    </button>
                    <button key={1} className="image-button" onClick={() => updateSymbol("Symbol4")}>
                        <img src={getSymbolImage(2)} alt={`Simbolo ${2}`} />
                    </button>
                    <button key={17} className="image-button" onClick={handleClick}>
                        <img src={getSymbolImage(18)} alt={`Simbolo ${18}`} />
                    </button>
                    <button key={7} className="image-button" onClick={handleClick}>
                        <img src={getSymbolImage(8)} alt={`Simbolo ${8}`} />
                    </button>
                    <button key={16} className="image-button" onClick={handleClick}>
                        <img src={getSymbolImage(17)} alt={`Simbolo ${17}`} />
                    </button>
                    <button key={9} className="image-button" onClick={handleClick}>
                        <img src={getSymbolImage(10)} alt={`Simbolo ${10}`} />
                    </button>
                    <button key={12} className="image-button" onClick={handleClick}>
                        <img src={getSymbolImage(13)} alt={`Simbolo ${13}`} />
                    </button>
                </div>

            </div>
        </div>
    );
}

const getSymbolImage = (symbolNumber) => {
    switch (symbolNumber) {
        case 1:
            return simbolo1;
        case 2:
            return simbolo2;
        case 3:
            return simbolo3;
        case 4:
            return simbolo4;
        case 5:
            return simbolo5;
        case 6:
            return simbolo6;
        case 7:
            return simbolo7;
        case 8:
            return simbolo8;
        case 9:
            return simbolo9;
        case 10:
            return simbolo10;
        case 11:
            return simbolo11;
        case 12:
            return simbolo12;
        case 13:
            return simbolo13;
        case 14:
            return simbolo14;
        case 15:
            return simbolo15;
        case 16:
            return simbolo16;
        case 17:
            return simbolo17;
        case 18:
            return simbolo18;
        case 19:
            return simbolo19;
        case 20:
            return simbolo20;
        default:
            return null;
    }
};

export { Huaquero };
