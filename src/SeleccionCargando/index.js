import React, { useState, useEffect } from "react";
import { blogdata } from '../blogdata';
import museolili from '../InputCodigo/resources/museolili.png';
import './seleccionCargando.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import cargando from './cargando.png';
import { useMyContext } from './MyContext';

import logoGuia from './logos/logoGuia.png';
import logoHuaquero from './logos/logoHuaquero.png';
import LogoInterprete from './logos/logoInterprete.png';
import logoAntropologo from './logos/logoAntropologo.png';
import logoGuiaBN from './logos/logoGuiaBN.png';
import logoHuaqueroBN from './logos/logoHuaqueroBN.png';
import LogoInterpreteBN from './logos/logoInterpreteBN.png';
import logoAntropologoBN from './logos/logoAntropologoBN.png';
import ready from './listo.png';

function SeleccionCargando() {
    const selectedRoleData = localStorage.getItem("roldirecto");

    const rol = selectedRoleData;
    console.log(rol);
    const navigate = useNavigate();


    // Define el estado para cada logo y nombre.
    const [guia, setGuia] = useState(false);
    const [huaquero, setHuaquero] = useState(false);
    const [interprete, setInterprete] = useState(false);
    const [antropologo, setAntropologo] = useState(false);

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
                            break;
                        case "Huaquero":
                            setHuaquero(true);
                            break;
                        case "Intérprete":
                            setInterprete(true);
                            break;
                        case "Antropólogo":
                            setAntropologo(true);
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

    const redirectGame = (e) => {
        navigate(enlace);
        console.log(rol);
    }

    const enlace = (`/juego/${rol}`);



    const estadosVerdaderos = [guia, huaquero, interprete, antropologo].filter((estado) => estado).length;


    const [esLoanding, setEsLoading] = useState(true);

    const verificarEstados = () => {
        if (guia && huaquero && interprete && antropologo) {
            setEsLoading(false);
            redirectGame();
        } else {
            setEsLoading(true);

        }
    };

    useEffect(() => {
        verificarEstados();
    }, [guia, huaquero, interprete, antropologo]);

    return (
        <>

            <div className="divPicker">


                <h1 className="centrarTitulo">Esperando viajeros</h1>
                {esLoanding ? (
                    <img className="rotating-image animacioncarga" src={cargando} alt="Logo de enviando" />
                ) : (
                    <img className="listo_img" src={ready} alt="Logo de enviado" />
                )}


                <div className="cont_logos">
                    {guia ? (
                        <img className="logosSeleccion" src={logoGuia} />
                    ) : (
                        <img className="logosSeleccion" src={logoGuiaBN} />
                    )}
                    {huaquero ? (
                        <img className="logosSeleccion" src={logoHuaquero} />
                    ) : (
                        <img className="logosSeleccion" src={logoHuaqueroBN} />
                    )}
                    {interprete ? (
                        <img className="logosSeleccion" src={LogoInterprete} />
                    ) : (
                        <img className="logosSeleccion" src={LogoInterpreteBN} />
                    )}
                    {antropologo ? (
                        <img className="logosSeleccion" src={logoAntropologo} />
                    ) : (
                        <img className="logosSeleccion" src={logoAntropologoBN} />
                    )}
                </div>
                <p>{estadosVerdaderos}/4</p>

                <img className="imglogo" src={museolili} alt="Logo del museo lili" />
            </div>
        </>
    );
}

export { SeleccionCargando };
