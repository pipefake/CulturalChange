import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./inputCodigo.css";
import Modal from "react-modal";
import museolili from "./resources/museolili.png";
import { ModalHelp } from "../Modal";
import axios from "axios";
import { EnviandoCarga } from "../EnviandoCarga";
import { ErrorCarga } from "../ErrorCarga";
import { SentInformacion } from "../SentInformacion";

function InputCodigo() {
    const [inputValue, setInputValue] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [formComplete, setFormComplete] = useState(false); // Nuevo estado
    const [errors, setErrors] = useState({});

    const [userData, setUserData] = useState({
        cname,
        identification,
        email,
        rol,
        finalizadaTarea,
        tipoUsuario
    });

    const [errorName, setErrorName] = useState({});
    const [errorEmail, setErrorEmail] = useState({});
    const [errorIdentification, setErrorIdentification] = useState({});

    const navigate = useNavigate();

    const handleModalInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const inputValue = type === "checkbox" ? checked : value;
        if (name === "student" && checked) {
            setUserData({ ...userData, student: true, visitor: false });
        } else if (name === "visitor" && checked) {
            setUserData({ ...userData, visitor: true, student: false });
        } else {
            setUserData({ ...userData, [name]: inputValue });
        }
        updateFormComplete();
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users');
            // Filter users based on the same room code
            const filteredUsers = response.data.filter(user => user.codigoSala === roomCode);
            setUsers(filteredUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    fetchUsers();
};

const updateUserTipoUsuario = async () => {
    try {
        await axios.patch(`/users`, { tipoUsuario: "Quemado" });
        console.log('User updated successfully');
    } catch (error) {
        console.error('Error updating user:', error);
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("Conditions met. Attempting to send data...");
        const response = await axios.post(
            "http://localhost:3500/users",
            userData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("User registered:", response.data);
    } catch (error) {
        console.error('Error registering user:', error.response.data);
    }
};

const handleEnviarClick = async () => {
    console.log("handleEnviarClick called");
    //Consola para verificar que tiene los estados, recordar meter userData como parametro en esta funcion
    //console.log("AQUI MIRAME" + userData.name + userData.identification + userData.email + userData.rol + userData.finalizadaTarea + userData.tipoUsuario + userData.codigoSala)
};

return (
    <>
        {/* Peticiones Get a la base de datos, esta peticion se asocia a la ruta "/user"*/}


        {/* Primero tenemos un botón que realiza una peticion get, traerá toda la información de la base de datos
            por tal motivo se debe implementar unfiltro, para este caso, utilizaremos el código de la sala. Traeremos un json con todos los usuarios de una sala*/}

        <div>
            <button
                onClick={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                }}
            ></button>
        </div>


        {/* Ahora haremos un get a un usuario en específico, para ello es necesario saber el id del usuario*/}
        <div>
            <button
                onClick={ }
            ></button>
        </div>

        {/* Peticiones patch a la base de datos ahora que sabemos como llamar a un usuario en específico, utilizaremos el _id, variable que asigna mongo para identificar cada uno de los usuarios en al DB.
            podriamos hacer un get y almacenar la información en estados y utilizar los estados*/}
        <div>

            <input>
            </input>
        </div>
    </>
);
}

export { InputCodigo };
