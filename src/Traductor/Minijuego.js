import React, { useEffect, useState } from "react";

import axios from "axios";

import Board from "./Board/Board.js";
import { Link } from "react-router-dom";
import { Header } from "../Header";
import on from "./switch/on.png";
import { AxesHelper } from "three";
import simbolo1 from "./simbolos/simbolo1.png";
import simbolo2 from "./simbolos/simbolo2.png";
import simbolo3 from "./simbolos/simbolo3.png";
import simbolo4 from "./simbolos/simbolo4.png";
import simbolo5 from "./simbolos/simbolo5.png";
import simbolo6 from "./simbolos/simbolo6.png";
import simbolo7 from "./simbolos/simbolo7.png";
import simbolo8 from "./simbolos/simbolo8.png";
import simbolo9 from "./simbolos/simbolo9.png";
import simbolo10 from "./simbolos/simbolo10.png";
import simbolo11 from "./simbolos/simbolo11.png";
import simbolo12 from "./simbolos/simbolo12.png";
import simbolo13 from "./simbolos/simbolo13.png";
import simbolo14 from "./simbolos/simbolo14.png";
import simbolo15 from "./simbolos/simbolo15.png";
import simbolo16 from "./simbolos/simbolo16.png";

import tuariles from "./anagramas/tuariles.png";
import tear from "./anagramas/tear.png";
import alfarosre from "./anagramas/alfarosre.png";
import potiem from "./anagramas/potiem.png";
import turascul from "./anagramas/turascul.png";
import masfor from "./anagramas/masfor.png";
import blospue from "./anagramas/blospue.png";
import gadole from "./anagramas/gadole.png";
import braso from "./anagramas/braso.png";
import loshi from "./anagramas/loshi.png";
import toriahis from "./anagramas/toriahis.png";
import tefuen from "./anagramas/tefuen.png";
import naur from "./anagramas/naur.png";
import incianfa from "./anagramas/incianfan.png";
import zacru from "./anagramas/zacru.png";
import dosniso from "./anagramas/dosniso.png";
import zaspie from "./anagramas/zaspie.png";
import batosil from "./anagramas/batosil.png";

import useSound from 'use-sound';
import tap from './audios/sonidotab.mp3';
import pierdenSonido from './audios/sonidoincorrecto.mp3';
import gananSonido from './audios/sonido.exito.pares2.mp3';

import { useMyContext } from "../SeleccionCargando/MyContext";
import { Traductor } from "./index.js";

import off from "./switch/off.png";
import { simbolos } from "../rolesdata.js";

import { Contexto } from "../Contexto";
import { Acumulador } from "./Acumulador";
import { TablaPuntuacion } from "../TablaPuntuacion/index.js";

// Agrega más imágenes según la cantidad de elementos en tu array original

const Minijuego = (props) => {
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = React.useState([]);
  const [selectedMemoBlock, setselectedMemoBlock] = React.useState(null);
  const [animating, setAnimating] = React.useState(false);
  const [btnSlide, setBtnSlide] = React.useState(false);

  const [encontrados, setEncontrados] = useState([true, false, false, false]);

  const [symbols, setSymbols] = useState([]);

  const [imageList, setImageList] = useState([]); // Initialize imageList as an empty array

  const [esinterpretado1, setEsInterpretado1] = useState(false);
  const [esinterpretado2, setEsInterpretado2] = useState(false);
  const [esinterpretado3, setEsInterpretado3] = useState(false);
  const [esinterpretado4, setEsInterpretado4] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [modalClosed, setModalClosed] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [secondModalClosed, setSecondModalClosed] = useState(false);
  const [showThirdModal, setShowThirdModal] = useState(false);
  const [thirdModalClosed, setThirdModalClosed] = useState(false);


  useEffect(() => {
    if (modalClosed) {
      setShowModal(false);
    }
  }, [modalClosed]);

  function closeModal() {
    setModalClosed(true);
  }


  function closeSecondModal() {
    setSecondModalClosed(true);
  }

  useEffect(() => {
    if (secondModalClosed) {
      setSecondModalClosed(false);
    }
  }, [secondModalClosed]);

  function closeThirdModal() {
    setThirdModalClosed(true);
  }

  useEffect(() => {
    if (thirdModalClosed) {
      setThirdModalClosed(false);
    }
  }, [thirdModalClosed]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchSymbols();
      console.log(encontrados)
    }, 10000); // Check every 10 seconds

    return () => clearInterval(intervalId); // Clear the interval on unmount
  }, []);

  const fetchSymbols = async () => {
    try {
      const response = await axios.get("/roomCode"); // Replace with the correct API endpoint
      console.log("Full Response:", response.data); // Log entire response
      const symbols = response.data[0].huaqueroSymbols; // Assuming the symbols are stored in an array inside the response
      const newEncontrados = [false, false, false, false];
      symbols.forEach((symbol, index) => {
        if (symbol.found) {
          newEncontrados[index] = true;
        }
      });
      setEncontrados(newEncontrados);
    } catch (error) {
      console.error("Error fetching symbols:", error);
      return [];
    }
  };

  useEffect(() => {
    buscarUbicaciones(props.historia); // Update imageList based on props.historia
  }, [props.historia]);

  function buscarUbicaciones(aux) {
    let newImageList = [];

    if (aux === 1) {
      newImageList = [
        simbolo1,
        simbolo2,
        simbolo3,
        simbolo4,
        simbolo5,
        simbolo6,
        simbolo7,
        simbolo8 /* Add more images */,
      ];
    } else if (aux === 2) {
      newImageList = [
        simbolo13,
        simbolo14,
        simbolo15,
        simbolo16,
        simbolo8,
        simbolo1,
        simbolo2,
        simbolo9,
      ];
    } else if (aux === 3) {
      newImageList = [
        simbolo9,
        simbolo10,
        simbolo11,
        simbolo12,
        simbolo3,
        simbolo15,
        simbolo14,
        simbolo7,
      ];
    } else if (aux === 4) {
      newImageList = [
        simbolo5,
        simbolo6,
        simbolo7,
        simbolo8,
        simbolo3,
        simbolo14,
        simbolo12,
        simbolo2,
      ];
    }

    setImageList([...newImageList]);
  }

  useEffect(() => {
    const shuffledImageList = shuffleArray([...imageList, ...imageList]);
    setShuffledMemoBlocks(
      shuffledImageList.map((image, i) => ({
        codigo: 1000 + i,
        index: i,
        image,
        flipped: false,
      }))
    );
  }, [imageList]); // Update shuffledMemoBlocks when imageList changes

  const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const cambiarComponenteInterprete = () => {
    setBtnSlide(!btnSlide);
  };
  const [anagramas, setAnagramas] = useState([]);

  useEffect(() => {
    buscarAnagramas(props.historia);
  }, [props.historia]);

  function buscarAnagramas(historia) {
    let nuevosAnagramas = [];

    if (historia === 1) {
      nuevosAnagramas = [tuariles, tear, alfarosre, potiem];
    } else if (historia === 2) {
      nuevosAnagramas = [turascul, masfor, blospue, gadole];
    } else if (historia === 3) {
      nuevosAnagramas = [braso, loshi, toriahis, tefuen];
    } else if (historia === 4) {
      nuevosAnagramas = [tuariles, naur, incianfa, zacru];
    } else if (historia === 5) {
      nuevosAnagramas = [dosniso, zaspie, toriahis, batosil];
    } else {
      console.warn("Unhandled history case: ", historia);
    }

    setAnagramas(nuevosAnagramas);
  }
  const cambiarEstados = (positionInImageList) => {
    if (positionInImageList < 4) {
      switch (positionInImageList) {
        case 0:
          setEsInterpretado1(true);
          break;
        case 1:
          setEsInterpretado2(true);
          break;
        case 2:
          setEsInterpretado3(true);
          break;
        case 3:
          setEsInterpretado4(true);
          break;
        default:
          break;
      }
    }
  };

  const handleMemoClick = (memoBlock) => {
    const flippedMemoBlock = { ...memoBlock, flipped: true };
    let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
    setShuffledMemoBlocks(shuffledMemoBlocksCopy);
    if (selectedMemoBlock === null) {
      setselectedMemoBlock(memoBlock);


    } else if (selectedMemoBlock.image === memoBlock.image) {
      console.log(
        `¡Las parejas coinciden! Son: ${JSON.stringify(
          selectedMemoBlock
        )} y ${JSON.stringify(memoBlock)}`
      );
      const positionInImageList = imageList.indexOf(selectedMemoBlock.image);
      console.log(positionInImageList);


      if (positionInImageList < 4) {
        if (encontrados[positionInImageList]) {
          cambiarEstados(positionInImageList);
          sonidoGanan();
        } else {
          setShowThirdModal(true);
          setShowSecondModal(false);
        }
      }
      if (positionInImageList === 0 && encontrados[positionInImageList]) {
        setselectedMemoBlock(null);

      } else if (
        !imageList.slice(0, 4).includes(selectedMemoBlock.image) ||
        !encontrados[positionInImageList]
      ) {
        if (!encontrados[positionInImageList]) {
          setAnimating(true);
          setTimeout(() => {
            shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
            shuffledMemoBlocksCopy.splice(
              selectedMemoBlock.index,
              1,
              selectedMemoBlock
            );
            setShuffledMemoBlocks(shuffledMemoBlocksCopy);
            setselectedMemoBlock(null);
            setAnimating(false);


          }, 1000);
        } else {

        }
        if (!imageList.slice(0, 4).includes(selectedMemoBlock.image)) {
          setShowSecondModal(true);
        }
      } else {
        setselectedMemoBlock(null);

      }



    } else {

      setAnimating(true);
      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        shuffledMemoBlocksCopy.splice(
          selectedMemoBlock.index,
          1,
          selectedMemoBlock
        );
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);
        setselectedMemoBlock(null);
        setAnimating(false);
        sonidoPierden();

      }, 1000);
    }
  };

  const validardor = (index) => {
    let aux;

    if (index === 0) {
      aux = esinterpretado1;
    } else if (index === 1) {
      aux = esinterpretado2;
    } else if (index === 2) {
      aux = esinterpretado3;
    } else if (index === 3) {
      aux = esinterpretado4;
    }
    return aux;
  };

  const [audio] = useState(new Audio('ruta_del_sonido.mp3')); // Reemplaza 'ruta_del_sonido.mp3' con la ruta correcta de tu archivo de sonido

  const [playSound] = useSound(tap);
  const [sonidoPierden] = useSound(pierdenSonido);
  const [sonidoGanan] = useSound(gananSonido);

  return (
    <>
      <Header></Header>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p>
              Espera a que el huaquero encuentre los símbolos misteriosos. Ten
              cuidado si descubres símbolos diferentes, perderás tiempo.
            </p>
          </div>
        </div>
      )}
      {showSecondModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowSecondModal(false)}>
              &times;
            </span>
            <p>¡Ups! Este símbolo no pertenece a la historia. Perderás x minutos.</p>
          </div>
        </div>
      )}
      {showThirdModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowThirdModal(false)}>
              &times;
            </span>
            <p>Este símbolo aun no ha sido encontrado por el huaquero, tendrás que esperar</p>
          </div>
        </div>
      )}
      <Contexto
        titulo="Descubre los símbolos"
        parrafo="Ten cuidado, si descubres símbolos diferentes a los que el Huaquero te mostró, perderás los que has descubierto"
      ></Contexto>
      <div className="fondoAmarillo">
        <div className="contentMinijuego">

          <button
            className="btnInterpreteSlide"
            onClick={cambiarComponenteInterprete}
          >
            {!btnSlide ? (
              <img src={off} alt="logo de Guia" />
            ) : (
              <img src={on} alt="logo de Guia" />
            )}
          </button>
          <button className="ContTraduccion sonido" onClick={playSound}>
            {btnSlide ? (
              anagramas.map((simbolo, index) => (
                <Traductor
                  key={index}
                  historia={props.historia}
                  imgAnagrama={anagramas[index]}
                  imgSimbolo={imageList[index]}
                  valid={validardor(index)}
                />
              ))
            ) : (
              <Board
                memoBlocks={shuffledMemoBlocks}
                animating={animating}
                handleMemoClick={handleMemoClick}
              />
            )}
          </button>
        </div>
      </div>

      <Acumulador
        historia={props.historia}
        encontrado1={encontrados[0]}
        encontrado2={encontrados[1]}
        encontrado3={encontrados[2]}
        encontrado4={encontrados[3]}
      />
    </>
  );
};

export { Minijuego };
