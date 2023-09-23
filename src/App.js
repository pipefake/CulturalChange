import "./App.css";

import { InputCodigo } from "./InputCodigo";
import { PantallaMuseo } from "./PantallaMuseo";
import { AnimacionMuseo } from "./AnimacionMuseo";
import { QrMuseo } from "./QrMuseo";

import { Header } from "./Header";
import { Contexto } from "./Contexto";
import { Introduccion } from "./Introduccion";

import { HashRouter, Routes, Route } from "react-router-dom";
import { Picker } from "./Picker";

function App() {
  const cartas = [1, 2, 3, 4, 5];

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  return (
    <div className="App">
      <HashRouter>
        {/* <Header rol={"Antropólogo"} /> */}
        {/* <Contexto titulo={"Descifra las palabras"} parrafo={"Solicita al intérprete las palabras claves"}></Contexto> */}

        <Routes>
          <Route path="/*" element={<p>no encontrado</p>} />
          <Route path="/" element={<InputCodigo></InputCodigo>} />
          <Route path="/introduccion" element={<Picker></Picker>} />
          <Route path="/museo" element={<PantallaMuseo></PantallaMuseo>} />{" "}
          <Route path="/introduccion" element={<Picker></Picker>} />
          <Route path="/museo" element={<PantallaMuseo></PantallaMuseo>} />
          <Route path="/animacionMuseo" element={<AnimacionMuseo />} />
          <Route path="/qrMuseo" element={<QrMuseo />} />
          {/* Aquí está la nueva ruta */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
