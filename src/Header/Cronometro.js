import React, { useEffect, useState } from 'react';
import './Cronometro.css';
import cronometro from './Reloj/Reloj15.png';
import { useMyContext } from '../SeleccionCargando/MyContext';
import Modal from 'react-modal';
import StarRatings from 'react-star-ratings';
import { Link, useParams, useNavigate } from 'react-router-dom';

function Cronometro() {
    const { setTiempoInicial } = useMyContext();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [lostModalIsOpen, setLostModalIsOpen] = useState(false); // Agregamos un nuevo estado para el modal de "Perdiste"
    const navigate = useNavigate();
    useEffect(() => {
        // Obtén el tiempo actual en horas y minutos
        const now = new Date();
        const horas = now.getHours();
        const minutos = now.getMinutes();

        // Formatea el tiempo según tus necesidades
        const tiempoActual = `${horas}:${minutos}`;

        // Establece el tiempo en el contexto
        setTiempoInicial(tiempoActual);
        console.log(tiempoActual);
        setTimeout(() => {
            setLostModalIsOpen(true); // Abre el modal de "Perdiste" después de un tiempo
        }, 6000);
    }, [setTiempoInicial]);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = () => {
        // Aquí puedes enviar la calificación (rating) y el comentario (comment) al servidor o realizar otras acciones necesarias.
        // Luego, cierra el modal actual.

        navigate("/pierde");
    };

    return (
        <>
            <img className="animacionCronometro" src={cronometro} alt="Cronometro" />
            {/* Modal para "Perdiste" */}
            <Modal
                isOpen={lostModalIsOpen}
                onRequestClose={() => setLostModalIsOpen(false)}
                contentLabel="Perdiste Modal"
                className="modal-inicial"
            >
                <h2>Misión Fallida</h2>
                <p>El tiempo se terminó</p>
                <p>0:00</p>
                <button className='btnContinuar' onClick={handleSubmit}>Continuar</button>
            </Modal>
        </>
    );
}

export { Cronometro };
