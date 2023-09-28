import React, { useEffect } from 'react';
import Board from './Board/Board.js';
import { Link } from 'react-router-dom';
import { Header } from '../Header';

import simbolo1 from './simbolos/simbolo1.jpg';
import simbolo2 from './simbolos/simbolo2.jpg';
import simbolo3 from './simbolos/simbolo3.jpg';
import simbolo4 from './simbolos/simbolo4.jpg';
import simbolo5 from './simbolos/simbolo5.jpg';
import simbolo6 from './simbolos/simbolo6.jpg';
import simbolo7 from './simbolos/simbolo7.jpg';
import simbolo8 from './simbolos/simbolo8.jpg';
import off from './switch/off.png';
import { simbolos } from '../rolesdata.js';

import { Contexto } from '../Contexto';
import { Acumulador } from './Acumulador';

// Agrega más imágenes según la cantidad de elementos en tu array original

const imageList = [simbolo1, simbolo2, simbolo3, simbolo4, simbolo5, simbolo6, simbolo7, simbolo8, /* Agrega más imágenes */];

const Minijuego = () => {
    const [shuffledMemoBlocks, setShuffledMemoBlocks] = React.useState([]);
    const [selectedMemoBlock, setselectedMemoBlock] = React.useState(null);
    const [animating, setAnimating] = React.useState(false);


    useEffect(() => {
        const shuffledImageList = shuffleArray([...imageList, ...imageList]);
        setShuffledMemoBlocks(
            shuffledImageList.map((image, i) => ({ codigo: 1000 + i, index: i, image, flipped: false }))
        );
    }, []);
    const shuffleArray = a => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    const handleMemoClick = memoBlock => {
        const flippedMemoBlock = { ...memoBlock, flipped: true };
        let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);
        if (selectedMemoBlock === null) {
            setselectedMemoBlock(memoBlock);
        } else if (selectedMemoBlock.image === memoBlock.image) {
            // Cuando las parejas coinciden
            console.log(`¡Las parejas coinciden! Son: ${JSON.stringify(selectedMemoBlock)} y ${JSON.stringify(memoBlock)}`);

            const simbolo1Encontrado = simbolos.find(simbolo => simbolo.image === memoBlock.image);

            if (simbolo1Encontrado) {
                simbolo1Encontrado.interpretado = true;
            }

            setselectedMemoBlock(null);
        } else {
            setAnimating(true);
            setTimeout(() => {
                shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
                shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
                setShuffledMemoBlocks(shuffledMemoBlocksCopy);
                setselectedMemoBlock(null);
                setAnimating(false);
            }, 1000);
        }
    }


    return (
        <>
            <Header></Header>
            <Contexto titulo="Descubre los símbolos" parrafo="Ten cuidado, si descubres símbolos diferentes a los que el Huaquero te mostró, perderás los que has descubierto
"></Contexto>
            <div className='contentMinijuego'>
                <Link to="/juego/interprete/traduccion">
                    <img src={off} alt="logo de Guia"></img>
                </Link>
                <Board memoBlocks={shuffledMemoBlocks} animating={animating} handleMemoClick={handleMemoClick} />

            </div>
            <Acumulador />
        </>

    );
}

export { Minijuego };
