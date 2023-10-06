import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { blogdata } from '../blogdata';
import logoGuia from '../Picker/logos/logoGuia.png';
import logoInterprete from '../Picker/logos/logoInterprete.png';
import logoHuaquero from '../Picker/logos/logoHuaquero.png';
import logoAntropologo from '../Picker/logos/logoAntropologo.png';
import './Introduccion.css';
import { BtnContinuar } from '../BtnContinuar';
import back from '../Header/resources/Back-Button.png';

function Introduccion() {
    const { slug } = useParams();
    const blogpost = blogdata.find(post => post.slug === slug);
    const rol = blogpost.rol;
    console.log(rol);
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        _id: "",
        name: "",
        identification: "",
        email: "",
        rol: "",
        finalizadaTarea: "false",
        tipoUsuario: "",
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserData(); // asssuming this function fetches user data
                if (data) {
                    setUserData(data);
                    console.log('User data set:', data);
                } else {
                    console.error('No user data received');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchData(); // invoke the function to fetch and set user data
    }, []); // empty dependency array to run only once after component mount

    const userId = localStorage.getItem("userId"); // ID from local storage

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

    const updateRol = async (newRol) => {

        console.log(userData._id);
        console.log('UserData before axios call:', userData);

        if (userData) {
            try {
                const response = await axios.patch(
                    "http://localhost:3500/users",
                    {
                        _id: userId,
                        name: userData.name,
                        identification: userData.identification,
                        email: userData.email,
                        rol: newRol,
                        finalizadaTarea: true,
                        tipoUsuario: userData.tipoUsuario
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
    // Función para obtener la etiqueta src de la imagen
    const getImgSrc = (img) => {
        switch (img) {
            case 'logoGuia':
                return logoGuia; // Ruta a la imagen '../Picker/logos/logoGuia.png'
            case 'logoInterprete':
                return logoInterprete; // Ruta a la imagen '../Picker/logos/logoInterprete.png'
            case 'logoHuaquero':
                return logoHuaquero; // Ruta a la imagen '../Picker/logos/logoHuaquero.png'
            case 'logoAntropologo':
                return logoAntropologo; // Ruta a la imagen '../Picker/logos/logoAntropologo.png'
            default:
                return img; // Devuelve el valor original si no coincide con los casos anteriores
        }
    };

    // Función para obtener el className de la animación
    const getAnimacionClassName = (rol) => {
        switch (rol) {
            case 'Guia':
                return 'animacionmapa';
            case 'Intérprete':
                return 'animacionInterprete';
            case 'Huaquero':
                return 'animacionHuaquero';
            case 'Antropologo':
                return 'animacionAntropologo';
            default:
                return 'animacionmapa'; // Por defecto, si no coincide con los casos anteriores, aplicamos 'animacionmapa'
        }
    };

    const handleSubmit = (e) => {
        navigate("/seleccionCargando");
    }


    return (
        <>
            <Link to="/introduccion">
                <img className="img_header" src={back} alt="botón para retroceder" />
            </Link>
            <div className="contenedor_info_rol">
                <div className="div_logo_rol">
                    <img src={getImgSrc(blogpost.img)} alt={rol} />
                    <h3>{rol}</h3>
                </div>
                <p>{blogpost.texto}</p>
                <div className={getAnimacionClassName(rol)}>

                </div>

                <Link to="/seleccionCargando">
                    <button className="btnContinuar"
                        onClick={() => updateRol(rol)}
                    >Seleccionar</button>
                </Link>


            </div>
        </>
    );
}

export { Introduccion };
