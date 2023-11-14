import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import "./ganan.css";
import museolili from "../InputCodigo/resources/museolili.png";
import { Link, useNavigate } from "react-router-dom";

function FeedbackPositivo() {

    const navigate = useNavigate();
    
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [ganan, setGanan] = useState(true);


    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = () => {
        navigate("/");
    };

    return (
        <div className='contenedorGanan'>
            {ganan ? (
                <div className='contenedorExito'>
                    <h1>¡Felicitaciones la misión ha sido completada con éxito!</h1>
                    <p>¡Viajeros!, han encontrado la historia de los pueblos amerindios. ¡Los han salvado del olvido!</p>
                </div>
            ) : (
                <div className='contenedorExito'>
                    <h1>La misión no ha sido completada con éxito</h1>
                    <p>Espera n minutos para participar nuevamente</p>
                </div>
            )}
            <form className='formularioFeedback'>
                <h2>Califica tu experiencia</h2>
                <StarRatings
                    className="estrellas"
                    rating={rating}
                    starRatedColor="gold"
                    changeRating={handleRatingChange}
                    numberOfStars={5}
                    starDimension="30px"
                    name="rating"
                />
                <h2>Deja un comentario:</h2>
                <textarea
                    placeholder="Escribe tu comentario..."
                    value={comment}
                    onChange={handleCommentChange}
                />
                <button className='buttonEnviarForm' onClick={handleSubmit}>Enviar</button>
            </form>
            <img className='logoImg' src={museolili} alt="Logo del museo lili" />
        </div>

    );
}

export { FeedbackPositivo };
