import React, { useState, useEffect } from "react";
import mapamuseolili from "./resources/mapamuseolili.png";
import pin from "./resources/pin-12.png";
import "./Mapa.css";
import { Header } from "../Header";
import cargando from "./cargando.png";
import lupa from "./resources/lupa.png";
import lupahover from "./resources/lupahover.png";
import { Cronometro } from "../Header/Cronometro";
import TopNavegation from "./resources/TopNavigation.png";


function Mapa(props) {
  const [lugares, setLugares] = useState([]);
  const [ubicacion, setUbicacion] = useState(null);
  const [posicionActual, setPosicionActual] = useState(0); // Estado para rastrear la posición actual
  const [segundos, setSegundos] = useState(30); // Valor inicial del temporizador
  const [modalVisible, setModalVisible] = useState(false);
  const [esLoading, setEsLoading] = useState(false);

  const historia = props.historia;

  useEffect(() => {
    buscarUbicaciones(historia);
  }, [historia]);

  useEffect(() => {
    if (lugares.length > 0) {
      setUbicacion(lugares[posicionActual]);
    }
  }, [posicionActual, lugares]);

  useEffect(() => {
    if (segundos > 0) {
      const interval = setInterval(() => {
        setSegundos((prevSegundos) => prevSegundos - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setEsLoading(true);
      setTimeout(() => {
        setEsLoading(false);
        avanzarPosicion(); // Se avanza la posición aquí cuando segundos es 0.
        setSegundos(30); // Reiniciamos el temporizador al valor inicial.
      }, 1000);
    }
  }, [segundos]);

  function buscarUbicaciones(historia) {
    let lugares;

    if (historia === 1) {
      lugares = [1, 2, 3, 4];
    } else if (historia === 2) {
      lugares = [1, 4, 3, 5];
    } else if (historia === 3) {
      lugares = [3, 5, 2, 4];
    } else if (historia === 4) {
      lugares = [4, 1, 2, 3];
    } else if (historia === 5) {
      lugares = [3, 4, 1, 5];
    }

    setLugares(lugares);
  }

  function avanzarPosicion() {
    setPosicionActual((prevPosicion) =>
      prevPosicion === lugares.length - 1 ? 0 : prevPosicion + 1
    );
  }

  const closeModal = () => {
    setModalVisible(false);
    setSegundos(3); // Reiniciamos el temporizador al valor inicial
  };

  useEffect(() => {
    if (lugares.length > 0) {
      setUbicacion(lugares[posicionActual]);
    }
  }, [posicionActual, lugares]);

  const handleClick = () => {
    setSegundos(0);
  };

  return (
    <>
      <div className="position_map">
        <div className="top-section">
          <img className="button-image" src={TopNavegation} alt="Botón" />
          <h1 className="huaquero-text">Guía</h1>
          <Cronometro />
        </div>
        <h2 className="titulosGuia">Símbolos localizados</h2>
        <div className="fondoAmarillo">
          <div className="contenedorImagen">
            {!esLoading && (
              <img src={mapamuseolili} alt="Logo del museo Lili" />
            )}
          </div>
          <div className="contenedorPunto">
            {esLoading ? (
              <div className="centrarVerticalmente">
                <img
                  className="rotating-image animacioncarga"
                  src={cargando}
                  alt="Logo de enviando"
                />
              </div>
            ) : (
              <div
                className={`web ${
                  (ubicacion === 1 && "animacionweb1") ||
                  (ubicacion === 2 && "animacionweb2") ||
                  (ubicacion === 3 && "animacionweb3") ||
                  (ubicacion === 4 && "animacionweb4") ||
                  (ubicacion === 5 && "animacionweb5")
                }`}
              >
                <img src={pin} alt="Pin" />
              </div>
            )}
          </div>
          <h1 className={segundos === 0 ? "textoRojo" : "textNormal"}>
            {segundos} Seg
          </h1>
          <button className="btn_buscar" onClick={handleClick}>
            <img src={lupa} />
          </button>
          <p className="parrafoInferior">
            Rápido, indícale al Huaquero los puntos que se marcan en el mapa.
            Toca la lupa para bucar otro símbolo.
          </p>
        </div>
      </div>
    </>
  );
}

export { Mapa };
