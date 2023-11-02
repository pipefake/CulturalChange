import React, { useState, useEffect } from 'react';
import './fraseMuseo.css';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import superder from "./resource/supder.png";
import infeizq from "./resource/infeizq.png";
import cronometro from '../Header/Reloj/Reloj15.png';

const ItemTypes = {
    WORD: 'word',
};

function DraggableWord({ word, onDrop, isDraggable, sentence }) {
    const isWordInSentence = sentence.includes(word);

    const [{ isDragging }, ref] = useDrag({
        type: ItemTypes.WORD,
        item: { word, isDraggable },
        canDrag: isDraggable || !isWordInSentence, // Allow drag if not in sentence
    });

    const opacity = isDragging ? 0.5 : 1;

    return (
        <div
            ref={ref}
            className={`draggable-word ${isDraggable || !isWordInSentence ? '' : 'dragged'}`}
            style={{ opacity }}
        >
            {word}
        </div>
    );
}

function DropSpace({ onDrop, index, completed }) {
    const [{ canDrop, isOver }, ref] = useDrop({
        accept: ItemTypes.WORD,
        drop: (item) => onDrop(item.word, index),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    const isActive = canDrop && isOver;

    return (
        <div
            ref={ref}
            className={`drop-space ${isActive ? 'active' : completed ? 'completed' : ''}`}
        >

        </div>
    );
}

function FraseMuseo() {
    const [sentence, setSentence] = useState([null, null, null, null]);
    const [completed, setCompleted] = useState(false);
    const [antropologo, setAntropologo] = useState(true);
    const [availableWords, setAvailableWords] = useState(['Volantes', 'Huso', 'Volcán', 'Forma']);
    const [wordDraggedToDropSpace, setWordDraggedToDropSpace] = useState([false, false, false, false]);

    const handleDropWord = (word, index) => {
        const newSentence = [...sentence];
        newSentence[index] = word;
        setSentence(newSentence);

        const updatedWordDraggedToDropSpace = [...wordDraggedToDropSpace];
        updatedWordDraggedToDropSpace[index] = true;
        setWordDraggedToDropSpace(updatedWordDraggedToDropSpace);

        // Eliminar la palabra del arreglo de palabras disponibles
        const updatedAvailableWords = availableWords.filter((w) => w !== word);
        setAvailableWords(updatedAvailableWords);
    };

    useEffect(() => {
        const expectedSentence = ['Volantes', 'Huso', 'Forma', 'Volcán'];
        if (JSON.stringify(sentence) === JSON.stringify(expectedSentence)) {
            setCompleted(true);
        } else {
            setCompleted(false);
        }
    }, [sentence]);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            }
        }, 1000); // Update the timer every second

        return () => {
            clearInterval(timer); // Clean up the timer when the component unmounts
        };
    }, [timeLeft]);

    // Function to format the time in minutes and seconds
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = seconds % 60;
        return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
    };


    return (
        <DndProvider backend={HTML5Backend}>
            {antropologo ? (
                <div className="complete-the-sentence">
                    <div class="containersuperder">
                        <img class="image" src={superder} alt="Super" />
                    </div>
                    <div class="containerinfeizq">
                        <img class="image" src={infeizq} alt="Super" />
                    </div>

                    <h1 className={`tituloFraseMuseo ${completed ? 'green-title' : ''}`}>Completa la frase</h1>
                    <div className="sentence">
                        <p className="txtFrase">Los </p>
                        {sentence[0] ? (
                            <span className="txtPalabra" key={0}>
                                {sentence[0]}
                            </span>
                        ) : (
                            <DropSpace
                                key={0}
                                onDrop={handleDropWord}
                                index={0}
                                completed={completed}
                            />
                        )}
                        <p className="txtFrase">de</p>
                        {sentence[1] ? (
                            <span className="txtPalabra" key={1}>
                                {sentence[1]}
                            </span>
                        ) : (
                            <DropSpace
                                key={1}
                                onDrop={handleDropWord}
                                index={1}
                                completed={completed}
                            />
                        )}
                        <p className="txtFrase">tienen</p>
                        {sentence[2] ? (
                            <span className="txtPalabra" key={2}>
                                {sentence[2]}
                            </span>
                        ) : (
                            <DropSpace
                                key={2}
                                onDrop={handleDropWord}
                                index={2}
                                completed={completed}
                            />
                        )}
                        <p className="txtFrase">de</p>
                        {sentence[3] ? (
                            <span className="txtPalabra" key={3}>
                                {sentence[3]}
                            </span>
                        ) : (
                            <DropSpace
                                key={3}
                                onDrop={handleDropWord}
                                index={3}
                                completed={completed}
                            />
                        )}
                    </div>
                    <div className="words">
                        {availableWords.map((word) => (
                            <DraggableWord
                                key={word}
                                word={word}
                                onDrop={handleDropWord}
                                isDraggable={!sentence.includes(word)} // Check if word is in the sentence
                                sentence={sentence}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="tiempoGrupal">
                    <div className="containersuperder">
                        <img className="image" src={superder} alt="Super" />
                    </div>
                    <div className="containerinfeizq">
                        <img className="image" src={infeizq} alt="Super" />
                    </div>
                    <h1>Apresúrense, el tiempo corre...</h1>
                    <img className="animacionCronometro tamañoGrande" src={cronometro} alt="Cronometro" />
                    <div className='txtCronometro'>Tiempo {formatTime(timeLeft)}</div>
                </div>
            )}
        </DndProvider>

    );
}

export { FraseMuseo };
