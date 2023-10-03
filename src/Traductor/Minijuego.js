import React, { useEffect, useState } from 'react';
import Board from './Board/Board.js';
import { Link } from 'react-router-dom';
import { Header } from '../Header';

import simbolo1 from './simbolos/simbolo1.png';
import simbolo2 from './simbolos/simbolo2.png';
import simbolo3 from './simbolos/simbolo3.png';
import simbolo4 from './simbolos/simbolo4.png';
import simbolo5 from './simbolos/simbolo5.png';
import simbolo6 from './simbolos/simbolo6.png';
import simbolo7 from './simbolos/simbolo7.png';
import simbolo8 from './simbolos/simbolo8.png';
import simbolo9 from './simbolos/simbolo9.png';
import simbolo10 from './simbolos/simbolo10.png';
import simbolo11 from './simbolos/simbolo11.png';
import simbolo12 from './simbolos/simbolo12.png';
import simbolo13 from './simbolos/simbolo13.png';
import simbolo14 from './simbolos/simbolo14.png';
import simbolo15 from './simbolos/simbolo15.png';
import simbolo16 from './simbolos/simbolo16.png';

import off from './switch/off.png';
import { simbolos } from '../rolesdata.js';

import { Contexto } from '../Contexto';
import { Acumulador } from './Acumulador';

// Agrega más imágenes según la cantidad de elementos en tu array original



const Minijuego = (props) => {
    const [shuffledMemoBlocks, setShuffledMemoBlocks] = React.useState([]);
    const [selectedMemoBlock, setselectedMemoBlock] = React.useState(null);
    const [animating, setAnimating] = React.useState(false);

    const historia = props.historia;
    const [imageList, setImageList] = useState([simbolo1, simbolo2, simbolo3, simbolo4, simbolo5, simbolo6, simbolo7, simbolo8, /* Agrega más imágenes */]);



    const [encontrados, setEncontrados] =
        useState([true, true, false, true]);


    useEffect(() => {
        buscarUbicaciones(1);
    }, [props.historia]);

    function buscarUbicaciones(historia) {
        let imageList;

        if (historia === 1) {
            imageList = [simbolo1, simbolo2, simbolo3, simbolo4, simbolo5, simbolo6, simbolo7, simbolo8, /* Agrega más imágenes */];
        } else if (historia === 2) {
            imageList = [simbolo1, simbolo4, simbolo3, simbolo5, simbolo8, simbolo16, simbolo14, simbolo10];
        } else if (historia === 3) {
            imageList = [3, 5, 2, 4];
        } else if (historia === 4) {
            imageList = [4, 1, 2, 3];
        }
        // } else if (historia === 5) {
        //     imageList = [3, 4, 1, 5];
        // }

        setImageList(imageList);
    }





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
            console.log(`¡Las parejas coinciden! Son: ${JSON.stringify(selectedMemoBlock)} y ${JSON.stringify(memoBlock)}`);

            const positionInImageList = imageList.indexOf(selectedMemoBlock.image);

            console.log(positionInImageList);

            // Check if the image is in the first position and the corresponding position in encontrados is true
            if (positionInImageList === 0 && encontrados[positionInImageList]) {
                setselectedMemoBlock(null);
            } else if (!imageList.slice(0, 4).includes(selectedMemoBlock.image) || !encontrados[positionInImageList]) {
                setAnimating(true);
                setTimeout(() => {
                    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
                    shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
                    setShuffledMemoBlocks(shuffledMemoBlocksCopy);
                    setselectedMemoBlock(null);
                    setAnimating(false);
                }, 1000);
            } else {
                setselectedMemoBlock(null);
            }
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
            <div className="fondoAmarillo">
                <div className='contentMinijuego'>
                    <Link to="/juego/interprete/traduccion">
                        <img src={off} alt="logo de Guia"></img>
                    </Link>
                    <Board memoBlocks={shuffledMemoBlocks} animating={animating} handleMemoClick={handleMemoClick} />

                </div>
            </div>
            <Acumulador historia={props.historia} />
        </>

    );
}

export { Minijuego };
