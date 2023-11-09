import React, { useState, useEffect } from 'react';
import './RevisarCelular.css';
import celular from "./resource/Celular.png";
import superder from "../FraseMuseo/resource/supder.png";
import infeizq from "../FraseMuseo/resource/infeizq.png";
import { Link, useParams, useNavigate } from 'react-router-dom';

function RevisarCelular() {


    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            handleSubmit();
        }, 15000); // 15,000 milisegundos = 15 segundos

        return () => {
            clearTimeout(timer); // Limpia el temporizador si el componente se desmonta antes de que se cumplan los 15 segundos
        };
    }, []);

    const handleSubmit = (e) => {
        navigate("/fraseMuseo");
    }

    return (
        <div className='cont-infocel'>
            <div class="containersuperder">
                <img class="image" src={superder} alt="Super" />
            </div>
            <div class="containerinfeizq">
                <img class="image" src={infeizq} alt="Super" />
            </div>

            <div className='informacionCelular'>
                <h1>¡Viajeros!</h1>
                <p>Revisen sus celulares para continuar con la experiencia.</p>
                <img class="image" src={celular} alt="Super" />
            </div>
        </div>

    );
}

export { RevisarCelular };
