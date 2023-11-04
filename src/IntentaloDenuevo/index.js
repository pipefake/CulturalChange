import React, { useState, useEffect } from 'react';
import './intentaloDenuevo.css';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import superder from "../FraseMuseo/resource/supder.png";
import infeizq from "../FraseMuseo/resource/infeizq.png";
import cronometro from '../Header/Reloj/Reloj15.png';

function IntentaloDenuevo({ historia }) {


    return (
        <div className='contIntentalo'>
            <div className="containersuperder">
                <img className="image" src={superder} alt="Super" />
            </div>
            <div className="containerinfeizq">
                <img className="image" src={infeizq} alt="Super" />
            </div>
            <div className='divIntentalo'>
                <h1>Inténtalo de nuevo</h1>
                <button className='btnContinuar btnSize'>Continuar</button>
            </div>
        </div>
    );
}

export { IntentaloDenuevo };
