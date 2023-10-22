import React, { useEffect, useState } from 'react';
import './Cronometro.css';
import cronometro from './Reloj/Reloj15.png';
import { useMyContext } from '../SeleccionCargando/MyContext';
import Modal from 'react-modal';
import StarRatings from 'react-star-ratings';

function Cronometro() {
    const { setTiempoInicial } = useMyContext();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

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
            setModalIsOpen(true);
        }, 200);
    }, [setTiempoInicial]);
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = () => {
        // Aquí puedes enviar la calificación (rating) y el comentario (comment) al servidor o realizar otras acciones necesarias.
        // Luego, cierra el modal.
        setModalIsOpen(false);
    };
    return (
        <>
            <img className="animacionCronometro" src={cronometro} alt="Cronometro" />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Calificación y Comentario Modal"
            >
                <h2>Califica esta página</h2>
                <StarRatings
                    rating={rating}
                    starRatedColor="gold"
                    changeRating={handleRatingChange}
                    numberOfStars={5}
                    starDimension="30px"
                    name="rating"
                />
                <textarea
                    placeholder="Escribe tu comentario..."
                    value={comment}
                    onChange={handleCommentChange}
                />
                <button onClick={handleSubmit}>Enviar</button>
            </Modal>
        </>
    );

}

export { Cronometro };